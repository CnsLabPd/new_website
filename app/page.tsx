import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Dna, Brain } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import { NetworkBrain } from "@/components/network-brain"
import { NetworkAnimation } from "@/components/network-animation"
import { StickyBanner } from "@/components/ui/sticky-banner";
//import { TestimonialsSliderEnhanced } from "@/components/testimonials-slider-enhanced"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex w-full flex-col overflow-y-auto">
        <StickyBanner className="bg-gradient-to-b from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            Announcing Workshop on AI applications in EEG from September 12th to 14th, 2025.{" "}
            <a href="https://sites.google.com/smail.iitm.ac.in/eegaiworkshop/workshop-sept-2025?authuser=0" className="transition duration-200 hover:underline">
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
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
              Contact Us
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden bg-royal-950 py-20 md:py-32">
          <div className="absolute inset-0 z-0">
            <NetworkAnimation />
            <div className="absolute inset-0 z-5 bg-gradient-to-b from-royal-950/50 via-transparent to-royal-950/80"></div>
          </div>
          <div className="container relative z-20">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">NEUROGATI</h1>
              <p className="mb-10 text-xl text-gray-300">Empowering Brains.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-royal-500 to-neon-500 hover:from-royal-600 hover:to-neon-400 text-white"
                  >
                    Explore Our Products <ArrowRight className="ml-2 h-4 w-4 text-white" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-black bg-white hover:bg-white hover:text-black"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-royal-950 py-20 md:py-32">
          <div className="absolute inset-0 z-0">
            <WaveBackground />
          </div>
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <NetworkBrain />
              </div>
              <div>
                <h2 className="mb-6 text-4xl font-bold tracking-tight text-white">Discover Neurogati</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Neurogati is a integrated deep-tech neurotechnology company that brings together the many dimensions
                  of neurotechnology – assistive technology, BCI, gaming, wearables and computational modeling.
                </p>
                <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                  Grounded in advanced computational models of the brain and built with input from clinicians and
                  researchers, our platform combines AI, EEG signal analysis, and digital assessments to deliver
                  intelligent, personalized neuro care.
                </p>
                <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                  With secure cloud storage, customizable reports, and longitudinal patient tracking, Neurogati supports
                  integrated, evidence-based neurological care across both clinical and home settings.
                </p>
                <div className="mt-8">
                  <Link href="/about">
                    <Button className="bg-gradient-to-r from-royal-500 to-neon-500 hover:from-royal-600 hover:to-neon-400 text-white">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 text-white" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section 
            <section className="bg-navy-950 py-20">
              <div className="container">
                <div className="mx-auto max-w-4xl">
                  <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">Testimonials</h2>
                    <TestimonialsSliderEnhanced />
                </div>
              </div>
            </section>
        */}
        <section className="bg-royal-900 py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">Our Partners</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-royal-800 p-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex rounded-full bg-gradient-to-r from-royal-500/20 to-neon-500/20 p-3">
                      <Activity className="h-5 w-5 text-neon-400" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-white">Ramachandra Hospital, Chennai, India</h3>
                      <p className="mb-4 text-gray-300">
                        Implementation of cRGS™ for upper extremity stroke rehabilitation to compare effectiveness with
                        conventional rehabilitation.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-royal-800 p-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex rounded-full bg-gradient-to-r from-royal-500/20 to-neon-500/20 p-3">
                      <Brain className="h-5 w-5 text-neon-400" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-white">SCTIMST and NIMHANS, India</h3>
                      <p className="mb-4 text-gray-300">
                        Implementation of cRGS™ for upper extremity stroke rehabilitation to compare effectiveness with
                        conventional rehabilitation. This study has been recently completed and the data collected is
                        currently under analysis.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-royal-800 p-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex rounded-full bg-gradient-to-r from-royal-500/20 to-neon-500/20 p-3">
                      <Dna className="h-5 w-5 text-neon-400" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-white">JIPMER, Pondicherry, India</h3>
                      <p className="mb-4 text-gray-300">
                        Deployment of QuadisPD™ to assess its effectiveness in diagnosing PD and other related
                        conditions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-royal-800 p-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex rounded-full bg-gradient-to-r from-royal-500/20 to-neon-500/20 p-3">
                      <Brain className="h-5 w-5 text-neon-400" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-white">Sweekar School for the deaf, Secunderabad</h3>
                      <p className="mb-4 text-gray-300">
                        Conducted sessions on how to use MudhraBharati™ in a school for the hearing impaired.
                      </p>
                    </div>
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
                Join healthcare providers worldwide who are using Neurogati to revolutionize how they diagnose, monitor,
                and treat neurological disorders.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-royal-500 to-neon-500 hover:from-royal-600 hover:to-neon-400 text-white"
                >
                  Request a Demo <ArrowRight className="ml-2 h-4 w-4 text-white" />
                </Button>
                <Link href="/products/diagnostics">
                  <Button size="lg" variant="outline" className="bg-white text-black border-white">
                    Explore Products
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
                  <Link
                    href="/products/diagnostics"
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Diagnostics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/rehabilitation"
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
                    href="/getstarted"
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
