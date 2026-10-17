import type { Metadata } from "next"
import Image from "next/image"
import { ArrowDown, ArrowUpRight, BookOpen, Compass, Hand, Puzzle, Shapes } from "lucide-react"

const AKSHARA_URL = "https://akshara-neuroshiksha.neurogati.com/"

export const metadata: Metadata = {
  title: "Neuroshiksha · Akshara | Neurogati",
  description: "Meet Akshara, Neurogati's child-focused foundational learning platform for language, maths, curiosity and everyday skills.",
}

const learningAreas = [
  { icon: BookOpen, title: "Language learning", text: "English and Tamil alphabets through seeing, recognising and writing." },
  { icon: Shapes, title: "Math adventures", text: "Counting, adding and early number sense through playful activities." },
  { icon: Puzzle, title: "Brain puzzles", text: "Activities designed to practise attention, reasoning and problem-solving." },
  { icon: Compass, title: "Discover our world", text: "Explore the body, family, nature, the environment, Earth and space." },
  { icon: Hand, title: "Skills for independence", text: "Practise everyday routines, communication, self-care and safety." },
]

const audiences = [
  { title: "Young learners", text: "Children aged 3–10 building early language, number skills and a sense of discovery." },
  { title: "Special education", text: "Learners who benefit from calm, repeatable practice and flexible pacing." },
  { title: "Parents & educators", text: "The adults beside each child, guiding practice and noticing their progress." },
]

const starterOfferings = [
  { label: "Home", title: "Akshara Starter English — Home", audience: "For parents supporting their child at home", description: "A playful introduction to foundational learning in English, with activities children can explore at their own pace.", availability: "Available now", image: "/images/redesign/akshara-starter-home.jpg", imageAlt: "Parent and child exploring picture cards and a tablet together at home" },
  { label: "Inclusive", title: "Akshara Starter — Inclusive", audience: "For parents of children who need additional learning support", description: "Adapted foundational activities with guided practice and flexible pacing.", availability: "November 2026", image: "/images/redesign/akshara-starter-inclusive.jpg", imageAlt: "Adult and child learning together with tactile shapes and picture cards" },
  { label: "Schools", title: "Akshara Starter English — Schools", audience: "For schools and teachers", description: "Teacher-managed student groups, classroom activities and individual progress tracking.", availability: "Last week of Oct 2026", image: "/images/redesign/akshara-starter-schools.jpg", imageAlt: "Teacher guiding a small group of children through classroom activities" },
  { label: "Tutors", title: "Akshara Starter English — Tutors", audience: "For individual private tutors", description: "Support for individual learning and flexible group activities, with progress tracking for each child.", availability: "November 2026", image: "/images/redesign/akshara-starter-tutors.jpg", imageAlt: "Tutor and child practicing early numbers with a counting frame" },
]
const [homeOffering, ...upcomingStarterOfferings] = starterOfferings

const yearlongOfferings = [
  { label: "LKG", title: "Akshara Yearlong 1 — English", audience: "For children at the LKG stage.", description: "A structured, yearlong foundational learning programme compatible with LKG.", availability: "Date to be announced", image: "/images/redesign/akshara-yearlong-lkg.jpg", imageAlt: "Young child exploring picture cards and counting blocks with a parent" },
  { label: "UKG", title: "Akshara Yearlong 2 — English", audience: "For children at the UKG stage.", description: "A structured, yearlong foundational learning programme compatible with UKG.", availability: "Date to be announced", image: "/images/redesign/akshara-yearlong-ukg.jpg", imageAlt: "Child working on a pattern puzzle and picture book with an adult nearby" },
]

