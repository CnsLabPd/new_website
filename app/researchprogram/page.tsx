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
    /*<div className="min-h-screen bg-background">*/
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">

        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold">NEUROGATI</span>
          </div>
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
          </nav>
          <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold" asChild>
            <a href="#apply">Apply Now</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]" />
            <div className="container mx-auto px-4 py-16 md:py-24">
              <div className="mx-auto max-w-4xl text-center">
                <Badge className="mb-4" variant="secondary">
                  <Calendar className="mr-1 h-3 w-3" />
                  Starting January 1st, 2026
                </Badge>
                <h1 className="mb-6 text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  5-Month Online Research Training in Computational Neuroscience
                </h1>
                <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
                  A mentorship-driven program introducing modern computational neuroscience, from brain modeling to
                  biologically inspired deep networks and research publication.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" asChild>
                    <a href="#apply">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#curriculum">View Curriculum</a>
                  </Button>
                </div>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">1hr/week with mentor</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">10 weeks coursework</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">10 weeks research</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Vision */}
      <section id="overview" className="border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Program Vision</h2>
            <p className="mb-12 text-balance text-center text-lg text-muted-foreground">
              A long-form, mentorship-driven training program designed to introduce students to modern computational
              neuroscience
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Brain className="mb-4 h-10 w-10 text-accent" />
                  <h3 className="mb-2 text-xl font-semibold">Brain Modeling</h3>
                  <p className="text-sm text-muted-foreground">
                    Model important brain structures including the basal ganglia, hippocampus, and sensory-motor
                    systems.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <Code className="mb-4 h-10 w-10 text-accent" />
                  <h3 className="mb-2 text-xl font-semibold">Deep Networks</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn biologically inspired deep networks, oscillatory neural models, and computational approaches.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <GraduationCap className="mb-4 h-10 w-10 text-accent" />
                  <h3 className="mb-2 text-xl font-semibold">Research Track</h3>
                  <p className="text-sm text-muted-foreground">
                    Transition to supervised research with possibility of co-authoring a conference abstract.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1 - Curriculum */}
      <section id="curriculum" className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Phase 1: Coursework</h2>
            <p className="mb-12 text-balance text-center text-lg text-muted-foreground">
              10 weeks of structured video lectures, graded assignments, and weekly mentor calls
            </p>
            <div className="grid gap-6">
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Weeks 1-2
                      </Badge>
                      <h3 className="text-xl font-semibold">Module 1: Foundations of Computational Neuroscience</h3>
                    </div>
                  </div>
                  <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Neuron models: Hodgkin-Huxley (HH), Leaky Integrate and Fire (LIF), McCulloch-Pitts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Tools: Python, NumPy, PyTorch</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Assignment: Build and simulate single neurons</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Weeks 3-4
                      </Badge>
                      <h3 className="text-xl font-semibold">Module 2: Deep Neural Networks and the Brain</h3>
                    </div>
                  </div>
                  <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Perceptrons, Multilayer Perceptrons, CNNs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Using DNNs as metaphor for brain structure and function</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Assignment: Projects using Deep Neural Networks</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Weeks 5-6
                      </Badge>
                      <h3 className="text-xl font-semibold">
                        Module 3: Deep Neural Networks in Sensory-Motor Function
                      </h3>
                    </div>
                  </div>
                  <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>DNNs for modeling visual, auditory, and motor systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Tools: Python, NumPy, PyTorch, TensorFlow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Assignment: DNN applications in vision neuroscience</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Weeks 7-8
                      </Badge>
                      <h3 className="text-xl font-semibold">Module 4: Modeling the Dynamic Neuron</h3>
                    </div>
                  </div>
                  <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Phase plane analysis, Limit Cycles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Fitzhugh-Nagumo, Morris-Lecar, Izhikevich neuron models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Tools: Xppaut</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Weeks 9-10
                      </Badge>
                      <h3 className="text-xl font-semibold">Module 5: Modeling the Dynamic Brain</h3>
                    </div>
                  </div>
                  <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Spiking-neuron networks and oscillatory neural networks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Deep oscillatory neural networks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Assignments: Build networks for classification and model epilepsy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 2 - Research Tracks */}
      <section id="research" className="border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Phase 2: Research Project Track</h2>
            <p className="mb-12 text-balance text-center text-lg text-muted-foreground">
              Choose one long-term research direction with weekly mentor supervision (Weeks 11-20)
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <Badge className="mb-3" variant="secondary">
                    Track A
                  </Badge>
                  <h3 className="mb-2 text-lg font-semibold">Modeling the Basal Ganglia & Deep Brain Stimulation</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore computational models of Parkinson's Disease and deep brain stimulation therapies
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <Badge className="mb-3" variant="secondary">
                    Track B
                  </Badge>
                  <h3 className="mb-2 text-lg font-semibold">Deep Oscillatory Neural Networks</h3>
                  <p className="text-sm text-muted-foreground">
                    Apply oscillatory neural networks for signal and video classification tasks
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <Badge className="mb-3" variant="secondary">
                    Track C
                  </Badge>
                  <h3 className="mb-2 text-lg font-semibold">Modeling Stroke with Biologically Constrained DNNs</h3>
                  <p className="text-sm text-muted-foreground">
                    Use biologically constrained deep networks to model stroke and recovery
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <Badge className="mb-3" variant="secondary">
                    Track D
                  </Badge>
                  <h3 className="mb-2 text-lg font-semibold">Modeling Spatial Cells in the Hippocampus</h3>
                  <p className="text-sm text-muted-foreground">
                    Study place cells, grid cells, and spatial navigation in computational models
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                <CardContent className="p-6">
                  <Badge className="mb-3" variant="secondary">
                    Track E
                  </Badge>
                  <h3 className="mb-2 text-lg font-semibold">AI Applications in EEG Signal Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Apply AI techniques to analyze and interpret electroencephalography signals
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Outcomes & Mentorship */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Expected Outcomes</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Conference-Ready Abstract</h3>
                    <p className="text-sm text-muted-foreground">Co-authored with mentor upon satisfactory progress</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">GitHub Repository</h3>
                    <p className="text-sm text-muted-foreground">Reproducible code for your research project</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">4 Graded Assignments</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive coursework across all modules</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Project Presentation</h3>
                    <p className="text-sm text-muted-foreground">5-7 minute presentation of your research</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold">Mentorship Structure</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Weekly Mentor Call (1hr)</h3>
                    <p className="text-sm text-muted-foreground">Clarify concepts, debug models, review progress</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Continuous Chat Support</h3>
                    <p className="text-sm text-muted-foreground">Email and messaging support throughout the program</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Assignment Review</h3>
                    <p className="text-sm text-muted-foreground">Detailed feedback on all submitted work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Career Guidance</h3>
                    <p className="text-sm text-muted-foreground">Advice on research paths and academic opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section id="instructor" className="border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Lead Instructor</h2>
            <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
              <CardContent className="p-8">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-lg bg-accent/10">
                      <GraduationCap className="h-16 w-16 text-accent" />
                    </div>
                    <h3 className="mb-1 text-2xl font-bold">Prof. V. Srinivasa Chakravarthy</h3>
                    <p className="text-sm text-muted-foreground">IIT Madras</p>
                  </div>
                  <div className="md:col-span-2">
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        Professor with joint appointments in the Department of Biotechnology and the Department of
                        Medical Science and Technology at IIT Madras. Currently heads the Computational Neuroscience Lab
                        (CNS Lab), the Parkinson's Therapeutics Lab, and Neural Engineering Lab.
                      </p>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          <span>BTech from IIT Madras, MS/PhD from UT Austin</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          <span>Postdoctoral training at Baylor College of Medicine</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          <span>Mid-career Research Excellence Award (2018)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          <span>Teaching Excellence Award (2024)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          <span>Author of two books in neuroscience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
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
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Admission Requirements</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Basic Python Knowledge</h3>
                    <p className="text-sm text-muted-foreground">Familiarity with Python programming</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Interest in Neuroscience & ML</h3>
                    <p className="text-sm text-muted-foreground">Passion for neuroscience and machine learning</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">No Prior Research Experience Required</h3>
                    <p className="text-sm text-muted-foreground">Perfect for beginners in research</p>
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
                      <span className="text-lg font-semibold">Phase 1 - Coursework</span>
                      <Badge variant="outline">Weeks 1-10</Badge>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <span className="text-3xl font-bold">₹25,000</span>
                      <span className="text-sm text-muted-foreground">INR</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Payable at the beginning of Phase 1</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur border border-white/10 hover:border-cyan-400/40 hover:shadow-xl transition">
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-lg font-semibold">Phase 2 - Research</span>
                      <Badge variant="outline">Weeks 11-20</Badge>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <span className="text-3xl font-bold">₹35,000</span>
                      <span className="text-sm text-muted-foreground">INR</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Payable at the beginning of Phase 2</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Start Your Journey?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Course starts on <strong>January 1st, 2026</strong> at 20:30 IST (10:00 EST)
            </p>
            <Button size="lg" className="mb-8" asChild>
              <a href="https://forms.gle/neurogati-apply" target="_blank" rel="noopener noreferrer">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="mt-12 rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">To Know More</h3>
              <div className="flex flex-col items-center gap-4">
                <a
                  href="mailto:workshops@neurogati.com"
                  className="flex items-center gap-2 text-accent transition-colors hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  workshops@neurogati.com
                </a>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  <a
                    href="https://cns.iitm.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  >
                    Computational Neuroscience Lab
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <a
                    href="https://neurogati.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline"
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
      <footer className="bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-accent" />
              <span className="font-semibold">NEUROGATI</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 Neurogati Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
