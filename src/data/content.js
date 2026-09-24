/**
 * Every word and every photo path on this page lives here.
 *
 * One page, no backend, no admin: to swap a photo, change the path in this
 * file and drop the new file into `public/img/`. Nothing else needs touching.
 */

export const BRAND = {
  name: 'StayGlee',
  sub: 'Kodaikanal',
  tagline: 'Homestay & Rooms',
  /* The wordmark is white, so it only goes on dark: the header sits on the
     hero photo or on the pine glass bar, and the footer is pine. */
  logo: '/img/logo.png',
  phone: '997-646-3444',
  phoneHref: 'tel:9976463444',
  whatsapp: '919976463444',
  email: 'stay@stayglee.in',
  address: 'Vattakanal Road, Kodaikanal, Tamil Nadu 624101',
  legal: 'StayGlee Homestay & Rooms, Kodaikanal. All rights reserved.',
}

export const NAV = [
  /* Rooted at `/` so these work from a stay page too. On the home page the
     smooth scroller spots the matching path and glides instead of reloading. */
  { label: 'Stay', href: '/#stay' },
  { label: 'Explore', href: '/#explore' },
  { label: 'Celebrate', href: '/#celebrate' },
  { label: 'About', href: '/#about' },
]

export const HERO = {
  kicker: 'Kodaikanal · 2,133 m above stress level',
  title: 'Wake up in the',
  titleEm: 'clouds',
  titleEnd: 'above Kodai Lake',
  sub: 'StayGlee is a homestay folded into the hills above Kodai: cosy rooms with wool throws, home cooked South Indian food, and a balcony the mist walks straight into.',
  ctaPrimary: 'Check availability',
  ctaSecondary: 'See the stays',
  /* StayGlee's own footage, so it carries no Wikimedia credit. The poster is
     the clip's own first frame, so there is no jump when it starts, and it is
     what reduced motion visitors see instead of the video. */
  video: '/video/hero.mp4',
  image: '/img/hero-poster.jpg',
  imageAlt: 'Mist rolling across the valley, seen through the glass wall of a StayGlee suite',
}

export const INTRO = {
  eyebrow: 'The homestay',
  title: 'Slow mornings, hill country warmth',
  body: 'We keep StayGlee the way we would keep a house for friends. No lobby, no queue, no check-in theatre. Just warm rooms that were aired this morning, filter coffee when you surface, and someone at the door who already knows which viewpoint is clear today.',
  link: 'See where you will sleep',
  stats: [
    { value: '4.9', label: 'guest rating' },
    { value: '2,133 m', label: 'above sea level' },
    { value: '1 km', label: 'to Dolphin’s Nose' },
    { value: '0', label: 'traffic sounds' },
  ],
}

/* Photo lists are [file number, alt text], kept in the owner's own numbering
   (1, 2, 3...). The first five fill the mosaic, the rest are reachable in the
   full screen gallery. To change what the mosaic shows, reorder the list. */
const shots = (dir, list) =>
  list.map(([n, alt]) => ({
    src: `/img/stays/${dir}/${String(n).padStart(2, '0')}.jpg`,
    alt,
  }))

/** Same, for lists that pull from more than one property. */
const pick = (list) =>
  list.map(([dir, n, alt]) => ({
    src: `/img/stays/${dir}/${String(n).padStart(2, '0')}.jpg`,
    alt,
  }))

/**
 * Map pins for each property's page.
 *
 * PLACEHOLDER COORDINATES. These are approximate points in Kodaikanal, not
 * surveyed positions of the houses, so the pin will be in the right town but
 * the wrong spot. Replace `lat` and `lng` with the real ones: open Google
 * Maps, right click the property, and the first item on the menu is the pair
 * to paste in here.
 */
const MAP = {
  stayglee: {
    name: 'StayGlee',
    lat: 10.2255,
    lng: 77.4977,
    eyebrow: 'Finding us',
    title: 'Up on Vattakanal Road',
    label: 'StayGlee, Vattakanal Road',
    address: BRAND.address,
  },
  'di-heritage': {
    name: 'Di Heritage',
    lat: 10.2381,
    lng: 77.4892,
    eyebrow: 'Finding us',
    title: 'A few minutes from Kodai Lake',
    label: 'Di Heritage, Kodaikanal',
    address: 'Near Kodaikanal Lake and Bear Shola Falls, Kodaikanal',
  },
}

