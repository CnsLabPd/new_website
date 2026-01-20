import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Microscope } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import { StickyBanner } from "@/components/ui/sticky-banner"

export default function DiagnosticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex w-full flex-col overflow-y-auto">
        <StickyBanner className="bg-gradient-to-b from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            Announcing AI Applications in EEG Workshop [Online] from February 20th to 22nd, 2026.{" "}
            <a href="/eegworkshop">
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">Diagnostic Solutions</h1>
              <p className="mb-10 text-xl text-gray-300">
                Advanced AI-powered diagnostic tools for early detection and monitoring of neurological disorders.
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
                    <h2 className="mb-4 text-2xl font-bold text-white">Quadis-PD™</h2>
                    <p className="mb-6 text-gray-300">
                      Our flagship diagnostic platform that uses advanced AI to analyze behavioral data and provide
                      early detection of disorders like PD, AD, and more. Quadis-PD™ integrates with existing clinical
                      workflows and provides comprehensive reports for healthcare providers.
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-white">Key Features:</h3>
                    <ul className="mb-8 space-y-2">
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Multi-modal data analysis (movement, speech, cognitive)
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Early detection algorithms with 94% accuracy
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Comprehensive clinical reports
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Integration with EHR systems
                      </li>
                    </ul>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg flex items-center justify-center p-4">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DWOrwdIHyugRCbbqWUM8QWsVnx1UtW.png"
                        alt="Quadis-PD mobile diagnostic platform interface showing AI-powered assessment modules and data visualization dashboard"
                        className="rounded-lg object-contain w-full h-64"
                      />
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg flex items-center justify-center p-4">
                      <video
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hospital_video%20-%20Made%20with%20Clipchamp-x5CXq4oZsOT3XU3xinwq0mt6RI8Wl4.mp4"
                        controls
                        className="rounded-lg w-full h-64 object-cover"
                        poster="/images/hospital-demo-thumbnail.png"
                      >
                        <source
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hospital_video%20-%20Made%20with%20Clipchamp-x5CXq4oZsOT3XU3xinwq0mt6RI8Wl4.mp4"
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
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Ready to Transform NeuroCare?</h2>
              <p className="mb-10 text-xl text-gray-300">
                Join healthcare providers worldwide who are using our neurotech solutions to revolutionize how they
                identify, monitor, treat and understand neurological disorders.
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
                <img src="/images/neurogati-logo.jpg" alt="Neurogati Logo" className="h-6 w-auto" />
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
            <div>{/* Additional content can be added here if needed */}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
