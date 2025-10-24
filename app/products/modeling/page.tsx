"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Microscope } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import { StickyBanner } from "@/components/sticky-banner"

export default function ModelingPage() {
  const [showPatentInfo, setShowPatentInfo] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex w-full flex-col overflow-y-auto">
        <StickyBanner className="bg-gradient-to-b from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            Announcing Workshop on AI applications in EEG from October 31st to Novemeber 02nd, 2025.{" "}
            <a href="https://sites.google.com/smail.iitm.ac.in/eegaiworkshop/workshop-oct-2025/home?authuser=0" className="transition duration-200 hover:underline">
              Visit Website
            </a>
          </p>
        </StickyBanner>
      </div>
      <header className="container z-10 flex h-20 items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-cyan-400" />
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
          <Link href="/workshops" className="text-sm font-medium text-white transition-colors">
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">Computational Modeling</h1>
              <p className="mb-10 text-xl text-gray-300">
                Advanced ML and AI algorithms to model and understand neurological disorders.
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
                      <Microscope className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-white">Parkinsons Disease</h2>
                    <p className="mb-6 text-gray-300">
                      Our platform for understanding the effect of PD medication - Levodopa - on behaviour, helping with
                      planning treatment protocol for a patient with a given set of symptoms.
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-white">Key Features:</h3>
                    <ul className="mb-8 space-y-2">
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Multi-modal data analysis (movement, speech, cognitive)
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Symptom tracking algorithms with 94% accuracy
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Customized Treatment Protocol
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Longitudinal Prediction of Patient performance.
                      </li>
                    </ul>
                    <div className="mb-6 p-4 bg-cyan-500/10 border-l-4 border-cyan-400 rounded-r-lg">
                      <p className="text-white font-bold">
                        This innovation is grounded in 20 years of scientific research focused on the basal ganglia and
                        Parkinson's disease.
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg flex items-center justify-center p-4">
                      <div className="relative w-full h-64">
                        <Image
                          src="/images/PD_Modelling.png"
                          alt="Computational neural modeling diagram showing neural networks, brain data analysis, and machine learning algorithms"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg flex items-center justify-center p-4">
                      <div className="relative w-full h-64">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled.jpg-OP3mXbk6nOLsTFzHGT2VCHKelgDlZc.jpeg"
                          alt="Computational Neuroscience Models of the Basal Ganglia book cover by V. Srinivasa Chakravarthy and Ahmed A. Moustafa"
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Unified Pharmacological Model Section */}
              <div className="rounded-lg bg-navy-800 p-8 border border-cyan-500/20">
                <div className="text-center">
                  <h2 className="mb-8 text-2xl font-bold text-white">UNIFIED PHARMACOLOGICAL MODEL</h2>
                  <div className="flex justify-center">
                    <div className="border-4 border-black rounded-lg overflow-hidden">
                      <Image
                        src="/images/unified-pharmacological-model.png"
                        alt="Model Architecture: Integrated Pharmacological Model showing basal ganglia schematic with L-DOPA effects on Parkinsonian reaching movements"
                        width={800}
                        height={600}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      onClick={() => setShowPatentInfo(!showPatentInfo)}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                      Patent
                    </Button>
                  </div>
                  {showPatentInfo && (
                    <div className="mt-4 p-4 bg-navy-700 rounded-lg border border-cyan-500/30 text-left">
                      <p className="text-gray-300">
                        <strong>India patent #518500</strong>, V. SRINIVASA CHAKRAVARTHY, VIGNAYANANDAM R.MUDDAPU,
                        SANDEEP SATHYANANDAN NAIR,{" "}
                        <em>
                          Multiscale systems neuropharmacological model of cortico-basal ganglia circuitry of reaching
                          for normal and parkinson's disease
                        </em>
                        , 31/01/2020.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-navy-950 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Ready to Transform how Neurological Disorders are Modeled?
              </h2>
              <p className="mb-10 text-xl text-gray-300">
                Join healthcare providers worldwide who are using our computational models to understand how to plan
                treatment protocols for treating neurological disorders.
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
                  className="border-gray-700 text-gray-300 hover:bg-navy-900 hover:text-white"
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
