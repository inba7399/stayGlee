import { HONEYMOON_BENEFITS } from '../data/content'
import './Honeymoon.css'

export default function Honeymoon() {
  return (
    <section className="honeymoon">
      <div className="shell honeymoon__grid">
        <div className="honeymoon__copy" data-anim-group>
          <h2 className="section-title">The perfect honeymoon</h2>

          <p className="body-text">
            We invite couples who book their wedding celebration at StayGlee to enjoy a
            complimentary honeymoon night at any of our Kodaikanal homes. Couples also receive a
            host of other benefits, whether they honeymoon with us for a single night or a whole
            week. These benefits include:
          </p>

          <ul className="honeymoon__list">
            {HONEYMOON_BENEFITS.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          <p className="body-text">
            To book, simply speak to your stay coordinator while you are planning the celebration.
          </p>

          <p className="honeymoon__terms">
            Terms &amp; Conditions: Weddings and honeymoons at StayGlee are subject to
            availability and a minimum two-night stay. Blackout dates apply through the peak
            season (April to June) and over Pongal. Certain restrictions apply, please check
            with your stay coordinator for details.
          </p>
        </div>

        <div className="honeymoon__media" data-parallax-scope>
          <div className="media honeymoon__shot honeymoon__shot--main" data-anim-img>
            <img
              src="/img/honeymoon-boat.jpg"
              alt="A couple rowing across Kodai Lake in the early morning mist"
              loading="lazy"
            />
          </div>
          <div className="media honeymoon__shot honeymoon__shot--inset" data-anim-img>
            <img
              src="/img/honeymoon-bed.jpg"
              alt="A turn-down set-up with towel swans and a welcome tray on the bed"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
