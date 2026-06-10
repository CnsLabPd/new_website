"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Brain,
  Activity,
  Network,
  Layers,
  Calendar,
  Award,
  Laptop,
  ArrowRight,
  Mail,
  Clock,
  AlertCircle,
  Download,
  Users,
  MapPin,
  Cpu,
  Eye,
  Zap
} from "lucide-react"

export default function EEGWorkshopAugustPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">

      {/* Secondary Navigation */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto px-6 py-3">
          <nav className="flex gap-8 text-sm">
            <a href="#overview" className="hover:text-blue-400 transition-colors">Overview</a>
            <a href="#schedule" className="hover:text-blue-400 transition-colors">Schedule</a>
            <a href="#highlights" className="hover:text-blue-400 transition-colors">Highlights</a>
            <a href="#registration" className="hover:text-blue-400 transition-colors">Registration</a>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="pt-24 pb-24 text-center">
        <Badge className="mb-6 bg-purple-600">3-Day Offline Workshop</Badge>

        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          AI Applications in EEG
        </h1>

        <p className="mt-6 text-xl text-slate-300">
          Workshop on Brain Signal Processing & Machine Learning
        </p>

        <div className="flex justify-center gap-8 mt-10 text-sm text-slate-400">
          <div className="flex gap-2"><Calendar /> August 7–9, 2026</div>
          <div className="flex gap-2"><MapPin /> Offline Workshop</div>
          <div className="flex gap-2"><Award /> Certificate of Participation</div>
        </div>

        {/* Registration Deadline Alert */}
        <div className="mt-8 max-w-2xl mx-auto space-y-4">
          <Card className="bg-orange-900/30 border-orange-500/50 p-4">
            <div className="flex items-center gap-3 text-orange-300">
              <AlertCircle className="h-5 w-5" />
              <span className="font-semibold">SOP Submission Deadline: July 15, 2026</span>
            </div>
          </Card>
          <Card className="bg-blue-900/30 border-blue-500/50 p-4">
            <div className="flex items-center gap-3 text-blue-300">
              <Users className="h-5 w-5" />
              <span className="font-semibold">Limited to 50 Participants (Selection-based)</span>
            </div>
          </Card>
        </div>

        {/* Registration and Download Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="https://forms.gle/VFxSeP6cJUQAkz2AA">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold shadow-lg">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/workshop brochures/EEG workshop July 2026 v1.pdf" download>
            <Button variant="outline" className="px-8 py-4 text-lg font-bold border-blue-400 text-blue-400 hover:bg-blue-400/10">
              Download Brochure
              <Download className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-10">Workshop Overview</h2>

        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
            <p className="text-lg text-slate-200 leading-relaxed">
              The human brain continuously generates electrical activity as we think, feel, move, or imagine.
              By capturing these signals using Electroencephalography (EEG), we open a gateway to interpreting
              brain states and building systems that interact directly with neural activity. When combined with
              Artificial Intelligence (AI), EEG enables powerful applications in brain-computer interfaces,
              neurological diagnosis, cognitive monitoring, and beyond.
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{
            icon: <Brain />,
            title: "EEG Data Collection",
            desc: "Live demonstrations of EEG setup, signal acquisition, and resting state recordings"
          },{
            icon: <Activity />,
            title: "Signal Processing",
            desc: "Learn preprocessing with MNE-Python: filtering, artifact removal, and segmentation"
          },{
            icon: <Cpu />,
            title: "Machine Learning",
            desc: "Build AI models for motor imagery, seizure detection, and neurodegeneration analysis"
          },{
            icon: <Eye />,
            title: "Visual & Motor Imagery",
            desc: "Explore how imagined movements and visual scenes are reflected in EEG patterns"
          },{
            icon: <Zap />,
            title: "Clinical Applications",
            desc: "Seizure detection, Parkinson's and Alzheimer's classification using EEG markers"
          },{
            icon: <Network />,
            title: "Expert Faculty",
            desc: "Learn from leading researchers and neurotechnology experts in the field"
          }].map((item, i) => (
            <Card key={i} className="p-6 hover:bg-slate-800/50 transition-colors">
              <div className="text-purple-400 mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section id="highlights" className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-black mb-10">Workshop Highlights</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-left bg-gradient-to-br from-blue-900/30 to-purple-900/30">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Hands-on Learning</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Live EEG setup and signal acquisition demonstrations</li>
              <li>• MNE-Python tutorials for signal processing</li>
              <li>• End-to-end classification pipeline walkthroughs</li>
              <li>• Real EEG datasets for practical exercises</li>
            </ul>
          </Card>

          <Card className="p-8 text-left bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <h3 className="text-xl font-bold mb-4 text-purple-400">Advanced Applications</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Motor & Visual Imagery classification</li>
              <li>• Epileptic seizure detection algorithms</li>
              <li>• Neurodegenerative disorder analysis</li>
              <li>• Feature extraction: PSD, PLI techniques</li>
            </ul>
          </Card>

          <Card className="p-8 text-left bg-gradient-to-br from-green-900/30 to-blue-900/30">
            <h3 className="text-xl font-bold mb-4 text-green-400">Expert Guidance</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Inaugural talk by Prof. Srinivasa Chakravarthy</li>
              <li>• Sessions by faculty and neurotechnology experts</li>
              <li>• Industry insights and current BCI research trends</li>
              <li>• Real-world application case studies</li>
            </ul>
          </Card>

          <Card className="p-8 text-left bg-gradient-to-br from-orange-900/30 to-red-900/30">
            <h3 className="text-xl font-bold mb-4 text-orange-400">Certification & Resources</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Certificate of Participation</li>
              <li>• Participant e-Handbook on AI Applications in EEG</li>
              <li>• Complete workshop materials and datasets</li>
              <li>• Networking opportunities with peers</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-10">3-Day Workshop Schedule</h2>

        <div className="space-y-8 max-w-6xl mx-auto">

          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">Day 1: Foundations & EEG + AI Basics (Aug 7)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="font-semibold text-blue-400 mb-2">9:00-10:00</div>
                <div className="font-medium">Inaugural Talk by Prof. Srinivasa Chakravarthy</div>
              </Card>
              <Card className="p-4">
                <div className="font-semibold text-blue-400 mb-2">10:00-11:00</div>
                <div className="font-medium">Introduction to EEG and System Setup</div>
                <div className="text-sm text-slate-400">Overview, 10-20 montage, cap fitting, impedance check</div>
              </Card>
              <Card className="p-4">
                <div className="font-semibold text-blue-400 mb-2">11:00-12:00</div>
                <div className="font-medium">EEG Data Collection</div>
                <div className="text-sm text-slate-400">Resting state recording: eyes open/closed</div>
              </Card>
              <Card className="p-4">
                <div className="font-semibold text-blue-400 mb-2">12:00-13:00</div>
                <div className="font-medium">EEG Pre-processing</div>
                <div className="text-sm text-slate-400">Signal cleaning, artifact removal using MNE-Python</div>
              </Card>
              <Card className="p-4 md:col-span-2">
                <div className="font-semibold text-blue-400 mb-2">14:00-17:15</div>
                <div className="font-medium">Introduction to ML and DL for EEG</div>
                <div className="text-sm text-slate-400">Feature extraction (PSD, PLI), Models (SVM, CNN, LSTM), Jupyter pipeline demo</div>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">Day 2: Imagery & Clinical EEG Studies (Aug 8)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="font-semibold text-green-400 mb-2">9:00-11:00</div>
                <div className="font-medium">Motor Imagery Theory and Lab</div>
                <div className="text-sm text-slate-400">L/R hand imagination tasks, offline classification</div>
              </Card>
              <Card className="p-4">
                <div className="font-semibold text-green-400 mb-2">11:00-13:00</div>
                <div className="font-medium">Visual Imagery Theory and Lab</div>
                <div className="text-sm text-slate-400">EEG patterns of imagined objects/scenes</div>
              </Card>
              <Card className="p-4">
                <div className="font-semibold text-green-400 mb-2">14:00-15:30</div>
                <div className="font-medium">Epilepsy and Seizure Detection</div>
                <div className="text-sm text-slate-400">BONN EEG Dataset, spike detection, seizure annotation</div>
              </Card>
              <Card className="p-4">
                <div className="font-semibold text-green-400 mb-2">15:30-17:15</div>
                <div className="font-medium">Lab: Seizure Classification</div>
                <div className="text-sm text-slate-400">Random Forest vs CNN architectures</div>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-orange-400">Day 3: Neurodegenerative Disorders (Aug 9)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="font-semibold text-orange-400 mb-2">9:00-11:00</div>
                <div className="font-medium">Parkinson's Disease Detection</div>
                <div className="text-sm text-slate-400">EEG markers extraction, ML classifier evaluation</div>
              </Card>
              <Card className="p-4">
                <div className="font-semibold text-orange-400 mb-2">11:00-13:00</div>
                <div className="font-medium">Alzheimer's Disease Detection</div>
                <div className="text-sm text-slate-400">EEG markers extraction, ML classifier evaluation</div>
              </Card>
              <Card className="p-4">
                <div className="font-semibold text-orange-400 mb-2">14:00-17:15</div>
                <div className="font-medium">Faculty & Neurotechnology Expert Talks</div>
                <div className="text-sm text-slate-400">Industry insights and research trends</div>
              </Card>
              <Card className="p-4">
                <div className="font-semibold text-orange-400 mb-2">17:15-17:30</div>
                <div className="font-medium">Closing Ceremony</div>
                <div className="text-sm text-slate-400">Certificate distribution</div>
              </Card>
            </div>
          </div>

        </div>
      </section>

      {/* REGISTRATION */}
      <section id="registration" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-10">Registration Details</h2>

        <div className="max-w-4xl mx-auto space-y-8">

          {/* Fee Structure */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">Fee Structure (GST not included)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">₹3,000</div>
                <div className="text-sm text-slate-400">UG Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">₹3,500</div>
                <div className="text-sm text-slate-400">PG/PhD Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">₹4,000</div>
                <div className="text-sm text-slate-400">Professionals</div>
              </div>
            </div>
          </Card>

          {/* Registration Process */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-purple-400">Registration Process</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-lg">Submit Statement of Purpose (SOP)</h4>
                  <p className="text-slate-400">Submit your SOP detailing interest in the workshop by July 15, 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-lg">Selection Results</h4>
                  <p className="text-slate-400">Only 50 participants will be selected. Results by July 18, 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-lg">Payment</h4>
                  <p className="text-slate-400">Selected participants pay registration fee by July 30, 2026</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Requirements */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-orange-400">Eligibility & Requirements</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                Open to undergraduate and postgraduate students, researchers, and professionals
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                Basic familiarity with Python is helpful
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                Participants should bring their own laptop
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                Accommodation is not provided
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                Snacks will be provided twice a day
              </li>
            </ul>
          </Card>

        </div>

        {/* Action Buttons */}
        <div className="mt-12 text-center">
          <Badge className="mb-6 bg-purple-600 text-white px-6 py-2">Selection-based Admission</Badge>

          <p className="mt-6 text-slate-300 max-w-2xl mx-auto mb-8">
            Join us for this intensive 3-day workshop and gain hands-on experience in EEG signal processing
            and AI applications for brain-computer interfaces and neurological research.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://forms.gle/VFxSeP6cJUQAkz2AA">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-6 text-lg font-bold">
                Submit SOP Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/workshop brochures/EEG workshop July 2026 v1.pdf" download>
              <Button variant="outline" className="px-8 py-6 text-lg border-blue-400 text-blue-400 hover:bg-blue-400/10">
                Download Brochure
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/workshops">
              <Button variant="outline" className="px-8 py-6 text-lg">
                View All Workshops
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-slate-400">
            <p>For inquiries:</p>
            <div className="flex justify-center gap-6 mt-2">
              <span className="text-blue-400">contactus@neurogati.com</span>
              <span className="text-blue-400">workshops@neurogati.com</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}