const DI_HERITAGE = {
  id: 'di-heritage',
  name: 'Di Heritage',
  kind: 'Three bedroom British bungalow',
  headline: 'An 80 year old bungalow, all to yourselves',
  body: 'A unique heritage bungalow, constructed about 80 years back and now completely renovated with all facilities and a perfect heritage touch. It is amazingly graceful from almost every angle.',
  price: 8000,
  was: 10000,
  facts: ['3 bedrooms', 'Attached bathrooms', 'Kitchen and dining hall', 'Lawn'],
  highlights: [
    {
      title: 'The whole house',
      text: 'Three bedrooms with attached bathrooms, a hall, a dining hall and a kitchen, with lawn all around the property.',
    },
    {
      title: 'Central, but calm',
      text: 'Near Kodaikanal Lake and Bear Shola Falls. A very calm and quiet place, with shops and hotels within 500 metres.',
    },
    {
      title: 'Heritage, renovated',
      text: 'Timber panelling, stone walls and a wooden staircase, with modern facilities throughout.',
    },
  ],
  // 15 leads: the exterior from the road is the shot that shows what the
  // bungalow actually is. The rest follow in the owner's numbering.
  photos: shots('heritage', [
    [15, 'The stone bungalow from the road, with parking under the tiled porch'],
    [1, 'Timber panelled living room with carved furniture'],
    [2, 'Sitting room with a stone wall and a window seat'],
    [3, 'Living room looking towards the staircase'],
    [4, 'Bedroom with a high window'],
    [5, 'The wooden staircase'],
    [6, 'Second bedroom'],
    [7, 'Bedroom with red and grey bedding'],
    [8, 'Dining room with a wall of windows'],
    [9, 'Barbecue on the lawn'],
    [10, 'Glassware in the kitchen'],
    [11, 'Campfire on the lawn'],
    [12, 'Bathroom'],
    [13, 'Second bathroom'],
    [14, 'The bungalow lit up at night'],
  ]),
}

const KING_SUITE = {
  id: 'king-suite',
  name: '2 Bedroom King Suite',
  kind: 'Mountain view suite',
  headline: 'Where every window is a masterpiece',
  body: 'Experience the pinnacle of alpine living in our sprawling two bedroom mountain view suite. Designed for those who refuse to compromise on scenery, it has floor-to-ceiling glass in every room, so the peaks are the first thing you see each morning.',
  price: 8000,
  was: 10000,
  facts: ['2 bedrooms', 'King beds', 'Private balcony', 'Mountain view'],
  highlights: [
    {
      title: 'Dual primary bedrooms',
      text: 'Both bedrooms have plush king sized bedding and direct, unobstructed views of the mountain range.',
    },
    {
      title: 'The private balcony',
      text: 'Step outside to your own balcony, the perfect spot for a morning espresso or a sunset toast against the jagged horizon.',
    },
    {
      title: 'Seamless flow',
      text: 'Open concept living connects the space, wrapped in panoramic vistas that make the interior feel as vast as the outdoors.',
    },
  ],
  // 16 is left out: it is byte for byte the same file as 03
  photos: shots('king', [
    [1, 'The suite building under a pink sunset sky'],
    [2, 'The building at dusk with the lights on'],
    [3, 'The balconies lit up at night'],
    [4, 'Living room in the evening with the TV wall'],
    [5, 'Bedroom with floor-to-ceiling windows and teal curtains'],
    [6, 'Bedroom with a green headboard and a window over the valley'],
    [7, 'Bathroom with shower'],
    [8, 'Wardrobe and dressing area'],
    [9, 'Shower'],
    [10, 'Bathroom vanity'],
    [11, 'Wardrobe, mirror and luggage bench'],
    [12, 'Welcome tray with StayGlee towels on the bed'],
    [13, 'Second bedroom with blue curtains'],
    [14, 'Sofas facing the hillside through full height glass'],
    [15, 'Living room with a glass wall looking onto the forest'],
    [17, 'Bathroom with a round mirror'],
  ]),
}

