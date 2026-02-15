"use client"

import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Plus } from "lucide-react" 
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Image from "next/image";

const gameVertical = {
  name: "Gaming & Rehabilitation",
  title: "Gaming & Rehabilitation",
  href: "/gamingcategories", 
  description: "AI-driven gaming solutions for rehabilitation, monitoring, and tracking. We turn clinical protocols into engaging, interactive experiences.",
  image: "/games-rehab-thumb-v2.png", 
  color: "violet",
};

export default function GamesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#1c82c2 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Excergames
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            Merging computational neuroscience with immersive gaming to accelerate motor recovery and cognitive engagement.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* SINGLE FEATURED CARD */}
        <div className="max-w-3xl mx-auto mb-20">
          <Link href={gameVertical.href} className="group">
            <Card className="overflow-hidden border-border/50 bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
              <div className="relative h-80 w-full overflow-hidden bg-muted">
                <Image 
                  src={gameVertical.image} 
                  alt={gameVertical.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-border group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                  <Plus className="h-6 w-6" />
                </div>
              </div>
              
              <CardHeader>
                <div className="h-1 w-12 mb-4 rounded-full bg-violet-500" />
                <CardTitle className="text-3xl font-black tracking-tight">{gameVertical.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground text-lg font-medium leading-relaxed mb-8">
                  {gameVertical.description}
                </p>
                <div className="flex items-center text-sm font-black uppercase tracking-widest text-violet-500 group-hover:gap-3 gap-2 transition-all">
                  Explore Gaming Hub <ArrowRight className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* CTA SECTION */}
        <div className="text-center bg-card border border-border rounded-3xl p-12 shadow-sm max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-foreground mb-6">Ready to Gamify Rehabilitation?</h2>
          <p className="max-w-2xl mx-auto text-[17px] text-muted-foreground mb-10 leading-relaxed font-medium">
            Discover how our clinical-grade gaming platforms can integrate into your rehabilitation protocol.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-full px-8">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border hover:bg-muted font-bold rounded-full px-8">
              <Link href="/research">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}