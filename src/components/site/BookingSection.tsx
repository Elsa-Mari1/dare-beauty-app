import { bookingLink } from "@/data/siteContent";

export function BookingSection() {
  return (
    <section id="booking" className="section card booking">
      <h2>Book Your Appointment</h2>
      <p>Choose your service, preferred date, and team member through our online booking portal.</p>
      <a className="primary-btn" href={bookingLink} target="_blank" rel="noreferrer">
        Open Booking Portal
      </a>
    </section>
  );
}
