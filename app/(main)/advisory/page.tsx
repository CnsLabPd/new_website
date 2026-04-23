"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { GraduationCap, Microscope, Rocket, Building2, ArrowRight, CheckCircle2, Mail } from "lucide-react"
import { DynamicMagneticButton } from "@/utils/DynamicMagneticButton"

const GRADIENT_BUTTON_CLASS = "bg-gradient-to-br from-blue-600 via-blue-400 to-blue-600 px-10 font-semibold text-white py-2 rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-base"

const audiences = [
  {
    id: "students",
    icon: GraduationCap,
    title: "Students & Career Transitions",
    description: "AI / engineering → neuroscience | Medicine → computational approaches | Exploring neurotech pathways",
    outcome: "Clear learning roadmap",
    color: "from-cyan-500 to-blue-500",
    examples: [
      "I'm a software engineer interested in neuroscience. Where do I start?",
      "How can I transition from medicine to computational neuroscience?",
      "What skills do I need to work in neurotech?"
    ]
  },
  {
    id: "research",
    icon: Microscope,
    title: "Research & Academic Work",
    description: "PhD students, early researchers | Experiment design, modeling, tool development",
    outcome: "Problem clarity and methodological direction",
    color: "from-violet-500 to-purple-500",
    examples: [
      "How do I design a robust EEG experiment for motor imagery?",
      "What's the best approach to model seizure dynamics?",
      "Which tools should I use for neural signal analysis?"
    ]
  },
  {
    id: "startups",
    icon: Rocket,
    title: "Startups & Product Teams",
    description: "Neurotech / healthtech founders | Product positioning and validation",
    outcome: "Clear problem definition and positioning",
    color: "from-orange-500 to-red-500",
    examples: [
      "How do I validate my BCI product idea?",
      "What regulatory pathway should I consider for my diagnostic tool?",
      "How can I differentiate in the neurorehab space?"
    ]
  },
  {
    id: "clinical",
    icon: Building2,
    title: "Clinical & Applied Contexts",
    description: "Rehab centers | Assessment and monitoring systems",
    outcome: "System-level design direction",
    color: "from-green-500 to-emerald-500",
    examples: [
      "How can we implement objective progress tracking in our rehab center?",
      "What metrics should we use for stroke recovery assessment?",
      "How do we integrate technology into clinical workflows?"
    ]
  }
]

const processSteps = [
  { step: "1", title: "Submit your query", description: "Share your well-defined question or problem through our form" },
  { step: "2", title: "Problem scoping", description: "We analyze and scope your query to ensure focused guidance" },
  { step: "3", title: "Structured advisory response", description: "Receive a detailed, actionable response to move forward with clarity" }
]

const faqs = [
  {
    question: "What makes Advisory different from workshops or courses?",
    answer: "Advisory is problem-specific guidance, not a full course. You bring a focused question, and we provide structured direction to solve it. Workshops are broader educational experiences."
  },
  {
    question: "How long does it take to receive a response?",
    answer: "After submission and scoping, most advisory responses are delivered within 3-5 business days, depending on the complexity of the query."
  },
  {
    question: "Can I get a refund if the advisory doesn't meet my expectations?",
    answer: "We offer a satisfaction guarantee. If the advisory response doesn't provide the clarity you need, we'll revise it or provide a full refund for paid consultations."
  },
  {
    question: "What if I need ongoing mentorship instead of one-time guidance?",
    answer: "Advisory is designed for focused guidance. For long-term mentorship, we can discuss customized arrangements after your initial advisory session."
  },
  {
    question: "Who will be providing the advisory?",
    answer: "Our advisory team consists of experts from computational neuroscience, neurotech development, and clinical applications with backgrounds from leading research institutions."
  },
  {
    question: "What does 'well-defined question' mean?",
    answer: "A well-defined question is specific, actionable, and scoped. Instead of 'Tell me about neuroscience,' ask 'What's the best approach to model dopamine dynamics in Parkinson's disease?'"
  }
]

