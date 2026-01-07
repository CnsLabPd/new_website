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
  Zap,
  Lightbulb,
  GraduationCap,
  DollarSign,
} from "lucide-react"

export default function DemystifyingTheBrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">
      <header className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <a
            href="https://neurogati.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <Image
              src="/images/bg_just_logo.png"
              alt="Neurogati Logo"
              width={32}
              height={32}
              className="rounded-sm brightness-125"
            />
            <span className="text-xl font-bold">NEUROGATI</span>
          </a>
          <nav className="hidden gap-6 md:flex">
            <a href="#overview" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Overview
            </a>
            <a href="#schedule" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Schedule
            </a>
            <a href="#dates" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Important Dates
            </a>
            <a href="#fees" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Fees
            </a>
            <a href="#instructor" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Instructor
            </a>
            <Link href="/workshops" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              View All Workshops
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-500 hover:to-blue-600"
              asChild
            >
              <a href="https://forms.gle/6RALWL8fHZJsasZ27" target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-white/10 text-white border-white/20" variant="secondary">
              <Calendar className="mr-1 h-3 w-3" />
              Jan 23rd - 25th, 2026
            </Badge>
            <h1 className="mb-6 text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Demystifying the Brain
            </h1>
            <p className="mb-8 text-pretty text-lg text-slate-300 md:text-xl">
              A journey through the mathematics and principles behind brain function, from evolutionary origins to the
              mysteries of consciousness.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-500 hover:to-blue-600"
                asChild
              >
                <a href="https://forms.gle/6RALWL8fHZJsasZ27" target="_blank" rel="noopener noreferrer">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <a href="#schedule">View Schedule</a>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-cyan-400" />
                <span className="text-slate-300">3 days intensive</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop className="h-5 w-5 text-cyan-400" />
                <span className="text-slate-300">Online format</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-cyan-400" />
                <span className="text-slate-300">E-certificate provided</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="overview" className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">About the Workshop</h2>
            <p className="mb-12 text-balance text-center text-lg text-slate-300">
              Key ideas from modern computational neuroscience, accessible to students from biology, medicine,
              engineering, and computer science
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <History className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">History</h3>
                  <p className="text-sm text-slate-300">From origins to modern neuroscience era</p>
                </CardContent>
              </Card>
              {/* <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Zap className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">Signaling</h3>
                  <p className="text-sm text-slate-300">Neural dynamics and communication</p>
                </CardContent>
              </Card> */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Eye className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">Systems</h3>
                  <p className="text-sm text-slate-300">Visual and emotional pathways</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Lightbulb className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">Consciousness</h3>
                  <p className="text-sm text-slate-300">Theories of mind and self</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="schedule" className="border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Workshop Schedule</h2>
            <p className="mb-12 text-balance text-center text-lg text-slate-300">
              Nine comprehensive lectures over three days
            </p>

            <div className="grid gap-6">
              {/* Day 1 */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">1</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Day 1 - Fundamentals</h3>
                        <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/20">Scientific Origins</Badge>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Lecture 1: Introduction & History</p>
                          <p className="text-slate-300">
                            Major scientific developments that shaped modern neuroscience, spanning biology, psychology,
                            pharmacology, and computation.
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Lecture 2: Understanding the Brain's Shape</p>
                          <p className="text-slate-300">
                            How evolutionary principles like the "Save Wire Principle" shaped brain anatomy from simple
                            nerve nets to complex mammalian brains.
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Lecture 3: Neurons & Neural Signaling</p>
                          <p className="text-slate-300">
                            Neuron structure, membrane potentials, action potentials, and synaptic transmission forming
                            the basis of neural communication.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day 2 */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-400/10">
                      <span className="text-xl font-bold text-blue-400">2</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Day 2 - Systems in the Brain</h3>
                        <Badge className="bg-blue-400/10 text-blue-400 border-blue-400/20">Architecture & Vision</Badge>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Lecture 4: Organization of the Nervous System</p>
                          <p className="text-slate-300">
                            How cortical, subcortical, spinal, and peripheral systems are structured and interconnected
                            to generate behavior.
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">
                            Lecture 5: Pathways of Light – The Visual System
                          </p>
                          <p className="text-slate-300">
                            Visual pathway from eye to cortex and how the brain processes objects, motion, and color
                            through dorsal and ventral streams.
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">
                            Lecture 6: Maps Everywhere – Topographic Brain Maps
                          </p>
                          <p className="text-slate-300">
                            How sensory and motor information is represented through organized cortical maps and
                            principles behind their self-organization.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day 3 */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-400/10">
                      <span className="text-xl font-bold text-violet-400">3</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Day 3 - Emotion & Consciousness</h3>
                        <Badge className="bg-violet-400/10 text-violet-400 border-violet-400/20">Mind & Self</Badge>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Lecture 7: Circuits of Emotion</p>
                          <p className="text-slate-300">
                            Neural bases of emotion, focusing on the limbic system, salience networks, and mirror neuron
                            circuits.
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Lecture 8: Consciousness & the Brain</p>
                          <p className="text-slate-300">
                            Key ideas about sensory awareness, perceptual paradoxes, forms of selfhood, and major
                            theories of consciousness.
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Lecture 9: When the Brain Misleads the Mind</p>
                          <p className="text-slate-300">
                            How the brain constructs reality and how miswiring, plasticity, and predictive processing
                            generate hallucinations and altered body ownership.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section id="dates" className="border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Important Dates</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 transition">
                <CardContent className="pt-6 text-center">
                  <Calendar className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Application Deadline</h3>
                  <p className="text-2xl font-bold text-cyan-400">07 Jan 2026</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 transition">
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Selection Results</h3>
                  <p className="text-2xl font-bold text-cyan-400">08 Jan 2026</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 transition">
                <CardContent className="pt-6 text-center">
                  <DollarSign className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Fee Payment Deadline</h3>
                  <p className="text-2xl font-bold text-cyan-400">15 Jan 2026</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" className="border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Fee Details</h2>
            <p className="mb-12 text-balance text-center text-lg text-slate-300">
              Affordable pricing for students and professionals
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6 text-center">
                  <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20" variant="secondary">
                    UG Students
                  </Badge>
                  <p className="mb-2 text-4xl font-bold text-white">₹2,500</p>
                  <p className="text-sm text-slate-400">INR</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-cyan-400/40 hover:shadow-xl transition relative">
                {/* <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-0">Most Popular</Badge>
                </div> */}
                <CardContent className="pt-6 text-center">
                  <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20" variant="secondary">
                    PG Students
                  </Badge>
                  <p className="mb-2 text-4xl font-bold text-white">₹3,000</p>
                  <p className="text-sm text-slate-400">INR</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6 text-center">
                  <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20" variant="secondary">
                    Professionals
                  </Badge>
                  <p className="mb-2 text-4xl font-bold text-white">₹3,500</p>
                  <p className="text-sm text-slate-400">INR</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section id="instructor" className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Lead Instructor</h2>
            <Card className="bg-white/5 backdrop-blur border border-white/10">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-cyan-400/10 shrink-0 mx-auto md:mx-0">
                    <GraduationCap className="h-16 w-16 text-cyan-400" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">Prof. V. Srinivasa Chakravarthy</h3>
                    <p className="text-cyan-400 mb-4">IIT Madras</p>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      Renowned researcher heading multiple neuroscience labs at IIT Madras and a recipient of both
                      Research and Teaching Excellence awards.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                        Author of two neuroscience books
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                        Creator of the Bharati unified script
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                        Leading computational neuroscientist
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                        IIT Madras Research Head
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-cyan-400" />
                <a
                  href="mailto:contact@neurogati.com"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition"
                >
                  workshops@neurogati.com
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                <Link href="/" className="hover:text-cyan-400 transition">
                  Research Program
                </Link>
                <Link href="/workshops/brain-modeling" className="hover:text-cyan-400 transition">
                  Brain Modeling Workshop
                </Link>
                <Link href="/workshops" className="hover:text-cyan-400 transition">
                  All Workshops
                </Link>
              </div>
              <p className="text-xs text-slate-600">© 2025 NEUROGATI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
