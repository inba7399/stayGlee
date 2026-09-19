import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Height of the fixed bar, so an anchor does not land under it. */
const NAV_OFFSET = 69

/**
 * Site wide smooth scrolling (Lenis) wired into the GSAP ticker so
 * ScrollTrigger animations stay in sync with the smoothed scroll.
 *
 * Lenis preventDefaults every wheel event, which stops nested scrollers
 * (textareas, overflow panels) from scrolling at all. Anything scrollable of
 * its own must carry data-lenis-prevent.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let lenis = null
    let raf = null
    if (!reduce) {
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      })
      window.__lenis = lenis

      lenis.on('scroll', ScrollTrigger.update)
      raf = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
    }

    // One page means every nav link is an anchor. Route them through Lenis so
    // they glide rather than jump, and clear the fixed bar on the way.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return

      e.preventDefault()
      if (lenis) {
        lenis.scrollTo(target, { offset: -NAV_OFFSET })
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
        window.scrollTo({ top, behavior: 'auto' })
      }
    }
    document.addEventListener('click', onClick)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', refresh)
      if (lenis) {
        gsap.ticker.remove(raf)
        lenis.destroy()
        if (window.__lenis === lenis) window.__lenis = null
      }
    }
  }, [])

  return children
}
