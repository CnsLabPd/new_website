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

`The sessions delivered by faculty members and neurotechnology experts provided valuable insights into EEG acquisition, preprocessing, feature extraction, AI-based neural decoding especially of motor imagery, visual imagery, epilepsy & seizure detection, neurodegenerative disorders.`,

`The program was exceptionally well designed, with extensive hands-on sessions focused on EEG signal preprocessing and practical applications. The workshop offered deep insights into how the human brain functions and the interdisciplinary intersection of neuro-engineering, psychology, and biology.`,

`The focus on building up the workshop from the fundamentals made it very engaging.`,

`Advanced pre-processing is something I wanted to learn for a very long time and I got foundational knowledge on it.`,

`The deep learning and machine learning part along with codes as my background is from bioinformatics. I also found biology part of the workshop helpful in recalling neuroscience fundamentals.`,

`Sessions on Motor and Visual Imagery were extremely insightful. Before the workshop I could not quite understand how one could decode imagination — now I have a much clearer picture on what is possible.`
  ]

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* Header/Nav */}
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

          <div className="flex items-center gap-3">
            <Button
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black uppercase tracking-tight hover:from-cyan-500 hover:to-blue-600 rounded-full px-6"
              asChild
            >
              <a href="#apply">Apply Now</a>
            </Button>
          </div>
        </div>
      </header>
      
      {/* HERO */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-border">
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#1c82c2 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <Badge className="mb-8 bg-cyan-500/10 text-cyan-500 border-cyan-500/20 font-black uppercase tracking-[0.2em] px-5 py-1.5 text-xs">
              3-Day Online Workshop
            </Badge>

            <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              AI Applications in EEG
            </h1>

            <p className="max-w-3xl text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium mb-10">
              Explore how EEG signals are collected, processed, and analyzed using AI for breakthrough applications in brain-computer interfaces.
            </p>

            <Button
              size="lg"
              className="bg-blue-800 hover:bg-blue-900 text-white px-8 h-14 rounded-xl flex items-center gap-2 font-bold transition-all shadow-xl"
              asChild
            >
              <a href="https://forms.gle/XuA7KevGG6nWVBou5" target="_blank">
                Apply Now <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CONTENT WRAPPER */}
      <div className="container mx-auto px-6 py-24 space-y-32">
        
        {/* Overview */}
        <section id="overview" className="grid gap-8 md:grid-cols-4">
          {[
            { icon: <Brain />, title: "EEG Basics", desc: "Signal collection and preprocessing fundamentals" },
            { icon: <Zap />, title: "ML & DL", desc: "Machine learning models for EEG decoding" },
            { icon: <Lightbulb />, title: "Real Apps", desc: "Clinical diagnosis and BCIs" },
            { icon: <Laptop />, title: "Hands-On", desc: "Practical experience with MNE-Python" },
          ].map((item, idx) => (
            <Card key={idx} className="bg-card border border-border p-8 rounded-[2rem] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="text-blue-500 mb-6">
                {React.cloneElement(item.icon as React.ReactElement, { className: "h-10 w-10" })}
              </div>
              <h3 className="text-xl font-black mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </section>

        {/* SCHEDULE */}
        {/* Schedule Section */}
<section id="schedule" className="space-y-12">

  <div className="text-center mb-16">
    <h2 className="text-4xl font-black tracking-tight mb-4">Workshop Schedule</h2>
    <p className="text-muted-foreground text-lg">
      Three days of lectures, live demos, and hands-on lab sessions.
    </p>
  </div>

  <div className="space-y-8 max-w-5xl mx-auto">

    {/* Day 1 */}
    <Card className="bg-card border border-border rounded-[2.5rem] overflow-hidden">
      <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">

        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 text-2xl font-black">
          01
        </div>

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <h3 className="text-2xl font-black">Day 1: Foundations & EEG Basics</h3>
            <Badge variant="secondary" className="font-bold">
              Feb 20 • 9:00 AM IST
            </Badge>
          </div>

          <div className="grid gap-4">

            <div className="p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="font-bold text-foreground">
                Inaugural Talk: Prof. Srinivasa Chakravarthy
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Overview of EEG, BCIs and AI applications in neuroscience.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="font-bold text-foreground">
                Introduction to EEG & System Setup (9:00–10:00)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                EEG principles, 10–20 montage, cap fitting demo, impedance check demonstration.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="font-bold text-foreground">
                EEG Pre-processing Lab (10:00–13:00)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Filtering, artifact removal, ICA techniques, and preparing EEG signals for machine learning.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="font-bold text-foreground">
                ML & DL for EEG (14:00–17:15)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Feature extraction (PSD, PLI), machine learning models (SVM, Random Forest), and deep learning models (CNN, LSTM) for EEG classification.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Card>

    {/* Day 2 */}
    <Card className="bg-card border border-border rounded-[2.5rem] overflow-hidden">
      <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">

        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 text-2xl font-black">
          02
        </div>

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <h3 className="text-2xl font-black">
              Day 2 – Imagery & Clinical Studies (Feb 21)
            </h3>
            <Badge variant="secondary" className="font-bold">
              9:00 AM – 5:30 PM IST
            </Badge>
          </div>

          <div className="grid gap-4">

            <div className="p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="font-bold text-foreground">
                Motor Imagery Theory & Lab (9:00–11:00)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Guided lab session using left/right hand imagination tasks and
                classification of Motor Imagery EEG signals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="font-bold text-foreground">
                Epilepsy & Seizure Detection (14:00–15:30)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Introduction to BONN EEG dataset, spike detection,
                seizure event annotation and clinical relevance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="font-bold text-foreground">
                Lab: Seizure Classification (15:30–17:15)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Comparative modeling using Random Forest and CNN architectures
                for automated seizure detection.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Card>

    {/* Day 3 */}
    <Card className="bg-card border border-border rounded-[2.5rem] overflow-hidden">
      <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">

        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 text-2xl font-black">
          03
        </div>

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <h3 className="text-2xl font-black">
              Day 3 – Neurodegenerative Detection (Feb 22)
            </h3>
            <Badge variant="secondary" className="font-bold">
              9:00 AM – 5:30 PM IST
            </Badge>
          </div>

          <div className="grid gap-4">

            <div className="p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="font-bold text-foreground">
                Neurodegenerative Disorder Detection (9:00–11:00)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Parkinson’s vs Healthy classification using EEG biomarkers and
                machine learning models.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="font-bold text-foreground">
                Alzheimer's Detection Lab (11:00–13:00)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                EEG marker extraction and classification of Alzheimer's vs healthy
                brain activity patterns.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="font-bold text-foreground">
                Visual Imagery Lab (14:00–15:30)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Studying EEG signatures of imagined objects and scenes and decoding
                visual imagination patterns.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="font-bold text-foreground">
                Faculty Talks & Closing Ceremony (15:30–17:30)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Talks by neurotechnology experts followed by closing ceremony
                and certificate distribution.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Card>

  </div>
</section>

        {/* Important Dates & Fees */}
        <section className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight">Important Dates</h2>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-6 bg-card border border-border rounded-2xl">
                <span className="font-bold">SOP Submission</span>
                <span className="text-blue-500 font-black">29 Jan 2026</span>
              </div>
              <div className="flex items-center justify-between p-6 bg-card border border-border rounded-2xl">
                <span className="font-bold">Selection Results</span>
                <span className="text-blue-500 font-black">30 Jan 2026</span>
              </div>
              <div className="flex items-center justify-between p-6 bg-card border border-border rounded-2xl">
                <span className="font-bold">Fee Payment Deadline</span>
                <span className="text-blue-500 font-black">06 Feb 2026</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight">Fee Structure</h2>
            <div className="grid grid-cols-2 gap-4">
               <Card className="p-6 bg-card border border-border text-white rounded-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">UG</p>
                  <p className="text-3xl font-black">₹3,000</p>
               </Card>
               <Card className="p-6 bg-blue-600 border border-border rounded-2xl border-0">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">PG/PhD</p>
                  <p className="text-3xl font-black">₹3,500</p>
               </Card>
               <Card className="p-6 bg-card border border-border rounded-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Professional</p>
                  <p className="text-3xl font-black">₹4,000</p>
               </Card>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-20">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Participant Feedback</h2>
            <p className="text-muted-foreground">Anonymous feedback from previous participants</p>
          </div>

          <div className="relative max-w-3xl mx-auto">

            <button
              onClick={() => scroll("left")}
              className="absolute -left-14 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full"
            >
              <ChevronLeft/>
            </button>

            <button
              onClick={() => scroll("right")}
              className="absolute -right-14 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full"
            >
              <ChevronRight/>
            </button>

            <div ref={scrollRef} className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth">

              {testimonials.map((text, idx) => (
                <div key={idx} className="min-w-full snap-center flex justify-center">
                  <Card className="max-w-xl p-10 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10">
                    <div className="text-cyan-400 text-4xl mb-4">“</div>
                    <p className="text-lg text-slate-300 leading-relaxed">{text}</p>
                    <div className="mt-6 text-xs text-slate-500 uppercase tracking-widest">
                      Anonymous Participant
                    </div>
                  </Card>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-20 border-t border-border">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">Ready to Decode the Brain?</h2>
          <button
            onClick={() => window.open("https://forms.gle/XuA7KevGG6nWVBou5", "_blank")}
            className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-4 rounded-xl flex items-center gap-2 font-bold transition-all active:scale-95 shadow-2xl"
          >
            Apply Now <ArrowRight className="h-5 w-5" />
          </button>
          <p className="mt-8 text-muted-foreground font-medium">
            Questions? Reach out to <a href="mailto:workshops@neurogati.com" className="text-blue-500 hover:underline">workshops@neurogati.com</a>
          </p>
        </section>

      </div>
    </div>
  )
}
