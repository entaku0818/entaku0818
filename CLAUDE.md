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
- トップページには日英それぞれのスナップショットテストがある。データを更新したら `yarn test -u` で更新する。
- `react-markdown` は ESM のため Jest から読めない。テスト対象のページ（トップ）では使わない。personal ページのみで利用している。
- `/articles` は Google スプレッドシートから記事一覧を取得する（`lib/articles.ts`）。`GOOGLE_SHEETS_API_KEY` が必要で、ローカルは `.env.local`、本番は Vercel の環境変数に置く。キーをソースに直書きしない。

## デプロイ

- Vercel（プロジェクト名は `entaku0818.github.io` のまま）。main への push で自動デプロイされ、`https://entaku.dev` に反映される。
- GitHub Pages は廃止済み。`entaku0818.github.io` リポジトリはアーカイブされているので触らない。
