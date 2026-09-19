import { Reveal } from './Parallax.jsx'
import { CELEBRATE, waLink } from '../data/content.js'

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
            <a
              className="btn btn--primary"
              href={waLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              {CELEBRATE.bannerCta}
            </a>
          </div>
        </Reveal>

        <Reveal>
          <p className="eyebrow">{CELEBRATE.eyebrow}</p>
          <h2>{CELEBRATE.title}</h2>
          <p className="lead celeb__lead">{CELEBRATE.lead}</p>
          <ul className="celeb__packages">
            {CELEBRATE.packages.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Reveal>

        <div className="celeb__grid">
          {CELEBRATE.cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 80}>
              <figure className="celeb-card">
                <img
                  src={card.image}
                  alt={`${card.label.toLowerCase()} set up at StayGlee`}
                  loading="lazy"
                />
                <figcaption>{card.label}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
