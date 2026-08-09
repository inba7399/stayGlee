# StayGlee — Homestay & Rooms, Kodaikanal

React + Vite marketing site built from the supplied design mockups.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## Sections

| # | Component | Notes |
|---|-----------|-------|
| 1 | `Header` + `FlyingLogo` | Transparent over the hero, becomes a sticky navy bar on scroll |
| 2 | `Hero` | Full-height, booking widget, five icon features |
| 3 | `Discover` | Navy → white gradient hand-off, 3-column editorial grid |
| 4 | `StaySection` | Centre-aligned room carousel with peeking neighbours |
| 5 | `BetterSection` | Alternating image / copy rows |
| 6 | `ExploreSection` | Kodaikanal experiences rail (place + experience cards) |
| 7 | `CelebrationBanner` | Grey call-out strip |
| 8 | `CelebrateSection` | Limewash-plaster band with framed cards |
| 9 | `Honeymoon` | Copy + overlapping photo pair |
| 10 | `AboutUs` | Full-bleed image band |
| 11 | `Footer` | Compact, four columns |
| — | `WhatsAppFab` | Fixed bottom-right on every screen and scroll position |

## How the logo flight works

There is only ever **one** logo element (`FlyingLogo`), fixed-positioned at
`z-index: 120`. The hero and the header each render an invisible *slot* div that
defines an endpoint. On scroll, a scrubbed GSAP tween interpolates the logo's
`x`, `y` and `scale` between the two measured slot rectangles, so it reads as a
single object attaching itself to the nav bar rather than two logos cross-fading.
Both endpoints are re-measured on `ScrollTrigger.refresh()`, so it stays accurate
through resizes and reflows.

The supplied `logo.png` has a **solid `#050421` backdrop baked in** (it is not
transparent). Both endpoints — and the whole column the logo travels through —
are painted that exact colour, so the plate is invisible. If you ever change
`--navy`, re-run the logo recolour or the plate will show as a rectangle.

## Motion

- **Smooth scrolling**: Lenis, driven from the GSAP ticker so `ScrollTrigger`
  never lags behind the page. (GSAP's own `ScrollSmoother` is a paid Club
  GreenSock plugin; Lenis + ScrollTrigger is the standard free equivalent.)
- **Entrance animations**: declared with data-attributes and wired up in one
  place, `src/lib/useReveal.js` —
  `data-anim` (rise + fade), `data-anim-group` (staggered children),
  `data-anim-img` (unmask + settle zoom), `data-parallax` (scrubbed drift).
- **Carousels**: `src/lib/useSlider.js`. Transform-driven rather than a native
  overflow scroller, because Lenis hijacks wheel events for the page and would
  fight an inner scroll container. Pointer events give drag-to-swipe on both
  touch and desktop; `touch-action: pan-y` leaves vertical scrolling native.
- Everything is gated behind `prefers-reduced-motion`.

## Fonts

- **Poor Richard** — all main headings and captions, as specified. It is a
  system font (shipped with Windows/Office), not a webfont, so it is requested
  via `local()` first and falls back to **Gilda Display** → **EB Garamond** →
  Georgia for visitors who don't have it. See the caveat below.
- **Poppins** — nav, hero headline, buttons, section titles.
- **Inter** — body copy.

> **Note on Poor Richard:** it renders exactly as designed on Windows, but
> visitors on macOS, Android and iOS will see the fallback serif. There is no
> licensed webfont version. If you need it identical everywhere, you'll have to
> license a webfont build of Poor Richard (or a close substitute such as
> Windsor / Bookman) and add it with a real `@font-face` `src: url(...)`.

## Images

Source assets in `IMG/` are the originals (24 MB of PNGs). `public/img/` holds
the optimised set actually served (6 MB total):

- Photos re-encoded to JPEG q82, max 1800 px on the long edge.
- `img4.png` shipped as two photographs composited onto one black canvas; it was
  split into `honeymoon-boat.jpg` and `honeymoon-bed.jpg` so each can be placed
  independently. The crop also removes a stray UI arrow that was baked into it.
- `logo.png` downscaled and its backdrop shifted from `#020121` to `#050421` so
  it matches the header exactly.

Location photography for the Explore rail, the hero and the About us band comes
from Wikimedia Commons under CC BY-SA / CC0. **The attribution line in the
footer is a licence condition — don't remove it.** Replace those images with
StayGlee's own photography and you can drop the credit.

## Placeholder content to replace

- Second phone number is `0000000000`.
- `Contact Us`, `See More`, `Book now`, `Why Join?` etc. all link to `#contact`
  (the footer). Wire them to real pages or a booking engine.
- The hero booking widget is presentational — `Check Rates` does not submit.
- Prices in the Explore rail are indicative.
