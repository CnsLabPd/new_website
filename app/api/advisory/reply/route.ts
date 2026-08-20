import { NextRequest, NextResponse } from "next/server"
import { createAdminClient, isAdminKeyValid } from "@/lib/supabase-admin"
import { sendEmail, emailConfigured, escapeHtml } from "@/lib/email"

export const runtime = "nodejs"

function siteOrigin(request: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin
}

// Build a short "what this is about" line from the submission's own words.
function contextLine(row: any): string {
  const texts = row.texts && typeof row.texts === "object" ? Object.values(row.texts) : []
  const firstText = texts.find((t) => typeof t === "string" && (t as string).trim().length > 0) as string | undefined
  const snippet = (firstText || row.brief || "").toString().replace(/\s+/g, " ").trim()
  if (!snippet) return "your advisory request"
  return `your advisory request — “${snippet.slice(0, 140)}${snippet.length > 140 ? "…" : ""}”`
}

// POST /api/advisory/reply  — admin-only.
// Body: { id, message }  → logs an admin message, emails the visitor with a thread link.
//   or: { id, status }   → updates status.
//   or: { id, notes }    → saves private admin notes.
export async function POST(request: NextRequest) {
  const key = request.headers.get("x-admin-key")
  if (!isAdminKeyValid(key)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Malformed body." }, { status: 400 })
  }

  const { id, message, status, notes } = body || {}
  if (!id) return NextResponse.json({ error: "Missing submission id." }, { status: 400 })

  const supabase = createAdminClient()

  // Status-only or notes-only update
  if (!message && (status || typeof notes === "string")) {
    const patch: any = { updated_at: new Date().toISOString() }
    if (status && ["new", "in_progress", "replied"].includes(status)) patch.status = status
    if (typeof notes === "string") patch.admin_notes = notes
    const { error } = await supabase.from("advisory_submissions").update(patch).eq("id", id)
    if (error) return NextResponse.json({ error: "Update failed." }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  // Reply flow — requires a message
  if (!message || String(message).trim().length < 2) {
    return NextResponse.json({ error: "A reply message is required." }, { status: 400 })
  }

  const { data: row, error: rowError } = await supabase
    .from("advisory_submissions")
    .select("email, name, texts, brief, thread_token")
    .eq("id", id)
    .single()
  if (rowError || !row) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 })
  }

  if (!emailConfigured()) {
    return NextResponse.json(
      { error: "Email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL." },
      { status: 503 }
    )
  }

  // 1) Log the admin message
  const { error: msgError } = await supabase.from("advisory_messages").insert({
    submission_id: id,
    sender: "admin",
    body: String(message),
  })
  if (msgError) {
    console.error("advisory message insert error", msgError)
    return NextResponse.json({ error: "Could not save the message." }, { status: 500 })
  }

  // 2) Email the visitor, with context and their private thread link
  const threadUrl = `${siteOrigin(request)}/advisory/thread/${row.thread_token}`
  const html = `
    <div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#14213A">
      <p>Hi ${escapeHtml(row.name || "there")},</p>
      <p style="color:#555">This is regarding ${escapeHtml(contextLine(row))}.</p>
      <div style="white-space:pre-wrap;border-left:3px solid #1c82c2;padding-left:14px;margin:16px 0">${escapeHtml(String(message))}</div>
      <p>You can read the full conversation and reply here:<br>
        <a href="${threadUrl}" style="color:#1c82c2">${threadUrl}</a>
      </p>
      <p style="margin-top:24px;color:#555">— The Neurogati Advisory team</p>
    </div>
  `
  const sent = await sendEmail({ to: row.email, subject: "Re: Your Neurogati advisory request", html })
  if (!sent.ok) {
    return NextResponse.json({ error: sent.error || "Could not send the reply." }, { status: 502 })
  }

  // 3) Mark the thread as answered (no longer awaiting the admin)
  const { error: updError } = await supabase
    .from("advisory_submissions")
    .update({
      reply_body: String(message),
      status: "replied",
      awaiting_admin: false,
      replied_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
  if (updError) console.error("advisory reply update error", updError)

  return NextResponse.json({ ok: true })
}
