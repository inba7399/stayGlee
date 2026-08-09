import './CelebrationBanner.css'

export default function CelebrationBanner() {
  return (
    <section className="celebration-banner">
      <div className="shell">
        <div className="celebration-banner__box" data-anim>
          <div className="celebration-banner__copy">
            <h2 className="section-title">Planning a celebration?</h2>
            <p className="body-text">
              We specialise in creating unique and memorable experiences so you can focus on what
              is most important to you: your guests. Contact us with any questions.
            </p>
          </div>
          <a className="pill pill--dark celebration-banner__cta" href="#contact">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
