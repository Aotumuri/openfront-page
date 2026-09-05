import { motion, MotionConfig, type Variants } from 'motion/react'
import type { IconType } from 'react-icons'
import { FaDiscord } from 'react-icons/fa6'
import { HiArrowDown, HiArrowUp, HiArrowUpRight } from 'react-icons/hi2'
import { LuCalendarDays, LuCrown, LuSwords, LuTrophy } from 'react-icons/lu'
import { tournament } from './data/tournament'

const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const scrollRevealGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const scrollRevealViewport = { once: true, amount: 0.18 } as const

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
      aria-label={title}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.05, when: 'beforeChildren' } },
      }}
    >
      <motion.span
        className="hero-title-text"
        aria-hidden="true"
        variants={{
          hidden: { clipPath: 'inset(-12px 100% -12px -12px)' },
          visible: {
            clipPath: 'inset(-12px -12px -12px -12px)',
            transition: { duration: 1.15, ease: 'easeInOut' },
          },
        }}
      >
        <span>NES</span>
        <span>CUP</span>
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
      <span className="hero-title-jp" aria-hidden="true">{title}</span>
    </motion.h1>
  )
}

function HeroMetric({ icon: Icon, label, value, dateTime }: { icon: IconType; label: string; value: string; dateTime?: string }) {
  return (
    <motion.div className="hero-metric" variants={scrollReveal}>
      <span className="metric-label"><Icon aria-hidden="true" />{label}</span>
      <strong>{dateTime ? <time dateTime={dateTime}>{value}</time> : value}</strong>
    </motion.div>
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
    {sponsor.url && <span className="external" aria-hidden="true"><HiArrowUpRight /></span>}
  </>

  const className = `sponsor-card${featured ? ' sponsor-feature' : ''}`
  return sponsor.url ? (
    <a className={className} href={sponsor.url} target="_blank" rel="noreferrer">{content}</a>
  ) : <div className={className}>{content}</div>
}

function App() {
  const [leadSponsor, ...supportSponsors] = tournament.sponsors
  const [firstPrize, ...otherPrizes] = tournament.prizeBreakdown
  const prizeAmount = tournament.prize.match(/[\d,]+円/)?.[0] ?? tournament.prize

  return (
    <MotionConfig reducedMotion="user">
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
        <div className="hero-corner hero-corner-top" aria-hidden="true" />
        <div className="hero-corner hero-corner-bottom" aria-hidden="true" />
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.22 } } }}
        >
          <motion.p className="eyebrow hero-eyebrow" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}><span /> OPENFRONT JAPAN / COMMUNITY TOURNAMENT</motion.p>
          <HeroTitle title={tournament.title} />
          <motion.p className="hero-copy" variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}><b>領土を奪え。戦略を証明しろ。</b><br />日本のOpenFrontプレイヤーのためのソロトーナメント。</motion.p>
          <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <a className="button button-primary" href={tournament.discordUrl} target="_blank" rel="noreferrer">
              <FaDiscord aria-hidden="true" /> {tournament.discordLabel} <HiArrowUpRight aria-hidden="true" />
            </a>
            <a className="button button-quiet" href="#overview">大会概要 <HiArrowDown aria-hidden="true" /></a>
          </motion.div>
        </motion.div>
        <motion.aside className="hero-broadcast" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.65 } } }} aria-label="大会主要情報">
          <motion.div className="hero-status" variants={scrollReveal}>
            <span><i className="pulse" /> LIVE REGISTRATION</span>
            <b>{tournament.status}</b>
          </motion.div>
          <HeroMetric icon={LuCalendarDays} label="MATCH DAY" value={tournament.schedule} dateTime={tournament.scheduleIso} />
          <HeroMetric icon={LuSwords} label="BATTLE FORMAT" value={tournament.format} />
          <HeroMetric icon={LuTrophy} label="TOTAL PRIZE" value={tournament.prize} />
        </motion.aside>
        <p className="hero-index">TOURNAMENT 001 <span>／</span> OPENFRONT JP</p>
      </section>

      <section className="section overview" id="overview">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollReveal}>
          <div className="section-number" aria-hidden="true">01</div>
          <p className="eyebrow"><span /> EVENT DATA</p>
          <h2>TOURNAMENT<br /><em>OVERVIEW</em></h2>
          <p>{tournament.overview}</p>
        </motion.div>
        <motion.div className="detail-grid" aria-label="大会情報" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollRevealGroup}>
          <motion.article variants={scrollReveal}><p>FORMAT</p><strong>{tournament.format}</strong><small>個人でエントリー</small></motion.article>
          <motion.article variants={scrollReveal}><p>SCHEDULE</p><strong><time dateTime={tournament.scheduleIso}>{tournament.schedule}</time></strong><small>5分以内に集合されない場合は失格</small></motion.article>
          <motion.article variants={scrollReveal}><p>ELIGIBILITY</p><strong>{tournament.eligibility}</strong><small>参加方法はDiscordで案内</small></motion.article>
          <motion.article variants={scrollReveal}><p>PRIZE</p><strong>{tournament.prize}</strong><small>PayPayを利用できない方は @massoyo へ連絡</small></motion.article>
        </motion.div>
        <motion.div className="prize-breakdown" aria-label="賞金内訳" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollReveal}>
          <div className="prize-title" aria-label={tournament.prize}><span>PRIZE POOL</span><strong>{prizeAmount}</strong><small>PAYPAY / TOURNAMENT REWARD</small></div>
          {firstPrize && <div className="prize-first"><LuCrown className="prize-crown" aria-hidden="true" /><span>{firstPrize.place}</span><strong>{firstPrize.amount}</strong><small>CHAMPION</small></div>}
          <div className="prize-places">
            {otherPrizes.map((prize) => <span key={prize.place}><b>{prize.place}</b><strong>{prize.amount}</strong></span>)}
          </div>
        </motion.div>
      </section>

      <motion.section className="join-band" aria-labelledby="join-title" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollReveal}>
        <span className="join-ghost" aria-hidden="true">ENTRY</span>
        <div>
          <p className="eyebrow"><span /> REGISTRATION OPEN</p>
          <h2 id="join-title">挑戦者を、<span>待っている。</span></h2>
          <p>参加したい方は「{tournament.entryLocation}」で申請してください。</p>
        </div>
        <a className="button button-primary" href={tournament.discordUrl} target="_blank" rel="noreferrer"><FaDiscord aria-hidden="true" /> DISCORDを開く <HiArrowUpRight aria-hidden="true" /></a>
      </motion.section>

      <section className="section rules" id="rules">
        <motion.div className="section-heading compact" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollReveal}>
          <div className="section-number" aria-hidden="true">02</div>
          <p className="eyebrow"><span /> MATCH REGULATIONS</p>
          <h2>RULES <em>&amp; FORMAT</em></h2>
          <p>勝敗を分ける大会レギュレーション。</p>
        </motion.div>
        <motion.div className="rule-list" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollRevealGroup}>
          {tournament.rules.map((rule, index) => (
            <motion.article variants={scrollReveal} key={rule.title}><b>{String(index + 1).padStart(2, '0')}</b><div><h3>{rule.title}</h3><p>{rule.description}</p></div></motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section sponsors" id="sponsors">
        <motion.div className="section-heading compact" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollReveal}>
          <div className="section-number" aria-hidden="true">03</div>
          <p className="eyebrow"><span /> TOURNAMENT PARTNERS</p>
          <h2>SPONSORS <em>&amp; CREW</em></h2>
          <p>大会を支援してくださるパートナーの皆さま。</p>
        </motion.div>
        {leadSponsor && <motion.div className="lead-sponsor" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollReveal}><SponsorCard sponsor={leadSponsor} featured /></motion.div>}
        <motion.div className="sponsor-grid" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollReveal}>
          {supportSponsors.map((sponsor) => <SponsorCard sponsor={sponsor} key={sponsor.name} />)}
        </motion.div>
      </section>

      <section className="section results" id="results">
        <motion.div className="section-heading compact" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollReveal}>
          <div className="section-number" aria-hidden="true">04</div>
          <p className="eyebrow"><span /> FINAL STANDINGS</p>
          <h2>MATCH <em>RESULTS</em></h2>
        </motion.div>
        {tournament.resultsPublished ? (
          <motion.ol className="result-list" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollReveal}>
            {tournament.results.map((result) => <li key={`${result.place}-${result.team}`}><b>#{result.place}</b><strong>{result.team}</strong><span>{result.detail}</span></li>)}
          </motion.ol>
        ) : (
          <motion.div className="results-pending" initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={scrollReveal}><LuTrophy aria-hidden="true" /><h3>結果は大会終了後に公開</h3><p>熱戦の記録をここに掲載します。</p></motion.div>
        )}
      </section>

      <footer>
        <span className="wordmark"><span className="wordmark-mark">◢</span>{tournament.shortTitle}</span>
        <div className="footer-copy"><p>OPENFRONT JAPAN TOURNAMENT</p><small>本大会はコミュニティによる非公式企画です。OpenFront公式は運営・制作に関与していません。</small></div>
        <a href="#top">BACK TO TOP <HiArrowUp aria-hidden="true" /></a>
      </footer>
    </main>
    </MotionConfig>
  )
}

export default App
