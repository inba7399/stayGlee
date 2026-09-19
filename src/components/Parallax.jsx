import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * GSAP ScrollTrigger parallax. The image is oversized (130% height) and
 * scrubbed between plus and minus 12% of its own height while its section
 * crosses the viewport, so it can never drift outside its clipping container.
 */
export default function Parallax({
  src,
  speed = 0.22,
  className = '',
  children,
  alt = '',
  eager = false,
}) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // Cap travel so the oversized image (130%, 15% bleed) always covers the
    // frame: yPercent is relative to the image, so 11% x 1.3 is about 14.3%.
    const shift = Math.min(11, speed * 50)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -shift },
        {
          yPercent: shift,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        },
      )
    }, wrapRef)
    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={wrapRef} className={`parallax ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="parallax__img"
        /* the hero is the LCP image, so it must not wait for lazy loading */
        loading={eager ? 'eager' : 'lazy'}
        fetchpriority={eager ? 'high' : undefined}
        decoding={eager ? 'sync' : 'async'}
        onLoad={() => ScrollTrigger.refresh()}
      />
      {children && <div className="parallax__content">{children}</div>}
    </div>
  )
}

/** Fade and slide in on scroll, driven by GSAP so it plays nicely with Lenis. */
export function Reveal({ children, className = '', delay = 0, y = 36 }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: delay / 1000,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [delay, y])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
