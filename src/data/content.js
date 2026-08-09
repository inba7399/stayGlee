export const BRAND = {
  name: 'StayGlee',
  tagline: 'Homestay & Rooms',
  phonePrimary: '997-646-3444',
  phoneSecondary: '0000000000',
  whatsapp: '919976463444',
  email: 'stay@stayglee.in',
  address: 'Vattakanal Road, Kodaikanal, Tamil Nadu 624101',
}

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Service', href: '#service' },
  { label: 'Explore Kodai', href: '#explore' },
]

export const HERO_FEATURES = [
  { icon: '/img/homestay.png', label: 'HomeStay Residence' },
  { icon: '/img/Expactationalhome.png', label: 'Expectational Homes' },
  { icon: '/img/homeCookedfood.png', label: 'Home Cooked Food' },
  { icon: '/img/ExploreKoda.png', label: 'Explore Kodai' },
  { icon: '/img/celabrate.png', label: 'Celebrate' },
]

export const STAY_SLIDES = [
  {
    id: 'hill-rooms',
    img: '/img/room1.jpg',
    label: 'COSY HILL ROOMS',
    alt: 'Warm wood-panelled living room with blue seating at StayGlee',
  },
  {
    id: 'family-suites',
    img: '/img/room2.jpg',
    label: 'FAMILY SUITES',
    alt: 'Spacious family suite at StayGlee Kodaikanal',
  },
  {
    id: 'private-cottage',
    img: '/img/room3.jpg',
    label: 'PRIVATE COTTAGES',
    alt: 'Private cottage interior at StayGlee Kodaikanal',
  },
  {
    id: 'balcony-views',
    img: '/img/room4.jpg',
    label: 'BALCONY VIEWS',
    alt: 'Room with a balcony overlooking the Kodaikanal hills',
  },
  {
    id: 'quiet-corners',
    img: '/img/room5.jpg',
    label: 'QUIET CORNERS',
    alt: 'Quiet reading corner inside a StayGlee homestay',
  },
]

export const EXPLORE_ITEMS = [
  {
    id: 'kodai-lake',
    title: 'Kodai Lake',
    img: '/img/kodai/kodai-lake.jpg',
    alt: 'Reflections on Kodaikanal Lake at first light',
    duration: '2 hours',
    note: 'Boating & cycling',
    body:
      'The star-shaped lake at the heart of town, ringed by a five-kilometre path. Hire a pedal boat at dawn or cycle the loop before the mist lifts.',
    price: 'From INR 40',
  },
  {
    id: 'coakers-walk',
    title: "Coaker's Walk",
    img: '/img/kodai/coakers-walk.jpg',
    alt: "The cliff-edge promenade at Coaker's Walk, Kodaikanal",
    duration: '1 hour',
    note: 'Best at sunrise',
    body:
      'A one-kilometre promenade curling along the cliff edge, with the whole plains valley opening up below you. On a clear morning you can see all the way to Dolphin’s Nose.',
    price: 'From INR 30',
  },
  {
    id: 'pillar-rocks',
    title: 'Pillar Rocks',
    img: '/img/kodai/pillar-rocks.jpg',
    alt: 'The three granite Pillar Rocks rising above the Kodaikanal hills',
    duration: '2 hours',
    note: 'Includes garden',
    body:
      'Three giant granite boulders standing 400 feet tall, side by side. The mist rolls through the gap between them in the afternoon and the whole viewpoint disappears.',
    price: 'From INR 50',
  },
  {
    id: 'bryant-park',
    title: 'Bryant Park',
    img: '/img/kodai/bryant-park.jpg',
    alt: 'Rose beds in bloom at Bryant Park, Kodaikanal',
    duration: '90 mins',
    note: 'Family favourite',
    body:
      'Twenty acres of terraced botanical garden beside the lake, planted with more than 300 varieties of rose, a glasshouse and an old Eucalyptus grove.',
    price: 'From INR 35',
  },
  {
    id: 'pine-forest',
    title: 'Pine Forest',
    img: '/img/kodai/pine-forest.jpg',
    alt: 'Tall pine trunks in the Kodaikanal pine forest',
    duration: '1 hour',
    note: 'Golden hour light',
    body:
      'Ruler-straight pines planted in 1906, standing in rows on a red-earth slope. The light falls through them in bars in the late afternoon.',
    price: 'Free entry',
  },
  {
    id: 'silver-cascade',
    title: 'Silver Cascade Falls',
    img: '/img/kodai/silver-cascade.jpg',
    alt: 'Silver Cascade Falls tumbling down the ghat road',
    duration: '45 mins',
    note: 'On the ghat road',
    body:
      'A 180-foot fall spilling straight off the ghat road as you climb into Kodai, the traditional first stop of every trip up the hill.',
    price: 'From INR 20',
  },
  {
    id: 'berijam-lake',
    title: 'Berijam Lake',
    img: '/img/kodai/berijam-lake.jpg',
    alt: 'Still water and forest at Berijam Lake near Kodaikanal',
    duration: 'Half day',
    note: 'Forest permit needed',
    body:
      'A protected reservoir 21 km deep inside the shola forest. Entry is capped each day, so we arrange the permit and a driver who knows the route.',
    price: 'From INR 250',
  },
  {
    id: 'dolphins-nose',
    title: "Dolphin's Nose",
    img: '/img/kodai/dolphins-nose-2.jpg',
    alt: "The flat rock ledge at Dolphin's Nose over the Kodaikanal valley",
    duration: '3 hours',
    note: 'Moderate trek',
    body:
      'A flat rock ledge jutting out over a 6,000-foot drop, reached on foot through the shola. Go early, the valley fills with cloud by mid-morning.',
    price: 'From INR 60',
  },
]

export const CELEBRATE_CARDS = [
  { id: 'birthdays', img: '/img/room2.jpg', label: 'BIRTHDAYS' },
  { id: 'anniversaries', img: '/img/room3.jpg', label: 'ANNIVERSARIES' },
  { id: 'honeymoon', img: '/img/room4.jpg', label: 'HONEYMOON' },
  { id: 'proposals', img: '/img/room5.jpg', label: 'PROPOSALS' },
  { id: 'reunions', img: '/img/room1.jpg', label: 'FAMILY REUNIONS' },
]

/**
 * The Kodaikanal location photography comes from Wikimedia Commons under
 * CC BY-SA, which requires visible attribution - hence the footer credit line.
 * Room, logo and honeymoon imagery is StayGlee's own and needs no credit.
 */
export const PHOTO_CREDITS = {
  license: 'CC BY-SA',
  source: 'Wikimedia Commons',
  sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Kodaikanal',
  photographers: [
    'ACKSEN',
    'Navaneethpp',
    'Muralikrishna m',
    'రవిచంద్ర',
    'Ishfaq Shams',
    'Ranjithsiji',
    'KARTY JazZ',
    'Lokesh Ramachandra',
    'Geetha Grandhe',
    'Marcus334',
  ],
}

export const HONEYMOON_BENEFITS = [
  'A complimentary first night on us',
  'A room upgrade (subject to availability)',
  'Full breakfast for two, daily',
  'Private candle-lit dinner on the terrace',
  'Early check-in and late check-out',
  'A welcome drink and flowers on arrival',
  'INR 2,000 towards a guided Kodai day trip',
]
