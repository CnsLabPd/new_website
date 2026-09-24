import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Brain,
  CalendarDays,
  Clock3,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Microscope,
  Sparkles,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WinterSchoolSectionNav } from "./section-nav"

export const metadata: Metadata = {
  title: "Neurogati Winter School 2026",
  description:
    "Neurogati Winter School 2026 is a five-day online, live and interactive programme taking place from December 7 to 11, 2026.",
}

const speakers = [
  {
    name: "Prof. Sumantra Chattarji",
    affiliation: "Director, CHINTA, TCG CREST",
    focus: "Neural circuits, stress and brain disorders",
  },
  {
    name: "Prof. Srivatsun Sadagopan",
    affiliation: "University of Pittsburgh",
    focus: "Neural mechanisms of real-world auditory perception",
  },
  {
    name: "Dr. Frédéric Alexandre",
    affiliation: "Inria, France",
    focus: "Computational neuroscience, memory and adaptive systems",
  },
  {
    name: "Dr. Nicolas Rougier",
    affiliation: "Inria, France",
    focus: "Computational neuroscience and neuroinformatics",
  },
  {
    name: "Prof. Arpan Banerjee",
    affiliation: "National Brain Research Centre",
    focus: "Cognitive brain dynamics and multimodal neuroimaging",
  },
  {
    name: "Dr. Bhavani Shankar Sahu",
    affiliation: "National Brain Research Centre",
    focus: "Cell biology of neurons and neuroendocrine systems",
  },
]

const scientificCommittee = [
  { name: "Dr. Frédéric Alexandre", affiliation: "Inria, France" },
  { name: "Dr. Pragathi Balasubramani", affiliation: "IIT Kanpur, India" },
  { name: "Dr. V. Srinivasa Chakravarthy", affiliation: "IIT Madras, India" },
  { name: "Dr. Risto Ilmoniemi", affiliation: "Aalto University, Finland" },
  { name: "Dr. Vignesh Muralidharan", affiliation: "IIT Jodhpur, India" },
  { name: "Dr. Srikanth Ramaswamy", affiliation: "Newcastle University, UK" },
  { name: "Dr. Aasif Sheikh", affiliation: "Case Western Reserve University, USA" },
]

export default function WinterSchool2026Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <WinterSchoolSectionNav />

      <section id="overview" className="relative scroll-mt-28 overflow-hidden border-b border-border pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.2),transparent_38%),radial-gradient(circle_at_85%_25%,rgba(245,158,11,0.15),transparent_30%)]" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/workshops"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning Programs
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-600 dark:text-blue-300">
                <Sparkles className="h-4 w-4" />
                Upcoming Programme
              </div>
              <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Neurogati
                <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
                  Winter School 2026
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                A five-day online programme bringing together researchers and educators from across neuroscience, computation, cognition, movement and brain health.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <QuickFact icon={CalendarDays} label="Dates" value="7–11 December 2026" />
                <QuickFact icon={Clock3} label="Duration" value="5 days" />
                <QuickFact icon={MapPin} label="Format" value="Online · Live" />
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-blue-950/20">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/workshop brochures/neurogati-winter-school-2026-promo.jpg"
                  alt="Neurogati Winter School 2026, December 7 to 11, online, live and interactive"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="abstracts" className="scroll-mt-28 py-20 md:py-28 lg:pl-64">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-background to-blue-500/10 shadow-xl">
            <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="flex flex-col justify-center bg-slate-950 p-8 text-white sm:p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-slate-950">
                  <FileText className="h-7 w-7" />
                </div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">Call for abstracts</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Abstract submissions are open</h2>
                <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Submission deadline</p>
                  <p className="mt-2 text-2xl font-black text-amber-300">October 25, 2026</p>
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:p-12">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Submit your abstract for the Neurogati Winter School 2026, a five-day intensive online programme introducing participants to neural modelling, brain dynamics and data-driven neuroscience.
                </p>
                <Button asChild size="lg" className="mt-8 rounded-full px-8 font-bold">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfJ62KpiuAkiDa9GuXvm4MQXKXmfqnbJpW_uZfFr6Lv7kr3wg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Submit Your Abstract
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <div className="mt-8 flex items-start gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                  <p>
                    For questions about abstract submission or the programme, contact{" "}
                    <a href="mailto:workshops@neurogati.com" className="font-bold text-foreground hover:text-blue-500">
                      workshops@neurogati.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programme" className="scroll-mt-28 pb-20 md:pb-28 lg:pl-64">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
              <Brain className="h-7 w-7" />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-500">Programme overview</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Five days of ideas across brain science</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              The detailed themes, daily schedule, session titles, participation information and call for abstracts are currently being prepared. More information will be announced soon.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 md:py-28 lg:pl-64">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div id="committee" className="mb-20 scroll-mt-28">
            <div className="mb-12 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
                <Microscope className="h-7 w-7" />
              </div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-500">Academic guidance</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Scientific Committee</h2>
            </div>

            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {scientificCommittee.map((member) => (
                <Card
                  key={member.name}
                  className="border-border bg-background/80 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 h-1.5 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <h3 className="text-lg font-black tracking-tight">{member.name}</h3>
                    <p className="mt-2 text-sm font-semibold text-muted-foreground">{member.affiliation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div id="speakers" className="scroll-mt-28">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-blue-500">
                  <Users className="h-5 w-5" />
                  Speakers
                </div>
                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Speakers</h2>
              </div>
              <p className="max-w-xl text-muted-foreground md:text-right">
                Session titles and additional programme details will be added soon.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {speakers.map((speaker, index) => (
                <Card
                  key={speaker.name}
                  className="group overflow-hidden border-border bg-background/80 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl"
                >
                  <CardContent className="p-6">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-black text-white shadow-lg shadow-blue-500/20">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-black tracking-tight">{speaker.name}</h3>
                    <p className="mt-2 font-semibold text-blue-600 dark:text-blue-300">{speaker.affiliation}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{speaker.focus}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="more-information" className="scroll-mt-28 py-20 md:py-28 lg:pl-64">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-amber-400/10 p-8 text-center sm:p-12">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-500">Coming soon</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">More programme information is on the way</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Please check back for the detailed schedule, speaker sessions, eligibility, fees, registration and abstract-submission information.
            </p>
            <Button asChild className="mt-8 rounded-full px-8 font-bold">
              <Link href="/workshops">Explore other learning programmes</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function QuickFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4 backdrop-blur-sm">
      <Icon className="mb-3 h-5 w-5 text-blue-500" />
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  )
}
