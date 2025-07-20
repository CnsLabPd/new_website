import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail, BookOpen, GraduationCap, Award, Users } from "lucide-react"
import Link from "next/link"
import { WavyBackground } from "@/components/ui/wavy-background"

const founders = [
  {
    name: "Prof. Srinivasa Chakravarthy",
    title: "Co-founder & Chief Scientist",
    role: "Neuroscientist at IIT Madras",
    experience: "25+ years of research",
    bio: "A distinguished neuroscientist at IIT Madras with over 25 years of research experience. Head of the Computational Neuroscience Lab and author of several acclaimed books on computational neuroscience and basal ganglia modeling. His pioneering work bridges theoretical neuroscience with practical applications in neurological disorders.",
    specialties: [
      "Computational Neuroscience",
      "Basal Ganglia Modeling",
      "Parkinson's Disease Research",
      "Neural Networks",
    ],
    achievements: [
      "Head of CNS Lab at IIT Madras",
      "Author of multiple research publications",
      "Expert in computational modeling",
      "Pioneer in neurotechnology applications",
    ],
    image: "/placeholder.svg?height=300&width=300&text=Prof.+Chakravarthy",
    color: "blue",
    linkedin: "https://www.linkedin.com/in/srinivasa-chakravarthy-a09b5131/",
    mailto: "mailto:schakra@ee.iitm.ac.in",
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    name: "Dr. Indira Chaturvedi",
    title: "Co-founder & Chief Medical Officer",
    role: "Pediatrician with MD from Bronx-Lebanon Hospital",
    experience: "20+ years of clinical work",
    bio: "A seasoned pediatrician with an MD from Bronx-Lebanon Hospital, NY. Brings over 20 years of clinical expertise to bridge the gap between cutting-edge technology and patient care. Her deep understanding of clinical workflows ensures that Neurogati's innovations are practical and patient-centered.",
    specialties: ["Pediatric Medicine", "Clinical Research", "Patient Care", "Medical Technology Integration"],
    achievements: [
      "MD from Bronx-Lebanon Hospital, NY",
      "20+ years clinical experience",
      "Expert in pediatric neurology",
      "Clinical research coordinator",
    ],
    image: "/placeholder.svg?height=300&width=300&text=Dr.+Chaturvedi",
    color: "violet",
    linkedin: "",
    mailto: "mailto:",
    gradient: "from-violet-500/20 to-violet-600/20",
  },
]

const experts = [
  {
    name: "Mr. Shrinivas Sesadri",
    title: "AI Architect",
    role: "Lead AI & Machine Learning",
    bio: "Shrinivas Sesadri is an AI Architect at NeuroGati, where he integrates large language models and multimodal learning to develop brain-inspired intelligent systems. He applies these approaches to create solutions in spatial reasoning, computer vision, and scalable health-tech applications. Proficient in Python, PyTorch, and React Native, he combines rigorous engineering with creative explorations in 3D art, photography, and music. Driven by a vision to fuse computational neuroscience with human-aligned AI, he aims to build adaptive systems that advance clinical care and expand the frontiers of creative expression.",
    specialties: ["Large Language Models", "Scalable Systems", "Multimodal AI"],
    image: "/placeholder.svg?height=250&width=250&text=Shrinivas+S",
    color: "amber",
    linkedin: "https://www.linkedin.com/in/shrinivassesadri/",
    mailto: "mailto:shrini1908@gmail.com"
  },
  {
    name: "Ms. Manaswini Sundaresan",
    title: "Founding Engineer",
    role: "Software Development & Engineering",
    bio: "Manaswini Sundaresan is a founding engineer at Neurogati, where she builds full-stack neurotechnology solutions translating academic research into real-world impact. With a robust background in computer science and prior experience at Verizon, she bridges rigorous engineering with deep domain insight, building scalable, patient-centric tools for clinical care. Driven by a passion for computational neuroscience, she began as a research associate in IITM and later transitioned into a research software engineer, particularly focusing on neurodegenerative diseases, with Parkinson’s Disease (PD) and Alzheimer’s Disease (PD) at the forefront. Her work spans across product design, system architecture, cross-platform development, and applied machine learning.",
    specialties: ["Full-Stack Development", "Applied Machine Learning", "System Architecture", "Scalable Systems"],
    image: "/placeholder.svg?height=250&width=250&text=Manaswini+S",
    color: "green",
    linkedin: "https://www.linkedin.com/in/manaswini-sundaresan/",
    mailto: "mailto:manaswinisundaresan@gmail.com"
  },
]

