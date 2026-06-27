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
    id: "brain_modeling_for_medicos",
    status: "Past",
    title: "Workshop on Brain Modeling for Medicos",
    date: "May 18-24, 2026",
    duration: "7 days",
    participants: "60",
    type: "Online (Live + Interactive, US-friendly timings)",
    description: "A 7-day online workshop for medicos on brain modeling with a clinical perspective moving from Neurons to Disease Models. Selection-based admission.",
    registrationLink: "/brain_modeling_for_medicos"
  },
  {
    id: "summer-research-phase-1",
    status: "Past",
    title: "AI + BRAIN SCIENCE SUMMER PROGRAM",
    date: "June 1-15, 2026",
    duration: "2 weeks",
    participants: "Limited seats",
    type: "Online (Live + Interactive, US-friendly timings)",
    description: "For High School Students (Grades 8–12). Explore how AI is used to study the brain, analyze EEG signals, and understand brain disorders. Learn how neurons compute, foundations of neural networks, brain signal analysis, and computational models of neurological disorders. Features live interactive sessions led by IIT faculty, certificate of completion, and pathway to Phase II research programs. Selection-based admission.",
    registrationLink: "/workshops/research-program-phase-1"
  },
  {
    id: "summer-school-2026",
    status: "Past",
    title: "Neurogati Summer School 2026: Your entry portal into Neurotechnology, Brain-AI and the future of neuroscience.",
    date: "June 15-25, 2026",
    duration: "10 days",
    participants: "Successfully Completed",
    type: "Online (Live + Interactive)",
    description: "A 10-day intensive program that featured 30+ expert lectures from international speakers, hands-on sessions in neural modeling and data analysis, AI for EEG and neural signals, brain-computer interfaces, and neurorehabilitation applications. Included poster presentations and interactive Q&A sessions.",
    registrationLink: "/workshops/summer-school-2026"
  },
  {
    id: "brain-modeling-medicos-july",
    status: "Upcoming",
    title: "Brain Modeling for Medicos - July 2026",
    date: "July 8-13, 2026",
    duration: "6 days",
    participants: "Limited seats",
    type: "Online (Live + Interactive)",
    description: "A comprehensive 6-day workshop for medical professionals on brain modeling with a clinical perspective. From neurons to disease models - understand epilepsy, Parkinson's, and depression as dynamical disorders. No coding background required. Registration deadline: June 30, 2026.",
    registrationLink: "/workshops/brain-modeling-medicos-july-2026"
  },
  {
    id: "research-program-phase-2",
    status: "Upcoming",
    title: "Computational Neuroscience Research Training - Phase 2",
    date: "July 11 - September 26, 2026",
    duration: "10 weeks",
    participants: "Limited seats",
    type: "Online (2 hrs/week Live)",
    pricing: "US$ 375",
    description: "A mentorship-driven research training program in computational neuroscience. Choose from 6 research tracks including PD diagnostics, deep oscillatory networks, spatial decision making, EEG analysis, autism games, and 3D movement analysis. Includes weekly mentorship, supervised research project, and conference-ready abstract. Application deadline: June 30, 2026.",
    registrationLink: "/workshops/research-program-phase-2-july-sept"
  },
  {
    id: "ai-applications-eeg-august",
    status: "Upcoming",
    title: "AI Applications in EEG - August 2026",
    date: "August 7-9, 2026",
    duration: "3 days",
    participants: "50 Max (Selection-based)",
    type: "Offline Workshop",
    description: "Explore how EEG signals are collected, processed, and analyzed using AI and machine learning. Hands-on sessions with MNE-Python, motor/visual imagery classification, seizure detection, and neurodegeneration analysis. SOP submission deadline: July 15, 2026.",
    registrationLink: "/workshops/ai-applications-eeg-august-2026"
  },
  {
    id: "research-program-phase-1-july",
    status: "Upcoming",
    title: "AI + Brain Science Summer Program - July Session",
    date: "July 7-21, 2026",
    duration: "2 weeks",
    participants: "Limited seats",
    type: "Online (Live + Interactive, US-friendly timings)",
    description: "For High School Students (Grades 8–12). Explore how AI is used to study the brain, analyze EEG signals, and understand brain disorders. Learn how neurons compute, foundations of neural networks, brain signal analysis, and computational models of neurological disorders. Features live interactive sessions led by IIT faculty, certificate of completion, and pathway to Phase II research programs. Selection-based admission.",
    registrationLink: "/workshops/research-program-phase-1-july7-21"
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
    status: "Past",
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

const medicosTestimonials = [
  {
    id: "medicos-1",
    name: "Manish Mohapatra",
    role: "MSc in Neuropsychology",
    organization: "Christ University",
    image: "",
    workshopImage: "",
    text: "The Neurogati Workshop on Brain Modelling was one of the most intellectually stimulating experiences I have had as a neuropsychology student. Coming from a clinical background, I had always understood the brain through behaviour and assessment. This workshop gave me a completely different lens - one that is mathematical, computational, and deeply illuminating. What I appreciated most was how the content moved seamlessly from foundational neuroscience to actual modelling frameworks without losing clarity. The sessions on dynamical systems and disease modelling, particularly the Basal Ganglia and Parkinson's, were genuinely eye-opening. It helped me see how computational tools can bridge the gap between what we observe clinically and what is actually happening at a circuit level. The workshop pushed me to think differently about my own research and opened a direction I am now actively pursuing. I would recommend it to any student in neuroscience, psychology, or medicine who wants to understand the brain not just as a structure, but as a system.",
    linkedinUrl: "",
    workshop: "Brain Modeling for Medicos"
  },
  {
    id: "medicos-2",
    name: "K. Tejaswi Sanjana",
    role: "MBBS student",
    organization: "Government Medical College Sangareddy",
    image: "",
    workshopImage: "",
    text: "Attending Brain Modeling for Medicos as a fourth-year MBBS student was genuinely eye-opening. Prof. Chakravarthy has a rare ability to make equations feel like medicine - by the end of Day 1, I was already thinking about patients differently. Every speaker - Charitha, Vignesh, Sindhu, and Aditya - brought their own clarity and enthusiasm, and what I appreciated most was that no question went unanswered. Whether it was about the quadratic term in the Izhikevich model or why backpropagation fails on spiking neurons, every doubt was addressed thoughtfully and completely. This workshop gave me a new language to understand the brain not just anatomically, but computationally. I came in knowing neurons. I leave knowing how to model them. That shift in perspective is something no textbook gave me in four years of medical school.",
    linkedinUrl: "",
    workshop: "Brain Modeling for Medicos"
  },
  {
    id: "medicos-3",
    name: "Riya Pravinkumar Thakkar",
    role: "BSc Neuroscience",
    organization: "Parul Institute of Allied and Healthcare Sciences",
    image: "",
    workshopImage: "",
    text: "This workshop helped me understand what the field of computational neuroscience is really about and what researchers actually do in this field. It played a major role in my own career path, as I realised how much I enjoy computational methods for explaining neuroscience. Learning the maths behind dopamine secretion, how inputs from the D1 and D2 pathways relate to exploration and exploitation, and how these ideas connect to decision-making was very valuable. Relating this to the difficulties faced by Parkinson's Disease patients also helped me understand the clinical relevance. The workshop helped me gain confidence as a student from a biological background entering a tech-based field. I loved that we were given links to codes and graphs to understand the concepts on our own, and I appreciate that recordings were provided so we could revise and make notes at our own pace.",
    linkedinUrl: "",
    workshop: "Brain Modeling for Medicos"
  },
  {
    id: "medicos-4",
    name: "K. Sreeja Shivani",
    role: "MBBS student",
    organization: "Government Medical College Sangareddy",
    image: "",
    workshopImage: "",
    text: "As a medical student, I found the workshop highly informative and engaging. I gained valuable insights into computational neuroscience and brain modeling, topics that are rarely explored in depth during medical training. The sessions were well structured and easy to follow, even for beginners. I particularly appreciated how complex concepts were connected to real-world medical applications. The workshop broadened my perspective on the intersection of medicine, neuroscience, and artificial intelligence, and motivated me to explore the field further.",
    linkedinUrl: "",
    workshop: "Brain Modeling for Medicos"
  },
  {
    id: "medicos-5",
    name: "Ashmi Rahiman",
    role: "MBBS student",
    organization: "Sri Lakshmi Narayana Institute of Medical Science",
    image: "",
    workshopImage: "",
    text: "The workshop gave me exposure, a basic foundation, and curiosity to learn more. This orientation is important for all scholars who love brain science. I enjoyed it a lot and I am conveying my gratitude to the Neurogati team, our Professor, and all the speakers who took us through the learning journey by clarifying every small doubt with patience. Happy to be a part of this event as a collaborator and a participant as well. Looking forward to more such events - this was intellectual fun.",
    linkedinUrl: "",
    workshop: "Brain Modeling for Medicos"
  },
  {
    id: "medicos-6",
    name: "Pratika Mishra",
    role: "Engineering student",
    organization: "IITM",
    image: "",
    workshopImage: "",
    text: "The workshop facilitated a soft landing into the field of computational neuroscience and deep learning. It was extremely helpful in revising the fundamentals and provided a better understanding of why neural networks are named as such. The explanations were easy to understand and helped connect Artificial Neural Networks to Natural Neural Networks. Overall, the workshop helped bridge mathematical modelling with biological systems and motivated me to explore research opportunities in brain-inspired computing and neural modeling in greater depth. It was a highly enriching and transformative learning experience.",
    linkedinUrl: "",
    workshop: "Brain Modeling for Medicos"
  },
  {
    id: "medicos-7",
    name: "Subashiny Kaliaperumal",
    role: "Professional Technologist",
    organization: "MYPMGENIE",
    image: "",
    workshopImage: "",
    text: "The general concept of mathematical neuroscience itself was a mind-blowing and fascinating experience for me personally. All the knowledge sharers made great effort in the deliberate explanation of each day's session impressively. Thank you for this chance.",
    linkedinUrl: "",
    workshop: "Brain Modeling for Medicos"
  },
  {
    id: "medicos-8",
    name: "Dr. Susmita Das",
    role: "Assistant Professor",
    organization: "Narula Institute of Technology",
    image: "",
    workshopImage: "",
    text: "The workshop explained the process from basic to advanced concepts in an understandable manner. The computational approach was especially valuable.",
    linkedinUrl: "",
    workshop: "Brain Modeling for Medicos"
  }
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
  },
  {
    id: "testimonial-4",
    name: "Spandan Chavan",
    role: "Workshop Participant",
    organization: "MIT ADT University",
    image: "",
    workshopImage: "/testimonials/testimonialspandan.jpeg",
    text: "Attended the 3-day workshop on AI Applications in EEG at IIT Madras. The workshop covered fascinating topics including EEG signal processing, brain activity analysis, emotional recognition via neural data, and AI applications in neuro-engineering and healthcare. It was incredible to explore the intersection of AI, Neuroscience, Cognitive Computing, Biomedical Engineering, and Brain-Computer Interfaces with experts from IISc Bangalore, IIT Jodhpur, IIT Madras, IIT BHU, and NIT Trichy.",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7460052886547521536/",
    workshop: "AI Applications in EEG - IIT Madras"
  },
  {
    id: "testimonial-5",
    name: "Srinivas Jallepalli",
    role: "Parent",
    organization: "Austin, TX (for his daughter Akhila)",
    image: "",
    workshopImage: "",
    text: "My daughter participated in Neurogati's Computational Neuroscience Research Program, Phase 1, and found it to be an excellent introduction to an exciting and opportunity-rich field. She was especially impressed by Dr. Chakravarthy and his PhD students, who taught the material with clarity, patience, and deep expertise. The instructors made sure students understood the concepts, while the homework assignments encouraged genuine curiosity and exploration. My daughter often went beyond the required work to experiment further with the models introduced in class. I am very grateful for the quality of instruction and the thoughtful structure of the program. I would highly recommend Neurogati's program to students who are interested in neuroscience, computation, or research and want to build a strong foundation in computational neuroscience.",
    linkedinUrl: "",
    workshop: "Computational Neuroscience Research Program, Phase 1"
  }
]

