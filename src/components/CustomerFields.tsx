"use client";
import { useState } from "react";

type CustomerData = { name: string; surname: string; email: string };

export function CustomerFields({ onChange }: { onChange: (fields: CustomerData) => void }) {
  const [fields, setFields] = useState<CustomerData>({ name: "", surname: "", email: "" });

  function update(key: keyof CustomerData, value: string) {
    const updated = { ...fields, [key]: value };
    setFields(updated);
    onChange(updated);
  }

  return (
    <div className="customer-fields">
      <input className="input" placeholder="First name" value={fields.name} onChange={e => update("name", e.target.value)} />
      <input className="input" placeholder="Last name" value={fields.surname} onChange={e => update("surname", e.target.value)} />
      <input className="input" type="email" placeholder="Email address" value={fields.email} onChange={e => update("email", e.target.value)} />
    </div>
  );
}