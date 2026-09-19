import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REDUCED = '(prefers-reduced-motion: reduce)'

/**
 * GSAP ScrollTrigger parallax. The media is oversized (130% height) and
 * scrubbed between plus and minus 12% of its own height while its section
 * crosses the viewport, so it can never drift outside its clipping container.
 *
 * Pass `video` and it plays a looping muted clip instead of a still. Anyone
 * who asked for less motion gets the poster frame as a plain image, and the
 * clip is never fetched for them.
 */
export default function Parallax({
  src,
  video,
  poster,
  speed = 0.22,
  className = '',
  children,
  alt = '',
  eager = false,
}) {
  const wrapRef = useRef(null)
  const mediaRef = useRef(null)

  // Read the preference on the first render, so a reduced motion visitor
  // never briefly mounts the video and starts downloading it.
  const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED).matches)
  useEffect(() => {
    const mq = window.matchMedia(REDUCED)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const showVideo = Boolean(video) && !reduced

  useEffect(() => {
    // React does not always reflect `muted` onto the element, and without it
    // iOS refuses to autoplay.
    if (showVideo && mediaRef.current) mediaRef.current.muted = true
  }, [showVideo])

  useLayoutEffect(() => {
    if (reduced) return

    // Cap travel so the oversized media (130%, 15% bleed) always covers the
    // frame: yPercent is relative to it, so 11% x 1.3 is about 14.3%.
    const shift = Math.min(11, speed * 50)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mediaRef.current,
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
  }, [speed, reduced, showVideo])

  return (
    <div ref={wrapRef} className={`parallax ${className}`}>
      {showVideo ? (
        <video
          ref={mediaRef}
          className="parallax__img"
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload={eager ? 'auto' : 'metadata'}
          /* decorative: the hero heading already says where this is */
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={() => ScrollTrigger.refresh()}
        />
      ) : (
        <img
          ref={mediaRef}
          src={poster || src}
          alt={alt}
          className="parallax__img"
          /* the hero is the LCP image, so it must not wait for lazy loading */
          loading={eager ? 'eager' : 'lazy'}
          fetchpriority={eager ? 'high' : undefined}
          decoding={eager ? 'sync' : 'async'}
          onLoad={() => ScrollTrigger.refresh()}
        />
      )}
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
    if (window.matchMedia(REDUCED).matches) return

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
