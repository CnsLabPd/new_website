import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FlaskConical, BookOpen, Beaker, Lightbulb, Users, FileText, ExternalLink, Brain, Zap, Network, PenTool, Activity, Heart, Waves, Cpu } from "lucide-react"
import Link from "next/link"
import { WavyBackground } from "@/components/ui/wavy-background"
import Image from "next/image";

const researchAreas = [
  // {
  //   icon: <Beaker className="h-8 w-8 text-blue-400" />,
  //   title: "Parkinson's Disease Modeling",
  //   description: "Advanced computational models to understand disease progression and optimize treatment strategies.",
  //   color: "blue",
  // },
  // {
  //   icon: <Lightbulb className="h-8 w-8 text-violet-400" />,
  //   title: "Cognitive Neuroscience",
  //   description: "Exploring brain mechanisms underlying cognition, learning, and neural plasticity.",
  //   color: "violet",
  // },
  // {
  //   icon: <Users className="h-8 w-8 text-green-400" />,
  //   title: "Neurorehabilitation Tools",
  //   description: "Developing innovative technologies for motor and cognitive rehabilitation therapies.",
  //   color: "green",
  // },
  {
    icon: <Brain className="h-8 w-8 text-blue-400" />,
    title: "Computational Neuroscience",
    description: "Developing simplified computational models of the brain to understand neural mechanisms and behaviors.",
    color: "blue",
  },
  {
    icon: <Zap className="h-8 w-8 text-purple-400" />,
    title: "Basal Ganglia Modeling",
    description: "Creating comprehensive models of basal ganglia for understanding Parkinson's disease and motor functions.",
    color: "purple",
  },
  {
    icon: <Network className="h-8 w-8 text-indigo-400" />,
    title: "MESOBRAIN Project",
    description: "Building a simplified whole brain model with 1-10 million neurons for robotics and AI applications.",
    color: "indigo",
  },
  {
    icon: <PenTool className="h-8 w-8 text-orange-400" />,
    title: "Handwriting Recognition",
    description: "Developing online handwriting recognition systems for Indian languages using computational approaches.",
    color: "orange",
  },
  {
    icon: <Activity className="h-8 w-8 text-red-400" />,
    title: "Neurovascular Coupling",
    description: "Modeling the interaction between neural activity and vascular responses in brain networks.",
    color: "red",
  },
  {
    icon: <Heart className="h-8 w-8 text-pink-400" />,
    title: "Translational Neuroscience",
    description: "Bridging computational models to clinical applications for neurological and neuropsychiatric disorders.",
    color: "pink",
  },
  {
    icon: <Waves className="h-8 w-8 text-teal-400" />,
    title: "Epilepsy Research",
    description: "Investigating network interactions in temporal lobe epilepsy using computational modeling approaches.",
    color: "teal",
  },
  {
    icon: <Cpu className="h-8 w-8 text-gray-400" />,
    title: "Neural Network Dynamics",
    description: "Studying oscillatory neural networks and their applications to sensory, motor, and cognitive functions.",
    color: "gray",
  }

]

