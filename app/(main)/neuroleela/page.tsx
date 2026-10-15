import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Activity, Gamepad2, HeartPulse } from "lucide-react"

export const metadata: Metadata = {
  title: "Neuroleela | Movement, Monitoring & Rehabilitation | Neurogati",
  description: "Explore Qumon-PD, Kaylo Gaming Platform and the CP Clinic platform from Neurogati.",
}

const platforms = [
  {
    title: "Qumon-PD",
    category: "Parkinson’s monitoring",
    description: "A movement-focused platform that supports quantitative monitoring for Parkinson’s disease.",
    image: "/images/redesign/qumon-pd-card-illustrated.jpg",
    href: "/neurodiagnostics",
    icon: Activity,
    status: "Explore platform",
  },
  {
    title: "Kaylo Gaming Platform",
    category: "Movement through play",
    description: "Interactive games for movement, engagement and rehabilitation-oriented activities.",
    image: "/images/redesign/kaylo-card-illustrated.jpg",
    href: "/gamingcategories",
    icon: Gamepad2,
    status: "Explore games",
  },
  {
    title: "CP Clinic",
    category: "Gait analysis",
    description: "Video-based gait analysis and longitudinal motor monitoring for clinical and home settings.",
    image: "/images/redesign/cp-clinic-card-illustrated.jpg",
    href: "/cp-clinic",
    icon: HeartPulse,
    status: "Coming soon",
  },
]

export default function NeuroleelaPage() {
  return (
    <div className="editorial-page">
      <section className="site-shell editorial-hero">
        <div>
          <p className="editorial-eyebrow">Movement, Monitoring & Rehabilitation</p>
          <h1>Neuroleela</h1>
          <p className="editorial-lead">Exploring movement through science, play and careful observation.</p>
          <p className="editorial-copy">Neuroleela brings together Neurogati’s movement-focused platforms: quantitative monitoring, interactive games, gait analysis and rehabilitation-support tools.</p>
          <div className="editorial-actions">
            <Link href="#platforms" className="editorial-button">Explore the platforms <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link href="/contact" className="editorial-outline-button">Talk to us <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="editorial-hero-visual">
          <Image src="/images/redesign/neuroleela.jpg" alt="A physiotherapist guiding a movement exercise" fill priority sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
        </div>
      </section>

      <section id="platforms" className="editorial-soft-section scroll-mt-24">
        <div className="site-shell editorial-section">
          <div className="editorial-section-intro">
            <p className="editorial-eyebrow">The Neuroleela ecosystem</p>
            <h2>Three ways to understand and support movement</h2>
            <p>Explore each platform for its current availability and purpose.</p>
          </div>
          <div className="neuroleela-grid">
            {platforms.map(({ title, category, description, image, href, icon: Icon, status }) => (
              <article className="neuroleela-card" key={title}>
                <Link href={href} className="neuroleela-card-image" aria-label={`View ${title}`}>
                  <Image src={image} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" className="object-cover" />
                </Link>
                <div className="neuroleela-card-body">
                  <div className="flex items-center justify-between gap-4">
                    <span className="editorial-eyebrow">{category}</span>
                    <Icon size={23} strokeWidth={1.5} className="text-[var(--site-teal)]" aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Link href={href} className="editorial-link mt-5">{status === "Coming soon" ? "Learn more" : status} <ArrowRight size={17} aria-hidden="true" /></Link>
                  {status === "Coming soon" && <span className="neuroleela-status">Coming soon</span>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-callout">
        <div className="site-shell editorial-callout-inner">
          <div>
            <p className="editorial-eyebrow">Collaborate with Neurogati</p>
            <h2>Bring movement science into practice.</h2>
            <p>Ask about product demos, clinical collaborations, institutional pilots or research partnerships.</p>
          </div>
          <Link href="/contact" className="editorial-button">Get in touch <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  )
}
