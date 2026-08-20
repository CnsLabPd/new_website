import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"
import { sendEmail, emailConfigured, escapeHtml } from "@/lib/email"

export const runtime = "nodejs"

const MAX_CV_BYTES = 5 * 1024 * 1024 // 5 MB

function siteOrigin(request: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const raw = form.get("payload")
    if (typeof raw !== "string") {
      return NextResponse.json({ error: "Missing payload." }, { status: 400 })
    }

    let payload: any
    try {
      payload = JSON.parse(raw)
    } catch {
      return NextResponse.json({ error: "Malformed payload." }, { status: 400 })
    }

    const contact = payload.contact || {}
    const name = String(contact.name || "").trim()
    const email = String(contact.email || "").trim()
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: "A name and valid email are required." }, { status: 400 })
    }

    const supabase = createAdminClient()

    // 1) Insert the submission
    const { data: inserted, error: insertError } = await supabase
      .from("advisory_submissions")
      .insert({
        track: payload.track ?? null,
        category: payload.category ?? null,
        suggested_programs: payload.suggestedPrograms ?? [],
        name,
        email,
        phone: contact.phone || null,
        affiliation: contact.affiliation || null,
        link: contact.link || null,
        answers: payload.answers ?? {},
        selections: payload.selections ?? {},
        texts: payload.texts ?? {},
        brief: payload.brief ?? null,
      })
      .select("id, thread_token")
      .single()

    if (insertError || !inserted) {
      console.error("advisory insert error", insertError)
      return NextResponse.json({ error: "Could not save your request." }, { status: 500 })
    }

    const id = inserted.id as string
    const threadUrl = `${siteOrigin(request)}/advisory/thread/${inserted.thread_token}`

    // 2) Optional CV upload → private bucket
    const cv = form.get("cv")
    if (cv && cv instanceof File && cv.size > 0) {
      if (cv.size > MAX_CV_BYTES) {
        // Not fatal — the submission is saved; just skip the oversized file.
        console.warn("advisory CV too large, skipped:", cv.size)
      } else {
        const safeName = cv.name.replace(/[^a-zA-Z0-9._-]/g, "_")
        const path = `${id}/${safeName}`
        const bytes = Buffer.from(await cv.arrayBuffer())
        const { error: uploadError } = await supabase.storage
          .from("advisory-cvs")
          .upload(path, bytes, { contentType: cv.type || "application/octet-stream", upsert: true })
        if (uploadError) {
          console.error("advisory CV upload error", uploadError)
        } else {
          await supabase.from("advisory_submissions").update({ cv_path: path }).eq("id", id)
        }
      }
    }

    // 3) Confirmation email to the visitor with their private conversation link
    //    (best-effort; never blocks the submission)
    if (emailConfigured()) {
      const snippet = String(payload.brief || "").replace(/\s+/g, " ").trim().slice(0, 140)
      await sendEmail({
        to: email,
        subject: "We received your Neurogati advisory request",
        html: `
          <div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#14213A">
            <p>Hi ${escapeHtml(name)},</p>
            <p>Thanks for writing to Neurogati Advisory. We've received your request and will send a written response within <b>three to five working days</b>.</p>
            <p>You can follow the conversation — and reply to us anytime — at your private link:<br>
              <a href="${threadUrl}" style="color:#1c82c2">${threadUrl}</a>
            </p>
            <p style="color:#555;font-size:13px">Keep this link — it's unique to your request. Anyone with the link can view this conversation.</p>
            <p style="margin-top:24px;color:#555">— The Neurogati Advisory team</p>
          </div>
        `,
      }).catch((e) => console.error("advisory visitor confirmation email failed", e))
    }

    // 4) Notify the admin (best-effort; never blocks the submission)
    if (emailConfigured() && process.env.ADVISORY_NOTIFY_EMAIL) {
      const brief = String(payload.brief || "")
      await sendEmail({
        to: process.env.ADVISORY_NOTIFY_EMAIL,
        replyTo: email,
        subject: `New advisory request — ${name}`,
        html: `
          <h2 style="font-family:sans-serif">New advisory request</h2>
          <p style="font-family:sans-serif"><b>${escapeHtml(name)}</b> &lt;${escapeHtml(email)}&gt;${contact.affiliation ? ` · ${escapeHtml(String(contact.affiliation))}` : ""}</p>
          <pre style="white-space:pre-wrap;font-family:monospace;font-size:13px;background:#f6f8fa;padding:14px;border-radius:8px">${escapeHtml(brief)}</pre>
          <p style="font-family:sans-serif;color:#555">View and reply in the advisory dashboard.</p>
        `,
      }).catch((e) => console.error("advisory notify email failed", e))
    }

    return NextResponse.json({ ok: true, id, threadUrl })
  } catch (e: any) {
    console.error("advisory submit fatal", e)
    return NextResponse.json({ error: "Server error." }, { status: 500 })
  }
}
