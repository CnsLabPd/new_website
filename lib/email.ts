// Minimal Resend client over the REST API (no SDK dependency).
// Requires RESEND_API_KEY and RESEND_FROM_EMAIL in the environment.

interface SendArgs {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export function emailConfigured(): boolean {
  return !!(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL)
}

export async function sendEmail({ to, subject, html, replyTo }: SendArgs): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) {
    return { ok: false, error: "Email is not configured (RESEND_API_KEY / RESEND_FROM_EMAIL missing)." }
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => "")
      return { ok: false, error: `Resend responded ${res.status}: ${detail}` }
    }
    return { ok: true }
  } catch (e: any) {
    return { ok: false, error: e?.message || "Failed to reach Resend." }
  }
}

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
