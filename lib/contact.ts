import type { FieldErrorCode } from '../content/labels'
import type { Lang } from '../content/profile'

/** フォームの入力欄。website は人間には見えない honeypot */
export type ContactField = 'name' | 'email' | 'message' | 'budget'

export type FieldError = { field: ContactField; code: FieldErrorCode }

export type ContactInput = {
  name?: string
  email?: string
  message?: string
  budget?: string
  /** honeypot。人間が触ることはないので、埋まっていればボットとみなす */
  website?: string
  lang?: string
}

export type ContactMessage = {
  name: string
  email: string
  message: string
  budget: string
  lang: Lang
}

/** 入力欄ごとの最大文字数。長文の投げ込みでメールが壊れるのを防ぐ */
export const LIMITS: Record<ContactField, number> = {
  name: 100,
  email: 254,
  budget: 200,
  message: 5000,
}

/** honeypot の input の name 属性。サーバーとフォームで同じものを使う */
export const HONEYPOT_FIELD = 'website'

/**
 * メールアドレスの形式チェック。
 * RFC に忠実な検証はサーバー側では意味が薄いので、明らかな誤入力だけを弾く。
 */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const text = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : ''

export const isHoneypotFilled = (input: ContactInput): boolean =>
  text(input?.[HONEYPOT_FIELD]) !== ''

/** 空配列なら入力OK。UIは field ごとに最初のエラーを出す */
export const validateContact = (input: ContactInput): FieldError[] => {
  const errors: FieldError[] = []
  const name = text(input?.name)
  const email = text(input?.email)
  const message = text(input?.message)
  const budget = text(input?.budget)

  if (name === '') errors.push({ field: 'name', code: 'required' })
  else if (name.length > LIMITS.name)
    errors.push({ field: 'name', code: 'too_long' })

  if (email === '') errors.push({ field: 'email', code: 'required' })
  else if (email.length > LIMITS.email)
    errors.push({ field: 'email', code: 'too_long' })
  else if (!emailPattern.test(email))
    errors.push({ field: 'email', code: 'invalid_email' })

  if (message === '') errors.push({ field: 'message', code: 'required' })
  else if (message.length > LIMITS.message)
    errors.push({ field: 'message', code: 'too_long' })

  if (budget.length > LIMITS.budget)
    errors.push({ field: 'budget', code: 'too_long' })

  return errors
}

export const normalizeContact = (input: ContactInput): ContactMessage => ({
  name: text(input?.name),
  email: text(input?.email),
  message: text(input?.message),
  budget: text(input?.budget),
  lang: input?.lang === 'en' ? 'en' : 'ja',
})

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number }

export type RateLimiter = {
  check: (key: string, now?: number) => RateLimitResult
  reset: () => void
}

/**
 * IPごとの簡易レート制限。プロセス内のメモリだけで動く。
 * サーバーレスではインスタンスをまたげないが、単発のスパムを抑えるには十分。
 */
export const createRateLimiter = ({
  limit,
  windowMs,
}: {
  limit: number
  windowMs: number
}): RateLimiter => {
  const hits = new Map<string, number[]>()

  return {
    check(key, now = Date.now()) {
      const since = now - windowMs
      // 期限切れのキーを毎回捨てて、Map が無限に伸びないようにする
      for (const [existing, times] of hits) {
        const alive = times.filter((time) => time > since)
        if (alive.length === 0) hits.delete(existing)
        else hits.set(existing, alive)
      }

      const times = hits.get(key) ?? []
      if (times.length >= limit) {
        const retryAfterSeconds = Math.max(
          1,
          Math.ceil((times[0] + windowMs - now) / 1000),
        )
        return { allowed: false, retryAfterSeconds }
      }

      hits.set(key, [...times, now])
      return { allowed: true, retryAfterSeconds: 0 }
    },
    reset() {
      hits.clear()
    },
  }
}

export type ContactConfig = {
  apiKey: string
  to: string
  from: string
}

/**
 * Resend の設定を環境変数から読む。
 * キーが未発行でもビルドと `yarn dev` が壊れないよう、ここでは例外を投げずに null を返す。
 */
export const readContactConfig = (
  env: Record<string, string | undefined> = process.env,
): ContactConfig | null => {
  const apiKey = text(env.RESEND_API_KEY)
  const to = text(env.CONTACT_TO_EMAIL)
  if (apiKey === '' || to === '') return null

  return {
    apiKey,
    to,
    // 独自ドメインを Resend に登録するまでは onboarding@resend.dev が使える
    from: text(env.CONTACT_FROM_EMAIL) || 'entaku.dev <onboarding@resend.dev>',
  }
}

/** Resend に渡すメール本文。返信しやすいよう本文にもメールアドレスを入れる */
export const buildEmail = (message: ContactMessage) => ({
  subject: `[entaku.dev] ${message.name} さんから開発のご相談`,
  text: [
    `お名前: ${message.name}`,
    `メール: ${message.email}`,
    `ご予算感: ${message.budget || '（未記入）'}`,
    `フォームの言語: ${message.lang}`,
    '',
    'ご相談内容:',
    message.message,
  ].join('\n'),
})
