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
  Stethoscope,
  Clock,
  AlertCircle
} from "lucide-react"

export default function BrainModelingMedicosJulyPage() {

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
            <a href="#register">Register</a>
          </nav>

          <Badge className="bg-green-600 text-white px-4 py-2">
            Registrations Open
          </Badge>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-40 pb-24 text-center">
        <Badge className="mb-6 bg-green-600">6-Day Intensive Workshop</Badge>

        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
          Brain Modeling for Medicos
        </h1>

        <p className="mt-6 text-xl text-slate-300">
          From Neurons to Disease Models - July 2026 Session
        </p>

        <div className="flex justify-center gap-8 mt-10 text-sm text-slate-400">
          <div className="flex gap-2"><Calendar /> July 8–13, 2026</div>
          <div className="flex gap-2"><Laptop /> Online</div>
          <div className="flex gap-2"><Award /> E-Certificate</div>
        </div>

        {/* Registration Deadline Alert */}
        <div className="mt-8 max-w-2xl mx-auto">
          <Card className="bg-orange-900/30 border-orange-500/50 p-4">
            <div className="flex items-center gap-3 text-orange-300">
              <AlertCircle className="h-5 w-5" />
              <span className="font-semibold">Registration Deadline: June 30, 2026</span>
            </div>
          </Card>
        </div>

        {/* Registration Button */}
        <div className="mt-8 flex justify-center">
          <Link href="https://forms.gle/fwyr2agFpUCMgc41A">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-bold shadow-lg">
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="container mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">

        {[{
          icon: <Stethoscope />, title: "Brain & Disease", desc: "Epilepsy, Parkinson's, depression as dynamical disorders"
        },{
          icon: <Brain />, title: "Neurons to Equations", desc: "Membrane models, HH framework, action potentials"
        },{
          icon: <Activity />, title: "Math Foundations", desc: "Vectors, optimization, learning systems"
        },{
          icon: <Network />, title: "Neural Networks", desc: "CNNs, RNNs and brain computation"
        },{
          icon: <Layers />, title: "Brain Dynamics", desc: "Oscillations, rhythms and seizures"
        },{
          icon: <Brain />, title: "Disease Models", desc: "Parkinson's, DBS, clinical simulations"
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
            "No coding background required",
            "Comprehensive 6-day program with in-depth coverage"
          ].map((t, i) => (
            <Card key={i} className="p-6 text-left">{t}</Card>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-10">6-Day Intensive Schedule</h2>

        <div className="space-y-6 max-w-4xl mx-auto">

          <Card className="p-6">
            <h3 className="font-bold text-lg mb-2">Day 1 - July 8</h3>
            <h4 className="font-semibold text-blue-400 mb-1">Introduction & Foundations</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Why brain modeling matters for medicos</li>
              <li>• Neuron biology fundamentals</li>
              <li>• Introduction to computational approaches</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg mb-2">Day 2 - July 9</h3>
            <h4 className="font-semibold text-blue-400 mb-1">Neuronal Dynamics</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Membrane dynamics and ion channels</li>
              <li>• Hodgkin-Huxley model</li>
              <li>• Action potential generation and propagation</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg mb-2">Day 3 - July 10</h3>
            <h4 className="font-semibold text-blue-400 mb-1">Mathematical Foundations</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Mathematical foundations for brain modeling</li>
              <li>• Neuron abstractions and simplifications</li>
              <li>• Computational efficiency in modeling</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg mb-2">Day 4 - July 11</h3>
            <h4 className="font-semibold text-blue-400 mb-1">Neural Networks</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Neural networks and visual brain models</li>
              <li>• CNNs and RNNs in brain computation</li>
              <li>• Recurrent networks and brain oscillations</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg mb-2">Day 5 - July 12</h3>
            <h4 className="font-semibold text-blue-400 mb-1">Brain Dynamics & Disorders</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Brain oscillations and rhythms</li>
              <li>• Understanding epilepsy through network dynamics</li>
              <li>• Seizure prediction and modeling</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg mb-2">Day 6 - July 13</h3>
            <h4 className="font-semibold text-blue-400 mb-1">Clinical Applications</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Parkinson's disease models</li>
              <li>• Deep Brain Stimulation (DBS) simulations</li>
              <li>• Depression and mood disorder models</li>
              <li>• Future of computational medicine</li>
            </ul>
          </Card>

        </div>
      </section>

      {/* IMPORTANT DATES */}
      <section id="dates" className="container mx-auto px-6 py-20 max-w-2xl">
        <h2 className="text-3xl font-black text-center mb-10">Important Dates</h2>
        <div className="space-y-4">
          <Card className="p-6 border-green-500/30">
            <div className="flex items-center gap-3">
              <Clock className="text-green-400 h-5 w-5" />
              <div>
                <div className="text-lg font-semibold">Registration Opens</div>
                <div className="text-sm text-slate-400">Now Available</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-orange-500/30">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-orange-400 h-5 w-5" />
              <div>
                <div className="text-lg font-semibold">Registration Deadline</div>
                <div className="text-sm text-slate-400">June 30, 2026</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-blue-500/30">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-400 h-5 w-5" />
              <div>
                <div className="text-lg font-semibold">Workshop Dates</div>
                <div className="text-sm text-slate-400">July 8-13, 2026</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* REGISTRATION */}
      <section id="register" className="text-center py-20">
        <h2 className="text-3xl font-black mb-6">Ready to Transform Your Medical Practice?</h2>

        <Badge className="mb-6 bg-green-600 text-white px-6 py-2">Limited Seats Available</Badge>

        <p className="mt-6 text-slate-300 max-w-2xl mx-auto">
          Join us for this comprehensive 6-day workshop and gain cutting-edge insights into computational neuroscience
          that will revolutionize your approach to neurological disorders.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="https://forms.gle/fwyr2agFpUCMgc41A">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 text-lg font-bold">
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/workshops">
            <Button variant="outline" className="px-8 py-6 text-lg">
              View All Workshops
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-slate-400">
          For inquiries: <span className="text-blue-400">workshops@neurogati.com</span>
        </p>
      </section>

    </div>
  )
}