const publishedPapers = [
  {
    title: "A Computational Model of Deep Brain Stimulation for Parkinson's Disease Tremor and Bradykinesia",
    authors: "Brain Sciences",
    year: "2024",
    icon: "BookOpen",
    link:"https://pubmed.ncbi.nlm.nih.gov/38928620/",
    description: "This study demonstrates how deep brain stimulation (DBS) approach—a widely used treatment for managing Parkinson's disease (PD) symptoms—can effectively alleviate motor disorders such as tremor and bradykinesia. Our computational model provides a detailed understanding of how DBS works and aids in identifying optimal stimulation parameters, such as frequency and amplitude, to maximize therapeutic benefit.",
  },
  {
    title: "A Multiscale, Systems-Level, Neuropharmacological Model of Cortico-Basal Ganglia System for Arm Reaching Under Normal, Parkinsonian, and Levodopa Medication Conditions",
    authors: "Frontiers in Computational Neuroscience",
    year: "2022",
    icon: "BookOpen",
    link:"https://pubmed.ncbi.nlm.nih.gov/35046787/",
    description: "To explore how dopamine loss leads to Parkinson's symptoms, we developed a multiscale computational model that links cellular degeneration in the brain to real-world motor behavior. By replacing abstract reward signals with biologically realistic dopamine dynamics, our model simulates arm-reaching tasks and predicts the effects of SNc cell loss and L-DOPA treatment. It replicates both therapeutic benefits and side effects, offering a potential tool for optimizing medication dosage based on individual patient profiles.",
  },
  {
    title: "A generalized reinforcement learning based deep neural network agent model for diverse cognitive constructs",
    authors: "Scientific Reports",
    year: "2023",
    icon: "BookOpen",
    link: "https://www.nature.com/articles/s41598-023-32234-y",
    description: "We've developed a unified reinforcement learning-based model that simulates key cognitive functions like attention, memory, decision-making, and inhibition. Unlike traditional approaches that study these abilities in isolation, our model captures them together—reflecting how cognitive impairments manifest in real life. It serves as a testbench to simulate therapeutic interventions before applying them in clinical settings.",
  },
  {
    title: "Feasibility and efficacy of virtual reality rehabilitation compared with conventional physiotherapy for upper extremity impairment due to ischaemic stroke: protocol for a randomised controlled trial",
    authors: "BMJ Open",
    year: "2024",
    icon: "BookOpen",
    link: "https://pubmed.ncbi.nlm.nih.gov/39043599/",
    description: "We're conducting a multicenter clinical trial to evaluate the effectiveness of our VR-based Comprehensive Rehabilitation Gaming System (VR-cRGS) for stroke survivors with upper limb impairments. The study compares VR-cRGS with conventional physiotherapy across 162 patients, assessing improvements in motor function, treatment compliance, and overall quality of life. Beyond functional recovery, the trial uses advanced brain imaging to measure how VR-driven rehab influences structural and functional brain plasticity—offering insight into how immersive, task-oriented therapy can reshape recovery after stroke.",
  },
]
const publishedBooks = [
  {
    title: "Computational Neuroscience Models of the Basal Ganglia",
    authors: "Springer",
    year: "2018",
    img: "/Computational Neuroscience Models of the Basal Ganglia-thumb.jpg",
    icon: "BookOpen",
    link: "https://link.springer.com/book/10.1007/978-981-10-8494-2",
    description: "The book presents computational models of basal ganglia-related disorders, including Parkinson's disease, schizophrenia, and addiction. Importantly, it highlights the applications of understanding the role of the basal ganglia to treat neurological and psychiatric disorders."
  },
  {
    title: "Demystifying the Brain",
    authors: "Springer",
    year: "2018",
    img: "/Demystifying the Brain-thumb.jpg",
    icon: "BookOpen",
    link: "https://link.springer.com/book/10.1007/978-981-13-3320-0",
    description: "This book presents an emerging new vision of the brain, which is essentially expressed in computational terms, for non-experts. As such, it presents the fundamental concepts of neuroscience in simple language, without overwhelming non-biologists with excessive biological jargon. In addition, the book presents a novel computational perspective on the brain for biologists, without resorting to complex mathematical equations. It addresses a comprehensive range of topics, starting with the history of neuroscience, the function of the individual neuron, the various kinds of neural network models that can explain diverse neural phenomena, sensory-motor function, language, emotions, and concluding with the latest theories on consciousness."
  }
]

const ongoingStudies = [
  {
    title: "Telerehabilitation for Post-Stroke Recovery",
    description: "Using cRGS™ to improve motor outcomes in stroke survivors through remote, gamified therapy sessions.",
    status: "Ongoing",
    participants: "Target: 150 patients",
    duration: "18 months",
    location: "Multi-center study",
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    title: "AI-Driven Gait Assessment for Parkinson's Disease",
    description: "Validating our AI-powered diagnostic tools against amber-standard clinical gait analysis tests.",
    status: "Ongoing",
    participants: "Target: 200 patients",
    duration: "24 months",
    location: "Multi-center study",
    color: "violet",
    gradient: "from-violet-500/20 to-violet-600/20",
  },
]

