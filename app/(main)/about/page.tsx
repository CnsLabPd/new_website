"use client"

import AboutUsSection from "@/components/ui/about-us-section"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-border">
        {/* Subtle Background Pattern - Neuro-Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(#1c82c2 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
        
  
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(28,130,194,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
 
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Main Heading - Now Center Aligned */}
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1] mb-8 py-2 bg-gradient-to-b from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              About
            </h1>

            {/* Subtext */}
            <p className="max-w-2xl text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
              Transforming neurological healthcare through AI-driven innovation and computational neuroscience.
            </p>
          </div>
        </div>
      </section>  

      {/* --- CONTENT SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AboutUsSection />
        </div>
      </section>

    </div>
  )
}