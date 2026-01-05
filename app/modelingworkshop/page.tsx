"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Brain,
  BookOpen,
  Users,
  Code,
  Calendar,
  DollarSign,
  Mail,
  CheckCircle2,
  ArrowRight,
  Clock,
  Award,
  Laptop,
} from "lucide-react"

export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <img src="/images/bg_just_logo.png" alt="Neurogati Logo" className="h-16 w-16 object-contain" />
          <a
            href="https://neurogati.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <span className="text-xl font-bold">NEUROGATI</span>
          </a>
          <nav className="hidden gap-6 md:flex">
            <a href="#overview" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Overview
            </a>
            <a href="#schedule" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Schedule
            </a>
            <a href="#fees" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Fees
            </a>
            <a href="#instructor" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Instructor
            </a>
            <Link href="/workshops" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              View all Workshops
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-500 hover:to-blue-600"
              asChild
            >
              <a href="https://forms.gle/3KwdkrdpSVUxHsWQ6" target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-white/10 text-white border-white/20" variant="secondary">
              <Calendar className="mr-1 h-3 w-3" />9 - 13 January 2026
            </Badge>
            <h1 className="mb-6 text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Workshop on Brain Modeling
            </h1>
            <p className="mb-8 text-pretty text-lg text-slate-300 md:text-xl">
              A 5-day intensive online workshop on Computational Neuroscience, covering single neuron models, neural
              networks, oscillations, and systems neuroscience.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-500 hover:to-blue-600"
                asChild
              >
                <a href="https://forms.gle/3KwdkrdpSVUxHsWQ6" target="_blank" rel="noopener noreferrer">
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
                <span className="text-slate-300">5 days intensive</span>
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

      {/* Workshop Overview */}
      <section id="overview" className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">What You Will Learn</h2>
            <p className="mb-12 text-balance text-center text-lg text-slate-300">
              Comprehensive training in computational neuroscience from single neurons to complex brain systems
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Brain className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">Single Neuron Models</h3>
                  <p className="text-sm text-slate-300">
                    Master Hodgkin-Huxley, Morris Lecar, FitzHugh-Nagumo, and Izhikevich models with hands-on PyTorch
                    implementation.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Code className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">Neural Networks & Deep Learning</h3>
                  <p className="text-sm text-slate-300">
                    Explore CNNs in motor function, visual/auditory neuroscience, and deep network perspectives on
                    nervous systems.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <BookOpen className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">Brain Oscillations & Systems</h3>
                  <p className="text-sm text-slate-300">
                    Study phase plane analysis, neural rhythms, Deep Oscillatory Neural Networks, and specialized
                    project topics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Workshop Schedule</h2>
              <p className="text-lg text-slate-300">
                Tutorial sessions in the forenoon, practical sessions in the afternoon
              </p>
              <p className="mt-2 text-sm text-slate-400">Platform: PyTorch</p>
            </div>

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
                        <h3 className="text-xl font-semibold text-white">Day 1 - Single Neuron</h3>
                      </div>
                      <div className="mb-4 space-y-3 text-sm">
                        <div>
                          <p className="font-medium text-cyan-400 mb-1">Forenoon - Tutorial Sessions</p>
                          <ul className="ml-4 list-disc space-y-1 text-slate-300">
                            <li>10:00 AM - 10:50 AM - Introduction to computational neuroscience</li>
                            <li>10:50 AM - 11:00 AM - Break</li>
                            <li>11:00 AM - 12:00 PM - Single neuron signaling</li>
                            <li>12:00 PM - 12:50 PM - Single neuron models: Izhikevich 1-variable model, Izhikevich 2-variable model, Leaky Integrate and Fire Model</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-cyan-400 mb-1">Afternoon - Practical Sessions (2.5 hrs)</p>
                          <ul className="ml-4 list-disc space-y-1 text-slate-300">
                            <li>02:00 PM - 04:30 PM - Practical Session - Coding spiking neuron models using Python</li>
                          </ul>
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
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">2</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Day 2 - Networks</h3>
                      </div>
                      <div className="mb-4 space-y-3 text-sm">
                        <div>
                          <p className="font-medium text-cyan-400 mb-1">Forenoon - Tutorial Sessions</p>
                          <ul className="ml-4 list-disc space-y-1 text-slate-300">
                            <li>10:00 AM - 10:50 AM - Nervous system Organisation - Deep Networks perspective</li>
                            <li>10:50 AM - 11:00 AM - Break</li>
                            <li>11:00 AM - 12:00 PM - CNNs in Visual and Auditory Neuroscience</li>
                            <li>12:00 PM - 12:50 PM - CNNs in motor function - normal and motor stroke of upper extremities</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-cyan-400 mb-1">Afternoon - Practical Sessions (2.5 hrs)</p>
                          <ul className="ml-4 list-disc space-y-1 text-slate-300">
                            <li>02:00 PM–04:30 PM - Practical Session - Coding deep neural networks for understanding brain networks</li>
                          </ul>
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
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">3</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Day 3 - Oscillations</h3>
                      </div>
                      <div className="mb-4 space-y-3 text-sm">
                        <div>
                          <p className="font-medium text-cyan-400 mb-1">Forenoon - Tutorial Sessions</p>
                          <ul className="ml-4 list-disc space-y-1 text-slate-300">
                            <li>10:00 AM - 10:50 AM - Basics of Phase Plane Analysis. Analysing behaviours of 2-var linear dynamical systems</li>
                            <li>10:50 AM - 11:00 AM - Break</li>
                            <li>11:00 AM - 12:00 PM - 2-Variable Neuron Models</li>
                            <li>12:00 PM - 12:45 PM - Introduction to Deep Oscillatory Neural Networks</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-cyan-400 mb-1">Afternoon - Practical Sessions</p>
                          <ul className="ml-4 list-disc space-y-1 text-slate-300">
                            <li>02:00 PM - 04:30 PM - xppaut - Phase plane analysis and limit cycles</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day 4 & 5 */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-lg font-bold text-cyan-400">4-5</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Day 4 & Day 5 - Systems</h3>
                      </div>
                      <div className="mb-4 space-y-3 text-sm">
                        <div>
                          <p className="font-medium text-cyan-400 mb-1">Forenoon - Tutorial Sessions</p>
                          <ul className="ml-4 list-disc space-y-1 text-slate-300">
                            <li>10:00 AM - 12:30 PM - Basal ganglia model for DBS (Spiking neuron net); Deep neural network model of the spatial cells of Hippocampus</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-cyan-400 mb-1">Afternoon - 4 Parallel Project Sessions</p>
                          <ul className="ml-4 list-disc space-y-1 text-slate-300">
                            <li>02:00 PM - 04:30 PM - Bilateral network for reaching - normal and stroke; Oscillator network model of f-MRI</li>
                          </ul>
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
      <section className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Important Dates</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-white/5 backdrop-blur border border-white/10">
                <CardContent className="pt-6 text-center">
                  <Calendar className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-lg font-semibold text-white">SOP Submission</h3>
                  <p className="text-2xl font-bold text-cyan-400">25 Dec 2025</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10">
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Selection Results</h3>
                  <p className="text-2xl font-bold text-cyan-400">26 Dec 2025</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10">
                <CardContent className="pt-6 text-center">
                  <DollarSign className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Registration Deadline</h3>
                  <p className="text-2xl font-bold text-cyan-400">30 Dec 2025</p>
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
                    Undergraduate
                  </Badge>
                  <p className="mb-2 text-4xl font-bold text-white">₹2,000</p>
                  <p className="text-sm text-slate-400">INR</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-cyan-400/40 hover:shadow-xl transition relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-0">Most Popular</Badge>
                </div>
                <CardContent className="pt-6 text-center">
                  <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20" variant="secondary">
                    PG / PhD
                  </Badge>
                  <p className="mb-2 text-4xl font-bold text-white">₹2,500</p>
                  <p className="text-sm text-slate-400">INR</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6 text-center">
                  <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20" variant="secondary">
                    Professionals
                  </Badge>
                  <p className="mb-2 text-4xl font-bold text-white">₹3,000</p>
                  <p className="text-sm text-slate-400">INR</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Receive */}
      <section className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">What You Will Receive</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/5 backdrop-blur border border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-cyan-400" />
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-white">E-Certificate</h3>
                      <p className="text-sm text-slate-300">
                        Official certificate of completion for participants who attend all sessions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-cyan-400" />
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-white">Hands-on Experience</h3>
                      <p className="text-sm text-slate-300">
                        Practical coding sessions with PyTorch and computational neuroscience tools
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-cyan-400" />
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-white">Expert Instruction</h3>
                      <p className="text-sm text-slate-300">
                        Learn from Prof. V. Srinivasa Chakravarthy from IIT Madras
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-cyan-400" />
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-white">Project Work</h3>
                      <p className="text-sm text-slate-300">
                        Participate in specialized project sessions on advanced brain modeling topics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section id="instructor" className="border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Lead Instructor</h2>
            <Card className="bg-white/5 backdrop-blur border border-white/10">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-white">Prof. V. Srinivasa Chakravarthy</h3>
                    <p className="mb-4 text-cyan-400">IIT Madras</p>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>Department of Biotechnology</p>
                      <p>Department of Medical Science and Technology</p>
                      <p className="mt-4">Indian Institute of Technology, Madras</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Apply */}
      <section id="apply" className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Join?</h2>
            <p className="mb-8 text-lg text-slate-300">
              Apply now to secure your spot in this intensive brain modeling workshop
            </p>
            <div className="flex flex-col items-center gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-500 hover:to-blue-600"
                asChild
              >
                <a href="https://forms.gle/3KwdkrdpSVUxHsWQ6" target="_blank" rel="noopener noreferrer">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="h-5 w-5 text-cyan-400" />
                <a href="mailto:workshops@neurogati.com" className="hover:text-cyan-400 transition">
                  workshops@neurogati.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-lg font-semibold text-white">Laboratory for Computational Neuroscience</h3>
              <p className="text-sm text-slate-400">Parkinson's Therapeutics Lab</p>
              <p className="text-sm text-slate-400">Department of Biotechnology</p>
              <p className="text-sm text-slate-400">Indian Institute of Technology, Madras</p>
              <p className="text-sm text-slate-400">Chennai 600036</p>
            </div>
            <div className="border-t border-white/10 pt-6 text-center">
              <p className="text-sm text-slate-400">© 2026 NEUROGATI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
