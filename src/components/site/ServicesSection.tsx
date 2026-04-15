import { serviceCategories } from "@/data/siteContent";

export function ServicesSection() {
  return (
    <section id="services" className="section">
      <h2>Services That Cover Your Full Beauty Routine</h2>
      <p className="section-intro">
        Organized by category so clients can quickly understand what you do and choose confidently.
      </p>
      <div className="service-grid">
        {serviceCategories.map((service) => (
          <article key={service.title} className="service-card card">
            <p className="badge">{service.badge}</p>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
