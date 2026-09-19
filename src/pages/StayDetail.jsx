import { useState } from 'react'
import SmoothScroll from '../components/SmoothScroll.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import WhatsAppFab from '../components/WhatsAppFab.jsx'
import StayView from '../components/StayView.jsx'
import SuitePicker from '../components/SuitePicker.jsx'
import Lightbox from '../components/Lightbox.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import Explore from '../components/Explore.jsx'
import { Reveal } from '../components/Parallax.jsx'
import { STAY } from '../data/content.js'

/**
 * One property's own page. A group with several stays gets a picker at the
 * top and shows one at a time; a group with one stay just shows it.
 *
 * The navbar is forced solid here: it is transparent by default because the
 * home page puts it over the dark hero, and this page starts on light mist.
 */
export default function StayDetail({ groupId }) {
  const group = STAY.groups.find((g) => g.id === groupId)
  const [picked, setPicked] = useState(0)
  const [photo, setPhoto] = useState(null)

  if (!group) return null
  const stay = group.stays[Math.min(picked, group.stays.length - 1)]
  const many = group.stays.length > 1

  return (
    <SmoothScroll>
      <Navbar solid />
      <main>
        <section className="detail">
          <div className="stays__wrap">
            <Reveal>
              <header className="detail__head">
                <a className="detail__back" href="/#stay">
                  <Arrow />
                  All stays
                </a>
                <h1 className="detail__title">{group.name}</h1>
                {group.blurb && <p className="detail__blurb">{group.blurb}</p>}
              </header>
            </Reveal>

            {/* deliberately not wrapped in a Reveal: its GSAP transform would
                trap the open list's z-index behind the gallery below */}
            {many && <SuitePicker stays={group.stays} value={picked} onChange={setPicked} />}

            {/* keyed so switching suites remounts rather than cross-fading
                one suite's photos into another's */}
            <StayView key={stay.id} stay={stay} onOpen={setPhoto} />
          </div>
        </section>

        {group.map && <MapEmbed {...group.map} />}
        <Explore />
      </main>
      <Footer />
      <WhatsAppFab />

      {photo !== null && (
        <Lightbox
          title={stay.name}
          photos={stay.photos}
          index={photo}
          onIndex={setPhoto}
          onClose={() => setPhoto(null)}
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
