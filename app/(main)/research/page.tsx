import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ExternalLink, Brain, Zap, Heart, Cpu, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image";

// --- DATA ARRAYS ---

const journalPublications = [
  {
    title: "A Multiscale, Systems-Level, Neuropharmacological Model of Cortico-Basal Ganglia System for Arm Reaching Under Normal, Parkinsonian, and Levodopa Medication Conditions",
    authors: "Frontiers in Computational Neuroscience",
    year: "2022",
    link:"https://pubmed.ncbi.nlm.nih.gov/35046787/",
    description: "Explores how dopamine loss leads to Parkinson's symptoms by linking cellular degeneration to real-world motor behavior via multiscale computational modeling.",
  },
  {
    title: "A generalized reinforcement learning based deep neural network agent model for diverse cognitive constructs",
    authors: "Scientific Reports",
    year: "2023",
    link: "https://www.nature.com/articles/s41598-023-32234-y",
    description: "A unified reinforcement learning model that simulates integrated cognitive functions like attention, memory, and decision-making.",
  },
  {
    title: "A Computational Model of Deep Brain Stimulation for Parkinson's Disease Tremor and Bradykinesia",
    authors: "Brain Sciences",
    year: "2024",
    link:"https://pubmed.ncbi.nlm.nih.gov/38928620/",
    description: "Demonstrates how DBS effectively alleviates motor disorders and identifies optimal stimulation parameters for maximum therapeutic benefit.",
  },
  {
    title: "Feasibility and efficacy of virtual reality rehabilitation compared with conventional physiotherapy for upper extremity impairment due to ischaemic stroke",
    authors: "BMJ Open",
    year: "2024",
    link: "https://pubmed.ncbi.nlm.nih.gov/39043599/",
    description: "A multicenter trial evaluating the effectiveness of VR-cRGS for stroke survivors compared to conventional physiotherapy.",
  },
];

const books = [
  {
    title: "Computational Neuroscience Models of the Basal Ganglia",
    authors: "Springer",
    year: "2018",
    img: "/Computational Neuroscience Models of the Basal Ganglia-thumb.jpg",
    link: "https://link.springer.com/book/10.1007/978-981-10-8494-2",
    description: "Computational models of basal ganglia-related disorders, including Parkinson's disease, schizophrenia, and addiction."
  },
  {
    title: "Demystifying the Brain",
    authors: "Springer",
    year: "2018",
    img: "/Demystifying the Brain-thumb.jpg",
    link: "https://link.springer.com/book/10.1007/978-981-13-3320-0",
    description: "An emerging vision of the brain expressed in computational terms for non-experts, covering neural networks and consciousness."
  }
];

const ongoingStudies = [
  {
    title: "Rehabilitation for Post-Stroke Recovery",
    description: "Using cRGS™ to improve motor outcomes in stroke survivors through remote, gamified therapy sessions.",
    status: "Ongoing",
    participants: "Target: 150 patients",
    duration: "18 months",
    location: "Multi-center study",
    color: "blue",
    gradient: "from-blue-500/10 to-blue-600/10",
  },
  {
    title: "AI-Driven Quantitative Gait Assessment for Parkinson's Disease",
    description: "Validating our AI-powered diagnostic tools against gold-standard clinical gait analysis tests.",
    status: "Ongoing",
    participants: "Target: 200 patients",
    duration: "24 months",
    location: "Multi-center study",
    color: "violet",
    gradient: "from-violet-500/10 to-violet-600/10",
  },
]

