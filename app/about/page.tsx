import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, ChevronDown } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import {StickyBanner} from "@/components/ui/sticky-banner";

export default function AboutPage() {
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
          <Link href="/about" className="text-sm font-medium text-white transition-colors">
            About
          </Link>
          <Link href="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">About Neurogati</h1>
              <p className="mb-10 text-xl text-gray-300">
                Pioneering the future of neurological care through innovative AI technology.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy-900 py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12">
                <h2 className="mb-6 text-3xl font-bold text-white">Our Mission</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  At Neurogati, our mission is to transform neurological healthcare through cutting-edge AI and
                  neuroscience. We harness insights from advanced computational models of the brain to design
                  intelligent, personalized technologies for early diagnosis, adaptive therapy, assistive systems, and
                  brain-computer interfaces—enabling more effective treatment and a better quality of life for people
                  living with neurological disorders.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="mb-6 text-3xl font-bold text-white">Our Story</h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Founded in 2024 by a team of neuroscientists, AI researchers, and healthcare technologists, Neurogati
                  was born from a shared vision: to bring deep neuroscience insights into real-world neurological care.
                  Our founders believed that a more precise understanding of the brain—rooted in advanced computational
                  modeling—could unlock earlier diagnoses, smarter therapies, and more intuitive assistive and
                  brain-computer interfaces. While millions live with neurological disorders, existing diagnostic and
                  rehabilitation tools have struggled to keep pace with scientific discovery. At Neurogati, we bridge
                  this gap by translating our models of brain function into intelligent, personalized technologies that
                  help clinicians act earlier, treat more effectively, and improve the lives of patients worldwide.
                </p>
              </div>

              <div>
                <h2 className="mb-6 text-3xl font-bold text-white">Our Values</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-navy-800 p-6">
                    <h3 className="mb-2 text-xl font-bold text-white">Innovation</h3>
                    <p className="text-gray-300">
                      We continuously push the boundaries of what's possible in neurological care through cutting-edge
                      research and development.
                    </p>
                  </div>
                  <div className="rounded-lg bg-navy-800 p-6">
                    <h3 className="mb-2 text-xl font-bold text-white">Compassion</h3>
                    <p className="text-gray-300">
                      We put patients at the center of everything we do, designing solutions that address real needs and
                      improve lives.
                    </p>
                  </div>
                  <div className="rounded-lg bg-navy-800 p-6">
                    <h3 className="mb-2 text-xl font-bold text-white">Collaboration</h3>
                    <p className="text-gray-300">
                      We work closely with healthcare providers, researchers, and patients to create solutions that
                      integrate seamlessly into clinical workflows.
                    </p>
                  </div>
                  <div className="rounded-lg bg-navy-800 p-6">
                    <h3 className="mb-2 text-xl font-bold text-white">Integrity</h3>
                    <p className="text-gray-300">
                      We uphold the highest standards of scientific rigor, data privacy, and ethical AI development in
                      all our work.
                    </p>
                  </div>
                </div>
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
                  <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    For Clinicians
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    For Researchers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    For Patients
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
