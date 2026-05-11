import { bookingLink } from "@/data/siteContent";

export function BookingSection() {
  return (
    <section id="booking" className="section booking">
      <p className="eyebrow">Single Appointments</p>
      <h2>Ready to Book?</h2>
      <p className="section-intro" style={{ textAlign: "center" }}>
        Use our booking portal to choose your service, team member, and time slot.
        Payment is by EFT after your appointment.
      </p>
      <a className="primary-btn" href={bookingLink} target="_blank" rel="noreferrer">
        Open Booking Portal
      </a>
    </section>
  );
}