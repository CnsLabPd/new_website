"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Brain,
  Network,
  Activity,
  Layers,
  Calendar,
  Award,
  Laptop,
  ArrowRight,
  Mail,
} from "lucide-react"

export default function BrainModelingWorkshopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">

          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/bg_just_logo.png"
              alt="Neurogati Logo"
              className="h-14 w-14 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-2xl font-black tracking-tighter text-[#38bdf8]">
              NEUROGATI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#overview" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Overview</a>
            <a href="#schedule" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Schedule</a>
            <a href="#fees" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Fees</a>
            <a href="#testimonials" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Testimonials</a>
          </nav>

          <Button
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black uppercase tracking-tight hover:from-cyan-500 hover:to-blue-600 rounded-full px-6"
            asChild
          >
            <a
              href="https://forms.gle/btcfr8wDBMN3PWCeA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
            </a>
          </Button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-40 pb-24 border-b border-white/10 text-center">
        <div className="container mx-auto px-6">

          <Badge className="mb-8 bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-black uppercase tracking-[0.2em] px-5 py-1.5 text-xs">
            5-Day Online Workshop
          </Badge>

          <h1 className="mb-8 text-4xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Workshop on Brain Modeling
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-slate-300 mb-10">
            From single neuron dynamics to oscillatory networks and
            large-scale brain system modeling.
          </p>

          <div className="flex justify-center gap-10 text-sm font-bold uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              27–31 March 2026
            </div>
            <div className="flex items-center gap-2">
              <Laptop className="h-5 w-5 text-blue-400" />
              Online
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-400" />
              E-Certificate
            </div>
          </div>

        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-6 py-24 space-y-32">

        {/* Overview */}
        <section id="overview" className="grid gap-8 md:grid-cols-4">

          {[
            {
              icon: <Brain />,
              title: "Single Neuron Models",
              desc: "HH, Morris-Lecar, FitzHugh–Nagumo, Izhikevich models",
            },
            {
              icon: <Network />,
              title: "Neural Networks",
              desc: "Deep learning & CNN applications in neuroscience",
            },
            {
              icon: <Activity />,
              title: "Oscillations",
              desc: "Phase plane analysis, rhythms & DONNs",
            },
            {
              icon: <Layers />,
              title: "Systems Modeling",
              desc: "Basal ganglia, hippocampus, fMRI network models",
            },
          ].map((item, idx) => (
            <Card
              key={idx}
              className="bg-card border border-border p-8 rounded-[2rem] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="text-blue-500 mb-6">
                {React.cloneElement(item.icon as React.ReactElement, {
                  className: "h-10 w-10",
                })}
              </div>

              <h3 className="text-xl font-black mb-3">
                {item.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>

            </Card>
          ))}

        </section>

        {/* Schedule */}
        <section id="schedule" className="space-y-12">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">
              Workshop Schedule
            </h2>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">

            <Card className="p-8 rounded-[2rem]">
              <h3 className="text-2xl font-black mb-6">
                Day 1 – Single Neuron Dynamics
              </h3>

              <ul className="space-y-2 text-muted-foreground">
                <li>• Introduction to Computational Neuroscience</li>
                <li>• Single neuron signaling</li>
                <li>• HH, Morris-Lecar, FN & Izhikevich models</li>
                <li>• Practical sessions (PyTorch implementation)</li>
              </ul>
            </Card>

            <Card className="p-8 rounded-[2rem]">
              <h3 className="text-2xl font-black mb-6">
                Day 2 – Neural Networks
              </h3>

              <ul className="space-y-2 text-muted-foreground">
                <li>• CNNs in motor, visual & auditory neuroscience</li>
                <li>• Deep neural networks & system organization</li>
              </ul>
            </Card>

            <Card className="p-8 rounded-[2rem]">
              <h3 className="text-2xl font-black mb-6">
                Day 3 – Oscillations
              </h3>

              <ul className="space-y-2 text-muted-foreground">
                <li>• Neural rhythms & measurement techniques</li>
                <li>• Phase plane analysis & limit cycles</li>
                <li>• DONNs</li>
              </ul>
            </Card>

          </div>

        </section>

      </div>

      {/* ================= FEES ================= */}
      <section id="fees" className="container mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20">

        <div>
          <h2 className="text-4xl font-black mb-4">Important Dates</h2>

          <div className="space-y-8 mt-10">
            {[
              { title: "SOP Submission", date: "10 March 2026" },
              { title: "Selection Results", date: "11 March 2026" },
              { title: "Registration Deadline", date: "20 March 2026" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between p-6 border border-white/10 rounded-xl">
                <span>{item.title}</span>
                <span className="text-blue-400 font-bold">{item.date}</span>
              </div>
            ))}
          </div>

        </div>

        <div>
          <h2 className="text-4xl font-black mb-4">Fee Structure</h2>

          <div className="space-y-6 mt-10">
            {[
              { label: "UG Students", price: "₹3,000" },
              { label: "PG / PhD Students", price: "₹3,500" },
              { label: "Professionals", price: "₹4,000" },
              { label: "International", price: "$45" },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                <p className="text-slate-400 text-sm">{item.label}</p>
                <p className="text-3xl font-black text-blue-300">{item.price}</p>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="testimonials" className="container mx-auto px-6 py-28">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Participant Feedback</h2>
          <p className="text-slate-400">
            Anonymous feedback from previous workshop participants
          </p>
        </div>

        <div className="relative">

          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050814] to-transparent z-10 pointer-events-none"/>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050814] to-transparent z-10 pointer-events-none"/>

          <div className="flex gap-8 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory">

            {[
              "Thank you so much for this workshop. It was incredibly informative and I learned a lot throughout the five days. Both the theory and practical portions were fascinating to explore.",
              "It was beautifully organised with the right balance between theory and hands-on sessions.",
              "As a bachelor's student in neuroscience, this was the most helpful learning experience I've had.",
              "This workshop gave me direction on how to start modelling. Learning from Prof. Srinivasa Chakravarthy and interacting with fellow attendees was an amazing experience.",
              "The neuron models were incredibly intriguing. Being able to simulate what happens in the brain felt amazing.",
            ].map((testimonial, idx) => (
              <TestimonialCard key={idx} text={testimonial} />
            ))}

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="text-center py-24 border-t border-white/10">

        <h2 className="text-4xl font-black mb-8">
          Ready to Model the Brain?
        </h2>

        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-xl font-bold"
          asChild
        >
          <a
            href="https://forms.gle/btcfr8wDBMN3PWCeA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now <ArrowRight className="h-5 w-5 ml-2" />
          </a>
        </Button>

        <p className="mt-8 text-slate-400 flex justify-center items-center gap-2">
          <Mail className="h-4 w-4" />
          workshops@neurogati.com
        </p>

      </section>

    </div>
  )
}

/* ================= TESTIMONIAL CARD ================= */

function TestimonialCard({ text }: { text: string }) {
  return (
    <div className="snap-center shrink-0 w-[340px] md:w-[420px]">

      <Card className="h-full p-10 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-md hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">

        <div className="text-cyan-400 text-4xl mb-4">“</div>

        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          {text}
        </p>

        <div className="mt-8 text-xs text-slate-500 font-semibold uppercase tracking-widest">
          Anonymous Participant
        </div>

      </Card>

    </div>
  )
}
