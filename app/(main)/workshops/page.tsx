"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, ArrowRight, Wallet, Hourglass, Quote } from "lucide-react"
import { DynamicMagneticButton } from "@/utils/DynamicMagneticButton"
import { useState, useEffect } from "react";

const GRADIENT_BUTTON_CLASS = "bg-gradient-to-br from-blue-600 via-blue-400 to-blue-600 px-10 font-semibold text-white py-2 rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-base"

const workshops = [
  {
    id: "summer-school-2026",
    status: "Upcoming",
    title: "Neurogati Summer School 2026: From Neural Dynamics to Neurotechnology",
    date: "June 15-26, 2026",
    duration: "10 days",
    participants: "Applications Open",
    type: "Online (Live + Interactive)",
    pricing: "Registration details coming soon",
    description: "A 10-day intensive program featuring 30+ expert lectures from international speakers, hands-on sessions in neural modeling and data analysis, AI for EEG and neural signals, brain-computer interfaces, and neurorehabilitation applications. Includes poster presentations and interactive Q&A sessions. Abstract submission deadline: April 30th, 2026.",
    registrationLink: "/workshops/summer-school-2026"
  },
  {
    id: "comp-neuro-training-3",
    status: "Past",
    title: "Workshop on Brain Modeling",
    date: "March 27-31, 2026",
    duration: "5 days",
    participants: "70 Max",
    type: "Online (Zoom)",
    pricing: "UG: 3,000 INR | PG: 3,500 INR | Professionals: 4,000 INR",
    description: "Master machine learning approaches to model and simulate brain functions. This advanced workshop covers neural network architectures and practical implementations for complex brain dynamics.",
    registrationLink: "/modellingworkshop"
  },
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
    status: "Past",
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

const testimonials = [
  {
    id: "testimonial-1",
    name: "Saumya Garg",
    role: "Psychology Student",
    organization: "IIT Madras Workshop Participant",
    image: "https://media.licdn.com/dms/image/v2/C4E03AQFZmuxs1ZaeFg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1621572633417?e=2147483647&v=beta&t=slsE2-nvKTWhX1knnJUiXC4udiROLOu8OYA4rMUE0Ic",
    workshopImage: "/testimonials/testimonial1.jpeg",
    text: "This workshop didn't just give me new knowledge—it gave me a new lens. The experience transformed my understanding, particularly regarding the Hodgkin-Huxley model and computational modeling's practical applications in stroke rehabilitation. I learned to move beyond surface-level knowledge to deeper mechanistic understanding through hands-on projects.",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7445115355330621440/",
    workshop: "5-day Computational Neuroscience Workshop"
  },
  {
    id: "testimonial-2",
    name: "Chandana R Hosur",
    role: "Workshop Organizer",
    organization: "IIT Madras",
    image: "https://media.licdn.com/dms/image/v2/D5603AQE8SOT41pguRg/profile-displayphoto-scale_200_200/B56ZzJO2hiGgAY-/0/1772902641798?e=2147483647&v=beta&t=asnTf2w7o0jrdQL8PgbazG7UAOu7Cv48QOAsuTpaB9I",
    workshopImage: "/testimonials/testimonial2.jpeg",
    text: "Delighted to share the success of our 5-day Computational Neuroscience workshop at IIT Madras (March 27-31, 2026). The enthusiasm and engagement from participants was incredible as we explored neural modeling, brain dynamics, and practical implementations. Grateful to all attendees for making this such a meaningful learning experience.",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7444662168760950784/",
    workshop: "Computational Neuroscience Workshop - IIT Madras"
  },
  {
    id: "testimonial-3",
    name: "Shruti Tripathi",
    role: "Workshop Participant",
    organization: "Brain Modelling Workshop",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQF2x_52t0fytw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1686745018356?e=2147483647&v=beta&t=9-AVUlJC-eP5RAsiK-3OP4v4KKM1fwjX4JFuQuzqNik",
    workshopImage: "/testimonials/testimonial3_Shurti_Tripathi.jpeg",
    text: "I recently completed an immersive workshop on Brain Modelling organised by the Computational Neuroscience Lab, IIT Madras, and Neurogati, where I explored the fascinating intersection of neuroscience and AI. From studying neuronal signaling models to gaining hands-on experience with PyTorch and neural oscillations, it was an enriching journey into how computational models can help decode complex brain functions. Excited to build further on this!",
    linkedinUrl: "https://www.linkedin.com/posts/shrutitripathi3_computationalneuroscience-ai-deeplearning-activity-7446424925051203584-FVP2",
    workshop: "Workshop on Brain Modeling"
  }
]

export default function WorkshopsPage() {
  const [activeSection, setActiveSection] = useState("upcoming")
  const upcomingWorkshops = workshops.filter(ws => ws.status === 'Upcoming');
  const ongoingWorkshops = workshops.filter(ws => ws.status === 'Ongoing');
  const pastWorkshops = workshops.filter(ws => ws.status === 'Past');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['upcoming', 'ongoing', 'past', 'testimonials']
      const scrollPosition = window.scrollY + 200

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 140 // Account for sticky nav height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }

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

      {/* STICKY NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 py-4">
            <button
              onClick={() => scrollToSection("upcoming")}
              className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
                activeSection === "upcoming"
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => scrollToSection("ongoing")}
              className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
                activeSection === "ongoing"
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => scrollToSection("past")}
              className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
                activeSection === "past"
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              Past Workshops
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
                activeSection === "testimonials"
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              Testimonials
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* 2. UPCOMING WORKSHOPS */}
        <div id="upcoming" className="mb-24 scroll-mt-24">
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Upcoming Workshops</h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4"></div>
          </div>

          {upcomingWorkshops.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
              {upcomingWorkshops.map((ws) => (
                <WorkshopCard key={ws.id} ws={ws} isUpcoming={true} />
              ))}
            </div>
          ) : (
            <Card className="relative flex flex-col overflow-hidden border-2 border-blue-500/30 bg-blue-500/[0.02]">
              <CardContent className="py-16 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <Calendar className="h-16 w-16 mx-auto text-blue-500/50" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
                    New Workshops Coming Soon
                  </h3>
                  <DynamicMagneticButton>
                    <Link
                      href="/contact"
                      className={GRADIENT_BUTTON_CLASS}
                    >
                      Get Notified
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </DynamicMagneticButton>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 3. ONGOING WORKSHOPS */}
        <div id="ongoing" className="mb-24 scroll-mt-24">
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Ongoing Workshops</h2>
            <div className="h-1.5 w-20 bg-green-600 mt-4"></div>
          </div>

          {ongoingWorkshops.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
              {ongoingWorkshops.map((ws) => (
                <WorkshopCard key={ws.id} ws={ws} isUpcoming={true} />
              ))}
            </div>
          ) : (
            <Card className="relative flex flex-col overflow-hidden border-2 border-green-500/30 bg-green-500/[0.02]">
              <CardContent className="py-16 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <Hourglass className="h-16 w-16 mx-auto text-green-500/50" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
                    No Ongoing Workshops
                  </h3>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 4. PAST WORKSHOPS */}
        <div id="past" className="mb-24 scroll-mt-24">
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground/50">Past Workshops</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 opacity-95">
            {pastWorkshops.map((ws) => (
              <WorkshopCard key={ws.id} ws={ws} isUpcoming={false} />
            ))}
          </div>
        </div>

        {/* 5. TESTIMONIALS */}
        <div id="testimonials" className="mb-24 scroll-mt-24">
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Testimonials</h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4"></div>
          </div>

          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-6 min-w-max">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
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
              {isUpcoming ? 'Learn More' : 'View Archive'}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </DynamicMagneticButton>
        </div>
      </CardContent>
    </Card>
  )
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  const initials = testimonial.name.split(' ').map((n: string) => n[0]).join('')

  return (
    <Card className="relative flex flex-col overflow-hidden border-2 border-border bg-card hover:shadow-xl transition-all w-[400px] flex-shrink-0">
      {/* Workshop Image */}
      {testimonial.workshopImage && (
        <div className="w-full h-32 overflow-hidden bg-muted">
          <img
            src={testimonial.workshopImage}
            alt={`${testimonial.workshop} content`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardContent className="p-5">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center border-2 border-blue-500">
                <span className="text-white font-black text-lg">{initials}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-grow">
            <h3 className="text-lg font-black tracking-tight mb-1">{testimonial.name}</h3>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">
              {testimonial.role}
            </p>
            <p className="text-xs text-muted-foreground">{testimonial.organization}</p>
          </div>

          <Quote className="h-6 w-6 text-blue-500/20 flex-shrink-0" />
        </div>

        {/* Testimonial Text */}
        <div className="mb-4">
          <p className="text-sm text-foreground/90 leading-relaxed font-medium italic line-clamp-5">
            "{testimonial.text}"
          </p>
        </div>

        {/* Workshop Badge */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {testimonial.workshop}
          </span>
          {testimonial.linkedinUrl && (
            <a
              href={testimonial.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors text-xs font-bold uppercase tracking-wider"
            >
              View on LinkedIn →
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
