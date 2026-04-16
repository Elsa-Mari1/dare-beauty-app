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
        {placeGallery.slice(0, 9).map((image) => (
          <div key={image.src} className="gallery-thumb">
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={400}
              className="gallery-image"
              sizes="(max-width: 768px) 33vw, 300px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}