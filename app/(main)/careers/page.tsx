import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Briefcase,
  Mail,
  Lightbulb,
  Coffee,
} from "lucide-react"

const benefits = [
  {
    icon: <Lightbulb className="h-6 w-6 text-yellow-400" />,
    title: "Learning & Growth",
    description: "Continuous learning opportunities and conference attendance",
  },
  {
    icon: <Users className="h-6 w-6 text-green-400" />,
    title: "Collaborative Culture",
    description: "Work with world-class researchers and clinicians",
  },
  {
    icon: <Coffee className="h-6 w-6 text-amber-400" />,
    title: "Work-Life Balance",
    description: "Flexible working hours and remote work options",
  },
]

export default function CareersPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      
      {/* --- HERO SECTION (Removed WavyBackground) --- */}
      <section className="relative pt-40 pb-20 border-b border-border text-center overflow-hidden">
        {/* Subtle dot grid for tech aesthetic */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#1c82c2 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        <div className="container mx-auto px-6 relative z-10">
          
          <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Careers at Neurogati
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed font-medium">
            Be part of a mission-driven team that's revolutionizing neurological healthcare through cutting-edge AI, 
            brain-computer interfaces, and computational neuroscience.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Why Work With Us */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight text-foreground mb-4">Why Work With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join a team where your work directly impacts patients' lives and advances the field of neurotechnology.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="bg-card border border-border text-center p-8 hover:shadow-lg transition-all rounded-2xl">
                <div className="flex justify-center mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-24">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              <CardHeader className="border-b border-border bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-violet-500/10 p-10 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-sm">
                  <Briefcase className="h-8 w-8 text-[#1c82c2]" aria-hidden="true" />
                </div>
                <CardTitle className="text-3xl font-black text-foreground mb-4">No open positions currently</CardTitle>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                  Neurogati is not hiring for any active roles at the moment. Future openings will be posted here when available.
                </p>
              </CardHeader>
              <CardContent className="p-8 text-center md:p-12">
                <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                  For collaborations, institutional partnerships, or research discussions, please use the contact page instead of submitting a job application.
                </p>
                <Button asChild className="mt-8 rounded-full bg-blue-600 px-8 font-bold text-white hover:bg-blue-700">
                  <a href="/contact">
                    <Mail className="mr-3 h-5 w-5" />
                    Contact Neurogati
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
