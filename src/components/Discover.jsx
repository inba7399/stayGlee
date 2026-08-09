import './Discover.css'

export default function Discover() {
  return (
    <section className="discover" id="about">
      {/* Short hand-off band: the hero navy melts into the page white. */}
      <div className="discover__fade" aria-hidden="true" />

      <div className="shell discover__intro">
        <h2 className="discover__kicker">Discover Kodai</h2>
        <p className="discover__tagline">
          Discover unhurried comfort with signature hill-country warmth in our thoughtfully
          kept homestays and rooms.
        </p>
      </div>

      <div className="shell discover__grid">
        <figure className="discover__cell discover__cell--tall">
          <div className="media discover__media discover__media--tall" data-anim-img>
            <img
              src="/img/img1.jpg"
              alt="Silver Cascade Falls tumbling through the green Kodaikanal hillside"
              loading="lazy"
            />
          </div>
          <figcaption className="caption">Settle your mind. Invigorate your spirit.</figcaption>
          <p className="discover__note">
            Discover unhurried comfort with signature hill-country warmth in our thoughtfully
            kept homestays and rooms.
          </p>
        </figure>

        <div className="discover__cell discover__cell--stack">
          <figure>
            <div className="media discover__media discover__media--wide" data-anim-img>
              <img
                src="/img/img2.jpg"
                alt="Kodaikanal peaks rising above a sea of cloud"
                loading="lazy"
              />
            </div>
            <figcaption className="caption">Settle your mind. Invigorate your spirit.</figcaption>
          </figure>

          <figure>
            <div className="media discover__media discover__media--wide" data-anim-img>
              <img
                src="/img/img3.jpg"
                alt="Lamplit garden seating looking out over the valley at dusk"
                loading="lazy"
              />
            </div>
            <figcaption className="caption">Settle your mind. Invigorate your spirit.</figcaption>
          </figure>
        </div>

        <div className="discover__cell discover__cell--text" data-anim>
          <h3 className="discover__heading">Perfect Weather All Year Round</h3>
          <p className="body-text">
            Kodaikanal is the perfect escape from the heat and chaos of city life. Nestled in the
            Western Ghats, this charming hill station offers a blend of natural beauty, serenity
            and adventure. Explore the iconic Kodai Lake with paddle boating, trek through
            Coaker&rsquo;s Walk and Bryant Park, witness the stunning Pillar Rocks, soak in the
            views from Dolphin&rsquo;s Nose, and feel the mist at Silver Cascade Falls. Whether
            you&rsquo;re looking to unwind, romance or explore, Kodaikanal welcomes you with open
            arms and unforgettable memories.
          </p>
        </div>
      </div>
    </section>
  )
}
