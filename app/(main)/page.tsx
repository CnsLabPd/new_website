import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Mail, Gauge, Gamepad2, Brain, GraduationCap } from "lucide-react"
import { PartnerCardAnimated } from "@/components/ui/PartnerCardAnimated";
import { ThreeDTestimonialCarousel } from "@/components/ui/ThreeDTestimonialCarousel"; 
import { DynamicMagneticButton } from "@/utils/DynamicMagneticButton"; 
// IMPORT THE NEW COMPONENT
import WaveBackground from "@/components/ui/waveBackground";

const GRADIENT_BUTTON_CLASS = "bg-gradient-to-br from-teal-600 via-blue-400 to-cyan-600 px-10 text-lg font-semibold text-white py-2 rounded-full inline-flex items-center gap-2 whitespace-nowrap"

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-screen w-full flex items-center overflow-hidden">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {/* VIDEO BACKGROUND
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-50 dark:opacity-30"
            >
              <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </video>
          */}

          {/* WAVE BACKGROUND COMPONENT */}
          <WaveBackground
            lineColor="rgba(0, 138, 216, 0.3)" // Matches your #008AD8 brand blue
            backgroundColor="transparent"      // Let the page background show through
            waveCount={35}
            enableZoom={true}
            zoomSpeed={0.0015}
            zoomIntensity={0.2}
          />

          {/* Subtle overlay to ensure text remains legible */}
          <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] z-0" />
        </div>

        {/* Hero Content Container */}
        <div className="container mx-auto h-full flex items-center relative z-10 px-6 sm:px-12 md:px-24">
          <div className="text-left text-foreground pt-16 sm:pt-24 md:pt-32 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold mb-4 leading-tight tracking-wide animate-fade-in">
              Neurogati
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-popover-foreground mb-6 animate-fade-in-delay-1">
              Empowering Brains
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80 max-w-2xl text-secondary-foreground animate-fade-in-delay-2">
              An integrated deep-tech company that brings together the many dimensions of neurotechnology – Applications, Gaming and Neurotech Education.
            </p>
            <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3 animate-fade-in-delay-3">
              <DynamicMagneticButton>
                <Link 
                  href="/products" 
                  className={GRADIENT_BUTTON_CLASS}
                >
                  Explore Our Products 
                  <ArrowRight className="h-5 w-5 translate-y-px" />
                </Link>
              </DynamicMagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-24 md:space-y-32 py-24">
        
        {/* What is Neurogati? */}
        <section className="relative overflow-hidden border-y border-border bg-muted/30 py-24 px-4 sm:px-6 lg:px-8">
          {/* Technical dot grid */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#1c82c2 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Soft glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[42rem] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="container mx-auto relative z-10 text-center">
            <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-500 mb-6">
              What we do
            </span>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent py-1">
              What is Neurogati?
            </h2>

            <h3 className="max-w-3xl mx-auto text-xl md:text-2xl font-bold text-foreground mb-5 leading-snug">
              Applied Computational Neuroscience in Measurement, Modeling, and Intervention
            </h3>

            <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed">
              Neurogati develops neurotechnology tools and structured digital interventions guided
              by computational principles. Our programs span clinical measurement, mechanistic
              modeling, and therapeutic design.
            </p>

            {/* The Neurogati equation — each pillar equals what it delivers */}
            <div className="mt-14 max-w-3xl mx-auto divide-y divide-border overflow-hidden rounded-2xl border-2 border-border bg-card/60 backdrop-blur-sm text-left">
              {[
                {
                  icon: Gauge,
                  name: "Apps",
                  role: "Measurement",
                  desc: "Clinical-grade tools that quantify brain and behaviour.",
                  color: "cyan",
                },
                {
                  icon: Gamepad2,
                  name: "Games",
                  role: "Intervention",
                  desc: "Therapeutic exergames that turn training into play.",
                  color: "violet",
                },
                {
                  icon: Brain,
                  name: "Modelling",
                  role: "Backbone",
                  desc: "Computational models that underpin everything we build.",
                  color: "blue",
                },
                {
                  icon: GraduationCap,
                  name: "Courses + Workshops",
                  role: "Knowledge Dissemination",
                  desc: "Programs that share the science with the next generation.",
                  color: "amber",
                },
              ].map((p) => {
                const styles: Record<string, { bg: string; text: string }> = {
                  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500" },
                  violet: { bg: "bg-violet-500/10", text: "text-violet-500" },
                  blue: { bg: "bg-blue-500/10", text: "text-blue-500" },
                  amber: { bg: "bg-amber-500/10", text: "text-amber-500" },
                }
                const s = styles[p.color]
                const Icon = p.icon
                return (
                  <div
                    key={p.name}
                    className="group flex items-center gap-4 sm:gap-6 p-5 sm:p-6 transition-colors hover:bg-muted/40"
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl ${s.bg} ${s.text}`}>
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Equation: Name = Role */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2.5 sm:gap-4 flex-wrap">
                        <span className="text-lg sm:text-xl font-black tracking-tight text-foreground">
                          {p.name}
                        </span>
                        <span className={`text-2xl sm:text-3xl font-black leading-none ${s.text}`} aria-hidden="true">
                          =
                        </span>
                        <span className={`text-lg sm:text-xl font-bold ${s.text}`}>
                          {p.role}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-14">
              <DynamicMagneticButton>
                <Link href="/about" className={GRADIENT_BUTTON_CLASS}>
                  Discover Us
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </DynamicMagneticButton>
            </div>
          </div>
        </section>

        {/* Products Teaser */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-12">
            AI-Powered Neurotechnology Innovations
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center bg-card border-t-4 border-blue-500 pt-4 transition-all hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-400">Clinical Monitoring (Qumon-PD™)</CardTitle>
              </CardHeader>
              <CardContent className="text-justify px-8">
                Revolutionary <strong>AI-powered clinical monitoring platform</strong> for <strong>Parkinson's disease</strong>. Qumon-PD™ analyzes behavioral biomarkers using advanced machine learning, integrating seamlessly with clinical workflows to provide comprehensive diagnosis assisstive reports for healthcare providers.
              </CardContent>
            </Card>
            <Card className="text-center bg-card border-t-4 border-violet-500 pt-4 transition-all hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-violet-400">Smart Rehabilitation (cRGS™)</CardTitle>
              </CardHeader>
              <CardContent className="text-justify px-8">
                Personalized <strong>AI-driven rehabilitation gaming platform</strong> transforming <strong>stroke recovery</strong> and motor function therapy. Our cRGS™ adaptive technology creates engaging therapeutic games that adjust to individual patient needs, improving motivation and clinical outcomes through gamified neurorehabilitation.
              </CardContent>
            </Card>
            <Card className="text-center bg-card border-t-4 border-amber-500 pt-4 transition-all hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-amber-400">Neuro-Tech Education</CardTitle>
              </CardHeader>
              <CardContent className="text-justify px-8">
                Our focus spans across Educational Neurotechnology to equip professionals and students to apply insights from brain science, AI, and BCIs. We bridge the gap between cognitive research and practical application, driving better outcomes in both healthcare diagnostics and educational efficacy.              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <DynamicMagneticButton>
              <Link 
                href="/products"
                className="bg-[#104581] px-10 text-lg font-semibold text-white py-2 rounded-full inline-flex items-center gap-2 whitespace-nowrap"
              >
                All Products
              </Link>
            </DynamicMagneticButton>
          </div>
        </section>

        {/* Research Teaser
        <section className="bg-muted dark:bg-muted py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Pioneering Neuroscience Research & Clinical Validation</h2>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
              <div className="bg-blue-100 dark:bg-blue-950/30 p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  AI-Powered Gamified Rehabilitation for Stroke Recovery
                </h3>
                <p className="mt-2 text-black-800 dark:text-gray-200">Clinical validation of our <strong>rehabilitation platform</strong> for improving motor function recovery in <strong>stroke survivors</strong> through remote AI-guided therapy sessions and real-time progress monitoring.</p>
                <span className="mt-4 inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full">
                  Ongoing Clinical Trial
                </span>
              </div>
              <div className="bg-blue-100 dark:bg-blue-950/30 p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Machine Learning Gait Analysis for Parkinson's Detection</h3>
                <p className="mt-2 text-black-800 dark:text-gray-200">
                  Validating our <strong>AI-powered gait assessment algorithms</strong> against gold-standard clinical tests for early <strong>Parkinson's disease diagnosis</strong> using computer vision and machine learning biomarkers.
                </p>
                <span className="mt-4 inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full">
                  Peer Review Process
                </span>
              </div>
            </div>
            <div className="text-center mt-12">
              <DynamicMagneticButton>
                <Link 
                  href="/research"
                  className="bg-[#104581] px-10 text-lg font-semibold text-white py-2 rounded-full inline-flex items-center gap-2 whitespace-nowrap"
                >
                  Our Research
                </Link>
              </DynamicMagneticButton>
            </div>
          </div>
        </section> */}

        {/* Partners Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-12">Trusted Clinical Partners & Medical Institutions</h2>
          <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
            <PartnerCardAnimated delay={0}>
              <CardHeader>
                <CardTitle>Ramachandra Hospital, Chennai</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black-500">Clinical implementation of cRGS™ <strong>AI rehabilitation platform</strong> for <strong>upper extremity stroke recovery</strong>, comparing effectiveness with conventional physical therapy protocols in controlled clinical trials.</p>
              </CardContent>
            </PartnerCardAnimated>
            
            <PartnerCardAnimated delay={1}>
              <CardHeader>
                <CardTitle>SCTIMST & NIMHANS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black-500">Multi-institutional deployment of cRGS™ for <strong>stroke rehabilitation research</strong> with comprehensive outcome analysis. Clinical study completed with data under peer review for publication in neuroscience journals.</p>
              </CardContent>
            </PartnerCardAnimated>
            
            <PartnerCardAnimated delay={2}>
              <CardHeader>
                <CardTitle>JIPMER Pondicherry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black-200">Clinical validation of QuadisPD™ <strong>AI diagnostic platform</strong> for early <strong>Parkinson's disease detection</strong> in real-world clinical settings with neurologist evaluation protocols.</p>
              </CardContent>
            </PartnerCardAnimated>
            
            <PartnerCardAnimated delay={3}>
              <CardHeader>
                <CardTitle>The Clarke school for the Deaf</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black-500">Educational deployment of <strong>rehabilitative and excer-games</strong> for special children, demonstrating practical applications of AI in special education and accessibility.</p>
              </CardContent>
            </PartnerCardAnimated>
          </div>
        </section>

        {/* --- TESTIMONIALS (Left Intact) --- */}
        {/* <section className="bg-muted py-12 sm:py-24"> 
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
                Testimonial Highlight
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                What our customers are saying
              </p>
              <div className="mt-12 max-w-5xl mx-auto h-[800px]"> 
                  <div className="w-full h-full pt-20 pb-20">
                    <ThreeDTestimonialCarousel/> 
                  </div>
              </div>
            </div>
          </section> */}

        {/* Team & Careers Teaser */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-foreground mb-12">Meet Our Neurotechnology Leadership</h3>
              <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {/* Prof. Srinivasa Chakravarthy */}
                <div className="text-center border-2 border-[#008AD8] rounded-lg p-6 bg-card">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gray-800 rounded-full border-4 border-[#008AD8] flex items-center justify-center">
                    <img
                      src="/images/people/vsc.png?width=120&height=120"
                      alt="Prof. Srinivasa Chakravarthy - Neurotechnology Expert"
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-card-foreground mb-2">Prof. Srinivasa Chakravarthy</h4>
                  <p className="text-[#008AD8] mb-4">Co-founder & Chief Scientist</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    Distinguished <strong>computational neuroscientist</strong> at IIT Madras with 25+ years pioneering <strong>AI neurotechnology research</strong>. Leading expert in brain modeling, neural networks, and translational neuroscience applications.
                  </p>
                  <Button asChild variant="link" className="text-blue-900 hover:text-blue-800 px-0">
                    <Link href="/team">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Dr. Indira Chaturvedi */}
                <div className="text-center border-2 border-[#008AD8] rounded-lg p-6 bg-card">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gray-800 rounded-full border-4 border-[#008AD8] flex items-center justify-center">
                    <img
                      src="/images/people/indira.png?width=120&height=120"
                      alt="Dr. Indira Chaturvedi - Clinical Neurotechnology Leader"
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-card-foreground mb-2">Dr. Indira Chaturvedi</h4>
                  <p className="text-[#008AD8] mb-4">Co-founder & Chief Medical Officer</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    Board-certified physician with MD from Bronx-Lebanon Hospital. Expert in <strong>clinical neurotechnology implementation</strong> with 20+ years bridging advanced technology and patient-centered neurological care.
                  </p>
                  <Button asChild variant="link" className="text-blue-900 hover:text-blue-800 px-0">
                    <Link href="/team">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mt-12">
                <DynamicMagneticButton>
                  <Link 
                    href="/team"
                    className="bg-[#104581] px-10 text-lg font-semibold text-white py-2 rounded-full inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    Our Team
                  </Link>
                </DynamicMagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Teaser */}
        <section className="bg-muted py-24 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">Partner with Leading Neurotechnology Innovators</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Connect with our neurotechnology experts. Whether you're a clinician seeking AI diagnostic solutions, researcher exploring brain-computer interfaces, or healthcare partner interested in collaboration.
          </p>
          <Button asChild size="lg" className="mt-8 bg-[#104581] hover:bg-blue-900 text-white">
            <Link href="/contact">
              Start Neurotechnology Partnership <Mail className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
