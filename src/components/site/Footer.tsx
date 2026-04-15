import { bookingLink, instagramLink, mapsDirectionsLink } from "@/data/siteContent";

export function Footer() {
  return (
    <footer id="contact" className="footer">
      <h2>Dare Beauty</h2>
      <p>220 Buitenkant Street, Protea Hoogte, Brackenfell, South Africa</p>
      <p>
        Phone / WhatsApp: <a href="tel:+27621540345">+27 62 154 0345</a>
      </p>
      <p>
        Email: <a href="mailto:dare.beauty@icloud.com">dare.beauty@icloud.com</a>
      </p>
      <p>
        Instagram:{" "}
        <a href={instagramLink} target="_blank" rel="noreferrer">
          @dare_beautybar
        </a>
      </p>
      <p>
        Directions:{" "}
        <a href={mapsDirectionsLink} target="_blank" rel="noreferrer">
          Open in Google Maps
        </a>
      </p>
      <a className="book-btn" href={bookingLink} target="_blank" rel="noreferrer">
        Book Now
      </a>
    </footer>
  );
}
