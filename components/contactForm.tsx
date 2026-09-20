import { useState } from 'react'
import type { ChangeEvent, FormEvent, JSX } from 'react'
import labels from '../content/labels'
import type { Lang } from '../content/profile'
import { HONEYPOT_FIELD, LIMITS, validateContact } from '../lib/contact'
import type { ContactField, FieldError } from '../lib/contact'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/** 画面に出す失敗の理由。どれもフォームの下に1行で表示する */
type FailureCode = 'invalid' | 'not_configured' | 'rate_limited' | 'error'

const emptyValues = {
  name: '',
  email: '',
  budget: '',
  message: '',
  [HONEYPOT_FIELD]: '',
}

const fieldClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30 ${
    hasError ? 'border-red-400' : 'border-hairline focus:border-accent'
  }`

export const ContactForm = ({ lang }: { lang: Lang }): JSX.Element => {
  const l = labels[lang].contact
  const [values, setValues] = useState(emptyValues)
  const [status, setStatus] = useState<Status>('idle')
  const [failure, setFailure] = useState<FailureCode | null>(null)
  const [errors, setErrors] = useState<FieldError[]>([])

  const errorFor = (field: ContactField) =>
    errors.find((error) => error.field === field)

  const onChange =
    (field: keyof typeof emptyValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }))
    }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    // サーバーと同じ関数で先に検証して、無駄な往復を減らす
    const found = validateContact(values)
    setErrors(found)
    if (found.length > 0) {
      setStatus('error')
      setFailure('invalid')
      return
    }

    setStatus('submitting')
    setFailure(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, lang }),
      })
      const body = await response.json().catch(() => ({}))

      if (response.ok && body?.ok) {
        setValues(emptyValues)
        setStatus('success')
        return
      }

      setErrors(Array.isArray(body?.errors) ? body.errors : [])
      setStatus('error')
      setFailure(
        body?.code === 'not_configured' ||
          body?.code === 'rate_limited' ||
          body?.code === 'invalid'
          ? body.code
          : 'error',
      )
    } catch {
      setStatus('error')
      setFailure('error')
    }
  }

  const failureMessage: Record<FailureCode, string> = {
    invalid: l.invalid,
    not_configured: l.notConfigured,
    rate_limited: l.rateLimited,
    error: l.error,
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-3xl border border-hairline bg-white p-10 text-center sm:p-14"
      >
        <p className="text-2xl font-semibold tracking-tight text-ink">
          {l.success}
        </p>
        <p className="mt-3 text-muted">{l.successDetail}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm text-accent transition-colors hover:text-accent-hover"
        >
          {l.submit}
        </button>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-hairline bg-white p-6 sm:p-10"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field
          id="contact-name"
          label={l.name}
          badge={l.required}
          error={errorFor('name') && l.fieldError(errorFor('name').code)}
        >
          {(describedBy, invalid) => (
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={LIMITS.name}
              value={values.name}
              onChange={onChange('name')}
              placeholder={l.namePlaceholder}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={fieldClass(invalid)}
            />
          )}
        </Field>

        <Field
          id="contact-email"
          label={l.email}
          badge={l.required}
          error={errorFor('email') && l.fieldError(errorFor('email').code)}
        >
          {(describedBy, invalid) => (
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={LIMITS.email}
              value={values.email}
              onChange={onChange('email')}
              placeholder={l.emailPlaceholder}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={fieldClass(invalid)}
            />
          )}
        </Field>
      </div>

      <div className="mt-6">
        <Field
          id="contact-budget"
          label={l.budget}
          badge={l.optional}
          error={errorFor('budget') && l.fieldError(errorFor('budget').code)}
        >
          {(describedBy, invalid) => (
            <input
              id="contact-budget"
              name="budget"
              type="text"
              maxLength={LIMITS.budget}
              value={values.budget}
              onChange={onChange('budget')}
              placeholder={l.budgetPlaceholder}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={fieldClass(invalid)}
            />
          )}
        </Field>
      </div>

      <div className="mt-6">
        <Field
          id="contact-message"
          label={l.message}
          badge={l.required}
          error={errorFor('message') && l.fieldError(errorFor('message').code)}
        >
          {(describedBy, invalid) => (
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              maxLength={LIMITS.message}
              value={values.message}
              onChange={onChange('message')}
              placeholder={l.messagePlaceholder}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={fieldClass(invalid)}
            />
          )}
        </Field>
      </div>

      {/* honeypot: 人間には見えない。埋まっていればボットとして黙って捨てる */}
      <div
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">{l.honeypot}</label>
        <input
          id="contact-website"
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values[HONEYPOT_FIELD]}
          onChange={onChange(HONEYPOT_FIELD)}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">{l.privacy}</p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-base font-medium text-white transition-colors hover:bg-accent-hover focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}
          {submitting ? l.submitting : l.submit}
        </button>
      </div>

      <p
        role="alert"
        aria-live="assertive"
        className="mt-4 min-h-5 text-sm text-red-600"
      >
        {status === 'error' && failure ? failureMessage[failure] : ''}
      </p>
    </form>
  )
}

const Field = ({
  id,
  label,
  badge,
  error,
  children,
}: {
  id: string
  label: string
  badge: string
  error?: string
  /** describedBy と invalid を受け取って input を返す */
  children: (describedBy: string | undefined, invalid: boolean) => JSX.Element
}): JSX.Element => {
  const errorId = `${id}-error`

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-2 text-sm font-medium text-ink"
      >
        {label}
        <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] text-muted">
          {badge}
        </span>
      </label>
      {children(error ? errorId : undefined, Boolean(error))}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default ContactForm