const LUXURY_SUITE = {
  id: 'luxury-suite',
  name: '3 Bedroom Luxury Suite',
  kind: 'Garden and mountain view suite',
  headline: 'Three bedrooms, each one facing the peaks',
  body: 'Experience a unique architectural harmony in our premier three bedroom residence. The grand living hall opens directly onto a lush private garden, while every one of the three bedrooms serves as a private gallery for the mountain range.',
  price: 10000,
  was: 12000,
  facts: ['3 bedrooms', 'Garden hall', 'Private balcony', 'Mountain view'],
  highlights: [
    {
      title: 'The garden hall',
      text: 'A sprawling, sun drenched living area that brings the outdoors in, with direct access to a tranquil garden space.',
    },
    {
      title: 'Triple mountain view bedrooms',
      text: 'Each of the three independent bedrooms faces the peaks, so every guest wakes up to the sunrise and a lush green mountain view.',
    },
    {
      title: 'Private balcony',
      text: 'Step out from your bedroom to breathe in the crisp mountain air.',
    },
  ],
  photos: shots('luxury', [
    [1, 'The hall looking towards the dining table'],
    [2, 'Grand living hall with blue sofas on patterned tile'],
    [3, 'Dining table laid with a home cooked South Indian meal'],
    [4, 'Bedroom with a green headboard and a balcony over the valley'],
    [5, 'Bedroom looking out to the hillside'],
    [6, 'Bedroom TV wall and wardrobe'],
    [7, 'Bathroom with vanity'],
    [8, 'Third bedroom'],
    [9, 'Bedroom with sliding doors onto the hills'],
    [10, 'Bedroom storage and desk'],
    [11, 'Wardrobe and luggage bench'],
    [12, 'Bathroom'],
    [13, 'French doors opening to the garden'],
    [14, 'The mountain view from the suite'],
  ]),
}

export const STAY = {
  eyebrow: 'Our stays',
  /**
   * Groups render top to bottom. A group with a `name` prints a heading above
   * its stays; Di Heritage has none because it stands alone and its own card
   * name carries it.
   */
  groups: [
    {
      id: 'stayglee',
      name: 'StayGlee',
      blurb: 'Two suites, booked separately.',
      path: '/stayglee/',
      map: MAP.stayglee,
      stays: [KING_SUITE, LUXURY_SUITE],
    },
    {
      id: 'di-heritage',
      name: 'A heritage bungalow',
      blurb:
        'Three places to stay in Kodaikanal. Message us your dates and we will tell you what is free.',
      path: '/di-heritage/',
      map: MAP['di-heritage'],
      stays: [DI_HERITAGE],
    },
  ],
}

export const QUOTE = {
  text: '“The mist rolled in at four, the filter coffee arrived at five. We cancelled the rest of the trip and stayed two more nights.”',
  cite: 'A guest who never wanted to leave',
  image: '/img/kodaikanal1-1200x750.webp',
  imageAlt: 'Mist rolling through the Pillar Rocks above the Kodaikanal shola',
}

