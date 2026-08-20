"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Loader2, Send, MessageSquare, ArrowLeft, ChevronDown, Brain, Clock } from "lucide-react"
import Link from "next/link"

const POLL_MS = 30_000

interface Message {
  sender: "admin" | "visitor"
  body: string
  created_at: string
}

interface Thread {
  name: string
  track: string | null
  opening: string
  createdAt: string
  messages: Message[]
}

export default function AdvisoryThreadPage({ params }: { params: { token: string } }) {
  const { token } = params
  const [thread, setThread] = useState<Thread | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [showRequest, setShowRequest] = useState(false)
  const [reply, setReply] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  const load = useCallback(async (silent = false) => {
    try {
      const res = await fetch(`/api/advisory/thread/${token}`)
      if (res.status === 404) { setNotFound(true); return }
      if (!res.ok) throw new Error()
      setThread(await res.json())
    } catch {
      if (!silent) setError("Could not load this conversation.")
    } finally {
      setLoading(false)
    }
  }, [token])

  // Initial load + silent polling so the team's replies appear without a refresh.
  useEffect(() => {
    load()
    const t = setInterval(() => load(true), POLL_MS)
    return () => clearInterval(t)
  }, [load])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [thread?.messages.length])

  async function send() {
    const msg = reply.trim()
    if (msg.length < 2) return
    setSending(true)
    setError("")
    try {
      const res = await fetch(`/api/advisory/thread/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(j.error || "Could not send.")
      setReply("")
      await load(true)
    } catch (e: any) {
      setError(e.message || "Could not send your message.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* slim hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/30 pt-32 pb-8 px-4">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-[38rem] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-2xl relative z-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-400 mb-3">Neurogati · Advisory</p>
          <h1 className="text-2xl md:text-4xl font-black tracking-tighter bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent py-1">
            Your conversation with Neurogati
          </h1>
        </div>
      </section>

      <section className="container mx-auto max-w-2xl px-3 sm:px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-24 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading…
          </div>
        ) : notFound ? (
          <div className="rounded-2xl border-2 border-dashed border-border py-20 text-center">
            <MessageSquare className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
            <h2 className="text-xl font-black tracking-tight">Conversation not found</h2>
            <p className="mt-2 text-muted-foreground">This link may be incorrect or expired.</p>
            <Link href="/advisory" className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-border px-5 py-2 text-sm font-bold hover:bg-muted">
              <ArrowLeft className="h-4 w-4" /> Start a new request
            </Link>
          </div>
        ) : thread ? (
          <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-border bg-card shadow-xl shadow-black/10" style={{ height: "min(72vh, 720px)" }}>
            {/* chat header */}
            <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white">
                <Brain className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-black tracking-tight leading-tight">Neurogati Advisory</p>
                <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> Replies within 3–5 working days
                </p>
              </div>
              <button
                onClick={() => setShowRequest(!showRequest)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[12px] font-bold text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Your request
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showRequest ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* collapsible original request */}
            {showRequest && (
              <div className="border-b border-border bg-muted/20 px-4 py-3">
                <p className="text-[10.5px] font-black uppercase tracking-wider text-muted-foreground">
                  Your original request · {new Date(thread.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p className="mt-1.5 max-h-40 overflow-y-auto whitespace-pre-wrap text-[13.5px] leading-relaxed text-foreground/85">
                  {thread.opening || "(No description was provided.)"}
                </p>
              </div>
            )}

            {/* messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {/* opening request as first bubble */}
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-3 text-white">
                  <p className="mb-1 text-[10.5px] font-bold uppercase tracking-wider text-white/70">You · original request</p>
                  <p className="whitespace-pre-wrap text-[14.5px] leading-relaxed">{thread.opening || "(No description provided.)"}</p>
                  <p className="mt-1.5 text-right text-[11px] text-white/60">{new Date(thread.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {thread.messages.length === 0 && (
                <p className="py-6 text-center text-[13px] text-muted-foreground">
                  Our written response will appear here — you'll also get it by email.
                </p>
              )}

              {thread.messages.map((m, i) => {
                const mine = m.sender === "visitor"
                return (
                  <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${mine ? "rounded-tr-sm bg-blue-600 text-white" : "rounded-tl-sm border border-border bg-background"}`}>
                      {!mine && (
                        <p className="mb-1 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-teal-400">
                          <Brain className="h-3 w-3" /> Neurogati
                        </p>
                      )}
                      <p className={`whitespace-pre-wrap text-[14.5px] leading-relaxed ${mine ? "text-white" : "text-foreground/90"}`}>{m.body}</p>
                      <p className={`mt-1.5 text-right text-[11px] ${mine ? "text-white/60" : "text-muted-foreground"}`}>
                        {new Date(m.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
              })}
              <div ref={bottomRef} />
            </div>

            {/* composer */}
            <div className="border-t border-border bg-muted/30 p-3">
              {error && <p className="mb-1.5 px-1 text-[12.5px] text-red-400">{error}</p>}
              <div className="flex items-end gap-2">
                <textarea
                  rows={2}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send()
                  }}
                  placeholder="Write a reply to the Neurogati team…"
                  className="flex-1 resize-none rounded-2xl border-2 border-border bg-background px-4 py-2.5 text-[14px] leading-relaxed outline-none focus:border-blue-500"
                />
                <button
                  onClick={send}
                  disabled={sending || reply.trim().length < 2}
                  title="Send (Ctrl+Enter)"
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-500 text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-1.5 px-1 text-[11.5px] text-muted-foreground">
                The team is notified by email when you send a message.
              </p>
            </div>
          </div>
        ) : (
          <p className="py-24 text-center text-muted-foreground">{error || "Something went wrong."}</p>
        )}
      </section>
    </div>
  )
}
