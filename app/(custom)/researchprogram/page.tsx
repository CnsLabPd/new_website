"use client"
import Link from "next/link"
import Image from "next/image"
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
  Clock,
  Laptop,
  Award
} from "lucide-react"

export default function ProgramPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">
      
      {/* Header/Nav - Fixed Logo Spacing & Boldness */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-90 transition group"
          >
            <img 
              src="/bg_just_logo.png" 
              alt="Neurogati Logo" 
              className="h-14 w-14 object-contain group-hover:scale-105 transition-transform" 
            />
            <span className="text-2xl font-black tracking-tighter text-[#1c82c2] dark:text-[#38bdf8]">
              NEUROGATI
            </span>
          </Link>

          <nav className="hidden gap-8 md:flex items-center">
            <a href="#overview" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Overview</a>
            <a href="#curriculum" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Curriculum</a>
            <a href="#research" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Research</a>
            <a href="#instructor" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Instructor</a>
            <Link href="/workshops" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">
              All Workshops
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black uppercase tracking-tight hover:from-cyan-500 hover:to-blue-600 rounded-full px-6"
              asChild
            >
              <a href="#apply">Apply Now</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Fixed Height and Clipping */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]" />
        <div className="container mx-auto px-6 py-24 md:py-32 relative">
          <div className="mx-auto max-w-5xl text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 font-bold px-4 py-1" variant="secondary">
              <Calendar className="mr-2 h-4 w-4 inline text-cyan-400" /> Starting January 1st, 2026
            </Badge>
            
            <h1 className="mb-8 text-5xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              5-Month Online <br className="hidden md:block" /> Research Training
            </h1>
            
            <p className="mb-10 text-pretty text-lg text-slate-300 md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
              A mentorship-driven program introducing modern computational neuroscience, from brain modeling to
              biologically inspired deep networks and research publication.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button
                size="lg"
                className="h-14 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black rounded-full px-10 text-lg hover:from-cyan-500 hover:to-blue-600 shadow-lg shadow-cyan-500/20"
                asChild
              >
                <a href="#apply">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-white/20 text-white hover:bg-white/10 bg-transparent rounded-full px-10 font-bold text-lg"
                asChild
              >
                <a href="#curriculum">View Curriculum</a>
              </Button>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-10 text-xs font-black uppercase tracking-[0.2em] text-cyan-400/80">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5" />
                <span>Weekly Mentorship</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5" />
                <span>10-Week Coursework</span>
              </div>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5" />
                <span>10-Week Research</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Vision - Scaled Text */}
      <section id="overview" className="border-b border-white/10 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-4xl md:text-6xl font-black tracking-tighter">Program Vision</h2>
            <p className="mb-16 text-center text-lg md:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
              A long-form, mentorship-driven training program designed to introduce students to modern computational neuroscience.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard 
                icon={<Brain className="h-12 w-12 text-cyan-400" />}
                title="Brain Modeling"
                description="Model important brain structures including the basal ganglia, hippocampus, and sensory-motor systems."
              />
              <FeatureCard 
                icon={<Code className="h-12 w-12 text-cyan-400" />}
                title="Deep Networks"
                description="Learn biologically inspired deep networks, oscillatory neural models, and computational approaches."
              />
              <FeatureCard 
                icon={<GraduationCap className="h-12 w-12 text-cyan-400" />}
                title="Research Track"
                description="Transition to supervised research with the possibility of co-authoring a conference abstract."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1 - Curriculum - Detailed Scaling */}
      <section id="curriculum" className="border-b border-white/10 bg-white/[0.02] py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center mb-16">
            <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20 font-black px-4 py-1">WEEKS 1-10</Badge>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Phase 1 — Coursework</h2>
            <p className="text-lg md:text-xl text-slate-400 font-medium">Video lectures + graded assignments + 1 hr/week live mentor call</p>
            <p className="text-lg md:text-sm text-slate-400 font-small">Goal: Ensure all students acquire core mathematical and computational foundations</p>          
          </div>

          <div className="grid gap-8">
            <ModuleCard number="1" weeks="Weeks 1-2" title="Foundations of Computational Neuroscience" 
              details={["Hodgkin-Huxley (HH) Models", "Leaky Integrate and Fire (LIF) Neuron", "McCulloch-Pitts Neurons"]} 
              tech="Python, NumPy, PyTorch"
              assignment="Assignment: Build and Simulate Single Neurons"
            />
            <ModuleCard number="2" weeks="Weeks 3-4" title="Deep Neural Networks and the Brain" 
              details={["MLPs and Perceptrons", "Convolutional Neural Networks", "DNNs as Brain Metaphors"]} 
              tech="PyTorch, Brain Organization"
              assignment="Assignment: Projects using Deep Neural Networks"
            />
            <ModuleCard number="3" weeks="Weeks 5-6" title="Sensory-Motor Function in DNNs" 
              details={["Visual System Modeling", "Auditory Pathway Simulation", "Motor System Dynamics"]} 
              tech="TensorFlow, Vision Labs"
              assignment="Assignment:  DNN applications in vision neuroscience"
            />
            <ModuleCard number="4" weeks="Weeks 7-8" title="Modelling the Dynamic Neuron" 
              details={["Phase plane analysis", "Modeling Limit Cycles","Limit Cycle-based neuron models (e.g., Fitzhugh-Nagumo, Morris-Lecar)",
                        "Izhikevich neuron models – 1D and 2D"]} 
              tech="Xppaut"
              assignment="Assignment:Modeling dynamic single neuron models and small networks"
            />
            <ModuleCard number="5" weeks="Weeks 9-10" title="Modelling the Dynamic Neuron" 
              details={["Spiking-neuron networks", "Oscillatory Neural Networks", "Deep oscillatory neural networks"]} 
              tech="Python, NumPy, PyTorch"
              assignment="Assignment: Build Deep oscillatory-networks for classification, Spiking neuron networks to model epilepsy"
            />
          </div>
        </div>
      </section>

      {/* Phase 2 - Tracks */}
      <section id="research" className="border-b border-white/10 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center mb-16">
            <Badge className="mb-4 bg-cyan-400/10 text-cyan-400 border-cyan-400/20 font-black px-4 py-1">WEEKS 11-20</Badge>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Phase 2 — Research Project</h2>
            <p className="text-lg md:text-xl text-slate-400 font-medium">Choose a specialized research direction under weekly supervision</p>
          <p className="text-lg md:text-sm text-slate-400 font-small">Mentors supervise weekly and help with modeling choices, testing plans, implementation, and writing</p>
          </div>

          <div className="grid gap-6">
            <TrackCard letter="A" title="Modeling Basal Ganglia & DBS" description="Investigate how deep brain stimulation can be used therapeutically for Parkinson's disease." />
            <TrackCard letter="B" title="Deep Oscillatory Neural Networks" description="Develop and apply deep oscillatory networks to classify complex signal and video data." />
            <TrackCard letter="C" title="Modeling Stroke with Constrained DNNs" description="Build biologically constrained models to understand mechanisms and interventions for stroke." />
            <TrackCard letter="D" title="Modeling the Spatial Cells in the Hippocampus" description="Investigate computational models of spatial cells including place cells, grid cells, and other spatially-tuned neurons in the hippocampal formation." />
            <TrackCard letter="E" title="AI Applications in Electroencephalography (EEG) Signal Processing" description="Apply advanced AI techniques to process and analyze EEG signals for applications in brain-computer interfaces, clinical diagnosis, and cognitive neuroscience." />

          </div>
        </div>
      </section>

      {/* Fees & Requirements */}
      <section id="fees" className="border-b border-white/10 bg-white/[0.02] py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black tracking-tighter mb-8">Admission Requirements</h2>
              <div className="space-y-6">
                <RequirementItem text="Basic Python Knowledge (NumPy/Loops)" />
                <RequirementItem text="Interest in Neuroscience & Machine Learning" />
                <RequirementItem text="No Prior Research Experience Required" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tighter mb-8">Fee Structure</h2>
              <div className="space-y-6">
                <FeeRow phase="Phase 1: Coursework" weeks="Weeks 1-10" price="₹25,000" />
                <FeeRow phase="Phase 2: Research" weeks="Weeks 11-20" price="₹35,000" />
              </div>
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
      <footer className="bg-black/40 border-t border-white/5 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              {/* <Brain className="h-8 w-8 text-cyan-400" /> */}
              <span className="text-xl font-black tracking-tight uppercase">NEUROGATI</span>
            </div>
            <p className="text-sm text-slate-500 font-bold italic">workshops@neurogati.com</p>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">© 2026 NEUROGATI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

