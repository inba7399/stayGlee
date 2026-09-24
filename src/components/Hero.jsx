import Parallax, { Reveal } from './Parallax.jsx'
import { HERO, waLink } from '../data/content.js'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Parallax
        video={HERO.video}
        poster={HERO.image}
        speed={0.18}
        className="hero__bg"
        alt={HERO.imageAlt}
        eager
      />

      <div className="hero__content">
        <Reveal>
          <p className="hero__kicker">{HERO.kicker}</p>
          <h1>
            {HERO.title} <em>{HERO.titleEm}</em> {HERO.titleEnd}
          </h1>
          <p className="hero__sub">{HERO.sub}</p>
          <div className="hero__actions">
            <a
              className="btn btn--primary"
              href={waLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              {HERO.ctaPrimary}
            </a>
            <a className="btn btn--ghost" href="#stay">
              {HERO.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="hero__scroll">
        Scroll
        <span />
      </div>
    </section>
  )
}
