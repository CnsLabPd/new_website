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
  Zap,
  Cpu,
  Activity,
  Clock,
  GraduationCap, // Added GraduationCap import
} from "lucide-react"

export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Nav */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold">NEUROGATI</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <a href="#overview" className="text-sm text-muted-foreground transition-colors hover:text-accent">
              Highlights
            </a>
            <a href="#schedule" className="text-sm text-muted-foreground transition-colors hover:text-accent">
              Schedule
            </a>
            <a href="#apply" className="text-sm text-muted-foreground transition-colors hover:text-accent">
              Apply
            </a>
            <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-accent">
              Contact
            </a>
          </nav>
          <Button asChild>
            <a href="#apply">Apply Now</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-br from-background via-accent/5 to-primary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4" variant="secondary">
              <Calendar className="mr-1 h-3 w-3" />
              February 20 - 22, 2026 | Online
            </Badge>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
              Workshop on AI Applications in EEG
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Explore how EEG signals are collected, processed, and analyzed using AI and machine learning. Build real-world models for brain-computer interfaces, neurological diagnosis, and cognitive monitoring.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#apply">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#schedule">View Schedule</a>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">EEG Collection & Preprocessing</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">ML/DL Models with MNE-Python</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">Hands-on Lab Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Highlights */}
      <section id="overview" className="border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Workshop Highlights</h2>
            <p className="mb-12 text-balance text-center text-lg text-muted-foreground">
              Participants will gain practical hands-on experience in EEG processing, signal analysis, and AI model development through live demonstrations and lab sessions.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border transition-all hover:border-accent/50 hover:shadow-lg">
                <CardContent className="pt-6">
                  <Activity className="mb-4 h-10 w-10 text-accent" />
                  <h3 className="mb-2 text-xl font-semibold">EEG Data Collection & Preprocessing</h3>
                  <p className="text-sm text-muted-foreground">
                    Observe live EEG setup, learn signal cleaning with filters and ICA, and master artifact removal using MNE-Python.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border transition-all hover:border-accent/50 hover:shadow-lg">
                <CardContent className="pt-6">
                  <Cpu className="mb-4 h-10 w-10 text-accent" />
                  <h3 className="mb-2 text-xl font-semibold">ML/DL Models for EEG</h3>
                  <p className="text-sm text-muted-foreground">
                    Build classifiers using SVM, CNN, and LSTM for motor/visual imagery, seizure detection, and neurodegeneration analysis.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border transition-all hover:border-accent/50 hover:shadow-lg">
                <CardContent className="pt-6">
                  <Code className="mb-4 h-10 w-10 text-accent" />
                  <h3 className="mb-2 text-xl font-semibold">Live Software Sessions</h3>
                  <p className="text-sm text-muted-foreground">
                    Hands-on experience with MNE-Python for signal processing, frequency analysis, and end-to-end classification pipelines.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border transition-all hover:border-accent/50 hover:shadow-lg">
                <CardContent className="pt-6">
                  <Users className="mb-4 h-10 w-10 text-accent" />
                  <h3 className="mb-2 text-xl font-semibold">Expert Talks & Mentorship</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn from leading researchers and neurotechnology experts about cutting-edge BCI applications and industry trends.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Workshop Schedule</h2>
            <p className="mb-12 text-balance text-center text-lg text-muted-foreground">
              3 days of intensive hands-on learning from foundational concepts to advanced applications
            </p>
            <div className="grid gap-6">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        Day 1 - Feb 20, 2026
                      </Badge>
                      <h3 className="text-xl font-semibold">Foundations & EEG + AI Basics</h3>
                    </div>
                  </div>
                  <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong>9:00-10:00:</strong> Inaugural Talk by Prof. Srinivasa Chakravarthy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong>10:00-12:00:</strong> Introduction to EEG & System Setup (overview, 10-20 montage, impedance check)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong>13:00-14:00:</strong> EEG Pre-processing (filters, ICA, artifact removal)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong>14:00-17:15:</strong> ML/DL for EEG (PSD, PLI, SVM, CNN, LSTM models)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        Day 2 - Feb 21, 2026
                      </Badge>
                      <h3 className="text-xl font-semibold">Imagery & Clinical EEG Studies</h3>
                    </div>
                  </div>
                  <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong>9:00-11:00:</strong> Motor Imagery Theory & Lab (L/R hand imagination, offline classification)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong>14:00-15:30:</strong> Epilepsy & Seizure Detection (BONN dataset, spike detection)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong>15:30-17:15:</strong> Lab: Seizure Classification (Random Forest vs CNN)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        Day 3 - Feb 22, 2026
                      </Badge>
                      <h3 className="text-xl font-semibold">Neurodegenerative Disorder Detection</h3>
                    </div>
                  </div>
                  <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong>9:00-11:00:</strong> Parkinson's Detection (EEG markers, ML classifier)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong>11:00-13:00:</strong> Visual Imagery & Alzheimer's Detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong>13:00-14:00:</strong> Lunch Break</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong>14:00-17:15:</strong> Expert Talks & Closing Ceremony</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Requirements */}
      <section id="requirements" className="border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Eligibility & Requirements</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">Who Can Apply?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-muted-foreground">Undergraduate & postgraduate students</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-muted-foreground">Researchers and professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-muted-foreground">Basic Python familiarity helpful</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-muted-foreground">Bring your own laptop</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">What You'll Receive</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-muted-foreground">Certificate of Participation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-muted-foreground">Participant e-Handbook</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-muted-foreground">SOP submission link provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-muted-foreground">Hands-on lab codes & materials</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Info */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Registration Fees</h2>
              <div className="space-y-4">
                <Card className="border-accent/30 bg-accent/5">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">UG Students</h3>
                      <span className="text-lg font-bold text-accent">₹3,000</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-accent/30 bg-accent/5">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">PG/PhD Students</h3>
                      <span className="text-lg font-bold text-accent">₹3,500</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-accent/30 bg-accent/5">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">Professionals</h3>
                      <span className="text-lg font-bold text-accent">₹4,000</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold">Application Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">SOP Submission</h3>
                    <p className="text-sm text-muted-foreground">By January 29, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Selection Results</h3>
                    <p className="text-sm text-muted-foreground">By January 30, 2026 (Limited to 50 participants)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Registration Payment</h3>
                    <p className="text-sm text-muted-foreground">By February 6, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Workshop Begins</h3>
                    <p className="text-sm text-muted-foreground">February 20, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section id="apply" className="border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">How to Apply</h2>
            <Card className="border-border">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex gap-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-background font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Stage 1: Submit Statement of Purpose</h3>
                      <p className="text-muted-foreground">
                        Write a brief SOP detailing your interest in the workshop, your background in neuroscience/AI, and what you hope to learn. Only 50 participants will be selected based on SOPs.
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="flex gap-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-background font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Stage 2: Receive Confirmation & Pay</h3>
                      <p className="text-muted-foreground">
                        Selected participants will receive a confirmation email with a payment link. Complete registration payment to secure your spot in the workshop.
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="flex gap-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-background font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Attend & Learn</h3>
                      <p className="text-muted-foreground">
                        Join the 3-day workshop on February 20-22, 2026. Participate in live sessions, hands-on labs, and expert talks. Receive your certificate upon completion.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get in Touch</h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Have questions about the workshop? Reach out to us directly.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border">
                <CardContent className="p-6">
                  <Mail className="mb-4 h-8 w-8 text-accent" />
                  <h3 className="mb-2 text-lg font-semibold">General Inquiries</h3>
                  <a href="mailto:contactus@neurogati.com" className="text-accent hover:underline">
                    contactus@neurogati.com
                  </a>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6">
                  <Mail className="mb-4 h-8 w-8 text-accent" />
                  <h3 className="mb-2 text-lg font-semibold">Workshop Inquiries</h3>
                  <a href="mailto:workshops@neurogati.com" className="text-accent hover:underline">
                    workshops@neurogati.com
                  </a>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Located at</h3>
              <p className="text-muted-foreground">
                Laboratory for Computational Neuroscience, Parkinson's Therapeutics Lab<br />
                Department of Biotechnology, IIT Madras<br />
                Chennai 600036, India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Master EEG & AI?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join us for 3 intensive days of hands-on learning. Workshop begins <strong>February 20, 2026</strong>
            </p>
            <Button size="lg" className="mb-8" asChild>
              <a href="mailto:workshops@neurogati.com">
                Register Your Interest <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">
              Limited to 50 selected participants. SOP deadline: January 29, 2026
            </p>
            <div className="mt-12 rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Questions?</h3>
              <a
                href="mailto:workshops@neurogati.com"
                className="inline-flex items-center gap-2 text-accent transition-colors hover:underline"
              >
                <Mail className="h-4 w-4" />
                workshops@neurogati.com
              </a>
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
