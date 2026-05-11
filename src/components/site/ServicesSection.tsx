"use client";
import { useState } from "react";
import { serviceCategories } from "@/data/siteContent";
import { pricelist } from "@/data/pricelist";

const TABS = [
  { key: "facials",          label: "Facials" },
  { key: "lashesAndBrows",   label: "Lashes & Brows" },
  { key: "nails",            label: "Nails" },
  { key: "waxing",           label: "Waxing" },
  { key: "threading",        label: "Threading" },
  { key: "hairTreatments",   label: "Hair" },
  { key: "permanentMakeup",  label: "PMU" },
  { key: "sprayTan",         label: "Spray Tan" },
] as const;

type TabKey = typeof TABS[number]["key"];

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("facials");

  const items = pricelist[activeTab];

  return (
    <section id="services" className="section">
      <h2>Services That Cover Your Full Beauty Routine</h2>
      <p className="section-intro">
        Organized by category so you can find exactly what you need.
      </p>

      {/* Summary cards — unchanged */}
      <div className="service-grid" style={{ marginBottom: "2.5rem" }}>
        {serviceCategories.map((service) => (
          <article key={service.title} className="service-card card">
            <p className="badge">{service.badge}</p>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>

      {/* Price list */}
      <h3 style={{ margin: "0 0 0.75rem" }}>Full Price List</h3>

      {/* Tab strip — reuse your .nav scroll pattern */}
      <div className="nav" style={{ gap: "0.5rem", marginBottom: "1.25rem" }}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={activeTab === tab.key ? "book-btn" : "secondary-btn"}
            style={{ fontSize: "0.82rem", padding: "0.45rem 0.9rem", border: "none", cursor: "pointer" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Price rows */}
      <div className="card" style={{ padding: "0.25rem 0" }}>
        {items.map((item, i) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 1.25rem",
              borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <span style={{ fontSize: "0.92rem" }}>{item.name}</span>
            <span
              style={{
                fontWeight: 700,
                color: "var(--primary-deep)",
                whiteSpace: "nowrap",
                marginLeft: "1rem",
              }}
            >
              R{item.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}