/* --- REUSABLE HELPER COMPONENTS --- */

function FeatureCard({ icon, title, description }: any) {
  return (
    <Card className="bg-white/[0.03] backdrop-blur border border-white/10 hover:border-cyan-400/40 transition-all">
      <CardContent className="pt-10 pb-8 px-8">
        <div className="mb-6">{icon}</div>
        <h3 className="mb-3 text-xl font-black text-white">{title}</h3>
        <p className="text-[17px] text-slate-400 font-medium leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

function ModuleCard({ number, weeks, title, details, tech, assignment }: any) {
  return (
    <Card className="bg-white/5 border border-white/10 overflow-hidden hover:bg-white/[0.07] transition-colors">
      <div className="flex items-stretch">
        <div className="w-16 md:w-20 bg-cyan-400/10 flex items-center justify-center border-r border-white/5">
          <span className="text-3xl font-black text-cyan-400">{number}</span>
        </div>
        <div className="p-8 flex-1 text-left">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
            <Badge variant="outline" className="border-white/20 text-cyan-400 font-black">{weeks}</Badge>
          </div>
          <ul className="list-disc ml-5 mb-4 text-[17px] text-slate-300 font-medium space-y-1">
            {details.map((d: any, i: number) => <li key={i}>{d}</li>)}
          </ul>
          <p className="text-xs font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
            <Code className="h-3 w-3" /> {tech}
          </p>
          <p className="text-xs font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
            <Code className="h-3 w-3" /> {assignment}
          </p>
        </div>
      </div>
    </Card>
  )
}

function TrackCard({ letter, title, description }: any) {
  return (
    <Card className="bg-white/5 border border-white/10 p-8 hover:border-cyan-400/30 transition-all">
      <div className="flex gap-6 items-start">
        <div className="text-4xl font-black text-cyan-400/20">{letter}</div>
        <div>
          <h3 className="text-xl font-black text-white mb-2">{title}</h3>
          <p className="text-[17px] text-slate-400 font-medium">{description}</p>
        </div>
      </div>
    </Card>
  )
}

function RequirementItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-[17px] font-medium text-slate-300">
      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0" />
      {text}
    </div>
  )
}

function FeeRow({ phase, weeks, price }: any) {
  return (
    <Card className="bg-white/5 border border-white/10 p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-black text-white text-lg">{phase}</p>
          <p className="text-xs text-slate-500 font-bold uppercase">{weeks}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-cyan-400">{price}</p>
          <p className="text-[10px] text-slate-500 font-black uppercase">INR</p>
        </div>
      </div>
    </Card>
  )
}