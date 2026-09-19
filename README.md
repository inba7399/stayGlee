# StayGlee, Homestay & Rooms, Kodaikanal

A single page React (Vite) site. No routes, no backend, no admin, no booking
engine. Enquiries go out over WhatsApp, phone and email.

The design is ported from the `demo_booking` project: Fraunces and Outfit, a
cream and pine palette, Lenis smooth scroll and GSAP parallax. See `DESIGN.md`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview
```

## The page, top to bottom

| Section     | Component        | Anchor       |
| ----------- | ---------------- | ------------ |
| Hero        | `Hero.jsx`       | `#top`       |
| Intro       | `Intro.jsx`      |              |
| Stays       | `Stay.jsx` + `Lightbox.jsx` | `#stay` |
| Pull quote  | `QuoteBand.jsx`  |              |
| Explore     | `Explore.jsx`    | `#explore`   |
| Celebrate   | `Celebrate.jsx`  | `#celebrate` |
| Honeymoon   | `Honeymoon.jsx`  |              |
| About       | `AboutBand.jsx`  | `#about`     |
| Closing CTA | `ClosingCta.jsx` |              |
| Footer      | `Footer.jsx`     | `#contact`   |

Shared pieces: `Navbar.jsx`, `SmoothScroll.jsx` (Lenis plus anchor scrolling),
`Parallax.jsx` (exports `Parallax` and `Reveal`), `icons.jsx`, `WhatsAppFab.jsx`.

## Editing the site

**All copy and every image path is in `src/data/content.js`.** Nothing else
needs touching to change a headline, a price, a phone number or a photo.

To swap a photo: drop the new file into `public/img/` and point the path in
`content.js` at it. What each slot expects:

| Where           | Aspect    | Notes                                          |
| --------------- | --------- | ---------------------------------------------- |
| Hero            | landscape | currently the Di Heritage night shot, `stays/heritage/14.jpg`. Keep the left third quiet: the headline sits there |
| Stay mosaic     | landscape | five per stay: the first fills a tile about 650px wide, the other four about 320px. 1600px originals are plenty |
| Quote band      | landscape | full bleed, gets a dark scrim over it          |
| Explore cards   | 4:3       | eight of them                                  |
| Celebrate cards | 3:4       | portrait, five of them                         |
| Honeymoon main  | 4:5       | portrait                                       |
| Honeymoon inset | 4:3       | small, sits over the bottom right of the main  |
| About band      | landscape | full bleed, gets a dark scrim over it          |

The small icon PNGs (`homestay.png`, `Expactationalhome.png`, `homeCookedfood.png`,
`ExploreKoda.png`, `celabrate.png`) are left in `public/img/` but nothing uses
them now that the feature strip is gone.

## Things to know before you change something

**The logo wordmark is white, so it only works on dark.** `public/img/logo.png`
is transparent, but "StayGlee" and "Homestay & Rooms" are set in white and
vanish on cream, mist or white. Every place it is used is dark on purpose: the
header sits on the hero photo or on the pine glass bar, and the footer is
`--pine-deep`. If you ever need it on a light background, ask for a dark
wordmark version rather than putting a box behind it.

**Brand assets and where they came from.** The originals live in `IMG/` and are
too big to ship as they are, so `public/img/` holds resized copies:

| Served file                     | From              | Size            |
| ------------------------------- | ----------------- | --------------- |
| `img/logo.png` (720px wide)     | `IMG/logo.png`    | 676KB to 100KB  |
| `img/favicon.png` (128px)       | `IMG/Favicon.png` | 847KB to 14KB   |
| `img/apple-touch-icon.png` (512px) | `IMG/Favicon.png` | 132KB        |
| `img/Whatsapp.png` (256px)      | `IMG/Whatsapp.png`| 95KB to 15KB    |

There is no ImageMagick on this machine, so the copies were made by pointing
headless Chrome at a page that renders the image at `100vw/100vh`, with
`--default-background-color=00000000` to keep the transparency.

**If you regenerate one, do not set `--window-size` below about 500px.** Chrome
refuses to lay out narrower than that, renders at ~500px and then crops the
screenshot to the size you asked for, which silently produces a cut off icon.
Render large and scale down with `--force-device-scale-factor` instead, for
example `--window-size=1024,1024 --force-device-scale-factor=0.125` for 128px.
Always open the result and look at it: a cropped file still has plausible
dimensions and a plausible byte count.

**The Wikimedia credit was removed from the footer on request, but nine of
those photos are still on the page.** The files under `public/img/kodai/` came
from Wikimedia Commons under CC BY-SA, which requires a visible credit wherever
they are published. They are still used by the eight Explore cards and the About
band. Either replace those nine with StayGlee's own photography, or put the
credit line back in `Footer.jsx`. The hero and every stay photo are StayGlee's
own and were never covered by it.

**The three stays are real content.** Names, prices, offers, descriptions and
highlights in `STAY.stays` come from StayGlee's own listings, and the photos in
`public/img/stays/{king,luxury,heritage}/` are the owner's, copied from
`IMG/Rooms/` and renamed `01.jpg`, `02.jpg`... in the owner's own order.

Each stay's `photos` list is kept in that 1, 2, 3 order on purpose. The first
five fill the mosaic on the page; all of them are in the full screen gallery
(`Lightbox.jsx`). To change what the mosaic shows, reorder the list. To add a
photo, drop it in the folder and add a `[number, 'alt text']` line. King `16`
is left out because it is the same file as `03`.

Adding a fourth stay is one more object in `STAY.stays`: the mosaic flips sides
on every other card by itself.

**Placeholder content still to confirm:** everything that is *not* in `STAY`.
The hero paragraph, the intro paragraph, the four stat tiles (the 4.9 rating and
the 1 km figure are invented), the address and email in `BRAND`, and the
celebrate and honeymoon copy were written before the real listings arrived. The
social links in `SOCIALS` point at the bare domains.

## House style

No em dashes or en dashes anywhere, in copy or in code comments. Use commas,
colons and full stops. After editing, confirm with:

```bash
grep -rn "—\|–" src/ index.html
```
