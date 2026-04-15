import { BookingSection } from "@/components/site/BookingSection";
import { ExperienceSection } from "@/components/site/ExperienceSection";
import { FaqSection } from "@/components/site/FaqSection";
import { Footer } from "@/components/site/Footer";
import { GallerySection } from "@/components/site/GallerySection";
import { Header } from "@/components/site/Header";
import { HeroSection } from "@/components/site/HeroSection";
import { LocationSection } from "@/components/site/LocationSection";
import { MembershipsSection } from "@/components/site/MembershipsSection";
import { PartiesSection } from "@/components/site/PartiesSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { bookingLink } from "@/data/siteContent";

export default function Home() {
  return (
    <div className="site">
      <Header />

      <main id="top">
        <HeroSection />
        <ServicesSection />
        <ExperienceSection />
        <MembershipsSection />
        <PartiesSection />
        <GallerySection />
        <LocationSection />
        <TestimonialsSection />
        <BookingSection />
        <FaqSection />
      </main>

      <Footer />

      <a className="floating-cta" href={bookingLink} target="_blank" rel="noreferrer">
        Book Appointment
      </a>
    </div>
  );
}
