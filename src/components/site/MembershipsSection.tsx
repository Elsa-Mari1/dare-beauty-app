"use client";

import { useState } from "react";
import { lashMemberships, memberPerks, skinMemberships } from "@/data/siteContent";
import { PayFastButton } from "../PayFastButton";

// Parse "Classic: R350" → { label: "Classic", amount: 350 }
function parseLashTier(option: string): { label: string; amount: number } {
  const [label, price] = option.split(":");
  const amount = parseInt(price.replace(/\D/g, ""), 10);
  return { label: label.trim(), amount };
}
function CustomerFields({
  onChange,
}: {
  onChange: (fields: { name: string; surname: string; email: string }) => void;
}) {
  const [fields, setFields] = useState({ name: "", surname: "", email: "" });

  function update(key: string, value: string) {
    const updated = { ...fields, [key]: value };
    setFields(updated);
    onChange(updated);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
      <input
        className="input"
        placeholder="First name"
        value={fields.name}
        onChange={e => update("name", e.target.value)}
      />
      <input
        className="input"
        placeholder="Last name"
        value={fields.surname}
        onChange={e => update("surname", e.target.value)}
      />
      <input
        className="input"
        type="email"
        placeholder="Email address"
        value={fields.email}
        onChange={e => update("email", e.target.value)}
      />
    </div>
  );
}

function SkinMembershipCard({ plan }: { plan: (typeof skinMemberships)[0] }) {
  const [customer, setCustomer] = useState({ name: "", surname: "", email: "" });

  return (
    <article className="plan-card" key={plan.title}>
      <h4>{plan.title}</h4>
      <p className="price">{plan.price}</p>
      <p className="value">{plan.value}</p>
      <p className="label">Includes</p>
      <ul>{plan.items.map(item => <li key={item}>{item}</li>)}</ul>
      <p className="label">Member Benefits</p>
      <ul>{plan.perks.map(perk => <li key={perk}>{perk}</li>)}</ul>
      <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
        <CustomerFields onChange={setCustomer} />
        <PayFastButton
          itemName={`${plan.title} Membership`}
          amount={plan.priceAmount}
          paymentId={`skin-membership-${plan.title.toLowerCase().replace(/\s+/g, "-")}`}
          isSubscription
          label="Subscribe"
          className="book-btn"
          customerName={customer.name}
          customerSurname={customer.surname}
          customerEmail={customer.email}
        />
      </div>
    </article>
  );
}

function LashMembershipCard({ plan }: { plan: (typeof lashMemberships)[0] }) {
  const tiers = plan.pricing.map(parseLashTier);
  const [selected, setSelected] = useState<number>(tiers[0].amount);
  const [customer, setCustomer] = useState({ name: "", surname: "", email: "" });

  const selectedTier = tiers.find((t) => t.amount === selected)!;
  const planSlug = plan.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <article className="plan-card">
      <h4>{plan.title}</h4>
      <p>{plan.details}</p>

      <p className="label" style={{ marginTop: "1rem" }}>Choose your lash style</p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {tiers.map((tier) => (
          <button
              key={tier.amount}
              type="button"
              onClick={() => setSelected(tier.amount)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                border: "1.5px solid var(--border)",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s ease",

                background:
                  selected === tier.amount
                    ? "var(--border)"
                    : "transparent",

                color:
                  selected === tier.amount
                    ? "#fff"
                    : "var(--text)",

                borderColor:
                  selected === tier.amount
                    ? "var(--border)"
                    : "var(--border)",

              

                transform:
                  selected === tier.amount
                    ? "translateY(-1px)"
                    : "none",
              }}
            >

            {tier.label}
          </button>
        ))}
      </div>

      <p className="price">R{selectedTier.amount} / month</p>
      <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
        Renews monthly until cancelled
      </p>

      <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
        

      <CustomerFields onChange={setCustomer} />


      <PayFastButton
        itemName={`${plan.title} - ${selectedTier.label}`}
        amount={selectedTier.amount}
        paymentId={`lash-${planSlug}-${selectedTier.label.toLowerCase()}`}
        isSubscription
        label="Subscribe"
        className="book-btn"
        customerName={customer.name}
        customerSurname={customer.surname}
        customerEmail={customer.email}
      />
      </div>  
    </article>
  );
}

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
         <SkinMembershipCard key={plan.title} plan={plan} />

        ))}
      </div>

      <h3>Lash Memberships</h3>
      <div className="cards">
        {lashMemberships.map((plan) => (
          <LashMembershipCard key={plan.title} plan={plan} />
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