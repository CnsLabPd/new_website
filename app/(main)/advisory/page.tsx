"use client"

import { useMemo, useRef, useState } from "react"
import {
  GraduationCap, Code2, Dna, Stethoscope, Brain, FlaskConical, Target, Rocket,
  Cpu, BarChart3, Activity, Layers, Sigma, FolderOpen, Compass, Route as RouteIcon,
  Check, PenLine, Clock, Building2, Handshake, FileText, Mail, Users, ArrowRight,
  ChevronDown, Loader2, CheckCircle2, type LucideIcon,
} from "lucide-react"
import {
  CONTACT_EMAIL, WORKSHOP_EMAIL, PROGRAMS_URL, WORD_LIMIT, WORD_MIN,
  TRACKS, INPUTS, OPERATIONS, DESTINATIONS, PROG_TOPICS, SIDE_TO_TOPIC,
  LOAD_FROM_DAILY, matchPrograms, NODES, ROUTES, HOW_IT_WORKS, FACTS, STAGES, FAQS,
  countWords, validEmail, type TrackCode, type GraphNode, type NodeOption,
} from "@/lib/advisory-data"

// ─── Icon resolution (string keys from the data → lucide icons) ─────────────
const ICONS: Record<string, LucideIcon> = {
  cap: GraduationCap, code: Code2, dna: Dna, stetho: Stethoscope, brain: Brain,
  flask: FlaskConical, target: Target, rocket: Rocket, chip: Cpu, chart: BarChart3,
  signal: Activity, layers: Layers, sigma: Sigma, folder: FolderOpen, compass: Compass,
  route: RouteIcon, check: Check, pen: PenLine, clock: Clock, hospital: Building2,
  handshake: Handshake, doc: FileText, user: Users, mail: Mail, people: Users,
}
function Ic({ name, className }: { name: string; className?: string }) {
  const I = ICONS[name] || Brain
  return <I className={className ?? "h-5 w-5"} />
}

// ─── Track → Tailwind accent classes ────────────────────────────────────────
const TRACK_TW: Record<string, { text: string; border: string; bg: string; bar: string; solid: string }> = {
  blue: { text: "text-blue-400", border: "border-blue-500/40", bg: "bg-blue-500/[0.05]", bar: "bg-blue-500", solid: "bg-blue-600 hover:bg-blue-500" },
  teal: { text: "text-teal-400", border: "border-teal-500/40", bg: "bg-teal-500/[0.05]", bar: "bg-teal-500", solid: "bg-teal-600 hover:bg-teal-500" },
  amber: { text: "text-amber-400", border: "border-amber-500/40", bg: "bg-amber-500/[0.05]", bar: "bg-amber-500", solid: "bg-amber-600 hover:bg-amber-500" },
  violet: { text: "text-violet-400", border: "border-violet-500/40", bg: "bg-violet-500/[0.05]", bar: "bg-violet-500", solid: "bg-violet-600 hover:bg-violet-500" },
  cyan: { text: "text-cyan-400", border: "border-cyan-500/40", bg: "bg-cyan-500/[0.05]", bar: "bg-cyan-500", solid: "bg-cyan-600 hover:bg-cyan-500" },
  pink: { text: "text-pink-400", border: "border-pink-500/40", bg: "bg-pink-500/[0.05]", bar: "bg-pink-500", solid: "bg-pink-600 hover:bg-pink-500" },
}
const tw = (track: TrackCode | null) => TRACK_TW[track ? TRACKS[track].color : "blue"]

const GRADIENT_BTN =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-500 px-8 py-3 text-base font-semibold text-white transition-transform hover:scale-[1.03] disabled:opacity-50 disabled:hover:scale-100"
const GHOST_BTN =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-border px-6 py-3 text-base font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"

interface AnswerRecord {
  short: string
  label: string
  key?: string
  cat?: string
  track?: TrackCode
  dest?: string[]
  goal?: string
}

