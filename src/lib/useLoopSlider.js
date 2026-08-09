import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from './gsap'

/**
 * Seamless infinite carousel.
 *
 * The item list is rendered `repeats` times back to back.  Because every slide
 * is the same width, the rail is perfectly periodic with a period of one full
 * set, so translating the track and wrapping that translation inside a single
 * set length loops forever with no visible seam and no snap-back.
 *
 * `lead` whole sets are parked off-screen to the left of the resting position,
 * which is what lets you scroll *backwards* from the very first slide, and
 * `base` is the offset that puts the settled slide where the layout wants it:
 *
 *   align "start"  - settled slide sits on the track's gutter (Explore)
 *   align "center" - settled slide centred, neighbours peeking (Stay)
 *
 * `pos.x` is a virtual, unbounded position in pixels; `slot` is the integer
 * slide it is settling on.  Neither is clamped - that is the whole point.
 */
const MIN_REPEATS = 3

export function useLoopSlider({ count, align = 'start', onRender }) {
  const [index, setIndex] = useState(0)
  const [activeRail, setActiveRail] = useState(0)
  const [repeats, setRepeats] = useState(MIN_REPEATS)

  // Held in a ref so a fresh callback never re-creates draw()/goToSlot().
  const renderCb = useRef(onRender)
  renderCb.current = onRender

  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  const metrics = useRef({ stride: 0, set: 0, lead: 1, base: 0 })
  const pos = useRef({ x: 0 })
  const slot = useRef(0)
  const seen = useRef({ index: 0, rail: 0 })
  const drag = useRef({ id: null, startX: 0, startY: 0, baseX: 0, moved: false, locked: null })

  const draw = useCallback(() => {
    const track = trackRef.current
    const { stride, set, lead, base } = metrics.current
    if (!track || !set) return

    const wrapped = gsap.utils.wrap(0, set, pos.current.x)
    gsap.set(track, { x: base - lead * set - wrapped })

    // The fractional rail index sitting in the settled position. Anything that
    // styles slides by their distance from centre needs this every frame.
    renderCb.current?.(lead * count + wrapped / stride)

    // Which rendered copy is currently in the settled position, and which item
    // of the original list it represents.
    const step = Math.round(wrapped / stride)
    const rail = lead * count + step
    const logical = gsap.utils.wrap(0, count, step)
    if (rail !== seen.current.rail) {
      seen.current.rail = rail
      setActiveRail(rail)
    }
    if (logical !== seen.current.index) {
      seen.current.index = logical
      setIndex(logical)
    }
  }, [count])

  const measure = useCallback(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    const first = track?.firstElementChild
    if (!track || !viewport || !first) return

    const style = getComputedStyle(track)
    const gap = parseFloat(style.columnGap) || 0
    const pad = parseFloat(style.paddingLeft) || 0
    const width = first.getBoundingClientRect().width
    const stride = width + gap
    if (!stride) return

    const set = stride * count
    const view = viewport.clientWidth
    const base = align === 'center' ? view / 2 - width / 2 - pad : 0

    // Enough sets on the left that the rail never runs out going backwards,
    // and enough on the right to cover the viewport at the far end of a loop.
    const lead = Math.max(1, Math.ceil((base + pad) / set))
    const needed = Math.max(
      MIN_REPEATS,
      lead + 1 + Math.ceil((view + gap - pad - base) / set)
    )

    metrics.current = { stride, set, lead, base }
    setRepeats((current) => (current === needed ? current : needed))

    pos.current.x = slot.current * stride
    draw()
  }, [align, count, draw])

  useLayoutEffect(() => {
    measure()
    const viewport = viewportRef.current
    if (!viewport || typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(measure)
    ro.observe(viewport)
    return () => ro.disconnect()
  }, [measure, repeats])

  const goToSlot = useCallback(
    (n) => {
      slot.current = n
      const { stride } = metrics.current
      if (!stride) return
      gsap.to(pos.current, {
        x: n * stride,
        duration: prefersReducedMotion() ? 0.01 : 0.9,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: draw,
        onComplete: draw,
      })
    },
    [draw]
  )

  const next = useCallback(() => goToSlot(slot.current + 1), [goToSlot])
  const prev = useCallback(() => goToSlot(slot.current - 1), [goToSlot])

  // Dots address the original list, so travel whichever way round is shorter.
  const goTo = useCallback(
    (target) => {
      const here = slot.current
      let delta = target - gsap.utils.wrap(0, count, here)
      if (delta > count / 2) delta -= count
      if (delta < -count / 2) delta += count
      goToSlot(here + delta)
    },
    [count, goToSlot]
  )

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined

    const onDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      gsap.killTweensOf(pos.current)
      drag.current = {
        id: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        baseX: pos.current.x,
        moved: false,
        locked: null,
      }
    }

    const onMove = (event) => {
      const state = drag.current
      if (state.id !== event.pointerId) return
      const dx = event.clientX - state.startX
      const dy = event.clientY - state.startY

      if (state.locked === null) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
        state.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
        if (state.locked === 'x') viewport.setPointerCapture?.(event.pointerId)
      }
      if (state.locked !== 'x') return

      state.moved = true
      pos.current.x = state.baseX - dx * 0.95
      draw()
    }

    const onUp = (event) => {
      const state = drag.current
      if (state.id !== event.pointerId) return
      drag.current = { ...state, id: null }
      if (state.locked === 'x') viewport.releasePointerCapture?.(event.pointerId)
      if (!state.moved) return

      const { stride } = metrics.current
      if (!stride) return
      const dx = event.clientX - state.startX
      const threshold = Math.min(90, viewport.clientWidth * 0.08)
      const ideal = pos.current.x / stride
      // A decisive flick always advances a whole slide, however far it dragged.
      if (dx <= -threshold) goToSlot(Math.ceil(ideal))
      else if (dx >= threshold) goToSlot(Math.floor(ideal))
      else goToSlot(Math.round(ideal))
    }

    // Focusing a slide parked off-screen would make the browser scroll the
    // clipped viewport, permanently knocking the transform out of alignment.
    const onScroll = () => {
      viewport.scrollLeft = 0
      viewport.scrollTop = 0
    }

    viewport.addEventListener('pointerdown', onDown)
    viewport.addEventListener('scroll', onScroll)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    return () => {
      viewport.removeEventListener('pointerdown', onDown)
      viewport.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [draw, goToSlot])

  // Swallow the click that ends a drag so a card doesn't navigate.
  const onClickCapture = useCallback((event) => {
    if (drag.current.moved) {
      event.preventDefault()
      event.stopPropagation()
      drag.current.moved = false
    }
  }, [])

  return {
    index,
    activeRail,
    repeats,
    goTo,
    next,
    prev,
    viewportRef,
    trackRef,
    onClickCapture,
  }
}
