import { Reveal } from './Parallax.jsx'

/**
 * Google map for one property.
 *
 * Uses the keyless `output=embed` form, so there is nothing to sign up for and
 * no key to leak in the bundle. If you ever want the official Maps Embed API
 * instead, that one does need a key restricted to the site's domain.
 */
export default function MapEmbed({
  lat,
  lng,
  label,
  address,
  eyebrow = 'Finding us',
  title,
  zoom = 15,
}) {
  const embed = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`
  const open = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

  return (
    <section className="mapband" id="map">
      <div className="container">
        <Reveal>
          {/* same shape as the other section headings: label and title on the
              left, supporting detail on the right */}
          <div className="section__head">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2>{title || label}</h2>
            </div>
            <div className="mapband__meta">
              {address && <p className="mapband__address">{address}</p>}
              <a className="text-link" href={open} target="_blank" rel="noreferrer noopener">
                Open in Google Maps
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mapband__frame">
          <iframe
            src={embed}
            title={`Map showing ${label}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
