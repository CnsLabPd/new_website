"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar, MapPin, Users, ArrowRight, Clock, Mail, Download,
  GraduationCap, Brain, Lightbulb, Award, ChevronRight,
  Microscope, Presentation, Wrench, FlaskConical, Sparkles,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stage {
  id: string
  label: string
  title: string
  audience: string
  points: string[]
  color: "blue" | "violet" | "amber"
}

interface WeekEntry {
  stage: string
  week: string
  topic: string
}

interface ResearchTeam {
  team: string
  title: string
  question: string
  hypothesis: string
  approach: string
  color: "blue" | "violet" | "amber" | "cyan" | "green" | "pink"
}

// ─── Program Data (from official brochure) ───────────────────────────────────

const STAGES: Stage[] = [
  {
    id: "stage-01",
    label: "Stage 01",
    title: "Laying the Foundations",
    audience: "Common to all participants",
    points: [
      "Foundations of neuroscience",
      "Mathematics as a language for brain models",
      "Programming with Python",
    ],
    color: "blue",
  },
  {
    id: "stage-02",
    label: "Stage 02",
    title: "Three Computational Approaches",
    audience: "Common to all participants",
    points: [
      "Feedforward Networks",
      "Attractor Systems",
      "Reinforcement Learning",
    ],
    color: "violet",
  },
  {
    id: "stage-03",
    label: "Stage 03",
    title: "Guided Research Training",
    audience: "Participants divided into 6 teams — 2 per computational approach",
    points: [
      "Guided research training sessions",
      "Build, run and analyse your own model",
      "Present at the research symposium",
    ],
    color: "amber",
  },
]

const JOURNEY = [
  { icon: <Brain className="h-8 w-8" />, title: "Learn", desc: "Neuroscience, math and Python" },
  { icon: <Wrench className="h-8 w-8" />, title: "Build", desc: "Create a working computational model" },
  { icon: <FlaskConical className="h-8 w-8" />, title: "Investigate", desc: "Run experiments and interpret results" },
  { icon: <Presentation className="h-8 w-8" />, title: "Present", desc: "Share your research at the symposium" },
]

const CURRICULUM: WeekEntry[] = [
  { stage: "Stage 01", week: "Week 01", topic: "The Brain as a Scientific Mystery" },
  { stage: "Stage 01", week: "Week 02", topic: "Mathematics as a Language for Brain Models" },
  { stage: "Stage 01", week: "Week 03", topic: "Python for Brain Modeling" },
  { stage: "Stage 01", week: "Week 04", topic: "Neurons and Neural Signaling" },
  { stage: "Stage 02", week: "Week 05", topic: "Feedforward Neural Networks" },
  { stage: "Stage 02", week: "Week 06", topic: "Attractor and Recurrent Neural Networks" },
  { stage: "Stage 02", week: "Week 07", topic: "Reinforcement Learning" },
  { stage: "Stage 03", week: "Week 08", topic: "Introduction to the Research Question and Model Design" },
  { stage: "Stage 03", week: "Week 09", topic: "Building the Baseline Model" },
  { stage: "Stage 03", week: "Week 10", topic: "Running Computational Experiments" },
  { stage: "Stage 03", week: "Week 11", topic: "Analysis and Neuroscientific Experiments" },
  { stage: "Stage 03", week: "Week 12", topic: "Research Communication and Symposium" },
]

