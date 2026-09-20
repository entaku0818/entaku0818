import handler, { contactRateLimiter } from '../../../pages/api/contact'
import type { NextApiRequest, NextApiResponse } from 'next'

const body = {
  name: '山田 太郎',
  email: 'taro@example.com',
  message: 'iOSアプリの新規開発を相談したいです。',
}

/** 呼ばれた status / json / ヘッダーだけを覚える最小の res */
const createResponse = () => {
  const res = {
    statusCode: 0,
    body: undefined as unknown,
    headers: {} as Record<string, string>,
    status(code: number) {
      res.statusCode = code
      return res
    },
    json(value: unknown) {
      res.body = value
      return res
    },
    setHeader(name: string, value: string) {
      res.headers[name] = value
    },
  }
  return res
}

const call = async (
  request: Partial<NextApiRequest> & { body?: unknown } = {},
) => {
  const res = createResponse()
  await handler(
    {
      method: 'POST',
      headers: { 'x-forwarded-for': '203.0.113.1' },
      socket: {},
      ...request,
    } as unknown as NextApiRequest,
    res as unknown as NextApiResponse,
  )
  return res
}

const originalEnv = process.env
const originalFetch = global.fetch

beforeEach(() => {
  contactRateLimiter.reset()
  process.env = { ...originalEnv }
  delete process.env.RESEND_API_KEY
  delete process.env.CONTACT_TO_EMAIL
  delete process.env.CONTACT_FROM_EMAIL
  global.fetch = jest.fn()
})

afterEach(() => {
  process.env = originalEnv
  global.fetch = originalFetch
  jest.restoreAllMocks()
})

const configure = () => {
  process.env.RESEND_API_KEY = 're_test_key'
  process.env.CONTACT_TO_EMAIL = 'me@example.com'
}

describe('POST /api/contact', () => {
  it('rejects anything but POST', async () => {
    const res = await call({ method: 'GET' })
    expect(res.statusCode).toBe(405)
    expect(res.headers.Allow).toBe('POST')
  })

  it('reports invalid fields with 400 and per-field codes', async () => {
    const res = await call({ body: { ...body, email: 'not-an-email' } })
    expect(res.statusCode).toBe(400)
    expect(res.body).toMatchObject({
      ok: false,
      code: 'invalid',
      errors: [{ field: 'email', code: 'invalid_email' }],
    })
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('parses a JSON string body', async () => {
    const res = await call({ body: JSON.stringify({}) })
    expect(res.statusCode).toBe(400)
    expect(res.body).toMatchObject({ code: 'invalid' })
  })

  it('answers 503 with not_configured while the Resend key is unset', async () => {
    const res = await call({ body })
    expect(res.statusCode).toBe(503)
    expect(res.body).toMatchObject({ ok: false, code: 'not_configured' })
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('sends through Resend once it is configured', async () => {
    configure()
    ;(global.fetch as jest.Mock).mockResolvedValue({ ok: true, status: 200 })

    const res = await call({ body: { ...body, budget: '100万円' } })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ ok: true })

    const [url, init] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    expect(init.headers.Authorization).toBe('Bearer re_test_key')

    const sent = JSON.parse(init.body)
    expect(sent.to).toEqual(['me@example.com'])
    expect(sent.reply_to).toBe('taro@example.com')
    expect(sent.text).toContain('100万円')
  })

  it('answers 502 when Resend fails', async () => {
    configure()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 422,
      text: async () => 'invalid from address',
    })
    jest.spyOn(console, 'error').mockImplementation(() => {})

    const res = await call({ body })
    expect(res.statusCode).toBe(502)
    expect(res.body).toMatchObject({ code: 'send_failed' })
  })

  it('answers 502 when Resend cannot be reached', async () => {
    configure()
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('network down'))
    jest.spyOn(console, 'error').mockImplementation(() => {})

    const res = await call({ body })
    expect(res.statusCode).toBe(502)
    expect(res.body).toMatchObject({ code: 'send_failed' })
  })

  it('silently accepts a submission that fills the honeypot', async () => {
    configure()
    const res = await call({ body: { ...body, website: 'http://spam.test' } })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ ok: true })
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('rate limits after five submissions from the same address', async () => {
    configure()
    ;(global.fetch as jest.Mock).mockResolvedValue({ ok: true, status: 200 })

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect((await call({ body })).statusCode).toBe(200)
    }

    const blocked = await call({ body })
    expect(blocked.statusCode).toBe(429)
    expect(blocked.body).toMatchObject({ ok: false, code: 'rate_limited' })
    expect(blocked.headers['Retry-After']).toBeDefined()
  })

  it('keeps counting per address', async () => {
    configure()
    ;(global.fetch as jest.Mock).mockResolvedValue({ ok: true, status: 200 })

    for (let attempt = 0; attempt < 5; attempt += 1) await call({ body })

    const other = await call({
      body,
      headers: { 'x-forwarded-for': '198.51.100.7' },
    })
    expect(other.statusCode).toBe(200)
  })
})
