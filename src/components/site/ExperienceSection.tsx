// ExperienceSection.tsx
import { bookingLink, whatsappLink } from "@/data/siteContent";

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <p className="eyebrow">How It Works</p>
      <h2>Three Ways to Experience Dare Beauty</h2>
      <p className="section-intro">
        Depending on what you need, booking looks a little different — here's how each path works.
      </p>

      <div className="steps">

        <article className="step-card">
          <p className="step-number">01</p>
          <h3>Single Appointments</h3>
          <p>
            Browse the full service menu, pick your treatment, choose a team member and time slot —
            all through our online booking portal. Payment is by EFT after your appointment.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <a className="book-btn" href={bookingLink} target="_blank" rel="noreferrer"
               style={{ fontSize: "0.85rem", padding: "0.55rem 1rem" }}>
              Open Booking Portal →
            </a>
          </div>
        </article>

        <article className="step-card">
          <p className="step-number">02</p>
          <h3>Monthly Memberships</h3>
          <p>
            Choose a skin or lash membership, enter your details, and pay your first month directly
            on this page. Your recurring treatment plan starts immediately — no portal needed.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <a className="secondary-btn" href="#memberships"
               style={{ fontSize: "0.85rem", padding: "0.55rem 1rem" }}>
              View Memberships →
            </a>
          </div>
        </article>

        <article className="step-card">
          <p className="step-number">03</p>
          <h3>Mini Glam Parties</h3>
          <p>
            Pick your party package, choose your guest count, and pay your deposit directly on this
            page to secure your date. We'll reach out to confirm details and timing.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <a className="secondary-btn" href="#parties"
               style={{ fontSize: "0.85rem", padding: "0.55rem 1rem" }}>
              View Party Packages →
            </a>
          </div>
        </article>

      </div>
    </section>
  );
}