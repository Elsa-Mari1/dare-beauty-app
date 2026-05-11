import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

function isAuthorized(req: NextRequest): boolean {
  return req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Tiny query just to keep Supabase active
    const { error } = await supabase
      .from("members")
      .select("id")
      .limit(1);

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      message: "Supabase kept alive",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[cron/keep-alive]", err);

    return NextResponse.json(
      { error: "Keep alive failed" },
      { status: 500 }
    );
  }
}