import { Reveal } from './Parallax.jsx'
import { CLOSING, waLink } from '../data/content.js'

export default function ClosingCta() {
  return (
    <section className="cta">
      <div className="container cta__inner">
        <Reveal>
          <h2>{CLOSING.title}</h2>
          <a className="btn btn--light" href={waLink} target="_blank" rel="noreferrer noopener">
            {CLOSING.button}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
