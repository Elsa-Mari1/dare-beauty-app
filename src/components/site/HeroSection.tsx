import { bookingLink, facebookLink, highlights, instagramLink, whatsappLink } from "@/data/siteContent";

export function HeroSection() {
  return (
    <section className="hero section">
      <div className="hero-grid">
        <div>
          <p className="eyebrow">Dare Beauty Bar Brackenfell</p>
          <h1>Feel confident in your skin.</h1>
          <p>
            Discover services, compare memberships, and book instantly. Your beauty journey starts here.
          </p>
          <div className="hero-actions">
          
            <a className="secondary-btn" href={whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
            <a className="secondary-btn" href={instagramLink} target="_blank" rel="noreferrer">
              Follow on Instagram
            </a>
              <a className="secondary-btn" href={facebookLink} target="_blank" rel="noreferrer">
              Follow us on Facebook
            </a>
          </div>
          <ul className="mini-bullets">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
