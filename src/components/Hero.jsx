import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { BRAND, HERO_FEATURES } from '../data/content'
import DateRangePicker from './DateRangePicker'
import './Hero.css'

const GUEST_OPTIONS = ['1 Room - 2 Guests', '1 Room - 3 Guests', '2 Rooms - 4 Guests', '3 Rooms - 6 Guests']

export default function Hero({ logoSlotRef }) {
  const rootRef = useRef(null)
  const [activeFeature, setActiveFeature] = useState(0)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.25 })
      tl.from('.hero__bg img', { scale: 1.16, duration: 2.2, ease: 'power2.out' }, 0)
        .from('.hero__title-line', { y: 44, opacity: 0, duration: 1.05, stagger: 0.12 }, 0.35)
        // clearProps matters here: a leftover inline transform would keep each
        // field its own stacking context, which is what lets later siblings
        // paint over the open date picker.
        .from(
          '.hero__field',
          { y: 26, opacity: 0, duration: 0.85, stagger: 0.1, clearProps: 'transform' },
          0.65
        )
        .from('.hero__submit', { y: 20, opacity: 0, duration: 0.8, clearProps: 'transform' }, 0.85)
        .from(
          '.hero__feature',
          { y: 26, opacity: 0, duration: 0.85, stagger: 0.09, clearProps: 'transform' },
          0.8
        )
        .from('.hero__scroll-cue', { opacity: 0, duration: 0.8 }, 1.2)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero__bg">
        <img
          src="/img/kodai/dolphins-nose.jpg"
          alt="Layered hills of the Palani range falling away below Kodaikanal"
          fetchpriority="high"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__body shell">
        {/* Departure point for the flying logo. */}
        <div className="hero__logo-slot" ref={logoSlotRef}>
          <img className="hero__logo-static" src="/img/logo.png" alt={`${BRAND.name}, ${BRAND.tagline}`} />
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line hero__title-line--gold">Wake up in the clouds.</span>
          <span className="hero__title-line">Homestay &amp; rooms in Kodaikanal.</span>
        </h1>

        <form className="hero__booking" onSubmit={(e) => e.preventDefault()}>
          <div className="hero__field">
            <span className="hero__field-label">Check in - Check out</span>
            <DateRangePicker />
          </div>

          <label className="hero__field">
            <span className="hero__field-label">Guest</span>
            <div className="hero__select">
              <select defaultValue={GUEST_OPTIONS[0]} aria-label="Guests">
                {GUEST_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <Chevron />
            </div>
          </label>

          <button className="hero__submit" type="submit">
            Check Rates
          </button>
        </form>
      </div>

      <div className="hero__features">
        <div className="hero__features-inner shell">
          {HERO_FEATURES.map((feature, i) => (
            <button
              key={feature.label}
              className={`hero__feature${i === activeFeature ? ' is-active' : ''}`}
              onMouseEnter={() => setActiveFeature(i)}
              onFocus={() => setActiveFeature(i)}
              onClick={() => setActiveFeature(i)}
              type="button"
            >
              <img src={feature.icon} alt="" aria-hidden="true" />
              <span>{feature.label}</span>
            </button>
          ))}
        </div>
      </div>

      <span className="hero__scroll-cue" aria-hidden="true">
        <span />
      </span>
    </section>
  )
}

function Chevron() {
  return (
    <svg viewBox="0 0 12 8" width="12" height="8" aria-hidden="true" focusable="false">
      <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
