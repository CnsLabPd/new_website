import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Compass,
  Hand,
  Languages,
  Puzzle,
  School,
  Shapes,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const AKSHARA_URL = "https://akshara-neuroshiksha.neurogati.com/"

export const metadata: Metadata = {
  title: "Neuroshiksha | Foundational Learning by Neurogati",
  description:
    "Explore Neuroshiksha, Neurogati's education umbrella for child-focused foundational learning platforms such as Akshara.",
}

const learningAreas = [
  {
    icon: Languages,
    title: "Language learning",
    description:
      "English and Tamil alphabet learning with visual recognition, writing practice, and interactive exercises.",
    accent: "text-cyan-500",
    border: "border-cyan-500/40",
  },
  {
    icon: Shapes,
    title: "Math adventures",
    description: "Counting, addition, and early numerical thinking taught through playful activities and games.",
    accent: "text-amber-500",
    border: "border-amber-500/40",
  },
  {
    icon: Puzzle,
    title: "Brain puzzles",
    description: "Engaging puzzles that support attention, problem-solving, reasoning, and curiosity.",
    accent: "text-violet-500",
    border: "border-violet-500/40",
  },
  {
    icon: Compass,
    title: "Discover our world",
    description: "Activities around the body, family, nature, society, environment, Earth, and space.",
    accent: "text-emerald-500",
    border: "border-emerald-500/40",
  },
  {
    icon: Hand,
    title: "Skills for independence",
    description:
      "Practical routines, communication, self-care, and safety skills that build everyday confidence.",
    accent: "text-rose-500",
    border: "border-rose-500/40",
  },
]

export default function NeuroshikshaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto grid min-h-[74svh] items-center gap-12 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
          <div className="max-w-3xl">
            <Badge className="mb-5 border-violet-500/20 bg-violet-500/10 px-4 py-1 font-black uppercase tracking-widest text-violet-500">
              Neurogati Education
            </Badge>
            <h1 className="text-5xl font-black leading-tight md:text-7xl">Neuroshiksha</h1>
            <p className="mt-5 text-2xl font-semibold leading-snug text-foreground/85 md:text-3xl">
              A growing family of child-focused foundational learning platforms.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Neuroshiksha is Neurogati's umbrella for early learning, special education support,
              and child-friendly digital learning experiences. Akshara is the first platform in this
              ecosystem, designed for children aged 3-10.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={AKSHARA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#116da5] px-6 py-3 font-bold text-white transition-colors hover:bg-[#0d5a89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c82c2] focus-visible:ring-offset-2"
              >
                Open Akshara Platform
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <Button asChild variant="outline" className="min-h-12 rounded-lg px-6 py-3 font-bold">
                <Link href="#akshara">
                  View Akshara
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
              <div className="relative aspect-[4/5] bg-muted">
                <Image
                  src="/images/akshara-title-card-no-qr.png"
                  alt="Akshara foundational learning platform artwork"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto grid gap-10 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:px-12">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-[#1c82c2]">The purpose</p>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              One umbrella for many child-learning platforms.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
            <p>
              Neuroshiksha is structured so Neurogati can add multiple child-focused learning
              products over time, each serving a specific learning need or learner group.
            </p>
            <p>
              The first platform, Akshara, brings together foundational learning and child-friendly
              interaction for mainstream and special education contexts.
            </p>
          </div>
        </div>
      </section>

      <section id="akshara" className="scroll-mt-24 border-y border-border bg-muted/30 py-20 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase text-[#1c82c2]">Current platform</p>
            <h2 className="text-3xl font-black md:text-5xl">Akshara: My School in My Pocket</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Akshara makes early learning enjoyable and adaptive across language, mathematics,
              puzzles, sensorimotor skills, our world, and life skills.
            </p>
          </div>

          <div className="grid border-y border-border md:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-border">
            {learningAreas.map(({ icon: Icon, title, description, accent, border }) => (
              <article key={title} className={`border-t-4 ${border} px-1 py-8 md:px-6`}>
                <Icon className={`mb-6 h-8 w-8 ${accent}`} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-1">
              <p className="mb-3 text-sm font-bold uppercase text-[#1c82c2]">Who it serves</p>
              <h2 className="text-3xl font-black md:text-4xl">Built for children, useful for adults.</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3 md:col-span-2">
              {[
                {
                  icon: School,
                  title: "Young learners",
                  body: "Children aged 3-10 building early language, numbers, and discovery skills.",
                },
                {
                  icon: Sparkles,
                  title: "Special education",
                  body: "Structured practice for children who need repeatable, engaging learning support.",
                },
                {
                  icon: Brain,
                  title: "Parents and educators",
                  body: "A learning environment that makes progress easier to observe and guide.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <Card key={title} className="rounded-lg border-border bg-card p-6">
                  <Icon className="mb-5 h-7 w-7 text-[#1c82c2]" strokeWidth={1.8} aria-hidden="true" />
                  <CardHeader className="p-0">
                    <CardTitle className="text-base font-bold">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-[#092f44] py-16 text-white md:py-20">
        <div className="container mx-auto flex flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center lg:px-12">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase text-amber-300">Start learning</p>
            <h2 className="text-3xl font-black md:text-4xl">Enter the Akshara platform</h2>
            <p className="mt-4 leading-7 text-white/75">
              Visit Akshara for the current learning experience, sign-up flow, and platform access.
            </p>
          </div>
          <a
            href={AKSHARA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-[#092f44] transition-colors hover:bg-sky-100"
          >
            Visit Akshara
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  )
}
