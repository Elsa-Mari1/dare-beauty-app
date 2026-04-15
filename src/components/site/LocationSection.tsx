import { mapsDirectionsLink, mapsEmbedLink } from "@/data/siteContent";

export function LocationSection() {
  return (
    <section id="location" className="section">
      <div className="location-wrap card">
        <div>
          <h2>Visit Us in Brackenfell</h2>
          <p className="section-intro">
            We are based at 220 Buitenkant Street, Protea Hoogte, Brackenfell. Tap directions to open
            Google Maps.
          </p>
          <a className="primary-btn" href={mapsDirectionsLink} target="_blank" rel="noreferrer">
            Get Directions
          </a>
        </div>
        <iframe
          title="Dare Beauty Google Map"
          src={mapsEmbedLink}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
