import { useEffect, useId, useRef, useState } from 'react'
import { formatINR } from '../data/content.js'

/**
 * Custom listbox for choosing a suite. A native select cannot show a
 * thumbnail or a price, and cannot be styled to match the rest of the page,
 * so this is built from a button and a listbox.
 *
 * Keyboard: the trigger opens on Enter, Space or Down. Inside, Up and Down
 * move, Home and End jump, Enter picks, Escape closes and hands focus back.
 */
export default function SuitePicker({ stays, value, onChange, label = 'Choose a suite' }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(value)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)
  const id = useId()

  useEffect(() => {
    if (!open) return undefined
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  useEffect(() => {
    if (open) {
      setActive(value)
      listRef.current?.focus()
    }
  }, [open, value])

  const close = () => {
    setOpen(false)
    buttonRef.current?.focus()
  }

  const choose = (i) => {
    onChange(i)
    close()
  }

  const onListKey = (e) => {
    const last = stays.length - 1
    if (e.key === 'Escape') return close()
    if (e.key === 'Tab') return setOpen(false)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      return setActive((a) => (a >= last ? 0 : a + 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      return setActive((a) => (a <= 0 ? last : a - 1))
    }
    if (e.key === 'Home') {
      e.preventDefault()
      return setActive(0)
    }
    if (e.key === 'End') {
      e.preventDefault()
      return setActive(last)
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      return choose(active)
    }
    return undefined
  }

  const current = stays[value]

  return (
    <div className="spick" ref={rootRef}>
      <span className="spick__label" id={`${id}-label`}>
        {label}
      </span>

      <div className="spick__wrap">
        <button
          ref={buttonRef}
          type="button"
          className={`spick__trigger${open ? ' is-open' : ''}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${id}-label ${id}-value`}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
              e.preventDefault()
              setOpen(true)
            }
          }}
        >
          <img src={current.photos[0].src} alt="" aria-hidden="true" />
          <span className="spick__text">
            <strong id={`${id}-value`}>{current.name}</strong>
            <em>{current.kind}</em>
          </span>
          <span className="spick__caret" aria-hidden="true">
            <Chevron />
          </span>
        </button>

        {open && (
          <ul
            ref={listRef}
            className="spick__list"
            role="listbox"
            tabIndex={-1}
            aria-labelledby={`${id}-label`}
            aria-activedescendant={`${id}-opt-${active}`}
            onKeyDown={onListKey}
          >
            {stays.map((s, i) => (
              <li
                key={s.id}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={i === value}
                className={`spick__opt${i === value ? ' is-current' : ''}${
                  i === active ? ' is-active' : ''
                }`}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(i)}
              >
                <img src={s.photos[0].src} alt="" aria-hidden="true" />
                <span className="spick__text">
                  <strong>{s.name}</strong>
                  <em>{s.kind}</em>
                </span>
                <span className="spick__price">{formatINR(s.price)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Chevron() {
  return (
    <svg viewBox="0 0 12 8" width="12" height="8" focusable="false">
      <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
