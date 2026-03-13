"use client"

import React, { useRef } from "react"
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function BrainModelingWorkshopPage() {

  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    const width = scrollRef.current.clientWidth

    scrollRef.current.scrollBy({
      left: direction === "right" ? width : -width,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">

      {/* HEADER */}
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
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black uppercase tracking-tight rounded-full px-6"
            asChild
          >
            <a href="https://forms.gle/btcfr8wDBMN3PWCeA" target="_blank">
              Apply Now
            </a>
          </Button>

        </div>
      </header>

      {/* HERO */}
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

      {/* TESTIMONIALS */}
      <section id="testimonials" className="container mx-auto px-6 py-32">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Participant Feedback</h2>
          <p className="text-slate-400">
            Anonymous feedback from previous workshop participants
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">

          {/* LEFT BUTTON */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-14 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full"
          >
            <ChevronLeft />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-14 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full"
          >
            <ChevronRight />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth"
          >

            {[
              "Thank you so much for this workshop. It was incredibly informative and I learned a lot throughout the five days.",
              "It was beautifully organised with the right balance between theory and hands-on sessions.",
              "As a bachelor's student in neuroscience, this was the most helpful learning experience I've had.",
              "This workshop gave me direction on how to start modelling.",
              "The neuron models were incredibly intriguing. Being able to simulate brain dynamics felt amazing.",
            ].map((text, idx) => (
              <div
                key={idx}
                className="min-w-full snap-center flex justify-center"
              >
                <TestimonialCard text={text} />
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="text-center py-24 border-t border-white/10">

        <h2 className="text-4xl font-black mb-8">
          Ready to Model the Brain?
        </h2>

        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-xl font-bold"
          asChild
        >
          <a href="https://forms.gle/btcfr8wDBMN3PWCeA" target="_blank">
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

function TestimonialCard({ text }: { text: string }) {
  return (
    <Card className="max-w-xl p-10 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-md">

      <div className="text-cyan-400 text-4xl mb-4">“</div>

      <p className="text-slate-300 leading-relaxed text-lg">
        {text}
      </p>

      <div className="mt-8 text-xs text-slate-500 font-semibold uppercase tracking-widest">
        Anonymous Participant
      </div>

    </Card>
  )
}
