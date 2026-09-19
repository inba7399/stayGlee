import { useMemo, useState } from 'react'
import { Reveal } from './Parallax.jsx'
import { CheckIcon } from './icons.jsx'
import Lightbox from './Lightbox.jsx'
import { STAY, formatINR, waLinkFor } from '../data/content.js'

/**
 * Stays, grouped. Di Heritage stands on its own, then the two suites sit
 * together under a StayGlee heading.
 *
 * Each stay is a wide card whose top is a five photo mosaic; the mosaic opens
 * a full screen gallery holding every photo for that stay, so fifteen pictures
 * are on offer without a carousel on the page.
 */
export default function Stay() {
  // { stay: index into the flattened list, photo: index into its photos }
  const [open, setOpen] = useState(null)

  // A flat index across every group lets the gallery address any stay, and
  // keeps the mosaic alternating its lead tile down the whole section.
  const { groups, allStays } = useMemo(() => {
    let i = 0
    return {
      groups: STAY.groups.map((group) => ({
        ...group,
        items: group.stays.map((stay) => ({ stay, index: i++ })),
      })),
      allStays: STAY.groups.flatMap((group) => group.stays),
    }
  }, [])

  const openStay = open && allStays[open.stay]

  return (
    <section className="stays" id="stay">
      <div className="stays__wrap">
        <Reveal>
          <header className="stays__head">
            <p className="eyebrow">{STAY.eyebrow}</p>
            <h2>{STAY.title}</h2>
            <p className="stays__intro">{STAY.intro}</p>
          </header>
        </Reveal>

        {groups.map((group) => (
          <div className="staygroup" key={group.id}>
            {group.name && (
              <Reveal>
                <header className="staygroup__head">
                  <h3>{group.name}</h3>
                  {group.blurb && <p>{group.blurb}</p>}
                </header>
              </Reveal>
            )}

            {group.items.map(({ stay, index }) => (
              <Reveal key={stay.id}>
                <StayCard
                  stay={stay}
                  index={index}
                  /* a named group already owns the h3, so its stays drop a level */
                  nameTag={group.name ? 'h4' : 'h3'}
                  onOpen={(photo) => setOpen({ stay: index, photo })}
                />
              </Reveal>
            ))}
          </div>
        ))}
      </div>

      {openStay && (
        <Lightbox
          title={openStay.name}
          photos={openStay.photos}
          index={open.photo}
          onIndex={(photo) => setOpen({ stay: open.stay, photo })}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  )
}

function StayCard({ stay, index, nameTag: Name, onOpen }) {
  return (
    <article className="stay">
      <div className={`mosaic ${index % 2 ? 'mosaic--flip' : ''}`}>
        {stay.photos.slice(0, 5).map((photo, p) => (
          <button
            key={photo.src}
            className={`mosaic__tile ${p === 0 ? 'mosaic__tile--lead' : ''}`}
            onClick={() => onOpen(p)}
            aria-label={`Open photo: ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </button>
        ))}

        <button className="mosaic__all" onClick={() => onOpen(0)}>
          <GridIcon />
          See all {stay.photos.length} photos
        </button>
      </div>

      <div className="stay__top">
        <div>
          <p className="stay__kind">{stay.kind}</p>
          <Name className="stay__name">{stay.name}</Name>
        </div>

        <div className="stay__price">
          <p>
            <strong>{formatINR(stay.price)}</strong>
            <s>{formatINR(stay.was)}</s>
          </p>
        </div>
      </div>

      <div className="stay__cols">
        <div className="stay__about">
          <p className="stay__headline">{stay.headline}</p>
          <p className="stay__body">{stay.body}</p>
          <ul className="stay__facts">
            {stay.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        <ul className="stay__highlights">
          {stay.highlights.map((h) => (
            <li key={h.title}>
              <CheckIcon />
              <div>
                <strong>{h.title}</strong>
                <p>{h.text}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Third in the markup so it lands last on a phone, but the grid
            areas pull it under the facts on a wide screen. */}
        <div className="stay__actions">
          <a
            className="btn btn--primary"
            href={waLinkFor(stay.name)}
            target="_blank"
            rel="noreferrer noopener"
          >
            Ask on WhatsApp
          </a>
          <button className="btn btn--outline" onClick={() => onOpen(0)}>
            See all photos
          </button>
        </div>
      </div>
    </article>
  )
}

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
      <path
        d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}
