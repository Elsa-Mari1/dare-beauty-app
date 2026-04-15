import { processSteps } from "@/data/siteContent";

export function ExperienceSection() {
  return (
    <section id="experience" className="section card">
      <h2>How Booking Works</h2>
      <p className="section-intro">
        From choosing your treatment to showing up for your appointment, we keep everything simple and
        stress-free.
      </p>
      <div className="steps">
        {processSteps.map((step, index) => (
          <article key={step.title} className="step-card">
            <p className="step-number">0{index + 1}</p>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
