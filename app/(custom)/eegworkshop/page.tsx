"use client"

import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Calendar,
  Mail,
  CheckCircle2,
  ArrowRight,
  Award,
  Laptop,
  Brain,
  Zap,
  Lightbulb,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

export default function EEGAIWorkshopPage() {

  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const width = scrollRef.current.clientWidth

    scrollRef.current.scrollBy({
      left: direction === "right" ? width : -width,
      behavior: "smooth"
    })
  }

  const testimonials = [
`The workshop featured expert lectures, live demonstrations, and guided lab sessions, providing a strong practical foundation in computational neuroscience and neurotechnology. I am sincerely grateful to Prof. Srinivasa Chakravarthy and the organizing team for their mentorship and for creating such a rigorous and enriching learning environment.`,

`The sessions delivered by faculty members and neurotechnology experts provided valuable insights into EEG acquisition, preprocessing, feature extraction, and AI-based neural decoding especially of motor imagery, visual imagery, epilepsy & seizure detection, neurodegenerative disorders.`,

`The program was exceptionally well designed, with extensive hands-on sessions focused on EEG signal preprocessing and practical applications. The workshop offered deep insights into how the human brain functions and the interdisciplinary intersection of neuro-engineering, psychology, and biology.`,

`The focus on building up the workshop from the fundamentals made it very engaging.`,

`Advanced pre-processing is something I wanted to learn for a very long time and I got foundations knowledge on it.`,

`The deep learning and machine learning part along with codes as my background is from bioinformatics. I also found biology part of the workshop helpful in recalling neuroscience fundamentals.`,

`Sessions on Motor and Visual Imagery were extremely insightful. Before the workshop I could not understand how imagination could be decoded — now I have a much clearer picture.`
  ]

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition group">
            <img 
              src="/bg_just_logo.png" 
              alt="Neurogati Logo" 
              className="h-14 w-14 object-contain group-hover:scale-105 transition-transform" 
            />
            <span className="text-2xl font-black tracking-tighter text-[#1c82c2] dark:text-[#38bdf8]">
              NEUROGATI
            </span>
          </Link>

          <nav className="hidden gap-8 md:flex items-center">
            <a href="#overview" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Overview</a>
            <a href="#curriculum" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Curriculum</a>
            <a href="#research" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Research</a>
            <a href="#instructor" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Instructor</a>
            <Link href="/workshops" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">
              All Workshop
            </Link>
          </nav>

          <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black uppercase tracking-tight rounded-full px-6" asChild>
            <a href="#apply">Apply Now</a>
          </Button>

        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-border">
        <div className="container mx-auto px-6 relative z-10 text-center">

          <Badge className="mb-8 bg-cyan-500/10 text-cyan-500 border-cyan-500/20 font-black uppercase tracking-[0.2em] px-5 py-1.5 text-xs">
            3-Day Online Workshop
          </Badge>

          <h1 className="mb-8 text-4xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            AI Applications in EEG
          </h1>

          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground mb-10">
            Explore how EEG signals are collected, processed, and analyzed using AI for breakthrough applications in brain-computer interfaces.
          </p>

          <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white px-8 h-14 rounded-xl font-bold" asChild>
            <a href="https://forms.gle/XuA7KevGG6nWVBou5" target="_blank">Apply Now</a>
          </Button>

        </div>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto px-6 py-24 space-y-32">

        {/* Overview */}
        <section id="overview" className="grid gap-8 md:grid-cols-4">
          {[
            { icon: <Brain />, title: "EEG Basics", desc: "Signal collection and preprocessing fundamentals" },
            { icon: <Zap />, title: "ML & DL", desc: "Machine learning models for EEG decoding" },
            { icon: <Lightbulb />, title: "Real Apps", desc: "Clinical diagnosis and BCIs" },
            { icon: <Laptop />, title: "Hands-On", desc: "Practical experience with MNE-Python" },
          ].map((item, idx) => (
            <Card key={idx} className="p-8 rounded-[2rem]">
              <div className="text-blue-500 mb-6">
                {React.cloneElement(item.icon as React.ReactElement, { className: "h-10 w-10" })}
              </div>
              <h3 className="text-xl font-black mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </Card>
          ))}
        </section>

        {/* SCHEDULE */}
        <section id="schedule" className="space-y-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">Workshop Schedule</h2>
            <p className="text-muted-foreground text-lg">Three days of lectures, demos, and hands-on sessions.</p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">

            <Card className="p-10 rounded-3xl">
              <h3 className="text-2xl font-black mb-6">Day 1 — Foundations & EEG Basics</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Inaugural talk by Prof. Srinivasa Chakravarthy</li>
                <li>EEG principles and system setup</li>
                <li>EEG preprocessing lab</li>
                <li>Machine learning and deep learning for EEG</li>
              </ul>
            </Card>

            <Card className="p-10 rounded-3xl">
              <h3 className="text-2xl font-black mb-6">Day 2 — Imagery & Clinical Studies</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Motor imagery theory and lab</li>
                <li>EEG seizure detection</li>
                <li>Seizure classification lab</li>
              </ul>
            </Card>

            <Card className="p-10 rounded-3xl">
              <h3 className="text-2xl font-black mb-6">Day 3 — Neurodegenerative Detection</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Visual imagery theory</li>
                <li>Parkinson’s detection from EEG</li>
                <li>Alzheimer’s detection lab</li>
                <li>Faculty talks and closing ceremony</li>
              </ul>
            </Card>

          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-20">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Participant Feedback</h2>
          </div>

          <div className="relative max-w-3xl mx-auto">

            <button
              onClick={() => scroll("left")}
              className="absolute -left-14 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full"
            >
              <ChevronLeft/>
            </button>

            <button
              onClick={() => scroll("right")}
              className="absolute -right-14 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full"
            >
              <ChevronRight/>
            </button>

            <div ref={scrollRef} className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth">

              {testimonials.map((text, idx) => (
                <div key={idx} className="min-w-full snap-center flex justify-center">
                  <Card className="max-w-xl p-10 rounded-3xl">
                    <p className="text-lg leading-relaxed">{text}</p>
                    <div className="mt-6 text-xs uppercase text-muted-foreground">
                      Anonymous Participant
                    </div>
                  </Card>
                </div>
              ))}

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="text-center py-20 border-t border-border">
          <h2 className="text-3xl md:text-5xl font-black mb-8">Ready to Decode the Brain?</h2>

          <button
            onClick={() => window.open("https://forms.gle/XuA7KevGG6nWVBou5", "_blank")}
            className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-4 rounded-xl font-bold shadow-2xl"
          >
            Apply Now
          </button>

          <p className="mt-8 text-muted-foreground">
            Questions? Reach out to workshops@neurogati.com
          </p>
        </section>

      </div>
    </div>
  )
}
