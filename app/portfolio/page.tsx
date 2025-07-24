import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import { Brain } from "lucide-react"
import {StickyBanner} from "@/components/ui/sticky-banner"; // Import the Brain component

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex w-full flex-col overflow-y-auto">
        <StickyBanner className="bg-gradient-to-b from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
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
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Products <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-navy-800/95 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <Link
                  href="/products/diagnostics"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-navy-700 hover:text-white transition-colors"
                  role="menuitem"
                >
                  Diagnostics
                </Link>
                <Link
                  href="/products/therapy"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-navy-700 hover:text-white transition-colors"
                  role="menuitem"
                >
                  Rehab
                </Link>
                <Link
                  href="/products/assistive-technology"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-navy-700 hover:text-white transition-colors"
                  role="menuitem"
                >
                  Assistive Technology
                </Link>
                <Link
                  href="/products/bci"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-navy-700 hover:text-white transition-colors"
                  role="menuitem"
                >
                  BCI
                </Link>
                <Link
                  href="/products/modeling"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-navy-700 hover:text-white transition-colors"
                  role="menuitem"
                >
                  Computational Modeling
                </Link>
              </div>
            </div>
          </div>
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">Our Portfolio</h1>
              <p className="mb-10 text-xl text-gray-300">
                Explore our case studies and success stories from healthcare providers using our technology.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy-900 py-20">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-12 md:grid-cols-2">
                <div className="rounded-lg bg-navy-800 overflow-hidden">
                  <div className="h-64 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cRGS.png-R4K5oAPhRKo93fIwLOlb8EMjepW4ZJ.jpeg"
                      alt="cRGS Rehabilitation System Interface showing hand tracking"
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-2xl font-bold text-white">Ramachandra Hospital, Chennai, India</h2>
                    <p className="mb-4 text-gray-300">
                      Implementation of cRGS™ for upper extremity stroke rehabilitation to compare effectiveness with
                      conventional rehabilitation.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-cyan-400">Stroke-Induced Hemiparesis</span>
                      <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto">
                        Read Case Study <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="h-64 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cRGS.png-R4K5oAPhRKo93fIwLOlb8EMjepW4ZJ.jpeg"
                      alt="cRGS Rehabilitation System Interface showing hand tracking"
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-2xl font-bold text-white">SCTIMST and NIMHANS, India</h2>
                    <p className="mb-4 text-gray-300">
                      Implementation of cRGS™ for upper extremity stroke rehabilitation to compare effectiveness with
                      conventional rehabilitation. This study has been recently completely and the data collected is
                      currently under analysis.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-cyan-400">Stroke-Induced Hemiparesis</span>
                      <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto">
                        Read Case Study <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-navy-800 overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=180&width=320"
                      alt="Case Study"
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-2xl font-bold text-white">JIPMER, Pondicherry, India</h2>
                    <p className="mb-4 text-gray-300">
                      Deployment of QuadisPD™ to assess its effectiveness in diagnosing PD and other related conditions.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-cyan-400">Parkinson's Disease</span>
                      <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto">
                        Read Case Study <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="h-64 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MB.png-PosKsJCC4r3Wxwc9JEuEiqa42tz3Wr.jpeg"
                      alt="MudhraBharati demonstration at Sweekar School for the Deaf"
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-2xl font-bold text-white">Sweekar school for the deaf, Secunderabad</h2>
                    <p className="mb-4 text-gray-300">
                      Conducted sessions on how to use MudhraBharati™ in a school for the hearing impaired.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-cyan-400">Hearing Impairement</span>
                      <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto">
                        Read Case Study <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
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
