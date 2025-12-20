import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  BookOpen,
  Users,
  Code,
  Lightbulb,
  Calendar,
  DollarSign,
  Mail,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
} from "lucide-react"

export default function ProgramPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">
      
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold tracking-tight">NEUROGATI</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            {["Overview", "Curriculum", "Research", "Instructor"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-slate-400 hover:text-cyan-400 transition"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
            <a href="#apply">Apply Now</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-white/10 text-cyan-300 border-white/10">
              <Calendar className="mr-1 h-3 w-3" />
              Starting January 1st, 2026
            </Badge>

            <h1 className="mb-6 text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              5-Month Online Research Training in Computational Neuroscience
            </h1>

            <p className="mb-8 text-lg md:text-xl text-slate-400">
              A mentorship-driven program introducing modern computational neuroscience, from brain modeling to
              biologically inspired deep networks and research publication.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
                <a href="#apply">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                <a href="#curriculum">View Curriculum</a>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-400">
              <Stat icon={Users} label="1hr/week with mentor" />
              <Stat icon={BookOpen} label="10 weeks coursework" />
              <Stat icon={Lightbulb} label="10 weeks research" />
            </div>
          </div>
        </div>
      </section>

      {/* Reusable Section Wrapper */}
      {[
        { id: "overview", title: "Program Vision" },
        { id: "curriculum", title: "Phase 1: Coursework", muted: true },
        { id: "research", title: "Phase 2: Research Project Track" },
      ].map((sec) => (
        <section
          key={sec.id}
          id={sec.id}
          className={`${sec.muted ? "bg-white/5" : ""} border-t border-white/10`}
        >
          <div className="container mx-auto px-4 py-20">
            <h2 className="text-center text-3xl md:text-4xl font-semibold mb-6">
              {sec.title}
            </h2>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section id="apply" className="border-t border-white/10">
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-slate-400 mb-8">
            Course starts on <strong>January 1st, 2026</strong> at 20:30 IST
          </p>
          <Button size="lg" className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
            <a href="https://forms.gle/neurogati-apply" target="_blank">
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-cyan-400" />
            <span className="font-semibold">NEUROGATI</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2026 Neurogati Pvt Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

/* Small helper */
function Stat({ icon: Icon, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-cyan-400" />
      <span>{label}</span>
    </div>
  )
}
