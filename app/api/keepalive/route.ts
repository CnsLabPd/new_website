import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Keeps the Supabase project from auto-pausing.
 *
 * Free-tier Supabase projects pause after about a week without activity, and a
 * paused project stops resolving entirely — which takes down advisory
 * submissions and the admin console until someone restores it by hand. A cheap
 * scheduled read counts as activity and resets that timer.
 *
 * Run daily via the cron entry in vercel.json. Deliberately returns no data.
 */
export async function GET() {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase
      .from("advisory_submissions")
      .select("id", { count: "exact", head: true })

    if (error) {
      console.error("keepalive query failed", error)
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, checkedAt: new Date().toISOString() })
  } catch (e: any) {
    console.error("keepalive failed", e)
    return NextResponse.json(
      { ok: false, error: e?.message || String(e) },
      { status: 500 }
    )
  }
}
