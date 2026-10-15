import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, BookOpen, FlaskConical, Users } from "lucide-react"

const NEUROVIDYA_URL = "https://neurovidya.neurogati.com/"

export const metadata: Metadata = {
  title: "Neurovidya | Education & Research Training | Neurogati",
  description: "Explore Neurovidya's neuroscience courses, workshops and research training.",
}

const approaches = [
  { icon: BookOpen, title: "Learn the foundations", text: "Build a grounded understanding of brain science, neural dynamics, Python and AI through structured courses." },
  { icon: FlaskConical, title: "Put ideas into practice", text: "Move from concepts to scientific computing, brain-signal analysis and computational modelling." },
  { icon: Users, title: "Grow through research", text: "Explore workshops and research programmes that connect learners with applied questions and methods." },
]

const subjects = [
  { title: "AI for EEG", text: "An introduction to EEG, brain-signal processing and AI-driven analysis.", image: "/neurovidya-ai-eeg.png" },
  { title: "Neural Oscillators", text: "Neural dynamics and models from cells to populations.", image: "/neurovidya-neural-oscillators.png" },
  { title: "Python for Neuroscience", text: "Scientific-computing fundamentals through neuroscience applications.", image: "/neurovidya-python.jpg" },
]

export default function NeurovidyaPage() {
  return (
    <div className="editorial-page">
      <section className="site-shell editorial-hero">
        <div>
          <p className="editorial-eyebrow">Education & Research Training</p>
          <h1>Neurovidya</h1>
          <p className="editorial-lead">Explore the brain. Learn the methods. Build the confidence to investigate.</p>
          <p className="editorial-copy">Neurovidya brings structured neuroscience education, practical workshops and research-oriented learning together for students and professionals.</p>
          <div className="editorial-actions">
            <a href={NEUROVIDYA_URL} target="_blank" rel="noopener noreferrer" className="editorial-button">Open Neurovidya <ArrowUpRight size={18} aria-hidden="true" /></a>
            <Link href="/workshops" className="editorial-outline-button">Explore workshops <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="editorial-hero-visual">
          <Image src="/images/redesign/neurovidya.jpg" alt="Learners exploring neuroscience together" fill priority sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
        </div>
      </section>

      <section className="editorial-soft-section">
        <div className="site-shell editorial-section">
          <div className="editorial-section-intro">
            <p className="editorial-eyebrow">A connected learning path</p>
            <h2>From first questions to scientific practice</h2>
            <p>Our learning experiences make complex ideas approachable without losing their scientific depth.</p>
          </div>
          <div className="editorial-three-grid">
            {approaches.map(({ icon: Icon, title, text }, index) => (
              <article className="editorial-feature" key={title}>
                <span className="editorial-feature-number">0{index + 1}</span>
                <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell editorial-section">
        <div className="editorial-section-intro">
          <p className="editorial-eyebrow">What you can explore</p>
          <h2>Learn through courses, workshops and projects</h2>
          <p>Subjects span brain signals and AI, neural dynamics, programming and movement analysis. Availability may change; check Neurovidya for current course details.</p>
        </div>
        <div className="editorial-three-grid">
          {subjects.map((subject) => (
            <article className="editorial-image-card" key={subject.title}>
              <div className="editorial-image-card-art"><Image src={subject.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover" /></div>
              <div className="editorial-image-card-body">
                <h3>{subject.title}</h3>
                <p>{subject.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="editorial-inline-links">
          <Link href="/workshops" className="editorial-link">Browse live programmes <ArrowRight size={17} aria-hidden="true" /></Link>
          <a href={NEUROVIDYA_URL} target="_blank" rel="noopener noreferrer" className="editorial-link">Browse self-paced learning <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="editorial-callout">
        <div className="site-shell editorial-callout-inner">
          <div>
            <p className="editorial-eyebrow">Start learning</p>
            <h2>Where will your curiosity take you?</h2>
            <p>Explore current courses and pathways on the Neurovidya platform.</p>
          </div>
          <a href={NEUROVIDYA_URL} target="_blank" rel="noopener noreferrer" className="editorial-button">Visit Neurovidya <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </section>
    </div>
  )
}
