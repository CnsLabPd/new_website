import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, ArrowRight, Wallet, Hourglass } from "lucide-react"
import { DynamicMagneticButton } from "@/utils/DynamicMagneticButton";

const GRADIENT_BUTTON_CLASS = "bg-gradient-to-br from-blue-600 via-blue-400 to-blue-600 px-10 font-semibold text-white py-2 rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-base"

const workshops = [
  {
    id: "comp-neuro-training-1",
    status: "Ongoing",
    title: "5-Month Research Training Program in Computational Neuroscience",
    date: "January 01st - May 31st, 2026",
    duration: "20 weeks (Phase 01: 10w | Phase 02: 10w)",
    participants: "50 Max",
    type: "Online (Zoom)",
    pricing: "Phase 01: 25,000 INR | Phase 02: 35,000 INR",
    description: "A mentorship-driven online program that takes students from foundational coursework to a supervised, conference-ready research project in computational neuroscience.",
    registrationLink: "/researchprogram"
  },
  {
    id: "AI-EEG-4",
    status: "Upcoming",
    title: "AI Applications in EEG",
    date: "February 20-22, 2026",
    duration: "3 days",
    participants: "70 Max",
    type: "Online (Zoom)",
    pricing: "UG: 3,000 INR | PG: 3,500 INR | Professionals: 4,000 INR",
    description: "Explore how EEG signals are collected, processed, and analyzed using AI and machine learning for breakthrough applications in brain-computer interfaces and neurological diagnosis.",
    registrationLink: "/eegworkshop"
  },
  {
    id: "comp-neuro-training-3",
    status: "Upcoming",
    title: "Modeling Brain Function Using ML",
    date: "March 21-25, 2026",
    duration: "5 days",
    participants: "70 Max",
    type: "Online (Zoom)",
    pricing: "UG: 3,000 INR | PG: 3,500 INR | Professionals: 4,000 INR",
    description: "Master machine learning approaches to model and simulate brain functions. This advanced workshop covers neural network architectures and practical implementations for complex brain dynamics.",
    registrationLink: "/modellingworkshop"
  },
  {
    id: "demystify-1",
    status: "Past",
    title: "Demystifying the Brain",
    date: "January 23 - 25, 2026",
    duration: "3 days",
    participants: "70 Max",
    type: "Online (Zoom)",
    pricing: "UG: 2,500 INR | PG: 3,000 INR | Professionals: 3,500 INR",
    description: "A comprehensive introductory workshop designed to simplify complex neurological concepts through computational lenses and interactive signal processing demonstrations.",
    registrationLink: "/contact"
  },
    {
    id: "comp-neuro-training-2",
    status: "Past",
    title: "Modeling Brain Function Using ML",
    date: "January 09 - 13, 2026",
    duration: "5 days",
    participants: "70 max",
    type: "Online (Zoom)",
    pricing: "UG: 2,000 INR | PG: 2,500 INR | Professionals: 3,000 INR",
    description: "Master machine learning approaches to model and simulate brain functions. This advanced workshop covers neural network architectures and practical implementations for complex brain dynamics.",
    registrationLink: "/contact"
  },
    {
    id: "eeg-ai-2025-1",
    status: "Past",
    title: "AI Applications in EEG",
    date: "Sep 26 - Sep 28, 2025",
    participants: "53",
    duration: "3 days",
    type: "Central Library,IIT Madras",
    description: "Hands-on training in EEG signal processing and AI decoding. Participants learned to build pipelines for seizure detection and neurodegeneration analysis.",
    registrationLink: "/contact"
  },
  {
    id: "eeg-ai-2025-2",
    status: "Past",
    title: "AI Applications in EEG",
    participants: "47",
    duration: "3 days",
    date: "Oct 31 – Nov 02, 2025",
    type: "Central Library, IIT Madras",
    description: "Hands-on training in EEG signal processing and AI decoding. Participants learned to build pipelines for seizure detection and neurodegeneration analysis.",
    registrationLink: "/contact"
  },
    {
    id: "Modelling Brain Function using ML",
    status: "Past",
    title: "AI Applications in EEG",
    participants: "50",
    duration: "5 days",
    date: "Dec 5 - Dec 9, 2025",
    type: "Online (GMeet)",
    description: "Master machine learning approaches to model and simulate brain functions. This advanced workshop covers neural network architectures, computational neuroscience, and practical implementations for understanding complex brain dynamics.",
    registrationLink: "/contact"
  },

]

export default function WorkshopsPage() {
  const upcomingWorkshops = workshops.filter(ws => ws.status === 'Upcoming' || ws.status === 'Ongoing');
  const pastWorkshops = workshops.filter(ws => ws.status === 'Past');

  return (
    <div className="bg-background text-foreground min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-24 overflow-hidden bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Professional Workshops
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            Expand your expertise in computational neuroscience and AI diagnostics through our mentorship-driven training programs.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* 2. UPCOMING WORKSHOPS */}
        <div className="mb-24">
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Upcoming Workshops</h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {upcomingWorkshops.map((ws) => (
              <WorkshopCard key={ws.id} ws={ws} isUpcoming={true} />
            ))}
          </div>
        </div>

        {/* 3. PAST WORKSHOPS */}
        <div className="mb-24">
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground/50">Past Workshops</h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 opacity-95">
            {pastWorkshops.map((ws) => (
              <WorkshopCard key={ws.id} ws={ws} isUpcoming={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function WorkshopCard({ ws, isUpcoming }: { ws: any, isUpcoming: boolean }) {
  return (
    <Card className={`relative flex flex-col overflow-hidden border-2 transition-all hover:shadow-xl ${
      isUpcoming ? 'border-blue-500/50 bg-blue-500/[0.02]' : 'border-border bg-card'
    }`}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest ${
            isUpcoming ? 'bg-blue-500 text-white' : 'bg-muted text-muted-foreground'
          }`}>
            {ws.status}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground text-xs font-bold uppercase tracking-wider">
            <Calendar className="h-4 w-4" /> {ws.date}
          </div>
        </div>
        <CardTitle className="text-xl font-black tracking-tight leading-tight min-h-[50px]">
          {ws.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 flex-grow flex flex-col">
        {/* Metadata Grid - Scaled to ~13.5px */}
        <div className="grid grid-cols-1 gap-y-3 text-[13.5px] font-bold text-muted-foreground uppercase tracking-tight">
          <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-blue-500" /> {ws.type}</div>
          <div className="flex items-center gap-2"><Users className="h-5 w-5 text-blue-500" /> {ws.participants}</div>
          {ws.duration && <div className="flex items-center gap-2"><Hourglass className="h-5 w-5 text-blue-500" /> {ws.duration}</div>}
          {ws.pricing && <div className="flex items-center gap-2"><Wallet className="h-5 w-5 text-blue-500" /> {ws.pricing}</div>}
        </div>

        {/* Description - Scaled to ~17px (text-base + nudge) */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-[17px] text-foreground/80 leading-relaxed font-medium">
            {ws.description}
          </p>
        </div>

        <div className="pt-6 mt-auto">
          <DynamicMagneticButton>
            <Link 
              href={ws.registrationLink} 
              className={isUpcoming ? GRADIENT_BUTTON_CLASS : "w-full px-8 py-2 border-2 border-border font-bold rounded-full inline-flex items-center justify-center gap-2 text-base"}
            >
              {isUpcoming ? 'Apply Now' : 'View Archive'}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </DynamicMagneticButton>
        </div>
      </CardContent>
    </Card>
  )
}
