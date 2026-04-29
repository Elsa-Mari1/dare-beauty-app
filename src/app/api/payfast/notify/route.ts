import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// ITN-safe signature — uses fields in the order PayFast sends them
function generateITNSignature(params: Record<string, string>, passphrase: string): string {
  const { signature, ...rest } = params;
  const queryString = Object.entries(rest)
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, "+")}`)
    .join("&");
  const stringToHash = passphrase
    ? `${queryString}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
    : queryString;
  return crypto.createHash("md5").update(stringToHash).digest("hex");
}

function isPartyPayment(paymentId: string): boolean {
  return paymentId.startsWith("party-");
}

function isMembershipPayment(paymentId: string): boolean {
  return paymentId.startsWith("skin-membership-") || paymentId.startsWith("lash-");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = Object.fromEntries(new URLSearchParams(body));
    const { signature } = params;

    // 1. Verify signature
    const expectedSig = generateITNSignature(params, process.env.PAYFAST_PASSPHRASE || "");
    if (expectedSig !== signature) {
      console.warn("[payfast/notify] Signature mismatch", { expectedSig, signature });
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
    if ((await validationRes.text()) !== "VALID") {
      return new NextResponse("Invalid payment", { status: 400 });
    }

    const paymentId = params.m_payment_id;
    const isComplete = params.payment_status === "COMPLETE";

    // 3. Always write to payments table (full audit trail)
    await supabase.from("payments").upsert({
      m_payment_id: paymentId,
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

    // 4. Route to correct table based on payment type
    if (isComplete) {
      if (isPartyPayment(paymentId)) {
        // Parse guest count from paymentId e.g. "party-mini-glow-6"
        const guestCount = paymentId.endsWith("-8") ? 8 : 6;

        await supabase.from("party_deposits").upsert({
          m_payment_id: paymentId,
          pf_payment_id: params.pf_payment_id,
          package_name: params.item_name,
          guest_count: guestCount,
          amount_paid: parseFloat(params.amount_gross),
          name_first: params.name_first,
          name_last: params.name_last,
          email_address: params.email_address,
          payment_status: params.payment_status,
        }, { onConflict: "m_payment_id" });

      } else if (isMembershipPayment(paymentId)) {
        // Upsert member record — create or update existing
        await supabase.from("members").upsert({
          email: params.email_address,
          name_first: params.name_first,
          name_last: params.name_last,
          membership_type: params.item_name,
          status: "active",
          pf_subscription_token: params.token ?? null, // PayFast sends this for recurring
          started_at: new Date().toISOString(),
        }, { onConflict: "email" });
      }

      // 5. Email the salon owner
      const isParty = isPartyPayment(paymentId);
      await resend.emails.send({
        from: "onboarding@resend.dev", // replace with your verified domain in production
        to: process.env.NOTIFY_EMAIL!,
        subject: isParty
          ? `🎉 New party deposit: ${params.item_name}`
          : `✨ New membership: ${params.item_name}`,
        html: isParty
          ? `
            <h2>New party deposit received 🎉</h2>
            <p><strong>Package:</strong> ${params.item_name}</p>
            <p><strong>Amount paid:</strong> R${params.amount_gross}</p>
            <p><strong>Customer:</strong> ${params.name_first} ${params.name_last}</p>
            <p><strong>Email:</strong> ${params.email_address}</p>
            <p><strong>Payment ref:</strong> ${paymentId}</p>
            <hr/>
            <p>Next step: Contact the customer to confirm their party date and send them the SalonBridge booking link.</p>
          `
          : `
            <h2>New membership sign-up ✨</h2>
            <p><strong>Membership:</strong> ${params.item_name}</p>
            <p><strong>Monthly amount:</strong> R${params.amount_gross}</p>
            <p><strong>Customer:</strong> ${params.name_first} ${params.name_last}</p>
            <p><strong>Email:</strong> ${params.email_address}</p>
            <p><strong>Payment ref:</strong> ${paymentId}</p>
          `,
      });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("[payfast/notify] Error:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}