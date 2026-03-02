"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye, Brain, Users, Gamepad2, Hand, Activity, TrendingUp, BarChart3, Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function ExergamesPage() {
  const categories = [
    {
      title: "Games for Visually Impaired",
      description: "Inclusive exergames designed with audio feedback, haptic responses, and voice guidance. Play using sound cues, physical movements, and spatial awareness to improve mobility and confidence.",
      icon: Eye,
      color: "from-purple-500 to-pink-500",
      hoverColor: "from-purple-600 to-pink-600",
      features: ["Audio-First Design", "Haptic Feedback", "Voice Navigation", "Spatial Training"],
      delay: 0.1,
      link: "#"
    },
    {
      title: "Games for ADHD",
      description: "Engaging, fast-paced exergames that improve focus, attention span, and impulse control. Dynamic challenges adapt to maintain optimal engagement levels while tracking cognitive improvements.",
      icon: Brain,
      color: "from-cyan-500 to-blue-500",
      hoverColor: "from-cyan-600 to-blue-600",
      features: ["Focus Training", "Attention Tracking", "Adaptive Difficulty", "Progress Analytics"],
      delay: 0.2,
      link: "#"
    },
    {
      title: "Games for Everyone",
      description: "Universal exergames for general fitness, stress relief, and wellness. Suitable for all ages and abilities, these games make physical activity fun while promoting overall health and well-being.",
      icon: Users,
      color: "from-emerald-500 to-teal-500",
      hoverColor: "from-emerald-600 to-teal-600",
      features: ["All-Age Friendly", "Fitness Tracking", "Social Play", "Wellness Goals"],
      delay: 0.3,
      link: "/exergames/categories/games-for-everyone"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-royal-950">
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
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-royal-950 py-20 md:py-32">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-royal-900 via-royal-950 to-royal-900"></div>
          <div className="container relative z-20">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
                  Exergames
                </h1>
                <p className="mb-10 text-xl text-gray-300">
                  Revolutionary exercise gaming that transforms rehabilitation and wellness through intelligent, motion-based gameplay.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="relative overflow-hidden bg-royal-900 py-20">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <motion.div
                className="grid md:grid-cols-2 gap-12 items-center mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div>
                  <div className="inline-flex rounded-full bg-gradient-to-r from-royal-500/20 to-neon-500/20 p-3 mb-6">
                    <Gamepad2 className="h-10 w-10 text-neon-400" />
                  </div>
                  <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                    Beyond Traditional Gaming
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    Exergames represent a revolutionary category of therapeutic gaming where physical movement becomes the controller. Unlike traditional games, our exergames leverage advanced motion tracking, gesture recognition, and biometric sensors to create an immersive rehabilitation experience.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Players don't just press buttons—they move, stretch, balance, and engage their entire body while the game intelligently adapts to their capabilities and progress.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="rounded-lg bg-royal-800 p-6 border border-neon-500/20"
                    whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.4)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Hand className="h-8 w-8 text-cyan-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">Gesture Control</h3>
                    <p className="text-sm text-gray-400">Play with natural hand movements and gestures</p>
                  </motion.div>
                  <motion.div
                    className="rounded-lg bg-royal-800 p-6 border border-neon-500/20"
                    whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.4)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Activity className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">Full Body Motion</h3>
                    <p className="text-sm text-gray-400">Engage entire body for holistic therapy</p>
                  </motion.div>
                  <motion.div
                    className="rounded-lg bg-royal-800 p-6 border border-neon-500/20"
                    whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.4)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <TrendingUp className="h-8 w-8 text-emerald-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">Real-Time Analytics</h3>
                    <p className="text-sm text-gray-400">Track performance and progress instantly</p>
                  </motion.div>
                  <motion.div
                    className="rounded-lg bg-royal-800 p-6 border border-neon-500/20"
                    whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.4)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <BarChart3 className="h-8 w-8 text-pink-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">Long-Term Insights</h3>
                    <p className="text-sm text-gray-400">Longitudinal analysis for better outcomes</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Rehabilitation Benefits */}
              <motion.div
                className="rounded-2xl bg-gradient-to-br from-royal-800 to-royal-900 p-8 md:p-12 border border-neon-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4">
                    <Heart className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Intelligent Rehabilitation Analytics</h2>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Every movement, every session, every achievement is captured and analyzed. Our exergames don't just entertain—they generate comprehensive rehabilitation data that helps clinicians and patients understand progress over time.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-3">Performance Tracking</h3>
                    <p className="text-gray-300">
                      Measure range of motion, reaction time, balance, coordination, and endurance with precision sensors and AI-powered analysis.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-3">Posture Analysis</h3>
                    <p className="text-gray-300">
                      Real-time feedback on body alignment and movement patterns helps develop better posture and prevents compensatory behaviors.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-emerald-400 mb-3">Progress Visualization</h3>
                    <p className="text-gray-300">
                      Interactive dashboards show improvement trends, goal achievements, and personalized recommendations for continued growth.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-royal-950 py-20">
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
                  Exergame Categories
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Tailored gaming experiences designed for specific needs and abilities, ensuring everyone can benefit from therapeutic play.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {categories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <motion.div
                      key={category.title}
                      className="group relative rounded-2xl bg-royal-900 border-2 border-neon-500/20 hover:border-neon-500/60 transition-all duration-300 overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: category.delay }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                    >
                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                      <div className="relative p-8">
                        {/* Icon */}
                        <motion.div
                          className={`inline-flex rounded-full bg-gradient-to-r ${category.color} p-4 mb-6`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {category.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {category.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2 mb-6">
                          {category.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                              <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${category.color}`}></div>
                              <span className="text-sm text-gray-400">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Button */}
                        <Link href={category.link}>
                          <Button
                            className={`w-full bg-gradient-to-r ${category.color} hover:${category.hoverColor} text-white font-semibold group-hover:shadow-lg group-hover:shadow-neon-500/20 transition-all duration-300`}
                          >
                            Explore Games <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Games Section */}
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
                  Featured Games
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Explore our collection of therapeutic exergames designed to promote wellness and engagement.
                </p>
              </motion.div>

              <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/exergames/games/mandala-painting">
                  <div className="group rounded-2xl bg-royal-800 border-2 border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 overflow-hidden cursor-pointer">
                    <div className="md:flex">
                      <div className="md:w-2/5 relative h-64 md:h-auto bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                        <Gamepad2 className="h-24 w-24 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="p-8 md:w-3/5">
                        <div className="inline-flex rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-3 py-1 mb-4">
                          <span className="text-emerald-400 text-xs font-semibold uppercase">Games for Everyone</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                          Mandala Art Painting Game
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                          An interactive digital art system featuring gesture control, automatic image segmentation, multiplayer modes, and therapeutic benefits for all ages. Perfect for seniors and community settings.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          <span className="px-3 py-1 bg-royal-950 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                            Gesture Control
                          </span>
                          <span className="px-3 py-1 bg-royal-950 text-teal-400 text-xs rounded-full border border-teal-500/30">
                            Multiplayer
                          </span>
                          <span className="px-3 py-1 bg-royal-950 text-cyan-400 text-xs rounded-full border border-cyan-500/30">
                            Art Therapy
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400 group-hover:gap-4 transition-all">
                          <span className="font-semibold">Learn More & Play</span>
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-royal-950 py-20">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-royal-900 via-royal-950 to-royal-900"></div>
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Ready to Experience the Future of Rehabilitation?
              </h2>
              <p className="mb-10 text-xl text-gray-300">
                Join thousands of users who are transforming their therapy journey through engaging, data-driven exergames.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/20"
                >
                  Start Playing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-royal-800 hover:text-white bg-transparent"
                  >
                    Request Demo
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
                <li>
                  <Link
                    href="/products/therapy"
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Rehabilitation
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
                <li>
                  <Link
                    href="/careers"
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Careers
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
