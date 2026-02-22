"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Palette, Users, Gamepad2 } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import { NetworkAnimation } from "@/components/network-animation"
import { StickyBanner } from "@/components/ui/sticky-banner"
import { motion } from "motion/react"

export default function GamesForEveryonePage() {
  const games = [
    {
      id: "mandala-painting",
      title: "Mandala Art Painting Game",
      description: "An interactive digital art system featuring gesture control, automatic image segmentation, multiplayer modes, and therapeutic benefits for all ages. Perfect for seniors and community settings.",
      icon: Palette,
      color: "from-emerald-500 to-teal-500",
      hoverColor: "from-emerald-600 to-teal-600",
      tags: ["Gesture Control", "Multiplayer", "Art Therapy", "All Ages"],
      link: "/exergames/games/mandala-painting"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex w-full flex-col overflow-y-auto">
        <StickyBanner className="bg-gradient-to-b from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            Announcing Workshop on Brain Modeling from January 09th to 13th, 2026.{" "}
            <a href="/modelingworkshop">
              Visit Website
            </a>
          </p>
        </StickyBanner>
      </div>
      <header className="container z-10 flex h-20 items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <img src="/images/bg_just_logo.png" alt="Neurogati Logo" className="h-16 w-16 object-contain" />
            <span className="text-xl font-bold text-white">Neurogati</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Products
          </Link>
          <Link href="/exergames" className="text-sm font-medium text-white transition-colors">
            Exergames
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

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-royal-950 py-4 border-b border-royal-800">
          <div className="container">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/exergames" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Exergames
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">Games for Everyone</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-royal-950 py-20">
          <div className="absolute inset-0 z-0">
            <NetworkAnimation />
            <div className="absolute inset-0 z-5 bg-gradient-to-b from-royal-950/50 via-transparent to-royal-950/80"></div>
          </div>
          <div className="container relative z-20">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-4 py-2 mb-6">
                  <Users className="h-5 w-5 text-emerald-400 mr-2" />
                  <span className="text-emerald-400 text-sm font-semibold">GAMES FOR EVERYONE</span>
                </div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                  Universal Wellness Games
                </h1>
                <p className="mb-10 text-xl text-gray-300 max-w-3xl mx-auto">
                  Universal exergames for general fitness, stress relief, and wellness. Suitable for all ages and abilities, these games make physical activity fun while promoting overall health and well-being.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <section className="bg-royal-900 py-20">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                  Available Games
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Explore our collection of therapeutic games designed for everyone.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {games.map((game, index) => {
                  const Icon = game.icon
                  return (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link href={game.link}>
                        <div className="group rounded-2xl bg-royal-800 border-2 border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 overflow-hidden cursor-pointer h-full">
                          <div className="relative h-48 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                            <Icon className="h-20 w-20 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                              {game.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                              {game.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {game.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-royal-950 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 text-emerald-400 group-hover:gap-4 transition-all">
                              <Play className="h-5 w-5" />
                              <span className="font-semibold">Learn More & Play</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-royal-950 py-20">
          <div className="absolute inset-0 z-0">
            <WaveBackground />
          </div>
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Ready to Start Your Wellness Journey?
              </h2>
              <p className="mb-10 text-xl text-gray-300">
                Join us in exploring fun and engaging games designed for everyone.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/exergames">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-royal-900 hover:text-white bg-transparent"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Categories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-royal-900 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/images/neurogati-logo.jpg" alt="Neurogati" className="h-8 w-auto" />
              </div>
              <p className="text-gray-400">
                Revolutionizing neurological care through AI-powered diagnostics and personalized rehabilitation.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products/diagnostics"
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Diagnostics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/exergames"
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Exergames
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Neurogati. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
