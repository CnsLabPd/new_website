import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Users,
} from "lucide-react"

const NEUROVIDYA_URL = "https://neurovidya.neurogati.com/"

export const metadata: Metadata = {
  title: "Neurovidya | Neuroscience Education by Neurogati",
  description:
    "Discover Neurovidya, Neurogati's learning platform for structured neuroscience courses, practical workshops, and collaborative learning.",
}

const learningPillars = [
  {
    icon: BookOpen,
    title: "Foundational courses",
    description:
      "Structured pathways make computational neuroscience, brain signals, neural dynamics, and related fundamentals easier to approach in sequence.",
    accent: "text-blue-600 dark:text-sky-400",
    border: "border-blue-500/40",
  },
  {
    icon: FlaskConical,
    title: "Practical learning",
    description:
      "Applied courses and workshops connect theory with scientific computing, signal analysis, modelling, and research methods that learners can use.",
    accent: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/40",
  },
  {
    icon: Users,
    title: "Learning community",
    description:
      "A shared platform supports learning across academic and professional backgrounds, with room for discussion, collaboration, and continued growth.",
    accent: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/40",
  },
]

const courseImages = [
  {
    src: "/neurovidya-ai-eeg.png",
    alt: "Introduction to EEG and Artificial Intelligence course artwork",
  },
  {
    src: "/neurovidya-neural-oscillators.png",
    alt: "Neural Oscillators course artwork",
  },
  {
    src: "/neurovidya-python.jpg",
    alt: "Python for Neuroscience course artwork",
  },
]

const currentCourses = [
  {
    title: "AI for EEG",
    description: "A beginner-friendly introduction to EEG, brain-signal processing, and AI-driven analysis.",
    structure: "5 chapters · 5 lessons",
  },
  {
    title: "Neural Oscillators",
    description: "Dynamical systems, nonlinear dynamics, emergent behaviour, and neural models from cells to populations.",
    structure: "4 chapters · 6 lessons",
  },
  {
    title: "AI for EEG Bootcamp",
    description: "A more extensive learning pathway through EEG and artificial intelligence.",
    structure: "7 chapters · 37 lessons",
  },
  {
    title: "Human Movement Analysis",
    description: "Motion capture, biomechanics, feature extraction, and AI methods that turn movement into meaningful data.",
    structure: "3 chapters · 3 lessons",
  },
  {
    title: "Python for Neuroscience",
    description: "Scientific-computing fundamentals taught through neuroscience-oriented programming applications.",
    structure: "4 chapters · 4 lessons",
  },
]

