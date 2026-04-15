import { bookingLink, highlights, instagramLink, whatsappLink } from "@/data/siteContent";

export function HeroSection() {
  return (
    <section className="hero section">
      <div className="hero-grid">
        <div>
          <p className="eyebrow">Dare Beauty Bar Brackenfell</p>
          <h1>A premium beauty website experience for your next appointment.</h1>
          <p>
            Discover services, compare memberships, and book instantly. Built for smooth scrolling,
            fast decisions, and a polished client journey.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href={bookingLink} target="_blank" rel="noreferrer">
              Start Booking
            </a>
            <a className="secondary-btn" href={whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
            <a className="secondary-btn" href={instagramLink} target="_blank" rel="noreferrer">
              Follow on Instagram
            </a>
          </div>
          <ul className="mini-bullets">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <aside className="hero-panel card">
          <p className="hero-panel-title">Quick Access</p>
          <a className="panel-link" href="#services">
            Explore services
          </a>
          <a className="panel-link" href="#memberships">
            Compare memberships
          </a>
          <a className="panel-link" href="#parties">
            View party packs
          </a>
          <a className="panel-link" href="#location">
            Find our location
          </a>
          <a className="panel-link" href={bookingLink} target="_blank" rel="noreferrer">
            Open booking portal
          </a>
        </aside>
      </div>
    </section>
  );
}
