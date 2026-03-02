"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Activity, Target, Brain, LayoutGrid, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// --- ADHD GAMES DATA ---
const adhdGames = [
  {
    id: "posabets",
    name: "Posabets",
    tagline: "Cognitive Focus & Alphabet Challenge",
    overview: "Posabets supports movement-based learning and can be a valuable tool for educators and parents working with children with ADHD.",
    tech: "Dynamic Difficulty Adjustment (DDA)",
    videoUrl: null,
    images: ["/posabets game card.png"],
    features: [
      "Adaptive speed based on focus levels",
      "Minimalist UI to reduce sensory overload",
      "Immediate feedback loops for positive reinforcement"
    ],
    applications: [
      "Improvement of sustained attention span",
      "Enhancement of working memory",
      "Executive function skill building"
    ],
    action: { label: "Play Here", href: "/gaming/play/posabets" }
  }
];

export default function ADHDPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
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

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#1c82c2 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl text-left">
            <Badge className="mb-6 bg-cyan-500/10 text-cyan-500 border-cyan-500/20 font-black uppercase tracking-widest px-4 py-1">
              Neurodiversity Module
            </Badge>
            <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8">
              ADHD & <br /> Cognitive Focus
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              We build immersive environments to improve attention, focus, and executive function. 
              By gamifying clinical cognitive protocols, we turn training into a flow state.
            </p>
          </div>
        </div>
      </section>

      {/* --- GAMES LIST --- */}
      <div className="container mx-auto px-6 py-20">
        <div className="space-y-40">
          {adhdGames.map((game) => (
            <div key={game.name} className="grid lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5 space-y-8">
                <div className="relative aspect-[3/2] rounded-3xl overflow-hidden border border-border shadow-2xl bg-black">
                  {game.images && game.images.length > 0 ? (
                    <Image
                      src={game.images[0]}
                      alt={`${game.name} game card`}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-900 w-full h-full">
                      <Zap className="h-16 w-16 text-cyan-500 mb-4 animate-pulse" />
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Visual Focus Optimized</span>
                    </div>
                  )}
                </div>

                {game.tech && (
                  <div className="p-8 rounded-3xl bg-cyan-500/[0.03] border border-cyan-500/10 backdrop-blur-sm">
                    <h4 className="text-cyan-500 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                      <Brain className="h-4 w-4" /> Focus Tech Highlight
                    </h4>
                    <p className="text-[17px] font-black text-foreground mb-2">{game.tech}</p>
                  </div>
                )}

                <Button asChild size="lg" className="w-full h-14 bg-[#1c82c2] hover:bg-blue-700 text-white text-lg font-black rounded-full transition-all">
                  <Link href={game.action.href}>
                    {game.action.label} <ExternalLink className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="lg:col-span-7 space-y-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">{game.name}</h2>
                  <p className="text-[19px] text-foreground/80 leading-relaxed font-medium">{game.overview}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-cyan-500 mb-6">
                      <Target className="h-4 w-4" /> Cognitive Targets
                    </h4>
                    <ul className="space-y-4">
                      {game.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                          <span className="text-[17px] font-medium text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-cyan-500 mb-6">
                      <Activity className="h-4 w-4" /> Rehab Focus
                    </h4>
                    <ul className="space-y-4">
                      {game.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                          <span className="text-[17px] font-medium text-muted-foreground">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* FOOTER SAME AS BLIND GAMES */}
      <footer className="bg-black/40 border-t border-white/5 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-xl font-black text-white tracking-tight">NEUROGATI</h3>
          <div className="text-sm text-slate-500 font-bold flex flex-col md:flex-row items-center gap-6 md:gap-6">
            <p>Indian Institute of Technology, Madras | Chennai 600036</p>
            <a href="mailto:gaming@neurogati.com" className="text-slate-500 hover:text-white transition-colors">gaming@neurogati.com</a>
          </div>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">© 2026 NEUROGATI. All rights reserved.</p>
        </div>
      </footer> 
    </div>
  )
}