export default function AdvisoryPage() {

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-24 overflow-hidden bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Advisory
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-medium mb-4">
            Structured guidance for learning, research, and building in neuroscience
          </p>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-foreground/80 leading-relaxed">
            Neuroscience sits at the intersection of biology, engineering, and computation. Many learners, researchers, and founders struggle with unclear pathways, fragmented knowledge, or poorly defined problems.
          </p>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-foreground/80 leading-relaxed mt-4 font-semibold">
            Advisory is designed to address this gap.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* 2. HOW IT WORKS */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">How it works</h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                    <span className="text-2xl font-black text-white">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-black mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-600/50 to-violet-600/50" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. WHO IS THIS FOR */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Who is this for?</h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {audiences.map((audience) => (
              <Card key={audience.id} className="relative overflow-hidden border-2 border-border hover:shadow-xl transition-all">
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${audience.color}`} />
                <CardHeader>
                  <div className="flex items-start gap-4 mb-2">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${audience.color}`}>
                      <audience.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-grow">
                      <CardTitle className="text-xl font-black tracking-tight mb-2">
                        {audience.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium">
                        {audience.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Outcome: {audience.outcome}</span>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Example Queries:</p>
                    <ul className="space-y-2">
                      {audience.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span className="italic">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 4. SUBMIT YOUR QUERY FORM */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Submit Your Query</h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4 mx-auto"></div>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              You bring a well-defined question. You receive a structured, problem-focused response to move forward with clarity.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto border-2 border-blue-500/30 bg-blue-500/[0.02]">
            <CardContent className="pt-8 pb-8 text-center">
              <Mail className="h-16 w-16 mx-auto mb-6 text-blue-500" />
              <p className="text-lg text-foreground/80 leading-relaxed mb-8 max-w-xl mx-auto">
                Click the button below to fill out our advisory query form. We'll review your submission and respond within 3-5 business days.
              </p>
              <DynamicMagneticButton>
                <a
                  href="https://forms.gle/PLBEz2ezbVbMwn1C7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={GRADIENT_BUTTON_CLASS}
                >
                  Open Advisory Form
                  <ArrowRight className="h-5 w-5" />
                </a>
              </DynamicMagneticButton>
              <p className="text-sm text-muted-foreground italic mt-6">
                <strong>Note:</strong> Advisory is for focused, problem-specific guidance. It is not a substitute for full courses or long-term mentorship.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 5. PRICING */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Pricing</h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4 mx-auto"></div>
          </div>

          <Card className="max-w-2xl mx-auto border-2 border-border">
            <CardContent className="pt-8">
              <div className="space-y-6 text-center">
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Advisory is structured based on the nature of the problem:
                </p>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="font-bold text-base mb-1">Introductory Advisory</p>
                    <p className="text-sm text-muted-foreground">Limited, complimentary</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="font-bold text-base mb-1">Research Advisory</p>
                    <p className="text-sm text-muted-foreground">Pricing shared after scope assessment</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="font-bold text-base mb-1">Startup / Product Advisory</p>
                    <p className="text-sm text-muted-foreground">Pricing shared after scope assessment</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic pt-4">
                  Pricing is shared after understanding the scope of your specific problem.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 6. FAQ */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Frequently Asked Questions</h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4 mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-2 border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-bold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* 7. CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-2 border-blue-500/50 bg-gradient-to-br from-blue-500/5 to-violet-500/5">
            <CardContent className="pt-8 pb-8">
              <Mail className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-black mb-4">Ready to get clarity?</h3>
              <p className="text-muted-foreground mb-6">
                Submit your well-defined question and receive structured guidance to move forward.
              </p>
              <DynamicMagneticButton>
                <a
                  href="https://forms.gle/PLBEz2ezbVbMwn1C7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={GRADIENT_BUTTON_CLASS}
                >
                  Submit Your Query
                  <ArrowRight className="h-5 w-5" />
                </a>
              </DynamicMagneticButton>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
