import { useEffect, useState } from 'react'
import { BRAND, NAV } from '../data/content'
import './Header.css'

export default function Header({ logoSlotRef }) {
  const [stuck, setStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Solidify just before the flying logo finishes docking, so it lands on a
    // finished bar rather than on transparent hero.
    const onScroll = () => {
      setStuck(window.scrollY > Math.min(window.innerHeight * 0.14, 120))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Freeze the smooth-scroll engine as well as the document, otherwise the
    // page keeps gliding behind the open menu.
    const lenis = window.__lenis
    // The body class lets the flying logo stand down while the menu is open,
    // so the menu can show its own full-size logo at any scroll position.
    document.body.classList.toggle('menu-open', menuOpen)
    if (menuOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      window.__lenis?.start()
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }, [menuOpen])

  return (
    <>
      <header className={`header${stuck ? ' is-stuck' : ''}`}>
        <div className="header__inner shell">
          {/* Landing pad for the logo that flies up out of the hero. */}
          <div className="header__logo-slot" ref={logoSlotRef} aria-hidden="true" />

          <nav className="header__nav" aria-label="Primary">
            {NAV.map((item) => (
              <a key={item.href} className="header__link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header__cta">
            <span className="header__phone">
              {BRAND.phonePrimary} / {BRAND.phoneSecondary}
            </span>
            <a className="pill pill--gold" href="#contact">
              Contact Us
            </a>
          </div>

          <button
            className={`burger${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' is-open' : ''}`}>
        <img
          className="mobile-menu__logo"
          src="/img/logo.png"
          alt={`${BRAND.name}, ${BRAND.tagline}`}
        />

        <nav className="mobile-menu__nav" aria-label="Mobile">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <a className="mobile-menu__phone" href={`tel:${BRAND.phonePrimary.replace(/-/g, '')}`}>
            {BRAND.phonePrimary}
          </a>
          <a className="pill pill--gold" href="#contact" onClick={() => setMenuOpen(false)}>
            Contact Us
          </a>
        </div>
      </div>
    </>
  )
}
