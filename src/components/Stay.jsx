import { useMemo, useState } from 'react'
import { Reveal } from './Parallax.jsx'
import StayCard from './StayCard.jsx'
import Lightbox from './Lightbox.jsx'
import { STAY } from '../data/content.js'

/**
 * Stays, grouped by property. Each group's name links through to that
 * property's own page; the cards here are the summary.
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
          </header>
        </Reveal>

        {groups.map((group) => (
          <div className="staygroup" key={group.id}>
            {group.name && (
              <Reveal>
                <header className="staygroup__head">
                  {/* the section has no heading of its own, so the group
                      carries the h2 and its stays drop to h3 */}
                  <h2 className="staygroup__name">
                    <a href={group.path}>
                      {group.name}
                      <Chevron />
                    </a>
                  </h2>
                  {group.blurb && <p>{group.blurb}</p>}
                </header>
              </Reveal>
            )}

            {group.items.map(({ stay, index }) => (
              <Reveal key={stay.id}>
                <StayCard
                  stay={stay}
                  index={index}
                  /* a named group owns the h2, so its stays drop a level */
                  nameTag={group.name ? 'h3' : 'h2'}
                  href={group.path}
                  onOpen={(photo) => setOpen({ stay: index, photo })}
                />
              </Reveal>
            ))}

            {group.name && (
              <Reveal className="staygroup__foot">
                <a className="text-link" href={group.path}>
                  {group.stays.length > 1
                    ? `See all ${group.stays.length} suites`
                    : `More about ${group.name.toLowerCase()}`}
                </a>
              </Reveal>
            )}
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

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <path
        d="M6 2.5 11.5 8 6 13.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
