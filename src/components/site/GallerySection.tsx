import Image from "next/image";
import { placeGallery } from "@/data/siteContent";

export function GallerySection() {
  return (
    <section id="gallery" className="section">
      <h2>Inside Dare Beauty</h2>
      <p className="section-intro">
        A quick look at our space, branding, and beauty atmosphere in Brackenfell.
      </p>
      <div className="gallery-grid">
        {placeGallery.map((image) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={900}
            height={900}
            className="gallery-image"
          />
        ))}
      </div>
    </section>
  );
}
