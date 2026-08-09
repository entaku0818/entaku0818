import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import Header from '../components/header'
import profile from '../content/profile'
import type { TechCategory } from '../content/profile'
import type { JSX } from 'react'

const Tag = ({ children }: { children: string }) => (
  <span className="inline-block px-2 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-md mr-1 mb-1">
    {children}
  </span>
)

const Tags = ({ tech }: { tech: TechCategory[] }) => (
  <div className="flex flex-wrap mt-2">
    {tech
      .flatMap((category) => category.items)
      .map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
  </div>
)

const SectionTitle = ({ children }: { children: string }) => (
  <h2 className="text-3xl font-bold text-gray-900 mb-10 pl-4 border-l-4 border-indigo-500">
    {children}
  </h2>
)

const inlineLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g

/** profile.json の文中に書かれた `[表示名](URL)` をリンクとして描画する */
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
        className="text-indigo-600 hover:text-indigo-800"
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
  <li className="flex gap-3 items-start">
    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
    <span className="text-gray-600 text-sm">{children}</span>
  </li>
)

const SubHeading = ({ children }: { children: string }) => (
  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
    {children}
  </h4>
)

const Card = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
    {children}
  </div>
)

const ExternalLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
  >
    {label} →
  </a>
)

export const Home = (): JSX.Element => (
  <div className="min-h-screen bg-gray-50">
    <Head>
      <title>{`${profile.name} - ${profile.role}`}</title>
      <meta name="description" content={profile.description} />
      <link rel="icon" href="/favicon.ico" />
      {/* OGP */}
      <meta property="og:title" content={`${profile.name} - ${profile.role}`} />
      <meta property="og:description" content={profile.description} />
      <meta property="og:image" content={`${profile.siteUrl}/api/og`} />
      <meta property="og:url" content={profile.siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={profile.name} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={profile.twitterId} />
      <meta
        name="twitter:title"
        content={`${profile.name} - ${profile.role}`}
      />
      <meta name="twitter:description" content={profile.description} />
      <meta name="twitter:image" content={`${profile.siteUrl}/api/og`} />
    </Head>
    <Header />

    {/* Hero Section */}
    <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      <div className="container mx-auto px-6 pt-40 pb-24">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">
          {profile.role}
        </p>
        <h1 className="text-8xl font-black text-white mb-8 leading-none">
          {profile.name}
        </h1>
        <div className="flex gap-5">
          <a
            href={profile.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FontAwesomeIcon size="lg" icon={faTwitter} />
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FontAwesomeIcon size="lg" icon={faGithub} />
          </a>
        </div>
      </div>
    </div>

    <main className="container mx-auto px-6 py-20">
      {/* Overview */}
      <section className="mb-20">
        <SectionTitle>概要</SectionTitle>
        <div className="text-gray-600 leading-relaxed space-y-4">
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Technical Background */}
      <section className="mb-20">
        <SectionTitle>技術略歴</SectionTitle>
        <ul className="space-y-3 max-w-3xl">
          {profile.technicalBackground.map((item) => (
            <BulletItem key={item}>{item}</BulletItem>
          ))}
        </ul>
      </section>

      {/* Specialties */}
      <section className="mb-20">
        <SectionTitle>得意なこと</SectionTitle>
        <ul className="space-y-3 max-w-3xl">
          {profile.specialties.map((item) => (
            <BulletItem key={item}>{item}</BulletItem>
          ))}
        </ul>
      </section>

      {/* Talks */}
      <section className="mb-20">
        <SectionTitle>登壇歴</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.talks.map((talk) => (
            <Card key={`${talk.event}-${talk.title}`}>
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
                {talk.event}
              </p>
              <p className="text-gray-700 mb-4">「{talk.title}」</p>
              <div className="flex gap-4">
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
      </section>

      {/* Community */}
      <section className="mb-20">
        <SectionTitle>コミュニティ活動</SectionTitle>
        <div className="space-y-6 max-w-2xl">
          {profile.communities.map((community) => (
            <Card key={community.name}>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900">
                  {community.name}
                </h3>
                <ExternalLink
                  href={community.url}
                  label={community.linkLabel}
                />
              </div>
              <p className="text-gray-600 mt-3 text-sm">
                {community.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-20">
        <SectionTitle>職歴</SectionTitle>
        <div className="space-y-6">
          {profile.experiences.map((experience) => (
            <Card key={experience.company}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {experience.company}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {experience.period}
                  </p>
                </div>
                <ExternalLink href={experience.url} label="Website" />
              </div>
              <div className="space-y-5">
                <div>
                  <SubHeading>プロジェクト概要</SubHeading>
                  <p className="text-gray-600 text-sm">{experience.overview}</p>
                </div>
                <div>
                  <SubHeading>実績・取り組み</SubHeading>
                  <div className="space-y-4">
                    {experience.highlights.map((highlight) => (
                      <div key={highlight.title ?? highlight.points[0]}>
                        {highlight.title && (
                          <p className="text-sm font-semibold text-gray-700 mb-2">
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
                    <SubHeading>主な成果物</SubHeading>
                    <ul className="space-y-2">
                      {experience.deliverables.map((deliverable) => (
                        <BulletItem key={deliverable.url}>
                          <span>
                            <a
                              href={deliverable.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800"
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
                  <SubHeading>利用技術</SubHeading>
                  <Tags tech={experience.tech} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Side Projects */}
      <section className="mb-20">
        <SectionTitle>Side Projects</SectionTitle>
        <div className="space-y-6">
          {profile.sideProjects.map((project) => (
            <Card key={project.title}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{project.period}</p>
                </div>
                {project.url && (
                  <ExternalLink href={project.url} label="Website" />
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4">{project.overview}</p>
              <div className="space-y-4">
                <div>
                  <SubHeading>実績・取り組み</SubHeading>
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
                    <SubHeading>利用技術</SubHeading>
                    <Tags tech={[{ label: '利用技術', items: project.tech }]} />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>

    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg font-black tracking-widest mb-2">
          {profile.name.toUpperCase()}
        </p>
        <p className="text-gray-400 text-sm">{profile.role}</p>
      </div>
    </footer>
  </div>
)

export default Home
