import { useEffect, useMemo, useRef, useState } from 'react'
import './DateRangePicker.css'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const sameDay = (a, b) => a && b && +a === +b
const fmt = (d) => `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`

export default function DateRangePicker({ placeholder = 'Choose dates' }) {
  const [open, setOpen] = useState(false)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [hovered, setHovered] = useState(null)
  const rootRef = useRef(null)

  const today = useMemo(() => startOfDay(new Date()), [])
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (day) => {
    if (!start || (start && end)) {
      setStart(day)
      setEnd(null)
    } else if (day <= start) {
      setStart(day)
    } else {
      setEnd(day)
      setOpen(false)
    }
  }

  // While an end date is still being chosen, preview the range to the cursor.
  const rangeEnd = end || (start && hovered && hovered > start ? hovered : null)

  const cells = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1)
    const total = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
    const out = []
    for (let i = 0; i < first.getDay(); i++) out.push(null)
    for (let d = 1; d <= total; d++) out.push(new Date(view.getFullYear(), view.getMonth(), d))
    return out
  }, [view])

  const canGoPrev = view > new Date(today.getFullYear(), today.getMonth(), 1)
  const nights = start && end ? Math.round((end - start) / 86400000) : 0

  const valueText =
    start && end ? `${fmt(start)} to ${fmt(end)}` : start ? `${fmt(start)} to ?` : placeholder

  return (
    <div className={`drp${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className={`drp__trigger${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={start ? '' : 'drp__placeholder'}>{valueText}</span>
        <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
          <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1.5 6h13M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      </button>

      {open && (
        <div className="drp__panel" role="dialog" aria-label="Choose your stay dates">
          <div className="drp__head">
            <button
              type="button"
              className="drp__nav"
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
              disabled={!canGoPrev}
              aria-label="Previous month"
            >
              <svg viewBox="0 0 8 12" width="8" height="12" aria-hidden="true"><path d="M6.5 1 1.5 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
            <span className="drp__month">
              {MONTHS[view.getMonth()]} {view.getFullYear()}
            </span>
            <button
              type="button"
              className="drp__nav"
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
              aria-label="Next month"
            >
              <svg viewBox="0 0 8 12" width="8" height="12" aria-hidden="true"><path d="M1.5 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
          </div>

          <div className="drp__weekdays">
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="drp__grid" onMouseLeave={() => setHovered(null)}>
            {cells.map((day, i) => {
              if (!day) return <span key={`pad-${i}`} />
              const disabled = day < today
              const isStart = sameDay(day, start)
              const isEnd = sameDay(day, end) || (!end && sameDay(day, rangeEnd))
              const inRange = start && rangeEnd && day > start && day < rangeEnd
              const cls = [
                'drp__day',
                isStart && 'is-start',
                isEnd && 'is-end',
                inRange && 'is-between',
                sameDay(day, today) && 'is-today',
              ]
                .filter(Boolean)
                .join(' ')
              return (
                <button
                  key={+day}
                  type="button"
                  className={cls}
                  disabled={disabled}
                  onClick={() => pick(day)}
                  onMouseEnter={() => setHovered(day)}
                >
                  {day.getDate()}
                </button>
              )
            })}
          </div>

          <div className="drp__foot">
            <span className="drp__nights">
              {start && end
                ? `${nights} night${nights === 1 ? '' : 's'}`
                : start
                  ? 'Select check-out'
                  : 'Select check-in'}
            </span>
            {(start || end) && (
              <button
                type="button"
                className="drp__clear"
                onClick={() => {
                  setStart(null)
                  setEnd(null)
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