const TEAMS: ResearchTeam[] = [
  {
    team: "Team 01",
    title: "The Moving Enigma Illusion",
    question: "How can a stationary image produce neural signals that are interpreted as movement?",
    hypothesis: "Particular combinations of contrast, spatial filtering and temporal response differences can produce motion-like activity even when the image is stationary.",
    approach: "Feedforward Networks",
    color: "blue",
  },
  {
    team: "Team 02",
    title: "Seeing a Face but Not the Person",
    question: "How can face detection remain intact while face identity recognition fails?",
    hypothesis: "Prosopagnosia can result from disruption of higher-level identity representations or their readout, even when early visual processing and face detection remain functional.",
    approach: "Feedforward Networks",
    color: "cyan",
  },
  {
    team: "Team 03",
    title: "Selective Memory Loss in Alzheimer's Disease",
    question: "Why are some stored memories more vulnerable than others?",
    hypothesis: "Memories with weaker, less distributed or more overlapping representations may have shallower attractor basins and therefore disappear earlier as the network is damaged.",
    approach: "Attractor Systems",
    color: "violet",
  },
  {
    team: "Team 04",
    title: "Mood as an Attractor",
    question: "How can a temporary emotional change become a persistent mood state?",
    hypothesis: "Strong recurrent feedback can deepen a mood attractor so that the network remains in that state after the original trigger has disappeared.",
    approach: "Attractor Systems",
    color: "pink",
  },
  {
    team: "Team 05",
    title: "Parkinsonian Freezing at a Doorway",
    question: "Why might a narrow doorway cause an interruption of otherwise successful walking?",
    hypothesis: "At a spatial bottleneck, action alternatives may become closely matched or the local value gradient may become weak or ambiguous. Reduced dopaminergic action selection could then produce freezing.",
    approach: "Reinforcement Learning",
    color: "amber",
  },
  {
    team: "Team 06",
    title: "ADHD and Excessive Exploration",
    question: "Could apparently inconsistent behaviour arise from an agent that explores too much?",
    hypothesis: "Excessive exploration can reduce consistent task performance while sometimes improving discovery and adaptation in changing environments.",
    approach: "Reinforcement Learning",
    color: "green",
  },
]

const OUTCOMES = [
  {
    icon: <GraduationCap className="h-10 w-10 text-blue-500" />,
    title: "24 Guided Live Sessions",
    desc: "Covering neuroscience, mathematics, Python and computational modelling",
  },
  {
    icon: <Microscope className="h-10 w-10 text-blue-500" />,
    title: "Practical Research Experience",
    desc: "Build and investigate a real computational model of a brain phenomenon",
  },
  {
    icon: <Award className="h-10 w-10 text-blue-500" />,
    title: "Guided Research Mentorship",
    desc: "Work alongside mentors through every stage of the research process",
  },
  {
    icon: <Presentation className="h-10 w-10 text-blue-500" />,
    title: "Symposium Presentation",
    desc: "Communicate your findings and present your research at the symposium",
  },
]

const IMPORTANT_DATES = [
  { label: "Application Deadline", date: "August 31, 2026", accent: "text-amber-400" },
  { label: "Registration Deadline", date: "September 15, 2026", accent: "text-amber-400" },
  { label: "Classes Begin", date: "September 21, 2026", accent: "text-green-400" },
]

const BROCHURE = "/workshop%20brochures/Young_Computational_Neuroscientist_Program.pdf"

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "journey", label: "Your Journey" },
  { id: "stages", label: "Program Stages" },
  { id: "curriculum", label: "Curriculum" },
  { id: "teams", label: "Research Mysteries" },
  { id: "outcomes", label: "Expected Outcomes" },
  { id: "dates", label: "Important Dates" },
  { id: "fees", label: "Fees & Discounts" },
  { id: "contact", label: "Apply" },
]

// ─── Color helpers (explicit so Tailwind keeps the classes) ──────────────────

const STAGE_COLORS = {
  blue: { border: "border-blue-500/40", bg: "bg-blue-500/[0.04]", bar: "bg-blue-500", text: "text-blue-400", chip: "bg-blue-500" },
  violet: { border: "border-violet-500/40", bg: "bg-violet-500/[0.04]", bar: "bg-violet-500", text: "text-violet-400", chip: "bg-violet-500" },
  amber: { border: "border-amber-500/40", bg: "bg-amber-500/[0.04]", bar: "bg-amber-500", text: "text-amber-400", chip: "bg-amber-500" },
}

const TEAM_COLORS = {
  blue: { border: "border-blue-500/30", bar: "bg-blue-500", text: "text-blue-400", soft: "bg-blue-500/10" },
  cyan: { border: "border-cyan-500/30", bar: "bg-cyan-500", text: "text-cyan-400", soft: "bg-cyan-500/10" },
  violet: { border: "border-violet-500/30", bar: "bg-violet-500", text: "text-violet-400", soft: "bg-violet-500/10" },
  pink: { border: "border-pink-500/30", bar: "bg-pink-500", text: "text-pink-400", soft: "bg-pink-500/10" },
  amber: { border: "border-amber-500/30", bar: "bg-amber-500", text: "text-amber-400", soft: "bg-amber-500/10" },
  green: { border: "border-green-500/30", bar: "bg-green-500", text: "text-green-400", soft: "bg-green-500/10" },
}

