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
content/profile.json ─┬→ pages/index.tsx  (entaku.dev トップページ)
                      └→ README.md        (GitHubプロフィール, scripts/generate-readme.mjs で生成)

personal.md ───────────→ pages/personal.tsx (getStaticProps でビルド時に読み込み)
```

- `content/profile.ts` は profile.json に型を付けただけのラッパー。フィールドを増やすときは型も更新する。
- profile.json の文字列には `[表示名](URL)` のインラインリンクを書ける。README ではそのまま、サイトでは `pages/index.tsx` の `InlineMarkdown` がリンクとして描画する。
- `personal.md` はサイトの `/personal` にそのまま出る。GitHub上でも読まれるのでマークダウンとして自然に保つ。
- `MAKE.md` / `resume_2026.md` はサイトからは参照していないドキュメント。

## 開発

```bash
yarn dev        # 開発サーバー
yarn test-all   # lint → type-check → readme:check → test（CIと同じ並び）
yarn build      # 本番ビルド
```

- Next.js (Pages Router) + TypeScript + Tailwind CSS v4 + Jest。
- `pages/index.tsx` にはスナップショットテストがある。データを更新したら `yarn test -u` でスナップショットを更新する。
- `react-markdown` は ESM のため Jest から読めない。テスト対象のページ（index）では使わない。personal ページのみで利用している。

## デプロイ

- Vercel（プロジェクト名は `entaku0818.github.io` のまま）。main への push で自動デプロイされ、`https://entaku.dev` に反映される。
- GitHub Pages は廃止済み。`entaku0818.github.io` リポジトリはアーカイブされているので触らない。