export const EXPLORE = {
  eyebrow: 'Around the hills',
  title: 'Days out, planned by us',
  note: 'Tell us at breakfast where you feel like going. We will sort the permit, the driver and the timing so you arrive before the cloud does.',
  items: [
    {
      id: 'kodai-lake',
      lat: 10.234,
      lng: 77.48652,
      title: 'Kodai Lake',
      image: '/img/kodai/kodai-lake.jpg',
      alt: 'Reflections on Kodaikanal Lake at first light',
      duration: '2 hours',
      note: 'Boating and cycling',
      body: 'The star shaped lake at the heart of town, ringed by a five kilometre path. Hire a pedal boat at dawn or cycle the loop before the mist lifts.',
    },
    {
      id: 'coakers-walk',
      lat: 10.23014,
      lng: 77.49401,
      title: 'Coaker’s Walk',
      image: '/img/kodai/coakers-walk.jpg',
      alt: 'The cliff edge promenade at Coaker’s Walk, Kodaikanal',
      duration: '1 hour',
      note: 'Best at sunrise',
      body: 'A one kilometre promenade curling along the cliff edge, with the whole plains valley opening up below you. On a clear morning you can see all the way to Dolphin’s Nose.',
    },
    {
      id: 'pillar-rocks',
      lat: 10.20993,
      lng: 77.46515,
      title: 'Pillar Rocks',
      image: '/img/kodai/pillar-rocks.jpg',
      alt: 'The three granite Pillar Rocks rising above the Kodaikanal hills',
      duration: '2 hours',
      note: 'Garden included',
      body: 'Three giant granite boulders standing 400 feet tall, side by side. The mist rolls through the gap between them in the afternoon and the whole viewpoint disappears.',
    },
    {
      id: 'bryant-park',
      lat: 10.23057,
      lng: 77.4924,
      title: 'Bryant Park',
      image: '/img/kodai/bryant-park.jpg',
      alt: 'Rose beds in bloom at Bryant Park, Kodaikanal',
      duration: '90 mins',
      note: 'Family favourite',
      body: 'Twenty acres of terraced botanical garden beside the lake, planted with more than 300 varieties of rose, a glasshouse and an old eucalyptus grove.',
    },
    {
      id: 'pine-forest',
      lat: 10.2141,
      lng: 77.45806,
      title: 'Pine Forest',
      image: '/img/kodai/pine-forest.jpg',
      alt: 'Tall pine trunks in the Kodaikanal pine forest',
      duration: '1 hour',
      note: 'Golden hour light',
      body: 'Ruler straight pines planted in 1906, standing in rows on a red earth slope. The light falls through them in bars in the late afternoon.',
    },
    {
      id: 'silver-cascade',
      lat: 10.24199,
      lng: 77.5103,
      title: 'Silver Cascade Falls',
      image: '/img/kodai/silver-cascade.jpg',
      alt: 'Silver Cascade Falls tumbling down the ghat road',
      duration: '45 mins',
      note: 'On the ghat road',
      body: 'A 180 foot fall spilling straight off the ghat road as you climb into Kodai, the traditional first stop of every trip up the hill.',
    },
    {
      id: 'berijam-lake',
      lat: 10.18696,
      lng: 77.39415,
      title: 'Berijam Lake',
      image: '/img/kodai/berijam-lake.jpg',
      alt: 'Still water and forest at Berijam Lake near Kodaikanal',
      duration: 'Half day',
      note: 'Forest permit needed',
      body: 'A protected reservoir 21 km deep inside the shola forest. Entry is capped each day, so we arrange the permit and a driver who knows the route.',
    },
    {
      id: 'dolphins-nose',
      lat: 10.20904,
      lng: 77.48721,
      title: 'Dolphin’s Nose',
      image: '/img/kodai/dolphins-nose-2.jpg',
      alt: 'The flat rock ledge at Dolphin’s Nose over the Kodaikanal valley',
      duration: '3 hours',
      note: 'Moderate trek',
      body: 'A flat rock ledge jutting out over a 6,000 foot drop, reached on foot through the shola. Go early, the valley fills with cloud by mid morning.',
    },
  ],
}

export const CELEBRATE = {
  bannerTitle: 'Planning a celebration?',
  bannerBody: 'We take on one celebration at a time, so the house is yours for the day. Tell us what you have in mind and we will work out the rest.',
  bannerCta: 'Talk to us',
  eyebrow: 'Occasions',
  title: 'Celebrate your special day in a special way',
  lead: 'A day that combines panache with peace of mind. While we are busy planning it, our kitchen and the quiet of the hills give you every excuse to relax and look forward to it.',
  path: '/celebrate/',
  link: 'See every occasion',

  /**
   * One block per occasion on the celebrations page, and the first photo of
   * each is the card on the landing page.
   *
   * PLACEHOLDER PHOTOGRAPHY. These are the property photos re-used to stand
   * in: none of them is of an actual celebration. Swap them for real event
   * photos when you have them, the shape here does not change.
   */
  occasions: [
    {
      id: 'birthdays',
      name: 'Birthdays',
      blurb:
        'The dining hall laid for however many are coming, and the kitchen sending food out all evening. Tell us the cake and we will have it waiting.',
      photos: pick([
        ['luxury', 3, 'The dining table laid with a home cooked spread'],
        ['heritage', 8, 'The dining room with its wall of windows'],
        ['luxury', 2, 'The grand living hall with blue sofas'],
      ]),
    },
    {
      id: 'anniversaries',
      name: 'Anniversaries',
      blurb:
        'A quiet table, the room with the best window, and nobody else in the house. We can set dinner on the terrace if the evening is clear.',
      photos: pick([
        ['king', 6, 'Bedroom with a green headboard and a window over the valley'],
        ['king', 15, 'Living room with a glass wall looking onto the forest'],
        ['luxury', 4, 'Bedroom with a balcony over the valley'],
      ]),
    },
    {
      id: 'honeymoon',
      name: 'Honeymoon',
      blurb:
        'A complimentary first night for couples who celebrate with us, a turn down set up on arrival, and breakfast whenever you surface.',
      photos: pick([
        ['king', 12, 'A welcome tray and towels set out on the bed'],
        ['luxury', 9, 'Bedroom with sliding doors onto the hills'],
        ['king', 5, 'Bedroom with floor to ceiling windows'],
      ]),
    },
    {
      id: 'proposals',
      name: 'Proposals',
      blurb:
        'The mist usually arrives by mid morning and clears by four. We will tell you which hour the valley is at its best, and keep everyone else out of the way.',
      photos: pick([
        ['luxury', 14, 'The mountain view from the suite'],
        ['king', 14, 'Sofas facing the hillside through full height glass'],
        ['heritage', 11, 'A campfire burning on the lawn'],
      ]),
    },
    {
      id: 'baby-shower',
      name: 'Baby showers',
      blurb:
        'Ground floor rooms, a hall big enough to decorate, and a lawn to spill out onto. Quiet enough that an afternoon nap is still possible.',
      photos: pick([
        ['luxury', 1, 'The hall looking towards the dining table'],
        ['heritage', 2, 'Sitting room with a stone wall and a window seat'],
        ['heritage', 3, 'Living room looking towards the staircase'],
      ]),
    },
    {
      id: 'reunions',
      name: 'Family reunions',
      blurb:
        'Take a whole house. Di Heritage sleeps a family across three bedrooms with a kitchen, a dining hall and lawn all around it.',
      photos: pick([
        ['heritage', 1, 'Timber panelled living room with carved furniture'],
        ['heritage', 15, 'The stone bungalow seen from the road'],
        ['heritage', 9, 'A barbecue set up on the lawn'],
      ]),
    },
  ],
}

