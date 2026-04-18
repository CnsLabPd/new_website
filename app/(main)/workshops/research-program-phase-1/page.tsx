"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, ArrowRight, Clock, Mail, GraduationCap, Brain, Lightbulb, Award, ChevronRight } from "lucide-react"
import { DynamicMagneticButton } from "@/utils/DynamicMagneticButton"

const GRADIENT_BUTTON_CLASS = "bg-gradient-to-br from-blue-600 via-blue-400 to-blue-600 px-10 font-semibold text-white py-2 rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-base"

const navigationSections = [
  { id: "overview", label: "Overview" },
  { id: "learning", label: "What You'll Learn" },
  { id: "features", label: "Program Features" },
  { id: "audience", label: "Who Should Apply" },
  { id: "additional", label: "Additional Info" },
  { id: "contact", label: "Contact" },
]

export default function ResearchProgramPhase1Page() {
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
            <div className="inline-block px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-black uppercase tracking-wider mb-6">
              Applications Now Open
            </div>
            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Summer Research Training Program
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Computational Neuroscience (Phase I)
            </p>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed mb-8">
              A 2-week intensive designed for motivated high school students interested in brain science, AI, and mathematical modeling.
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-bold">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>June 1-15, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>Online (US-friendly timings)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>2 Weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Grades 8-12</span>
              </div>
            </div>

            <p className="text-xl font-bold text-green-500 mb-6">
              Limited Seats • Selection-Based Admission
            </p>

            <div className="flex flex-col items-center gap-3">
              <p className="text-lg font-bold text-foreground">
                To apply, write to
              </p>
              <a href="mailto:workshops@neurogati.com" className="flex items-center gap-2 hover:text-blue-500 transition-colors group">
                <Mail className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xl text-blue-500">workshops@neurogati.com</span>
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
            {/* WHAT STUDENTS WILL LEARN */}
            <section id="learning" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">What Students Will Learn</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <Card className="border-2 border-blue-500/30 bg-blue-500/[0.02]">
                <CardContent className="p-8">
                  <ul className="space-y-4 text-lg">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>How neurons compute and communicate</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Foundations of neural networks and brain modeling</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Basics of brain signal analysis (EEG concepts)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>How computational models are used to study neurological disorders</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* PROGRAM FEATURES */}
            <section id="features" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Program Features</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-border hover:border-blue-500/50 transition-colors">
                  <CardHeader>
                    <GraduationCap className="h-12 w-12 text-blue-500 mb-4" />
                    <CardTitle className="text-xl font-black">IIT Faculty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">Live interactive sessions led by experienced faculty from IIT</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border hover:border-blue-500/50 transition-colors">
                  <CardHeader>
                    <Brain className="h-12 w-12 text-blue-500 mb-4" />
                    <CardTitle className="text-xl font-black">Real Research</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">Exposure to real research problems in computational neuroscience</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border hover:border-blue-500/50 transition-colors">
                  <CardHeader>
                    <Award className="h-12 w-12 text-blue-500 mb-4" />
                    <CardTitle className="text-xl font-black">Certificate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">Certificate of completion from Neurogati</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border hover:border-blue-500/50 transition-colors">
                  <CardHeader>
                    <Lightbulb className="h-12 w-12 text-blue-500 mb-4" />
                    <CardTitle className="text-xl font-black">Phase II Pathway</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">Pathway to advanced research programs (Phase II)</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* WHO SHOULD APPLY */}
            <section id="audience" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Who Should Apply</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <Card className="border-2 border-blue-500/30 bg-blue-500/[0.02]">
                <CardContent className="p-8">
                  <p className="text-lg text-foreground/90 mb-6 font-medium">
                    Students with strong interest in mathematics, coding, biology, or AI, looking to go beyond standard school curricula.
                  </p>
                  <ul className="space-y-3 text-lg text-foreground/80">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>High school students (Grades 8-12)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>STEM-oriented students</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Students interested in neuroscience, AI, medicine, or engineering</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* ADDITIONAL INFORMATION */}
            <section id="additional" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Additional Information</h2>
              <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>

              <div className="space-y-6">
                <Card className="border-2 border-border">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-black mb-3">Selection-Based Admission</h3>
                    <p className="text-foreground/80">
                      Limited seats available. Admission is selection-based to ensure an optimal learning environment.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-black mb-3">International Cohorts</h3>
                    <p className="text-foreground/80">
                      Prior cohorts include students from the US and India, creating a diverse learning community.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-black mb-3">College Application Boost</h3>
                    <p className="text-foreground/80">
                      Ideal for students preparing for competitive college applications with STEM research exposure.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-black mb-3">Fee Structure</h3>
                    <p className="text-foreground/80">
                      ₹15,000 for Indian students <br />
                      $200 for international students
                    </p>
                  </CardContent>
                </Card>
                
              </div>
            </section>

            {/* CONTACT & CTA */}
            <section id="contact" className="mb-20 scroll-mt-24">
              <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-background">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">Interested in Applying?</h2>
                  <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
                    Join a cohort of motivated students exploring the intersection of brain science, AI, and computational modeling.
                  </p>

                  <div className="flex flex-col items-center gap-4">
                    <p className="text-xl font-bold text-foreground">
                      Write to us at
                    </p>
                    <a href="mailto:workshops@neurogati.com" className="flex items-center gap-3 hover:text-blue-500 transition-colors group">
                      <Mail className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-2xl text-blue-500">workshops@neurogati.com</span>
                    </a>
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
