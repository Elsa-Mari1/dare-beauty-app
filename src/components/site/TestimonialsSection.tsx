import { testimonials } from "@/data/siteContent";

export function TestimonialsSection() {
  return (
    <section className="section">
      <h2>What Clients Love</h2>
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <blockquote className="testimonial-card" key={item.quote}>
            <p>{item.quote}</p>
            <cite>{item.name}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
