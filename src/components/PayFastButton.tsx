"use client";

import { useState } from "react";

type Props = {
  /** Label shown on the PayFast checkout page */
  itemName: string;
  /** ZAR amount (e.g. 1500) */
  amount: number;
  /** Unique reference for this product/variant */
  paymentId: string;
  /** Short description shown on checkout */
  description?: string;
  /** Set true for memberships (recurring billing) */
  isSubscription?: boolean;
  /** Monthly amount for subscriptions (defaults to `amount`) */
  recurringAmount?: number;
  /** CSS class(es) forwarded to the button */
  className?: string;
  /** Button label – defaults to "Pay Now" */
  label?: string;
};

/**
 * PayFastButton
 *
 * 1. Calls our API route to get a signed payload.
 * 2. Creates a hidden HTML form and submits it to PayFast.
 *
 * This avoids exposing the merchant key or passphrase to the browser —
 * signing happens server-side in /api/payfast/create-payment.
 */
export function PayFastButton({
  itemName,
  amount,
  paymentId,
  description,
  isSubscription,
  recurringAmount,
  className = "book-btn",
  label = "Pay Now",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/payfast/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName,
          amount,
          paymentId,
          description,
          isSubscription,
          recurringAmount,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create payment");
      }

      const { url, payload } = await res.json();

      console.log("Signature:", payload.signature);
      console.log("PAYLOAD SENT TO PAYFAST:", payload);

      // Build a temporary form and submit it to PayFast
      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;

      for (const [key, value] of Object.entries(payload)) {
        if (value === undefined || value === null || value === "") continue;

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
      <button
        type="button"
        className={className}
        onClick={handleClick}
        disabled={loading}
        style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
      >
        {loading ? "Redirecting…" : label}
      </button>
      {error && (
        <p style={{ color: "var(--color-error, #c0392b)", fontSize: "0.8rem", margin: 0, textAlign: "center", maxWidth: "220px" }}>
          {error}
        </p>
      )}
    </div>
  );
}