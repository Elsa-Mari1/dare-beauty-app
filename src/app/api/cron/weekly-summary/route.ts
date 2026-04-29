import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Vercel cron calls this with a secret header to prevent abuse
function isAuthorized(req: NextRequest): boolean {
  return req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // New members this week
    const { data: newMembers } = await supabase
      .from("members")
      .select("name_first, name_last, email, membership_type, started_at")
      .gte("started_at", weekAgo)
      .eq("status", "active");

    // All active members
    const { count: totalActive } = await supabase
      .from("members")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    // Party deposits this week
    const { data: newDeposits } = await supabase
      .from("party_deposits")
      .select("name_first, name_last, email_address, package_name, guest_count, amount_paid, created_at")
      .gte("created_at", weekAgo)
      .eq("payment_status", "COMPLETE");

    // Failed payments this week
    const { data: failedPayments } = await supabase
      .from("payments")
      .select("name_first, name_last, email_address, item_name, amount_gross")
      .gte("created_at", weekAgo)
      .eq("payment_status", "FAILED");

    // Build email
    const memberRows = newMembers?.length
      ? newMembers.map(m => `
          <tr>
            <td>${m.name_first} ${m.name_last}</td>
            <td>${m.email}</td>
            <td>${m.membership_type}</td>
          </tr>`).join("")
      : `<tr><td colspan="3" style="color:#999">No new members this week</td></tr>`;

    const depositRows = newDeposits?.length
      ? newDeposits.map(d => `
          <tr>
            <td>${d.name_first} ${d.name_last}</td>
            <td>${d.email_address}</td>
            <td>${d.package_name}</td>
            <td>${d.guest_count} kids</td>
            <td>R${d.amount_paid}</td>
          </tr>`).join("")
      : `<tr><td colspan="5" style="color:#999">No party deposits this week</td></tr>`;

    const failedRows = failedPayments?.length
      ? failedPayments.map(f => `
          <tr style="color:#c0392b">
            <td>${f.name_first} ${f.name_last}</td>
            <td>${f.email_address}</td>
            <td>${f.item_name}</td>
            <td>R${f.amount_gross}</td>
          </tr>`).join("")
      : `<tr><td colspan="4" style="color:#999">No failed payments this week</td></tr>`;

    const weekLabel = now.toLocaleDateString("en-ZA", {
      day: "numeric", month: "long", year: "numeric",
    });

    await resend.emails.send({
      from: "onboarding@resend.dev", // replace with your verified domain
      to: process.env.NOTIFY_EMAIL!,
      subject: `DareGlow Weekly Summary — ${weekLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:2rem">
          <h1 style="color:#c9a96e">DareGlow Weekly Summary</h1>
          <p style="color:#666">Week ending ${weekLabel}</p>

          <h2>📊 Overview</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:2rem">
            <tr>
              <td style="padding:0.75rem;background:#f9f9f9;border-radius:8px;text-align:center">
                <div style="font-size:2rem;font-weight:bold">${totalActive ?? 0}</div>
                <div style="color:#666;font-size:0.85rem">Total Active Members</div>
              </td>
              <td style="width:1rem"></td>
              <td style="padding:0.75rem;background:#f9f9f9;border-radius:8px;text-align:center">
                <div style="font-size:2rem;font-weight:bold">${newMembers?.length ?? 0}</div>
                <div style="color:#666;font-size:0.85rem">New Members This Week</div>
              </td>
              <td style="width:1rem"></td>
              <td style="padding:0.75rem;background:#f9f9f9;border-radius:8px;text-align:center">
                <div style="font-size:2rem;font-weight:bold">${newDeposits?.length ?? 0}</div>
                <div style="color:#666;font-size:0.85rem">Party Deposits This Week</div>
              </td>
            </tr>
          </table>

          <h2>✨ New Members</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:2rem">
            <thead>
              <tr style="background:#f0f0f0;text-align:left">
                <th style="padding:0.5rem">Name</th>
                <th style="padding:0.5rem">Email</th>
                <th style="padding:0.5rem">Membership</th>
              </tr>
            </thead>
            <tbody>${memberRows}</tbody>
          </table>

          <h2>🎉 Party Deposits</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:2rem">
            <thead>
              <tr style="background:#f0f0f0;text-align:left">
                <th style="padding:0.5rem">Name</th>
                <th style="padding:0.5rem">Email</th>
                <th style="padding:0.5rem">Package</th>
                <th style="padding:0.5rem">Guests</th>
                <th style="padding:0.5rem">Amount</th>
              </tr>
            </thead>
            <tbody>${depositRows}</tbody>
          </table>

          ${failedPayments?.length ? `
          <h2 style="color:#c0392b">⚠️ Failed Payments — Follow Up</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:2rem">
            <thead>
              <tr style="background:#fff0f0;text-align:left">
                <th style="padding:0.5rem">Name</th>
                <th style="padding:0.5rem">Email</th>
                <th style="padding:0.5rem">Item</th>
                <th style="padding:0.5rem">Amount</th>
              </tr>
            </thead>
            <tbody>${failedRows}</tbody>
          </table>` : ""}

          <p style="color:#999;font-size:0.8rem;margin-top:2rem">
            Sent automatically every Monday at 8am — DareGlow Club
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, sent: weekLabel });
  } catch (err) {
    console.error("[cron/weekly-summary]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}