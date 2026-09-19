import { BRAND, NAV, SOCIALS, CREDIT } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src={BRAND.logo}
            alt={`${BRAND.name}, ${BRAND.tagline}`}
          />
          <p>Cosy hill rooms, home cooked food and a view worth waking up for.</p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h4>Explore</h4>
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer__col">
          <h4>Contact</h4>
          <a href={BRAND.phoneHref}>{BRAND.phone}</a>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <span>{BRAND.address}</span>
        </div>

        <div className="footer__col">
          <h4>Follow</h4>
          {SOCIALS.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bar">
        <span>
          &copy; {new Date().getFullYear()} {BRAND.legal}
        </span>

        <p className="footer__by">
          {CREDIT.prefix}
          {CREDIT.href ? (
            <a href={CREDIT.href} target="_blank" rel="noreferrer noopener">
              <img src={CREDIT.logo} alt={CREDIT.name} />
            </a>
          ) : (
            <img src={CREDIT.logo} alt={CREDIT.name} />
          )}
        </p>
      </div>
    </footer>
  )
}
