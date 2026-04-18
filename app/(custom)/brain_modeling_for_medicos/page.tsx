"use client"

import React, { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Brain,
  Activity,
  Network,
  Layers,
  Calendar,
  Award,
  Laptop,
  ArrowRight,
  Mail,
  ChevronLeft,
  ChevronRight,
  Stethoscope
} from "lucide-react"

export default function BrainModelingMedicosPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">

          <Link href="/" className="flex items-center gap-3 group">
            <img src="/bg_just_logo.png" className="h-14 w-14" />
            <span className="text-2xl font-black text-[#38bdf8]">NEUROGATI</span>
          </Link>

          <nav className="hidden md:flex gap-8">
            <a href="#overview">Overview</a>
            <a href="#schedule">Schedule</a>
            <a href="#why">Why Attend</a>
            <a href="#fees">Fees</a>
          </nav>

          <Button asChild className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-full px-6">
            <a href="https://forms.gle/mU8udhpJgUEBNm36A" target="_blank" rel="noopener noreferrer" target="_blank">Apply Now</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-40 pb-24 text-center">
        <Badge className="mb-6">7-Day Online Workshop</Badge>

        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
          Brain Modeling for Medicos
        </h1>

        <p className="mt-6 text-xl text-slate-300">
          From Neurons to Disease Models
        </p>

        <div className="flex justify-center gap-8 mt-10 text-sm text-slate-400">
          <div className="flex gap-2"><Calendar /> May 18–24, 2026</div>
          <div className="flex gap-2"><Laptop /> Online</div>
          <div className="flex gap-2"><Award /> E-Certificate</div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="container mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">

        {[{
          icon: <Stethoscope />, title: "Brain & Disease", desc: "Epilepsy, Parkinson’s, depression as dynamical disorders"
        },{
          icon: <Brain />, title: "Neurons to Equations", desc: "Membrane models, HH framework, action potentials"
        },{
          icon: <Activity />, title: "Math Foundations", desc: "Vectors, optimization, learning systems"
        },{
          icon: <Network />, title: "Neural Networks", desc: "CNNs, RNNs and brain computation"
        },{
          icon: <Layers />, title: "Brain Dynamics", desc: "Oscillations, rhythms and seizures"
        },{
          icon: <Brain />, title: "Disease Models", desc: "Parkinson’s, DBS, clinical simulations"
        }].map((item, i) => (
          <Card key={i} className="p-6">
            <div className="text-blue-400 mb-4">{item.icon}</div>
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.desc}</p>
          </Card>
        ))}
      </section>

      {/* WHY ATTEND */}
      <section id="why" className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-black mb-10">Why Attend?</h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            "Understand diseases mechanistically, not just descriptively",
            "Bridge medicine with AI and computational models",
            "Hands-on simulations of real brain dynamics",
            "Learn directly from leading neuroscience researchers",
            "No coding background required"
          ].map((t, i) => (
            <Card key={i} className="p-6 text-left">{t}</Card>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-10">Schedule</h2>

        <div className="space-y-6 max-w-4xl mx-auto">

          <Card className="p-6">
            <h3 className="font-bold">Day 1</h3>
            <p>Why brain modeling, neuron biology, HH model</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold">Day 2</h3>
            <p>Mathematical foundations, neuron abstractions</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold">Day 3</h3>
            <p>Neural networks and visual brain models</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold">Day 4</h3>
            <p>Recurrent networks, oscillations, epilepsy</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold">Day 5-7</h3>
            <p>Learning, reinforcement, Parkinson’s & DBS</p>
          </Card>

        </div>
      </section>

      {/* FEES */}
      <section id="fees" className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">

        <div>
          <h2 className="text-3xl font-black">Important Dates</h2>
          <div className="mt-6 space-y-4">
            <div>Application Deadline – April 30</div>
            <div>Selection – May 2</div>
            <div>Payment – May 15</div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black">Fee</h2>
          <div className="mt-6 text-2xl font-bold text-blue-300">₹2500</div>
          <p className="text-slate-400">All students</p>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-black mb-6">Join the Workshop</h2>

        <Button asChild size="lg">
          <a href="https://forms.gle/mU8udhpJgUEBNm36A" target="_blank" rel="noopener noreferrer">Apply Now <ArrowRight className="ml-2" /></a>
        </Button>

        <p className="mt-6 text-slate-400 flex justify-center gap-2">
          <Mail /> workshops@neurogati.com
        </p>
      </section>

    </div>
  )
}
