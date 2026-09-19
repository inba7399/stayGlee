import SmoothScroll from './components/SmoothScroll.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Intro from './components/Intro.jsx'
import Stay from './components/Stay.jsx'
import QuoteBand from './components/QuoteBand.jsx'
import Explore from './components/Explore.jsx'
import Celebrate from './components/Celebrate.jsx'
import Honeymoon from './components/Honeymoon.jsx'
import AboutBand from './components/AboutBand.jsx'
import ClosingCta from './components/ClosingCta.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'

export default function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Stay />
        <QuoteBand />
        <Explore />
        <Celebrate />
        <Honeymoon />
        <AboutBand />
        <ClosingCta />
      </main>
      <Footer />
      <WhatsAppFab />
    </SmoothScroll>
  )
}
