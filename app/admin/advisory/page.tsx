"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Loader2, Lock, RefreshCw, FileText, Send, Inbox, CheckCircle2, AlertCircle,
  Search, ChevronLeft, ChevronDown, X, User, Mail, Phone, Building2, Link2,
  ClipboardList, GraduationCap, ExternalLink,
} from "lucide-react"
import { NODES, TRACKS, PROGRAMS, type TrackCode } from "@/lib/advisory-data"

const KEY_STORAGE = "advisory-admin-key"
const POLL_MS = 30_000

interface Message {
  sender: "admin" | "visitor"
  body: string
  created_at: string
}

interface Submission {
  id: string
  created_at: string
  updated_at: string
  track: string | null
  category: string | null
  suggested_programs: string[] | null
  name: string
  email: string
  phone: string | null
  affiliation: string | null
  link: string | null
  brief: string | null
  answers: Record<string, string> | null
  selections: Record<string, string[]> | null
  texts: Record<string, string> | null
  cv_url: string | null
  status: string
  awaiting_admin: boolean
  admin_notes: string | null
  messages: Message[]
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const initials = (name: string) =>
  name.split(/\s+/).map((n) => n[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "?"

function openingText(s: Submission): string {
  const vals = s.texts ? Object.values(s.texts) : []
  const first = vals.find((t) => typeof t === "string" && t.trim())
  return (first as string) || s.brief || "(No description provided.)"
}

// Messages the visitor sent after the admin's last reply = "unread"
function unreadCount(s: Submission): number {
  let count = 0
  for (let i = s.messages.length - 1; i >= 0; i--) {
    if (s.messages[i].sender === "visitor") count++
    else break
  }
  // A brand-new submission with no admin reply yet counts as 1 unread (the request itself)
  if (count === 0 && s.awaiting_admin && !s.messages.some((m) => m.sender === "admin")) return 1
  return count
}

function lastActivity(s: Submission): { preview: string; when: string } {
  const last = s.messages[s.messages.length - 1]
  const text = last ? last.body : openingText(s)
  const ts = last ? last.created_at : s.created_at
  const d = new Date(ts)
  const today = new Date()
  const sameDay = d.toDateString() === today.toDateString()
  return {
    preview: (last && last.sender === "admin" ? "You: " : "") + text.replace(/\s+/g, " ").slice(0, 60),
    when: sameDay
      ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : d.toLocaleDateString([], { day: "2-digit", month: "short" }),
  }
}

const qLabel = (nodeId: string) => NODES[nodeId]?.short || nodeId
const qTitle = (nodeId: string) => NODES[nodeId]?.title || nodeId
const optionLabel = (nodeId: string, key: string) =>
  ((NODES[nodeId]?.options as any[]) || []).find((o) => o.key === key)?.label || key
const programName = (id: string) => PROGRAMS.find((p) => p.id === id)?.name || id

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AdvisoryAdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null)
  const [keyInput, setKeyInput] = useState("")
  const [subs, setSubs] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<"all" | "awaiting" | "answered">("all")
  const [search, setSearch] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(KEY_STORAGE) : null
    if (saved) setAdminKey(saved)
  }, [])

  const load = useCallback(async (key: string, silent = false) => {
    if (!silent) setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/advisory/list", { headers: { "x-admin-key": key } })
      if (res.status === 401) {
        setError("That key was rejected.")
        setAdminKey(null)
        localStorage.removeItem(KEY_STORAGE)
        return
      }
      if (!res.ok) throw new Error("Could not load conversations.")
      const j = await res.json()
      setSubs(j.submissions || [])
    } catch (e: any) {
      if (!silent) setError(e.message || "Failed to load.")
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  // Initial load + silent polling every 30s so new visitor replies appear on their own.
  useEffect(() => {
    if (!adminKey) return
    load(adminKey)
    const t = setInterval(() => load(adminKey, true), POLL_MS)
    return () => clearInterval(t)
  }, [adminKey, load])

  function unlock() {
    const k = keyInput.trim()
    if (!k) return
    localStorage.setItem(KEY_STORAGE, k)
    setAdminKey(k)
  }

  const filtered = useMemo(() => {
    let list = subs
    if (filter === "awaiting") list = list.filter((s) => s.awaiting_admin)
    if (filter === "answered") list = list.filter((s) => !s.awaiting_admin)
    const q = search.trim().toLowerCase()
    if (q) list = list.filter((s) =>
      s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || (s.affiliation || "").toLowerCase().includes(q)
    )
    return list
  }, [subs, filter, search])

  const selected = subs.find((s) => s.id === selectedId) || null
  const awaitingTotal = subs.filter((s) => s.awaiting_admin).length

  // ── Locked screen ─────────────────────────────────────────────
  if (!adminKey) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border-2 border-border bg-card p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-black tracking-tight">Advisory Console</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter the admin key to view conversations.</p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && unlock()}
            placeholder="Admin key"
            className="mt-5 w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-center outline-none focus:border-blue-500"
          />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <button onClick={unlock} className="mt-4 w-full rounded-full bg-blue-600 py-2.5 font-bold text-white hover:bg-blue-500">
            Unlock
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-background text-foreground flex overflow-hidden">
      {/* ═══════════ LEFT: chat list ═══════════ */}
      <aside className={`${selected ? "hidden md:flex" : "flex"} w-full md:w-[340px] lg:w-[380px] flex-shrink-0 flex-col border-r border-border bg-card/40`}>
        {/* header */}
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-lg font-black tracking-tight">Advisory Chats</h1>
            <button
              onClick={() => load(adminKey)}
              title="Refresh"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
          <p className={`mt-1 text-[13px] font-bold ${awaitingTotal ? "text-amber-400" : "text-emerald-400"}`}>
            {awaitingTotal ? `${awaitingTotal} waiting for your reply` : "All caught up"}
          </p>

          {/* search */}
          <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* filters */}
          <div className="mt-3 flex gap-1.5">
            {([
              { key: "all", label: "All" },
              { key: "awaiting", label: "Unread" },
              { key: "answered", label: "Answered" },
            ] as const).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-3.5 py-1 text-[12.5px] font-bold transition-colors ${
                  filter === f.key ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* list */}
        <div className="flex-1 overflow-y-auto">
          {error && <p className="p-4 text-sm text-red-400">{error}</p>}
          {loading && subs.length === 0 ? (
            <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              <Inbox className="mx-auto mb-2 h-8 w-8 opacity-50" />
              No conversations here.
            </div>
          ) : (
            filtered.map((s) => {
              const unread = unreadCount(s)
              const { preview, when } = lastActivity(s)
              const active = s.id === selectedId
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`flex w-full items-center gap-3 border-b border-border/60 px-4 py-3.5 text-left transition-colors ${
                    active ? "bg-blue-500/10" : "hover:bg-muted/40"
                  }`}
                >
                  {/* avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 font-black text-white">
                      {initials(s.name)}
                    </div>
                    {s.awaiting_admin && (
                      <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-amber-400" />
                    )}
                  </div>
                  {/* name + preview */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className={`truncate text-[14.5px] tracking-tight ${unread ? "font-black" : "font-bold"}`}>{s.name}</p>
                      <span className={`flex-shrink-0 text-[11px] ${unread ? "font-bold text-amber-400" : "text-muted-foreground"}`}>{when}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`truncate text-[12.5px] ${unread ? "font-semibold text-foreground/80" : "text-muted-foreground"}`}>
                        {preview}
                      </p>
                      {unread > 0 && (
                        <span className="flex h-[18px] min-w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-amber-500 px-1 text-[10.5px] font-black text-black">
                          {unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </aside>

      {/* ═══════════ RIGHT: conversation ═══════════ */}
      <main className={`${selected ? "flex" : "hidden md:flex"} min-w-0 flex-1 flex-col`}>
        {!selected ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
            <Inbox className="h-12 w-12 opacity-40" />
            <p className="text-sm">Select a conversation to see the profile and chat.</p>
          </div>
        ) : (
          <Conversation
            key={selected.id}
            sub={selected}
            adminKey={adminKey}
            onBack={() => setSelectedId(null)}
            onChanged={() => load(adminKey, true)}
            onOpenPdf={(url) => setPdfUrl(url)}
          />
        )}
      </main>

      {/* ═══════════ PDF viewer modal ═══════════ */}
      {pdfUrl && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-black/80 backdrop-blur-sm p-3 sm:p-6">
          <div className="flex items-center justify-between pb-3">
            <p className="flex items-center gap-2 text-sm font-bold text-white">
              <FileText className="h-4 w-4" /> CV / Resume
            </p>
            <div className="flex items-center gap-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-3.5 py-1.5 text-[13px] font-bold text-white hover:bg-white/10"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Open in new tab
              </a>
              <button
                onClick={() => setPdfUrl(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <iframe src={pdfUrl} className="w-full flex-1 rounded-xl border border-white/20 bg-white" title="CV preview" />
        </div>
      )}
    </div>
  )
}

// ─── Right pane: one conversation ───────────────────────────────────────────

function Conversation({
  sub, adminKey, onBack, onChanged, onOpenPdf,
}: {
  sub: Submission
  adminKey: string
  onBack: () => void
  onChanged: () => void
  onOpenPdf: (url: string) => void
}) {
  const [reply, setReply] = useState("")
  const [notes, setNotes] = useState(sub.admin_notes || "")
  const [busy, setBusy] = useState<"" | "reply" | "notes">("")
  const [msg, setMsg] = useState("")
  const [showProfile, setShowProfile] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [sub.messages.length])

  async function post(body: any, kind: "reply" | "notes") {
    setBusy(kind)
    setMsg("")
    try {
      const res = await fetch("/api/advisory/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ id: sub.id, ...body }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(j.error || "Failed.")
      if (kind === "reply") setReply("")
      setMsg(kind === "reply" ? "Reply sent ✓" : "Notes saved ✓")
      onChanged()
    } catch (e: any) {
      setMsg(e.message || "Failed.")
    } finally {
      setBusy("")
    }
  }

  const track = sub.track && TRACKS[sub.track as TrackCode] ? TRACKS[sub.track as TrackCode] : null

  // Build the intake Q&A in a sensible order: single answers, multi selections, then long texts.
  const answerRows = Object.entries(sub.answers || {}).filter(([id]) => NODES[id]?.kind === "single")
  const selectionRows = Object.entries(sub.selections || {})
  const textRows = Object.entries(sub.texts || {})

  return (
    <>
      {/* header */}
      <div className="flex items-center gap-3 border-b border-border bg-card/60 px-4 py-3">
        <button onClick={onBack} className="md:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 font-black text-white">
          {initials(sub.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-black tracking-tight">{sub.name}</p>
          <p className="truncate text-[12.5px] text-muted-foreground">
            {sub.email}{track ? ` · ${track.name}` : ""}
          </p>
        </div>
        {sub.awaiting_admin ? (
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-1 text-[11px] font-bold text-amber-400">
            <AlertCircle className="h-3.5 w-3.5" /> Needs reply
          </span>
        ) : (
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> Answered
          </span>
        )}
        {sub.cv_url && (
          <button
            onClick={() => onOpenPdf(sub.cv_url!)}
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-1.5 text-[12.5px] font-bold text-white hover:bg-blue-500"
          >
            <FileText className="h-3.5 w-3.5" /> View CV
          </button>
        )}
      </div>

      {/* scrollable middle: profile + chat */}
      <div className="flex-1 overflow-y-auto">
        {/* ── profile & intake ── */}
        <div className="border-b border-border bg-muted/20">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex w-full items-center justify-between px-4 py-2.5 text-left hover:bg-muted/30"
          >
            <span className="flex items-center gap-2 text-[12px] font-black uppercase tracking-wider text-muted-foreground">
              <ClipboardList className="h-4 w-4" /> Profile & what they filled in
            </span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showProfile ? "rotate-180" : ""}`} />
          </button>

          {showProfile && (
            <div className="space-y-4 px-4 pb-4">
              {/* contact row */}
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
                <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-blue-400" /> {sub.email}</span>
                {sub.phone && <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-blue-400" /> {sub.phone}</span>}
                {sub.affiliation && <span className="inline-flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-blue-400" /> {sub.affiliation}</span>}
                {sub.link && (
                  <a href={sub.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-blue-400 hover:underline">
                    <Link2 className="h-3.5 w-3.5" /> Portfolio / link
                  </a>
                )}
                {sub.cv_url && (
                  <button onClick={() => onOpenPdf(sub.cv_url!)} className="inline-flex items-center gap-1.5 text-blue-400 hover:underline">
                    <FileText className="h-3.5 w-3.5" /> View CV
                  </button>
                )}
              </div>

              {/* wizard answers */}
              {(answerRows.length > 0 || selectionRows.length > 0) && (
                <div>
                  <p className="mb-1.5 text-[11px] font-black uppercase tracking-wider text-muted-foreground">Options they selected</p>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {answerRows.map(([id, label]) => (
                      <div key={id} className="rounded-lg border border-border bg-background px-3 py-2">
                        <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">{qLabel(id)}</p>
                        <p className="text-[13.5px] font-semibold">{label}</p>
                      </div>
                    ))}
                    {selectionRows.map(([id, keys]) => (
                      <div key={id} className="rounded-lg border border-border bg-background px-3 py-2 sm:col-span-2">
                        <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">{qLabel(id)}</p>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {(keys || []).map((k) => (
                            <span key={k} className="rounded-full bg-teal-500/15 px-2.5 py-0.5 text-[12px] font-bold text-teal-400">
                              {optionLabel(id, k)}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* their written question(s) */}
              {textRows.length > 0 && (
                <div>
                  <p className="mb-1.5 text-[11px] font-black uppercase tracking-wider text-muted-foreground">The question they raised</p>
                  {textRows.map(([id, text]) => (
                    <div key={id} className="rounded-lg border border-border bg-background px-3 py-2.5">
                      <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">{qTitle(id)}</p>
                      <p className="mt-1 whitespace-pre-wrap text-[13.5px] leading-relaxed text-foreground/90">{text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* suggested programmes */}
              {(sub.suggested_programs || []).length > 0 && (
                <div>
                  <p className="mb-1.5 text-[11px] font-black uppercase tracking-wider text-muted-foreground">Programmes the site suggested to them</p>
                  <div className="flex flex-wrap gap-1.5">
                    {sub.suggested_programs!.map((p) => (
                      <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 px-2.5 py-1 text-[12px] font-bold text-pink-400">
                        <GraduationCap className="h-3.5 w-3.5" /> {programName(p)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* private notes */}
              <div>
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-wider text-muted-foreground">Private notes (only you see this)</p>
                <div className="flex gap-2">
                  <textarea
                    rows={1}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Internal notes…"
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-[13px] outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => post({ notes }, "notes")}
                    disabled={busy !== ""}
                    className="rounded-full border border-border px-4 text-[12.5px] font-bold hover:bg-muted disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── chat thread ── */}
        <div className="space-y-3 p-4">
          {/* original request bubble */}
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3">
              <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <User className="h-3 w-3" /> {sub.name} · original request
              </p>
              <p className="whitespace-pre-wrap text-[14.5px] leading-relaxed text-foreground/90">{openingText(sub)}</p>
              <p className="mt-1.5 text-[11px] text-muted-foreground">{new Date(sub.created_at).toLocaleString()}</p>
            </div>
          </div>

          {sub.messages.map((m, i) => {
            const mine = m.sender === "admin"
            return (
              <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${mine ? "rounded-tr-sm bg-blue-600 text-white" : "rounded-tl-sm border border-border bg-card"}`}>
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
      </div>

      {/* reply box (pinned bottom, WhatsApp-style) */}
      <div className="border-t border-border bg-card/60 p-3">
        {msg && <p className="mb-1.5 px-1 text-[12.5px] text-muted-foreground">{msg}</p>}
        <div className="flex items-end gap-2">
          <textarea
            rows={2}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) post({ message: reply }, "reply")
            }}
            placeholder={`Message ${sub.name.split(" ")[0]}… (emailed to them with their conversation link)`}
            className="flex-1 resize-none rounded-2xl border-2 border-border bg-background px-4 py-2.5 text-[14px] leading-relaxed outline-none focus:border-blue-500"
          />
          <button
            onClick={() => post({ message: reply }, "reply")}
            disabled={busy !== "" || reply.trim().length < 2}
            title="Send (Ctrl+Enter)"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-500 text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {busy === "reply" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </>
  )
}
