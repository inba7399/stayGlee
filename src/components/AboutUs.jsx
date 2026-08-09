import './AboutUs.css'

export default function AboutUs() {
  return (
    <section className="aboutus">
      <div className="aboutus__band" data-parallax-scope>
        <div className="aboutus__bg">
          <img
            src="/img/kodai/aboutus.jpg"
            alt="Cloud drifting across a forested Kodaikanal ridge"
            loading="lazy"
            data-parallax="6"
          />
        </div>
        <span className="aboutus__scrim" aria-hidden="true" />

        <div className="aboutus__copy shell" data-anim-group>
          <h2 className="aboutus__title">About us</h2>
          <p className="aboutus__text">
            Discover your perfect escape in the hills of Kodaikanal. Whether you&rsquo;re seeking
            peace, adventure, or a romantic retreat, our cosy rooms and breathtaking views offer
            the ideal stay. Wake up to misty mornings, explore nature&rsquo;s beauty, and relax in
            the comfort of home away from home.
          </p>
        </div>
      </div>
    </section>
  )
}