export default function ResearchPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
      <WavyBackground
        colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]}
        waveWidth={60}
        blur={10}
        speed="fast"
        waveOpacity={0.3}
        containerClassName="h-[60vh] relative"
        className="max-w-4xl mx-auto"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black dark:text-white mb-6">Research at Neurogati</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
            Bridging the gap between computational theory and clinical application through rigorous research and
            evidence-based innovation in neurotechnology.
          </p>
        </div>
      </WavyBackground>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Research Areas */}
        <section className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <FlaskConical className="h-8 w-8 text-amber-400 mr-3" />
            <h2 className="text-3xl font-bold text-black dark:text-white">Our Research Areas</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => (
              <Card
                key={area.title}
                className="bg-card border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">{area.icon}</div>
                  <CardTitle className="text-xl font-semibold text-black dark:text-white">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Published Papers */}
        <section className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <FileText className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold text-black dark:text-white" id={"publications"}>Published Papers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {publishedPapers.map((book, index) => (
              <Card
                key={book.title}
                className="bg-card border border-border hover:shadow-xl transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                      {book.year}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-black dark:text-white leading-tight">
                    {book.title}
                  </CardTitle>
                  <p className="text-sm text-blue-400">{book.authors}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{book.description}</p>
                  <Link href={book.link} target={"_blank"}>
                    <Button
                      variant="link"
                      className="text-amber-400 hover:text-amber-300 px-0 mt-3 group-hover:translate-x-1 transition-transform"
                    >
                      Read Paper <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Published Books */}
        <section className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <BookOpen className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold text-black dark:text-white">Published Books</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {publishedBooks.map((book, index) => (
                <Card
                    key={book.title}
                    className="bg-card border border-border hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <BookOpen className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                        {book.year}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold text-black dark:text-white leading-tight">
                      {book.title}
                    </CardTitle>
                    <p className="text-sm text-blue-400">{book.authors}</p>
                    <div className="flex items-center justify-between pt-4">
                      <Image src={book.img} alt={book.title} width={80} height={60} className="h-80 w-60 rounded-xl" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{book.description}</p>
                    <Link href={book.link} target={"_blank"}>
                      <Button
                          variant="link"
                          className="text-amber-400 hover:text-amber-300 px-0 mt-3 group-hover:translate-x-1 transition-transform"
                      >
                        Read Book <ExternalLink className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                    </CardContent>
                </Card>
            ))}
          </div>
        </section>

        {/* Ongoing Clinical Studies */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ongoing Clinical Studies</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our current research initiatives are advancing the field of neurotechnology through rigorous clinical
              validation and evidence-based development.
            </p>
          </div>
          <div className="space-y-8">
            {ongoingStudies.map((study, index) => (
              <Card
                key={study.title}
                className={`bg-gradient-to-r ${study.gradient} border-l-4 border-${study.color}-500 shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl font-bold text-black dark:text-white mb-2">{study.title}</CardTitle>
                      <Badge
                        className={
                          study.color === "blue"
                            ? "bg-blue-900/50 text-blue-300 border-blue-500/50"
                            : study.color === "violet"
                              ? "bg-violet-900/50 text-violet-300 border-violet-500/50"
                              : study.color === "green"
                                ? "bg-green-900/50 text-green-300 border-green-500/50"
                                : "bg-amber-900/50 text-amber-300 border-amber-500/50"
                        }
                      >
                        {study.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">{study.description}</p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-black dark:text-white mb-1">Participants</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{study.participants}</p>
                    </div>
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-black dark:text-white mb-1">Duration</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{study.duration}</p>
                    </div>
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-black dark:text-white mb-1">Location</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{study.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Research Impact */}
        <section className="bg-muted rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-black dark:text-white text-center mb-8">Research Impact</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">25+</div>
              <p className="text-gray-600 dark:text-gray-400">Years of Research</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-violet-400 mb-2">150+</div>
              <p className="text-gray-600 dark:text-gray-400">Publications</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400 mb-2">5</div>
              <p className="text-gray-600 dark:text-gray-400">Active Studies</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
              <p className="text-gray-600 dark:text-gray-400">Patients Enrolled</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-900/20 via-violet-900/20 to-amber-900/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Collaborate with Our Research Team</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            Join our mission to advance neurotechnology through rigorous research. Whether you're a clinician,
            researcher, or institution, we welcome collaboration opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <Link href="/contact">Contact Research Team</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-violet-400 text-violet-400 hover:bg-violet-900/20 hover:text-violet-300 bg-transparent"
            >
              <Link href="#publications">View Publications</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
