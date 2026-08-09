import './BetterSection.css'

const ROWS = [
  {
    id: 'insider',
    img: '/img/room4.jpg',
    alt: 'Balcony seating at StayGlee looking out across the Kodaikanal hills',
    title: 'Make your stay even better.',
    body:
      'By becoming a StayGlee Insider you get complimentary Wi-Fi, member-only rates and a warm welcome amenity every single time you stay with us, whichever of our homes you choose.',
    actions: [
      { label: 'Why Join?', variant: 'light' },
      { label: 'Become an Insider', variant: 'sage' },
    ],
  },
  {
    id: 'kitchen',
    img: '/img/room1.jpg',
    alt: 'The shared living room and kitchen at a StayGlee homestay',
    title: 'Home cooked, hill grown.',
    body:
      'Breakfast arrives when you wake, not when a buffet says so. Our kitchen cooks South Indian home food with produce from the Kodai market, and yes, filter coffee comes with the view.',
    actions: [
      { label: 'See the Menu', variant: 'light' },
      { label: 'Reserve a Table', variant: 'sage' },
    ],
  },
]

export default function BetterSection() {
  return (
    <section className="better" id="service">
      {ROWS.map((row, i) => (
        <div className={`better__row${i % 2 ? ' better__row--flip' : ''}`} key={row.id}>
          <div className="media better__media" data-anim-img data-parallax-scope>
            <img src={row.img} alt={row.alt} loading="lazy" data-parallax="4" />
          </div>

          <div className="better__panel">
            <div className="better__copy" data-anim-group>
              <h2 className="section-title">{row.title}</h2>
              <p className="body-text">{row.body}</p>
              <div className="better__actions">
                {row.actions.map((action) => (
                  <a key={action.label} className={`pill pill--${action.variant}`} href="#contact">
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
