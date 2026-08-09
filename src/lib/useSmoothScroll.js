import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

/**
 * Lenis-driven smooth scrolling, wired into the GSAP ticker so ScrollTrigger
 * and the scroll position stay perfectly in sync (no lag between the pinned
 * animations and the page).
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // In-page anchors should ride the same easing as the rest of the page.
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, { offset: -70, duration: 1.4 })
    }
    document.addEventListener('click', onClick)

    window.__lenis = lenis

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}
