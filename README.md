# OpenFront Japan Tournament

OpenFront Japan Tournament の特設ページです。

本大会および本ページはコミュニティによる非公式企画であり、OpenFront 公式は運営・制作に関与していません。

## ローカルで確認する

```bash
npm install
npm run dev
```

## 大会情報を更新する

`src/data/tournament.ts` を編集します。

- `discordUrl`: Discord 招待リンク
- `format` / `schedule` / `eligibility` / `prize`: 大会概要
- `sponsors`: スポンサー一覧。`logo` は `public/` 配下の画像パスまたは画像URL、`logoTone: 'color'` はロゴを元の色で表示。URLがないスポンサーはリンクなしで表示
- `resultsPublished` を `true` にし、`results` を入力すると結果表を公開

## GitHub Pages

`main` ブランチへのpush時、`.github/workflows/deploy-pages.yml` がビルドしてGitHub Pagesへ公開します。リポジトリの **Settings → Pages** で、Source を **GitHub Actions** に設定してください。
