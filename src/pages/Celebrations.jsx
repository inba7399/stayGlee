import { useState } from 'react'
import SmoothScroll from '../components/SmoothScroll.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import WhatsAppFab from '../components/WhatsAppFab.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { Reveal } from '../components/Parallax.jsx'
import { CELEBRATE, waLink } from '../data/content.js'

/**
 * Every occasion, one block each, with its own photographs. Same page frame
 * as a stay page: solid navbar over the light header, then alternating bands.
 */
export default function Celebrations() {
  // { occasion: index into CELEBRATE.occasions, photo: index into its photos }
  const [open, setOpen] = useState(null)
  const shown = open && CELEBRATE.occasions[open.occasion]

  return (
    <SmoothScroll>
      <Navbar solid />
      <main>
        <section className="detail">
          <div className="stays__wrap">
            <Reveal>
              <header className="detail__head">
                <a className="detail__back" href="/#celebrate">
                  <Arrow />
                  Back to the home page
                </a>
                <p className="eyebrow">{CELEBRATE.eyebrow}</p>
                <h1 className="detail__title">{CELEBRATE.title}</h1>
                <p className="detail__blurb">{CELEBRATE.lead}</p>
              </header>
            </Reveal>

            <nav className="occjump" aria-label="Occasions">
              {CELEBRATE.occasions.map((o) => (
                <a key={o.id} href={`#${o.id}`}>
                  {o.name}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {CELEBRATE.occasions.map((occasion, i) => (
          <section
            className={`occ${i % 2 ? ' occ--alt' : ''}`}
            id={occasion.id}
            key={occasion.id}
          >
            <div className="stays__wrap">
              <Reveal>
                <header className="occ__head">
                  <h2>{occasion.name}</h2>
                  <p>{occasion.blurb}</p>
                </header>
              </Reveal>

              <div className="occ__grid">
                {occasion.photos.map((photo, p) => (
                  <Reveal key={photo.src} delay={p * 80}>
                    <button
                      className="occ__shot"
                      onClick={() => setOpen({ occasion: i, photo: p })}
                      aria-label={`Open photo: ${photo.alt}`}
                    >
                      <img src={photo.src} alt={photo.alt} loading="lazy" />
                    </button>
                  </Reveal>
                ))}
              </div>

              <Reveal className="occ__foot">
                <a
                  className="btn btn--primary"
                  href={waLink}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Ask about {occasion.name.toLowerCase()}
                </a>
              </Reveal>
            </div>
          </section>
        ))}

        <section className="cta">
          <div className="container cta__inner">
            <Reveal>
              <h2>{CELEBRATE.bannerTitle}</h2>
              <a className="btn btn--light" href={waLink} target="_blank" rel="noreferrer noopener">
                {CELEBRATE.bannerCta}
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />

      {shown && (
        <Lightbox
          title={shown.name}
          photos={shown.photos}
          index={open.photo}
          onIndex={(photo) => setOpen({ occasion: open.occasion, photo })}
          onClose={() => setOpen(null)}
        />
      )}
    </SmoothScroll>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
      <path
        d="M10 2.5 4.5 8l5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
