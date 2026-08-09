import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import Header from '../components/header'
import type { JSX } from 'react'

const Tag = ({ children }: { children: string }) => (
  <span className="inline-block px-2 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-md mr-1 mb-1">
    {children}
  </span>
)

const Tags = ({ text }: { text: string }) => (
  <div className="flex flex-wrap mt-2">
    {text.split(' / ').map((tag) => (
      <Tag key={tag}>{tag.trim()}</Tag>
    ))}
  </div>
)

const SectionTitle = ({ children }: { children: string }) => (
  <h2 className="text-3xl font-bold text-gray-900 mb-10 pl-4 border-l-4 border-indigo-500">
    {children}
  </h2>
)

const BulletItem = ({ children }: { children: JSX.Element | string }) => (
  <li className="flex gap-3 items-start">
    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
    <span className="text-gray-600 text-sm">{children}</span>
  </li>
)

export const Home = (): JSX.Element => (
  <div className="min-h-screen bg-gray-50">
    <Head>
      <title>entaku - Mobile App Developer</title>
      <meta
        name="description"
        content="iOSリードエンジニア。Swift / Kotlin / Go を使ったモバイルアプリ開発が得意。TVer・Voicy 等でリードエンジニアとして活躍。"
      />
      <link rel="icon" href="/favicon.ico" />
      {/* OGP */}
      <meta property="og:title" content="entaku - Mobile App Developer" />
      <meta
        property="og:description"
        content="iOSリードエンジニア。Swift / Kotlin / Go を使ったモバイルアプリ開発が得意。TVer・Voicy 等でリードエンジニアとして活躍。"
      />
      <meta property="og:image" content="https://entaku.dev/api/og" />
      <meta property="og:url" content="https://entaku.dev" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="entaku" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@entaku_0818" />
      <meta name="twitter:title" content="entaku - Mobile App Developer" />
      <meta
        name="twitter:description"
        content="iOSリードエンジニア。Swift / Kotlin / Go を使ったモバイルアプリ開発が得意。TVer・Voicy 等でリードエンジニアとして活躍。"
      />
      <meta name="twitter:image" content="https://entaku.dev/api/og" />
    </Head>
    <Header />

    {/* Hero Section */}
    <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      <div className="container mx-auto px-6 pt-40 pb-24">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">
          Mobile App Developer
        </p>
        <h1 className="text-8xl font-black text-white mb-8 leading-none">
          entaku
        </h1>
        <div className="flex gap-5">
          <a
            href="https://twitter.com/entaku_0818"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FontAwesomeIcon size="lg" icon={faTwitter} />
          </a>
          <a
            href="https://github.com/entaku0818"
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
          <p>
            IT専門学校を卒業後、10年以上にわたりソフトウェア開発の幅広い経験を積んできました。SIerではインフラからフロントエンドまでのシステム開発に携わり、その後モバイルアプリ開発に特化。iOS/Android両プラットフォームで複数のアプリをリリースし、特に音声配信やリアルタイム通信を活用したアプリ開発で実績を重ねてきました。
          </p>
          <p>
            直近では株式会社VoicyでiOSエンジニア兼チームリーダーとして、外注主体だったアプリ開発を内製化。マルチモジュール化を進め、新規モジュールではテストカバレッジ80%以上を達成。また、アジャイル開発を導入してパーソナリティ向け施策の開発を主導し、コラボ収録機能などの新機能開発からアーキテクチャ刷新まで行い、新たに100名のパーソナリティへコラボ収録をしていただくことができました。
          </p>
          <p>
            2025年1月より株式会社TVerでiOSのリードエンジニアとして働いています。
          </p>
          <p>
            iOSDC JAPAN
            2024での登壇やSwift愛好会の運営など、技術コミュニティへの貢献にも力を入れています。
          </p>
        </div>
      </section>

      {/* Technical Background */}
      <section className="mb-20">
        <SectionTitle>技術略歴</SectionTitle>
        <ul className="space-y-3 max-w-3xl">
          {[
            'SIer時代に培ったインフラ、バックエンド、フロントエンドの幅広い開発経験',
            'iOS/Androidのモバイルアプリ開発に精通し、両プラットフォームに対応可能',
            'アジャイル開発の導入と運用により、開発プロジェクトの推進とチームの成長に貢献',
            'プロジェクトマネジメントの経験を活かし、ステークホルダーとの調整や優先順位付けを円滑に行う能力',
          ].map((item) => (
            <BulletItem key={item}>{item}</BulletItem>
          ))}
        </ul>
      </section>

      {/* Specialties */}
      <section className="mb-20">
        <SectionTitle>得意なこと</SectionTitle>
        <ul className="space-y-3 max-w-3xl">
          {[
            'モバイルアプリの開発、アーキテクチャ設計',
            '音声配信 / ライブ配信の仕組み作り',
            '事業マインドを持ったプロダクト開発 — 技術だけでなく事業成長の視点から施策を考え、実行できるエンジニアを目指している',
          ].map((item) => (
            <BulletItem key={item}>{item}</BulletItem>
          ))}
        </ul>
      </section>

      {/* Main Outputs */}
      <section className="mb-20">
        <SectionTitle>登壇歴</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
              iOSDC JAPAN 2020
            </p>
            <p className="text-gray-700 mb-4">
              「DroidKaigiの公式アプリで始めるiOSアプリのOSSコミッターへの道」
            </p>
            <div className="flex gap-4">
              <a
                href="https://fortee.jp/iosdc-japan-2020/proposal/c3c70224-08cf-48d7-b5e5-a3d4589737fa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                詳細 →
              </a>
              <a
                href="https://speakerdeck.com/entaku/droidkaigifalsegong-shi-ahuriteshi-meru-iosahuriosskomitutahefalsedao"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                Speaker Deck →
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
              Vue.js アーキテクチャリング勉強会
            </p>
            <p className="text-gray-700 mb-4">
              「Vue / Vuex のアーキテクチャを完全に理解した」
            </p>
            <div className="flex gap-4">
              <a
                href="https://cw-engineers.connpass.com/event/146975/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                詳細 →
              </a>
              <a
                href="https://speakerdeck.com/entaku/vue-vuex-falseakitekutiyawan-quan-nili-jie-sita"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                Speaker Deck →
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
              iOSDC JAPAN 2021
            </p>
            <p className="text-gray-700 mb-4">
              「既存のネイティブアプリをFlutterへリプレイスする方法」
            </p>
            <div className="flex gap-4">
              <a
                href="https://iosdc.jp/2021/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                詳細 →
              </a>
              <a
                href="https://speakerdeck.com/entaku/pickgo-for-partnerfalseyi-xing-fang-fa-karaxue-hu-ji-cun-falseneiteihuahuriwoflutterherihureisusurufang-fa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                Speaker Deck →
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
              iOSDC JAPAN 2022
            </p>
            <p className="text-gray-700 mb-4">
              「音声配信アプリにおけるiOSを使った音声配信の全てと裏側」
            </p>
            <div className="flex gap-4">
              <a
                href="https://fortee.jp/iosdc-japan-2022/proposal/ee2ab807-9053-4779-84f9-ec9951f7cfc0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                詳細 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="mb-20">
        <SectionTitle>コミュニティ活動</SectionTitle>
        <div className="space-y-6 max-w-2xl">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-gray-900">Swift愛好会</h3>
              <a
                href="https://love-swift.connpass.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                connpass →
              </a>
            </div>
            <p className="text-gray-600 mt-3 text-sm">
              Swiftエンジニア2,200名以上が参加するコミュニティの運営メンバー。月1〜2回のペースで勉強会を企画・開催（vol.98まで継続中）。
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-gray-900">DroidKaigi</h3>
              <a
                href="https://droidkaigi.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Website →
              </a>
            </div>
            <p className="text-gray-600 mt-3 text-sm">
              Android開発者向けカンファレンス「DroidKaigi」のスタッフとして運営に参加。
            </p>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-20">
        <SectionTitle>職歴</SectionTitle>
        <div className="space-y-6">
          {/* TVer */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">TVer</h3>
                <p className="text-sm text-gray-400 mt-1">2025/01 - 現在</p>
              </div>
              <a
                href="https://tver.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Website →
              </a>
            </div>
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  プロジェクト概要
                </h4>
                <p className="text-gray-600 text-sm">
                  日本最大級の民放公式テレビポータル「TVer」にて、iOSリードエンジニアとして参画。動画配信プラットフォームの開発・改善を担当。
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  実績・取り組み
                </h4>
                <ul className="space-y-2">
                  {[
                    'Xcode Cloudを導入し、PR単位での自動テスト実行とビルド検証を実現',
                    'ウォークスルー画面を全面刷新し、直感的なオンボーディングUIに改善',
                    '2026年ミラノ冬季オリンピック向けの特集トップ画面・特集UIを新規実装',
                    '動画再生関連コードをTCA（The Composable Architecture）でリプレイスし保守性向上',
                  ].map((item) => (
                    <BulletItem key={item}>{item}</BulletItem>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  利用技術
                </h4>
                <Tags text="Swift / SwiftUI / UIKit / Combine / TCA / AVFoundation / AVPlayer / Xcode Cloud" />
              </div>
            </div>
          </div>

          {/* Voicy */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Voicy</h3>
                <p className="text-sm text-gray-400 mt-1">2021/12 - 2024/12</p>
              </div>
              <a
                href="https://voicy.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Website →
              </a>
            </div>
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  プロジェクト概要
                </h4>
                <p className="text-gray-600 text-sm">
                  音声配信プラットフォーム「Voicy」にて、iOSエンジニア兼チームリーダーとして3年間従事。パーソナリティ向け収録アプリの開発責任者として、外注主体だった開発体制の内製化からアーキテクチャ刷新、新機能開発までをリードした。
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  実績・取り組み
                </h4>
                <ul className="space-y-2">
                  {[
                    'マルチモジュールアーキテクチャを導入し、新規モジュールでテストカバレッジ80%以上を達成。リリース後の不具合報告が約40%減少',
                    'コラボ収録機能を設計・開発。リリース後100名以上のパーソナリティが利用',
                    'Agoraを活用したリアルタイム音声配信（生放送）機能をiOS/Android両プラットフォームで実装',
                  ].map((item) => (
                    <BulletItem key={item}>{item}</BulletItem>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  利用技術
                </h4>
                <Tags text="Swift / Kotlin / Go / SwiftUI / UIKit / RxSwift / Jetpack Compose / AVFoundation / Agora SDK / ExoPlayer / XCTest / GitHub Actions" />
              </div>
            </div>
          </div>

          {/* CBCloud */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">CBCloud</h3>
                <p className="text-sm text-gray-400 mt-1">2019/04 - 2021/11</p>
              </div>
              <a
                href="https://cb-cloud.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Website →
              </a>
            </div>
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  プロジェクト
                </h4>
                <ul className="space-y-2">
                  <BulletItem>
                    <span>
                      <a
                        href="https://smaryu.town/truck/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        SmaRyuTruck
                      </a>{' '}
                      の新規開発
                    </span>
                  </BulletItem>
                  <BulletItem>
                    <span>
                      <a
                        href="https://pickgo.town/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        PickGo
                      </a>{' '}
                      の開発・運用
                    </span>
                  </BulletItem>
                  <BulletItem>
                    <a
                      href="https://press.jal.co.jp/ja/release/202103/005969.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      JAL航空便連携
                    </a>
                  </BulletItem>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  利用技術
                </h4>
                <Tags text="Swift / Kotlin / Nuxt.js" />
              </div>
            </div>
          </div>

          {/* Lifesports */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Lifesports</h3>
                <p className="text-sm text-gray-400 mt-1">2018/02 - 2019/03</p>
              </div>
              <a
                href="https://lifesports.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Website →
              </a>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                スポーツ事業に関わる企業で、エンジニアとしてユーザー数を増やすための既存機能の修正やコミュニティ機能の設計・実装を行い、ユーザーの利用体験を向上させた。
              </p>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  利用技術
                </h4>
                <Tags text="Swift / Kotlin / Laravel" />
              </div>
            </div>
          </div>

          {/* AP Communications */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  エーピーコミュニケーションズ
                </h3>
                <p className="text-sm text-gray-400 mt-1">2013/09 - 2018/02</p>
              </div>
              <a
                href="https://www.ap-com.co.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Website →
              </a>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                ネットワーク系SIerで、ネットワークエンジニアとして国内大手ネットワーク認証システムの運用やシステムリプレイスを担当。開発部門に異動後は、教育事業会社や娯楽事業のサービス保守システムリプレイスなど、様々なプロジェクトに携わった。
              </p>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  利用技術
                </h4>
                <Tags text="Java (Spring) / PHP (Laravel) / MySQL" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Side Projects */}
      <section className="mb-20">
        <SectionTitle>Side Projects</SectionTitle>
        <div className="space-y-6">
          {/* ishin */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  ishin モバイルエンジニア
                </h3>
                <p className="text-sm text-gray-400 mt-1">2025/07 - 2026/03</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              AIアバターが参加できる音声トークルームサービス「ishin」の開発に参加。モバイルアプリ・バックエンドAPI・Web
              の3領域にまたがって機能開発を担当した。
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  実績・取り組み
                </h4>
                <ul className="space-y-2">
                  {[
                    'React Native（Expo SDK 52）でトークルーム参加UI・波紋アニメーション・AIアバター選択機能などを実装',
                    'AIアバターのバッジ表示・自動応答トリガー・メッセージ表示キューシステムを設計・開発',
                    'キニナル（フォロー）機能・ブロック機能をモバイルとAPIの両側で実装',
                    'Firebase Analytics / BigQuery連携によるトークルーム参加・作成イベントのトラッキング基盤を構築',
                    'App Tracking Transparency（ATT）対応・GIF圧縮・EASビルドサイズ最適化などApp Store申請対応を担当',
                    'ishin-web（Next.js）でOGP画像生成を最適化。フォントキャッシュとメモリキャッシュの導入により初回11秒から1.75秒へ6.6倍高速化を達成',
                    'GoバックエンドAPIでハートビートAPI・BigQuery同期・AIアバター管理などのエンドポイントを開発',
                  ].map((item) => (
                    <BulletItem key={item}>{item}</BulletItem>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  利用技術
                </h4>
                <Tags text="React Native / Expo / TypeScript / Go / Next.js / Firebase / BigQuery / Auth0 / EAS" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  linq社 iOSエンジニア
                </h3>
                <p className="text-sm text-gray-400 mt-1">2023/04 - 2024/04</p>
              </div>
              <a
                href="https://linq.co.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Website →
              </a>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              位置情報共有アプリwhooのSwiftUI化や利用ユーザー増加のためのMap上でスタンプを送る機能ややフレンドメッセージ機能を開発しました。また、マップ上のユーザーインタラクティブなアニメーションなどを対応しました。
            </p>
            <Tags text="SwiftUI / UIKit / MapKit / CoreLocation / Core Animation" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  ヘルスケアアプリ モバイルエンジニア
                </h3>
                <p className="text-sm text-gray-400 mt-1">2022/11 - 2023/03</p>
              </div>
              <a
                href="https://soxai.co.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Website →
              </a>
            </div>
            <p className="text-gray-600 text-sm">
              quasarというマルチプラットフォーム開発技術で開発した。主に新アプリの画面リプレイスでヘルス画面というグラフを書く画面などを担当した。
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  nossa360 Androidエンジニア
                </h3>
                <p className="text-sm text-gray-400 mt-1">2020/04 - 2021/03</p>
              </div>
              <a
                href="https://lp.nossa360biz.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Website →
              </a>
            </div>
            <p className="text-gray-600 text-sm">
              nossa360という建築会社向けのカメラアプリを開発保守。主にAndroidのCameraAPI開発した。
            </p>
          </div>
        </div>
      </section>
    </main>

    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg font-black tracking-widest mb-2">ENTAKU</p>
        <p className="text-gray-400 text-sm">Mobile App Developer</p>
      </div>
    </footer>
  </div>
)

export default Home
