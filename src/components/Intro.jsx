import { Reveal } from './Parallax.jsx'
import { INTRO } from '../data/content.js'

export default function Intro() {
  return (
    <section className="intro section">
      <div className="container intro__grid">
        <Reveal>
          <p className="eyebrow">{INTRO.eyebrow}</p>
          <h2>{INTRO.title}</h2>
          <p className="lead">{INTRO.body}</p>
          <a href="#stay" className="text-link">
            {INTRO.link} <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="stats">
            {INTRO.stats.map((s) => (
              <div className="stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
