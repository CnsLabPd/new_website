import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { NEUROVIDYA_PLATFORM_URL, neurovidyaCourseCategories } from "@/lib/neurovidya-courses"

export const metadata: Metadata = {
  title: "Neurovidya Courses | Neurogati",
  description: "Browse Neurovidya course categories in brain signals and AI, neural modelling, Python and movement analysis.",
}

export default function NeurovidyaCoursesPage() {
  return (
    <div className="editorial-page">
      <section className="site-shell neurovidya-subpage-hero">
        <p className="editorial-eyebrow">Neurovidya / Courses</p>
        <h1>Courses for curious minds</h1>
        <p className="editorial-lead">Choose a subject area and find a learning format that works for you.</p>
        <p className="editorial-copy">Neurovidya courses span self-paced learning, instructor-led teaching and certificate programmes. The format depends on the course; check the Neurovidya platform for current availability, schedules and enrolment.</p>
        <div className="editorial-actions">
          <a href={NEUROVIDYA_PLATFORM_URL} target="_blank" rel="noopener noreferrer" className="editorial-button">Browse current courses <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="editorial-soft-section">
        <div className="site-shell editorial-section">
          <div className="editorial-section-intro">
            <p className="editorial-eyebrow">Course categories</p>
            <h2>What would you like to explore?</h2>
            <p>Each area introduces a different set of questions and tools in neuroscience. Select a category to see its learning focus and related courses.</p>
          </div>
          <div className="neurovidya-course-grid">
            {neurovidyaCourseCategories.map((category) => (
              <Link className="editorial-image-card neurovidya-course-card" href={`/neurovidya/courses/${category.slug}`} key={category.slug}>
                <div className="editorial-image-card-art">
                  <Image src={category.image} alt={category.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 25vw" className="object-cover" />
                </div>
                <div className="editorial-image-card-body">
                  <h3>{category.title}</h3>
                  <p>{category.shortDescription}</p>
                  <span className="editorial-link mt-5">View category <ArrowRight size={17} aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
