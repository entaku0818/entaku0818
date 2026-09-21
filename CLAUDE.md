# CLAUDE.md

このリポジトリは **GitHubプロフィール（entaku0818/entaku0818）と entaku.dev のサイトを兼ねる**。
2026-08-09 に `entaku0818.github.io`（アーカイブ済み）をここへ統合した。

## 一番大事なルール

`README.md` を直接編集しない。**`content/profile.json` が唯一の原本**で、README.md はそこから生成される。

```bash
yarn readme        # content/profile.json から README.md を生成
yarn readme:check  # README.md が profile.json と一致するか検証（CIで実行）
```

`content/profile.json` を編集したら必ず `yarn readme` を実行してコミットする。忘れるとCIが落ちる。

## 内容の流れ

```
content/profile.ja.json ─┬→ /            (トップページ)
                         └→ README.md    (GitHubプロフィール)

content/profile.en.json ─┬→ /en
                         └→ README.en.md

personal.md    → /personal      (getStaticProps でビルド時に読み込み)
personal.en.md → /en/personal
```

- `content/profile.ts` は JSON に型を付けたラッパー。`profiles.ja` / `profiles.en` と、locale を `Lang` に変換する `toLang()` を提供する。フィールドを増やすときは型も更新する。
- profile JSON の文字列には `[表示名](URL)` のインラインリンクを書ける。README ではそのまま、サイトでは `components/profilePage.tsx` の `InlineMarkdown` がリンクとして描画する。
- 見出しなどのUI文言はプロフィールデータではなく `content/labels.ts`（`Record<Lang, Labels>`）に置く。
- `personal.md` / `personal.en.md` はサイトにそのまま出る。GitHub上でも読まれるのでマークダウンとして自然に保つ。
- `resume_2026.md` はサイトからは参照していないドキュメント。

## 多言語対応

Next.js の i18n ルーティング（`next.config.js`）を使う。日本語が既定で `/`、英語は `/en` 配下に出る。`localeDetection` は無効なので、ブラウザの言語設定でリダイレクトされることはない。

- ページは薄いラッパーに徹する。`getStaticProps` の `locale` を `toLang()` で `Lang` に変換し、`components/*Page.tsx` に渡すだけ。レイアウトは言語で分岐させない。
- `components/header.tsx` はリンクに `/en` 接頭辞を自分で付ける（素の `<a>` を使っているため）。言語切り替えで同じページに留まれるよう、各ページは `path` を Header に渡す。
- 英語の実績記述は「安全な表現に丸める」方針。公開可否が不明な社内数値（DL数、テスト件数など）は載せない。

## 開発

```bash
yarn dev        # 開発サーバー
yarn test-all   # lint → type-check → readme:check → test（CIと同じ並び）
yarn build      # 本番ビルド
```

