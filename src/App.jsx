import { useRef } from 'react'
import { useSmoothScroll } from './lib/useSmoothScroll'
import { useReveal } from './lib/useReveal'

import Header from './components/Header'
import FlyingLogo from './components/FlyingLogo'
import Hero from './components/Hero'
import Discover from './components/Discover'
import StaySection from './components/StaySection'
import BetterSection from './components/BetterSection'
import ExploreSection from './components/ExploreSection'
import CelebrationBanner from './components/CelebrationBanner'
import CelebrateSection from './components/CelebrateSection'
import Honeymoon from './components/Honeymoon'
import AboutUs from './components/AboutUs'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'

export default function App() {
  const pageRef = useRef(null)
  // Endpoints of the logo flight, owned here so both the hero and the header
  // can hand their positions to the single shared logo element.
  const heroSlotRef = useRef(null)
  const headerSlotRef = useRef(null)

  useSmoothScroll()
  useReveal(pageRef)

  return (
    <div className="page" ref={pageRef}>
      <Header logoSlotRef={headerSlotRef} />
      <FlyingLogo heroSlotRef={heroSlotRef} headerSlotRef={headerSlotRef} />

      <main>
        <Hero logoSlotRef={heroSlotRef} />
        <Discover />
        <StaySection />
        <BetterSection />
        <ExploreSection />
        <CelebrationBanner />
        <CelebrateSection />
        <Honeymoon />
        <AboutUs />
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  )
}
