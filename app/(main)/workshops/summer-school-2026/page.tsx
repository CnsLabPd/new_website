"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, ArrowRight, Clock, Mail, GraduationCap, Brain, Database, Cpu, Activity, ChevronRight } from "lucide-react"
import { DynamicMagneticButton } from "@/utils/DynamicMagneticButton"

const GRADIENT_BUTTON_CLASS = "bg-gradient-to-br from-blue-600 via-blue-400 to-blue-600 px-10 font-semibold text-white py-2 rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-base"

const navigationSections = [
  { id: "overview", label: "Overview" },
  { id: "theme", label: "About" },
  { id: "highlights", label: "Program Highlights" },
  { id: "structure", label: "Program Structure" },
  { id: "audience", label: "Who Should Attend" },
  { id: "registration", label: "Registration & Fees" },
  { id: "abstracts", label: "Call for Abstracts" },
  { id: "committee", label: "Scientific Committee" },
  { id: "speakers", label: "Speakers" },
  { id: "schedule", label: "Schedule" },
  { id: "contact", label: "Contact" },
]

export default function SummerSchool2026Page() {
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    const handleScroll = () => {
      const OFFSET = 150
      const scrollPosition = window.scrollY + OFFSET

      for (const section of navigationSections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const OFFSET = 150
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - OFFSET,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* HERO SECTION */}
      <section id="overview" className="relative pt-48 pb-24 overflow-hidden bg-gradient-to-br from-blue-600/10 via-violet-600/10 to-background border-b border-border">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-red-500 text-white text-sm font-black uppercase tracking-wider mb-6">
              Registrations Closed
            </div>
            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Neurogati Summer School 2026
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Your entry portal into Neurotechnology, Brain-AI and the future of neuroscience.
            </p>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed mb-8">
              A 10-day intensive program designed to introduce participants to the principles of neural modeling, brain dynamics, and data-driven neuroscience.
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-bold">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>June 15-25, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>Online (Live + Interactive)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>10 Days</span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://forms.gle/a74fkKYq5wS2FpuY7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-gradient-to-br from-blue-600 via-blue-400 to-blue-600 text-white font-bold rounded-full hover:scale-105 transition-all text-lg"
              >
                Registrations Closed
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT WITH SIDEBAR */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="flex gap-12">
          {/* LEFT SIDEBAR NAVIGATION - Space Placeholder */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            {/* This div reserves space in the layout */}
          </aside>

          {/* FIXED SIDEBAR - Frozen in place */}
          <nav className="hidden lg:block fixed left-8 top-32 w-64 space-y-2 max-h-[calc(100vh-150px)] overflow-y-auto">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-4 px-4">
              On This Page
            </p>
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-2 rounded-md text-sm font-bold transition-all ${
                  activeSection === section.id
                    ? "bg-blue-500 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          {/* MAIN CONTENT */}
          <div className="flex-1 max-w-4xl">
            {/* ABOUT SECTION */}
            <section id="theme" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">About</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <Card className="border-2 border-blue-500/30 bg-blue-500/[0.02]">
                <CardContent className="p-8">
                  <p className="text-xl font-bold text-foreground mb-6">
                    The school emphasizes:
                  </p>
                  <ul className="space-y-3 text-lg text-foreground/80">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Understanding neural systems as dynamical processes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Building computational models of brain function</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Connecting models to real-world applications</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* PROGRAM HIGHLIGHTS */}
            <section id="highlights" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Program Highlights</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-border hover:border-blue-500/50 transition-colors">
                  <CardHeader>
                    <GraduationCap className="h-12 w-12 text-blue-500 mb-4" />
                    <CardTitle className="text-xl font-black">Expert Lectures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">30+ expert lectures from national and international speakers</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border hover:border-blue-500/50 transition-colors">
                  <CardHeader>
                    <Brain className="h-12 w-12 text-blue-500 mb-4" />
                    <CardTitle className="text-xl font-black">Hands-on Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">Practical sessions in modeling and neural data analysis</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border hover:border-blue-500/50 transition-colors">
                  <CardHeader>
                    <Cpu className="h-12 w-12 text-blue-500 mb-4" />
                    <CardTitle className="text-xl font-black">AI & EEG Modules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">Focused modules on AI for EEG and neural signals</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border hover:border-blue-500/50 transition-colors">
                  <CardHeader>
                    <Activity className="h-12 w-12 text-blue-500 mb-4" />
                    <CardTitle className="text-xl font-black">Real-world Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">Applications in neurorehabilitation and brain–computer interfaces</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border hover:border-blue-500/50 transition-colors md:col-span-2">
                  <CardHeader>
                    <Users className="h-12 w-12 text-blue-500 mb-4" />
                    <CardTitle className="text-xl font-black">Interactive Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">Interactive discussions and Q&A sessions with experts</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* PROGRAM STRUCTURE */}
            <section id="structure" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Program Structure</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <div className="space-y-6">
                <Card className="border-2 border-border">
                  <CardHeader className="bg-gradient-to-r from-blue-500/10 to-transparent">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-black text-xl">
                        1
                      </div>
                      <CardTitle className="text-2xl font-black">Foundations</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-lg text-foreground/80">Neurons, networks, and dynamical systems</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardHeader className="bg-gradient-to-r from-violet-500/10 to-transparent">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center text-white font-black text-xl">
                        2
                      </div>
                      <CardTitle className="text-2xl font-black">Modeling</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-lg text-foreground/80">Biophysical models, models of sensory motor functions and cognition, and disease models</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-transparent">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-black text-xl">
                        3
                      </div>
                      <CardTitle className="text-2xl font-black">Data & AI</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-lg text-foreground/80">EEG analysis, machine learning, signal processing</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardHeader className="bg-gradient-to-r from-pink-500/10 to-transparent">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-black text-xl">
                        4
                      </div>
                      <CardTitle className="text-2xl font-black">Applications</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-lg text-foreground/80">BCI, neurorehabilitation, clinical and translational neuroscience</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* WHO SHOULD ATTEND */}
            <section id="audience" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Who Should Attend</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <Card className="border-2 border-blue-500/30 bg-blue-500/[0.02]">
                <CardContent className="p-8">
                  <ul className="grid md:grid-cols-2 gap-4 text-lg">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Students in engineering, neuroscience, physics, mathematics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Medical students and clinicians</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Researchers in AI and data science</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Professionals interested in neurotechnology</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* REGISTRATION AND FEE STRUCTURE */}
            <section id="registration" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Registration and Fee Structure</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <Card className="border-2 border-blue-500/30 bg-blue-500/[0.02]">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <a
                      href="https://forms.gle/a74fkKYq5wS2FpuY7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-all hover:scale-105 text-lg"
                    >
                      Registrations Closed
                    </a>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-black mb-6">Fee Structure</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-2 border-border">
                        <thead>
                          <tr className="bg-blue-500/10">
                            <th className="border border-border px-6 py-4 text-left font-black">Tier</th>
                            <th className="border border-border px-6 py-4 text-left font-black">Fee (INR, exclusive of GST)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-muted/50 transition-colors bg-blue-500/5">
                            <td className="border border-border px-6 py-4">
                              <p className="font-bold mb-1">Talks alone</p>
                              <p className="text-sm text-green-600 font-semibold">✓ Includes 1 free poster presentation (₹1,500 value) if abstract is selected</p>
                            </td>
                            <td className="border border-border px-6 py-4">2,500</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors">
                            <td className="border border-border px-6 py-4 font-bold">Hands-on <span className="text-sm text-muted-foreground font-normal">(all sessions)</span></td>
                            <td className="border border-border px-6 py-4">2,000</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors bg-blue-500/5">
                            <td className="border border-border px-6 py-4">
                              <p className="font-bold mb-1">Talks + Hands-on <span className="text-sm text-muted-foreground font-normal">(save 500 INR)</span></p>
                              <p className="text-sm text-green-600 font-semibold">✓ Includes 1 free poster presentation (₹1,500 value) if abstract is selected</p>
                            </td>
                            <td className="border border-border px-6 py-4">4,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="text-green-600 text-2xl">🎁</div>
                      <div>
                        <p className="font-black text-foreground mb-2">Special Offer for Talk Registrants!</p>
                        <p className="text-foreground/90">
                          Participants registered for <strong>"Talks alone"</strong> or <strong>"Talks + Hands-on"</strong> receive <strong>1 complimentary poster presentation slot</strong> (worth ₹1,500) if their abstract is selected.
                        </p>
                        <p className="text-sm text-foreground/80 mt-2">
                          If you submit multiple abstracts and more than one gets selected, the presentation fee applies only from the second presentation onwards.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background border-2 border-border rounded-lg p-6 mb-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong className="text-foreground">Note:</strong> Certificate will reflect tier chosen
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Pricing:</strong> All fees are exclusive of GST
                    </p>
                  </div>

                  <div className="bg-blue-500/5 border-2 border-blue-500/30 rounded-lg p-6">
                    <p className="font-bold text-foreground mb-4">What are Hands-on sessions?</p>
                    <p className="text-foreground/80 mb-4">
                      Hands-on sessions are coding sessions where participants will get hands-on experience working with models discussed during the lectures.
                    </p>

                    <p className="font-bold text-foreground mb-3">Available Hands-on Topics:</p>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">1.</span>
                        <span>Overview and how to use Neuro Simulator to model single neurons</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">2.</span>
                        <span>Understanding Convolutional Neural Networks and how to use them to model sensory and motor systems in the brain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">3.</span>
                        <span>Using Deep Oscillatory Neural Networks to model Brain Dynamics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">4.</span>
                        <span>Using Deep Neural Networks to model the spatial cells of the Hippocampus</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">5.</span>
                        <span>Using Python-based modules and libraries to pre process EEG data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">6.</span>
                        <span>Modelling the Basal Ganglia System for Deep Brain Stimulation in Parkinson's Disease</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CALL FOR ABSTRACTS */}
            <section id="abstracts" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Call for Abstracts</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <Card className="border-2 border-pink-500/30 bg-pink-500/[0.02]">
                <CardContent className="p-8">
                  <p className="text-lg font-bold text-foreground mb-4">
                    Participants are invited to submit abstracts for poster presentation.
                  </p>
                  <p className="text-lg text-foreground/80 mb-6">
                    Selected contributions will be featured as oral presentations (online).
                  </p>

                  <div className="bg-background border-2 border-border rounded-lg p-6 mb-6">
                    <p className="font-bold text-foreground mb-3">Topics include:</p>
                    <ul className="grid md:grid-cols-2 gap-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span>Biophysical Models/Single Neuron Modeling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span>Sensory Systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span>Motor Systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span>Brain Dynamics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span>Spatial Navigation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span>Memory</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span>Reward Systems and Decision Making</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span>BCI</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span>Clinical Neuroscience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span>Neurodegenerative Disorders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span>Neuropsychology</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-pink-500 text-white rounded-lg p-6 text-center mb-6">
                    <p className="text-sm font-black uppercase tracking-wider mb-2">Abstract Submission Deadline</p>
                    <p className="text-3xl font-black">May 25th, 2026</p>
                  </div>

                  <div className="bg-background border-2 border-border rounded-lg p-6 mb-6">
                    <p className="font-bold text-foreground mb-3">Presentation Fee Structure:</p>
                    <ul className="space-y-2 text-foreground/80 mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span><strong>Abstract submission:</strong> Free for all participants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-500">•</span>
                        <span><strong>Poster presentation fee (if selected):</strong> ₹1,500</span>
                      </li>
                    </ul>
                    <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
                      <p className="text-sm font-bold text-green-700 mb-1">✓ Special Waiver for Talk Registrants</p>
                      <p className="text-sm text-foreground/90">
                        Participants registered for "Talks alone" or "Talks + Hands-on" receive <strong>1 free poster presentation</strong> if their abstract is selected (₹1,500 value waived).
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <a
                      href="https://forms.gle/pNYXkKfWFdFTExfo7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-all hover:scale-105"
                    >
                      Submit Abstract
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* SCIENTIFIC COMMITTEE */}
            <section id="committee" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Scientific Committee</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <Card className="border-2 border-border">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-4 text-foreground/80">
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Frédéric Alexandre</p>
                        <p className="text-sm text-muted-foreground">INRIA, France</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Pragathi Balasubramani</p>
                        <p className="text-sm text-muted-foreground">IIT Kanpur, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. V. Srinivasa Chakravarthy</p>
                        <p className="text-sm text-muted-foreground">IIT Madras, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Risto Ilmoniemi</p>
                        <p className="text-sm text-muted-foreground">Aalto University, Finland</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Vignesh Muralidharan</p>
                        <p className="text-sm text-muted-foreground">IIT Jodhpur, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Srikanth Ramaswamy</p>
                        <p className="text-sm text-muted-foreground">Newcastle University, UK</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Aasif Sheikh</p>
                        <p className="text-sm text-muted-foreground">Case Western Reserve University, USA</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* SPEAKERS */}
            <section id="speakers" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Speakers</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <Card className="border-2 border-border">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-4 text-foreground/80">
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. SP Arun</p>
                        <p className="text-sm text-muted-foreground">IISc, Bangalore</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Pragati Balasubramani</p>
                        <p className="text-sm text-muted-foreground">IIT Kanpur</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Bankim Chander</p>
                        <p className="text-sm text-muted-foreground">BrainPortal Technologies, Germany</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Gangadhar Garipelli</p>
                        <p className="text-sm text-muted-foreground">MindMaze, Switzerland</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Fatema Ghasia</p>
                        <p className="text-sm text-muted-foreground">Cleveland Clinic, USA</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Risto Iliomeni</p>
                        <p className="text-sm text-muted-foreground">Aalto University, Finland</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Swetha Kumari</p>
                        <p className="text-sm text-muted-foreground">Deloitte, Bangalore</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Alekhya Mandeli</p>
                        <p className="text-sm text-muted-foreground">University of Sheffield, UK</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Vignesh Muddapu</p>
                        <p className="text-sm text-muted-foreground">Azim Premji University</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Vignesh Muralidharan</p>
                        <p className="text-sm text-muted-foreground">IIT Jodhpur</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Aditya Murthy</p>
                        <p className="text-sm text-muted-foreground">IISc, Bangalore</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Pratik Mutha</p>
                        <p className="text-sm text-muted-foreground">IIT Gandhinagar, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Suhita Nadkarni</p>
                        <p className="text-sm text-muted-foreground">IISER, Pune</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Ryan Philips</p>
                        <p className="text-sm text-muted-foreground">Azim Premji University, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Sylaja PN</p>
                        <p className="text-sm text-muted-foreground">SCTIMST, Thiruvananthapuram</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Srikanth Ramaswamy</p>
                        <p className="text-sm text-muted-foreground">University of Newcastle upon Tyne, UK</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Dipanjan Roy</p>
                        <p className="text-sm text-muted-foreground">IIT Jodhpur, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Aasef Sheikh</p>
                        <p className="text-sm text-muted-foreground">Case Western Reserve University, USA</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Avinash Singh</p>
                        <p className="text-sm text-muted-foreground">UTS, Sydney</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Parul Verma</p>
                        <p className="text-sm text-muted-foreground">IIT Madras, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Bapiraju</p>
                        <p className="text-sm text-muted-foreground">IIIT Hyderabad, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Shyam Diwakar</p>
                        <p className="text-sm text-muted-foreground">Amrita Vishwa Vidyapeetham, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Mohan Raghavan</p>
                        <p className="text-sm text-muted-foreground">IIT Hyderabad, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Fabien Wagner</p>
                        <p className="text-sm text-muted-foreground">University of Bordeaux, France</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Amelie Aussel</p>
                        <p className="text-sm text-muted-foreground">Inria, France</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Santhosh Sethuramanujam</p>
                        <p className="text-sm text-muted-foreground">IIT Madras, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Meenakshi Asokan</p>
                        <p className="text-sm text-muted-foreground">Princeton University, US</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Sharba Bandyopadhyay</p>
                        <p className="text-sm text-muted-foreground">IIT Kharagpur, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Sachin Deshmukh</p>
                        <p className="text-sm text-muted-foreground">Shiv Nadar Institution of Eminence, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Lakshmi Narasimhan</p>
                        <p className="text-sm text-muted-foreground">SRMC</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Karthik Raghavendran</p>
                        <p className="text-sm text-muted-foreground">Neurostellar, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Muhammad Parvaz</p>
                        <p className="text-sm text-muted-foreground">Icahn School of Medicine at Mount Sinai, USA</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">Dr. Anantha Ramakrishnan</p>
                        <p className="text-sm text-muted-foreground">Sr Director, Optum United Health Group</p>
                        <p className="text-sm text-muted-foreground">Icahn School of Medicine at Mount Sinai, USA</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-muted-foreground mt-8 font-bold">...and many more!</p>
                </CardContent>
              </Card>
            </section>

            {/* DETAILED SCHEDULE */}
            <section id="schedule" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Daily Lecture Programme</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <div className="mb-8 text-center">
                <p className="text-sm font-black uppercase tracking-wider text-muted-foreground mb-2">Programme Dates</p>
                <p className="text-2xl font-black text-foreground">15-25 June 2026 • 10 Days • Online & Live Interactive</p>
              </div>

              {/* Daily Programme Cards */}
              <div className="grid gap-6 mb-12">
                {/* Day 1 - June 15 */}
                <Card className="border-2 border-orange-500/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-black">15</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase opacity-90">Day 01 • Monday</p>
                          <h3 className="text-2xl font-black">Sensory Systems</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Morning Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Playing of Vande Matram [National Song]</span><span className="text-sm text-muted-foreground">10:45-10:50 AM</span></p>
                          <p className="flex justify-between"><span>Inaugural Talk by Prof. V. Srinivasa Chakravarthy</span><span className="text-sm text-muted-foreground">10:50-11:00 AM</span></p>
                          <p className="flex justify-between"><span className="font-bold text-blue-600">🔧 HANDS-ON: Mr. Adithya Shreeram - Sensory Systems</span><span className="text-sm text-muted-foreground">11:00 AM-12:30 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Afternoon Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. SP Arun - "Towards a real conversation between brain and machine vision"</span><span className="text-sm text-muted-foreground">02:00-03:00 PM</span></p>
                          <p className="flex justify-between"><span>Prof. Sharba Bandyopadhyay - "Surprise at multiple time scales – in coding and plasticity"</span><span className="text-sm text-muted-foreground">04:30-05:30 PM</span></p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day 2 - June 16 */}
                <Card className="border-2 border-blue-500/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-black">16</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase opacity-90">Day 02 • Tuesday</p>
                          <h3 className="text-2xl font-black">Motor Function</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Morning Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. Shyam Diwakar - "Motor Learning and the Cerebellum: Computational Neuroscience of Neurons, Circuit reconstructions and Emergent Responses"</span><span className="text-sm text-muted-foreground">10:00-11:00 AM</span></p>
                          <p className="flex justify-between"><span>Prof. Santhosh Sethuramanujam - "Dendritic integration mechanisms promote equalization of ON and OFF signal processing in ON-OFF DSGCs"</span><span className="text-sm text-muted-foreground">11:00 AM-12:00 PM</span></p>
                          <p className="flex justify-between"><span className="font-bold text-blue-600">🔧 HANDS-ON: Ms. Sundari Elango - Motor Function</span><span className="text-sm text-muted-foreground">12:00-01:00 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Afternoon Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. Pratik Mutha</span><span className="text-sm text-muted-foreground">02:00-03:00 PM</span></p>
                          <p className="flex justify-between"><span className="font-bold text-pink-600">📊 POSTER PRESENTATIONS - Session I</span><span className="text-sm text-muted-foreground">03:00-04:30 PM</span></p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day 3 - June 17 */}
                <Card className="border-2 border-violet-500/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-500 to-violet-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-black">17</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase opacity-90">Day 03 • Wednesday</p>
                          <h3 className="text-2xl font-black">Brain Dynamics</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground">Morning Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. Risto Ilmoniemi - "From single-spot to automated multi-locus transcranial magnetic stimulation"</span><span className="text-sm text-muted-foreground">10:30 AM-11:30 PM</span></p>
                          <p className="flex justify-between"><span>Prof. Bapi Raju - "Bridging Brain Structure and Function through Network Diffusion Models"</span><span className="text-sm text-muted-foreground">11:30 AM - 12:30 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground">Evening Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. Srikanth Ramaswamy - "BrAInspiration: What can artificial neural networks learn from neuromodulatory systems?"</span><span className="text-sm text-muted-foreground">02:00 PM - 03:00 PM</span></p>
                          <p className="flex justify-between"><span>Prof. Dipanjan Roy - "Multimodal and multiscale Brain dynamics during rest and task across the lifespan "</span><span className="text-sm text-muted-foreground">03:00 PM - 04:00 PM</span></p>
                          <p className="flex justify-between"><span>Prof. Parul Verma</span><span className="text-sm text-muted-foreground">04:00 PM - 05:00 PM</span></p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day 4 - June 18 */}
                <Card className="border-2 border-cyan-500/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-black">18</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase opacity-90">Day 04 • Thursday</p>
                          <h3 className="text-2xl font-black">Oculomotor System</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Morning Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span className="font-bold text-pink-600">📊 POSTER PRESENTATIONS - Session II</span><span className="text-sm text-muted-foreground">11:00 AM-12:30 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Afternoon Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. Aditya Murthy - "Engineering goal-directed movements with artificial neural networks"</span><span className="text-sm text-muted-foreground">02:00-03:00 PM</span></p>
                          <p className="flex justify-between"><span>Prof. Aasef Sheikh</span><span className="text-sm text-muted-foreground">TBA</span></p>
                          <p className="flex justify-between"><span>Prof. Fatema Ghasia</span><span className="text-sm text-muted-foreground">04:00-05:00 PM</span></p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day 5 - June 19 */}
                <Card className="border-2 border-pink-500/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-black">19</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase opacity-90">Day 05 • Friday</p>
                          <h3 className="text-2xl font-black">Biophysical Models</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Morning Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span className="font-bold text-blue-600">🔧 HANDS-ON: Ms. Sindhuramrutha - Biophysics</span><span className="text-sm text-muted-foreground">11:00 AM-12:30 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Afternoon Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. Suhita Nadkarni</span><span className="text-sm text-muted-foreground">02:00-03:00 PM</span></p>
                          <p className="flex justify-between"><span className="font-bold text-blue-600">🔧 HANDS-ON: Mr. Anirban Bandhyopadhyay - Biophysical Models</span><span className="text-sm text-muted-foreground">03:00-04:30 PM</span></p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day 6 - June 20 */}
                <Card className="border-2 border-purple-500/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-black">20</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase opacity-90">Day 06 • Saturday</p>
                          <h3 className="text-2xl font-black">Basal Ganglia</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Morning Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. V. Srinivasa Chakravarthy</span><span className="text-sm text-muted-foreground">10:00-11:00 AM</span></p>
                          <p className="flex justify-between"><span>Prof. Vignesh Muralidharan</span><span className="text-sm text-muted-foreground">11:00 AM-12:00 PM</span></p>
                          <p className="flex justify-between"><span>Prof. Pragathi Balasubramani</span><span className="text-sm text-muted-foreground">12:00-01:00 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Afternoon Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span className="font-bold text-pink-600">📊 POSTER PRESENTATIONS - Session III</span><span className="text-sm text-muted-foreground">02:00-03:30 PM</span></p>
                          <p className="flex justify-between"><span className="font-bold text-blue-600">🔧 HANDS-ON: Ms. Palika Charitha - Basal Ganglia</span><span className="text-sm text-muted-foreground">03:30-05:00 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Evening Session</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Dr. Sandeep Nair</span><span className="text-sm text-muted-foreground">06:00-07:00 PM</span></p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Break Day Notice */}
                <Card className="border-2 border-gray-300 bg-gray-50/50 dark:bg-gray-900/20">
                  <CardContent className="p-8 text-center">
                    <p className="text-2xl font-black text-muted-foreground mb-2">June 21, 2026</p>
                    <p className="text-lg font-bold">Break Day</p>
                  </CardContent>
                </Card>

                {/* Day 7 - June 22 */}
                <Card className="border-2 border-green-500/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-black">22</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase opacity-90">Day 07 • Monday</p>
                          <h3 className="text-2xl font-black">Reward Systems & Decision Making</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Morning Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. Ryan T. Philips</span><span className="text-sm text-muted-foreground">10:00-11:00 AM</span></p>
                          <p className="flex justify-between"><span className="font-bold text-pink-600">📊 POSTER PRESENTATIONS - Session IV</span><span className="text-sm text-muted-foreground">11:00 AM-12:30 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Afternoon Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. Alekhya Mandali</span><span className="text-sm text-muted-foreground">03:30-04:30 PM</span></p>
                          <p className="flex justify-between"><span>Prof. Meenakshi Asokan</span><span className="text-sm text-muted-foreground">04:30-05:30 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Evening Session</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. Muhammad Parvaz and Dr. Anantha Ramakrishnan</span><span className="text-sm text-muted-foreground">06:00-07:00 PM</span></p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day 8 - June 23 */}
                <Card className="border-2 border-yellow-500/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-black">23</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase opacity-90">Day 08 • Tuesday</p>
                          <h3 className="text-2xl font-black">Hippocampus</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Morning Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span className="font-bold text-blue-600">🔧 HANDS-ON: Ms. Madhuvanthi Muliya - Hippocampus</span><span className="text-sm text-muted-foreground">10:00-11:30 AM</span></p>
                          <p className="flex justify-between"><span>Prof. Sachin Deshmukh</span><span className="text-sm text-muted-foreground">11:30 AM-12:30 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Afternoon Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. Vignyanadam</span><span className="text-sm text-muted-foreground">02:00-03:00 PM</span></p>
                          <p className="flex justify-between"><span>Prof. Fabien Wagner</span><span className="text-sm text-muted-foreground">04:30-05:30 PM</span></p>
                          <p className="flex justify-between"><span>Prof. Amelie Aussel</span><span className="text-sm text-muted-foreground">05:30-06:30 PM</span></p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day 9 - June 24 */}
                <Card className="border-2 border-red-500/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-black">24</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase opacity-90">Day 09 • Wednesday</p>
                          <h3 className="text-2xl font-black">Clinical Neuroscience</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Morning Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Dr. Harsh Arora [BCI and Startups]</span><span className="text-sm text-muted-foreground">11:00 AM-12:00 PM</span></p>
                          <p className="flex justify-between"><span>Dr. Lakshmi Narasimhan - SRMC</span><span className="text-sm text-muted-foreground">12:00-01:00 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Afternoon Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Dr. Kodeeswaran - GKMC</span><span className="text-sm text-muted-foreground">03:00-04:00 PM</span></p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day 10 - June 25 */}
                <Card className="border-2 border-indigo-500/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-black">25</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase opacity-90">Day 10 • Thursday</p>
                          <h3 className="text-2xl font-black">BCI & Startups</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Morning Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Prof. Avinash Singh</span><span className="text-sm text-muted-foreground">12:00-01:00 PM</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm text-muted-foreground uppercase">Afternoon Sessions</p>
                        <div className="space-y-1">
                          <p className="flex justify-between"><span>Dr. Gangadhar Garipelli</span><span className="text-sm text-muted-foreground">02:30-03:30 PM</span></p>
                          <p className="flex justify-between"><span>Dr. Bankim Chander</span><span className="text-sm text-muted-foreground">04:00-05:00 PM</span></p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>


            </section>

            {/* CONTACT & CTA */}
            <section id="contact" className="mb-20 scroll-mt-24">
              <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-background">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">Ready to Join?</h2>
                  <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                    Don't miss this opportunity to learn from world-class experts and advance your knowledge in computational neuroscience and neurotechnology.
                  </p>

                  <div className="mb-8">
                    <a
                      href="https://forms.gle/a74fkKYq5wS2FpuY7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-all hover:scale-105 text-lg"
                    >
                      Registrations Closed
                    </a>
                  </div>

                  <div className="pt-8 border-t border-border/50">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Contact</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-foreground">
                      <a href="mailto:workshops@neurogati.com" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                        <Mail className="h-5 w-5" />
                        <span className="font-bold">workshops@neurogati.com</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
