import { NextRequest, NextResponse } from "next/server";
import { buildPayFastPayload, PAYFAST_CONFIG } from "@/lib/payfast";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      itemName,
      amount,
      paymentId,
      isSubscription,
      recurringAmount,
      customerName,
      customerSurname,
      customerEmail,
    } = body;

    if (!itemName || !amount || !paymentId) {
      return NextResponse.json(
        { error: "itemName, amount and paymentId are required" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const params: Parameters<typeof buildPayFastPayload>[0] = {
      return_url: `${siteUrl}/payment/success`,
      cancel_url: `${siteUrl}/payment/cancel`,
      notify_url: `${siteUrl}/api/payfast/notify`,
      m_payment_id: paymentId,
      amount: Number(amount).toFixed(2),
      item_name: itemName,
      // item_description intentionally omitted — special characters cause signature mismatch
      ...(customerName && { name_first: customerName }),
      ...(customerSurname && { name_last: customerSurname }),
      ...(customerEmail && { email_address: customerEmail }),
      ...(isSubscription && {
        subscription_type: "1" as const,
        frequency: "3" as const,
        cycles: "0",
        recurring_amount: Number(recurringAmount ?? amount).toFixed(2),
      }),
    };

    const payload = buildPayFastPayload(params);

    // // Remove debug logging before going to production
    // console.log("=== PAYFAST DEBUG ===");
    // console.log("Passphrase used:", JSON.stringify(PAYFAST_CONFIG.passphrase));
    // console.log("Payload:", JSON.stringify(payload, null, 2));

    return NextResponse.json({
      url: PAYFAST_CONFIG.baseUrl,
      payload,
    });
  } catch (err) {
    console.error("[payfast/create-payment]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}