export default function WorkshopsPage() {
  const [activeSection, setActiveSection] = useState("ongoing")
  const upcomingWorkshops = workshops.filter(ws => ws.status === 'Upcoming');
  const ongoingWorkshops = workshops.filter(ws => ws.status === 'Ongoing');
  const pastWorkshops = workshops.filter(ws => ws.status === 'Past');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['ongoing', 'upcoming', 'past', 'testimonials']
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

        {/* 1. ONGOING WORKSHOPS */}
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
                  <p className="text-base text-muted-foreground mb-6">
                    Check out our exciting upcoming workshops below - Brain Modeling for Medicos, AI + Brain Science Summer Program, and more!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

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

        {/* 3. PAST WORKSHOPS */}
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

        {/* 4. TESTIMONIALS */}
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

          {/* Brain Modeling for Medicos Testimonials */}
          <div id="medicos-testimonials" className="mt-16 scroll-mt-24">
            <div className="mb-10">
              <h3 className="text-2xl md:text-4xl font-black tracking-tighter">Brain Modeling for Medicos Testimonials</h3>
              <div className="h-1 w-16 bg-violet-600 mt-4"></div>
            </div>

            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-6 min-w-max">
                {medicosTestimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
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
            className="w-full h-full object-cover object-top"
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
          <p className="text-sm text-foreground/90 leading-relaxed font-medium italic">
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
