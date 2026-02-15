"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  Mail,
  CheckCircle2,
  ArrowRight,
  Clock,
  Award,
  Laptop,
  History,
  Eye,
  Lightbulb,
  GraduationCap,
  DollarSign,
} from "lucide-react"

export default function DemystifyingTheBrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">
      {/* Header/Nav - Logo & Title Grouped and Bolder */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-90 transition group"
          >
            <Image
              src="/bg_just_logo.png"
              alt="Neurogati Logo"
              width={56}
              height={56}
              className="rounded-sm brightness-125 group-hover:scale-105 transition-transform"
            />
            <span className="text-2xl font-black tracking-tighter text-[#1c82c2] dark:text-[#38bdf8]">
              NEUROGATI
            </span>
          </Link>

          <nav className="hidden gap-8 md:flex items-center">
            <a href="#overview" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Overview</a>
            <a href="#schedule" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Schedule</a>
            <a href="#dates" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Dates</a>
            <a href="#fees" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Fees</a>
            <a href="#instructor" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Instructor</a>
            <Link href="/workshops" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">
              View All Workshops
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black uppercase tracking-tight hover:from-cyan-500 hover:to-blue-600 rounded-full px-6"
              asChild
            >
              <a href="https://forms.gle/6RALWL8fHZJsasZ27" target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Fixed Height and Clipping */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]" />
        <div className="container mx-auto px-6 py-24 md:py-32 relative">
          <div className="mx-auto max-w-5xl text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 font-bold px-4 py-1" variant="secondary">
              <Calendar className="mr-2 h-4 w-4 inline text-cyan-400" /> Jan 23rd - 25th, 2026
            </Badge>
            
            <h1 className="mb-8 text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Demystifying <br className="hidden md:block" /> the Brain
            </h1>
            
            <p className="mb-10 text-pretty text-lg text-slate-300 md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
              A journey through the mathematics and principles behind brain function, from evolutionary origins to the
              mysteries of consciousness.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button
                size="lg"
                className="h-14 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black rounded-full px-10 text-lg hover:from-cyan-500 hover:to-blue-600 shadow-lg shadow-cyan-500/20"
                asChild
              >
                <a href="https://forms.gle/6RALWL8fHZJsasZ27" target="_blank" rel="noopener noreferrer">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-white/20 text-white hover:bg-white/10 bg-transparent rounded-full px-10 font-bold text-lg"
                asChild
              >
                <a href="#schedule">View Schedule</a>
              </Button>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-10 text-xs font-black uppercase tracking-[0.2em] text-cyan-400/80">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5" />
                <span>3 Days Intensive</span>
              </div>
              <div className="flex items-center gap-3">
                <Laptop className="h-5 w-5" />
                <span>Online Format</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5" />
                <span>E-Certificate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Workshop - Increased Card Text Size */}
      <section id="overview" className="border-b border-white/10 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-4xl md:text-6xl font-black tracking-tighter">About the Workshop</h2>
            <p className="mb-16 text-center text-lg md:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
              Key ideas from modern computational neuroscience, accessible to students from biology, medicine,
              engineering, and computer science.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <LearningCard 
                icon={<History className="h-12 w-12 text-cyan-400" />}
                title="History"
                description="From origins to the modern neuroscience era, exploring the pioneers of brain mapping."
              />
              <LearningCard 
                icon={<Eye className="h-12 w-12 text-cyan-400" />}
                title="Systems"
                description="Visual and emotional pathways, understanding how the brain processes sensory reality."
              />
              <LearningCard 
                icon={<Lightbulb className="h-12 w-12 text-cyan-400" />}
                title="Consciousness"
                description="Modern theories of mind and self, bridging the gap between neurons and experience."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Schedule - Detailed Scaling */}
      <section id="schedule" className="border-b border-white/10 bg-white/[0.02] py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-black md:text-5xl tracking-tighter">Workshop Schedule</h2>
              <p className="text-lg md:text-xl text-slate-400 font-medium">Nine comprehensive lectures over three days</p>
            </div>

            <div className="grid gap-8">
              <ScheduleDay number="1" title="Day 1 - Fundamentals">
                <ScheduleItem title="Lecture 1: Introduction & History" description="Major scientific developments that shaped modern neuroscience, spanning biology, psychology, pharmacology, and computation." />
                <ScheduleItem title="Lecture 2: The Brain's Shape" description="How evolutionary principles like the 'Save Wire Principle' shaped brain anatomy from simple nerve nets to complex mammalian brains." />
                <ScheduleItem title="Lecture 3: Neural Signaling" description="Neuron structure, action potentials, and synaptic transmission forming the basis of neural communication." />
              </ScheduleDay>

              <ScheduleDay number="2" title="Day 2 - Systems">
                <ScheduleItem title="Lecture 4: System Organization" description="How cortical, subcortical, spinal, and peripheral systems are structured and interconnected to generate behavior." />
                <ScheduleItem title="Lecture 5: Pathways of Light" description="Visual pathway from eye to cortex and how the brain processes objects, motion, and color." />
                <ScheduleItem title="Lecture 6: Topographic Maps" description="How sensory and motor information is represented through organized cortical maps and self-organization." />
              </ScheduleDay>

              <ScheduleDay number="3" title="Day 3 - Consciousness">
                <ScheduleItem title="Lecture 7: Circuits of Emotion" description="Neural bases of emotion, focusing on the limbic system, salience networks, and mirror neuron circuits." />
                <ScheduleItem title="Lecture 8: Consciousness & Mind" description="Key ideas about sensory awareness, perceptual paradoxes, and major theories of consciousness." />
                <ScheduleItem title="Lecture 9: Altered Body Ownership" description="How the brain constructs reality and how plasticity generates altered body ownership." />
              </ScheduleDay>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section id="dates" className="border-b border-white/10 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="mb-12 text-3xl font-black md:text-5xl tracking-tighter">Important Dates</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <DateCard icon={<Calendar className="h-10 w-10 text-cyan-400" />} label="Application Deadline" date="07 Jan 2026" />
              <DateCard icon={<CheckCircle2 className="h-10 w-10 text-cyan-400" />} label="Selection Results" date="08 Jan 2026" />
              <DateCard icon={<DollarSign className="h-10 w-10 text-cyan-400" />} label="Fee Payment" date="15 Jan 2026" />
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" className="border-b border-white/10 bg-white/[0.02] py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-black md:text-5xl tracking-tighter">Fee Details</h2>
            <p className="mb-12 text-center text-lg text-slate-400 font-medium">Affordable pricing for students and professionals</p>
            <div className="grid gap-8 md:grid-cols-3">
              <FeeCard tier="UG Students" price="₹2,500" />
              <FeeCard tier="PG Students" price="₹3,000" highlighted />
              <FeeCard tier="Professionals" price="₹3,500" />
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Card with Fixed Boldness */}
      <section id="instructor" className="border-b border-white/10 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-black md:text-5xl tracking-tighter">Lead Instructor</h2>
            <Card className="bg-white/5 backdrop-blur border border-white/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center p-10">
                    <GraduationCap className="h-24 w-24 text-white opacity-90" />
                  </div>
                  <div className="p-10 flex-1">
                    <h3 className="text-2xl font-black text-white mb-1">Prof. V. Srinivasa Chakravarthy</h3>
                    <p className="text-cyan-400 font-bold mb-6 tracking-wide">IIT MADRAS</p>
                    <p className="text-[17px] text-slate-300 font-medium leading-relaxed mb-6">
                      Renowned researcher heading multiple neuroscience labs at IIT Madras and a recipient of both
                      Research and Teaching Excellence awards.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      <InstructorHighlight text="Author of two neuroscience books" />
                      <InstructorHighlight text="Leading computational neuroscientist" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/5 py-12">
        <div className="container mx-auto px-6 text-center">
            <h3 className="mb-2 text-xl font-black text-white tracking-tight">NEUROGATI LABORATORY</h3>
            <div className="text-sm text-slate-500 font-bold space-y-1">
              <p>Indian Institute of Technology, Madras | Chennai 600036</p>
              <p>workshops@neurogati.com</p>
            </div>
            <p className="mt-10 text-[10px] font-black text-slate-600 uppercase tracking-widest">© 2026 NEUROGATI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