export default function ResearchPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
      
      {/* 1. HERO SECTION - Clean Replacement for WavyBackground */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        {/* Subtle Radial Gradient to match Products page */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent z-0 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Research at Neurogati
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            Bridging the gap between computational theory and clinical application through rigorous research and
            evidence-based innovation in neurotechnology.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">

        {/* 2. PUBLISHED BOOKS */}
        <section className="mb-24">
          <div className="flex items-center justify-center mb-12">
            <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-3xl font-black tracking-tight text-foreground">Published Books</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <Card key={book.title} className="bg-card border border-border hover:shadow-xl transition-all duration-300 flex flex-col">
                <CardHeader className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <BookOpen className="h-6 w-6 text-amber-500" />
                    <Badge variant="secondary" className="bg-muted text-foreground font-bold">{book.year}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight mb-1">{book.title}</CardTitle>
                  <p className="text-sm font-semibold text-blue-500 mb-4">{book.authors}</p>
                  
                  <div className="flex items-center justify-center h-80 relative bg-muted/50 rounded-xl overflow-hidden border border-border/50">
                    {book.img ? (
                      <Image
                        src={book.img}
                        alt={book.title}
                        width={240} 
                        height={320}
                        className="h-full w-auto object-contain p-4 transition-transform hover:scale-105"
                      />
                    ) : (
                      <BookOpen className="h-16 w-16 text-muted-foreground/30" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{book.description}</p>
                  <Link href={book.link} target="_blank">
                    <Button variant="link" className="text-blue-500 hover:text-blue-600 px-0 font-bold group">
                      View Book <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. JOURNALS & PUBLICATIONS */}
        <section className="mb-24" id="publications">
          <div className="flex items-center justify-center mb-12">
            <FileText className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-3xl font-black tracking-tight text-foreground">Journals & Publications</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journalPublications.map((pub) => (
              <Card key={pub.title} className="bg-card border border-border hover:shadow-xl transition-all duration-300 flex flex-col">
                <CardHeader className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="h-6 w-6 text-cyan-500" />
                    <Badge variant="secondary" className="bg-muted text-foreground font-bold">{pub.year}</Badge>
                  </div>
                  <CardTitle className="text-lg font-bold leading-tight mb-2">{pub.title}</CardTitle>
                  <p className="text-sm font-semibold text-blue-500">{pub.authors}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-4">{pub.description}</p>
                  <Link href={pub.link} target="_blank">
                    <Button variant="link" className="text-blue-500 hover:text-blue-600 px-0 font-bold group">
                      Read Paper <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. ONGOING CLINICAL STUDIES */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight text-foreground mb-4">Ongoing Clinical Studies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Current initiatives advancing the field of neurotechnology through rigorous validation and evidence-based development.
            </p>
          </div>
          <div className="space-y-8">
            {ongoingStudies.map((study) => (
              <Card key={study.title} className={`bg-gradient-to-r ${study.gradient} border-l-4 border-${study.color}-500 shadow-sm hover:shadow-md transition-all`}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle className="text-2xl font-black text-foreground">{study.title}</CardTitle>
                    <Badge className="w-fit bg-foreground text-background font-bold uppercase tracking-wider">{study.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 text-lg leading-relaxed mb-8">{study.description}</p>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="bg-background/40 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-foreground text-xs uppercase tracking-widest mb-1">Participants</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-bold">{study.participants}</p>
                    </div>
                    <div className="bg-background/40 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-foreground text-xs uppercase tracking-widest mb-1">Duration</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-bold">{study.duration}</p>
                    </div>
                    <div className="bg-background/40 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-foreground text-xs uppercase tracking-widest mb-1">Location</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-bold">{study.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 5. RESEARCH IMPACT */}
        <section className="bg-muted/50 border border-border rounded-3xl p-12 mb-24">
          <h2 className="text-3xl font-black tracking-tight text-center mb-12">Research Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-blue-500 mb-2">25+</div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Years of Research</p>
            </div>
            <div>
              <div className="text-4xl font-black text-cyan-500 mb-2">150+</div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Publications</p>
            </div>
            <div>
              <div className="text-4xl font-black text-violet-500 mb-2">5</div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Studies</p>
            </div>
            <div>
              <div className="text-4xl font-black text-emerald-500 mb-2">500+</div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Patients Enrolled</p>
            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION */}
        <div className="text-center bg-card border border-border rounded-3xl p-12 shadow-sm">
          <h2 className="text-3xl font-black tracking-tight text-foreground mb-6">Collaborate with Our Research Team</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed">
            Join our mission to advance neurotechnology through rigorous research. We welcome collaboration from clinicians, researchers, and academic institutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#104581] hover:bg-blue-900 text-white font-bold px-8 rounded-full">
              <Link href="/contact">Contact Research Team</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border hover:bg-muted font-bold px-8 rounded-full">
              <Link href="#publications">View Full Publications</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}