import { bookingLink } from "@/data/siteContent";

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
      <a className="book-btn" href={bookingLink} target="_blank" rel="noreferrer">
        Book Now
      </a>
    </footer>
  );
}
