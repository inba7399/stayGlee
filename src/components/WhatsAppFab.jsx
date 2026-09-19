import { waLink } from '../data/content.js'

/** Fixed at every scroll position, so it is always one tap away. */
export default function WhatsAppFab() {
  return (
    <a
      className="wa-fab"
      href={waLink}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with StayGlee on WhatsApp"
    >
      <img src="/img/Whatsapp.png" alt="" aria-hidden="true" />
    </a>
  )
}
