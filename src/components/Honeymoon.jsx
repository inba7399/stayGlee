import { Reveal } from './Parallax.jsx'
import { CheckIcon } from './icons.jsx'
import { HONEYMOON } from '../data/content.js'

export default function Honeymoon() {
  return (
    <section className="section">
      <div className="container honey__grid">
        <Reveal className="honey__copy">
          <p className="eyebrow">{HONEYMOON.eyebrow}</p>
          <h2>{HONEYMOON.title}</h2>
          <p className="lead">{HONEYMOON.body}</p>

          <ul className="honey__list">
            {HONEYMOON.benefits.map((benefit) => (
              <li key={benefit}>
                <CheckIcon />
                {benefit}
              </li>
            ))}
          </ul>

          <p className="honey__closing">{HONEYMOON.closing}</p>
          <p className="honey__terms">{HONEYMOON.terms}</p>
        </Reveal>

        <Reveal className="honey__media" delay={120}>
          <div className="honey__shot honey__shot--main">
            <img src={HONEYMOON.imageMain} alt={HONEYMOON.imageMainAlt} loading="lazy" />
          </div>
          <div className="honey__shot honey__shot--inset">
            <img src={HONEYMOON.imageInset} alt={HONEYMOON.imageInsetAlt} loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
