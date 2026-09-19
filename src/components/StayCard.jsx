import { CheckIcon } from './icons.jsx'
import { formatINR, waLinkFor } from '../data/content.js'

/**
 * One stay: a five photo mosaic over the name, price, description and
 * highlights. Used on the landing page and on each stay's own page, so the
 * heading level and the mosaic's lead side are passed in.
 */
export default function StayCard({ stay, index = 0, nameTag: Name = 'h3', href, onOpen }) {
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
            WhatsApp
          </a>
          {/* the photos are still one tap away on the mosaic above, so this
              slot goes to the property's own page instead */}
          <a className="btn btn--outline" href={href}>
            View property
          </a>
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
