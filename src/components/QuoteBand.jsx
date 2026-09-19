import Parallax from './Parallax.jsx'
import { QUOTE } from '../data/content.js'

export default function QuoteBand() {
  return (
    <Parallax src={QUOTE.image} speed={0.25} className="band" alt={QUOTE.imageAlt}>
      <blockquote>
        {QUOTE.text}
        <cite>{QUOTE.cite}</cite>
      </blockquote>
    </Parallax>
  )
}