export default function TeamPage() {
  return (
    <>
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
          <h1 className="text-4xl md:text-6xl font-extrabold text-black dark:text-white mb-6">Meet the Team</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
            A passionate group of scientists, engineers, and clinicians dedicated to revolutionizing neurological care
            through innovative technology and compassionate patient-centered solutions.
          </p>
        </div>
      </WavyBackground>

      <div className="bg-background text-foreground min-h-screen pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          {/* Founders Section */}
          <section className="mb-20">
            <div className="flex items-center justify-center mb-12">
              <Users className="h-8 w-8 text-amber-400 mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Our Founders</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              {founders.map((founder, index) => (
                <Card
                  key={founder.name}
                  className={`bg-gradient-to-br ${founder.gradient} border border-border shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2`}
                >
                  <CardHeader className="text-center pb-6">
                    <div className="relative mx-auto mb-6">
                      <div
                        className={`w-40 h-40 mx-auto rounded-full border-4 ${
                          founder.color === "blue"
                            ? "border-blue-500"
                            : founder.color === "violet"
                              ? "border-violet-500"
                              : founder.color === "green"
                                ? "border-green-500"
                                : "border-amber-500"
                        } p-1 bg-muted flex items-center justify-center`}
                      >
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                          <Users className="h-16 w-16 text-muted-foreground" />
                        </div>
                      </div>
                      <div
                        className={`absolute -bottom-2 -right-2 w-12 h-12 ${
                          founder.color === "blue"
                            ? "bg-blue-500"
                            : founder.color === "violet"
                              ? "bg-violet-500"
                              : founder.color === "green"
                                ? "bg-green-500"
                                : "bg-amber-500"
                        } rounded-full flex items-center justify-center`}
                      >
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground mb-2">{founder.name}</CardTitle>
                    <p className={`text-${founder.color}-400 font-semibold text-lg mb-2`}>{founder.title}</p>
                    <p className="text-muted-foreground text-sm">{founder.role}</p>
                    <Badge variant="secondary" className="mt-2 pt-4 pb-4 pl-4 bg-muted text-muted-foreground">
                      {founder.experience}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-card-foreground leading-relaxed">{founder.bio}</p>

                    <div>
                      <h4 className="text-foreground font-semibold mb-3 flex items-center">
                        <Award className="h-4 w-4 mr-2 text-amber-400" />
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {founder.specialties.map((specialty) => (
                          <Badge
                            key={specialty}
                            variant="outline"
                            className={`border-${founder.color}-500/50 text-${founder.color}-700 dark:text-${founder.color}-400 bg-${founder.color}-900/20`}
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-foreground font-semibold mb-3 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-amber-400" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {founder.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-muted-foreground text-sm flex items-start">
                            <div
                              className={`w-2 h-2 ${
                                founder.color === "blue"
                                  ? "bg-blue-400"
                                  : founder.color === "violet"
                                    ? "bg-violet-400"
                                    : founder.color === "green"
                                      ? "bg-green-400"
                                      : "bg-amber-400"
                              } rounded-full mt-2 mr-3 flex-shrink-0`}
                            ></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border/50">
                      <Link href={founder.linkedin} target={"_blank"}>
                        <Button
                          size="sm"
                          variant="outline"
                          className={`border-${founder.color}-500/50 text-${founder.color}-400 hover:bg-${founder.color}-900/20`}
                        >
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                      </Link>
                      <Link href={founder.mailto} target={"_blank"}>
                        <Button
                          size="sm"
                          variant="outline"
                          className={`border-${founder.color}-500/50 text-${founder.color}-400 hover:bg-${founder.color}-900/20`}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Experts Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Experts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Talented professionals bringing diverse expertise in AI, engineering, and technology development.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experts.map((expert, index) => (
                <Card
                  key={expert.name}
                  className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-32 h-32 mx-auto mb-4 rounded-full border-4 ${
                        expert.color === "blue"
                          ? "border-blue-500"
                          : expert.color === "violet"
                            ? "border-violet-500"
                            : expert.color === "green"
                              ? "border-green-500"
                              : "border-amber-500"
                      } p-1 bg-muted group-hover:scale-105 transition-transform duration-300 flex items-center justify-center`}
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                        <Users className="h-12 w-12 text-muted-foreground" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground mb-2">{expert.name}</CardTitle>
                    <p className={`text-${expert.color}-400 font-semibold mb-1`}>{expert.title}</p>
                    <p className="text-muted-foreground text-sm">{expert.role}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-card-foreground text-sm leading-relaxed text-justify">{expert.bio}</p>

                    <div>
                      <h4 className="text-foreground font-semibold mb-2 text-sm">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {expert.specialties.map((specialty) => (
                          <Badge
                            key={specialty}
                            variant="outline"
                            className={`text-xs border-${expert.color}-500/50 text-${expert.color}-400 bg-${expert.color}-900/20`}
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-border/50">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-${expert.color}-400 hover:text-${expert.color}-300 hover:bg-${expert.color}-900/20 p-2`}
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-${expert.color}-400 hover:text-${expert.color}-300 hover:bg-${expert.color}-900/20 p-2`}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Join Our Team Card */}
              <Card className="bg-gradient-to-br from-muted/50 to-muted border-2 border-dashed border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-center items-center text-center p-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-dashed border-border flex items-center justify-center bg-muted/50">
                  <Users className="h-16 w-16 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground mb-4">Join Our Team</CardTitle>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  We're always looking for passionate individuals to join our mission of revolutionizing neurological
                  care.
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/careers">View Open Positions</Link>
                </Button>
              </Card>
            </div>
          </section>

          {/* Team Stats */}
          <section className="bg-muted rounded-2xl p-8 mb-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Our Team by Numbers</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">45+</div>
                <p className="text-muted-foreground">Years Combined Experience</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-violet-400 mb-2">200+</div>
                <p className="text-muted-foreground">Research Publications</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400 mb-2">5</div>
                <p className="text-muted-foreground">Patents Filed</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">10+</div>
                <p className="text-muted-foreground">Awards & Recognition</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-900/20 via-violet-900/20 to-amber-900/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Want to Work With Us?</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8 leading-relaxed">
              Join our team of passionate researchers, engineers, and clinicians working to transform neurological
              healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                <Link href="/careers">View Career Opportunities</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-violet-400 text-violet-400 hover:bg-violet-900/20 hover:text-violet-300 bg-transparent"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
