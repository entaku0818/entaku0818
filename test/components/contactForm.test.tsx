import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '../testUtils'
import ContactForm from '../../components/contactForm'
import labels from '../../content/labels'
import { HONEYPOT_FIELD } from '../../lib/contact'

const l = labels.ja.contact

const fill = ({
  name = '山田 太郎',
  email = 'taro@example.com',
  message = 'iOSアプリの相談です。',
}: { name?: string; email?: string; message?: string } = {}) => {
  fireEvent.change(screen.getByLabelText(new RegExp(l.name)), {
    target: { value: name },
  })
  fireEvent.change(screen.getByLabelText(new RegExp(l.email)), {
    target: { value: email },
  })
  fireEvent.change(screen.getByLabelText(new RegExp(l.message)), {
    target: { value: message },
  })
}

const submit = () =>
  fireEvent.click(screen.getByRole('button', { name: new RegExp(l.submit) }))

const originalFetch = global.fetch

beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  global.fetch = originalFetch
  jest.restoreAllMocks()
})

const mockJson = (status: number, body: unknown) =>
  (global.fetch as jest.Mock).mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  })

describe('ContactForm validation', () => {
  it('shows an error on every empty required field without calling the API', async () => {
    render(<ContactForm lang="ja" />, {})
    await act(async () => {
      submit()
    })

    expect(screen.getAllByText(l.fieldError('required'))).toHaveLength(3)
    // まとめの行は「送信に失敗」ではなく入力の確認を促す
    expect(screen.getByRole('alert').textContent).toBe(l.invalid)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('rejects a malformed email address', async () => {
    render(<ContactForm lang="ja" />, {})
    fill({ email: 'taro(at)example' })
    await act(async () => {
      submit()
    })

    expect(screen.getByText(l.fieldError('invalid_email'))).toBeTruthy()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('marks the field it rejected with aria-invalid', async () => {
    render(<ContactForm lang="ja" />, {})
    fill({ name: '' })
    await act(async () => {
      submit()
    })

    expect(
      screen.getByLabelText(new RegExp(l.name)).getAttribute('aria-invalid'),
    ).toBe('true')
    expect(
      screen.getByLabelText(new RegExp(l.email)).getAttribute('aria-invalid'),
    ).toBe('false')
  })

  it('keeps budget optional', async () => {
    mockJson(200, { ok: true })
    render(<ContactForm lang="ja" />, {})
    fill()
    await act(async () => {
      submit()
    })

    expect(global.fetch).toHaveBeenCalled()
  })

  it('renders a honeypot field that is hidden from assistive tech', () => {
    const { container } = render(<ContactForm lang="ja" />, {})
    const honeypot = container.querySelector(`input[name="${HONEYPOT_FIELD}"]`)

    expect(honeypot).toBeTruthy()
    expect(honeypot?.closest('[aria-hidden="true"]')).toBeTruthy()
    expect(honeypot?.getAttribute('tabindex')).toBe('-1')
  })
})

describe('ContactForm states', () => {
  it('sends what was typed to the API with the current language', async () => {
    mockJson(200, { ok: true })
    render(<ContactForm lang="en" />, {})

    const el = labels.en.contact
    fireEvent.change(screen.getByLabelText(new RegExp(el.name)), {
      target: { value: 'Jane' },
    })
    fireEvent.change(screen.getByLabelText(new RegExp(el.email)), {
      target: { value: 'jane@example.com' },
    })
    fireEvent.change(screen.getByLabelText(new RegExp(el.message)), {
      target: { value: 'Hello' },
    })
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: new RegExp(el.submit) }),
      )
    })

    const [, init] = (global.fetch as jest.Mock).mock.calls[0]
    expect(JSON.parse(init.body)).toMatchObject({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Hello',
      lang: 'en',
    })
  })

  it('disables the button and shows the sending label while in flight', async () => {
    let resolve: (value: unknown) => void = () => {}
    ;(global.fetch as jest.Mock).mockReturnValue(
      new Promise((r) => {
        resolve = r
      }),
    )
    render(<ContactForm lang="ja" />, {})
    fill()

    await act(async () => {
      submit()
    })

    const button = screen.getByRole('button', {
      name: new RegExp(l.submitting),
    })
    expect(button.hasAttribute('disabled')).toBe(true)

    await act(async () => {
      resolve({ ok: true, status: 200, json: async () => ({ ok: true }) })
    })
  })

  it('shows the success message once the API accepts it', async () => {
    mockJson(200, { ok: true })
    render(<ContactForm lang="ja" />, {})
    fill()
    await act(async () => {
      submit()
    })

    await waitFor(() => expect(screen.getByText(l.success)).toBeTruthy())
    expect(screen.getByText(l.successDetail)).toBeTruthy()
  })

  it('explains that the form is not configured yet on a 503', async () => {
    mockJson(503, { ok: false, code: 'not_configured' })
    render(<ContactForm lang="ja" />, {})
    fill()
    await act(async () => {
      submit()
    })

    await waitFor(() => expect(screen.getByText(l.notConfigured)).toBeTruthy())
  })

  it('explains a rate limit on a 429', async () => {
    mockJson(429, { ok: false, code: 'rate_limited' })
    render(<ContactForm lang="ja" />, {})
    fill()
    await act(async () => {
      submit()
    })

    await waitFor(() => expect(screen.getByText(l.rateLimited)).toBeTruthy())
  })

  it('shows the generic failure when the request throws', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('offline'))
    render(<ContactForm lang="ja" />, {})
    fill()
    await act(async () => {
      submit()
    })

    await waitFor(() => expect(screen.getByText(l.error)).toBeTruthy())
  })

  it('tells the user to check the fields when the API rejects them', async () => {
    mockJson(400, {
      ok: false,
      code: 'invalid',
      errors: [{ field: 'email', code: 'invalid_email' }],
    })
    render(<ContactForm lang="ja" />, {})
    fill()
    await act(async () => {
      submit()
    })

    await waitFor(() =>
      expect(screen.getByRole('alert').textContent).toBe(l.invalid),
    )
  })

  it('surfaces the field errors the API sends back', async () => {
    mockJson(400, {
      ok: false,
      code: 'invalid',
      errors: [{ field: 'email', code: 'invalid_email' }],
    })
    render(<ContactForm lang="ja" />, {})
    fill()
    await act(async () => {
      submit()
    })

    await waitFor(() =>
      expect(screen.getByText(l.fieldError('invalid_email'))).toBeTruthy(),
    )
  })
})
