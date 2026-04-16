import Image from "next/image";
import { bookingLink, whatsappLink } from "@/data/siteContent";

const partyPackages = [
  {
    title: "Mini Glow",
    tagline: "A fun feel-good pamper experience",
    pricing: "R1 500 (6 kids) · R1 800 (8 kids)",
    duration: "±1 Hour",
    includes: [
      "Welcome drink",
      "Mini facial with cucumber slices",
      "Foot soak + light scrub",
      "Nail polish (hands or toes)",
      "Face glitter",
      "Glitter tattoos",
      "Gown & headband hire",
      "Nail polish, towels & styled setup",
    ],
    craft: "DIY Spa Craft — Choose 1",
    craftOptions: ["Lip oil", "Lip scrub", "Bath salt", "Bracelet", "Decorate a spa cookie"],
    highlight: false,
  },
  {
    title: "Mini Glam",
    tagline: "The perfect mix of pampering, creativity & glam fun",
    pricing: "R1 800 (6 kids) · R2 000 (8 kids)",
    duration: "±1.5 Hours",
    includes: [
      "Welcome drink",
      "Mini facial with cucumber slices",
      "Foot soak + scrub",
      "Nail polish (hands + simple nail art)",
      "Hand massage",
      "Age-appropriate makeup",
      "Face glitter",
      "Glitter tattoos",
      "Mirrors, towels & full styled setup",
      "Gown & headband hire",
    ],
    craft: "DIY Spa Craft — Choose 1",
    craftOptions: ["Lip oil", "Lip scrub", "Bath salt", "Bracelet", "Decorate a spa cookie"],
    highlight: true,
  },
  {
    title: "Mini Luxe",
    tagline: "The ultimate mini glam party for a truly special celebration",
    pricing: "R2 100 (6 kids) · R2 500 (8 kids)",
    duration: "2 – 2.5 Hours",
    includes: [
      "Welcome drink",
      "Facial with mask",
      "Jelly foot spa + scrub",
      "Nail polish (hands & toes) + simple nail art",
      "Age-appropriate makeup + face glitter",
      "Glitter tattoos",
      "Relaxing hand massage",
      "Mirrors, towels & full styled setup",
      "Gown, headband & slipper hire",
      "Birthday girl sash",
      "Glam photo prop station",
    ],
    craft: "DIY Spa Crafts — Choose 2",
    craftOptions: ["Lip oil", "Lip scrub", "Bath salt", "Bracelet", "Decorate a spa cookie"],
    highlight: false,
  },
];

const extras = [
  { label: "Balloon Garlands", note: "Via our supplier" },
  { label: "Pre-packed Cupcake Boxes", note: "" },
  { label: "Party Boxes", note: "Personalised themes available" },
];

export function PartiesSection() {
  return (
    <section id="parties" className="section">
      {/* Small header image */}
      <div className="party-header">
        <Image
          src="/Dare_Mini_Glam_Banner.png"
          alt="Dare Mini Glam Parties — Pamper + DIY Spa Party Experience"
          width={760}
          height={540}
          className="party-header-image"
          priority={false}
        />
      </div>

      <h2>Mini Glam Parties</h2>
      <h3>Where little queens glow</h3>
      <p className="section-intro">
         Pamper. Play. Sparkle. Repeat. <br/> Up to 8 guests per party — perfect
        for birthdays and unforgettable memories.
      </p>

      <div className="cards">
        {partyPackages.map((pkg) => (
          <article
            className={`plan-card party-plan-card${pkg.highlight ? " party-plan-card--featured" : ""}`}
            key={pkg.title}
          >
            {pkg.highlight && <div className="party-featured-ribbon">Most Popular ♥</div>}

            <h4>{pkg.title}</h4>
            <p className="party-tagline">{pkg.tagline}</p>
            <p className="price">{pkg.pricing}</p>
            <p className="value">Duration: {pkg.duration}</p>

            <p className="label">Includes</p>
            <ul>
              {pkg.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="craft-section">
    <p className="label">{pkg.craft}</p>
    <div className="craft-options">
      {pkg.craftOptions.map((c) => (
        <span className="craft-chip" key={c}>
          {c}
        </span>
      ))}
    </div>
  </div>

          </article>
        ))}
      </div>

      {/* Extras */}
      <div className="member-perks card" style={{ marginTop: "1.5rem" }}>
        <h3>Optional Extras Available</h3>
        <ul className="grid-list">
          {extras.map((e) => (
            <li key={e.label}>
              <strong>{e.label}</strong>
              {e.note && <><br /><span style={{ fontSize: "0.85rem" }}>{e.note}</span></>}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem", display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
        <a className="book-btn" href={bookingLink} target="_blank" rel="noreferrer">
          Book Your Party Today
        </a>
        <a className="secondary-btn" href={whatsappLink} target="_blank" rel="noreferrer">
          Ask Us on WhatsApp
        </a>
      </div>
    </section>
  );
}