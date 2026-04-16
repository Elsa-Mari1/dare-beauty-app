import {  Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { bookingLink, instagramLink, facebookLink, mapsDirectionsLink, whatsappLink } from "@/data/siteContent";
import Image from "next/image";

export function Footer() {
  return (
    <footer id="contact" className="footer">
      <h2>Dare Beauty</h2>
      <p className="footer-address">
        220 Buitenkant Street, Protea Hoogte, Brackenfell, South Africa
      </p>

      <div className="footer-icons">
        <a
          href={instagramLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Follow on Instagram"
          className="footer-icon-link"
        >
          <Image src="/instagram.png" alt="Instagram" width={22} height={22} />
        </a>

        <a
          href={facebookLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Follow on Facebook"
          className="footer-icon-link"
        >
          <Image src="/social-media.png" alt="Facebook" width={22} height={22} />
        </a>
        <a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp us" className="footer-icon-link">
          <Phone size={22} />
        </a>
        <a href="mailto:dare.beauty@icloud.com" aria-label="Email us" className="footer-icon-link">
          <Mail size={22} />
        </a>
        <a href={mapsDirectionsLink} target="_blank" rel="noreferrer" aria-label="Get directions" className="footer-icon-link">
          <MapPin size={22} />
        </a>
      </div>

      <p className="footer-copy">© {new Date().getFullYear()} Dare Beauty Bar · Brackenfell</p>
    </footer>
  );
}