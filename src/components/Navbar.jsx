import { useEffect, useState } from 'react'
import { BRAND, NAV, waLink } from '../data/content.js'

export default function Navbar({ solid = false }) {
  const [scrolled, setScrolled] = useState(solid)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(solid || window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [solid])

  useEffect(() => {
    // Freeze the smooth scroll engine as well as the document, otherwise the
    // page keeps gliding behind the open menu.
    const lenis = window.__lenis
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--glass' : ''}`}>
      <div className="nav__inner">
        <a href="/" className="nav__brand">
          <img src={BRAND.logo} alt={`${BRAND.name}, ${BRAND.tagline}`} />
        </a>

        <nav className="nav__links">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="nav__phone" href={BRAND.phoneHref}>
            {BRAND.phone}
          </a>
          <a className="nav__cta" href={waLink} target="_blank" rel="noreferrer noopener">
            Enquire
          </a>
        </nav>

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile sidebar */}
      <div className={`nav__scrim ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`nav__sidebar ${open ? 'is-open' : ''}`}>
        <div className="nav__sidebar-head">
          <img src={BRAND.logo} alt={`${BRAND.name}, ${BRAND.tagline}`} />
        </div>
        <nav className="nav__sidebar-links">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>
        </nav>
        <a
          className="btn btn--primary nav__sidebar-cta"
          href={waLink}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => setOpen(false)}
        >
          Check availability
        </a>
        <div className="nav__sidebar-foot">
          <span>{BRAND.address}</span>
          <span>{BRAND.phone}</span>
        </div>
      </aside>
    </header>
  )
}
