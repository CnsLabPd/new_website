import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  BookOpen,
  Users,
  Code,
  Lightbulb,
  Calendar,
  DollarSign,
  Mail,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
} from "lucide-react"

export default function ProgramPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/images/neurogati-logo.jpg" alt="Neurogati Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-white">Neurogati</span>
            </div>
          </Link>
        </div>
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <Brain className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold">NEUROGATI</span>
          </a>
          <nav className="hidden gap-6 md:flex">
            <a href="#overview" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Overview
            </a>
            <a href="#curriculum" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Curriculum
            </a>
            <a href="#research" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Research
            </a>
            <a href="#instructor" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Instructor
            </a>
            <Link href="/workshops" className="text-sm text-slate-400 hover:text-cyan-400 transition">
              Workshops
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-500 hover:to-blue-600"
              asChild
            >
              <a href="#apply">Apply Now</a>
            </Button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-white/10 text-white border-white/20" variant="secondary">
              <Calendar className="mr-1 h-3 w-3" />
              Starting January 1st, 2026
            </Badge>
            <h1 className="mb-6 text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              5-Month Online Research Training in Computational Neuroscience
            </h1>
            <p className="mb-8 text-pretty text-lg text-slate-300 md:text-xl">
              A mentorship-driven program introducing modern computational neuroscience, from brain modeling to
              biologically inspired deep networks and research publication.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-500 hover:to-blue-600"
                asChild
              >
                <a href="#apply">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <a href="#curriculum">View Curriculum</a>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-cyan-400" />
                <span className="text-slate-300">1hr/week with mentor</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-cyan-400" />
                <span className="text-slate-300">10 weeks coursework</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-cyan-400" />
                <span className="text-slate-300">10 weeks research</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Vision */}
      <section id="overview" className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Program Vision</h2>
            <p className="mb-12 text-balance text-center text-lg text-slate-300">
              A long-form, mentorship-driven training program designed to introduce students to modern computational
              neuroscience
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Brain className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">Brain Modeling</h3>
                  <p className="text-sm text-slate-300">
                    Model important brain structures including the basal ganglia, hippocampus, and sensory-motor
                    systems.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Code className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">Deep Networks</h3>
                  <p className="text-sm text-slate-300">
                    Learn biologically inspired deep networks, oscillatory neural models, and computational approaches.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <GraduationCap className="mb-4 h-10 w-10 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">Research Track</h3>
                  <p className="text-sm text-slate-300">
                    Transition to supervised research with possibility of co-authoring a conference abstract.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1 - Curriculum */}
      <section id="curriculum" className="border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20" variant="secondary">
                Weeks 1-10
              </Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Phase 1 — Coursework</h2>
              <p className="text-lg text-slate-300">Video lectures + graded assignments + 1 hr/week live mentor call</p>
              <p className="mt-2 text-sm text-slate-400">
                Goal: Ensure all students acquire core mathematical and computational foundations
              </p>
            </div>

            <div className="grid gap-6">
              {/* Module 1 */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">1</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Foundations of Computational Neuroscience</h3>
                        <Badge variant="outline" className="border-white/20 text-white text-xs">
                          Weeks 1-2
                        </Badge>
                      </div>
                      <div className="mb-4 space-y-2 text-sm text-slate-300">
                        <p className="font-medium text-white">Neuron models:</p>
                        <ul className="ml-4 list-disc space-y-1">
                          <li>Hodgkin-Huxley (HH)</li>
                          <li>Leaky Integrate and Fire (LIF) Neuron</li>
                          <li>McCulloch-Pitts</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <Code className="h-3 w-3 text-cyan-400" />
                          <span className="text-slate-300">Python, NumPy, PyTorch</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3 text-cyan-400" />
                          <span className="text-slate-300">Assignment: Build and simulate single neurons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module 2 */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">2</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Deep Neural Networks and the Brain</h3>
                        <Badge variant="outline" className="border-white/20 text-white text-xs">
                          Weeks 3-4
                        </Badge>
                      </div>
                      <div className="mb-4 space-y-2 text-sm text-slate-300">
                        <ul className="ml-4 list-disc space-y-1">
                          <li>Perceptrons, Multilayer Perceptrons</li>
                          <li>Deep Neural Networks, Convolutional Neural Networks</li>
                          <li>Using DNNs as a convenient metaphor for brain structure and function</li>
                          <li>Organization of the Nervous System</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <Code className="h-3 w-3 text-cyan-400" />
                          <span className="text-slate-300">Python, NumPy, PyTorch</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3 text-cyan-400" />
                          <span className="text-slate-300">Assignment: Projects using Deep Neural Networks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module 3 */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">3</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">
                          Deep Neural Networks in Sensory-Motor Function
                        </h3>
                        <Badge variant="outline" className="border-white/20 text-white text-xs">
                          Weeks 5-6
                        </Badge>
                      </div>
                      <div className="mb-4 space-y-2 text-sm text-slate-300">
                        <ul className="ml-4 list-disc space-y-1">
                          <li>DNNs for modelling the visual system</li>
                          <li>DNNs for modelling the auditory system</li>
                          <li>DNNs for modelling the motor system</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <Code className="h-3 w-3 text-cyan-400" />
                          <span className="text-slate-300">Python, NumPy, PyTorch, TensorFlow</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3 text-cyan-400" />
                          <span className="text-slate-300">Assignment: DNN applications in vision neuroscience</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module 4 */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">4</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Modelling the Dynamic Neuron</h3>
                        <Badge variant="outline" className="border-white/20 text-white text-xs">
                          Weeks 7-8
                        </Badge>
                      </div>
                      <div className="mb-4 space-y-2 text-sm text-slate-300">
                        <ul className="ml-4 list-disc space-y-1">
                          <li>Phase plane analysis</li>
                          <li>Modeling Limit Cycles</li>
                          <li>Limit Cycle-based neuron models (e.g., Fitzhugh-Nagumo, Morris-Lecar)</li>
                          <li>Izhikevich neuron models – 1D and 2D</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <Code className="h-3 w-3 text-cyan-400" />
                          <span className="text-slate-300">Xppaut</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3 text-cyan-400" />
                          <span className="text-slate-300">
                            Assignment: Modeling dynamic single neuron models and small networks
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module 5 */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">5</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Modelling the Dynamic Brain</h3>
                        <Badge variant="outline" className="border-white/20 text-white text-xs">
                          Weeks 9-10
                        </Badge>
                      </div>
                      <div className="mb-4 space-y-2 text-sm text-slate-300">
                        <ul className="ml-4 list-disc space-y-1">
                          <li>Spiking-neuron networks</li>
                          <li>Oscillatory Neural Networks</li>
                          <li>Deep oscillatory neural networks</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <Code className="h-3 w-3 text-cyan-400" />
                          <span className="text-slate-300">Python, NumPy, PyTorch</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3 text-cyan-400" />
                          <span className="text-slate-300">
                            Assignments: Build Deep oscillatory-networks for classification, Spiking neuron networks to
                            model epilepsy
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 2 - Research Tracks */}
      <section id="research" className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20" variant="secondary">
                Weeks 11-20
              </Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Phase 2 — Research Project Track</h2>
              <p className="text-lg text-slate-300">
                After completing all assignments, students choose one long-term research direction
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Mentors supervise weekly and help with modeling choices, testing plans, implementation, and writing
              </p>
            </div>

            <div className="grid gap-6">
              {/* Track A */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">A</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-semibold text-white">
                        Modeling the Basal Ganglia & Deep Brain Stimulation for Parkinson's Disease
                      </h3>
                      <p className="text-sm text-slate-300">
                        Explore computational models of the basal ganglia and investigate how deep brain stimulation can
                        be used therapeutically for Parkinson's disease treatment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Track B */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">B</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-semibold text-white">
                        Deep Oscillatory Neural Networks for Signal & Video Classification
                      </h3>
                      <p className="text-sm text-slate-300">
                        Develop and apply deep oscillatory neural networks to classify complex signals and video data,
                        exploring the role of oscillations in neural computation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Track C */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">C</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-semibold text-white">
                        Modeling Stroke with Biologically Constrained DNNs
                      </h3>
                      <p className="text-sm text-slate-300">
                        Build biologically constrained deep neural network models to understand stroke mechanisms and
                        explore potential therapeutic interventions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Track D */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">D</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-semibold text-white">
                        Modeling the Spatial Cells in the Hippocampus
                      </h3>
                      <p className="text-sm text-slate-300">
                        Investigate computational models of spatial cells including place cells, grid cells, and other
                        spatially-tuned neurons in the hippocampal formation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Track E */}
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="text-xl font-bold text-cyan-400">E</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-semibold text-white">
                        AI Applications in Electroencephalography (EEG) Signal Processing
                      </h3>
                      <p className="text-sm text-slate-300">
                        Apply advanced AI techniques to process and analyze EEG signals for applications in
                        brain-computer interfaces, clinical diagnosis, and cognitive neuroscience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Outcomes & Mentorship */}
      <section className="border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Expected Outcomes</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold text-white">Conference-Ready Abstract</h3>
                    <p className="text-sm text-slate-300">Co-authored with mentor upon satisfactory progress</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold text-white">GitHub Repository</h3>
                    <p className="text-sm text-slate-300">Reproducible code for your research project</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold text-white">4 Graded Assignments</h3>
                    <p className="text-sm text-slate-300">Comprehensive coursework across all modules</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold text-white">Project Presentation</h3>
                    <p className="text-sm text-slate-300">5-7 minute presentation of your research</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold">Mentorship Structure</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold text-white">Weekly Mentor Call (1hr)</h3>
                    <p className="text-sm text-slate-300">Clarify concepts, debug models, review progress</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold text-white">Continuous Chat Support</h3>
                    <p className="text-sm text-slate-300">Email and messaging support throughout the program</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold text-white">Assignment Review</h3>
                    <p className="text-sm text-slate-300">Detailed feedback on all submitted work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold text-white">Career Guidance</h3>
                    <p className="text-sm text-slate-300">Advice on research paths and academic opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section id="instructor" className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Lead Instructor</h2>
            <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
              <CardContent className="p-8">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-lg bg-cyan-400/10">
                      <GraduationCap className="h-16 w-16 text-cyan-400" />
                    </div>
                    <h3 className="mb-1 text-2xl font-bold text-white">Prof. V. Srinivasa Chakravarthy</h3>
                    <p className="text-sm text-slate-300">IIT Madras</p>
                  </div>
                  <div className="md:col-span-2">
                    <div className="space-y-4 text-sm text-slate-300">
                      <p>
                        Professor with joint appointments in the Department of Biotechnology and the Department of
                        Medical Science and Technology at IIT Madras. Currently heads the Computational Neuroscience Lab
                        (CNS Lab), the Parkinson's Therapeutics Lab, and Neural Engineering Lab.
                      </p>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                          <span>BTech from IIT Madras, MS/PhD from UT Austin</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                          <span>Postdoctoral training at Baylor College of Medicine</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                          <span>Mid-career Research Excellence Award (2018)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                          <span>Teaching Excellence Award (2024)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                          <span>Author of two books in neuroscience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                          <span>Inventor of Bharati script for Indian languages</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admission & Fees */}
      <section className="border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Admission Requirements</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold text-white">Basic Python Knowledge</h3>
                    <p className="text-sm text-slate-300">Familiarity with Python programming</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold text-white">Interest in Neuroscience & ML</h3>
                    <p className="text-sm text-slate-300">Passion for neuroscience and machine learning</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold text-white">No Prior Research Experience Required</h3>
                    <p className="text-sm text-slate-300">Perfect for beginners in research</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold">Fee Structure</h2>
              <div className="space-y-4">
                <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-lg font-semibold text-white">Phase 1 - Coursework</span>
                      <Badge variant="outline" className="border-white/20 text-white">
                        Weeks 1-10
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">₹25,000</span>
                      <span className="text-sm text-slate-300">INR</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300">Payable at the beginning of Phase 1</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-lg font-semibold text-white">Phase 2 - Research</span>
                      <Badge variant="outline" className="border-white/20 text-white">
                        Weeks 11-20
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">₹35,000</span>
                      <span className="text-sm text-slate-300">INR</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300">Payable at the beginning of Phase 2</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Start Your Journey?</h2>
            <p className="mb-8 text-lg text-slate-300">
              Course starts on <strong className="text-white">January 1st, 2026</strong> at 20:30 IST (10:00 EST)
            </p>
            <Button
              size="lg"
              className="mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-500 hover:to-blue-600"
              asChild
            >
              <a href="https://forms.gle/raU26Zfyb39bdRFd8" target="_blank" rel="noopener noreferrer">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="mt-12 rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">To Know More</h3>
              <div className="flex flex-col items-center gap-4">
                <a
                  href="mailto:workshops@neurogati.com"
                  className="flex items-center gap-2 text-cyan-400 transition-colors hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  workshops@neurogati.com
                </a>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  <a
                    href="https://cns.iitm.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 transition-colors hover:text-white hover:underline"
                  >
                    Computational Neuroscience Lab
                  </a>
                  <span className="text-slate-300">•</span>
                  <a
                    href="https://neurogati.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 transition-colors hover:text-white hover:underline"
                  >
                    Neurogati Pvt Ltd
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-cyan-400" />
              <span className="font-semibold">NEUROGATI</span>
            </div>
            <p className="text-sm text-slate-300">© 2026 Neurogati Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
