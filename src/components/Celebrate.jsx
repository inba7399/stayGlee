import { Reveal } from './Parallax.jsx'
import { CELEBRATE } from '../data/content.js'

export default function Celebrate() {
  return (
    <section className="section section--mist" id="celebrate">
      <div className="container">
        <Reveal>
          <div className="celeb-banner">
            <div className="celeb-banner__copy">
              <h2>{CELEBRATE.bannerTitle}</h2>
              <p>{CELEBRATE.bannerBody}</p>
            </div>
            {/* goes to the celebrations page rather than opening a chat, so
                the arrow reads as "there is more through here" */}
            <a className="celeb-banner__go" href={CELEBRATE.path} aria-label={CELEBRATE.link}>
              <GoArrow />
            </a>
          </div>
        </Reveal>

        <Reveal>
          <p className="eyebrow">{CELEBRATE.eyebrow}</p>
          <h2>{CELEBRATE.title}</h2>
          <p className="lead celeb__lead">{CELEBRATE.lead}</p>
        </Reveal>

        {/* each card opens that occasion on the celebrations page */}
        <div className="celeb__grid">
          {CELEBRATE.occasions.map((occasion, i) => (
            <Reveal key={occasion.id} delay={i * 80}>
              <a className="celeb-card" href={`${CELEBRATE.path}#${occasion.id}`}>
                <img src={occasion.photos[0].src} alt={occasion.photos[0].alt} loading="lazy" />
                <span className="celeb-card__label">{occasion.name}</span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="section__foot">
          <a className="text-link" href={CELEBRATE.path}>
            {CELEBRATE.link}
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function GoArrow() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        d="M4 12h15M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
