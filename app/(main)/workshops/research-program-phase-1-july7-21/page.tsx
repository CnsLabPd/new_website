"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar, MapPin, Users, ArrowRight, Clock, Mail,
  GraduationCap, Brain, Lightbulb, Award, ChevronRight,
  Quote, ChevronDown, Download,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type SessionType = "live" | "self" | "assignment"

interface Session {
  type: SessionType
  topic: string
  presenter: string
}

interface DayEntry {
  date: string
  sessions: Session[]
}

// ─── Schedule Data (Updated for July 7-21) ───────────────────────────────────

const SCHEDULE: DayEntry[] = [
  {
    date: "July 7, 2026",
    sessions: [
      { type: "live", topic: "Simplifying Neuroscience — Introduction to the Course", presenter: "Prof. VSC" },
    ],
  },
  {
    date: "Self-paced (after Jul 7)",
    sessions: [
      { type: "self", topic: "Neurons and Neural Signaling", presenter: "Video Lectures" },
      { type: "self", topic: "Neural Signaling — Molecular and Cellular Basis", presenter: "Video Lectures" },
    ],
  },
  {
    date: "July 8, 2026",
    sessions: [
      { type: "live", topic: "Special Talk on Vehicles", presenter: "Prof. VSC" },
      { type: "live", topic: "Vehicles Simulator Demo", presenter: "Aditya" },
    ],
  },
  {
    date: "July 9, 2026",
    sessions: [
      { type: "live", topic: "Special Talk by Dr. Srinivasa Kota", presenter: "Dr. Srinivasa Kota" },
      { type: "self", topic: "Video on Vehicles Book", presenter: "Video Lectures" },
      { type: "self", topic: "Lecture 07 from Demystifying the Brain — Networks that Learn (Segment 1)", presenter: "Video Lectures" },
    ],
  },
  {
    date: "July 10, 2026",
    sessions: [
      { type: "live", topic: "Neural Networks on Simple Datasets — Spiral, MNIST", presenter: "Charitha" },
      { type: "assignment", topic: "Group Assignment — Regression & Classification", presenter: "Assignment" },
    ],
  },
  {
    date: "July 11, 2026",
    sessions: [
      { type: "live", topic: "Lecture on GloveTalk; Discussion of Assignment", presenter: "Prof. VSC" },
    ],
  },
  {
    date: "July 12, 2026",
    sessions: [
      { type: "live", topic: "Recurrent Neural Networks; Demo on Speech Data Classification", presenter: "Sundari" },
    ],
  },
  {
    date: "July 14, 2026",
    sessions: [
      { type: "live", topic: "Introduction to CNNs; Demo on Using CNN for MNIST", presenter: "Charitha" },
      { type: "assignment", topic: "Assignment 2 on CNN — Counting or Classifying Cells Using CNNs (similar to PathAI)", presenter: "Assignment" },
      { type: "self", topic: "Lecture 08 from Demystifying the Brain — MLP Applications in Psychology; Video on GloveTalk", presenter: "Video Lectures" },
    ],
  },
  {
    date: "July 15, 2026",
    sessions: [
      { type: "live", topic: "Introducing Visual System in the Brain", presenter: "Prof. VSC" },
    ],
  },
  {
    date: "July 16, 2026",
    sessions: [
      { type: "live", topic: "Demo: How CNN Filters Connect to Early Visual Layer Representations; Assignment on Training Across Different Datasets", presenter: "Aditya" },
    ],
  },
  {
    date: "July 17, 2026",
    sessions: [
      { type: "live", topic: "Connecting Motor Function & Stroke to CNN — Creating Lesions to Replicate Stroke Behaviour (Lecture)", presenter: "Sundari" },
      { type: "live", topic: "Motor Function & Stroke in CNN — Demo; Assignment on Lesion Size & Therapy Types", presenter: "Sundari" },
    ],
  },
  {
    date: "July 18, 2026",
    sessions: [
      { type: "live", topic: "Hopfield Network — Memory Storage and Retrieval (Demo)", presenter: "Aditya" },
      { type: "self", topic: "Video on Hopfield Network from Demystifying the Brain", presenter: "Video Lectures" },
    ],
  },
  {
    date: "July 19, 2026",
    sessions: [
      { type: "live", topic: "Hippocampus and Memory Systems — Live Talk", presenter: "Prof. VSC" },
    ],
  },
  {
    date: "July 21, 2026",
    sessions: [
      { type: "live", topic: "2-min Student Presentations on a Neuroscience Topic of Choice", presenter: "Students" },
    ],
  },
]

