"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Brain,
  Calendar,
  Award,
  ArrowRight,
  Clock,
  Mail,
  Users,
  DollarSign,
  Download,
  GitBranch,
  FileText,
  Target,
  Code,
  BookOpen,
  MessageSquare,
  CheckCircle
} from "lucide-react"

export default function ResearchProgramPhase2Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">

      {/* Secondary Navigation */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto px-6 py-3">
          <nav className="flex gap-8 text-sm">
            <a href="#overview" className="hover:text-blue-400 transition-colors">Overview</a>
            <a href="#tracks" className="hover:text-blue-400 transition-colors">Research Tracks</a>
            <a href="#mentorship" className="hover:text-blue-400 transition-colors">Mentorship</a>
            <a href="#outcomes" className="hover:text-blue-400 transition-colors">Outcomes</a>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="pt-24 pb-24 text-center">
        <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600">Phase 2: Advanced Research Training</Badge>

        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Computational Neuroscience
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-6">
          Research Training Program
        </h2>

        <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
          A 10-week, mentorship-driven research training program
        </p>

        <div className="flex justify-center gap-6 mt-10 text-sm text-slate-400">
          <div className="flex gap-2"><Calendar /> Jul 11 – Sep 26, 2026</div>
          <div className="flex gap-2"><Clock /> 2 hrs/week (Live)</div>
          <div className="flex gap-2"><DollarSign /> US$ 375</div>
        </div>

        {/* Important Dates Alert */}
        <div className="mt-8 max-w-2xl mx-auto space-y-4">
          <Card className="bg-orange-900/30 border-orange-500/50 p-4">
            <div className="flex items-center gap-3 text-orange-300">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Application Deadline: June 30, 2026</span>
            </div>
          </Card>
          <Card className="bg-blue-900/30 border-blue-500/50 p-4">
            <div className="flex items-center gap-3 text-blue-300">
              <Users className="h-5 w-5" />
              <span className="font-semibold">Selection Results: July 5, 2026 | Fee Payment: July 8, 2026</span>
            </div>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="https://forms.gle/hmXhDjJqwosG2Zn26">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold shadow-lg">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/workshop%20brochures/phase2_july-sept.pdf" download>
            <Button variant="outline" className="px-8 py-4 text-lg font-bold border-blue-400 text-blue-400 hover:bg-blue-400/10">
              Download Brochure
              <Download className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* PROGRAM VISION */}
      <section id="overview" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-10">Program Vision</h2>

        <Card className="p-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 max-w-4xl mx-auto">
          <p className="text-lg text-slate-200 leading-relaxed">
            A long-form, mentorship-driven program that introduces students to modern computational
            neuroscience — including the modeling of important brain structures, biologically inspired
            deep networks, oscillatory neural models, and computational models of sensory and motor
            function, learning and memory. Students first complete structured coursework, then
            transition into a supervised research track.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <Card className="p-6 hover:bg-slate-800/50 transition-colors">
            <Brain className="text-purple-400 mb-4 h-10 w-10" />
            <h3 className="font-bold text-lg mb-2">Brain Modeling</h3>
            <p className="text-sm text-slate-400">Learn to model important brain structures and neural circuits</p>
          </Card>

          <Card className="p-6 hover:bg-slate-800/50 transition-colors">
            <Code className="text-blue-400 mb-4 h-10 w-10" />
            <h3 className="font-bold text-lg mb-2">Deep Networks</h3>
            <p className="text-sm text-slate-400">Explore biologically inspired deep learning architectures</p>
          </Card>

          <Card className="p-6 hover:bg-slate-800/50 transition-colors">
            <Target className="text-green-400 mb-4 h-10 w-10" />
            <h3 className="font-bold text-lg mb-2">Research Focus</h3>
            <p className="text-sm text-slate-400">Transition from coursework to supervised research</p>
          </Card>
        </div>
      </section>

      {/* EXPECTED OUTCOMES */}
      <section id="outcomes" className="container mx-auto px-6 py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <h2 className="text-3xl font-black text-center mb-10">Expected Outcomes</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-center">
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Supervised Research Project</h3>
            <p className="text-slate-400">Complete a full research project under expert mentorship</p>
          </Card>

          <Card className="p-8 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Conference-Ready Abstract</h3>
            <p className="text-slate-400">Co-authored with your mentor, ready for submission</p>
          </Card>

          <Card className="p-8 text-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <GitBranch className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">GitHub Repository</h3>
            <p className="text-slate-400">With reproducible code documenting your research</p>
          </Card>
        </div>
      </section>

      {/* RESEARCH TRACKS */}
      <section id="tracks" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-10">Research Tracks</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              number: "1",
              title: "Developing PD Diagnostics Using Behavioural Data",
              color: "from-purple-500 to-pink-600"
            },
            {
              number: "2",
              title: "Deep Oscillatory Networks for Visuomotor Function",
              color: "from-blue-500 to-cyan-600"
            },
            {
              number: "3",
              title: "Understanding Spatial Decision Making",
              color: "from-green-500 to-emerald-600"
            },
            {
              number: "4",
              title: "Driver Drowsiness Detection Using EEG",
              color: "from-orange-500 to-red-600"
            },
            {
              number: "5",
              title: "Developing Games for Autism",
              color: "from-indigo-500 to-purple-600"
            },
            {
              number: "6",
              title: "3D Movement Analysis Using Neural Networks",
              color: "from-pink-500 to-rose-600"
            }
          ].map((track, i) => (
            <Card key={i} className="p-6 hover:scale-105 transition-transform">
              <div className={`bg-gradient-to-r ${track.color} rounded-full w-12 h-12 flex items-center justify-center mb-4 font-bold text-lg`}>
                {track.number}
              </div>
              <h3 className="font-bold text-lg">{track.title}</h3>
            </Card>
          ))}
        </div>
      </section>

      {/* MENTORSHIP STRUCTURE */}
      <section id="mentorship" className="container mx-auto px-6 py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <h2 className="text-3xl font-black text-center mb-10">Mentorship Structure</h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-purple-400">Weekly Guidance</h3>
            <ul className="space-y-4">
              {[
                "Weekly 2-hr mentor call — clarify concepts, debug models, review progress",
                "Hands-on session (1 hour)",
                "Continuous chat support (Slack/Discord)",
                "Assignment grading & feedback from mentors",
                "Research-abstract drafting in the final 2 weeks",
                "Possible journal/conference publication"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-blue-400">Admission Requirements</h3>
            <ul className="space-y-4">
              {[
                "Basic Python knowledge",
                "Interest in neuroscience & machine learning",
                "No prior research experience required",
                "Beginners welcome — we start from first principles"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>

            <Card className="mt-6 p-4 bg-orange-900/30 border-orange-500/50">
              <p className="text-orange-300 text-sm italic">
                Beginners welcome — we start from first principles and build up to research.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* LEAD INSTRUCTOR */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-10">Lead Instructor</h2>

        <Card className="max-w-4xl mx-auto p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-full w-32 h-32 flex items-center justify-center text-5xl font-bold">
              VSC
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-orange-400">Prof. V. Srinivasa Chakravarthy</h3>
              <p className="text-lg text-slate-300 mb-4">
                Professor, IIT Madras · Biotechnology and Medical Science & Technology
              </p>

              <div className="space-y-2 text-sm text-slate-400">
                <p>Heads the Computational Neuroscience Lab, Parkinson's Therapeutics Lab, and Neural Engineering Lab at IIT Madras</p>
                <p className="font-semibold">B.Tech IIT Madras · MS/PhD UT Austin · Postdoc, Baylor College of Medicine</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="bg-purple-600/30 text-purple-300">Mid-Career Research Excellence 2018</Badge>
                <Badge className="bg-blue-600/30 text-blue-300">Teaching Excellence 2024</Badge>
                <Badge className="bg-green-600/30 text-green-300">Author of 2 Neuroscience Books</Badge>
                <Badge className="bg-orange-600/30 text-orange-300">Inventor of Bharati Script</Badge>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* REGISTRATION CTA */}
      <section className="container mx-auto px-6 py-20">
        <Card className="border-2 border-purple-500/40 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">Ready to Apply?</h2>

            <div className="flex justify-center gap-8 my-8 text-lg">
              <div>
                <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <span className="font-bold">US$ 375</span>
              </div>
              <div>
                <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <span className="font-bold">Jul 11 – Sep 26</span>
              </div>
            </div>

            <p className="text-base text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join an elite cohort exploring the intersection of brain science, AI, and computational modeling
              through hands-on research under expert mentorship.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://forms.gle/hmXhDjJqwosG2Zn26">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-10 py-6 text-lg font-bold">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/workshop%20brochures/phase2_july-sept.pdf" download>
                <Button variant="outline" className="px-8 py-6 text-lg border-blue-400 text-blue-400 hover:bg-blue-400/10">
                  Download Brochure
                  <Download className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-border/40">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
                Important Deadlines
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <span className="text-orange-400">Application: June 30</span>
                <span className="text-blue-400">Selection: July 5</span>
                <span className="text-green-400">Payment: July 8</span>
              </div>
            </div>

            <div className="mt-6">
              <a href="mailto:workshops@neurogati.com" className="inline-flex items-center gap-2 text-foreground hover:text-blue-400 transition-colors font-bold text-sm">
                <Mail className="h-4 w-4" />
                workshops@neurogati.com
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

    </div>
  )
}