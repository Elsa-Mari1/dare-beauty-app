import { NextRequest, NextResponse } from "next/server";
import { generateSignature } from "@/lib/payfast";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = Object.fromEntries(new URLSearchParams(body));
    const { signature, ...rest } = params;

    // 1. Verify signature
    const expectedSig = generateSignature(
      rest as Parameters<typeof generateSignature>[0],
      process.env.PAYFAST_PASSPHRASE || ""
    );

    if (expectedSig !== signature) {
      console.warn("[payfast/notify] Signature mismatch");
      return new NextResponse("Invalid signature", { status: 400 });
    }

    // 2. Validate with PayFast
    const validationRes = await fetch(
      process.env.PAYFAST_SANDBOX === "true"
        ? "https://sandbox.payfast.co.za/eng/query/validate"
        : "https://www.payfast.co.za/eng/query/validate",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      }
    );

    if (await validationRes.text() !== "VALID") {
      return new NextResponse("Invalid payment", { status: 400 });
    }

    // 3. Save to Supabase regardless of status (good audit trail)
    await supabase.from("payments").upsert({
      m_payment_id: params.m_payment_id,
      pf_payment_id: params.pf_payment_id,
      payment_status: params.payment_status,
      item_name: params.item_name,
      amount_gross: parseFloat(params.amount_gross),
      name_first: params.name_first,
      name_last: params.name_last,
      email_address: params.email_address,
      is_subscription: !!params.subscription_type,
      raw_data: params,
    }, { onConflict: "m_payment_id" });

    // 4. Only email on successful payment
    if (params.payment_status === "COMPLETE") {
      await resend.emails.send({
        from: "payments@yourdomain.co.za",
        to: process.env.NOTIFY_EMAIL!,
        subject: `New payment: ${params.item_name}`,
        html: `
          <h2>New payment received ✨</h2>
          <p><strong>Item:</strong> ${params.item_name}</p>
          <p><strong>Amount:</strong> R${params.amount_gross}</p>
          <p><strong>Customer:</strong> ${params.name_first} ${params.name_last}</p>
          <p><strong>Email:</strong> ${params.email_address}</p>
          <p><strong>Payment ref:</strong> ${params.m_payment_id}</p>
        `,
      });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("[payfast/notify] Error:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}