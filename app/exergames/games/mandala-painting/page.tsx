"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Users, Monitor, Share2, Palette, MousePointer, Hand, Save, Sparkles } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import { NetworkAnimation } from "@/components/network-animation"
import { StickyBanner } from "@/components/ui/sticky-banner"
import { motion } from "motion/react"

export default function MandalaPaintingGamePage() {
  const handlePlayGame = () => {
    // Navigate to game player page in same tab
    window.location.href = '/exergames/play/mandala-painting'
  }

  const features = [
    {
      icon: Hand,
      title: "Gesture Control",
      description: "Paint using air-hand gestures or traditional mouse control for an immersive creative experience",
      color: "text-purple-400"
    },
    {
      icon: Palette,
      title: "Auto Segmentation",
      description: "Upload any image and watch it automatically convert into colorable regions with intelligent boundaries",
      color: "text-pink-400"
    },
    {
      icon: Users,
      title: "Multiplayer Support",
      description: "Play solo or collaborate with friends in real-time multiplayer mode for group creativity",
      color: "text-cyan-400"
    },
    {
      icon: Save,
      title: "Save & Share",
      description: "Preserve your artwork, continue later, and share your masterpieces with family and friends",
      color: "text-emerald-400"
    },
    {
      icon: Monitor,
      title: "Multi-Platform",
      description: "Works seamlessly on laptops and large-screen TVs in community living settings",
      color: "text-blue-400"
    },
    {
      icon: Sparkles,
      title: "Therapeutic Value",
      description: "Designed for seniors and individuals seeking creative therapy and cognitive engagement",
      color: "text-yellow-400"
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
              <span className="text-white">Mandala Art Painting Game</span>
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
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className="inline-flex rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-4 py-2 mb-6">
                  <span className="text-emerald-400 text-sm font-semibold">GAMES FOR EVERYONE</span>
                </div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                  Mandala Art Painting Game
                </h1>
                <p className="mb-10 text-xl text-gray-300 max-w-3xl mx-auto">
                  An interactive digital art system where creativity meets technology. Paint beautiful mandalas using intuitive gesture controls or traditional mouse input.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={handlePlayGame}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/20 text-white font-semibold"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Play Game
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-royal-900 hover:text-white bg-transparent"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Game
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Game Description */}
        <section className="bg-royal-900 py-20">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-gradient-to-br from-royal-800 to-royal-900 p-8 md:p-12 border border-emerald-500/20 mb-16"
              >
                <div className="flex items-start gap-6 mb-8">
                  <div className="inline-flex rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-4">
                    <Palette className="h-10 w-10 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">About the Game</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      The <strong>Mandala Art Painting Game</strong> is built as an interactive digital art system where users color templates using air-hand gestures or mouse control. This innovative platform combines traditional art therapy with cutting-edge gesture recognition technology.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      The game includes automatic template segmentation, enabling any uploaded image to be converted into colorable regions. This powerful feature means you're not limited to predefined templates—your imagination is the only boundary.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Whether playing solo or with friends in multiplayer mode, the game supports both individual creativity and group engagement. The "save, continue, share" functionality allows seniors and users to preserve their artwork and share it with family members, creating meaningful connections through art.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <motion.div
                        key={feature.title}
                        className="rounded-xl bg-royal-800 p-6 border border-neon-500/20 hover:border-emerald-500/40 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        <Icon className={`h-10 w-10 ${feature.color} mb-4`} />
                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Platform Compatibility */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-royal-800 p-8 md:p-12 border border-cyan-500/20"
              >
                <div className="text-center">
                  <Monitor className="h-12 w-12 text-cyan-400 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-white mb-4">Universal Compatibility</h2>
                  <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    Fully compatible with laptops and large-screen TVs commonly used in community living settings, senior centers, and rehabilitation facilities. The responsive design ensures an optimal experience regardless of screen size.
                  </p>
                </div>
              </motion.div>
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
                Ready to Create Your Masterpiece?
              </h2>
              <p className="mb-10 text-xl text-gray-300">
                Experience the therapeutic power of digital art with gesture-controlled painting.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={handlePlayGame}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/20"
                >
                  Play Now
                </Button>
                <Link href="/exergames">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-royal-900 hover:text-white bg-transparent"
                  >
                    Explore More Games
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
