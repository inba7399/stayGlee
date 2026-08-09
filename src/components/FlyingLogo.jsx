import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import { BRAND } from '../data/content'
import './FlyingLogo.css'

/**
 * The logo lives in a single fixed-position element that is scrubbed from its
 * resting place in the hero up into the header as you scroll - so it reads as
 * one continuous object "attaching" itself to the nav bar rather than two
 * separate logos cross-fading.
 *
 * Both endpoints are measured from invisible slot elements, which keeps the
 * flight accurate at any viewport size and after any layout reflow.
 */
export default function FlyingLogo({ heroSlotRef, headerSlotRef }) {
  const logoRef = useRef(null)

  useLayoutEffect(() => {
    const logo = logoRef.current
    const heroSlot = heroSlotRef.current
    const headerSlot = headerSlotRef.current
    if (!logo || !heroSlot || !headerSlot) return undefined

    const measure = () => {
      const scrollY = window.scrollY || 0
      const hero = heroSlot.getBoundingClientRect()
      const header = headerSlot.getBoundingClientRect()
      return {
        // Fixed positioning is viewport-relative; the hero slot's document
        // offset is its viewport position at scroll 0, which is where the
        // flight begins.
        fromX: hero.left,
        fromY: hero.top + scrollY,
        toX: header.left,
        toY: header.top,
        scale: hero.height ? header.height / hero.height : 0.6,
      }
    }

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        const m = measure()
        gsap.set(logo, { x: m.toX, y: m.toY, scale: m.scale })
        logo.classList.add('is-parked')
        return
      }

      // Entrance, in step with the rest of the hero. The artwork wipes up out
      // of its own box (the anchor already clips), which keeps it clear of the
      // x/y/scale the scroll flight owns on the anchor itself. Only worth
      // playing when the page actually opens at the top.
      if (window.scrollY < 10) {
        gsap.from(logo.querySelector('img'), {
          yPercent: 108,
          duration: 1.15,
          ease: 'power3.out',
          delay: 0.3,
        })
      }

      gsap.fromTo(
        logo,
        {
          x: () => measure().fromX,
          y: () => measure().fromY,
          scale: 1,
        },
        {
          x: () => measure().toX,
          y: () => measure().toY,
          scale: () => measure().scale,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            // The flight must be *shorter* than the distance the logo travels.
            // The hero title scrolls up at exactly 1px per pixel of scroll, so
            // if the logo climbs any slower than that the title catches up and
            // slides straight through it - which is what made the two overlap,
            // worst of all on a phone where the title sits right beneath it.
            end: () => {
              const { fromY, toY } = measure()
              return `+=${Math.max(140, (fromY - toY) * 0.85)}`
            },
            // Lenis already eases the scroll itself; any extra scrub lag makes
            // the logo trail behind and drift across the hero text.
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )
    })

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [heroSlotRef, headerSlotRef])

  return (
    <a className="fly-logo" href="#top" aria-label={`${BRAND.name} home`} ref={logoRef}>
      <img src="/img/logo.png" alt={`${BRAND.name}, ${BRAND.tagline}`} />
    </a>
  )
}
