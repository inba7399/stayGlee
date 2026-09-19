import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Reveal } from './Parallax.jsx'
import { ClockIcon, PinIcon } from './icons.jsx'
import { EXPLORE } from '../data/content.js'

/** Pixels per second. Low and steady: the rail should drift, not travel. */
const SPEED = 26

/**
 * Anything without a real hover, plus anything narrow, plus anyone who asked
 * for less motion, drives the rail by hand instead of watching it drift.
 */
const MANUAL = '(hover: none), (pointer: coarse), (max-width: 760px), (prefers-reduced-motion: reduce)'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export default function Explore() {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const manual = useMediaQuery(MANUAL)

  // Which card has been opened by tap or keyboard. Hover handles the rest.
  const [openId, setOpenId] = useState(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || manual) return

    const ctx = gsap.context(() => {
      let tween = null

      const build = () => {
        tween?.kill()
        gsap.set(track, { x: 0 })
        // The track holds the item list twice over, so sliding it left by the
        // offset of the first clone lands on an identical frame and the repeat
        // is invisible. Measuring the clone rather than halving scrollWidth
        // matters: half the width lands half a gap short and the rail twitches
        // once per loop.
        const cards = track.children
        const firstClone = cards[EXPLORE.items.length]
        if (!firstClone) return
        const distance = firstClone.offsetLeft - cards[0].offsetLeft
        if (!distance) return
        tween = gsap.to(track, {
          x: -distance,
          duration: distance / SPEED,
          ease: 'none',
          repeat: -1,
        })
        tweenRef.current = tween
      }

      build()

      // Card widths are viewport relative, so the loop distance changes with
      // the window and the tween has to be rebuilt.
      const onResize = () => build()
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }, trackRef)

    return () => {
      ctx.revert()
      tweenRef.current = null
    }
  }, [manual])

  // Ease the rail to a stop rather than freezing it, so reading a card does
  // not feel like the page jammed.
  const slow = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6 })
  }
  const resume = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.9 })
  }

  const rail = manual ? EXPLORE.items : [...EXPLORE.items, ...EXPLORE.items]

  return (
    <section className="section explore" id="explore">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <div>
              <p className="eyebrow">{EXPLORE.eyebrow}</p>
              <h2>{EXPLORE.title}</h2>
            </div>
            <p className="explore__note">{EXPLORE.note}</p>
          </div>
        </Reveal>
      </div>

      <div
        className={`explore__rail ${manual ? 'explore__rail--manual' : ''}`}
        /* Lenis preventDefaults every wheel event, which would kill this
           element's own scrolling. */
        data-lenis-prevent={manual ? '' : undefined}
        onMouseEnter={manual ? undefined : slow}
        onMouseLeave={manual ? undefined : resume}
        onFocusCapture={manual ? undefined : slow}
        onBlurCapture={manual ? undefined : resume}
      >
        <div className="explore__track" ref={trackRef}>
          {rail.map((item, i) => {
            const clone = i >= EXPLORE.items.length
            const n = (i % EXPLORE.items.length) + 1
            const isOpen = !clone && openId === item.id
            return (
              <article
                className={`xcard ${isOpen ? 'is-open' : ''}`}
                key={`${item.id}-${clone ? 'b' : 'a'}`}
                aria-hidden={clone || undefined}
              >
                <img
                  className="xcard__img"
                  src={item.image}
                  alt={clone ? '' : item.alt}
                  loading="lazy"
                  draggable="false"
                />
                <span className="xcard__num">{String(n).padStart(2, '0')}</span>

                <div className="xcard__panel">
                  <h3>{item.title}</h3>
                  <p className="xcard__meta">
                    <span>
                      <ClockIcon />
                      {item.duration}
                    </span>
                    <span>
                      <PinIcon />
                      {item.note}
                    </span>
                  </p>

                  {/* collapsed until the card is hovered, tapped or focused */}
                  <div className="xcard__info">
                    <p className="xcard__text">{item.body}</p>
                  </div>
                </div>

                {/* Covers the card so the whole thing is one big tap target,
                    and gives the detail a keyboard route on the desktop too. */}
                {!clone && (
                  <button
                    className="xcard__toggle"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span className="sr-only">
                      {isOpen ? 'Hide details for ' : 'More about '}
                      {item.title}
                    </span>
                  </button>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
