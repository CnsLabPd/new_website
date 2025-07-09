import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"

export default function BCIPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-10 flex h-20 items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/images/Neurogati.jpg" alt="Neurogati Logo" className="h-8 w-8 object-contain" />
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
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500   hover:from-cyan-600 hover:to-blue-600">
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
                Brain-Computer Interface
              </h1>
              <p className="mb-10 text-xl text-gray-300">
                Cutting-edge BCI technology to restore function and improve quality of life for patients with severe
                neurological disorders.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy-900 py-20">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-1">
              <div className="rounded-lg bg-navy-800 p-8 border border-cyan-500/20">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 space-y-4">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg h-64 flex items-center justify-center">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tJB2f7LzICl8zLcTwLAkCUeRsEhTGO.png"
                        alt="iVisualise BCI system showing patient with EEG electrodes thinking of a car, with the thought being displayed on a computer screen"
                        className="rounded-lg object-contain w-full h-full"
                      />
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg h-64 flex items-center justify-center">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-20250523-wa0013.jpg-9gBEWsfyJBaNe8bk73H7PXNAru5htQ.jpeg"
                        alt="BCI laboratory setup showing patient wearing EEG cap with electrodes in controlled research environment with acoustic foam walls and computer monitoring equipment"
                        className="rounded-lg object-contain w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                      <Brain className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-white">iVisualise™</h2>
                    <p className="mb-6 text-gray-300">
                      A revolutionary BCI system that translates neural signals into images, allowing users with
                      communicate effectively through thought alone.
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-white">Key Features:</h3>
                    <ul className="mb-8 space-y-2">
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Real-time neural decoding
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> 95% algorithmic accuracy
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Adaptive learning for improved accuracy
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400">•</span> Multi-platform integration
                      </li>
                    </ul>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-navy-950 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Pioneering the Future of Neural Interfaces
              </h2>
              <p className="mb-10 text-xl text-gray-300">
                Our BCI technology is at the forefront of neuroscience and AI, creating new possibilities for patients
                with severe neurological disorders.
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
