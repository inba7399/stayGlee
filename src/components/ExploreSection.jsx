import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { useLoopSlider } from '../lib/useLoopSlider'
import { EXPLORE_ITEMS } from '../data/content'
import { Arrow } from './StaySection'
import './ExploreSection.css'

export default function ExploreSection() {
  const rootRef = useRef(null)
  const slider = useLoopSlider({ count: EXPLORE_ITEMS.length })

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%', once: true },
      })

      // The title wipes up out of its own mask, the intro lines follow, the
      // arrows pop in, and the whole rail rises in underneath.
      tl.from('.explore__title span', { yPercent: 115, duration: 1.05 }, 0)
        .from('.explore__intro > *', { y: 28, opacity: 0, duration: 0.85, stagger: 0.13 }, 0.18)
        .from(
          '.explore__nav .nav-btn',
          { scale: 0.5, opacity: 0, duration: 0.7, stagger: 0.1, clearProps: 'transform' },
          0.34
        )
        .from(
          '.explore__viewport',
          { y: 70, opacity: 0, duration: 1.2, clearProps: 'transform' },
          0.22
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  // The rail is the item list repeated end to end; only the first pass is real
  // as far as assistive tech and the tab order are concerned.
  const rail = []
  for (let copy = 0; copy < slider.repeats; copy += 1) {
    EXPLORE_ITEMS.forEach((item) => rail.push({ item, copy }))
  }

  return (
    <section className="explore" id="explore" ref={rootRef}>
      <div className="shell explore__head">
        <h2 className="explore__title u-display">
          <span>Explore</span>
        </h2>
        <div className="explore__intro">
          <p className="body-text">Discover unique experiences, curated just for you.</p>
          <a className="arrow-link" href="#contact">
            View All Explore <span aria-hidden="true">&rsaquo;</span>
          </a>
        </div>
        <div className="explore__nav">
          <button className="nav-btn" onClick={slider.prev} aria-label="Previous experience">
            <Arrow dir="left" />
          </button>
          <button className="nav-btn" onClick={slider.next} aria-label="Next experience">
            <Arrow dir="right" />
          </button>
        </div>
      </div>

      <div
        className="explore__viewport"
        ref={slider.viewportRef}
        onClickCapture={slider.onClickCapture}
      >
        <div className="explore__track" ref={slider.trackRef}>
          {rail.map(({ item, copy }) => {
            const isClone = copy > 0
            return (
              <a
                key={`${item.id}-${copy}`}
                className="explore__card"
                href="#contact"
                draggable="false"
                tabIndex={isClone ? -1 : undefined}
                aria-hidden={isClone || undefined}
              >
                <div className="explore__media">
                  <img src={item.img} alt={isClone ? '' : item.alt} loading="lazy" draggable="false" />
                </div>
                <span className="explore__shade" aria-hidden="true" />

                <div className="explore__front">
                  <h3 className="explore__front-title">{item.title}</h3>
                  <span className="pill pill--light">See More</span>
                </div>

                <div className="explore__panel">
                  <p className="explore__panel-title" aria-hidden="true">
                    {item.title}
                  </p>
                  <div className="explore__meta">
                    <span className="explore__meta-item">
                      <ClockIcon />
                      {item.duration}
                    </span>
                    <span className="explore__meta-item">
                      <PinIcon />
                      {item.note}
                    </span>
                  </div>
                  <p className="explore__text">{item.body}</p>
                  <p className="explore__price">{item.price}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M8 4.4V8l2.4 1.6" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">
      <path
        d="M8 1.6c2.3 0 4.2 1.9 4.2 4.2 0 3.1-4.2 8.6-4.2 8.6S3.8 8.9 3.8 5.8C3.8 3.5 5.7 1.6 8 1.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="8" cy="5.8" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}
