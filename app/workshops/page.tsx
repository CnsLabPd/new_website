"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {StickyBanner} from "@/components/ui/sticky-banner";

export default function WorkshopsPage() {
  const pastWorkshops = [
    {
      id: 1,
      title: "AI Applications in EEG",
      description:
        "Explored cutting-edge artificial intelligence techniques applied to electroencephalography (EEG) data. Learned how to preprocess, analyze, and interpret EEG signals using machine learning algorithms for clinical applications and research.",
      date: "September 26 - 28, 2025",
      duration: "3 days",
      participants: 53,
      location: "Central Library, IIT Madras",
      link: "https://sites.google.com/smail.iitm.ac.in/eegaiworkshop/workshop-sept-2025/home?authuser=0",
    },
    {
      id: 2,
      title: "AI Applications in EEG",
      description:
        "Explore cutting-edge artificial intelligence techniques applied to electroencephalography (EEG) data. Learn how to preprocess, analyze, and interpret EEG signals using machine learning algorithms for clinical applications and research.",
      date: "October 31 - November 2, 2025",
      duration: "3 days",
      participants: 47,
      location: "Central Library, IIT Madras",
      link: "https://sites.google.com/smail.iitm.ac.in/eegaiworkshop/workshop-oct-2025/home?authuser=0",
    },
    {
      id: 3,
      title: "Modeling Brain Function Using ML",
      description:
        "Master machine learning approaches to model and simulate brain functions. This advanced workshop covers neural network architectures, computational neuroscience, and practical implementations for understanding complex brain dynamics.",
      date: "December 5 - 9, 2025",
      duration: "5 days",
      participants: 50,
      location: "Online (GMeet)",
      link: "https://sites.google.com/view/modelingworkshop/home?authuser=4",
    },
  ]

  const upcomingWorkshops = [
    {
      id: 4,
      title: "5-Month Research Training Program in Computational Neuroscience",
      description: 
        "A 5-month, mentorship-driven online program that takes students from foundational coursework to a supervised, conference-ready research project in computational neuroscience.",
      date: "January 01st - May 31st, 2026",
      duration: "20 weeks; Phase 01 - 10 weeks; Phase 02 - 10 weeks",
      participants: 50,
      location: "Online (Zoom)",
      prices: "Phase 01 - 25,000 INR; Phase 02 - 35,000 INR",
      link: "/researchprogram",
    },
    {
      id: 5,
      title: "Modeling Brain Function Using ML",
      description:
        "Master machine learning approaches to model and simulate brain functions. This advanced workshop covers neural network architectures, computational neuroscience, and practical implementations for understanding complex brain dynamics.",
      date: "January 09 - 13, 2026",
      duration: "5 days",
      participants: 70,
      location: "Online (Zoom)",
      prices: "UG Students - 2,000 INR; PG Students - 2,500 INR; Professionals - 3,000 INR",
      link: "/modelingworkshop",
    },
    {
      id: 6,
      title: "Demystifying the Brain",
      description:
        "Introduces key ideas from modern computational neuroscience, making the mathematics and principles behind brain function accessible to students from biology, medicine, engineering, and computer science.",
      date: "January 23 - 25, 2026",
      duration: "3 days",
      participants: 70,
      location: "Online (Zoom)",
      prices: "UG Students - 2,500 INR; PG Students - 3,000 INR; Professionals - 3,500 INR",
      link: "Upcoming",/*"https://sites.google.com/view/modelingworkshop/home?authuser=4",*/
    },
  ]
  
  const isExternalLink = (link) =>
  link.startsWith("http://") || link.startsWith("https://")
  return (
    <div className="min-h-screen bg-royal-950 text-white">
      {/* Header */}
      <div className="relative flex w-full flex-col overflow-y-auto">
        <StickyBanner className="bg-gradient-to-b from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            Announcing Workshop on Brain Modeling [Online] from January 09th to 13th, 2026.{" "}
            <a href="https://sites.google.com/view/modelingworkshop/home?authuser=4">
              Visit Website
            </a>
          </p>
        </StickyBanner>
      </div>
      <header className="container z-10 flex h-20 items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/images/bg_just_logo.jpg" alt="Neurogati" className="h-10 w-auto" />
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Products
          </Link>
          <Link href="/workshops" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Workshops
          </Link>
          <Link href="/research" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Research
          </Link>
          <Link href="/team" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Team
          </Link>
          <Link href="/careers" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Careers
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-royal-500 to-neon-500 hover:from-royal-600 hover:to-neon-400">
              Contact Us
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Professional Workshops
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300">
              Expand your expertise in computational neuroscience, neurotechnology, AI diagnostics, and neurorehabilitation through our
              comprehensive workshop programs.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-cyan-400">Upcoming Workshops</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcomingWorkshops.map((workshop) => (
              <Card
                key={workshop.id}
                className="border-cyan-500/20 bg-royal-900/50 hover:border-cyan-400/50 transition"
              >
                <CardHeader>
                  <CardTitle className="text-cyan-400">{workshop.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{workshop.description}</p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Date:</span>
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Duration:</span>
                      <span>{workshop.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Participants:</span>
                      <span>{workshop.participants} max</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Location:</span>
                      <span>{workshop.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Pricing:</span>
                      <span>{workshop.prices}</span>
                    </div>
                  </div>
                  {workshop.link !== "Upcoming" && (
                  isExternalLink(workshop.link) ? (
                    <a
                      href={workshop.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700">
                        Learn More
                      </Button>
                    </a>
                  ) : (
                    <Link href={workshop.link} className="block">
                      <Button className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700">
                        Learn More
                      </Button>
                    </Link>
                  )
                )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-cyan-400">Past Events</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pastWorkshops.map((workshop) => (
              <Card
                key={workshop.id}
                className="border-cyan-500/20 bg-royal-900/50 hover:border-cyan-400/50 transition opacity-75"
              >
                <CardHeader>
                  <CardTitle className="text-cyan-400">{workshop.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{workshop.description}</p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Date:</span>
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Duration:</span>
                      <span>{workshop.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Participants:</span>
                      <span>{workshop.participants}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Location:</span>
                      <span>{workshop.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-cyan-500/20 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-cyan-400">Ready to Level Up Your Skills?</h2>
          <p className="mb-8 text-lg text-gray-300">
            Join our expert-led workshops and connect with industry professionals in neurotechnology and AI.
          </p>
          <Link href="/contact">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg">
              Register for a Workshop
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-royal-950/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-2">
            <img src="/images/neurogati-logo.jpg" alt="Neurogati" className="h-8 w-auto" />
            <span className="text-xl font-bold text-white">Neurogati</span>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-semibold text-cyan-400">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/products/diagnostics" className="hover:text-cyan-400">
                    Diagnostics
                  </Link>
                </li>
                <li>
                  <Link href="/products/therapy" className="hover:text-cyan-400">
                    Therapy
                  </Link>
                </li>
                <li>
                  <Link href="/products/bci" className="hover:text-cyan-400">
                    BCI
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-cyan-400">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-cyan-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-cyan-400">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-cyan-400">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-cyan-400">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/research" className="hover:text-cyan-400">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/workshops" className="hover:text-cyan-400">
                    Workshops
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-cyan-400">
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-cyan-400">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-cyan-500/20 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NeuroAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
