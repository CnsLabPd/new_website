"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Smartphone } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"

export default function AssistiveTechnologyPage() {
  const [showMudhraPatentInfo, setShowMudhraPatentInfo] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-10 flex h-20 items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/images/neurogati-logo-new.jpg" alt="Neurogati Logo" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold text-white">Neurogati</span>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/products" className="text-sm font-medium text-white transition-colors">
            Products
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
          <Link href="/getstarted">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              Contact Us
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-navy-950 py-20">
          <div className="absolute inset-0 z-0">
            <WaveBackground />
          </div>
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">Assistive Technology</h1>
              <p className="mb-10 text-xl text-gray-300">
                Innovative solutions to help patients with neurological disorders maintain independence and improve
                quality of life.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy-900 py-20">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-1">
              <div className="rounded-lg bg-navy-800 p-8 border border-cyan-500/20">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                      <Smartphone className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-white">SparshBharati™</h2>
                    <p className="mb-6 text-gray-300">
                      Bringing Braille to Indian languages, SparshBharati™ helps the visually-challenged patients to
                      read any Indian language - written in Bharati script. Unlike other Braille scripts, SparshBharati™
                      does not use special characters, and hence helps in integrating sighted and non-sighted people
                      more seamlessly.
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-white">Key Features:</h3>
                    <ul className="mb-8 space-y-2">
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Multi-Language Script Support
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Seamless Integration and translation with existing
                        material
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Takes less than 30 minutes to learn.
                      </li>
                    </ul>
                    <Link href="https://bharatiscript.com/#sparshbharati" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg h-64 flex items-center justify-center">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-a0Vq4P5dbijvJjdH90BaHzQlPWMtBx.png"
                        alt="SparshBharati Braille system being used by multiple people in learning sessions, showing hands reading blue Braille devices"
                        className="rounded-lg object-contain w-full h-full"
                      />
                    </div>

                    {/* The Hindu Article Link - Current Style (bigger image) */}
                    <div className="text-center">
                      <a
                        href="https://www.iitm.ac.in/happenings/press-releases-and-coverages/sparsh-bharati-new-guide-visually-impaired-persons-0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-col items-center hover:opacity-80 transition-opacity"
                      >
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-DaIBgS5FPMN5rThKPAS0ggkEYgypZN.png"
                          alt="The Hindu newspaper logo"
                          className="h-16 object-contain mb-2"
                        />
                        <span className="text-sm font-medium text-cyan-400 underline">
                          The Hindu Article: 'Sparsh Bharati' - a new guide for visually impaired persons
                        </span>
                      </a>
                    </div>

                    {/* Alternative Style 1: Card Style */}
                    {/* 
                    <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg p-4 border border-blue-500/20">
                      <a
                        href="https://www.iitm.ac.in/happenings/press-releases-and-coverages/sparsh-bharati-new-guide-visually-impaired-persons-0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                      >
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-DaIBgS5FPMN5rThKPAS0ggkEYgypZN.png"
                          alt="The Hindu newspaper logo"
                          className="h-12 object-contain"
                        />
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm">Featured in The Hindu</p>
                          <p className="text-cyan-400 text-xs">'Sparsh Bharati' - a new guide for visually impaired persons</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-cyan-400" />
                      </a>
                    </div>
                    */}

                    {/* Alternative Style 2: Button Style */}
                    {/* 
                    <div className="text-center">
                      <a
                        href="https://www.iitm.ac.in/happenings/press-releases-and-coverages/sparsh-bharati-new-guide-visually-impaired-persons-0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Newspaper className="h-4 w-4" />
                        <span className="text-sm font-medium">Read The Hindu Article</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    */}

                    {/* Alternative Style 3: Badge Style */}
                    {/* 
                    <div className="flex justify-center">
                      <a
                        href="https://www.iitm.ac.in/happenings/press-releases-and-coverages/sparsh-bharati-new-guide-visually-impaired-persons-0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 px-3 py-2 rounded-full text-xs font-medium hover:bg-yellow-500/30 transition-colors"
                      >
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-DaIBgS5FPMN5rThKPAS0ggkEYgypZN.png"
                          alt="The Hindu newspaper logo"
                          className="h-4 object-contain"
                        />
                        <span>As featured in The Hindu</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    */}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
                  <div className="order-2 md:order-1 space-y-4">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg h-64 flex items-center justify-center">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oymxKaqNGfUCKIU1ccQ75R1SU1EKdh.png"
                        alt="MudhraBharati hand gesture cards showing various sign language positions with colorful backgrounds"
                        className="rounded-lg object-contain w-full h-full"
                      />
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg h-64 flex items-center justify-center relative">
                      <video
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ashwin_cropped_video%20-%20Made%20with%20Clipchamp-EIDNfwrlYT3Q8oRBQQoLAGXJJJvpFa.mp4"
                        controls
                        className="rounded-lg w-full h-full object-contain"
                      >
                        <source
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ashwin_cropped_video%20-%20Made%20with%20Clipchamp-EIDNfwrlYT3Q8oRBQQoLAGXJJJvpFa.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute top-2 left-2 bg-cyan-500/80 text-white px-2 py-1 rounded text-sm font-bold">
                        DEMO
                      </div>
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                      <Brain className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-white">MudhraBharati™</h2>
                    <p className="mb-6 text-gray-300">
                      Similar to ASL which helps the hearing and speech impaired communicate in English with sign
                      language, MudhraBharati™ was developed to help them communicate in any Indian language using the
                      Bharati™ script. Watch the live demonstration showing real-time translation to Hindi text.
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-white">Key Features:</h3>
                    <ul className="mb-8 space-y-2">
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Sign language for Indian Languages
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Fingerspelling with separate workspace for consonants,
                        and vowels and punctuation.
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Fingerspelling to Text conversion modules
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Computer Vision Integration for Gesture recognition
                      </li>
                    </ul>
                    <div className="flex gap-4">
                      <Link href="https://bharatiscript.com/#MudraBharati" target="_blank" rel="noopener noreferrer">
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => setShowMudhraPatentInfo(!showMudhraPatentInfo)}
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                      >
                        Patent
                      </Button>
                    </div>
                    {showMudhraPatentInfo && (
                      <div className="mt-4 p-4 bg-navy-700 rounded-lg border border-red-500/30">
                        <p className="text-gray-300">
                          India patent #544520: V. Srinivasa Chakravarthy 2.Amal Jude Ashwin, Sunil Kumar Kopparapu, A
                          UNIFIED FINGER SPELLING DETECTION SYSTEM FOR INDIAN LANGUAGES, 28/07/2021
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
                  <div>
                    <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                      <Smartphone className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-white">NodText™</h2>
                    <p className="mb-6 text-gray-300">
                      For quadraplegic people with severe Cerebral Palsy, controlling a keyboard and mouse is very
                      difficult. Hence we have developed a computer-vision based keyboard that can be operated with
                      Head/Eye movements as possible by the patients.
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-white">Key Features:</h3>
                    <ul className="mb-8 space-y-2">
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Customisable to track eye or head movement as per
                        individual needs
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Real-time tracking algorithm with 94% accuracy
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Multiple levels for learning/training with the system
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Makes computers and other digital systems accessible to
                        a wider population.
                      </li>
                    </ul>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg flex items-center justify-center p-4">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aWSKG6KX8xfWy5Ptx6QQq0fSBIKumH.png"
                        alt="NodText virtual keyboard interface showing eye and head tracking assistive technology with on-screen keyboard and directional controls"
                        className="rounded-lg object-contain w-full h-48"
                      />
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg flex items-center justify-center p-4">
                      <video
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nodtext_video%20-%20Made%20with%20Clipchamp-hmSTqFOUCY7cE1dRvn91u3bNM81Cgg.mp4"
                        controls
                        muted
                        className="rounded-lg w-full h-48 object-contain"
                      >
                        <source
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nodtext_video%20-%20Made%20with%20Clipchamp-hmSTqFOUCY7cE1dRvn91u3bNM81Cgg.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-navy-950 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Ready to Enhance Patient Independence?</h2>
              <p className="mb-10 text-xl text-gray-300">
                Discover how our assistive technologies can help patients with neurological disorders maintain
                independence and improve quality of life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-navy-900 hover:text-white bg-transparent"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy-900 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-cyan-400" />
                <span className="text-lg font-bold text-white">Neurogati</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing neurological care through AI-powered diagnostics and personalized rehabilitation.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products/diagnostics" className="text-gray-300 hover:text-white transition-colors">
                    Diagnostics
                  </Link>
                </li>
                <li>
                  <Link href="/products/therapy" className="text-gray-300 hover:text-white transition-colors">
                    Therapy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/assistive-technology"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Assistive Technology
                  </Link>
                </li>
                <li>
                  <Link href="/products/bci" className="text-gray-300 hover:text-white transition-colors">
                    BCI
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/research" className="text-gray-300 hover:text-white transition-colors">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Clinical Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-gray-300 hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
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
