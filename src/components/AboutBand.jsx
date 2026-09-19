import Parallax from './Parallax.jsx'
import { ABOUT } from '../data/content.js'

export default function AboutBand() {
  return (
    <section id="about">
      <Parallax src={ABOUT.image} speed={0.2} className="about" alt={ABOUT.imageAlt}>
        <div className="about__copy container">
          <h2>{ABOUT.title}</h2>
          <p>{ABOUT.body}</p>
        </div>
      </Parallax>
    </section>
  )
}
