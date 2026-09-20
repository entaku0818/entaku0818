import {
  HONEYPOT_FIELD,
  LIMITS,
  buildEmail,
  createRateLimiter,
  isHoneypotFilled,
  normalizeContact,
  readContactConfig,
  validateContact,
} from '../../lib/contact'

const valid = {
  name: '山田 太郎',
  email: 'taro@example.com',
  message: 'iOSアプリの新規開発を相談したいです。',
}

describe('validateContact', () => {
  it('accepts a filled in form', () => {
    expect(validateContact(valid)).toEqual([])
  })

  it('requires name, email and message', () => {
    expect(validateContact({})).toEqual([
      { field: 'name', code: 'required' },
      { field: 'email', code: 'required' },
      { field: 'message', code: 'required' },
    ])
  })

  it('treats whitespace-only input as empty', () => {
    expect(validateContact({ ...valid, name: '   ' })).toContainEqual({
      field: 'name',
      code: 'required',
    })
  })

  it('rejects an address that is not an email', () => {
    expect(validateContact({ ...valid, email: 'taro(at)example' })).toEqual([
      { field: 'email', code: 'invalid_email' },
    ])
  })

  it('leaves budget optional', () => {
    expect(validateContact({ ...valid, budget: '' })).toEqual([])
    expect(validateContact({ ...valid, budget: '50〜150万円' })).toEqual([])
  })

  it('rejects fields that are too long', () => {
    expect(
      validateContact({ ...valid, message: 'あ'.repeat(LIMITS.message + 1) }),
    ).toEqual([{ field: 'message', code: 'too_long' }])
    expect(
      validateContact({ ...valid, budget: 'x'.repeat(LIMITS.budget + 1) }),
    ).toEqual([{ field: 'budget', code: 'too_long' }])
  })

  it('ignores non-string input instead of throwing', () => {
    expect(validateContact({ name: 42, email: null } as never)).toEqual([
      { field: 'name', code: 'required' },
      { field: 'email', code: 'required' },
      { field: 'message', code: 'required' },
    ])
  })
})

describe('isHoneypotFilled', () => {
  it('is false for a form a human filled in', () => {
    expect(isHoneypotFilled(valid)).toBe(false)
    expect(isHoneypotFilled({ ...valid, [HONEYPOT_FIELD]: '  ' })).toBe(false)
  })

  it('is true once the hidden field has a value', () => {
    expect(
      isHoneypotFilled({ ...valid, [HONEYPOT_FIELD]: 'http://spam.example' }),
    ).toBe(true)
  })
})

describe('normalizeContact', () => {
  it('trims the values and defaults the language to Japanese', () => {
    expect(normalizeContact({ ...valid, name: ' 山田 ', lang: 'fr' })).toEqual({
      name: '山田',
      email: 'taro@example.com',
      message: 'iOSアプリの新規開発を相談したいです。',
      budget: '',
      lang: 'ja',
    })
  })

  it('keeps English when the form says so', () => {
    expect(normalizeContact({ ...valid, lang: 'en' }).lang).toBe('en')
  })
})

describe('createRateLimiter', () => {
  it('allows up to the limit and then blocks', () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 })
    expect(limiter.check('1.2.3.4', 0).allowed).toBe(true)
    expect(limiter.check('1.2.3.4', 10).allowed).toBe(true)

    const blocked = limiter.check('1.2.3.4', 20)
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterSeconds).toBe(1)
  })

  it('counts each address separately', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 })
    expect(limiter.check('1.1.1.1', 0).allowed).toBe(true)
    expect(limiter.check('2.2.2.2', 0).allowed).toBe(true)
    expect(limiter.check('1.1.1.1', 0).allowed).toBe(false)
  })

  it('lets the address through again once the window has passed', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 })
    expect(limiter.check('1.1.1.1', 0).allowed).toBe(true)
    expect(limiter.check('1.1.1.1', 500).allowed).toBe(false)
    expect(limiter.check('1.1.1.1', 1500).allowed).toBe(true)
  })
})

describe('readContactConfig', () => {
  it('returns null while the Resend key is unset', () => {
    expect(readContactConfig({})).toBeNull()
    expect(readContactConfig({ RESEND_API_KEY: 're_test' })).toBeNull()
    expect(
      readContactConfig({
        CONTACT_TO_EMAIL: 'me@example.com',
      }),
    ).toBeNull()
  })

  it('falls back to the Resend sandbox sender', () => {
    const config = readContactConfig({
      RESEND_API_KEY: 're_test',
      CONTACT_TO_EMAIL: 'me@example.com',
    })
    expect(config).toEqual({
      apiKey: 're_test',
      to: 'me@example.com',
      from: 'entaku.dev <onboarding@resend.dev>',
    })
  })

  it('uses CONTACT_FROM_EMAIL when it is set', () => {
    expect(
      readContactConfig({
        RESEND_API_KEY: 're_test',
        CONTACT_TO_EMAIL: 'me@example.com',
        CONTACT_FROM_EMAIL: 'hello@entaku.dev',
      })?.from,
    ).toBe('hello@entaku.dev')
  })
})

describe('buildEmail', () => {
  it('puts the reply address and the budget in the body', () => {
    const email = buildEmail(normalizeContact({ ...valid, budget: '100万円' }))
    expect(email.subject).toContain('山田 太郎')
    expect(email.text).toContain('taro@example.com')
    expect(email.text).toContain('100万円')
  })

  it('marks an empty budget rather than leaving a blank line', () => {
    expect(buildEmail(normalizeContact(valid)).text).toContain('（未記入）')
  })
})