export default function AdvisoryPage() {
  const [trail, setTrail] = useState<string[]>(["start"])
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({})
  const [texts, setTexts] = useState<Record<string, string>>({})
  const [multi, setMulti] = useState<Record<string, string[]>>({})
  const [contact, setContact] = useState({ name: "", email: "", phone: "", affiliation: "", link: "" })
  const [cvName, setCvName] = useState("")
  const [touched, setTouched] = useState(false)
  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const current = trail[trail.length - 1]
  const node = NODES[current] as GraphNode | undefined
  const atRoute = current === "route"

  const cat = answers.start?.cat || null
  const track = useMemo<TrackCode | null>(() => {
    const hit = Object.values(answers).find((a) => a.track)
    return hit ? (hit.track as TrackCode) : null
  }, [answers])

  const stageIndex = atRoute ? 3 : node ? node.stage : 0
  const answeredCount = trail.length - 1

  const matches = useMemo(() => {
    const goal = Object.values(answers).find((a) => a.goal)?.goal || null
    const topics = new Set<string>()
    Object.entries(multi).forEach(([nodeId, keys]) => {
      keys.forEach((k) => topics.add(nodeId === "prog_topics" ? k : SIDE_TO_TOPIC[k] || k))
    })
    const level = answers.prog_level?.key || null
    const loadTag = answers.prog_load?.key || LOAD_FROM_DAILY[answers.time?.key || ""] || null
    return matchPrograms({ cat, goal, topics: [...topics], level, loadTag })
  }, [answers, multi, cat])

  const emphasised = useMemo(() => {
    const set = new Set<string>()
    Object.values(answers).forEach((a) => (a.dest || []).forEach((d) => set.add(d)))
    return set
  }, [answers])

  function advance(nextId: string, record: AnswerRecord | null) {
    if (record) setAnswers((prev) => ({ ...prev, [current]: record }))
    setTrail((prev) => [...prev, nextId])
    setTouched(false)
    setCopied(false)
  }

  function chooseSingle(opt: NodeOption) {
    advance(opt.next, {
      short: node!.short,
      label: opt.label,
      key: opt.key,
      cat: opt.cat,
      track: opt.track,
      dest: opt.dest,
      goal: current.startsWith("goal_") ? opt.key : undefined,
    })
  }

  function toggleMulti(key: string) {
    setMulti((prev) => {
      const chosen = prev[current] || []
      const max = node!.max || 99
      if (chosen.includes(key)) return { ...prev, [current]: chosen.filter((k) => k !== key) }
      if (chosen.length >= max) return prev
      return { ...prev, [current]: [...chosen, key] }
    })
  }

  function back() {
    if (trail.length < 2) return
    const prevTrail = trail.slice(0, -1)
    const returningTo = prevTrail[prevTrail.length - 1]
    setTrail(prevTrail)
    setAnswers((prev) => {
      const next = { ...prev }
      delete next[returningTo]
      return next
    })
    setTouched(false)
    setSent(false)
    setError("")
  }

  function restart() {
    setTrail(["start"])
    setAnswers({})
    setTexts({})
    setMulti({})
    setContact({ name: "", email: "", phone: "", affiliation: "", link: "" })
    setCvName("")
    setCopied(false)
    setSent(false)
    setTouched(false)
    setError("")
  }

  const summary = useMemo(() => {
    const L: string[] = []
    L.push(`Route: ${track ? ROUTES[track].title : "—"}`)
    L.push("")
    trail.forEach((id) => {
      const n = NODES[id]
      if (!n) return
      if (n.kind === "single" && answers[id]) L.push(`${n.short}: ${answers[id].label}`)
      if (n.kind === "multi" && (multi[id] || []).length) {
        const labels = multi[id]
          .map((k) => (n.options as any[])?.find((o) => o.key === k)?.label)
          .filter(Boolean)
        L.push(`${n.short}: ${labels.join(", ")}`)
      }
      if (n.kind === "text" && texts[id]) {
        L.push("")
        L.push(`${n.short} (${countWords(texts[id])} words):`)
        L.push(texts[id].trim())
        L.push("")
      }
    })
    L.push("---")
    L.push(`Name: ${contact.name || "—"}`)
    L.push(`Email: ${contact.email || "—"}`)
    if (contact.phone) L.push(`Phone: ${contact.phone}`)
    if (contact.affiliation) L.push(`Affiliation: ${contact.affiliation}`)
    if (contact.link) L.push(`CV or portfolio link: ${contact.link}`)
    if (cvName) L.push(`CV attached: ${cvName}`)
    if (matches.length) {
      L.push("")
      L.push("Suggested programmes:")
      matches.forEach((m) => L.push(`- ${m.name} (${m.status})`))
    }
    return L.join("\n")
  }, [trail, answers, multi, texts, contact, cvName, track, matches])

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  async function submitBrief() {
    setError("")
    setSending(true)
    try {
      const payload = {
        track,
        category: cat,
        answers: Object.fromEntries(Object.entries(answers).map(([k, v]) => [k, v.label])),
        selections: multi,
        texts,
        contact,
        suggestedPrograms: matches.map((m) => m.id),
        brief: summary,
      }
      const fd = new FormData()
      fd.append("payload", JSON.stringify(payload))
      const cv = fileRef.current?.files?.[0]
      if (cv) fd.append("cv", cv)

      const res = await fetch("/api/advisory/submit", { method: "POST", body: fd })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(j.error || "Something went wrong. Please try again, or email us the brief.")
      }
      setSent(true)
    } catch (e: any) {
      setError(e.message || "Submission failed.")
    } finally {
      setSending(false)
    }
  }

  const words = node?.kind === "text" ? countWords(texts[current] || "") : 0
  const textOk = words >= WORD_MIN && words <= WORD_LIMIT
  const multiOk = (multi[current] || []).length > 0
  const contactOk = contact.name.trim().length > 1 && validEmail(contact.email)

  const t = tw(track)

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden border-b border-border bg-muted/30 pt-40 pb-16 px-4 sm:px-6 lg:px-8" id="advisory-form">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#1c82c2 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[42rem] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto relative z-10 max-w-5xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-400 mb-5">Neurogati · Advisory</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05] py-1">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              One question.
            </span>
            <br />
            <span className="text-foreground/90 italic font-bold">One structured answer.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Neuroscience sits between biology, engineering and computation, and most people arrive holding one of the
            three. Advisory is a written response to a specific problem: a learning route, a sharper research question,
            an internship match, a collaboration, a way to measure something in a clinic. You describe where you are; we
            add the framing that is missing, hand back the next step, and name the courses or workshops worth your time.
          </p>

          {/* how it works */}
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border text-left sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((s, i) => (
              <li key={s.title} className="flex gap-3 bg-card p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                  {i + 1}
                </span>
                <div>
                  <strong className="block text-[15px] font-black tracking-tight text-foreground">{s.title}</strong>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* facts */}
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {FACTS.map((f) => (
              <li key={f.label} className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[13px] text-muted-foreground">
                <Ic name={f.icon} className="h-4 w-4 text-teal-400" />
                <span><b className="font-semibold text-foreground">{f.label}</b> {f.value}</span>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-6 max-w-2xl text-[13.5px] italic text-muted-foreground">
            What it is not: a course, a syllabus, or ongoing mentorship. One focused exchange on one problem. If the work
            needs sustained supervision, say so and we will point you somewhere better suited.
          </p>
        </div>
      </section>

      {/* ============================ WIZARD ============================ */}
      <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="overflow-hidden rounded-3xl border-2 border-border bg-card shadow-2xl shadow-black/20">
          {/* wizard header + stepper */}
          <div className="border-b border-border bg-muted/40 px-6 pt-5 pb-4">
            <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-base font-black tracking-tight text-foreground">Start here</span>
              <span className="text-[13px] text-muted-foreground">
                Four to six questions · roughly two minutes · nothing is sent until you review it
              </span>
            </div>
            <ol className="grid grid-cols-4 gap-2">
              {STAGES.map((s, i) => {
                const on = i <= stageIndex
                return (
                  <li key={s.label} className={`flex flex-col items-center text-center transition-opacity ${on ? "opacity-100" : "opacity-40"}`}>
                    <span className={`mb-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${on ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}>
                      {i + 1}
                    </span>
                    <span className="text-[13px] font-bold text-foreground">{s.label}</span>
                    <span className="hidden text-[11px] text-muted-foreground sm:block">{s.sub}</span>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* wizard body */}
          <div className="p-6 sm:p-8">
            {/* answered-so-far chips */}
            {Object.keys(answers).length > 0 && !atRoute && (
              <ul className="mb-6 flex flex-wrap gap-2">
                {trail.map((id) =>
                  answers[id] ? (
                    <li key={id} className="rounded-full border border-border bg-muted/60 px-3 py-1 text-[12px] text-foreground">
                      <span className="mr-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{answers[id].short}</span>
                      {answers[id].label}
                    </li>
                  ) : null
                )}
              </ul>
            )}

            {/* ---- single choice ---- */}
            {node?.kind === "single" && (
              <div key={current} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-2xl font-black tracking-tight text-foreground">{node.title}</h2>
                {node.help && <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">{node.help}</p>}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {(node.options as NodeOption[]).map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => chooseSingle(opt)}
                      className="group flex items-center gap-3 rounded-xl border-2 border-border bg-background/50 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:bg-blue-500/[0.04]"
                    >
                      <span className="text-blue-400"><Ic name={opt.icon} className="h-5 w-5" /></span>
                      <span className="flex flex-1 flex-col leading-tight">
                        <strong className="text-[15px] font-bold text-foreground">{opt.label}</strong>
                        {opt.note && <span className="mt-0.5 text-[13px] text-muted-foreground">{opt.note}</span>}
                      </span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground/50 transition-colors group-hover:text-blue-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ---- multi select ---- */}
            {node?.kind === "multi" && (
              <div key={current} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-2xl font-black tracking-tight text-foreground">{node.title}</h2>
                {node.help && <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">{node.help}</p>}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {(node.options as any[]).map((opt) => {
                    const on = (multi[current] || []).includes(opt.key)
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleMulti(opt.key)}
                        className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${on ? "border-teal-500/60 bg-teal-500/[0.08]" : "border-border bg-background/50 hover:border-border"}`}
                      >
                        <span className="text-teal-400"><Ic name={opt.icon} className="h-5 w-5" /></span>
                        <span className="flex flex-1 flex-col leading-tight">
                          <strong className="text-[14.5px] font-bold text-foreground">{opt.label}</strong>
                          {opt.note && <span className="mt-0.5 text-[12.5px] text-muted-foreground">{opt.note}</span>}
                        </span>
                        <span className={`text-lg font-black ${on ? "text-teal-400" : "text-muted-foreground/40"}`}>{on ? "✓" : "+"}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[13px] text-muted-foreground">{(multi[current] || []).length} of {node.max} chosen</span>
                  <div className="flex gap-3">
                    <button type="button" className={GHOST_BTN} onClick={back}>Back</button>
                    <button
                      type="button"
                      className={GRADIENT_BTN}
                      disabled={!multiOk}
                      onClick={() => advance(node.next!, { short: node.short, label: (multi[current] || []).map((k) => (node.options as any[]).find((o) => o.key === k)?.label).join(", ") })}
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- long answer ---- */}
            {node?.kind === "text" && (
              <div key={current} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-2xl font-black tracking-tight text-foreground">{node.title}</h2>
                {node.help && <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">{node.help}</p>}
                <textarea
                  rows={8}
                  value={texts[current] || ""}
                  placeholder={node.placeholder}
                  aria-label={node.title}
                  onChange={(e) => setTexts((p) => ({ ...p, [current]: e.target.value }))}
                  className={`mt-5 w-full rounded-xl border-2 bg-background px-4 py-3 text-[15px] leading-relaxed text-foreground outline-none transition-colors focus:border-blue-500 ${words > WORD_LIMIT ? "border-red-500/60" : "border-border"}`}
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className={`text-[13px] ${words > WORD_LIMIT ? "text-red-400" : "text-muted-foreground"}`}>
                    {words} / {WORD_LIMIT} words
                    {words > WORD_LIMIT
                      ? ` — ${words - WORD_LIMIT} over the limit`
                      : words < WORD_MIN && touched
                      ? ` — at least ${WORD_MIN} words, so the response can be specific`
                      : ""}
                  </span>
                  <div className="flex gap-3">
                    <button type="button" className={GHOST_BTN} onClick={back}>Back</button>
                    <button
                      type="button"
                      className={GRADIENT_BTN}
                      onClick={() => (textOk ? advance(node.next!, { short: node.short, label: `${words} words` }) : setTouched(true))}
                      aria-disabled={!textOk}
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- contact + CV ---- */}
            {node?.kind === "contact" && (
              <div key={current} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-2xl font-black tracking-tight text-foreground">{node.title}</h2>
                <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">{node.help}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Name" required value={contact.name} onChange={(v) => setContact((p) => ({ ...p, name: v }))} placeholder="Full name" />
                  <Field label="Email" required type="email" value={contact.email} onChange={(v) => setContact((p) => ({ ...p, email: v }))} placeholder="you@example.com" bad={touched && !validEmail(contact.email)} />
                  <Field label="Phone or WhatsApp" value={contact.phone} onChange={(v) => setContact((p) => ({ ...p, phone: v }))} placeholder="Optional" />
                  <Field label="College, hospital or company" value={contact.affiliation} onChange={(v) => setContact((p) => ({ ...p, affiliation: v }))} placeholder="Where you are right now" />
                  <div className="sm:col-span-2">
                    <Field label="CV, GitHub or portfolio link" type="url" value={contact.link} onChange={(v) => setContact((p) => ({ ...p, link: v }))} placeholder="https://" />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/40 p-4">
                  <input ref={fileRef} id="nv-cv" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => setCvName(e.target.files?.[0]?.name || "")} />
                  <label htmlFor="nv-cv" className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                    <FileText className="h-4 w-4" /> {cvName ? "Replace CV" : "Attach CV"}
                  </label>
                  <span className="flex-1 text-[13px] text-muted-foreground">
                    {cvName || "PDF or Word, up to 5 MB. Optional for guidance, expected for internships."}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[13px] text-muted-foreground">
                    {touched && !contactOk ? "Name and a valid email are needed to reply" : "We reply by email in three to five working days"}
                  </span>
                  <div className="flex gap-3">
                    <button type="button" className={GHOST_BTN} onClick={back}>Back</button>
                    <button type="button" className={GRADIENT_BTN} onClick={() => (contactOk ? advance(node.next!, null) : setTouched(true))} aria-disabled={!contactOk}>
                      Review my route <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- route result ---- */}
            {atRoute && track && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-300">
                <div className={`rounded-2xl border-2 ${t.border} ${t.bg} p-6`}>
                  <p className={`text-[11.5px] font-black uppercase tracking-[0.16em] ${t.text}`}>{TRACKS[track].code}</p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight text-foreground">{ROUTES[track].title}</h2>
                  <p className="mt-2 text-[15.5px] text-foreground/80">{ROUTES[track].lead}</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {ROUTES[track].gets.map((g) => (
                      <li key={g} className="flex items-start gap-2.5 text-[15px] text-foreground/85">
                        <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${t.text}`} /> {g}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 space-y-1.5 border-t border-dashed border-border pt-3">
                    <p className="flex items-center gap-2 text-[14px] text-muted-foreground"><Target className="h-4 w-4" /> {ROUTES[track].tier}</p>
                    <p className="flex items-center gap-2 text-[14px] text-muted-foreground"><Clock className="h-4 w-4" /> Written response in three to five working days once scope is agreed</p>
                  </div>
                </div>

                {/* programme matches */}
                <div className="overflow-hidden rounded-2xl border-2 border-border">
                  <div className="border-b border-border bg-muted/40 px-5 py-3">
                    <h3 className="flex items-center gap-2 text-base font-black text-foreground"><GraduationCap className="h-5 w-5 text-pink-400" /> Programmes that fit</h3>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      {matches.length ? "Advisory answers your question in writing. These run to a schedule." : "Nothing in the current catalogue is a clean fit."}
                    </p>
                  </div>
                  {matches.length ? (
                    <ul>
                      {matches.map((p) => (
                        <li key={p.id} className={`border-b border-border p-5 ${p.open ? "bg-pink-500/[0.04] shadow-[inset_3px_0_0_theme(colors.pink.500)]" : ""}`}>
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <strong className="text-[16px] font-black tracking-tight text-foreground">{p.name}</strong>
                            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${p.open ? "border-pink-500 bg-pink-600 text-white" : "border-border text-muted-foreground"}`}>{p.status}</span>
                          </div>
                          <p className="mt-1.5 text-[12.5px] font-mono text-teal-400">{p.meta} · {p.price}</p>
                          <p className="mt-2 text-[14.5px] leading-relaxed text-foreground/80">{p.blurb}</p>
                          <p className="mt-2 text-[12.5px] italic text-muted-foreground">Matched on {p.why.join(", ")}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="border-b border-border p-5 text-[14.5px] text-foreground/80">
                      We would rather say so than sell you a cohort at the wrong level. The written response will name what to
                      do instead, and we will tell you when a fitting cohort opens.
                    </p>
                  )}
                  <p className="bg-muted/30 px-5 py-3 text-[12.5px] text-muted-foreground">
                    Dates and fees change — <a href={PROGRAMS_URL} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">check the workshops page</a> before applying.
                    Programme enquiries: <a href={`mailto:${WORKSHOP_EMAIL}`} className="text-blue-400 hover:underline">{WORKSHOP_EMAIL}</a>.
                  </p>
                </div>

                {/* brief preview */}
                <div className="overflow-hidden rounded-2xl border-2 border-border">
                  <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
                    <span className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-muted-foreground">What we will receive</span>
                    <button type="button" onClick={copyBrief} className="rounded-full border border-border bg-background px-3 py-1 text-[12.5px] font-bold text-foreground hover:bg-muted">
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre className="max-h-[340px] overflow-auto whitespace-pre-wrap p-4 font-mono text-[12.5px] leading-relaxed text-foreground/80">{summary}</pre>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-[14px] text-red-400">{error}</div>
                )}

                <div className="flex flex-wrap items-center justify-end gap-3">
                  <button type="button" className={GHOST_BTN} onClick={back}>Edit details</button>
                  <button type="button" className={GRADIENT_BTN} onClick={submitBrief} disabled={sending || sent}>
                    {sending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : sent ? "Sent ✓" : <>Send my request <ArrowRight className="h-4 w-4" /></>}
                  </button>
                </div>
                <p className="text-[13px] text-muted-foreground">
                  {sent ? (
                    `Sent. A reply goes to ${contact.email} within three to five working days.`
                  ) : (
                    <>Prefer email? Copy the brief above and send it to <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-400 hover:underline">{CONTACT_EMAIL}</a>.</>
                  )}{" "}
                  Advisory is focused, problem-specific guidance — not a substitute for a course or long-term mentorship.
                </p>
                <div className="flex justify-end">
                  <button type="button" onClick={restart} className="rounded-full border border-border bg-background px-3 py-1 text-[12.5px] font-bold text-foreground hover:bg-muted">Start again</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================ THE MAP ============================ */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl border-2 border-border bg-card p-6 sm:p-8">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <RouteIcon className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-black tracking-tight text-foreground">Where this leads</h2>
            <span className="ml-auto text-[11.5px] font-bold uppercase tracking-wider text-muted-foreground">
              {track ? `Narrowed to your ${TRACKS[track].name} route` : "This narrows as you answer above"}
            </span>
          </div>

          <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1.3fr_auto_1fr]">
            {/* inputs */}
            <MapColumn title="Inputs" head="bg-blue-600">
              {INPUTS.map((it) => {
                const dim = cat && !it.cats.includes(cat)
                const mark = cat && it.cats.includes(cat)
                return (
                  <MapRow key={it.label} icon={it.icon} dim={!!dim} mark={!!mark} accent="text-blue-400">
                    <strong className="text-[14px] font-bold text-foreground">{it.label}</strong>
                    <span className="text-[12.5px] text-muted-foreground">{it.note}</span>
                  </MapRow>
                )
              })}
              <p className="px-3 pb-3 text-[12.5px] italic text-muted-foreground">Everyone arrives with a different background and aspiration.</p>
            </MapColumn>

            <MapArrow />

            {/* operations */}
            <MapColumn title="What we actually do" head="bg-teal-600" mid>
              <div className="flex flex-1 flex-col gap-2 p-3">
                {OPERATIONS.map((op, i) => {
                  const on = i < Math.min(answeredCount, 4)
                  return (
                    <div key={op.left} className={`grid grid-cols-1 gap-1 transition-opacity sm:grid-cols-[1fr_auto_1.3fr] sm:items-center ${on ? "opacity-100" : "opacity-50"}`}>
                      <span className="inline-flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-[13.5px] font-bold text-blue-300">
                        <Ic name={op.leftIcon} className="h-4 w-4" /> {op.left}
                      </span>
                      <span className="hidden text-muted-foreground/40 sm:block">→</span>
                      <span className="inline-flex items-center gap-2 rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-2 text-[13.5px] font-medium text-teal-300 sm:ml-0 ml-4">
                        <Ic name={op.rightIcon} className="h-4 w-4" /> {op.right}
                      </span>
                    </div>
                  )
                })}
              </div>
              <p className="mx-3 mb-3 flex items-start gap-2 rounded-r-lg border-l-[3px] border-amber-500 bg-amber-500/10 px-3 py-2.5 text-[13.5px] italic text-amber-200/90">
                <Brain className="mt-0.5 h-4 w-4 flex-shrink-0" /> We add what is missing rather than answering everyone the same way.
              </p>
            </MapColumn>

            <MapArrow />

            {/* destinations */}
            <MapColumn title="Destinations" head="bg-violet-600">
              {DESTINATIONS.map((d) => {
                const dtw = TRACK_TW[TRACKS[d.track as TrackCode].color]
                const dim = track && track !== d.track
                const mark = emphasised.has(d.id)
                return (
                  <MapRow key={d.id} icon={d.icon} dim={!!dim} mark={!!mark} accent={dtw.text} markBorder={dtw.bar}>
                    <strong className={`text-[14px] font-bold ${dtw.text}`}>{d.label}</strong>
                  </MapRow>
                )
              })}
              <p className="px-3 pb-3 text-[12.5px] italic text-muted-foreground">A destination is a decision you can act on, not a reading list.</p>
            </MapColumn>
          </div>
        </div>
      </section>

      {/* ============================ FAQ ============================ */}
      <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl border-2 border-border bg-card p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <PenLine className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-black tracking-tight text-foreground">Before you write</h2>
          </div>
          <ul className="border-t border-border">
            {FAQS.map((f, i) => (
              <li key={f.q} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-[16px] font-bold text-foreground"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 text-blue-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <p className="pb-4 pr-8 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-center text-lg font-black tracking-tight text-foreground/80">
          One central territory — the brain. Multiple entry points. Multiple futures.
        </p>
      </section>

      {/* ==================== SUBMITTED POPUP ==================== */}
      {sent && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="advisory-sent-title"
        >
          <div className="w-full max-w-md rounded-3xl border-2 border-border bg-card p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <h2 id="advisory-sent-title" className="text-2xl font-black tracking-tight text-foreground">
              Your response has been received
            </h2>

            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              We will get back to you shortly. Thank you.
            </p>

            <div className="mt-6">
              <button type="button" onClick={restart} className={GRADIENT_BTN}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Small presentational helpers ───────────────────────────────────────────
function Field({
  label, value, onChange, placeholder, required, type = "text", bad,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  type?: string
  bad?: boolean
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.09em] text-muted-foreground">
        {label}{required && <b className="ml-0.5 text-violet-400">*</b>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`rounded-lg border-2 bg-background px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-colors focus:border-blue-500 ${bad ? "border-red-500/60" : "border-border"}`}
      />
    </label>
  )
}

function MapColumn({ title, head, mid, children }: { title: string; head: string; mid?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl border-2 ${mid ? "border-border" : "border-border"} bg-background/40`}>
      <div className={`px-4 py-2.5 text-[14.5px] font-bold text-white ${head}`}>{title}</div>
      <div className="flex flex-1 flex-col gap-2 p-3">{children}</div>
    </div>
  )
}

function MapRow({
  icon, dim, mark, accent, markBorder, children,
}: {
  icon: string
  dim: boolean
  mark: boolean
  accent: string
  markBorder?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border p-2.5 transition-all ${dim ? "opacity-30" : "opacity-100"} ${mark ? `border-current bg-muted/50 shadow-[inset_3px_0_0_currentColor] ${accent}` : "border-border bg-card"}`}
    >
      <span className={`pt-px ${accent}`}><Ic name={icon} className="h-[18px] w-[18px]" /></span>
      <span className="flex flex-col leading-tight">{children}</span>
    </div>
  )
}

function MapArrow() {
  return (
    <div className="flex items-center justify-center">
      <ArrowRight className="h-5 w-5 text-muted-foreground/50 lg:rotate-0 rotate-90" />
    </div>
  )
}
