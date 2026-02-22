"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Activity, Target, Headphones, LayoutGrid, Volume2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// --- BLIND GAMES DATA ---
const blindGames = [
  {
    id: "sonic-drive",
    name: "Sonic Drive",
    tagline: "Precision Audio-Spatial Racing",
    overview: "Sonic Drive is a groundbreaking experience designed specifically for the visually impaired. By utilizing binaural 3D audio cues, players navigate complex racing circuits at high speeds, transforming auditory feedback into a competitive racing simulation.",
    tech: "Binaural Audio Engine & Haptic Integration",
    videoUrl: null, 
    images: ["/images/sonic-drive-hero.png"],
    features: [
      "Advanced 3D Spatial Audio (Requires Headphones)",
      "Dynamic Haptic feedback for obstacle detection",
      "Adaptive speed scaling"
    ],
    applications: [
      "Development of auditory spatial mapping",
      "Enhancement of reactive listening skills",
      "Inclusive gaming"
    ],
    action: { label: "Play Here", href: "/gaming/play/sonic-drive" }
  },
  {
    id: "sonic-pop",
    name: "Sonic Pop",
    tagline: "Echo-Location Reaction Trainer",
    overview: "Test your auditory reflexes in this fast-paced spatial challenge. Sonic bubbles float around a virtual 3D space, emitting unique sound signatures. Use echo-location cues to track and 'pop' them before they drift away.",
    tech: "Dynamic Spatial Sound-Mapping",
    videoUrl: null,
    images: ["/images/sonic-pop-hero.png"],
    features: [
      "360-degree sound field tracking",
      "Progression system with increasing audio complexity",
      "Calibrated for high-precision auditory rehab"
    ],
    applications: [
      "Fine-tuning auditory localization",
      "Upper-extremity coordination (when paired with gesture)",
      "Cognitive processing speed training"
    ],
    action: { label: "Play Here", href: "/gaming/play/sonic-pop" }
  }
];

export default function BlindGamesPage() {
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

      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl text-left">
            <Badge className="mb-6 bg-blue-500/10 text-blue-500 border-blue-500/20 font-black uppercase tracking-widest px-4 py-1">
              Accessibility First
            </Badge>
            <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8">
              Visually Impaired<br />
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">We design accessible games for visually impaired users, powered by rich auditory feedback and spatial sound.
            By turning sound into guidance, challenge, and reward, we create immersive play beyond sight.</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="space-y-40">
          {blindGames.map((game) => (
            <div key={game.name} className="grid lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5 space-y-8">
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl bg-black flex items-center justify-center">
                   <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-900 w-full h-full">
                        <Volume2 className="h-16 w-16 text-blue-500 mb-4 animate-pulse" />
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Audio Optimized Experience</span>
                    </div>
                </div>

                {game.tech && (
                  <div className="p-8 rounded-3xl bg-blue-500/[0.03] border border-blue-500/10 backdrop-blur-sm">
                    <h4 className="text-blue-500 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                      <Headphones className="h-4 w-4" /> Sound Tech Highlight
                    </h4>
                    <p className="text-[17px] font-black text-foreground mb-2">{game.tech}</p>
                  </div>
                )}

                <Button asChild size="lg" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-full transition-all">
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
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-500 mb-6">
                      <Target className="h-4 w-4" /> Key Features
                    </h4>
                    <ul className="space-y-4">
                      {game.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          <span className="text-[17px] font-medium text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-500 mb-6">
                      <Activity className="h-4 w-4" /> Therapeutic Focus
                    </h4>
                    <ul className="space-y-4">
                      {game.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
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
    </div>
  )
}