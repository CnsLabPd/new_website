"use client"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, ExternalLink, Accessibility, Eye, Hand, Headset, Cpu, FileText } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// --- PRODUCT DATA ---
const assistiveProducts = [
  {
    name: "SparshBharati™",
    tagline: "Bridging Braille to Indian Languages",
    overview: "A groundbreaking solution that brings Braille to Indian languages, enabling visually challenged individuals to read any Indian language written in the Bharati script. SparshBharati™ removes linguistic barriers to literacy by standardizing tactile reading across the subcontinent.",
    tech: "SparshBharati™ : A unified tactile system for 22+ languages",
    images: ["/images/sparsh_bharati.png"],
    articleUrl: "https://www.iitm.ac.in/happenings/press-releases-and-coverages/sparsh-bharati-new-guide-visually-impaired-persons-0",
    features: [
      "Unified Braille standard for all major Indian languages",
      "Seamless integration with existing digital and printed text",
      "Intuitive system design: learned in under 30 minutes",
      "Cost-effective deployment for inclusive education"
    ],
    applications: [
      "Inclusive education in vernacular-medium schools",
      "Public signage and accessibility compliance",
      "Literacy programs for the visually impaired",
      "Standardizing Braille production across India"
    ],
    color: "green",
  },
  {
    name: "MudhraBharati™",
    tagline: "Sign-to-Text via Computer Vision",
    overview: "Similar to ASL (American Sign Language), MudhraBharati™ is designed to help the hearing and speech impaired communicate effectively in any Indian language. By utilizing computer vision, it translates hand gestures into real-time text and speech.",
    tech: "Computer vision for high-accuracy gesture recognition",
    videoUrl: "/images/mudrabharati.mp4", 
    images: ["/images/mudrabharati.png"],
    features: [
      "Unified sign language optimized for Indian linguistic contexts",
      "Real-time fingerspelling-to-text conversion",
      "AI-driven gesture recognition via standard cameras",
      "Support for multiple regional dialects and scripts"
    ],
    applications: [
      "Two-way communication in public service settings",
      "Assistive classrooms for hearing-impaired students",
      "Integration into video conferencing platforms",
      "Support for non-verbal children with ASD"
    ],
    color: "emerald",
  },
  {
    name: "NodText™",
    tagline: "Head & Eye Movement Interface",
    overview: "An advanced accessibility interface designed for individuals with limited limb mobility. NodText™ allows users to control digital keyboards and mouse cursors through precise head movements and eye tracking.",
    tech: "High-accuracy, low-latency real-time tracking algorithms",
    videoUrl: "/images/nodtext_video.mp4", 
    images: ["/images/nodtext.png"],
    features: [
      "Contactless control using standard laptop webcams",
      "Highly customizable sensitivity and dwell-click settings",
      "Lightweight AI models that run on basic hardware",
      "User-friendly setup with rapid calibration"
    ],
    applications: [
      "Communication for patients with Cerebral Palsy",
      "Assistive technology for ALS and Quadriplegia",
      "Hands-free industrial and medical interfaces",
      "Accessibility for elderly users with reduced dexterity"
    ],
    color: "teal",
  }
];

export default function AssistiveTechPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        {/* Engineering Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl text-left">
            <Badge className="mb-6 bg-green-500/10 text-green-500 border-green-500/20 font-black uppercase tracking-widest px-4 py-1">
              Accessibility & Inclusion
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8">
              Assistive <br /> Technology
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              Developing the next generation of interfaces that foster independence. We bridge the gap between human intent and digital action for individuals with neurological and sensory impairments.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="space-y-40">
          {assistiveProducts.map((product) => (
            <div key={product.name} className="grid lg:grid-cols-12 gap-16 items-start">
              
              {/* LEFT COLUMN: Media & technical links */}
              <div className="lg:col-span-5 space-y-8">
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl bg-black">
                  {product.videoUrl ? (
                    <video src={product.videoUrl} controls className="w-full h-full object-contain" />
                  ) : (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  )}
                </div>

                <div className="p-8 rounded-3xl bg-green-500/[0.03] border border-green-500/10 backdrop-blur-sm">
                  <h4 className="text-green-500 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                    <Cpu className="h-4 w-4" /> Technical Blueprint
                  </h4>
                  <p className="text-[17px] font-black text-foreground mb-2">{product.tech}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Designed for low-resource environments, ensuring these tools run on standard devices without the need for expensive hardware.
                  </p>
                </div>

                {product.articleUrl && (
                  <Button asChild size="lg" variant="outline" className="w-full h-14 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-black rounded-full transition-all">
                    <Link href={product.articleUrl} target="_blank">
                      Read Research Article <FileText className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                )}
              </div>

              {/* RIGHT COLUMN: Content */}
              <div className="lg:col-span-7 space-y-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">{product.name}</h2>
                  <p className="text-[19px] text-foreground/80 leading-relaxed font-medium">
                    {product.overview}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  {/* Features */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-green-500 mb-6">
                      <Accessibility className="h-4 w-4" /> Core Features
                    </h4>
                    <ul className="space-y-4">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="text-[17px] font-medium text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-green-500 mb-6">
                      <Target className="h-4 w-4" /> Usage Contexts
                    </h4>
                    <ul className="space-y-4">
                      {product.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="text-[17px] font-medium text-muted-foreground">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-border/50">
                   <Button size="lg" className="bg-[#059669] hover:bg-emerald-700 text-white font-black rounded-full px-10 h-14" asChild>
                     <Link href="/contact">
                       Collaborate on Accessibility <ArrowRight className="ml-2 h-5 w-5" />
                     </Link>
                   </Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* FOOTER CTA */}
      <section className="container mx-auto px-6 mt-20">
        <div className="bg-card border border-border rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
            Empower Independence
          </h2>
          <p className="max-w-2xl mx-auto text-[19px] text-muted-foreground font-medium leading-relaxed mb-12">
            Our assistive tools are ready for integration into schools, hospitals, and homes. Let's build a more inclusive world together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-foreground text-background font-black rounded-full px-12 h-14">
              Get in Touch
            </Button>
            <Button variant="outline" size="lg" className="border-border font-black rounded-full px-12 h-14" asChild>
              <Link href="/team">Meet the Innovators</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

/* Reusable Target icon for Applications list */
function Target({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  )
}