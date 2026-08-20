import { NextRequest, NextResponse } from "next/server"
import { createAdminClient, isAdminKeyValid } from "@/lib/supabase-admin"

export const runtime = "nodejs"

// GET /api/advisory/list  — admin-only. Returns submissions with their message
// threads and signed CV URLs. ?filter=awaiting|answered narrows the list.
export async function GET(request: NextRequest) {
  const key = request.headers.get("x-admin-key")
  if (!isAdminKeyValid(key)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createAdminClient()
  const filter = request.nextUrl.searchParams.get("filter")

  let query = supabase.from("advisory_submissions").select("*").order("updated_at", { ascending: false })
  if (filter === "awaiting") query = query.eq("awaiting_admin", true)
  if (filter === "answered") query = query.eq("awaiting_admin", false)

  const { data, error } = await query
  if (error) {
    console.error("advisory list error", error)
    return NextResponse.json({ error: "Could not load submissions." }, { status: 500 })
  }

  const submissions = data || []
  const ids = submissions.map((s: any) => s.id)

  // Fetch all messages for these submissions in one query, then group.
  const messagesBySub: Record<string, any[]> = {}
  if (ids.length) {
    const { data: msgs } = await supabase
      .from("advisory_messages")
      .select("submission_id, sender, body, created_at")
      .in("submission_id", ids)
      .order("created_at", { ascending: true })
    for (const m of msgs || []) {
      ;(messagesBySub[m.submission_id] ||= []).push(m)
    }
  }

  const rows = await Promise.all(
    submissions.map(async (row: any) => {
      let cv_url: string | null = null
      if (row.cv_path) {
        const { data: signed } = await supabase.storage
          .from("advisory-cvs")
          .createSignedUrl(row.cv_path, 60 * 30)
        cv_url = signed?.signedUrl || null
      }
      return { ...row, cv_url, messages: messagesBySub[row.id] || [] }
    })
  )

  const awaitingCount = submissions.filter((s: any) => s.awaiting_admin).length

  return NextResponse.json({ submissions: rows, awaitingCount })
}
