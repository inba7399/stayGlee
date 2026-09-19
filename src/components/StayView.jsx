import { useEffect, useRef, useState } from 'react'
import { CheckIcon } from './icons.jsx'
import { formatINR, waLinkFor } from '../data/content.js'

/**
 * The room view used on a property's own page, deliberately different from
 * the mosaic card on the landing page. Here the page is about one stay, so it
 * gets a proper viewer: a large stage you can step through with arrows, a
 * thumbnail strip that follows along, and a summary panel beside it.
 */
export default function StayView({ stay, onOpen }) {
  const [active, setActive] = useState(0)
  const stripRef = useRef(null)
  const thumbRefs = useRef([])
  const count = stay.photos.length

  const step = (delta) => setActive((a) => (a + delta + count) % count)

  // keep the active thumbnail in view without dragging the page with it
  useEffect(() => {
    const el = thumbRefs.current[active]
    const strip = stripRef.current
    if (!el || !strip) return
    const left = el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2
    strip.scrollTo({ left, behavior: 'smooth' })
  }, [active])

  const shown = stay.photos[active]

  return (
    <article className="sview">
      <div className="sview__top">
        <div className="sview__gallery">
          <div
            className="sview__stage"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') step(1)
              if (e.key === 'ArrowLeft') step(-1)
            }}
          >
            {/* every photo stays mounted and cross fades, so switching never
                shows an empty frame */}
            {stay.photos.map((p, i) => (
              <img
                key={p.src}
                src={p.src}
                alt={i === active ? p.alt : ''}
                aria-hidden={i === active ? undefined : 'true'}
                className={i === active ? 'is-live' : ''}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}

            <p className="sview__count">
              {active + 1} <i>/</i> {count}
            </p>

            <button
              className="sview__zoom"
              onClick={() => onOpen(active)}
              aria-label={`Open ${shown.alt} full screen`}
            >
              <ExpandIcon />
            </button>

            <button
              className="sview__nav sview__nav--prev"
              onClick={() => step(-1)}
              aria-label="Previous photo"
            >
              <Chevron dir="left" />
            </button>
            <button
              className="sview__nav sview__nav--next"
              onClick={() => step(1)}
              aria-label="Next photo"
            >
              <Chevron dir="right" />
            </button>

            <p className="sview__caption">{shown.alt}</p>
          </div>

          {/* every photo, not just the first few, so the arrows and the strip
              never disagree about where you are */}
          <div className="sview__strip" ref={stripRef} data-lenis-prevent>
            {stay.photos.map((p, i) => (
              <button
                key={p.src}
                ref={(el) => {
                  thumbRefs.current[i] = el
                }}
                className={`sview__thumb${i === active ? ' is-live' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Show ${p.alt}`}
                aria-current={i === active}
              >
                <img src={p.src} alt="" aria-hidden="true" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <aside className="sview__panel">
          <p className="sview__kind">{stay.kind}</p>
          <h2 className="sview__name">{stay.name}</h2>

          <p className="sview__price">
            <strong>{formatINR(stay.price)}</strong>
            <s>{formatINR(stay.was)}</s>
          </p>

          <ul className="sview__facts">
            {stay.facts.map((fact) => (
              <li key={fact}>
                <CheckIcon />
                {fact}
              </li>
            ))}
          </ul>

          <a
            className="btn btn--primary btn--full"
            href={waLinkFor(stay.name)}
            target="_blank"
            rel="noreferrer noopener"
          >
            WhatsApp
          </a>
          <button className="btn btn--outline btn--full" onClick={() => onOpen(0)}>
            See all {count} photos
          </button>
        </aside>
      </div>

      <div className="sview__story">
        <p className="sview__headline">{stay.headline}</p>
        <p className="sview__body">{stay.body}</p>
      </div>

      <ul className="sview__highlights">
        {stay.highlights.map((h) => (
          <li key={h.title}>
            <CheckIcon />
            <strong>{h.title}</strong>
            <p>{h.text}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 16 16" width="17" height="17" aria-hidden="true" focusable="false">
      <path
        d={dir === 'left' ? 'M10 2.5 4.5 8l5.5 5.5' : 'M6 2.5 11.5 8 6 13.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d="M6 1.5H1.5V6M10 1.5h4.5V6M10 14.5h4.5V10M6 14.5H1.5V10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
