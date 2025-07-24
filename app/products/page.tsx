import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Microscope, Activity, Smartphone, Cpu } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import {StickyBanner} from "@/components/ui/sticky-banner";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex w-full flex-col overflow-y-auto">
        <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            Announcing Workshop on AI applications in EEG from September 12th to 14th, 2025.{" "}
            <a href="https://sites.google.com/smail.iitm.ac.in/eegaiworkshop/home?authuser=0" className="transition duration-200 hover:underline">
              Visit Website
            </a>
          </p>
        </StickyBanner>
      </div>
      <header className="container z-10 flex h-20 items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/images/bg_just_logo.png" alt="Neurogati Logo" className="h-16 w-16 object-contain" />
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
            <Button className="bg-gradient-to-r from-royal-500 to-neon-500 hover:from-royal-600 hover:to-neon-400">
              Contact Us
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-royal-950 py-20">
          <div className="absolute inset-0 z-0">
            <WaveBackground />
          </div>
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">Our Products</h1>
              <p className="mb-10 text-xl text-gray-300">
                Comprehensive AI-powered solutions for neurological care, from diagnosis to rehabilitation and assistive
                technology.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-royal-900 py-20">
          <div className="container">
            <div className="space-y-8">
              {/* Diagnostics */}
              <div className="rounded-lg bg-royal-800 border border-neon-500/20 hover:border-neon-500/40 transition-colors overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-72U0o01adgA5Ti3bxZ2ynj5ZlrIwvL.png"
                      alt="AI-powered diagnostic technology with neural network visualization"
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:w-2/3">
                    <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-royal-500/20 to-neon-500/20 p-3">
                      <Microscope className="h-8 w-8 text-neon-400" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white">Diagnostics</h3>
                    <p className="mb-6 text-gray-300">
                      Advanced AI-powered diagnostic tools for early detection and monitoring of neurological disorders.
                      Our Quadis-PD™ platform provides comprehensive analysis with 94% accuracy.
                    </p>
                    <Link href="/products/diagnostics">
                      <Button className="bg-gradient-to-r from-royal-500 to-neon-500 hover:from-royal-600 hover:to-neon-400">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Rehabilitation */}
              <div className="rounded-lg bg-royal-800 border border-neon-500/20 hover:border-neon-500/40 transition-colors overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 md:order-2">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aFiICUrehe72DtLVPiSlmV0Jh3ZkM9.png"
                      alt="VR-based rehabilitation technology for neurological therapy"
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:w-2/3 md:order-1">
                    <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-royal-500/20 to-neon-500/20 p-3">
                      <Activity className="h-8 w-8 text-neon-400" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white">Gaming and Rehab</h3>
                    <p className="mb-6 text-gray-300">
                      Personalized AI-driven gaming solutions for rehabilitation that adapt to each patient's unique
                      needs. Our cRGS™ platform transforms therapy into engaging games for better motivation and
                      improved outcomes.
                    </p>
                    <Link href="/products/therapy">
                      <Button className="bg-gradient-to-r from-royal-500 to-neon-500 hover:from-royal-600 hover:to-neon-400">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Assistive Technology */}
              <div className="rounded-lg bg-royal-800 border border-neon-500/20 hover:border-neon-500/40 transition-colors overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IKQl8sTwaguu6TCDrJhIDtJ2NgDI7x.png"
                      alt="AI-powered assistive technology devices including headphones, hearing aids, and wheelchair"
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:w-2/3">
                    <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-royal-500/20 to-neon-500/20 p-3">
                      <Smartphone className="h-8 w-8 text-neon-400" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white">Assistive Technology</h3>
                    <p className="mb-6 text-gray-300">
                      Innovative solutions to help patients maintain independence and improve quality of life. Including
                      SparshBharati™, MudhraBharati™, and NodText™ technologies.
                    </p>
                    <Link href="/products/assistive-technology">
                      <Button className="bg-gradient-to-r from-royal-500 to-neon-500 hover:from-royal-600 hover:to-neon-400">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Brain-Computer Interface */}
              <div className="rounded-lg bg-royal-800 border border-neon-500/20 hover:border-neon-500/40 transition-colors overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 md:order-2">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n17EBJ6kPsE9PW5xJ8SAGfIhEGAWxn.png"
                      alt="Brain-computer interface technology with neural electrode monitoring"
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:w-2/3 md:order-1">
                    <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-royal-500/20 to-neon-500/20 p-3">
                      <Brain className="h-8 w-8 text-neon-400" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white">Brain-Computer Interface</h3>
                    <p className="mb-6 text-gray-300">
                      Cutting-edge BCI technology to restore function and communication for patients with severe
                      neurological disorders. Our NeuroScope™ system offers 95% accuracy in neural decoding.
                    </p>
                    <Link href="/products/bci">
                      <Button className="bg-gradient-to-r from-royal-500 to-neon-500 hover:from-royal-600 hover:to-neon-400">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Computational Modeling */}
              <div className="rounded-lg bg-royal-800 border border-neon-500/20 hover:border-neon-500/40 transition-colors overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-64 md:h-full w-full relative">
                      <Image
                        src="/computational-modeling-diagram.png"
                        alt="Computational neural modeling diagram showing neural networks, brain data analysis, and machine learning algorithms"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-8 md:w-2/3">
                    <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-royal-500/20 to-neon-500/20 p-3">
                      <Cpu className="h-8 w-8 text-neon-400" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white">Computational Modeling</h3>
                    <p className="mb-6 text-gray-300">
                      Advanced ML and AI algorithms to model and understand neurological disorders. Specialized in
                      Parkinson's Disease modeling for treatment protocol planning.
                    </p>
                    <Link href="/products/modeling">
                      <Button className="bg-gradient-to-r from-royal-500 to-neon-500 hover:from-royal-600 hover:to-neon-400">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-royal-950 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Ready to Transform Neurological Care?</h2>
              <p className="mb-10 text-xl text-gray-300">
                Discover how our comprehensive product suite can revolutionize your approach to neurological diagnosis,
                treatment, and patient care.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-royal-500 to-neon-500 hover:from-royal-600 hover:to-neon-400"
                >
                  Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-royal-900 hover:text-white bg-transparent"
                >
                  Contact Sales
                </Button>
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
                <img src="/images/bg_just_logo.png" alt="Neurogati Logo" className="h-16 w-16 object-contain" />
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
                    Gaming and Rehab
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
