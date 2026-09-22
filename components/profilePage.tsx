import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import Header from './header'
import AppSection from './appSection'
import ContactForm from './contactForm'
import Reveal from './reveal'
import useCountUp from '../hocks/useCountUp'
import { featuredApps, profiles } from '../content/profile'
import labels from '../content/labels'
import type { HeroStat } from '../content/labels'
import type { Lang, TechCategory } from '../content/profile'
import type { JSX, ReactNode } from 'react'

const Tags = ({ tech }: { tech: TechCategory[] }) => (
  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
    {tech
      .flatMap((category) => category.items)
      .map((item) => (
        <span key={item} className="text-xs text-muted">
          {item}
        </span>
      ))}
  </div>
)

const inlineLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g

/** プロフィールデータの文中に書かれた `[表示名](URL)` をリンクとして描画する */
const InlineMarkdown = ({ children }: { children: string }) => {
  const nodes: (string | JSX.Element)[] = []
  let lastIndex = 0

  for (const match of children.matchAll(inlineLinkPattern)) {
    const [matched, label, url] = match
    const index = match.index ?? 0
    if (index > lastIndex) nodes.push(children.slice(lastIndex, index))
    nodes.push(
      <a
        key={`${url}-${index}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:text-accent-hover"
      >
        {label}
      </a>,
    )
    lastIndex = index + matched.length
  }
  nodes.push(children.slice(lastIndex))

  return <>{nodes}</>
}

const BulletItem = ({ children }: { children: JSX.Element | string }) => (
  <li className="flex items-start gap-3">
    <span
      aria-hidden="true"
      className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-hairline"
    />
    <span className="text-sm leading-relaxed text-ink/70">{children}</span>
  </li>
)

const SubHeading = ({ children }: { children: string }) => (
  <h4 className="mb-2 text-xs font-semibold tracking-[0.15em] text-muted uppercase">
    {children}
  </h4>
)

const Card = ({ children }: { children: ReactNode }) => (
  <div className="rounded-2xl border border-hairline/60 bg-white p-6 sm:p-8">
    {children}
  </div>
)

const ExternalLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-accent transition-colors hover:text-accent-hover"
  >
    {label} ›
  </a>
)

/** セクションの見出し。中央寄せにも左寄せにもできる */
const SectionHeading = ({
  eyebrow,
  title,
  lead,
  centered = false,
}: {
  eyebrow: string
  title: string
  lead?: string
  centered?: boolean
}) => (
  <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
    <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
      {eyebrow}
    </p>
    <h2 className="wrap-jp mt-4 text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
      {title}
    </h2>
    {lead && (
      <p className="wrap-jp mt-5 text-lg leading-relaxed text-muted sm:text-xl">
        {lead}
      </p>
    )}
  </div>
)

/** ヒーローの数字。画面に入るとカウントアップする */
const Stat = ({ stat }: { stat: HeroStat }) => {
  const { ref, display } = useCountUp(stat.value, { decimals: stat.decimals })

  return (
    <div className="text-center">
      <p className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        <span ref={ref}>{display}</span>
        {stat.suffix && (
          <span className="text-2xl text-muted sm:text-3xl">{stat.suffix}</span>
        )}
      </p>
      <p className="mx-auto mt-3 max-w-[15rem] text-xs leading-snug text-muted">
        {stat.label}
      </p>
    </div>
  )
}

/** 職歴などの長い内容を畳んでおくブロック */
const Fold = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}): JSX.Element => (
  <details className="group border-b border-hairline/70">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left text-lg text-ink transition-colors hover:text-accent">
      {title}
      <span
        aria-hidden="true"
        className="text-2xl leading-none font-light text-muted transition-transform duration-300 group-open:rotate-45"
      >
        +
      </span>
    </summary>
    <div className="pb-10">{children}</div>
  </details>
)

/**
 * 得意なことは「見出し — 説明」の形で書かれていることがある。
 * その形なら2つに分けて、見出しを大きく・説明を小さく出す。
 */
const splitStatement = (statement: string): [string, string?] => {
  const separator = statement.indexOf(' — ')
  if (separator === -1) return [statement]
  return [statement.slice(0, separator), statement.slice(separator + 3)]
}

/** OGP画像は言語に関わらず同じエンドポイントを使う */
const ogImageUrl = `${profiles.ja.siteUrl}/api/og`

export const ProfilePage = ({ lang }: { lang: Lang }): JSX.Element => {
  const profile = profiles[lang]
  const l = labels[lang]
  const title = `${profile.name} - ${profile.role}`
  // セクションを取るのは featured のものだけ。README には残り全部が載る
  const featured = featuredApps(profile)
  // 数字は画面に並ぶセクション数と合わせる（数えた人がズレないように）
  const stats = l.hero.stats(featured.length)

  const sections = [
    { id: 'apps', label: l.nav.apps },
    { id: 'about', label: l.nav.about },
    { id: 'contact', label: l.nav.contact },
  ]

  return (
    <div className="min-h-screen bg-white text-ink">
      <Head>
        <title>{title}</title>
        <meta name="description" content={profile.description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={profile.siteUrl} />
        <link rel="alternate" hrefLang="ja" href={profiles.ja.siteUrl} />
        <link rel="alternate" hrefLang="en" href={profiles.en.siteUrl} />
        {/* OGP */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={profile.description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content={profile.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={profile.name} />
        <meta
          property="og:locale"
          content={lang === 'ja' ? 'ja_JP' : 'en_US'}
        />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={profile.twitterId} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={profile.description} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <Header
        lang={lang}
        sections={sections}
        ctaHref="#contact"
        ctaLabel={l.nav.contact}
      />

      {/* Hero */}
      <section className="bg-white">
        <div className="container mx-auto px-6 pt-36 pb-20 text-center sm:pt-44 sm:pb-28">
          <Reveal>
            <p className="text-sm text-muted">{profile.name}</p>
            <h1 className="wrap-jp mx-auto mt-6 max-w-4xl text-[2.75rem] leading-[1.06] font-semibold tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl">
              {l.hero.headline}
            </h1>
            <p className="mt-6 text-lg font-medium tracking-tight text-muted sm:text-2xl">
              {l.hero.stack}
            </p>
            <p className="wrap-jp mx-auto mt-7 max-w-2xl text-base leading-relaxed text-pretty text-ink/70 sm:text-lg">
              {l.hero.lead}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
              <a
                href="#contact"
                className="w-full max-w-xs rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-accent-hover sm:w-auto"
              >
                {l.hero.primaryCta}
              </a>
              <a
                href="#apps"
                className="group inline-flex items-center gap-1.5 text-base font-medium text-accent transition-colors hover:text-accent-hover"
              >
                {l.hero.secondaryCta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  ›
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <dl className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-12 border-t border-hairline/70 pt-14 sm:grid-cols-3 sm:gap-8">
              {stats.map((stat) => (
                <Stat key={stat.label} stat={stat} />
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 個人開発: 1セクション1アプリ */}
      <div id="apps" className="scroll-mt-20">
        <section className="bg-white">
          <div className="container mx-auto px-6 pt-10 pb-4 sm:pt-16">
            <Reveal>
              <SectionHeading
                eyebrow={l.apps.eyebrow}
                title={l.apps.title}
                lead={l.apps.lead}
                centered
              />
            </Reveal>
          </div>
        </section>
        {featured.map((app, index) => (
          <AppSection key={app.name} app={app} lang={lang} index={index} />
        ))}
      </div>

      {/* About */}
      <section id="about" className="scroll-mt-20 bg-white">
        <div className="container mx-auto px-6 py-24 sm:py-32">
          <Reveal>
            <SectionHeading
              eyebrow={l.about.eyebrow}
              title={l.about.title}
              centered
            />
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {profile.specialties.map((item, index) => {
              const [title, description] = splitStatement(item)

              return (
                <Reveal key={item} delay={index * 100} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl bg-surface p-7 sm:p-8">
                    <p className="text-xs font-semibold tracking-[0.2em] text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-7 text-xl leading-snug font-semibold tracking-tight text-ink wrap-jp">
                      {title}
                    </h3>
                    {description && (
                      <p className="mt-4 text-sm leading-relaxed text-muted wrap-jp">
                        {description}
                      </p>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>

          <div className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-14 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <h3 className="mb-5 text-xs font-semibold tracking-[0.15em] text-muted uppercase">
                {l.overview}
              </h3>
              <div className="space-y-5 leading-relaxed text-ink/70">
                {profile.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-2">
              <h3 className="mb-5 text-xs font-semibold tracking-[0.15em] text-muted uppercase">
                {l.technicalBackground}
              </h3>
              <ul className="space-y-4">
                {profile.technicalBackground.map((item) => (
                  <BulletItem key={item}>{item}</BulletItem>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 bg-surface">
        <div className="container mx-auto px-6 py-24 sm:py-32">
          <Reveal>
            <SectionHeading
              eyebrow={l.contact.eyebrow}
              title={l.contact.title}
              lead={l.contact.lead}
              centered
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mx-auto mt-14 max-w-3xl">
              <ContactForm lang={lang} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 職歴・登壇・コミュニティ */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-24 sm:py-32">
          <Reveal>
            <SectionHeading
              eyebrow={l.more.eyebrow}
              title={l.more.title}
              lead={l.more.lead}
            />
          </Reveal>

          <div className="mt-14 border-t border-hairline/70">
            <Reveal>
              <Fold title={l.experience}>
                <div className="space-y-5">
                  {profile.experiences.map((experience) => (
                    <Card key={experience.company}>
                      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight text-ink">
                            {experience.company}
                          </h3>
                          <p className="mt-1 text-sm text-muted">
                            {experience.period}
                          </p>
                        </div>
                        <ExternalLink href={experience.url} label={l.website} />
                      </div>
                      <div className="space-y-5">
                        <div>
                          <SubHeading>{l.projectOverview}</SubHeading>
                          <p className="text-sm leading-relaxed text-ink/70">
                            {experience.overview}
                          </p>
                        </div>
                        <div>
                          <SubHeading>{l.achievements}</SubHeading>
                          <div className="space-y-4">
                            {experience.highlights.map((highlight) => (
                              <div key={highlight.title ?? highlight.points[0]}>
                                {highlight.title && (
                                  <p className="mb-2 text-sm font-semibold text-ink">
                                    {highlight.title}
                                  </p>
                                )}
                                <ul className="space-y-2">
                                  {highlight.points.map((point) => (
                                    <BulletItem key={point}>
                                      <InlineMarkdown>{point}</InlineMarkdown>
                                    </BulletItem>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                        {experience.deliverables && (
                          <div>
                            <SubHeading>{l.deliverables}</SubHeading>
                            <ul className="space-y-2">
                              {experience.deliverables.map((deliverable) => (
                                <BulletItem key={deliverable.url}>
                                  <span>
                                    <a
                                      href={deliverable.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-accent hover:text-accent-hover"
                                    >
                                      {deliverable.name}
                                    </a>
                                    {deliverable.description
                                      ? ` - ${deliverable.description}`
                                      : ''}
                                  </span>
                                </BulletItem>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div>
                          <SubHeading>{l.tech}</SubHeading>
                          <Tags tech={experience.tech} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Fold>
            </Reveal>

            <Reveal>
              <Fold title={l.sideProjects}>
                <div className="space-y-5">
                  {profile.sideProjects.map((project) => (
                    <Card key={project.title}>
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold tracking-tight text-ink">
                            {project.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted">
                            {project.period}
                          </p>
                        </div>
                        {project.url && (
                          <ExternalLink href={project.url} label={l.website} />
                        )}
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-ink/70">
                        {project.overview}
                      </p>
                      <div className="space-y-4">
                        <div>
                          <SubHeading>{l.achievements}</SubHeading>
                          <ul className="space-y-2">
                            {project.points.map((point) => (
                              <BulletItem key={point}>
                                <InlineMarkdown>{point}</InlineMarkdown>
                              </BulletItem>
                            ))}
                          </ul>
                        </div>
                        {project.tech && (
                          <div>
                            <SubHeading>{l.tech}</SubHeading>
                            <Tags
                              tech={[{ label: l.tech, items: project.tech }]}
                            />
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Fold>
            </Reveal>

            <Reveal>
              <Fold title={l.talks}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {profile.talks.map((talk) => (
                    <Card key={`${talk.event}-${talk.title}`}>
                      <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-muted uppercase">
                        {talk.event}
                      </p>
                      <p className="mb-4 text-ink">
                        {lang === 'ja'
                          ? `「${talk.title}」`
                          : `“${talk.title}”`}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {talk.links.map((link) => (
                          <ExternalLink
                            key={link.url}
                            href={link.url}
                            label={link.label}
                          />
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </Fold>
            </Reveal>

            <Reveal>
              <Fold title={l.communities}>
                <div className="space-y-5">
                  {profile.communities.map((community) => (
                    <Card key={community.name}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold tracking-tight text-ink">
                          {community.name}
                        </h3>
                        <ExternalLink
                          href={community.url}
                          label={community.linkLabel}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ink/70">
                        {community.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </Fold>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-hairline/70 bg-surface">
        <div className="container mx-auto flex flex-col items-center gap-6 px-6 py-14 text-center">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-ink">
              {profile.name.toUpperCase()}
            </p>
            <p className="mt-1.5 text-sm text-muted">{profile.role}</p>
          </div>
          <p className="text-sm text-muted">{l.footerNote}</p>
          <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm text-muted">
            <a
              href={lang === 'en' ? '/en' : '/'}
              className="transition-colors hover:text-ink"
            >
              {l.nav.home}
            </a>
            <a
              href={lang === 'en' ? '/en/personal' : '/personal'}
              className="transition-colors hover:text-ink"
            >
              {l.nav.personal}
            </a>
            <a
              href={lang === 'en' ? '/en/articles' : '/articles'}
              className="transition-colors hover:text-ink"
            >
              {l.nav.articles}
            </a>
            <a href="#contact" className="transition-colors hover:text-ink">
              {l.nav.contact}
            </a>
          </nav>
          <div className="flex gap-6">
            <a
              href={profile.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="text-muted transition-colors hover:text-ink"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-ink"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProfilePage
