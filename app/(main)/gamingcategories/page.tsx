"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus, Brain, Dumbbell, Zap } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    title: "Stroke Rehabilitation",
    href: "/gaming/stroke",
    description: "AI-driven motor recovery and neuroplasticity training for post-stroke survivors.",
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    color: "blue",
    tagline: "Motor Recovery"
  },
  {
    title: "ADHD & Neurodiversity",
    href: "/gaming/adhd",
    description: "Gamified cognitive training designed to improve attention, focus, and executive function.",
    icon: <Brain className="h-8 w-8 text-blue-500" />,
    color: "blue",
    tagline: "Cognitive Focus"
  },
  {
    title: "General Exergames",
    href: "/gaming/general",
    description: "Versatile gesture-based games for elderly care, balance training, and general fitness.",
    icon: <Dumbbell className="h-8 w-8 text-blue-500" />,
    color: "blue",
    tagline: "Active Living"
  },
    {
    title: "Visually Impaired",
    href: "/gaming/blindgames",
    description: "Versatile games for the visually impaired.",
    icon: <Dumbbell className="h-8 w-8 text-blue-500" />,
    color: "blue",
    tagline: "Inclusive Gaming"
  },
]

export default function RehabCategoryHub() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#8b5cf6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="mb-6 bg-blue-500/10 text-blue-500 border-blue-500/20 font-black uppercase tracking-widest px-4 py-1">
            Verticals
          </Badge>
          <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Exergames <br /> 
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            Our VR exergames combine real-world movement with virtual challenges to drive recovery through play.
Designed for impact, they boost engagement, improve outcomes, and redefine how people experience rehabilitation.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto mb-20">
          {categories.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group">
              <Card className="overflow-hidden border-border/50 bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col p-8">
                <div className="flex justify-between items-start mb-12">
                  <div className={`p-4 rounded-2xl bg-muted border border-border group-hover:scale-110 transition-transform duration-300`}>
                    {cat.icon}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-border group-hover:bg-blue-700/20 group-hover:text-blue-400 transition-all duration-300">
                    <Plus className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <p className="text-[13px] font-black uppercase tracking-widest text-blue-500 mb-2">{cat.tagline}</p>
                  <CardTitle className="text-3xl font-black tracking-tight mb-4">{cat.title}</CardTitle>
                  <p className="text-[17px] text-muted-foreground font-medium leading-relaxed mb-8">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center text-sm font-black uppercase tracking-widest text-[#1c82c2] group-hover:gap-3 gap-2 transition-all">
                  Explore Solutions <ArrowRight className="h-5 w-5" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}