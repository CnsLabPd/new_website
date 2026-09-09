import type { Metadata } from "next"
import Link from "next/link"
import {
  Activity,
  ArrowRight,
  BarChart3,
  Camera,
  ClipboardList,
  Home,
  Hospital,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "CP Clinic Platform | Neurogati",
  description:
    "Neurogati's CP Clinic Platform is a research-driven digital gait-analysis and longitudinal motor-monitoring system for cerebral palsy and movement-related conditions.",
}

const measurementAreas = [
  "Body alignment",
  "Trunk movement",
  "Pelvic motion",
  "Lower-limb kinematics",
  "Step characteristics",
  "Symmetry and variability",
]

const workflow = [
  {
    icon: Camera,
    title: "Capture walking videos",
    description:
      "Use compatible camera or smartphone recordings from frontal and sagittal views with standardized recording guidance.",
  },
  {
    icon: Activity,
    title: "Extract movement parameters",
    description:
      "Computer-vision-based pose estimation and computational gait analysis convert video into clinically meaningful movement information.",
  },
  {
    icon: LineChart,
    title: "Track change over time",
    description:
      "Longitudinal dashboards, numerical measurements, visual plots, and structured reports help compare gait across visits or home submissions.",
  },
]

export default function CpClinicPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border bg-muted/30 pb-24 pt-48">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(#1c82c2 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-5xl text-center">
            <Badge className="mb-6 border-amber-500/20 bg-amber-500/10 px-4 py-1 font-black uppercase tracking-widest text-amber-500">
              Coming soon
            </Badge>
            <h1 className="mb-8 text-4xl font-black leading-[1.1] tracking-tighter md:text-7xl">
              CP Clinic Platform
            </h1>
            <p className="mx-auto max-w-4xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
              An advanced, research-driven digital gait-analysis and longitudinal motor-monitoring
              system for children and individuals with cerebral palsy and other movement-related conditions.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-blue-600 px-8 font-black text-white hover:bg-blue-700">
                <Link href="/contact">
                  Enquire About CP Platform
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-border px-8 font-black hover:bg-muted">
                <Link href="/movement-and-games">Back to Movement & Games</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-[#1c82c2]">What it does</p>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              Accessible video-based gait analysis across clinic and home.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
            <p>
              The platform uses ordinary video recordings captured with a compatible camera or
              smartphone. From frontal and sagittal views, it applies human pose estimation and
              computational gait analysis to extract movement information relevant to understanding
              how a person walks over time.
            </p>
            <p>
              It is designed for repeatable assessments, longitudinal comparison, structured reports,
              rehabilitation progress tracking, and remote review when home monitoring is part of an
              appropriate clinical or research pathway.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-[#1c82c2]">Movement signals</p>
            <h2 className="text-3xl font-black md:text-5xl">Parameters the platform is designed to support</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {measurementAreas.map((area) => (
              <Card key={area} className="rounded-2xl border-border bg-card">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                    <BarChart3 className="h-5 w-5 text-[#1c82c2]" aria-hidden="true" />
                  </div>
                  <p className="font-bold">{area}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-black uppercase tracking-widest text-[#1c82c2]">Workflow</p>
          <h2 className="text-3xl font-black md:text-5xl">From video capture to longitudinal insight</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {workflow.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="rounded-3xl border-border bg-card">
              <CardHeader>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1c82c2]/10">
                  <Icon className="h-7 w-7 text-[#1c82c2]" aria-hidden="true" />
                </div>
                <CardTitle className="text-2xl font-black">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-background py-20 md:py-24">
        <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-border bg-card">
            <CardHeader>
              <Hospital className="mb-5 h-10 w-10 text-[#1c82c2]" aria-hidden="true" />
              <CardTitle className="text-3xl font-black">Clinical environment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 leading-7 text-muted-foreground">
              <p>
                Physiotherapists, rehabilitation specialists, clinicians, and researchers can use the
                platform as a structured decision-support and documentation tool for repeatable gait
                assessments.
              </p>
              <p>
                It supports comparison across visits, review of plots and summaries, longitudinal
                patient records, rehabilitation planning, and research evaluation.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border bg-card">
            <CardHeader>
              <Home className="mb-5 h-10 w-10 text-[#1c82c2]" aria-hidden="true" />
              <CardTitle className="text-3xl font-black">Home environment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 leading-7 text-muted-foreground">
              <p>
                Patients, parents, or caregivers can record gait videos at appropriate intervals using
                standardized recording guidance and securely submit them for analysis.
              </p>
              <p>
                Home recordings can help clinicians review walking patterns, functional movement, and
                rehabilitation progress between scheduled clinical visits.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="rounded-[40px] border border-border bg-[#092f44] p-10 text-white md:p-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <ShieldCheck className="mb-6 h-10 w-10 text-amber-300" aria-hidden="true" />
              <h2 className="text-3xl font-black md:text-4xl">Human-in-the-loop decision support</h2>
            </div>
            <div className="space-y-5 leading-8 text-white/78">
              <p>
                The CP Clinic Platform is being developed as a clinical and research decision-support
                system, not as an autonomous diagnostic system.
              </p>
              <p>
                Computer-generated measurements, classifications, trends, and interpretations are
                intended to supplement professional assessment. They should not independently establish
                a diagnosis, prescribe treatment, or replace examination by a qualified healthcare professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <Card className="rounded-3xl border-border bg-card">
          <CardContent className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#1c82c2]">
                <Users className="h-4 w-4" aria-hidden="true" />
                Clinical, home, and research pathways
              </p>
              <h2 className="text-3xl font-black">Interested in the CP Clinic Platform?</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Contact Neurogati to discuss clinical collaborations, research evaluations, pilot deployments,
                or structured home-monitoring workflows.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full bg-blue-600 px-8 font-black text-white hover:bg-blue-700">
              <Link href="/contact">
                Contact Neurogati
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
