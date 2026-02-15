"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Target, Cpu, LayoutGrid } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// --- PRODUCT DATA ---
const rehabProducts = [
  {
    name: "cRGS™ Gaming Platform",
    tagline: "Personalized neuro-rehabilitation",
    overview: "A clinically-validated rehabilitation platform that gamifies therapy and progress tracking. Using AI-driven feedback, cRGS™ provides targeted exercises that adapt to each patient's unique recovery curve, maximizing motor function improvement and cognitive engagement.",
    tech: "cRGS™ : Completed clinical trials at Sree Chitra Tirunal Institute (SCTIMST) and NIMHANS",
    images: ["/images/crgs.png"],
    features: [
      "Adaptive exercise programs that scale with patient progress",
      "Real-time postural and movement tracking via computer vision",
      "Remote monitoring portal for clinicians and therapists",
      "Gamified modules designed for high patient compliance"
    ],
    applications: [
      "Post-stroke upper extremity motor recovery",
      "Cognitive rehabilitation and neuroplasticity training",
      "Balance, coordination, and proprioception therapy",
      "In-clinic and remote home-rehabilitation programs"
    ],
  },
];

export default function StrokeRehabPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
      
      {/* --- REFINED HEADER SECTION --- */}
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
      <section className="relative pt-32 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#1c82c2 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl text-left">
            <Badge className="mb-6 bg-blue-500/10 text-blue-500 border-blue-500/20 font-black uppercase tracking-widest px-4 py-1">
              Therapeutic Gaming
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Stroke <br /> Rehabilitation
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              Transforming the recovery journey through gaming-driven engagement. Our platforms turn clinical protocols into interactive experiences that patients actually look forward to. Powered by AI, our platform adapts and sculpts itself to the user and generates useful insights about the user's performance.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT DETAILS SECTION */}
      <div className="container mx-auto px-6 py-20">
        <div className="space-y-40">
          {rehabProducts.map((product) => (
            <div key={product.name} className="grid lg:grid-cols-12 gap-16 items-start">
              
              <div className="lg:col-span-5 space-y-8">
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl bg-black">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                </div>

                <div className="p-8 rounded-3xl bg-blue-500/[0.03] border border-blue-500/10 backdrop-blur-sm">
                  <h4 className="text-blue-500 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                    <Cpu className="h-4 w-4" /> Technology Highlight
                  </h4>
                  <p className="text-[17px] font-black text-foreground mb-2">{product.tech}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                    Validated in partnership with leading neurological institutions for clinical efficacy.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">{product.name}</h2>
                  <p className="text-[19px] text-foreground/80 leading-relaxed font-medium">
                    {product.overview}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-500 mb-6">
                      <Target className="h-4 w-4" /> Core Features
                    </h4>
                    <ul className="space-y-4">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="h-2 w-2 rounded-full bg-blue-700 mt-2 flex-shrink-0" />
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
                      {product.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="h-2 w-2 rounded-full bg-blue-700 mt-2 flex-shrink-0" />
                          <span className="text-[17px] font-medium text-muted-foreground">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-border/50">
                   <Button size="lg" className="bg-[#104581] hover:bg-blue-900 text-white font-black rounded-full px-10 h-14 text-xl" asChild>
                     <Link href="/contact">
                       Request Product Demo <ArrowRight className="ml-2 h-6 w-6" />
                     </Link>
                   </Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 3. SHARED FOOTER */}
      <footer className="bg-black/40 border-t border-white/5 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-xl font-black text-white tracking-tight">NEUROGATI</h3>
          <div className="text-sm text-slate-500 font-bold flex flex-col md:flex-row items-center gap-6">
            <p>Indian Institute of Technology, Madras | Chennai 600036</p>
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
    </div>
  )
}