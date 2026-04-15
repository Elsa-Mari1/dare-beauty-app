import { faqs } from "@/data/siteContent";

export function FaqSection() {
  return (
    <section id="faq" className="section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
