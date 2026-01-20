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
  Brain,
  Zap,
  Lightbulb,
  Users,
  DollarSign,
} from "lucide-react"

export default function EEGAIWorkshopPage() {
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
              src="\/images/bg_just_logo.png"
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
              <a href="https://forms.gle/raU26Zfyb39bdRFd8" target="_blank" rel="noopener noreferrer">
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
              3-Day Online Workshop
            </Badge>
            <h1 className="mb-6 text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              AI Applications in EEG
            </h1>
            <p className="mb-8 text-pretty text-lg text-slate-300 md:text-xl">
              Explore how EEG signals are collected, processed, and analyzed using AI and machine learning for breakthrough
              applications in brain-computer interfaces and neurological diagnosis.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-500 hover:to-blue-600"
                asChild
              >
                <a href="https://forms.gle/raU26Zfyb39bdRFd8" target="_blank" rel="noopener noreferrer">
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
                <Calendar className="h-5 w-5 text-cyan-400" />
                <span className="text-slate-300">Feb 20-22, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop className="h-5 w-5 text-cyan-400" />
                <span className="text-slate-300">Online format</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-cyan-400" />
                <span className="text-slate-300">Certificate included</span>
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
              Master EEG signal processing and AI-powered brain analysis with hands-on labs using MNE-Python
            </p>
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Brain className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">EEG Basics</h3>
                  <p className="text-sm text-slate-300">Signal collection and preprocessing fundamentals</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Zap className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">ML & DL</h3>
                  <p className="text-sm text-slate-300">Machine learning models for EEG decoding</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Lightbulb className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">Real Applications</h3>
                  <p className="text-sm text-slate-300">Clinical diagnosis and brain-computer interfaces</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Laptop className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">Hands-On Labs</h3>
                  <p className="text-sm text-slate-300">Practical experience with MNE-Python toolkit</p>
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
              Three intensive days with lectures, live demos, and hands-on lab sessions
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
                        <h3 className="text-xl font-semibold text-white">Day 1 - Foundations & EEG Basics (Feb 20)</h3>
                        <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/20">9:00 AM - 5:30 PM IST</Badge>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Inaugural Talk: Prof. Srinivasa Chakravarthy</p>
                          <p className="text-slate-300">Overview of EEG, brain-computer interfaces and AI applications</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Introduction to EEG & System Setup (9:00-10:00)</p>
                          <p className="text-slate-300">
                            EEG principles, 10-20 montage, cap fitting demo, impedance check demonstration
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">EEG Pre-processing Lab (10:00-13:00)</p>
                          <p className="text-slate-300">
                            Signal cleaning, Notch and Bandpass filtering, Artifact removal using ICA with MNE-Python
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">ML & DL for EEG (14:00-17:15)</p>
                          <p className="text-slate-300">
                            Feature extraction (PSD, PLI), Models (SVM, CNN, LSTM), End-to-end pipeline demo
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
                        <h3 className="text-xl font-semibold text-white">Day 2 - Imagery & Clinical Studies (Feb 21)</h3>
                        <Badge className="bg-blue-400/10 text-blue-400 border-blue-400/20">9:00 AM - 5:30 PM IST</Badge>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Motor Imagery Theory & Lab (9:00-11:00)</p>
                          <p className="text-slate-300">
                            Guided lab session using L/R hand imagination tasks, offline classification of Motor Imagery data
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Epilepsy & Seizure Detection (14:00-15:30)</p>
                          <p className="text-slate-300">
                            Introduction to BONN EEG Dataset, spike detection basics, seizure event annotation
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Lab: Seizure Classification (15:30-17:15)</p>
                          <p className="text-slate-300">
                            Comparative modeling using Random Forest and CNN architectures for seizure detection
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
                        <h3 className="text-xl font-semibold text-white">Day 3 - Neurodegenerative Detection (Feb 22)</h3>
                        <Badge className="bg-violet-400/10 text-violet-400 border-violet-400/20">9:00 AM - 5:30 PM IST</Badge>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Visual Imagery Theory & Lab (11:00-13:00)</p>
                          <p className="text-slate-300">
                            Imagined objects/scenes in EEG patterns, signal analysis and classification approaches
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Neurodegenerative Disorder Detection (9:00-11:00)</p>
                          <p className="text-slate-300">
                            Parkinson's vs Healthy classification, extract relevant EEG markers, build and evaluate ML classifier
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Alzheimer's Detection Lab (11:00-13:00)</p>
                          <p className="text-slate-300">
                            Alzheimer's vs Healthy classification, relevant marker extraction, ML classifier evaluation
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                          <p className="font-medium text-white mb-1">Faculty Talks & Closing Ceremony (14:00-17:30)</p>
                          <p className="text-slate-300">
                            Talks by faculty and neurotechnology experts, closing ceremony, certificate distribution
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
                  <h3 className="mb-2 text-lg font-semibold text-white">SOP Submission</h3>
                  <p className="text-2xl font-bold text-cyan-400">29 Jan 2026</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 transition">
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Selection Results</h3>
                  <p className="text-2xl font-bold text-cyan-400">30 Jan 2026</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 transition">
                <CardContent className="pt-6 text-center">
                  <DollarSign className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Fee Payment Deadline</h3>
                  <p className="text-2xl font-bold text-cyan-400">06 Feb 2026</p>
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
              Flexible pricing for students and professionals
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6 text-center">
                  <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20" variant="secondary">
                    UG Students
                  </Badge>
                  <p className="mb-2 text-4xl font-bold text-white">₹3,000</p>
                  <p className="text-sm text-slate-400">INR</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-cyan-400/40 hover:shadow-xl transition relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-0">Most Popular</Badge>
                </div>
                <CardContent className="pt-6 text-center">
                  <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20" variant="secondary">
                    PG/PhD Students
                  </Badge>
                  <p className="mb-2 text-4xl font-bold text-white">₹3,500</p>
                  <p className="text-sm text-slate-400">INR</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6 text-center">
                  <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20" variant="secondary">
                    Professionals
                  </Badge>
                  <p className="mb-2 text-4xl font-bold text-white">₹4,000</p>
                  <p className="text-sm text-slate-400">INR</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section id="instructor" className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Contact & Location</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-xl font-semibold text-white flex items-center gap-2">
                    <Mail className="h-5 w-5 text-cyan-400" />
                    Email
                  </h3>
                  <div className="space-y-2">
                    <p className="text-slate-300">
                      <a href="mailto:contactus@neurogati.com" className="text-cyan-400 hover:underline">
                        contactus@neurogati.com
                      </a>
                    </p>
                    <p className="text-slate-300">
                      <a href="mailto:workshops@neurogati.com" className="text-cyan-400 hover:underline">
                        workshops@neurogati.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-xl font-semibold text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-cyan-400" />
                    Location
                  </h3>
                  <div className="space-y-2 text-slate-300">
                    <p>Neurogati Pvt Ltd</p>
                    <p>Research Park, Indian Institute of Technology, Madras</p>
                    <p>Tharamani</p>
                    <p className="font-semibold">Chennai 600113</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 rounded-lg bg-white/5 border border-white/10 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Eligibility & Requirements</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Open to undergraduate and postgraduate students, researchers, and professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Basic familiarity with Python is helpful</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Participants should bring their own laptop</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-slate-400">
            <p>© 2026 NEUROGATI. All rights reserved.</p>
            <p className="mt-2 text-sm">Laboratory for Computational Neuroscience | IIT Madras</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
