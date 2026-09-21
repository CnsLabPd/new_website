import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Brain,
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

export default function WinterSchool2026Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border pt-36 pb-20 md:pt-44 md:pb-28">
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

      <section className="py-20 md:py-28">
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

      <section className="border-y border-border bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>

      <section className="py-20 md:py-28">
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