- Next.js (Pages Router) + TypeScript + Tailwind CSS v4 + Jest。
- トップページは Apple のプロダクトページ型。白基調・大きな余白・大きなタイポで、ヒーロー → 個人開発 → できること → お問い合わせ → 畳んだ職歴、の順に `components/profilePage.tsx` が組み立てる。色は `styles/globals.css` の `@theme`（`ink` / `muted` / `surface` / `hairline` / `accent`）を使い、生の `gray-*` を足さない。
- 個人開発は **1セクション1アプリ**。`components/appSection.tsx` が端末モック（`components/deviceMock.tsx`、CSSだけで描く）とテキストを左右交互に並べる。
- **README とサイトで載せる本数が違う**。README は `personalApps` を全部出すが、サイトは `featured: true` のものだけセクションを取る（`featuredApps()`）。サイトに載せるアプリは `screenshot` が要る。ヒーローの本数は `releasedApps()`＝ストア配信中の全部を数えるので、セクション数とは一致しない（実績としては全部が本当なので、あえて多いほうを出している）。
- スクロール演出は `hocks/` の自作フックだけで作る（アニメーションライブラリは入れない）。`useReveal` / `useCountUp` は **最初から見えている状態で描画し**、演出できると分かったときだけ `useLayoutEffect` で隠してから動かす。こうしないとSSRのHTMLやJS無効時に中身が消える。`prefersReducedMotion()` を通る経路では演出そのものを行わず、CSS側でも `styles/globals.css` の `prefers-reduced-motion` でトランジションを止めている。
- 1セクション内で複数の要素を動かすときは `Rise` に表示状態を渡し、監視は `useReveal` ひとつにまとめる。要素ごとに監視すると発火がばらついてガタつく。
- Tailwind v4 の `translate-y-*` は `transform` ではなく **`translate` プロパティ**を使う。`transition-[...]` を自分で書くときは `translate` を対象に入れること（`transform` だけだと移動が瞬間移動になる）。`transition-transform` は v4 が `translate` も含めてくれるのでそのままでよい。
- トップページには日英それぞれのスナップショットテストがある。データを更新したら `yarn test -u` で更新する。
- `react-markdown` は ESM のため Jest から読めない。テスト対象のページ（トップ）では使わない。personal ページのみで利用している。
- `/articles` は Google スプレッドシートから記事一覧を取得する（`lib/articles.ts`）。`GOOGLE_SHEETS_API_KEY` が必要で、ローカルは `.env.local`、本番は Vercel の環境変数に置く。キーをソースに直書きしない。

## お問い合わせフォーム

トップページの `#contact` から `pages/api/contact.ts` に POST し、Resend の REST API でメールを送る。SDKは入れず `fetch` で叩いているので依存は増えていない。

環境変数（ローカルは `.env.local`、本番は Vercel）:

| 変数 | 必須 | 内容 |
| --- | --- | --- |
| `RESEND_API_KEY` | ○ | Resend の APIキー |
| `CONTACT_TO_EMAIL` | ○ | 通知の宛先 |
| `CONTACT_FROM_EMAIL` | | 差出人。未設定なら `entaku.dev <onboarding@resend.dev>`（Resendの検証不要な送信元） |

**未設定でも `yarn build` と `yarn dev` は通る。** その状態でフォームを送ると 500 ではなく 503 `{ code: 'not_configured' }` を返し、UIは「準備中なので X か GitHub へ」と案内する。キーを発行したら環境変数を足すだけで動きはじめる。

- バリデーションとレート制限は `lib/contact.ts` に置き、APIルートとフォームで同じ関数を使う（クライアントで弾いた内容はサーバーでも必ず弾く）。
- スパム対策は honeypot（`website` フィールド。埋まっていたら成功したふりをして捨てる）と、IPごと10分5件のメモリ内レート制限。サーバーレスではインスタンスをまたげないので、増えてきたら Upstash などに移す。

## アプリのスクリーンショット

個人開発セクションの端末モックに入れる画像は `public/apps/*.webp`。App Store の
[iTunes Lookup API](https://itunes.apple.com/lookup?id=6759832862&country=jp) の `screenshotUrls`
から取得し、**端末フレームとキャプションを取り除いて画面部分だけを切り出したもの**（ストアのスクショは
マーケティング用に端末の絵が描き込まれているので、そのまま自前のモックに入れると枠が二重になる）。

作り直すときは `scripts/` ではなく都度スクリプトを書く運用でよいが、切り出し範囲は目視で測った固定値を使うこと。
背景色や影が画像ごとに違うため、自動判定は当てにならない。素のスクリーンショットのアプリ（シンプル文字起こし）は
切り出さずそのまま使う。

## デプロイ

- Vercel（プロジェクト名は `entaku0818.github.io` のまま）。main への push で自動デプロイされ、`https://entaku.dev` に反映される。
- GitHub Pages は廃止済み。`entaku0818.github.io` リポジトリはアーカイブされているので触らない。
