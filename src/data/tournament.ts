export type Sponsor = {
  name: string
  description: string
  url?: string
  logo?: string
  logoTone?: 'light' | 'color'
}

export type Result = {
  place: number
  team: string
  detail: string
}

export type Rule = {
  title: string
  description: string
}

export type Prize = {
  place: string
  amount: string
}

export type Tournament = {
  title: string
  shortTitle: string
  status: string
  discordUrl: string
  discordLabel: string
  entryLocation: string
  schedule: string
  scheduleIso: string
  format: string
  eligibility: string
  prize: string
  prizeBreakdown: Prize[]
  overview: string
  rules: Rule[]
  resultsPublished: boolean
  results: Result[]
  sponsors: Sponsor[]
}

/**
 * 大会情報の更新はこのファイルだけで行えます。
 * logo には public/ 内のパスまたは外部画像 URL を指定してください。
 */
export const tournament: Tournament = {
  title: 'ネスカップ大会',
  shortTitle: 'ネスカップ',
  status: 'エントリー受付中',
  discordUrl: 'https://discord.gg/YkrGu9J7kh',
  discordLabel: 'DISCORDで参加する',
  schedule: '2026年9月13日 20:00（JST）',
  scheduleIso: '2026-09-13T20:00:00+09:00',
  format: 'デュオ大会',
  eligibility: 'デュオ参加 / ランダム編成可',
  prize: '総額 5,500円（PayPay）',
  entryLocation: '[JP] OpenFront日本人サーバー / ネスカップエントリー用',
  prizeBreakdown: [
    { place: '1ST', amount: '1,500円 × 2名' },
    { place: '2ND', amount: '750円 × 2名' },
    { place: '3RD', amount: '300円 × 2名' },
    { place: '4TH–5TH', amount: '100円 × 2名' },
  ],
  overview:
    '好きな方とデュオを組むか、デュオを組みたい参加者とのランダム編成を選べる、OpenFrontのデュオ大会です。',
  rules: [
    {
      title: '試合設定',
      description: 'PvP開始時間は5分、開始資金は1M、マップは世界です。それ以外の設定はノーマルになります。',
    },
    {
      title: '集合時刻',
      description: '開始時刻から5分以内に集合されていない場合は、その場で失格となります。',
    },
    {
      title: '賞金の受け取り',
      description: '賞金はPayPayでお渡しします。PayPayを利用できない方は @massoyo までご連絡ください。',
    },
    {
      title: '順位の決め方',
      description: '3試合の合計ポイントで順位を決定します。1位100PT、2位70PT、3位50PT、4位40PT、5位30PT、6〜8位10PT、9〜10位5PT。1撃破につき7PTです。',
    },
  ],
  resultsPublished: false,
  results: [],
  sponsors: [
    {
      name: '砂糖',
      description: '大会企画および大会賞金をご提供いただきました。SATO鯖のコミュニティへ参加できます。',
      url: 'https://discord.gg/Z283cdawzc',
    },
    {
      name: 'Aotumuri (.w.)',
      description: 'サイト作成に協力しました。',
      logo: `${import.meta.env.BASE_URL}wa-logo.svg`,
      url: 'https://github.com/Aotumuri',
    },
    {
      name: 'OPENFRONT JAPAN CLAN',
      description: '大会用サーバーを提供いただきました。',
      logo: `${import.meta.env.BASE_URL}openfront-jp-color.png`,
      logoTone: 'color',
      url: 'https://discord.com/invite/YkrGu9J7kh',
    },
  ],
}