export const HONEYMOON = {
  eyebrow: 'Just married',
  title: 'The perfect honeymoon',
  body: 'Couples who book their celebration at StayGlee get a complimentary honeymoon night in any of our Kodaikanal homes. The rest of it holds whether you stay a single night or a whole week.',
  benefits: [
    'A complimentary first night on us',
    'A room upgrade, subject to availability',
    'Full breakfast for two, daily',
    'A private candle lit dinner on the terrace',
    'Early check in and late check out',
    'A welcome drink and flowers on arrival',
    '₹2,000 towards a guided Kodai day trip',
  ],
  closing: 'To book, speak to your stay coordinator while you are planning the celebration.',
  terms: 'Terms and conditions: weddings and honeymoons at StayGlee are subject to availability and a minimum two night stay. Blackout dates apply through the peak season, April to June, and over Pongal. Certain restrictions apply, please check with your stay coordinator for details.',
  imageMain: '/img/honeymoon-boat.jpg',
  imageMainAlt: 'A couple rowing across Kodai Lake in the early morning mist',
  imageInset: '/img/honeymoon-bed.jpg',
  imageInsetAlt: 'A turn down set up with towel swans and a welcome tray on the bed',
}

export const ABOUT = {
  title: 'About us',
  body: 'Discover your perfect escape in the hills of Kodaikanal. Whether you are after peace, a long walk or a room with the door shut and nowhere to be, our rooms and the view from them are the whole offer. Wake up to misty mornings, spend the day out in the shola, and come back to a home away from home.',
  image: '/img/kodai/aboutus.jpg',
  imageAlt: 'Cloud drifting across a forested Kodaikanal ridge',
}

export const CLOSING = {
  title: 'The hills are calling. We will keep the filter coffee coming.',
  button: 'Message us on WhatsApp',
}

/**
 * The studio credit under the copyright line. The artwork is dark grey, so
 * the footer flips it to cream with a filter rather than shipping a second
 * file. Add `href` and the logo becomes a link to the studio.
 */
export const CREDIT = {
  prefix: 'Designed and developed by',
  name: 'Infineascents',
  logo: '/img/infineascents.png',
  href: 'https://www.infineascents.com/',
}

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Tripadvisor', href: 'https://tripadvisor.com' },
]

/**
 * Photo provenance, kept here now that the footer credit has been removed.
 *
 * Everything under `/img/stays/` plus the hero is StayGlee's own and is free
 * and clear. The nine files under `/img/kodai/` are NOT: they came from
 * Wikimedia Commons under CC BY-SA, which requires a visible credit wherever
 * they are published. They are still used by the eight EXPLORE cards and the
 * ABOUT band below. Replace those nine with StayGlee's own photography, or put
 * the credit back, whichever suits.
 * https://commons.wikimedia.org/wiki/Category:Kodaikanal
 */

const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi StayGlee, I would like to check availability for a stay in Kodaikanal.'
)

export const waLink = `https://wa.me/${BRAND.whatsapp}?text=${WHATSAPP_MESSAGE}`

/** Same chat, but the message already names the stay being asked about. */
export const waLinkFor = (stayName) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi StayGlee, I would like to check availability for the ${stayName}.`
  )}`

export const formatINR = (n) =>
  '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })
