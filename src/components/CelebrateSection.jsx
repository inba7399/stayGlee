import { useCallback, useRef } from 'react'
import { CELEBRATE_CARDS } from '../data/content'
import { useMediaQuery } from '../lib/useMediaQuery'
import { useLoopSlider } from '../lib/useLoopSlider'
import './CelebrateSection.css'

const PACKAGES = ['Birthday', 'Anniversary', 'Honeymoon', 'Proposal', 'Baby Shower', 'Reunion']

export default function CelebrateSection() {
  // Five portrait cards never tile gracefully on a phone, so below the
  // breakpoint they become a swipeable rail instead of a grid.
  const isPhone = useMediaQuery('(max-width: 760px)')

  return (
    <section className="celebrate">
      {/* Layered limewash plaster: broad colour blooms, a low-frequency mottle
          and a fine grain, all generated rather than shipped as an image. */}
      <span className="celebrate__wash" aria-hidden="true" />
      <span className="celebrate__mottle" aria-hidden="true" />
      <span className="celebrate__grain" aria-hidden="true" />

      <div className="celebrate__inner shell">
        <h2 className="celebrate__title" data-anim>
          Celebrate your special day in a Special way!
        </h2>

        <p className="celebrate__lead" data-anim>
          We can assure you a day that combines panache with peace of mind. And while we&rsquo;re
          busy planning your day, our kitchen and gracious service provide you with every
          opportunity to relax and anticipate the celebration.
        </p>

        <p className="celebrate__packages" data-anim>
          We offer celebration packages&nbsp;: {PACKAGES.join(' , ')}
        </p>
      </div>

      {isPhone ? (
        <CelebrateRail />
      ) : (
        <div className="celebrate__inner shell">
          <div className="celebrate__row" data-anim-group>
            {CELEBRATE_CARDS.map((card) => (
              <CelebrateCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

/**
 * Endless cover-flow rail, in the spirit of flicking between album covers.
 * The settled card faces you square on; its neighbours swing away on a 3D
 * hinge, sink backwards and fade, and they overlap it slightly so the whole
 * row reads as one deck of cards rather than a list of tiles.
 *
 * The depth is written straight to the DOM on every frame rather than through
 * React state: it has to track the drag continuously, not snap between slides.
 */
function CelebrateRail() {
  const slidesRef = useRef([])

  const applyDepth = useCallback((centre) => {
    slidesRef.current.forEach((slide, j) => {
      const inner = slide?.firstElementChild
      if (!inner) return

      const offset = Math.max(-2.4, Math.min(2.4, j - centre))
      const away = Math.abs(offset)

      // The horizontal pull is what makes neighbours tuck in behind the front
      // card rather than sit beside it, which is where the depth comes from.
      inner.style.transform =
        `translate3d(${-offset * 56}px, 0, ${-away * 120}px)` +
        ` rotateY(${offset * 30}deg) scale(${1 - away * 0.07})`
      inner.style.opacity = String(Math.max(0, 1 - away * 0.42))
      slide.style.zIndex = String(200 - Math.round(away * 20))
    })
  }, [])

  const slider = useLoopSlider({
    count: CELEBRATE_CARDS.length,
    align: 'center',
    onRender: applyDepth,
  })

  const rail = []
  for (let copy = 0; copy < slider.repeats; copy += 1) {
    CELEBRATE_CARDS.forEach((card, i) => rail.push({ card, copy, i }))
  }

  return (
    <div
      className="celebrate__carousel"
      ref={slider.viewportRef}
      onClickCapture={slider.onClickCapture}
      data-anim
    >
      <div className="celebrate__rail" ref={slider.trackRef}>
        {rail.map(({ card, copy, i }) => {
          const railIndex = copy * CELEBRATE_CARDS.length + i
          return (
            <div
              key={`${card.id}-${copy}`}
              className={`celebrate__slide${railIndex === slider.activeRail ? ' is-active' : ''}`}
              ref={(el) => {
                slidesRef.current[railIndex] = el
              }}
              aria-hidden={copy > 0 || undefined}
            >
              {/* The 3D transform lives on an inner box: the slider measures
                  the slide itself, and a transform distorts that reading. */}
              <div className="celebrate__slide-inner">
                <CelebrateCard card={card} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CelebrateCard({ card }) {
  return (
    <figure className="celebrate-card">
      <div className="celebrate-card__frame">
        <img src={card.img} alt={`${card.label.toLowerCase()} set-up at StayGlee`} loading="lazy" draggable="false" />
      </div>
      <figcaption className="celebrate-card__label">{card.label}</figcaption>
    </figure>
  )
}