const STAGE_TAG_COLOR: Record<string, string> = {
  "Stage 01": "bg-blue-500/15 text-blue-300 border border-blue-500/25",
  "Stage 02": "bg-violet-500/15 text-violet-300 border border-violet-500/25",
  "Stage 03": "bg-amber-500/15 text-amber-300 border border-amber-500/25",
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function YoungComputationalNeuroscientistPage() {
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
          background:
            "radial-gradient(ellipse 80% 50% at 50% -5%, hsl(220 90% 56% / 0.15) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 60%, hsl(265 80% 60% / 0.08) 0%, transparent 60%), var(--background)",
        }}
      >
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
              Applications Now Open — Classes 9–12
            </div>

            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Young Computational<br />Neuroscientist Program
            </h1>

            <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Can you solve a mystery of the brain?
            </p>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed mb-8">
              A 12-week guided computational research mentorship where school students learn
              neuroscience, build a working model, run experiments and present real research.
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm font-bold">
              {[
                { icon: <Calendar className="h-4 w-4 text-blue-500" />, text: "Begins September 21, 2026" },
                { icon: <MapPin className="h-4 w-4 text-blue-500" />, text: "Online" },
                { icon: <Clock className="h-4 w-4 text-blue-500" />, text: "12 weeks · 24 live sessions" },
                { icon: <Users className="h-4 w-4 text-blue-500" />, text: "Classes 9–12" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2">{icon}<span>{text}</span></div>
              ))}
            </div>

            <p className="text-lg font-bold text-green-500 mb-8">
              Guided Computational Research Mentorship · Applications close August 31, 2026
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-gradient-to-br from-blue-600 via-blue-400 to-blue-600 text-white font-bold rounded-full hover:scale-105 transition-all text-lg shadow-lg shadow-blue-500/20"
              >
                Apply Now <ArrowRight className="h-5 w-5" />
              </button>

              <a
                href={BROCHURE}
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

            {/* YOUR 12-WEEK RESEARCH JOURNEY */}
            <section id="journey" className="scroll-mt-32">
              <SectionHeader title="Your 12-Week Research Journey" />
              <p className="text-base text-foreground/70 mb-8 -mt-4">
                Feedforward networks · Attractor networks · Reinforcement learning
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {JOURNEY.map(({ icon, title, desc }, i) => (
                  <Card
                    key={title}
                    className="relative border-2 border-border hover:border-blue-500/40 transition-colors overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-violet-500" />
                    <CardContent className="pt-7 pb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white font-black text-sm">
                          {i + 1}
                        </span>
                        <span className="text-blue-500">{icon}</span>
                      </div>
                      <h3 className="text-xl font-black tracking-tight mb-1.5">{title}</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">{desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* PROGRAM STAGES */}
            <section id="stages" className="scroll-mt-32">
              <SectionHeader title="Program Stages" />
              <div className="space-y-5">
                {STAGES.map((stage) => {
                  const c = STAGE_COLORS[stage.color]
                  return (
                    <Card key={stage.id} className={`border-2 ${c.border} ${c.bg}`}>
                      <CardHeader className="pb-3">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-widest text-white ${c.chip}`}>
                            {stage.label}
                          </span>
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                            {stage.audience}
                          </span>
                        </div>
                        <CardTitle className="text-2xl font-black tracking-tight">{stage.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {stage.points.map((p) => (
                            <li key={p} className="flex items-start gap-3 text-base">
                              <ChevronRight className={`h-5 w-5 flex-shrink-0 mt-0.5 ${c.text}`} />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>

            {/* CURRICULUM */}
            <section id="curriculum" className="scroll-mt-32">
              <SectionHeader title="Week-by-Week Curriculum" />
              <Card className="border-2 border-border overflow-hidden">
                <div className="divide-y divide-border">
                  {CURRICULUM.map((w) => (
                    <div
                      key={w.week}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded whitespace-nowrap ${STAGE_TAG_COLOR[w.stage]}`}>
                        {w.stage}
                      </span>
                      <span className="text-sm font-black text-muted-foreground w-[70px] flex-shrink-0">
                        {w.week}
                      </span>
                      <p className="text-base font-semibold leading-snug">{w.topic}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* RESEARCH MYSTERIES */}
            <section id="teams" className="scroll-mt-32">
              <SectionHeader title="Choose From Six Brain Mysteries" />
              <p className="text-base text-foreground/70 mb-8 -mt-4">
                In Stage 03, participants are divided into six teams — two per computational
                approach. Each team investigates a genuine open question in neuroscience.
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {TEAMS.map((t) => {
                  const c = TEAM_COLORS[t.color]
                  return (
                    <Card key={t.team} className={`flex flex-col border-2 ${c.border} hover:shadow-xl transition-all overflow-hidden`}>
                      <div className={`h-1 w-full ${c.bar}`} />
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-[11px] font-black uppercase tracking-widest ${c.text}`}>
                            {t.team}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded ${c.soft} ${c.text} whitespace-nowrap`}>
                            {t.approach}
                          </span>
                        </div>
                        <CardTitle className="text-lg font-black tracking-tight leading-snug">
                          {t.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-4 flex-grow">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                            Research Question
                          </p>
                          <p className="text-sm text-foreground/85 leading-relaxed">{t.question}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                            Central Hypothesis
                          </p>
                          <p className="text-sm text-foreground/70 leading-relaxed">{t.hypothesis}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>

            {/* EXPECTED OUTCOMES */}
            <section id="outcomes" className="scroll-mt-32">
              <SectionHeader title="Expected Outcomes" />
              <div className="grid md:grid-cols-2 gap-5">
                {OUTCOMES.map(({ icon, title, desc }) => (
                  <Card key={title} className="border-2 border-border hover:border-blue-500/40 transition-colors">
                    <CardHeader className="pb-2">
                      {icon}
                      <CardTitle className="text-lg font-black mt-3">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/75 text-sm leading-relaxed">{desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* IMPORTANT DATES */}
            <section id="dates" className="scroll-mt-32">
              <SectionHeader title="Important Dates" />
              <div className="grid sm:grid-cols-3 gap-5">
                {IMPORTANT_DATES.map(({ label, date, accent }) => (
                  <Card key={label} className="border-2 border-border text-center hover:border-blue-500/40 transition-colors">
                    <CardContent className="py-8">
                      <Calendar className={`h-8 w-8 mx-auto mb-4 ${accent}`} />
                      <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-2">
                        {label}
                      </p>
                      <p className={`text-lg font-black tracking-tight ${accent}`}>{date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* FEES & DISCOUNTS */}
            <section id="fees" className="scroll-mt-32">
              <SectionHeader title="Fees & Discounts" />
              <Card className="border-2 border-blue-500/30 bg-blue-500/[0.04]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Sparkles className="h-8 w-8 text-blue-400 flex-shrink-0 mt-1" />
                    <div className="space-y-4">
                      <p className="text-lg font-semibold text-foreground/90 leading-relaxed">
                        For other details including pricing, please write to{" "}
                        <a
                          href="mailto:workshops@neurogati.com"
                          className="text-blue-400 hover:text-blue-300 underline underline-offset-4 font-bold"
                        >
                          workshops@neurogati.com
                        </a>
                        .
                      </p>
                      <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/[0.07] p-4">
                        <Award className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-base font-semibold text-foreground/90 leading-relaxed">
                          A selected set of meritorious students will be offered discounts.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CONTACT / APPLY CTA */}
            <section id="contact" className="scroll-mt-32">
              <Card className="border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/8 via-violet-500/6 to-transparent">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">
                    Ready to Solve a Brain Mystery?
                  </h2>
                  <p className="text-base text-foreground/70 mb-8 max-w-xl mx-auto">
                    Join a cohort of curious students in Classes 9–12 and spend 12 weeks doing
                    genuine computational neuroscience research — from first principles to a
                    symposium presentation.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                    {IMPORTANT_DATES.map(({ label, date }) => (
                      <div key={label} className="rounded-lg border border-border/60 bg-background/40 px-4 py-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                          {label}
                        </p>
                        <p className="text-sm font-bold">{date}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:workshops@neurogati.com?subject=Application%20-%20Young%20Computational%20Neuroscientist%20Program"
                      className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all hover:scale-105 text-base shadow-lg shadow-blue-500/20"
                    >
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </a>

                    <a
                      href={BROCHURE}
                      download
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-blue-400 text-blue-400 font-bold rounded-full hover:bg-blue-400/10 transition-all text-base"
                    >
                      Download Brochure <Download className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="mt-8 pt-8 border-t border-border/40">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
                      Questions?
                    </p>
                    <a
                      href="mailto:workshops@neurogati.com"
                      className="inline-flex items-center gap-2 text-foreground hover:text-blue-400 transition-colors font-bold text-sm"
                    >
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
