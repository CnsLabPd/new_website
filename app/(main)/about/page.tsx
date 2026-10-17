import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Our Story | Neurogati",
  description:
    "The origins, people and research approach behind Neurogati. Computational neuroscience in service of learning, development and recovery.",
}

const founders = [
  {
    name: "Prof. V. Srinivasa Chakravarthy",
    role: "Co-founder & Chief Scientist",
    image: "/images/about/chakravarthy.png",
    description:
      "A professor at IIT Madras, Prof. Chakravarthy studies how the brain learns, controls movement and responds to neurological disorders through computational modelling. At Neurogati, he connects this research with neuroscience education, children’s learning and technologies for movement and rehabilitation.",
  },
  {
    name: "Dr. Indira Chaturvedi",
    role: "Co-founder & Chief Medical Officer",
    image: "/images/about/chaturvedi.png",
    description:
      "A pediatrician, Dr. Chaturvedi brings clinical experience and an understanding of children’s health and development to Neurogati. Her perspective helps connect scientific and technological ideas with the practical needs of children, families and healthcare professionals.",
  },
]

export default function AboutPage() {
  return (
    <div className="about-page editorial-page">
      <section className="about-hero" aria-labelledby="about-heading">
        <div className="site-shell about-hero-inner">
          <p className="editorial-eyebrow">About Neurogati / Our story</p>
          <p className="about-hero-kicker">Science, with people in mind.</p>
          <h1 id="about-heading">
            <span>Understanding the brain.</span>
            <span>Serving everyday life.</span>
          </h1>
          <p className="about-hero-lead">
            Neurogati brings brain science into everyday life. Rooted in computational neuroscience, we develop programmes and technologies that support education, children’s development, movement and recovery.
          </p>
          <p className="about-hero-copy">
            Our three pillars—Neurovidya, Neuroshiksha and Neuroleela—connect scientific understanding with practical opportunities to learn, grow and regain abilities.
          </p>
          <div className="about-hero-foot">
            <span>A scientific foundation. A practical purpose.</span>
            <span>Incubated at IIT Madras</span>
          </div>
        </div>
      </section>

      <nav className="about-chapters" aria-label="About page sections">
        <div className="site-shell about-chapters-inner">
          <a href="#beginnings"><span>01</span> Our beginnings <span aria-hidden="true">↗</span></a>
          <a href="#people"><span>02</span> Our people <span aria-hidden="true">↗</span></a>
        </div>
      </nav>

      <section className="about-beginnings" id="beginnings" aria-labelledby="beginnings-heading">
        <div className="site-shell about-beginnings-grid">
          <div className="about-section-copy">
            <p className="editorial-eyebrow">01 / Our beginnings</p>
            <h2 id="beginnings-heading">A question in the laboratory.<br /><em>A purpose beyond it.</em></h2>
            <p className="about-question">How can understanding the brain help people learn, develop and recover?</p>
            <p>Neurogati grew out of computational neuroscience research at IIT Madras, driven by a desire to understand how the brain learns, controls movement and adapts to change. This work inspired a broader purpose: to translate scientific understanding into practical tools that support people in classrooms, homes and clinical settings.</p>
            <p>Incubated at IIT Madras, Neurogati brings together neuroscience, education and technology through three connected pillars: Neurovidya, Neuroshiksha and Neuroleela. Across these initiatives, we connect research with everyday needs, creating programmes and tools for learning, children’s development, movement monitoring and rehabilitation.</p>
            <p className="about-thread"><strong>Computational neuroscience</strong> is the common thread across our work.</p>
          </div>
          <div className="about-origin-art">
            <Image
              src="/images/about/origins.png"
              alt="Illustrated neuroscience workspace with a brain model, research notebook and neural data on a laptop"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="about-mission" aria-labelledby="mission-heading">
        <div className="site-shell about-mission-inner">
          <p className="editorial-eyebrow">Our mission</p>
          <h2 id="mission-heading">To turn scientific understanding of the brain into accessible opportunities to learn, develop and regain abilities.</h2>
        </div>
      </section>

      <section className="about-people" id="people" aria-labelledby="people-heading">
        <div className="site-shell">
          <div className="about-people-intro">
            <p className="editorial-eyebrow">02 / Our people</p>
            <h2 id="people-heading">Scientific curiosity.<br />Clinical understanding.<br /><em>A shared purpose.</em></h2>
          </div>
          <div className="about-people-grid">
            {founders.map((founder) => (
              <article className="about-person" key={founder.name}>
                <div className="about-person-photo">
                  <Image src={founder.image} alt={founder.name} fill sizes="(max-width: 700px) 100vw, 40vw" />
                </div>
                <div className="about-person-body">
                  <h3>{founder.name}</h3>
                  <p className="about-person-role">{founder.role}</p>
                  <p>{founder.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="about-team-note">
            <div>
              <h3>Our wider team</h3>
              <p>Neurogati brings together scientific, clinical, educational and technical experience. Researchers, educators, clinicians, developers and designers work together to translate ideas into accessible programmes and tools, informed by the people who use them.</p>
            </div>
            <Link className="editorial-link" href="/team">Meet our team <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="about-connect" aria-labelledby="connect-heading">
        <div className="site-shell about-connect-inner">
          <div>
            <p className="editorial-eyebrow">A conversation starts here</p>
            <h2 id="connect-heading">Let’s build together.</h2>
            <p>We welcome educators, schools, clinicians, researchers and partners who share our interest in bringing brain science into everyday life. Connect with us to explore our programmes, try our tools or develop new ideas together.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