export default function NeurovidyaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[72svh] overflow-hidden border-b border-border bg-background">
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto flex min-h-[72svh] flex-col items-center justify-center px-6 py-20 text-center">
          <Image
            src="/neurovidya-logo.png"
            alt="Neurovidya"
            width={132}
            height={148}
            className="mb-7 h-28 w-auto object-contain md:h-32"
            priority
          />
          <p className="mb-4 text-sm font-bold uppercase text-[#1c82c2]">A Neurogati initiative</p>
          <h1 className="text-5xl font-black md:text-7xl">Neurovidya</h1>
          <p className="mt-5 max-w-2xl text-xl font-semibold leading-relaxed text-foreground/80 md:text-2xl">
            Bridging the gap in neuroscience education through structured learning and practical experience.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A dedicated learning platform for students, researchers, clinicians, engineers, and professionals exploring neuroscience and neurotechnology.
          </p>

          <div className="mt-9 flex w-full max-w-md flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <a
              href={NEUROVIDYA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#116da5] px-6 py-3 font-bold text-white transition-colors hover:bg-[#0d5a89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c82c2] focus-visible:ring-offset-2"
            >
              Explore Neurovidya
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <Link
              href="#about-neurovidya"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-bold transition-colors hover:bg-muted"
            >
              Learn more
              <ArrowDown className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section id="about-neurovidya" className="scroll-mt-24 py-20 md:py-28">
        <div className="container mx-auto grid gap-10 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:px-12">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-[#1c82c2]">About the platform</p>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              Complex brain science, made learnable.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
            <p>
              Neurovidya is Neurogati&apos;s dedicated education and training ecosystem for neuroscience. It brings courses, workshops, and learning resources into one place so learners can progress from core ideas to applied skills.
            </p>
            <p>
              The platform is designed to translate complex neural concepts without losing scientific rigour. Learners can build foundations, explore computational and experimental methods, and connect neuroscience with AI, engineering, medicine, psychology, and research.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase text-[#1c82c2]">How learning is organised</p>
            <h2 className="text-3xl font-black md:text-4xl">A connected learning ecosystem</h2>
          </div>

          <div className="grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
            {learningPillars.map(({ icon: Icon, title, description, accent, border }) => (
              <article key={title} className={`border-t-4 ${border} px-1 py-8 md:px-8`}>
                <Icon className={`mb-6 h-8 w-8 ${accent}`} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-bold uppercase text-[#1c82c2]">Learning in practice</p>
              <h2 className="text-3xl font-black md:text-5xl">Explore a growing catalogue</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Current subjects span brain signals and AI, neural dynamics, scientific programming, human movement, and other areas of neuroscience and neurotechnology.
              </p>
            </div>
            <a
              href={NEUROVIDYA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-[#116da5] hover:underline dark:text-sky-400"
            >
              View current offerings
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {courseImages.map((image) => (
              <figure key={image.src} className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="relative aspect-[760/420]">
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
              </figure>
            ))}
          </div>

          <div className="mt-14 border-t border-border pt-10">
            <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <h3 className="text-2xl font-bold">Current catalogue snapshot</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Course availability, prices, and offers can change. Confirm current details on Neurovidya before enrolling.
                </p>
              </div>
              <span className="text-sm font-semibold text-muted-foreground">Courses by Prof. Srinivasa Chakravarthy</span>
            </div>

            <div className="grid border-y border-border md:grid-cols-2">
              {currentCourses.map((course, index) => (
                <article
                  key={course.title}
                  className={`py-6 md:px-7 ${index % 2 === 0 ? "md:border-r md:border-border" : ""} ${index < currentCourses.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="mt-1 h-5 w-5 flex-shrink-0 text-[#1c82c2]" aria-hidden="true" />
                    <div>
                      <h4 className="font-bold">{course.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{course.description}</p>
                      <p className="mt-3 text-xs font-bold uppercase text-foreground/65">{course.structure}</p>
                    </div>
                  </div>
                </article>
              ))}
              <article className="border-t border-border py-6 md:col-span-2 md:px-7">
                <div className="flex items-start gap-4">
                  <GraduationCap className="mt-1 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">Book · 60 pages</p>
                    <h4 className="mt-1 font-bold">Whole and Its Parts</h4>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Prof. V Srinivasa Chakravarthy explores how humanity discovered what the brain does.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-[0.7fr_1.3fr]">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-[#1c82c2]" aria-hidden="true" />
              <h3 className="text-2xl font-bold">Who it serves</h3>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Neurovidya welcomes curious beginners and experienced learners alike, including students supplementing their studies, researchers strengthening technical skills, and professionals bringing neuroscience into their work.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-[#092f44] py-16 text-white md:py-20">
        <div className="container mx-auto flex flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center lg:px-12">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase text-amber-300">Start learning</p>
            <h2 className="text-3xl font-black md:text-4xl">Enter the Neurovidya learning platform</h2>
            <p className="mt-4 leading-7 text-white/75">
              Visit Neurovidya for the latest courses, workshops, schedules, pricing, and enrolment information.
            </p>
          </div>
          <a
            href={NEUROVIDYA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-[#092f44] transition-colors hover:bg-sky-100"
          >
            Visit Neurovidya
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  )
}