// ─── Navigation ───────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "overview",     label: "Overview" },
  { id: "learning",     label: "What You'll Learn" },
  { id: "features",     label: "Program Features" },
  { id: "schedule",     label: "Course Schedule" },
  { id: "audience",     label: "Who Should Apply" },
  { id: "fees",         label: "Fee Structure" },
  { id: "additional",   label: "Additional Info" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact",      label: "Contact" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SessionBadge({ type }: { type: SessionType }) {
  const styles: Record<SessionType, string> = {
    live:       "bg-blue-500/15 text-blue-300 border border-blue-500/25",
    self:       "bg-violet-500/15 text-violet-300 border border-violet-500/25",
    assignment: "bg-amber-500/15 text-amber-300 border border-amber-500/25",
  }
  const labels: Record<SessionType, string> = {
    live:       "Live",
    self:       "Self-paced",
    assignment: "Assignment",
  }
  return (
    <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${styles[type]} whitespace-nowrap mt-0.5`}>
      {labels[type]}
    </span>
  )
}

function SessionRow({ session }: { session: Session }) {
  const barColor: Record<SessionType, string> = {
    live:       "bg-blue-500",
    self:       "bg-violet-500",
    assignment: "bg-amber-500",
  }
  return (
    <div className="flex items-stretch border-b border-border last:border-b-0 hover:bg-white/[0.02] transition-colors">
      <div className={`w-1 flex-shrink-0 ${barColor[session.type]}`} />
      <div className="flex flex-wrap items-start gap-x-3 gap-y-1 px-4 py-3 flex-1">
        <SessionBadge type={session.type} />
        <div className="flex-1 min-w-[180px]">
          <p className="text-sm font-semibold text-foreground leading-snug">{session.topic}</p>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">{session.presenter}</p>
        </div>
      </div>
    </div>
  )
}

function DayGroup({ entry, defaultOpen }: { entry: DayEntry; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? true)

  const liveCt       = entry.sessions.filter(s => s.type === "live").length
  const selfCt       = entry.sessions.filter(s => s.type === "self").length
  const assignmentCt = entry.sessions.filter(s => s.type === "assignment").length

  const summaryParts: string[] = []
  if (liveCt)       summaryParts.push(`${liveCt} live`)
  if (selfCt)       summaryParts.push(`${selfCt} self-paced`)
  if (assignmentCt) summaryParts.push(`${assignmentCt} assignment`)

  const isSelfPacedOnly = entry.sessions.every(s => s.type !== "live")

  return (
    <div className="mb-2">
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-muted/40 hover:bg-muted/60 border border-border rounded-t-xl transition-colors text-left"
        style={{ borderRadius: open ? "12px 12px 0 0" : "12px" }}
      >
        <span className={`text-sm font-black font-mono ${isSelfPacedOnly ? "text-violet-400" : "text-blue-400"} min-w-[140px]`}>
          {entry.date}
        </span>
        <span className="text-xs text-muted-foreground flex-1 font-semibold">{summaryParts.join(" · ")}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Sessions */}
      {open && (
        <div className="border border-t-0 border-border rounded-b-xl overflow-hidden">
          {entry.sessions.map((session, i) => (
            <SessionRow key={i} session={session} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResearchProgramPhase1July7To21Page() {
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    const handleScroll = () => {
      const OFFSET = 150
      const scrollPosition = window.scrollY + OFFSET
      for (const section of NAV_SECTIONS) {
        const el = document.getElementById(section.id)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const OFFSET = 130
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - OFFSET, behavior: "smooth" })
    }
  }

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        id="overview"
        className="relative pt-48 pb-24 overflow-hidden border-b border-border"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -5%, hsl(220 90% 56% / 0.15) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 60%, hsl(265 80% 60% / 0.08) 0%, transparent 60%), var(--background)",
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-500 text-white text-xs font-black uppercase tracking-widest mb-6">
              Applications Now Open - July Session
            </div>

            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              AI + BRAIN SCIENCE<br />SUMMER PROGRAM
            </h1>

            <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              For High School Students (Grades 8–12)
            </p>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed mb-8">
              Explore how AI is used to study the brain, analyze EEG signals, and understand brain disorders.
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm font-bold">
              {[
                { icon: <Calendar className="h-4 w-4 text-blue-500" />, text: "July 7–21, 2026" },
                { icon: <MapPin className="h-4 w-4 text-blue-500" />,    text: "Online" },
                { icon: <Clock className="h-4 w-4 text-blue-500" />,     text: "10:30 AM – 12:00 PM CST" },
                { icon: <Users className="h-4 w-4 text-blue-500" />,     text: "Grades 8–12" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2">{icon}<span>{text}</span></div>
              ))}
            </div>

            <p className="text-lg font-bold text-green-500 mb-8">
              Limited Seats · Selection-Based Admission
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="https://forms.gle/G4zsZmBPn3ZsoqeQ7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-gradient-to-br from-blue-600 via-blue-400 to-blue-600 text-white font-bold rounded-full hover:scale-105 transition-all text-lg shadow-lg shadow-blue-500/20"
              >
                Apply Now <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="/workshop brochures/phase1 july.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-blue-400 text-blue-400 font-bold rounded-full hover:bg-blue-400/10 transition-all text-lg"
              >
                Download Brochure <Download className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ───────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="flex gap-12">

          {/* Sidebar spacer */}
          <aside className="hidden lg:block w-64 flex-shrink-0" />

          {/* Fixed sidebar nav */}
          <nav className="hidden lg:block fixed left-8 top-32 w-64 space-y-1 max-h-[calc(100vh-150px)] overflow-y-auto">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 px-4">
              On This Page
            </p>
            {NAV_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full text-left px-4 py-2 rounded-md text-sm font-bold transition-all ${
                  activeSection === id
                    ? "bg-blue-500 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* ── Main content ── */}
          <div className="flex-1 max-w-4xl space-y-20">

            {/* WHAT STUDENTS WILL LEARN */}
            <section id="learning" className="scroll-mt-32">
              <SectionHeader title="What Students Will Learn" />
              <Card className="border-2 border-blue-500/20 bg-blue-500/[0.02]">
                <CardContent className="p-8">
                  <ul className="space-y-3">
                    {[
                      "How neurons compute and communicate",
                      "Foundations of neural networks and brain modeling",
                      "Basics of brain signal analysis (EEG concepts)",
                      "How computational models are used to study neurological disorders",
                    ].map(item => (
                      <li key={item} className="flex items-start gap-3 text-base">
                        <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* PROGRAM FEATURES */}
            <section id="features" className="scroll-mt-32">
              <SectionHeader title="Program Features" />
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { icon: <GraduationCap className="h-10 w-10 text-blue-500" />, title: "IIT Faculty",       desc: "Live interactive sessions led by experienced faculty from IIT" },
                  { icon: <Brain        className="h-10 w-10 text-blue-500" />, title: "Real Research",     desc: "Exposure to real research problems in computational neuroscience" },
                  { icon: <Award        className="h-10 w-10 text-blue-500" />, title: "Certificate",       desc: "Certificate of completion from Neurogati" },
                  { icon: <Lightbulb    className="h-10 w-10 text-blue-500" />, title: "Phase II Pathway",  desc: "Pathway to advanced research programs (Phase II)" },
                ].map(({ icon, title, desc }) => (
                  <Card key={title} className="border-2 border-border hover:border-blue-500/40 transition-colors">
                    <CardHeader className="pb-2">{icon}<CardTitle className="text-lg font-black mt-3">{title}</CardTitle></CardHeader>
                    <CardContent><p className="text-foreground/75 text-sm">{desc}</p></CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* ── COURSE SCHEDULE ── */}
            <section id="schedule" className="scroll-mt-32">
              <SectionHeader title="Course Schedule" />

              {/* Timing chips */}
              <div className="flex flex-wrap gap-2 mb-5 text-xs font-bold">
                {[
                  "📅 July 7–21, 2026",
                  "🕘 9:00–10:30 PM IST",
                  "🕙 10:30 AM–12:00 PM CST",
                  "🕗 8:30–10:00 AM PDT",
                ].map(chip => (
                  <span
                    key={chip}
                    className="px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-5 mb-5 text-xs font-bold text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />Live Session</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block" />Self-paced</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />Assignment</span>
              </div>

              <p className="text-xs text-muted-foreground mb-5 italic">
                Note: Self-paced materials can be completed at your own schedule. Live sessions are on the dates indicated.
              </p>

              {/* Day groups */}
              <div>
                {SCHEDULE.map((entry, i) => (
                  <DayGroup key={entry.date} entry={entry} defaultOpen={i === 0} />
                ))}
              </div>
            </section>

            {/* WHO SHOULD APPLY */}
            <section id="audience" className="scroll-mt-32">
              <SectionHeader title="Who Should Apply" />
              <Card className="border-2 border-blue-500/20 bg-blue-500/[0.02]">
                <CardContent className="p-8">
                  <p className="text-base font-semibold text-foreground/90 mb-5">
                    Students with strong interest in mathematics, coding, biology, or AI, looking to go beyond standard school curricula.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "High school students (Grades 8–12)",
                      "STEM-oriented students",
                      "Students interested in neuroscience, AI, medicine, or engineering",
                    ].map(item => (
                      <li key={item} className="flex items-start gap-3 text-base text-foreground/80">
                        <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* FEE STRUCTURE */}
            <section id="fees" className="scroll-mt-32">
              <SectionHeader title="Fee Structure" />
              <Card className="border-2 border-blue-500/20 bg-blue-500/[0.02]">
                <CardContent className="p-8 space-y-3 text-base font-medium">
                  <p><span className="font-black">Indian Students:</span> ₹15,000</p>
                  <p><span className="font-black">International Students:</span> $200</p>
                </CardContent>
              </Card>
            </section>

            {/* ADDITIONAL INFO */}
            <section id="additional" className="scroll-mt-32">
              <SectionHeader title="Additional Information" />
              <div className="space-y-4">
                {[
                  { title: "Selection-Based Admission",  body: "Limited seats available. Admission is selection-based to ensure an optimal learning environment." },
                  { title: "International Cohorts",      body: "Prior cohorts include students from the US and India, creating a diverse learning community." },
                  { title: "College Application Boost",  body: "Ideal for students preparing for competitive college applications with STEM research exposure." },
                ].map(({ title, body }) => (
                  <Card key={title} className="border-2 border-border">
                    <CardContent className="p-6">
                      <h3 className="text-base font-black mb-2">{title}</h3>
                      <p className="text-foreground/75 text-sm">{body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimonials" className="scroll-mt-32">
              <SectionHeader title="Testimonials" />
              <Card className="border-2 border-blue-500/25 bg-blue-500/[0.02]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Quote className="h-8 w-8 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-base text-foreground/85 leading-relaxed italic mb-6">
                        "My daughter participated in Neurogati's Computational Neuroscience Research Program, Phase 1,
                        and found it to be an excellent introduction to an exciting and opportunity-rich field. She was
                        especially impressed by Dr. Chakravarthy and his PhD students, who taught the material with
                        clarity, patience, and deep expertise. The instructors made sure students understood the concepts,
                        while the homework assignments encouraged genuine curiosity and exploration. My daughter often
                        went beyond the required work to experiment further with the models introduced in class. I am very
                        grateful for the quality of instruction and the thoughtful structure of the program. I would highly
                        recommend Neurogati's program to students who are interested in neuroscience, computation, or
                        research and want to build a strong foundation in computational neuroscience."
                      </p>
                      <div className="border-t border-border/50 pt-4">
                        <p className="font-black text-base">Srinivas Jallepalli</p>
                        <p className="text-sm text-muted-foreground font-semibold">Parent, Austin, TX (for his daughter Akhila)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CONTACT CTA */}
            <section id="contact" className="scroll-mt-32">
              <Card className="border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/8 via-violet-500/6 to-transparent">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">Ready to Join?</h2>
                  <p className="text-base text-foreground/70 mb-8 max-w-xl mx-auto">
                    Join a cohort of motivated students exploring the intersection of brain science, AI, and computational modeling.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://forms.gle/G4zsZmBPn3ZsoqeQ7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all hover:scale-105 text-base shadow-lg shadow-blue-500/20"
                    >
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </a>

                    <a
                      href="/workshop brochures/phase1 july.pdf"
                      download
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-blue-400 text-blue-400 font-bold rounded-full hover:bg-blue-400/10 transition-all text-base"
                    >
                      Download Brochure <Download className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="mt-8 pt-8 border-t border-border/40">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Questions?</p>
                    <a href="mailto:workshops@neurogati.com" className="inline-flex items-center gap-2 text-foreground hover:text-blue-400 transition-colors font-bold text-sm">
                      <Mail className="h-4 w-4" />
                      workshops@neurogati.com
                    </a>
                  </div>
                </CardContent>
              </Card>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Shared micro-component ───────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-3">{title}</h2>
      <div className="h-1.5 w-12 rounded-full bg-blue-500" />
    </div>
  )
}