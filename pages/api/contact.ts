import type { NextApiRequest, NextApiResponse } from 'next'
import {
  buildEmail,
  createRateLimiter,
  isHoneypotFilled,
  normalizeContact,
  readContactConfig,
  validateContact,
} from '../../lib/contact'
import type { FieldError } from '../../lib/contact'

export type ContactResponse =
  | { ok: true }
  | {
      ok: false
      code:
        | 'method_not_allowed'
        | 'invalid'
        | 'rate_limited'
        | 'not_configured'
        | 'send_failed'
      message: string
      errors?: FieldError[]
      retryAfterSeconds?: number
    }

/** 同一IPから10分に5件まで。モジュールスコープなのでインスタンスが生きている間は共有される */
export const contactRateLimiter = createRateLimiter({
  limit: 5,
  windowMs: 10 * 60 * 1000,
})

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const clientIp = (req: NextApiRequest): string => {
  const forwarded = req.headers['x-forwarded-for']
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded
  if (first) return first.split(',')[0].trim()
  return req.socket?.remoteAddress ?? 'unknown'
}

const parseBody = (body: unknown): Record<string, unknown> => {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  return typeof body === 'object' && body !== null
    ? (body as Record<string, unknown>)
    : {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      ok: false,
      code: 'method_not_allowed',
      message: 'Use POST.',
    })
  }

  const input = parseBody(req.body)

  // ボットには成功したように見せる。弾かれたと分からないほうが再送されにくい
  if (isHoneypotFilled(input)) return res.status(200).json({ ok: true })

  const rate = contactRateLimiter.check(clientIp(req))
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfterSeconds))
    return res.status(429).json({
      ok: false,
      code: 'rate_limited',
      message: 'Too many requests. Please try again later.',
      retryAfterSeconds: rate.retryAfterSeconds,
    })
  }

  const errors = validateContact(input)
  if (errors.length > 0) {
    return res.status(400).json({
      ok: false,
      code: 'invalid',
      message: 'Some fields need fixing.',
      errors,
    })
  }

  // APIキーが未発行でもここで落とさない。500 ではなく「設定不足」だと分かる応答を返す
  const config = readContactConfig()
  if (!config) {
    return res.status(503).json({
      ok: false,
      code: 'not_configured',
      message:
        'The contact form is not configured yet (RESEND_API_KEY / CONTACT_TO_EMAIL are unset).',
    })
  }

  const message = normalizeContact(input)
  const email = buildEmail(message)

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: message.email,
        subject: email.subject,
        text: email.text,
      }),
    })

    if (!response.ok) {
      console.error(
        `Resend responded with ${response.status}: ${await response.text()}`,
      )
      return res.status(502).json({
        ok: false,
        code: 'send_failed',
        message: 'Could not send the message.',
      })
    }
  } catch (error) {
    console.error('Failed to reach Resend', error)
    return res.status(502).json({
      ok: false,
      code: 'send_failed',
      message: 'Could not send the message.',
    })
  }

  return res.status(200).json({ ok: true })
}
