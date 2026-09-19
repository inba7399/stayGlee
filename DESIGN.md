# StayGlee, design system

Everything below is lifted from the `demo_booking` project
(`Desktop/project/demo_booking/src/index.css`) and re-pointed at StayGlee.
This file is the reference; `src/index.css` is the implementation.

House style note: no em dashes or en dashes anywhere in this project, in copy
or in code comments. Use commas, colons and full stops.

## 1. Palette

| Token          | Hex       | Used for                                    |
| -------------- | --------- | ------------------------------------------- |
| `--cream`      | `#f4efe7` | page background, light text on dark bands   |
| `--mist`       | `#d8dfdb` | alternating section background              |
| `--almond`     | `#e3d4c2` | hero accent word, badges, footer headings   |
| `--almond-soft`| `#ded6cc` | soft fills                                  |
| `--tan`        | `#b89178` | eyebrows, meta text, small accents          |
| `--earth`      | `#654c37` | links, stat numbers                         |
| `--earth-deep` | `#4a3826` | hover state for earth                       |
| `--sage`       | `#8f907e` | secondary body text, captions               |
| `--pine`       | `#383b26` | headings, primary button, dark bands        |
| `--pine-deep`  | `#2a2d1c` | footer, button hover                        |
| `--ink`        | `#2b2620` | body copy                                   |

Rule of thumb: cream page, mist for every other section, pine for the two dark
bands (closing CTA and footer), photographs carry the colour.

## 2. Type

- Display: **Fraunces** (Georgia, serif fallback). `h1`, `h2`, `h3`, stat values,
  pull quotes. Weight 400, line height 1.12, letter spacing -0.01em.
- Body: **Outfit** (system-ui fallback). Everything else. Line height 1.6.
- `h1 em` and `h2 em` render italic in `--tan`, which is how the accent word in
  a heading is styled. On the hero the accent switches to `--almond`, because
  tan sits too close in luminance to sunlit cloud.

Scale:
- `h1`: `clamp(2.4rem, 6vw, 4.4rem)`
- `h2`: `clamp(1.8rem, 4vw, 2.9rem)`
- `h3`: `1.25rem`
- `.lead`: `clamp(1rem, 1.6vw, 1.15rem)`, colour `#5b5347`, max width 56ch
- `.eyebrow`: 0.72rem, uppercase, letter spacing 0.22em, weight 600, tan

## 3. Shape and depth

```
--radius:      18px
--radius-sm:   12px
--shadow:      0 18px 50px -18px rgba(42, 45, 28, 0.35)
--shadow-soft: 0 8px 30px -12px rgba(42, 45, 28, 0.18)
--container:   1180px      /* used as width: min(var(--container), 92vw) */
--ease:        cubic-bezier(0.22, 1, 0.36, 1)
```

Cards are white on cream, `--radius`, `--shadow-soft`, and lift 6px with the
full `--shadow` on hover while their photo scales to 1.06 over 0.6s.

## 4. Components carried over

| Class            | What it is                                                     |
| ---------------- | -------------------------------------------------------------- |
| `.btn`           | Pill button. `--primary` pine, `--light` cream, `--ghost` outlined on photo, `--outline` sage border |
| `.eyebrow`       | Uppercase tan label above a heading                             |
| `.lead`          | Intro paragraph                                                 |
| `.text-link`     | Weight 600 earth link with a tan underline                      |
| `.section`       | `clamp(4rem, 9vw, 7.5rem)` vertical padding                     |
| `.section--mist` | Same, on the mist background                                    |
| `.section__head` | Heading left, link right, wraps on mobile                       |
| `.container`     | `width: min(1180px, 92vw)`, centred                             |
| `.nav`           | Fixed transparent bar, frosted pine glass once scrolled         |
| `.hero`          | `100svh`, parallax photo, two-layer scrim, scroll cue           |
| `.stat`          | White tile, Fraunces number in earth, sage label                |
| `.stays`         | Stays section. Owns its padding and runs 1360px wide, wider than the page container |
| `.stay`          | One white card per stay: mosaic on top, then name and offer price, then two columns |
| `.mosaic`        | Five photo grid, one lead tile 2x2 and four singles. `--flip` leads from the right. Every tile opens the gallery |
| `.lbox`          | Full screen gallery, portalled to `body` so GSAP transforms cannot trap its `position: fixed` |
| `.xcard`         | Explore: 3:4 photo card, number badge, panel that opens on hover |
| `.band`          | Full bleed parallax photo with a centred italic pull quote      |
| `.cta`           | Pine band, cream heading, light button                          |
| `.footer`        | Pine deep, 4 columns, almond headings, thin legal bar           |

## 5. Motion

Four pieces. Nothing hijacks the scroll.

1. **Lenis** smooth scroll, `lerp: 0.1`, wired into the GSAP ticker so
   ScrollTrigger stays in sync. Anything with its own scrollbar needs
   `data-lenis-prevent`, because Lenis preventDefaults every wheel event.
2. **`<Parallax>`**: the image is 130% tall, offset `top: -15%`, and GSAP scrubs
   it between plus and minus `min(11, speed * 50)` percent while its section
   crosses the viewport, so it can never expose an edge.
3. **`<Reveal>`**: fade and rise 36px, 1s, `power3.out`, fires once at
   `top 90%`. Takes a `delay` in ms for stagger.
4. **The explore rail**: the eight cards are rendered twice end to end and the
   track is tweened left by the offset of the first clone, `ease: 'none'`,
   `repeat: -1`, at 26 px per second. Landing on an identical frame is what
   makes the loop invisible, so the distance must be measured from the clone,
   not taken as half the scroll width (half lands a half gap short and the rail
   twitches once per loop). Hover eases `timeScale` to 0 over 0.6s and back to
   1 over 0.9s, so it coasts to a stop instead of freezing.

All four no-op under `prefers-reduced-motion: reduce`. Because a still rail
would strand every card past the fourth, the rail turns into a normal
horizontal scroller there and the detail panels open by default.

## 6. Responsive breakpoints

- `1024px`: multi column grids start collapsing
- `880px`: nav links swap for the burger and slide-in sidebar, two column grids
  become one, explore grid becomes 2 up
- `560px`: stats 2 up, hero buttons full width, explore grid becomes a
  scroll-snapped swipe rail, footer becomes 2 columns

## 7. What was deliberately left behind

From demo_booking: the admin dashboard, the booking flow, the rooms route, the
localStorage content and rooms stores, react-router. This is one static page.

From the old StayGlee build: the navy and gold palette, Poppins and Poor Richard,
the logo that flew into the header on scroll, the 3D cover flow carousel, the
looping drag sliders, the date range picker. All of it was scroll driven or
text over dark photo, which the editorial layout replaces with light readable
surfaces.