/* --- REUSABLE COMPONENTS --- */

function LearningCard({ icon, title, description }: any) {
  return (
    <Card className="bg-white/[0.03] backdrop-blur border border-white/10 hover:border-cyan-400/40 transition-all hover:-translate-y-2">
      <CardContent className="pt-10 pb-8 px-8">
        <div className="mb-6">{icon}</div>
        <h3 className="mb-4 text-2xl font-black text-white leading-tight tracking-tight">{title}</h3>
        <p className="text-[17px] text-slate-400 font-medium leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

function ScheduleDay({ number, title, children }: any) {
  return (
    <Card className="bg-white/5 border border-white/10 overflow-hidden">
      <div className="flex items-stretch">
        <div className="w-16 md:w-20 bg-cyan-400/10 flex items-center justify-center border-r border-white/5">
          <span className="text-3xl font-black text-cyan-400">{number}</span>
        </div>
        <div className="p-8 flex-1">
          <h3 className="text-2xl font-black text-white mb-8 tracking-tight">{title}</h3>
          <div className="space-y-8">{children}</div>
        </div>
      </div>
    </Card>
  )
}

function ScheduleItem({ title, description }: any) {
  return (
    <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
      <p className="text-[17px] font-black text-cyan-400 mb-2">{title}</p>
      <p className="text-[17px] font-medium text-slate-300 leading-relaxed">{description}</p>
    </div>
  )
}

function DateCard({ icon, label, date }: any) {
  return (
    <Card className="bg-white/5 border border-white/10 p-10 hover:bg-white/[0.07] transition-colors">
      <div className="flex flex-col items-center">
        <div className="mb-6">{icon}</div>
        <h3 className="mb-1 text-sm font-black uppercase tracking-widest text-slate-500">{label}</h3>
        <p className="text-3xl font-black text-white">{date}</p>
      </div>
    </Card>
  )
}

function FeeCard({ tier, price, highlighted = false }: any) {
  return (
    <Card className={`p-10 text-center transition-all ${highlighted ? 'border-cyan-400/50 bg-white/10 scale-105 shadow-2xl' : 'border-white/10 bg-white/5 hover:border-cyan-400/30'}`}>
      {highlighted && <Badge className="mb-6 bg-cyan-400 text-black font-black uppercase">Most Popular</Badge>}
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-2">{tier}</h3>
      <p className="text-5xl font-black text-white mb-1">{price}</p>
      <p className="text-xs font-black text-cyan-400/60 tracking-widest uppercase mt-2">INR</p>
    </Card>
  )
}

function InstructorHighlight({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-[17px] font-medium text-slate-300">
      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0" />
      {text}
    </div>
  )
}