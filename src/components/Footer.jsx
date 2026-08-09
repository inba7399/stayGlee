import { BRAND, NAV } from '../data/content'
import './Footer.css'

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Google', href: 'https://google.com' },
]

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <img className="footer__logo" src="/img/logo.png" alt={`${BRAND.name}, ${BRAND.tagline}`} />
          <p className="footer__blurb">
            Cosy hill rooms, home cooked food and a view worth waking up for.
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3 className="footer__heading">Explore</h3>
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer__col">
          <h3 className="footer__heading">Contact</h3>
          <a href={`tel:${BRAND.phonePrimary.replace(/-/g, '')}`}>{BRAND.phonePrimary}</a>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <p className="footer__address">{BRAND.address}</p>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Follow</h3>
          {SOCIALS.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="shell footer__base">
        <span>
          &copy; {new Date().getFullYear()} {BRAND.name} {BRAND.tagline}. All rights reserved.
        </span>
        <span className="footer__base-links">
          <a href="#top">Back to top</a>
        </span>
      </div>
    </footer>
  )
}
