import { lashMemberships, memberPerks, skinMemberships } from "@/data/siteContent";

export function MembershipsSection() {
  return (
    <section id="memberships" className="section">
      <h2>DareGlow Club Memberships</h2>
      <p className="section-intro">
        Effortless beauty. Consistent glow. Real results. Limited founding spots with a 3-month minimum
        commitment.
      </p>

      <h3>Skin Memberships</h3>
      <div className="cards">
        {skinMemberships.map((plan) => (
          <article className="plan-card" key={plan.title}>
            <h4>{plan.title}</h4>
            <p className="price">{plan.price}</p>
            <p className="value">{plan.value}</p>
            <p className="label">Includes</p>
            <ul>
              {plan.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="label">Member Benefits</p>
            <ul>
              {plan.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <h3>Lash Memberships</h3>
      <div className="cards">
        {lashMemberships.map((plan) => (
          <article className="plan-card" key={plan.title}>
            <h4>{plan.title}</h4>
            <p>{plan.details}</p>
            <p className="label">Monthly Pricing</p>
            <ul>
              {plan.pricing.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="member-perks card">
        <h3>Member Perks</h3>
        <ul className="grid-list">
          {memberPerks.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
