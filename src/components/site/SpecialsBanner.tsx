"use client";
import { useState } from "react";
import { currentSpecials } from "@/data/specials";
import { bookingLink } from "@/data/siteContent";

export function SpecialsBanner() {
  const [dismissed, setDismissed] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const active = currentSpecials.filter(
    (s) => !s.validUntil || s.validUntil >= today
  );

  if (active.length === 0 || dismissed) return null;

  const s = active[0];

  return (
    <div className="specials-banner">
      <div className="specials-banner__inner">
        {s.badge && <span className="badge specials-banner__badge">{s.badge}</span>}
        <span className="specials-banner__text">
          {s.title} — {s.description}
        </span>
        {s.validUntil && (
          <span className="specials-banner__date">
            Valid until{" "}
            {new Date(s.validUntil + "T00:00:00").toLocaleDateString("en-ZA", {
              day: "numeric",
              month: "long",
            })}
          </span>
        )}
        <a href={bookingLink} target="_blank" rel="noreferrer" className="specials-banner__cta badge">
          Book Now
        </a>
      </div>
      <button onClick={() => setDismissed(true)} aria-label="Dismiss" className="specials-banner__dismiss">
        ✕
      </button>
    </div>
  );
}