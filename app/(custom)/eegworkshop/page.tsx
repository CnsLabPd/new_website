"use client"

import React from 'react' // CRITICAL: Added for React.cloneElement to work
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Link,
} from "lucide-react"

export default function EEGAIWorkshopPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
            {/* Header/Nav - Fixed Logo Spacing & Boldness */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-90 transition group"
          >
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
            <Link href="/workshops" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">All Workshop
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
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-border">
        {/* Subtle Neuro-Grid Pattern */}
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

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-blue-800 hover:bg-blue-900 text-white px-8 h-14 rounded-xl flex items-center gap-2 font-bold transition-all shadow-xl"
                asChild
              >
                <a href="https://forms.gle/XuA7KevGG6nWVBou5" target="_blank" rel="noopener noreferrer">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl h-14 px-8 border-border font-bold bg-transparent"
                asChild
              >
                <a href="#schedule">View Schedule</a>
              </Button>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-10 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>Feb 20-22, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop className="h-5 w-5 text-blue-500" />
                <span>Online Format</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                <span>Certification</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT WRAPPER --- */}
      <div className="container mx-auto px-6 py-24 space-y-32">
        
        {/* Overview Cards */}
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

        {/* Schedule Section */}
        <section id="schedule" className="space-y-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">Workshop Schedule</h2>
            <p className="text-muted-foreground text-lg">Three days of lectures, live demos, and hands-on lab sessions.</p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            <Card className="bg-card border border-border rounded-[2.5rem] overflow-hidden">
               <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 text-2xl font-black">
                    01
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                       <h3 className="text-2xl font-black">Day 1: Foundations & EEG Basics</h3>
                       <Badge variant="secondary" className="font-bold">Feb 20 • 9:00 AM IST</Badge>
                    </div>
                    <div className="grid gap-4">
                       <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                          <p className="font-bold text-foreground">Inaugural Talk: Prof. Srinivasa Chakravarthy</p>
                          <p className="text-sm text-muted-foreground mt-1">Overview of EEG, BCIs and AI applications in neuroscience.</p>
                       </div>
                       <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                          <p className="font-bold text-foreground">Introduction to EEG & System Setup (9:00-10:00)</p>
                          <p className="text-sm text-muted-foreground mt-1">EEG principles, 10-20 montage, cap fitting demo, impedance check demonstration</p>
                       </div>
                        <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                          <p className="font-bold text-foreground">EEG Pre-processing Lab (10:00-13:00)</p>
                          <p className="text-sm text-muted-foreground mt-1">EEG principles, 10-20 montage, cap fitting demo, impedance check demonstration</p>
                       </div>
                       <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                          <p className="font-bold text-foreground">ML & DL for EEG (14:00-17:15)</p>
                          <p className="text-sm text-muted-foreground mt-1">Feature extraction (PSD, PLI), Models (SVM, CNN, LSTM), End-to-end pipeline demo.</p>
                       </div>
                    </div>
                  </div>
               </div>
            </Card>
            <Card className="bg-card border border-border rounded-[2.5rem] overflow-hidden">
               <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 text-2xl font-black">
                    02
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                       <h3 className="text-2xl font-black">Day 2 - Imagery & Clinical Studies (Feb 21)</h3>
                       <Badge variant="secondary" className="font-bold">9:00 AM - 5:30 PM IST</Badge>
                    </div>
                    <div className="grid gap-4">
                       <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                          <p className="font-bold text-foreground">Motor Imagery Theory & Lab (9:00-11:00)</p>
                          <p className="text-sm text-muted-foreground mt-1">Guided lab session using L/R hand imagination tasks, offline classification of Motor Imagery data.</p>
                       </div>
                       <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                          <p className="font-bold text-foreground">Epilepsy & Seizure Detection (14:00-15:30)</p>
                          <p className="text-sm text-muted-foreground mt-1">Introduction to BONN EEG Dataset, spike detection basics, seizure event annotation.</p>
                       </div>
                        <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                          <p className="font-bold text-foreground">Lab: Seizure Classification (15:30-17:15)</p>
                          <p className="text-sm text-muted-foreground mt-1">Comparative modeling using Random Forest and CNN architectures for seizure detection.</p>
                       </div>
                    </div>
                  </div>
               </div>
            </Card>
            <Card className="bg-card border border-border rounded-[2.5rem] overflow-hidden">
               <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 text-2xl font-black">
                    03
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                       <h3 className="text-2xl font-black">Day 3 - Neurodegenerative Detection (Feb 22)</h3>
                       <Badge variant="secondary" className="font-bold">9:00 AM - 5:30 PM IST</Badge>
                    </div>
                    <div className="grid gap-4">
                       <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                          <p className="font-bold text-foreground">Visual Imagery Theory & Lab (11:00-13:00)</p>
                          <p className="text-sm text-muted-foreground mt-1">Imagined objects/scenes in EEG patterns, signal analysis and classification approaches.</p>
                       </div>
                       <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                          <p className="font-bold text-foreground">Neurodegenerative Disorder Detection (9:00-11:00)</p>
                          <p className="text-sm text-muted-foreground mt-1">Parkinson's vs Healthy classification, extract relevant EEG markers, build and evaluate ML classifier.</p>
                       </div>
                        <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                          <p className="font-bold text-foreground">Alzheimer's Detection Lab (11:00-13:00)</p>
                          <p className="text-sm text-muted-foreground mt-1">Alzheimer's vs Healthy classification, relevant marker extraction, ML classifier evaluation</p>
                       </div>
                       <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                          <p className="font-bold text-foreground">Faculty Talks & Closing Ceremony (14:00-17:30)</p>
                          <p className="text-sm text-muted-foreground mt-1">Talks by faculty and neurotechnology experts, closing ceremony, certificate distribution.</p>
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
               <Card className="p-6 bg-card border border-border  text-white rounded-2xl">
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

        {/* Final CTA Area */}
        <section className="text-center py-20 border-t border-border">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">Ready to Decode the Brain?</h2>
          <div className="flex justify-center">
            <button
              onClick={() => window.open("https://forms.gle/XuA7KevGG6nWVBou5", "_blank")}
              className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-4 rounded-xl flex items-center gap-2 font-bold transition-all active:scale-95 shadow-2xl"
            >
              Apply Now <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-8 text-muted-foreground font-medium">
            Questions? Reach out to <a href="mailto:workshops@neurogati.com" className="text-blue-500 hover:underline">workshops@neurogati.com</a>
          </p>
        </section>

      </div>
    </div>
  )
}