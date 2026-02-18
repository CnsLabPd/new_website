"use client"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, ExternalLink, Activity, Target, Cpu,LayoutGrid } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// --- PRODUCT DATA ---
const rehabProducts = [
  {
    name: "Frosty Flicks",
    tagline: "Gesture-based Snowball Challenge",
    overview: "Step into a winter wonderland with Frosty Flicks, an exergaming experience designed for players of all abilities. Using standard laptop webcams, it translates physical movement into in-game action, encouraging mobility through immersive play.",
    tech: null, // No tech highlight for now
    videoUrl: "/frostyFlicks.mp4",
    images: ["/images/crgs.png"],
    features: [
      "Intuitive gesture-based controls (No specialized hardware)",
      "Reward systems and levels to incentivize training",
      "Immersive environments for sustained engagement"
    ],
    applications: [
      "Upper-extremity movement encouragement",
      "Hand-eye coordination training",
      "Engagement tool for pediatric and elderly rehab"
    ],
    color: "blue",
    action: { label: "Play Now!", href: "https://apps.microsoft.com/detail/9nzj8mbk1btt?hl=en-US&gl=IN" }
  },
    {
    name: "Dunk-it",
    tagline: "Gesture-based Basketball Challenge",
    overview: "Hit the court with Dunk-it!!, an immersive basketball exergaming experience that turns your physical rehabilitation into a high-energy competition. Using advanced motion tracking, the game translates your arm and upper-body movements into precise shots and slam dunks, making repetitive therapeutic exercises feel like a trip to the arena.",
    tech: null, // No tech highlight for now
    videoUrl: "/DunkIt.mp4",
    images: ["/images/crgs.png"],
    features: [
      "Real-time skeletal tracking via standard webcam (No wearables required)",
      "Adaptive difficulty scaling based on range of motion",
      "Dynamic scoring and visual feedback for motor precision"
    ],
    applications: [
      "Shoulder and elbow extension reinforcement",
      "Proprioception and spatial awareness development",
      "Bilateral coordination and reaching-task therapy"
    ],
    color: "Red",
    action: { label: "Play Now!", href: "https://apps.microsoft.com/detail/9n3201tlsnvf?hl=en-GB&gl=IN" }
  }
];

export default function RehabilitationPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          
          {/* Brand Identity Group */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/bg_just_logo.png" 
              alt="Neurogati Logo" 
              width={56} 
              height={56} 
              className="object-contain group-hover:scale-105 transition-transform" 
            />
            <span className="text-2xl font-black tracking-tighter text-[#1c82c2] dark:text-[#38bdf8]">
              NEUROGATI
            </span>
          </Link>

          {/* Navigation Items - Redirected to Category Hub */}
          <nav>
            <Link 
              href="/gamingcategories" 
              className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors group"
            >
              <LayoutGrid className="h-4 w-4 text-[#1c82c2] group-hover:scale-110 transition-transform" />
              All Gaming Categories
            </Link>
          </nav>
        </div>
      </header>

    
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#8b5cf6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl text-left">
            <Badge className="mb-6 bg-blue-500/10 text-blue-500 border-blue-500/20 font-black uppercase tracking-widest px-4 py-1">
              Therapeutic Gaming
            </Badge>
            <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8">
              General <br /> Exergames
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              Transforming the recovery journey through AI-driven engagement. Our platforms turn clinical protocols into interactive experiences that patients actually look forward to.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="space-y-40">
          {rehabProducts.map((product) => (
            <div key={product.name} className="grid lg:grid-cols-12 gap-16 items-start">
              
              {/* LEFT COLUMN: Media & Dynamic Action */}
              <div className="lg:col-span-5 space-y-8">
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl bg-black flex items-center justify-center">
                  {product.videoUrl ? (
                    <video src={product.videoUrl} controls className="w-full h-full object-contain" />
                  ) : (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  )}
                </div>

                {/* Conditional Technology Highlight */}
                {product.tech && (
                  <div className="p-8 rounded-3xl bg-blue-500/[0.03] border border-blue-500/10 backdrop-blur-sm">
                    <h4 className="text-blue-500 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                      <Cpu className="h-4 w-4" /> Technology Highlight
                    </h4>
                    <p className="text-[17px] font-black text-foreground mb-2">{product.tech}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Validated in partnership with leading neurological institutions for clinical efficacy.
                    </p>
                  </div>
                )}

                {/* Conditional Action Button (Microsoft Store, etc) */}
                {product.action && (
                  <Button asChild size="lg" variant="outline" className="w-full h-14 border-2 border-blue-500 text-blue-500 hover:bg-blue-700 hover:text-white text-lg font-black rounded-full transition-all">
                    <Link href={product.action.href} target="_blank">
                      {product.action.label} <ExternalLink className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                )}
              </div>

              {/* RIGHT COLUMN: Info */}
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
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-500 mb-6">
                      <Target className="h-4 w-4" /> Core Features
                    </h4>
                    <ul className="space-y-4">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="text-[17px] font-medium text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-500 mb-6">
                      <Activity className="h-4 w-4" /> Therapeutic Focus
                    </h4>
                    <ul className="space-y-4">
                      {product.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="text-[17px] font-medium text-muted-foreground">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-border/50">
                   <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-black rounded-full px-10 h-14 text-lg" asChild>
                     <Link href="/contact">
                       Partner with our Lab <ArrowRight className="ml-2 h-5 w-5" />
                     </Link>
                   </Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

            <footer className="bg-black/40 border-t border-white/5 py-12">
  <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
    
    <h3 className="text-xl font-black text-white tracking-tight">NEUROGATI</h3>

    <div className="text-sm text-slate-500 font-bold flex flex-col md:flex-row items-center gap-6 md:gap-6">
      <p>Indian Institute of Technology, Madras | Chennai 600036</p>
      
      {/* Clickable Email with Slate Grey color */}
      <a 
        href="mailto:gaming@neurogati.com" 
        className="text-slate-500 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
      >
        gaming@neurogati.com
      </a>
    </div>

    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
      © 2026 NEUROGATI. All rights reserved.
    </p>
    
  </div>
</footer>   

      {/* FOOTER CTA */}
      {/* <section className="container mx-auto px-6 mt-20">
        <div className="bg-card border border-border rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-violet-500/5 blur-[100px] rounded-full" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
            Reimagine Recovery
          </h2>
          <p className="max-w-2xl mx-auto text-[19px] text-muted-foreground font-medium leading-relaxed mb-12">
            Explore how gamification and AI can enhance clinical outcomes and patient retention in your rehabilitation program.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-foreground text-background font-black rounded-full px-12 h-14">
              Speak with a Specialist
            </Button>
            <Button variant="outline" size="lg" className="border-border font-black rounded-full px-12 h-14" asChild>
              <Link href="/research">Read Clinical Trials</Link>
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  )
}