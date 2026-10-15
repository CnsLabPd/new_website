import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

const pillars = [
  {
    name: "Neurovidya",
    subtitle: "Education & Research Training",
    detail: "Courses · Workshops · Research projects",
    href: "/neurovidya",
    image: "/images/redesign/neurovidya.jpg",
    alt: "Learners exploring neuroscience together",
  },
  {
    name: "Neuroshiksha",
    subtitle: "Children’s Learning & Development",
    detail: "Akshara · Early learning · Schools",
    href: "/neuroshiksha",
    image: "/images/redesign/akshara-home.jpg",
    alt: "Children learning through hands-on play",
  },
  {
    name: "Neuroleela",
    subtitle: "Movement, Monitoring & Rehabilitation",
    detail: "Kael Gaming Platform · CP Clinic · Qumon-PD",
    href: "/neuroleela",
    image: "/images/redesign/neuroleela.jpg",
    alt: "A rehabilitation professional supporting movement practice",
  },
]

export default function HomePage() {
  return (
    <div className="redesign-home">
      <section className="home-hero site-shell">
        <div className="home-hero-copy">
          <p className="editorial-eyebrow">Brain science in everyday life</p>
          <h1>Empowering<br />Brains</h1>
          <p className="home-hero-lead">Brain science for learning, development and recovery.</p>
          <p className="home-hero-description">
            Explore our programmes in education, children’s learning and movement.
          </p>
          <Link href="#discover" className="editorial-button">
            Explore Neurogati <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="home-hero-art">
          <Image
            src="/images/redesign/hero.jpg"
            alt="Illustration of the brain connecting learning, childhood development and rehabilitation"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 62vw"
            className="object-contain object-center"
          />
        </div>
      </section>

      <section id="discover" className="site-shell home-section scroll-mt-24">
        <div className="home-section-heading">
          <p className="editorial-eyebrow">Discover Neurogati</p>
          <h2>Discover Neurogati</h2>
          <p>Three pillars. One scientific foundation.</p>
        </div>
        <div className="home-pillar-grid">
          {pillars.map((pillar) => (
            <article className="home-pillar-card" key={pillar.name}>
              <Link href={pillar.href} className="home-image-link" aria-label={`Explore ${pillar.name}`}>
                <Image src={pillar.image} alt={pillar.alt} fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <h3>{pillar.name}</h3>
              <p className="home-card-subtitle">{pillar.subtitle}</p>
              <p className="home-card-detail">{pillar.detail}</p>
              <Link href={pillar.href} className="editorial-link">
                Explore {pillar.name} <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-science-banner">
        <div className="site-shell home-science-inner">
          <div>
            <p className="editorial-eyebrow">Our foundation</p>
            <h2>Rooted in Computational Neuroscience</h2>
            <p className="home-banner-lead">Understanding the brain guides everything we build.</p>
            <p>Our models connect brain research with education, learning tools and movement technologies.</p>
            <Link href="/modelling" className="editorial-link mt-5 inline-flex">
              Explore our modelling work <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="home-science-art">
            <Image src="/images/redesign/neuron.jpg" alt="A branching neuron illustration" fill sizes="(max-width: 800px) 100vw, 42vw" className="object-contain" />
          </div>
        </div>
      </section>

      <section className="home-katha-banner">
        <div className="site-shell home-katha-inner">
          <div className="home-katha-copy">
            <p className="editorial-eyebrow">Stories and ideas</p>
            <h2>Ideas from Neurokatha</h2>
            <p>Stories and ideas about the brain, learning and human growth.</p>
            <a href="https://neurokatha.wordpress.com/" target="_blank" rel="noopener noreferrer" className="editorial-button mt-7">
              Visit Neurokatha <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="home-katha-art">
            <Image src="/images/redesign/neurokatha.jpg" alt="A person reading with a branching brain illustration" fill sizes="(max-width: 800px) 100vw, 48vw" className="object-contain" />
          </div>
        </div>
      </section>

      <section className="site-shell home-connect">
        <div>
          <p className="editorial-eyebrow">Let’s work together</p>
          <h2>Connect with Neurogati</h2>
          <p>For educators, schools, clinicians and research partners.</p>
          <Link href="/contact" className="editorial-button mt-7">
            Get in touch <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <p className="home-connect-note">Let’s work together<br />for brighter brains.</p>
      </section>
    </div>
  )
}
