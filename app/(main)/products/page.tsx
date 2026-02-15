import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Plus } from "lucide-react" 
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Image from "next/image";

const verticals = [
  {
    name: "Neuro Diagnostics",
    title: "Diagnostics and Monitoring",
    href: "/neurodiagnostics", // Target page
    description: "Advanced AI-powered tools for early detection and monitoring of neurological disorders.",
    image: "/quadis-pd-thumb.png", 
    color: "blue",
  },
  // {
  //   name: "Gaming & Rehabilitation",
  //   title: "Gaming & Rehabilitation",
  //   href: "/gamingcategories", // Target page
  //   description: "AI-driven gaming solutions for rehabilitation, monitoring and tracking.",
  //   image: "/games-rehab-thumb-v2.png", 
  //   color: "violet",
  // },
  // {
  //   name: "Assistive Tech",
  //   title: "Assistive Technology",
  //   href: "/assistivetech", // Target page
  //   description: "Innovative solutions to help patients with neurological disorders maintain independence and improve quality of life.",
  //   image: "/assistive-thumb.png", 
  //   color: "green",
  // },

]

export default function ProductsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent z-0 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Our Applications
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            A comprehensive suite of neurotechnology solutions transforming patient care through
            AI-driven innovation and computational neuroscience.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* 2. PRODUCTS GRID - Navigates to new pages */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto mb-20">
          {verticals.map((vertical) => (
            <Link key={vertical.name} href={vertical.href} className="group">
              <Card className="overflow-hidden border-border/50 bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                <div className="relative h-64 w-full overflow-hidden bg-muted">
                  <Image 
                    src={vertical.image} 
                    alt={vertical.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* The Plus Icon UI */}
                  <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-border group-hover:text-white transition-colors duration-300">
                    <Plus className="h-6 w-6" />
                  </div>
                </div>
                
                <CardHeader className="flex-grow">
                  <div className={`h-1 w-12 mb-4 rounded-full ${
                    vertical.color === "blue" ? "bg-blue-500" :
                    vertical.color === "violet" ? "bg-violet-500" :
                    vertical.color === "green" ? "bg-green-500" :
                    "bg-red-500"
                  }`} />
                  <CardTitle className="text-2xl font-black tracking-tight">{vertical.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground font-medium leading-relaxed mb-6">
                    {vertical.description}
                  </p>
                  <div className="flex items-center text-sm font-black uppercase tracking-widest text-[#1c82c2] group-hover:gap-3 gap-2 transition-all">
                    Explore Vertical <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* 3. CALL TO ACTION */}
        <div className="text-center bg-card border border-border rounded-3xl p-12 shadow-sm">
          <h2 className="text-3xl font-black text-foreground mb-6">Ready to Deploy These Solutions?</h2>
          <p className="max-w-2xl mx-auto text-[17px] text-muted-foreground mb-10 leading-relaxed font-medium">
            Transform your clinical practice with our cutting-edge neurotechnology solutions. Contact us to learn how
            our products can enhance patient outcomes in your facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md font-bold rounded-full px-8">
              <Link href="/contact">
                Contact Us <Mail className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border hover:bg-muted font-bold rounded-full px-8">
              <Link href="/research">View Research Data</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}