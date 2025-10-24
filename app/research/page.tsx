import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Brain, FileText, Download } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"

export default function ResearchPage() {
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
              <Image
                src="/images/neurogati-logo.jpg"
                alt="Neurogati Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
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
          <Link href="/research" className="text-sm font-medium text-white transition-colors">
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
          {/* Brain network background image */}
          <div className="absolute inset-0 z-5">
            <div className="relative w-full h-full">
              <Image
                src="/images/brain-network-bg.webp"
                alt="Neural network brain background"
                fill
                className="object-cover opacity-10 blur-sm"
                priority
              />
            </div>
          </div>
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">Our Research</h1>
              <p className="mb-10 text-xl text-gray-300">
                Advancing the field of neurological care through innovative research and clinical studies.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy-900 py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              {/* Parkinson's Disease Research */}
              <div className="mb-16">
                <h2 className="mb-8 text-3xl font-bold text-white">Parkinson's Disease Research</h2>
                <div className="space-y-8">
                  <div className="rounded-lg bg-navy-800 p-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                        <FileText className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-white">
                          A Computational Model of Deep Brain Stimulation for Parkinson's Disease Tremor and
                          Bradykinesia
                        </h3>
                        <p className="mb-4 text-gray-300">Brain Sciences, 2024</p>
                        <p className="mb-4 text-gray-300">
                          This study demonstrates how deep brain stimulation (DBS) approach—a widely used treatment for
                          managing Parkinson's disease (PD) symptoms—can effectively alleviate motor disorders such as
                          tremor and bradykinesia. Our computational model provides a detailed understanding of how DBS
                          works and aids in identifying optimal stimulation parameters, such as frequency and amplitude,
                          to maximize therapeutic benefit.
                        </p>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Download className="h-4 w-4" /> Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-navy-800 p-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                        <FileText className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-white">
                          A Multiscale, Systems-Level, Neuropharmacological Model of Cortico-Basal Ganglia System for
                          Arm Reaching Under Normal, Parkinsonian, and Levodopa Medication Conditions
                        </h3>
                        <p className="mb-4 text-gray-300">Frontiers in Computational Neuroscience, 2022</p>
                        <p className="mb-4 text-gray-300">
                          To explore how dopamine loss leads to Parkinson's symptoms, we developed a multiscale
                          computational model that links cellular degeneration in the brain to real-world motor
                          behavior. By replacing abstract reward signals with biologically realistic dopamine dynamics,
                          our model simulates arm-reaching tasks and predicts the effects of SNc cell loss and L-DOPA
                          treatment. It replicates both therapeutic benefits and side effects, offering a potential tool
                          for optimizing medication dosage based on individual patient profiles.
                        </p>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Download className="h-4 w-4" /> Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cognitive Neuroscience Research */}
              <div className="mb-16">
                <h2 className="mb-8 text-3xl font-bold text-white">Cognitive Neuroscience Research</h2>
                <div className="space-y-8">
                  <div className="rounded-lg bg-navy-800 p-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                        <FileText className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-white">
                          A generalized reinforcement learning based deep neural network agent model for diverse
                          cognitive constructs
                        </h3>
                        <p className="mb-4 text-gray-300">Scientific Reports, 2023</p>
                        <p className="mb-4 text-gray-300">
                          We've developed a unified reinforcement learning-based model that simulates key cognitive
                          functions like attention, memory, decision-making, and inhibition. Unlike traditional
                          approaches that study these abilities in isolation, our model captures them
                          together—reflecting how cognitive impairments manifest in real life. It serves as a testbench
                          to simulate therapeutic interventions before applying them in clinical settings.
                        </p>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Download className="h-4 w-4" /> Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rehabilitation Research */}
              <div className="mb-16">
                <h2 className="mb-8 text-3xl font-bold text-white">Rehabilitation Research</h2>
                <div className="space-y-8">
                  <div className="rounded-lg bg-navy-800 p-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                        <FileText className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-white">
                          Feasibility and efficacy of virtual reality rehabilitation compared with conventional
                          physiotherapy for upper extremity impairment due to ischaemic stroke: protocol for a
                          randomised controlled trial
                        </h3>
                        <p className="mb-4 text-gray-300">BMJ Open, 2024</p>
                        <p className="mb-4 text-gray-300">
                          We're conducting a multicenter clinical trial to evaluate the effectiveness of our VR-based
                          Comprehensive Rehabilitation Gaming System (VR-cRGS) for stroke survivors with upper limb
                          impairments. The study compares VR-cRGS with conventional physiotherapy across 162 patients,
                          assessing improvements in motor function, treatment compliance, and overall quality of life.
                          Beyond functional recovery, the trial uses advanced brain imaging to measure how VR-driven
                          rehab influences structural and functional brain plasticity—offering insight into how
                          immersive, task-oriented therapy can reshape recovery after stroke.
                        </p>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Download className="h-4 w-4" /> Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="mb-8 text-3xl font-bold text-white">Books</h2>
                <div className="space-y-8">
                  <div className="rounded-lg bg-navy-800 p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex justify-center items-center">
                        <div className="relative w-full max-w-[200px] h-[280px] overflow-hidden rounded-md shadow-lg">
                          <Image
                            src="/images/bg.jpg"
                            alt="Computational Neuroscience Models of the Basal Ganglia book cover"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="mb-2 text-xl font-bold text-white">
                          Computational Neuroscience Models of the Basal Ganglia
                        </h3>
                        <p className="mb-4 text-gray-300">Springer, 2018</p>
                        <p className="mb-4 text-gray-300">
                          The book presents computational models of basal ganglia-related disorders, including
                          Parkinson's disease, schizophrenia, and addiction. Importantly, it highlights the applications
                          of understanding the role of the basal ganglia to treat neurological and psychiatric
                          disorders.
                        </p>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Download className="h-4 w-4" /> Check it out
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-navy-800 p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex justify-center items-center">
                        <div className="relative w-full max-w-[200px] h-[280px] overflow-hidden rounded-md shadow-lg">
                          <Image
                            src="/images/demystify.jpg"
                            alt="Demystifying the Brain book cover"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="mb-2 text-xl font-bold text-white">Demystifying the Brain</h3>
                        <p className="mb-4 text-gray-300">Springer, 2018</p>
                        <p className="mb-4 text-gray-300">
                          This book presents an emerging new vision of the brain, which is essentially expressed in
                          computational terms, for non-experts. As such, it presents the fundamental concepts of
                          neuroscience in simple language, without overwhelming non-biologists with excessive biological
                          jargon. In addition, the book presents a novel computational perspective on the brain for
                          biologists, without resorting to complex mathematical equations. It addresses a comprehensive
                          range of topics, starting with the history of neuroscience, the function of the individual
                          neuron, the various kinds of neural network models that can explain diverse neural phenomena,
                          sensory-motor function, language, emotions, and concluding with the latest theories on
                          consciousness.
                        </p>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Download className="h-4 w-4" /> Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-8 text-3xl font-bold text-white">Ongoing Clinical Studies</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="rounded-lg bg-navy-800 p-6">
                    <h3 className="mb-2 text-xl font-bold text-white">Telerehabilitation for Post-Stroke Recovery</h3>
                    <p className="mb-4 text-gray-300">
                      Evaluating the effectiveness of our telerehabilitation platform for improving motor function in
                      stroke survivors.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-cyan-400">Status:</span>
                      <span className="text-sm text-gray-300">Recruiting</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-navy-800 p-6">
                    <h3 className="mb-2 text-xl font-bold text-white">AI-Driven Gait Assessment for PD</h3>
                    <p className="mb-4 text-gray-300">
                      Validating our AI-powered gait assessment tools against gold-standard gait tests for PD diagnosis.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-cyan-400">Status:</span>
                      <span className="text-sm text-gray-300">Recruiting</span>
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
