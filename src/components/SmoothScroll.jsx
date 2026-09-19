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

    // Nav links are rooted at `/` so they also work from a stay page. When one
    // points at the page we are already on, glide to it instead of letting the
    // browser reload; otherwise leave it alone and let it navigate.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const link = e.target.closest('a[href]')
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return

      let url
      try {
        url = new URL(link.href, location.href)
      } catch {
        return
      }
      if (url.origin !== location.origin) return
      if (url.pathname !== location.pathname) return

      const goTo = (top) => {
        if (lenis) lenis.scrollTo(top, { offset: -NAV_OFFSET })
        else window.scrollTo({ top: top - NAV_OFFSET, behavior: 'auto' })
      }

      if (!url.hash || url.hash === '#') {
        // the logo, pointing home while already home
        e.preventDefault()
        if (lenis) lenis.scrollTo(0)
        else window.scrollTo({ top: 0 })
        return
      }

      const target = document.querySelector(url.hash)
      if (!target) return
      e.preventDefault()
      goTo(target.getBoundingClientRect().top + window.scrollY)
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
