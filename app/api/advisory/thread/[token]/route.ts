import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"
import { sendEmail, emailConfigured, escapeHtml } from "@/lib/email"

export const runtime = "nodejs"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function siteOrigin(request: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin
}

async function loadByToken(token: string) {
  const supabase = createAdminClient()
  const { data: sub } = await supabase
    .from("advisory_submissions")
    .select("id, name, track, texts, brief, created_at")
    .eq("thread_token", token)
    .single()
  if (!sub) return null
  const { data: messages } = await supabase
    .from("advisory_messages")
    .select("sender, body, created_at")
    .eq("submission_id", sub.id)
    .order("created_at", { ascending: true })
  // Opening request text, in the visitor's own words.
  const texts = sub.texts && typeof sub.texts === "object" ? Object.values(sub.texts) : []
  const opening = (texts.find((t) => typeof t === "string" && (t as string).trim()) as string | undefined) || ""
  return { sub, messages: messages || [], opening }
}

// GET /api/advisory/thread/[token]  — public (token IS the credential)
export async function GET(request: NextRequest, { params }: { params: { token: string } }) {
  const token = params.token
  if (!UUID_RE.test(token)) return NextResponse.json({ error: "Not found." }, { status: 404 })

  const loaded = await loadByToken(token)
  if (!loaded) return NextResponse.json({ error: "Not found." }, { status: 404 })

  return NextResponse.json({
    name: loaded.sub.name,
    track: loaded.sub.track,
    opening: loaded.opening,
    createdAt: loaded.sub.created_at,
    messages: loaded.messages,
  })
}

// POST /api/advisory/thread/[token]  — public. Visitor posts a reply.
export async function POST(request: NextRequest, { params }: { params: { token: string } }) {
  const token = params.token
  if (!UUID_RE.test(token)) return NextResponse.json({ error: "Not found." }, { status: 404 })

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Malformed body." }, { status: 400 })
  }
  const message = String(body?.message || "").trim()
  if (message.length < 2) return NextResponse.json({ error: "Please write a message." }, { status: 400 })
  if (message.length > 5000) return NextResponse.json({ error: "Message is too long." }, { status: 400 })

  const supabase = createAdminClient()
  const { data: sub } = await supabase
    .from("advisory_submissions")
    .select("id, name, email")
    .eq("thread_token", token)
    .single()
  if (!sub) return NextResponse.json({ error: "Not found." }, { status: 404 })

  const { error: msgError } = await supabase.from("advisory_messages").insert({
    submission_id: sub.id,
    sender: "visitor",
    body: message,
  })
  if (msgError) {
    console.error("visitor message insert error", msgError)
    return NextResponse.json({ error: "Could not send your message." }, { status: 500 })
  }

  await supabase
    .from("advisory_submissions")
    .update({ awaiting_admin: true, status: "in_progress", updated_at: new Date().toISOString() })
    .eq("id", sub.id)

  // Notify the admin (best-effort)
  if (emailConfigured() && process.env.ADVISORY_NOTIFY_EMAIL) {
    const adminUrl = `${siteOrigin(request)}/admin/advisory`
    await sendEmail({
      to: process.env.ADVISORY_NOTIFY_EMAIL,
      replyTo: sub.email,
      subject: `New reply from ${sub.name} — advisory`,
      html: `
        <div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#14213A">
          <p><b>${escapeHtml(sub.name)}</b> &lt;${escapeHtml(sub.email)}&gt; replied to their advisory request:</p>
          <div style="white-space:pre-wrap;border-left:3px solid #1c82c2;padding-left:14px;margin:14px 0">${escapeHtml(message)}</div>
          <p><a href="${adminUrl}" style="color:#1c82c2">Open the advisory console</a> to reply.</p>
        </div>
      `,
    }).catch((e) => console.error("admin notify (visitor reply) failed", e))
  }

  return NextResponse.json({ ok: true })
}
