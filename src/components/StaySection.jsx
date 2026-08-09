import { useLoopSlider } from '../lib/useLoopSlider'
import { STAY_SLIDES } from '../data/content'
import './StaySection.css'

export default function StaySection() {
  const slider = useLoopSlider({ count: STAY_SLIDES.length, align: 'center' })

  // The rail is the slide list repeated end to end; only the first pass is real
  // as far as assistive tech and the tab order are concerned.
  const rail = []
  for (let copy = 0; copy < slider.repeats; copy += 1) {
    STAY_SLIDES.forEach((slide, i) => rail.push({ slide, copy, i }))
  }

  return (
    <section className="stay" id="rooms">
      <div className="shell stay__head" data-anim>
        <h2 className="stay__title u-display">Stay</h2>
        <div className="stay__intro">
          <p className="caption">Settle your mind. Invigorate your spirit.</p>
          <a className="arrow-link arrow-link--serif" href="#contact">
            Book now <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <div className="stay__viewport" ref={slider.viewportRef} onClickCapture={slider.onClickCapture}>
        <div className="stay__track" ref={slider.trackRef}>
          {rail.map(({ slide, copy, i }) => {
            const railIndex = copy * STAY_SLIDES.length + i
            const isCurrent = copy === 0 && i === slider.index
            return (
              <article
                key={`${slide.id}-${copy}`}
                className={`stay__slide${railIndex === slider.activeRail ? ' is-active' : ''}`}
                aria-hidden={isCurrent ? undefined : 'true'}
              >
                <div className="media stay__media">
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    loading={copy === 0 && i === 0 ? 'eager' : 'lazy'}
                    draggable="false"
                  />
                  <span className="stay__shade" aria-hidden="true" />
                </div>
                <h3 className="stay__label">{slide.label}</h3>
                <a className="pill pill--light stay__more" href="#contact" tabIndex={isCurrent ? 0 : -1}>
                  See More
                </a>
              </article>
            )
          })}
        </div>

        <button className="nav-btn stay__nav stay__nav--prev" onClick={slider.prev} aria-label="Previous room">
          <Arrow dir="left" />
        </button>
        <button className="nav-btn stay__nav stay__nav--next" onClick={slider.next} aria-label="Next room">
          <Arrow dir="right" />
        </button>
      </div>

      <div className="dots stay__dots">
        {STAY_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            className={`dots__dot${i === slider.index ? ' is-active' : ''}`}
            onClick={() => slider.goTo(i)}
            aria-label={`Go to ${slide.label.toLowerCase()}`}
            aria-current={i === slider.index}
          />
        ))}
      </div>
    </section>
  )
}

export function Arrow({ dir = 'right' }) {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <path
        d={dir === 'left' ? 'M10 2.5 4.5 8l5.5 5.5' : 'M6 2.5 11.5 8 6 13.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
