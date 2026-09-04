import { motion } from 'motion/react'
import { tournament } from './data/tournament'

const navItems = [
  ['OVERVIEW', '#overview'],
  ['RULES', '#rules'],
  ['SPONSORS', '#sponsors'],
  ['RESULTS', '#results'],
] as const

function HeroTitle({ title }: { title: string }) {
  return (
    <motion.h1
      className="hero-title"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.05, when: 'beforeChildren' } },
      }}
    >
      <motion.span
        className="hero-title-text"
        variants={{
          hidden: { clipPath: 'inset(-12px 100% -12px -12px)' },
          visible: {
            clipPath: 'inset(-12px -12px -12px -12px)',
            transition: { duration: 1.15, ease: 'easeInOut' },
          },
        }}
      >
        {title}
      </motion.span>
      <motion.span
        className="hero-title-scan"
        aria-hidden="true"
        variants={{
          hidden: { left: '-8%', opacity: 0 },
          visible: {
            left: '108%',
            opacity: [0, 1, 1, 0],
            transition: { duration: 1.15, times: [0, 0.1, 0.78, 1], ease: 'easeInOut' },
          },
        }}
      />
    </motion.h1>
  )
}

function BrandMark({ label, logo, logoTone }: { label: string; logo?: string; logoTone?: 'light' | 'color' }) {
  if (logo) return <img className={`brand-image ${logoTone === 'color' ? 'brand-image-color' : ''}`} src={logo} alt={`${label} ロゴ`} />

  return (
    <span className="brand-fallback" aria-label={`${label} ロゴ未設定`}>
      <span>◢</span>
      {label.slice(0, 2)}
    </span>
  )
}

function SponsorCard({ sponsor, featured = false }: { sponsor: (typeof tournament.sponsors)[number]; featured?: boolean }) {
  const content = <>
    {!featured && <BrandMark label={sponsor.name} logo={sponsor.logo} logoTone={sponsor.logoTone} />}
    <div>{featured && <p className="sponsor-role">FUNDING PARTNER</p>}<h3>{sponsor.name}</h3><p>{sponsor.description}</p></div>
    {sponsor.url && <span className="external" aria-hidden="true">↗</span>}
  </>

  const className = `sponsor-card${featured ? ' sponsor-feature' : ''}`
  return sponsor.url ? (
    <a className={className} href={sponsor.url} target="_blank" rel="noreferrer">{content}</a>
  ) : <div className={className}>{content}</div>
}

function App() {
  const [leadSponsor, ...supportSponsors] = tournament.sponsors

  return (
    <main>
      <motion.header
        className="site-header"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <a className="wordmark" href="#top" aria-label="ページ先頭へ">
          <span className="wordmark-mark">◢</span>{tournament.shortTitle}
        </a>
        <nav aria-label="ページ内ナビゲーション">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="header-cta" href={tournament.discordUrl} target="_blank" rel="noreferrer">JOIN</a>
      </motion.header>

      <section className="hero" id="top">
        <motion.div className="hero-grid" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: 1.2 }} />
        <div className="scanline" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.22 } } }}
        >
          <motion.p className="eyebrow" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}><span /> JAPAN COMMUNITY EVENT / 001</motion.p>
          <HeroTitle title={tournament.title} />
          <motion.p className="hero-copy" variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>領土を奪え。戦略を証明しろ。<br />日本のOpenFrontプレイヤーのためのトーナメント。</motion.p>
          <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <a className="button button-primary" href={tournament.discordUrl} target="_blank" rel="noreferrer">
              {tournament.discordLabel} <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-quiet" href="#overview">大会概要 <span aria-hidden="true">↓</span></a>
          </motion.div>
        </motion.div>
        <motion.div className="hero-status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.45 }}>
          <span className="pulse" /> {tournament.status}
        </motion.div>
        <p className="hero-index">01 / 04</p>
      </section>

      <section className="section overview" id="overview">
        <div className="section-heading">
          <p className="eyebrow"><span /> MISSION BRIEFING</p>
          <h2>大会概要</h2>
          <p>{tournament.overview}</p>
        </div>
        <div className="detail-grid">
          <article><p>FORMAT</p><strong>{tournament.format}</strong><small>好きな方と参加 / ランダム編成可</small></article>
          <article><p>SCHEDULE</p><strong>{tournament.schedule}</strong><small>5分以内に集合されない場合は失格</small></article>
          <article><p>ELIGIBILITY</p><strong>{tournament.eligibility}</strong><small>参加方法はDiscordで案内</small></article>
          <article><p>PRIZE</p><strong>{tournament.prize}</strong><small>PayPayを利用できない方は @massoyo へ連絡</small></article>
        </div>
        <div className="prize-breakdown" aria-label="賞金内訳">
          <p>PRIZE BREAKDOWN</p>
          <div>
            {tournament.prizeBreakdown.map((prize) => <span key={prize.place}><b>{prize.place}</b>{prize.amount}</span>)}
          </div>
        </div>
      </section>

      <section className="join-band" aria-labelledby="join-title">
        <div>
          <p className="eyebrow"><span /> ENLIST NOW</p>
          <h2 id="join-title">作戦に参加せよ。</h2>
          <p>参加したい方は「{tournament.entryLocation}」で申請してください。</p>
        </div>
        <a className="button button-primary" href={tournament.discordUrl} target="_blank" rel="noreferrer">DISCORDを開く <span aria-hidden="true">↗</span></a>
      </section>

      <section className="section rules" id="rules">
        <div className="section-heading compact">
          <p className="eyebrow"><span /> PROTOCOL</p>
          <h2>ルール・注意事項</h2>
        </div>
        <div className="rule-list">
          {tournament.rules.map((rule, index) => (
            <article key={rule.title}><b>{String(index + 1).padStart(2, '0')}</b><div><h3>{rule.title}</h3><p>{rule.description}</p></div></article>
          ))}
        </div>
      </section>

      <section className="section sponsors" id="sponsors">
        <div className="section-heading compact">
          <p className="eyebrow"><span /> ALLIED FORCES</p>
          <h2>SPONSORS</h2>
          <p>大会を支援してくださるパートナーの皆さま。</p>
        </div>
        {leadSponsor && <div className="lead-sponsor"><SponsorCard sponsor={leadSponsor} featured /></div>}
        <div className="sponsor-grid">
          {supportSponsors.map((sponsor) => <SponsorCard sponsor={sponsor} key={sponsor.name} />)}
        </div>
      </section>

      <section className="section results" id="results">
        <div className="section-heading compact">
          <p className="eyebrow"><span /> AFTER ACTION REPORT</p>
          <h2>RESULTS</h2>
        </div>
        {tournament.resultsPublished ? (
          <ol className="result-list">
            {tournament.results.map((result) => <li key={`${result.place}-${result.team}`}><b>#{result.place}</b><strong>{result.team}</strong><span>{result.detail}</span></li>)}
          </ol>
        ) : (
          <div className="results-pending"><span>⌁</span><h3>結果は大会終了後に公開</h3><p>熱戦の記録をここに掲載します。</p></div>
        )}
      </section>

      <footer>
        <span className="wordmark"><span className="wordmark-mark">◢</span>{tournament.shortTitle}</span>
        <p>OPENFRONT JAPAN TOURNAMENT</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  )
}

export default App
