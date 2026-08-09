import { BRAND } from '../data/content'
import './WhatsAppFab.css'

const MESSAGE = encodeURIComponent(
  "Hi StayGlee! I'd like to check availability for a stay in Kodaikanal."
)

/**
 * Fixed on every screen, at every scroll position - never unmounts, so it
 * stays put through the whole page.
 */
export default function WhatsAppFab() {
  return (
    <a
      className="wa-fab"
      href={`https://wa.me/${BRAND.whatsapp}?text=${MESSAGE}`}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with StayGlee on WhatsApp"
    >
      <span className="wa-fab__ping" aria-hidden="true" />
      <img src="/img/Whatsapp.png" alt="" aria-hidden="true" />
    </a>
  )
}