export default function NeuroshikshaPage() {
  return (
    <div className="editorial-page akshara-page">
      <section className="site-shell editorial-hero akshara-hero">
        <div>
          <p className="editorial-eyebrow">Neuroshiksha · Children’s Learning & Development</p>
          <h1>Akshara<span className="akshara-title-dot">.</span></h1>
          <p className="editorial-lead">My school in my pocket.</p>
          <p className="editorial-copy">A playful space for foundational learning, designed for children and the adults who learn alongside them. Explore language, numbers, puzzles, the world around us and everyday skills.</p>
          <div className="editorial-actions">
            <a href="#learning-areas" className="editorial-outline-button">Discover the learning areas <ArrowDown size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="editorial-hero-visual akshara-hero-visual">
          <Image src="/images/redesign/akshara-home.jpg" alt="A parent and child exploring learning activities together on a tablet" fill priority sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
        </div>
      </section>

      <section className="site-shell editorial-section akshara-featured">
        <p className="editorial-eyebrow">Start learning with Akshara</p>
        <article className="akshara-featured-card">
          <div className="akshara-featured-image">
            <Image src={homeOffering.image} alt={homeOffering.imageAlt} fill sizes="(max-width: 800px) 100vw, 45vw" className="object-cover" />
          </div>
          <div className="akshara-featured-content">
            <span className="akshara-offering-label">{homeOffering.label}</span>
            <h2>{homeOffering.title}</h2>
            <p className="akshara-featured-audience">{homeOffering.audience}</p>
            <p>{homeOffering.description}</p>
            <div className="akshara-featured-action">
              <span className="akshara-featured-status">{homeOffering.availability}</span>
              <a href={AKSHARA_URL} target="_blank" rel="noopener noreferrer" className="editorial-button">Open Akshara <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </article>
      </section>

      <section id="offerings" className="site-shell editorial-section akshara-offerings">
        <div className="editorial-section-intro">
          <p className="editorial-eyebrow">Coming over the next few months</p>
          <h2>Upcoming Akshara offerings</h2>
          <p>More ways to learn with Akshara are on the way — with options for children who need additional support, schools and tutors.</p>
        </div>
        <div className="akshara-offering-group">
          <div className="akshara-offering-heading">
            <h3>Akshara Starter</h3>
            <p>Foundational learning for more settings and needs</p>
          </div>
          <div className="akshara-offering-grid akshara-offering-grid-three">
            {upcomingStarterOfferings.map((offering) => (
              <article className="akshara-offering-card" key={offering.title}>
                <div className="akshara-offering-image">
                  <Image src={offering.image} alt={offering.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1050px) 50vw, 33vw" className="object-cover" />
                </div>
                <span className="akshara-offering-label">{offering.label}</span>
                <h4>{offering.title}</h4>
                <p className="akshara-offering-audience">{offering.audience}</p>
                <p>{offering.description}</p>
                <span className="akshara-offering-date">{offering.availability}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="akshara-offering-group">
          <div className="akshara-offering-heading">
            <h3>Akshara Yearlong</h3>
            <p>A structured, full-year programme for each preschool stage</p>
          </div>
          <div className="akshara-offering-grid akshara-offering-grid-two">
            {yearlongOfferings.map((offering) => (
              <article className="akshara-offering-card" key={offering.title}>
                <div className="akshara-offering-image">
                  <Image src={offering.image} alt={offering.imageAlt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                </div>
                <span className="akshara-offering-label">{offering.label}</span>
                <h4>{offering.title}</h4>
                <p className="akshara-offering-audience">{offering.audience}</p>
                <p>{offering.description}</p>
                <span className="akshara-offering-date">{offering.availability}</span>
              </article>
            ))}
          </div>
        </div>
        <p className="akshara-notify">Want to hear when an offering launches? <a href="mailto:contactus@neurogati.com?subject=Notify%20me%20about%20Akshara%20offerings" className="editorial-link">Get notified <ArrowUpRight size={17} aria-hidden="true" /></a></p>
      </section>

      <section id="learning-areas" className="editorial-soft-section scroll-mt-24">
        <div className="site-shell editorial-section">
          <div className="editorial-section-intro">
            <p className="editorial-eyebrow">Learn by exploring</p>
            <h2>Five ways to learn, all in one place</h2>
            <p>Akshara brings foundational learning into a colourful, child-friendly experience that makes practice feel like discovery.</p>
          </div>
          <div className="akshara-learning-grid">
            {learningAreas.map(({ icon: Icon, title, text }, index) => (
              <article className="akshara-learning-card" key={title}>
                <span className={`akshara-learning-icon akshara-accent-${index + 1}`}><Icon size={28} strokeWidth={1.6} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <a href={AKSHARA_URL} target="_blank" rel="noopener noreferrer" className="editorial-link mt-8 inline-flex">Explore Akshara’s learning areas <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="site-shell editorial-section akshara-story">
        <div className="akshara-story-image">
          <Image src="/images/redesign/akshara-classroom.jpg" alt="An educator guiding children through playful learning" fill sizes="(max-width: 900px) 100vw, 48vw" className="object-cover" />
        </div>
        <div>
          <p className="editorial-eyebrow">Learning together</p>
          <h2>Made for children — and the grown-ups beside them</h2>
          <p className="editorial-copy">Akshara supports practice at home and in learning environments, with activities that children can revisit at a comfortable pace.</p>
          <div className="akshara-audiences">
            {audiences.map((audience) => (
              <div key={audience.title}>
                <h3>{audience.title}</h3>
                <p>{audience.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-soft-section">
        <div className="site-shell editorial-section akshara-family">
          <div>
            <p className="editorial-eyebrow">About Neuroshiksha</p>
            <h2>A growing family of learning platforms</h2>
            <p>Neuroshiksha is Neurogati’s home for child-focused learning. Akshara is its first platform, bringing foundational activities into an accessible digital experience.</p>
          </div>
        </div>
      </section>

      <section className="editorial-callout">
        <div className="site-shell editorial-callout-inner">
          <div>
            <p className="editorial-eyebrow">Begin with Akshara</p>
            <h2>Ready when your child is.</h2>
            <p>Open Akshara on a phone, tablet or computer and explore together.</p>
          </div>
          <a href={AKSHARA_URL} target="_blank" rel="noopener noreferrer" className="editorial-button">Visit Akshara <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </section>
    </div>
  )
}
