import Image from "next/image";
import { partyPacks } from "@/data/siteContent";

export function PartiesSection() {
  return (
    <section id="parties" className="section">
      <h2>Mini Glam Parties</h2>
      <p>
        A luxury pamper party experience for mini queens. Perfect for birthdays and memory-making
        moments.
      </p>
      <div className="party-grid">
        {partyPacks.map((image) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={1200}
            height={1200}
            className="party-image"
          />
        ))}
      </div>
    </section>
  );
}
