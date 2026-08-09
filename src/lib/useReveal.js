import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

/**
 * One GSAP context that wires every scroll-entrance animation on the page from
 * declarative data-attributes, so components stay markup-only:
 *
 *   data-anim         fade + rise a single element
 *   data-anim-group   fade + rise the element's direct children, staggered
 *   data-anim-img     unmask a .media block and settle its zoom
 *   data-parallax     drift the element as it crosses the viewport
 */
export function useReveal(scopeRef) {
  useLayoutEffect(() => {
    const reduce = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('[data-anim], [data-anim-group] > *', { opacity: 1, y: 0 })
        return
      }

      gsap.utils.toArray('[data-anim]').forEach((el) => {
        gsap.from(el, {
          y: 42,
          opacity: 0,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      gsap.utils.toArray('[data-anim-group]').forEach((group) => {
        const kids = gsap.utils.toArray(group.children)
        if (!kids.length) return
        gsap.from(kids, {
          y: 52,
          opacity: 0,
          duration: 1.05,
          ease: 'power3.out',
          stagger: 0.11,
          scrollTrigger: { trigger: group, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray('[data-anim-img]').forEach((el) => {
        const inner = el.querySelector('img') || el
        const trigger = { trigger: el, start: 'top 92%', once: true }
        gsap.fromTo(
          el,
          { clipPath: 'inset(14% 14% 14% 14%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.35, ease: 'power3.out', scrollTrigger: trigger }
        )
        gsap.fromTo(
          inner,
          { scale: 1.22 },
          { scale: 1, duration: 1.5, ease: 'power3.out', scrollTrigger: trigger }
        )
      })

      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const amount = parseFloat(el.dataset.parallax) || 8
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('[data-parallax-scope]') || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })
    }, scopeRef)

    // Late-loading imagery changes the document height - re-measure.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const timer = window.setTimeout(refresh, 900)

    return () => {
      window.removeEventListener('load', refresh)
      window.clearTimeout(timer)
      ctx.revert()
    }
  }, [scopeRef])
}
