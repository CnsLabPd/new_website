import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

const NEUROVIDYA_URL = "https://neurovidya.neurogati.com/"

export const metadata: Metadata = {
  title: "Neurovidya | Courses, Workshops & Books | Neurogati",
  description: "Explore Neurovidya courses, live workshops and neuroscience books for learners and professionals.",
}

const learningOptions = [
  {
    title: "Courses",
    eyebrow: "Learn at your pace",
    description: "Choose self-paced learning, instructor-led courses or certificate programmes across neuroscience, AI, Python and movement analysis.",
    image: "/images/redesign/programme-neurovidya.jpg",
    href: "/neurovidya/courses",
    link: "Explore course categories",
  },
  {
    title: "Workshops",
    eyebrow: "Learn together",
    description: "Join focused, practical learning experiences that bring neuroscience concepts, methods and data to life. Current schedules and enrolment are on the Neurovidya platform.",
    image: "/images/redesign/neurovidya.jpg",
    href: NEUROVIDYA_URL,
    link: "Browse workshops",
  },
  {
    title: "Books",
    eyebrow: "Go deeper",
    description: "Explore books and learning resources that make brain science and computational neuroscience accessible to curious learners and practitioners.",
    image: "/images/redesign/neuron.jpg",
    href: "/neurovidya/books",
    link: "Explore books",
  },
]

export default function NeurovidyaPage() {
  return (
    <div className="editorial-page">
      <section className="site-shell editorial-hero">
        <div>
          <p className="editorial-eyebrow">Education & research training</p>
          <h1>Neurovidya</h1>
          <p className="editorial-lead">Explore the brain. Learn the methods. Build the confidence to investigate.</p>
          <p className="editorial-copy">A learning space for neuroscience courses, practical workshops and books—bringing scientific ideas closer to students, researchers and professionals.</p>
          <div className="editorial-actions">
            <a href={NEUROVIDYA_URL} target="_blank" rel="noopener noreferrer" className="editorial-button">Visit Neurovidya <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="editorial-hero-visual">
          <Image src="/images/redesign/neurovidya.jpg" alt="Learners exploring neuroscience together" fill priority sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
        </div>
      </section>

      <section className="editorial-soft-section">
        <div className="site-shell editorial-section">
          <div className="editorial-section-intro">
            <p className="editorial-eyebrow">Learn with Neurovidya</p>
            <h2>Three ways to explore brain science</h2>
            <p>Find a format that fits what you want to learn, how you want to learn it, and where you are starting from.</p>
          </div>
          <div className="editorial-three-grid">
            {learningOptions.map(({ title, eyebrow, description, image, href, link }) => (
              <article className="editorial-image-card neurovidya-option" key={title}>
                <Link href={href} className="editorial-image-card-art neurovidya-option-art" aria-label={link}>
                  <Image src={image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover" />
                </Link>
                <div className="editorial-image-card-body">
                  <p className="editorial-eyebrow">{eyebrow}</p>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="editorial-link mt-5">
                    {link} {href.startsWith("http") ? <ArrowUpRight size={17} aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-callout">
        <div className="site-shell editorial-callout-inner">
          <div>
            <p className="editorial-eyebrow">Start learning</p>
            <h2>Where will your curiosity take you?</h2>
            <p>See current course offerings, schedules and enrolment details on the Neurovidya platform.</p>
          </div>
          <a href={NEUROVIDYA_URL} target="_blank" rel="noopener noreferrer" className="editorial-button">Open Neurovidya <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </section>
    </div>
  )
}
