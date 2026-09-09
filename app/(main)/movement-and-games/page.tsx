import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Activity, ArrowRight, BarChart3, Clock, Gamepad2, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Movement & Games | Neurogati",
  description:
    "Explore Neurogati's movement and gaming platforms, including Qumon-PD, rehabilitation games, CP Clinic, and movement-analysis systems.",
}

const products = [
  {
    title: "Qumon-PD",
    eyebrow: "Clinical monitoring",
    description:
      "AI-assisted quantitative monitoring for Parkinson's disease using movement, speech, tremor, and decision-making markers.",
    href: "/neurodiagnostics",
    cta: "View Qumon-PD",
    icon: Activity,
    image: "/Quamon-Pd.png",
    badge: "Available",
  },
  {
    title: "Gaming Platform",
    eyebrow: "Interactive rehabilitation",
    description:
      "Neurogati's game-based platform for movement, cognition, engagement, and rehabilitation-oriented activities.",
    href: "/gamingcategories",
    cta: "Open Gaming Platform",
    icon: Gamepad2,
    image: "/games-rehab-thumb-v2.png",
    badge: "Available",
  },
  {
    title: "CP Clinic",
    eyebrow: "Digital gait analysis",
    description:
      "A research-driven CP gait-analysis and longitudinal motor-monitoring platform for clinical and home environments.",
    href: "/cp-clinic",
    cta: "View CP Platform",
    icon: HeartPulse,
    image: null,
    badge: "Coming soon",
  },
  {
    title: "Movement Platform",
    eyebrow: "Movement intelligence",
    description:
      "A broader movement-analysis platform for assessment, progress tracking, and data-driven rehabilitation support.",
    href: "/movement-platform",
    cta: "View Coming Soon",
    icon: BarChart3,
    image: null,
    badge: "Coming soon",
  },
]

export default function MovementAndGamesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border bg-muted/30 pb-20 pt-48">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(#1c82c2 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <Badge className="mb-6 border-blue-500/20 bg-blue-500/10 px-4 py-1 font-black uppercase tracking-widest text-[#1c82c2]">
            Movement intelligence and interactive systems
          </Badge>
          <h1 className="mb-8 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text py-2 text-4xl font-black leading-[1.1] tracking-tighter text-transparent md:text-7xl">
            Movement & Games
          </h1>
          <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
            Neurogati builds clinical and interactive platforms that connect movement assessment,
            rehabilitation games, and data-driven neurological care.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">Platforms in this vertical</h2>
          <p className="leading-relaxed text-muted-foreground">
            This section brings together Neurogati's movement-focused tools, clinical monitoring products,
            therapy-support systems, and game-based rehabilitation experiences.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          {products.map((product) => {
            const Icon = product.icon
            return (
              <Link key={product.title} href={product.href} className="group">
                <Card className="flex h-full flex-col overflow-hidden rounded-3xl border-border/50 bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-muted">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-violet-500/10" />
                    )}
                    <div className="absolute left-5 top-5 rounded-full border border-border bg-background/85 px-3 py-1 text-xs font-black uppercase tracking-widest backdrop-blur">
                      {product.badge}
                    </div>
                    <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/85 backdrop-blur">
                      <Icon className="h-6 w-6 text-[#1c82c2]" aria-hidden="true" />
                    </div>
                    {!product.image && (
                      <Icon className="relative h-24 w-24 text-[#1c82c2]/30" strokeWidth={1.2} aria-hidden="true" />
                    )}
                  </div>

                  <CardHeader>
                    <p className="text-xs font-black uppercase tracking-widest text-[#1c82c2]">{product.eyebrow}</p>
                    <CardTitle className="text-3xl font-black tracking-tight">{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="mb-8 flex-1 text-[17px] font-medium leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#1c82c2] transition-all group-hover:gap-3">
                      {product.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="rounded-[40px] border border-border bg-[#092f44] p-10 text-white md:p-16">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-amber-300">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Product enquiries
              </p>
              <h2 className="text-3xl font-black md:text-4xl">Discuss a movement or gaming deployment</h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/75">
                Contact Neurogati for product demos, clinical collaborations, institutional pilots, or research partnerships.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full bg-white px-8 font-black text-[#092f44] hover:bg-sky-100">
              <Link href="/contact">
                Contact Neurogati
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
