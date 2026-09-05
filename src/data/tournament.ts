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
  format: 'ソロ大会',
  eligibility: 'ソロ参加',
  prize: '総額 6,050円（PayPay）',
  entryLocation: 'ネスカップエントリー用',
  prizeBreakdown: [
    { place: '1ST', amount: '3,000円' },
    { place: '2ND', amount: '1,500円' },
    { place: '3RD', amount: '750円' },
    { place: '4TH', amount: '500円' },
    { place: '5TH', amount: '300円' },
  ],
  overview:
    '個人で参加するOpenFrontのソロ大会です。ソロ形式への変更に伴い賞金プールも増額しました。ぜひたくさんのご参加をお待ちしています。',
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
      description: '3試合の合計ポイントで順位を決定します。1マッチごとのポイントは、1位100PT、2位70PT、3位50PT、4位45PT、5位40PT、6位35PT、7位30PT、8位25PT、9位20PT、10位16PT、11位14PT、12位12PT、13位10PT、14位8PT、15位6PT、16位5PT、17位4PT、18位3PT、19位2PT、20位1PTです。1撃破につき10PTを加算します。ポイントが同一の場合は、3試合の平均順位が高いプレイヤーを上位とします。',
    },
  ],
  resultsPublished: false,
  results: [],
  sponsors: [
    {
      name: 'SATO鯖',
      description: '大会をご支援いただいています。クラン作成には15人のアクティブメンバーが必要なため、参加や見学だけでも歓迎しています。',
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
