import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Mail } from "lucide-react"
import { GalaxyHeroSection } from "@/components/ui/galaxy-interactive-hero-section"
import {WavyBackground} from "@/components/ui/wavy-background";
import {GradientButton} from "@/components/ui/gradient-button";
import {TestimonialsCarousel} from "@/components/ui/testimonials-carousel";
import {MagneticButton} from "@/components/ui/magnetic-button";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      {/*<GalaxyHeroSection*/}
      {/*  title="Neurogati"*/}
      {/*  tagline="Empowering Brains"*/}
      {/*  description="Revolutionizing neurological care through AI, BCI, and computational neuroscience."*/}
      {/*  primaryButtonText="Explore Our Products"*/}
      {/*  primaryButtonHref="/products"*/}
      {/*  secondaryButtonText="Watch Demo"*/}
      {/*  secondaryButtonHref="#demo"*/}
      {/*/>*/}
      <div className="relative min-h-screen">
        <WavyBackground
            colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]}
            waveWidth={80}
            blur={5}
            speed="fast"
            waveOpacity={0.4}
            // backgroundFill="rgb(15, 23, 42)"
            containerClassName="h-screen relative"
            className="w-full h-full flex items-center"
        >
          <div className="container mx-auto h-full flex items-center relative z-10">
            {/*<HeroContent*/}
            {/*  title={title}*/}
            {/*  tagline={tagline}*/}
            {/*  description={description}*/}
            {/*  primaryButtonText={primaryButtonText}*/}
            {/*  primaryButtonHref={primaryButtonHref}*/}
            {/*  secondaryButtonText={secondaryButtonText}*/}
            {/*  secondaryButtonHref={secondaryButtonHref}*/}
            {/*/>*/}
            <div className="text-left text-foreground pt-16 sm:pt-24 md:pt-32 px-6 sm:px-12 md:px-24 max-w-4xl">
              <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold mb-4 leading-tight tracking-wide animate-fade-in">
                Neurogati
              </h1>
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-popover-foreground mb-6 animate-fade-in-delay-1">
                Empowering Brains
              </p>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80 max-w-2xl text-secondary-foreground animate-fade-in-delay-2">
                Revolutionizing neurological care through AI, BCI, and computational neuroscience.
              </p>
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3 animate-fade-in-delay-3">
                <MagneticButton>
                  <button className="bg-gradient-to-br from-blue-800 via-violet-900 to-amber-400 px-10 text-lg text-white py-4 rounded-full">
                    <a href="/products">Explore Our Products</a>
                  </button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </WavyBackground>
      </div>

      <div className="space-y-24 md:space-y-32 py-24">
        {/* What is Neurogati? */}
        <section className="bg-muted mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What is Neurogati?</h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Neurogati is a deep-tech neurotechnology company pioneering smarter brain care. From diagnostic platforms to
            brain-computer interfaces and adaptive rehabilitation games, we turn computational neuroscience into
            clinically actionable tools.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-8 border-blue-400 text-blue-400 hover:bg-blue-900/20 hover:text-blue-600 hover:dark:text-blue-300 bg-transparent"
          >
            <Link href="/about">Learn About Us</Link>
          </Button>
        </section>

        {/* Products Teaser */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-12">
            Our Innovations
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center bg-card border-t-4 border-blue-500 pt-4 transition-all hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-400">Diagnostics (Quadis-PD™)</CardTitle>
              </CardHeader>
              <CardContent className="text-justify px-8">
                Our flagship diagnostic platform that uses advanced AI to analyze behavioral data and provide early detection of disorders like PD, AD, and more. Quadis-PD™ integrates with existing clinical workflows and provides comprehensive reports for healthcare providers.
              </CardContent>
            </Card>
            <Card className="text-center bg-card border-t-4 border-violet-500 pt-4 transition-all hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-violet-400">Gaming & Rehab (cRGS™)</CardTitle>
              </CardHeader>
              <CardContent className="text-justify px-8">
                Personalized AI-driven gaming solutions for rehabilitation that adapt to each patient's unique needs. Our cRGS™ platform transforms therapy into engaging games for better motivation and improved outcomes.
              </CardContent>
            </Card>
            <Card className="text-center bg-card border-t-4 border-amber-500 pt-4 transition-all hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-amber-400">BCI Tech (NeuroScope™)</CardTitle>
              </CardHeader>
              <CardContent className="text-justify px-8">
                State-of-the-art brain-computer interface technology achieving 95% decoding accuracy, enabling direct neural control of external devices and applications.
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link" className="text-blue-400 hover:text-blue-300 text-lg">
              <Link href="/products">
                See All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Research Teaser */}
        <section className="bg-muted dark:bg-muted py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Pioneering Research</h2>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Telerehabilitation for Stroke Recovery
                </h3>
                <p className="mt-2 text-gray-400">Evaluating the effectiveness of our telerehabilitation platform for improving motor function in stroke survivors.</p>
                <span className="mt-4 inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full">
                  Ongoing
                </span>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">AI-Driven Gait Assessment</h3>
                <p className="mt-2 text-gray-400">
                  Validating our AI-powered gait assessment tools against gold-standard gait tests for PD diagnosis.
                </p>
                <span className="mt-4 inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full">
                  Ongoing
                </span>
              </div>
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="link" className="text-blue-400 hover:text-blue-300 text-lg">
                <Link href="/research">
                  Explore Our Research <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-12">Our Partners</h2>
          <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle>Ramachandra Hospital, Chennai, India</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Implementation of cRGS™ for upper extremity stroke rehabilitation to compare effectiveness with conventional rehabilitation.</p>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle>SCTIMST and NIMHANS, India</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Implementation of cRGS™ for upper extremity stroke rehabilitation to compare effectiveness with conventional rehabilitation. This study has been recently completed and the data collected is currently under analysis.</p>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle>JIPMER, Pondicherry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">QuadisPD™ deployment for Parkinson's diagnosis evaluation.</p>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle>Sweekar School for the Deaf, Secunderabad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Conducted sessions on how to use MudhraBharati™ in a school for the hearing impaired.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        {/*<section className="bg-muted mx-auto px-4 sm:px-6 lg:px-8">*/}
        {/*  <div className="flex w-full min-h-screen justify-center items-center p-4">*/}
        <TestimonialsCarousel />
        {/*  </div>*/}
        {/*</section>*/}

        {/* Team & Careers Teaser */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-foreground mb-12">Meet Our Founders</h3>
              <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {/* Prof. Srinivasa Chakravarthy */}
                <div className="text-center border-2 border-blue-500 rounded-lg p-6 bg-card">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gray-800 rounded-full border-4 border-blue-500 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?width=120&height=120"
                      alt="Prof. Srinivasa Chakravarthy"
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-card-foreground mb-2">Prof. Srinivasa Chakravarthy</h4>
                  <p className="text-blue-400 mb-4">Co-founder & Chief Scientist</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    Distinguished neuroscientist at IIT Madras with 25+ years of research experience. Head of the
                    Computational Neuroscience Lab...
                  </p>
                  <Button asChild variant="link" className="text-blue-400 hover:text-blue-300 px-0">
                    <Link href="/team">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Dr. Indira Chaturvedi */}
                <div className="text-center border-2 border-violet-500 rounded-lg p-6 bg-card">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gray-800 rounded-full border-4 border-violet-500 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?width=120&height=120"
                      alt="Dr. Indira Chaturvedi"
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-card-foreground mb-2">Dr. Indira Chaturvedi</h4>
                  <p className="text-violet-400 mb-4">Co-founder & Chief Medical Officer</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    Seasoned pediatrician with MD from Bronx-Lebanon Hospital. Brings 20+ years of clinical expertise to
                    bridge technology and patient care...
                  </p>
                  <Button asChild variant="link" className="text-violet-400 hover:text-violet-300 px-0">
                    <Link href="/team">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mt-12">
                <Button asChild variant="link" className="text-blue-400 hover:text-blue-300 text-lg">
                  <Link href="/team">
                    Meet the Full Team <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Teaser */}
        <section className="bg-muted py-24 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">Ready to Collaborate?</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Whether you're a clinician, researcher, or potential partner, we'd love to hear from you.
          </p>
          <Button asChild size="lg" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/contact">
              Contact Us <Mail className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
