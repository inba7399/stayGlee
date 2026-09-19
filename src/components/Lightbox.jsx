import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * Full screen photo gallery for one stay.
 *
 * Rendered through a portal on purpose: the stay cards sit inside GSAP reveals,
 * and any ancestor with a transform becomes the containing block for
 * position: fixed, which would pin the gallery to the card instead of the
 * window.
 */
export default function Lightbox({ title, photos, index, onIndex, onClose }) {
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const count = photos.length

  const step = useCallback(
    (delta) => onIndex((index + delta + count) % count),
    [index, count, onIndex],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [step, onClose])

  useEffect(() => {
    // Freeze the page behind the gallery, and hand focus back on the way out.
    const opener = document.activeElement
    window.__lenis?.stop()
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.__lenis?.start()
      document.body.style.overflow = ''
      opener?.focus?.()
    }
  }, [])

  // Warm the neighbours so stepping through never shows an empty frame.
  useEffect(() => {
    for (const d of [1, -1]) {
      const img = new Image()
      img.src = photos[(index + d + count) % count].src
    }
  }, [index, photos, count])

  const photo = photos[index]

  return createPortal(
    <div
      className="lbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photos`}
      data-lenis-prevent
      onClick={(e) => {
        // anywhere that is not the photo or a control counts as the backdrop
        if (!e.target.closest('img, button, figcaption, .lbox__bar')) onClose()
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1)
      }}
    >
      <div className="lbox__bar">
        <p className="lbox__title">
          {title}
          <span>
            {index + 1} of {count}
          </span>
        </p>
        <button className="lbox__close" ref={closeRef} onClick={onClose}>
          Close
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <figure className="lbox__stage">
        <img key={photo.src} src={photo.src} alt={photo.alt} />
        <figcaption>{photo.alt}</figcaption>
      </figure>

      <button className="lbox__nav lbox__nav--prev" onClick={() => step(-1)} aria-label="Previous photo">
        <Chevron dir="left" />
      </button>
      <button className="lbox__nav lbox__nav--next" onClick={() => step(1)} aria-label="Next photo">
        <Chevron dir="right" />
      </button>
    </div>,
    document.body,
  )
}

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d={dir === 'left' ? 'M10 2.5 4.5 8l5.5 5.5' : 'M6 2.5 11.5 8 6 13.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
