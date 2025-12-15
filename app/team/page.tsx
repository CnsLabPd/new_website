import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import {StickyBanner} from "@/components/ui/sticky-banner";

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
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
              <img src="/images/bg_just_logo.png" alt="Neurogati Logo" className="h-16 w-16 object-contain" />
              <span className="text-xl font-bold text-white">Neurogati</span>
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
          <Link href="/team" className="text-sm font-medium text-white transition-colors">
            Team
          </Link>
          <Link href="/careers" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Careers
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/contact">
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">Our Team</h1>
              <p className="mb-10 text-xl text-gray-300">
                Meet the experts behind our innovative neurological solutions.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy-900 py-20">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="mb-16">
                <h2 className="mb-8 text-3xl font-bold text-white text-center">Founders</h2>
                {/* Change md:grid-cols-2 to grid-cols-2 for a consistent 2-column layout */}
                <div className="grid gap-8 grid-cols-2">
                  {" "}
                  {/* <<-- MODIFIED HERE --*/}
                  {/* First Profile Card */}
                  <div className="rounded-lg bg-navy-800 p-6 text-center">
                    <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center overflow-hidden">
                      <img
                        src="/placeholder.svg?height=128&width=128"
                        alt="Team Member"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="mb-1 text-xl font-bold text-white">Prof. Srinivasa Chakravarthy</h3>
                    <p className="mb-4 text-cyan-400">Non-Executive Director</p>
                    <p className="mb-4 text-gray-300">
                      Neuroscientist with 25+ years of research experience. He currently holds joint appointments in the
                      Departments of Biotechnology and Medical Science and Technology, IIT Madras. He obtained his BTech
                      from IIT Madras, MS /PhD from the University of Texas at Austin and postdoctoral training in the
                      Baylor College of Medicine, Houston. He heads the Computational Neuroscience Lab (CNS Lab), the
                      Parkinson's Therapeutics Lab and the Neuroengineering Lab at IIT Madras. He is the author of two
                      books in neuroscience.
                    </p>
                    <div className="flex justify-center gap-4">
                      <a href="#" className="text-gray-400 hover:text-cyan-400">
                        {/* Placeholder SVG for Linkedin icon */}
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-cyan-400">
                        {/* Placeholder SVG for Twitter icon */}
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  {/* Second Profile Card */}
                  <div className="rounded-lg bg-navy-800 p-6 text-center">
                    <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center overflow-hidden">
                      <img
                        src="/placeholder.svg?height=128&width=128"
                        alt="Team Member"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="mb-1 text-xl font-bold text-white">Dr. Indira Chaturvedi</h3>
                    <p className="mb-4 text-cyan-400">Non-Executive Director</p>
                    <p className="mb-4 text-gray-300">
                      Dr Indira Chaturvedi is a pediatrician who received her MBBS degree from Kakatiya Medical College,
                      Warangal and MD (Pediatrics) from Bronx-Lebanon Hospital, New York. She has nearly 20 years of
                      experience in child and neonatal care.
                    </p>
                    <div className="flex justify-center gap-4">
                      <a href="#" className="text-gray-400 hover:text-cyan-400">
                        {/* Placeholder SVG for Linkedin icon */}
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-cyan-400">
                        {/* Placeholder SVG for Twitter icon */}
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-8 text-3xl font-bold text-white text-center">Our Experts</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-navy-800 p-4 text-center">
                    <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center overflow-hidden">
                      <img
                        src="/placeholder.svg?height=80&width=80"
                        alt="Team Member"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-white">Mr. Shrinivas Sesadri</h3>
                    <p className="text-sm text-cyan-400">AI Architect</p>
                  </div>

                  <div className="rounded-lg bg-navy-800 p-4 text-center">
                    <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center overflow-hidden">
                      <img
                        src="/placeholder.svg?height=80&width=80"
                        alt="Team Member"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-white">Ms. Manaswini Sundaresan</h3>
                    <p className="text-sm text-cyan-400">Founding Engineer</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center">
                <h2 className="mb-6 text-3xl font-bold text-white">Join Our Team</h2>
                <p className="mb-8 text-xl text-gray-300 max-w-2xl mx-auto">
                  We're always looking for talented individuals who are passionate about using technology to improve
                  neurological care.
                </p>
                <Link href="/careers">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    View Open Positions
                  </Button>
                </Link>
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
