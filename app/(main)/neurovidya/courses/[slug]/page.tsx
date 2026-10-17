import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { NEUROVIDYA_PLATFORM_URL, neurovidyaCourseCategories } from "@/lib/neurovidya-courses"

type CoursePageProps = { params: { slug: string } }

export function generateStaticParams() {
  return neurovidyaCourseCategories.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: CoursePageProps): Metadata {
  const category = neurovidyaCourseCategories.find((item) => item.slug === params.slug)
  return category
    ? { title: `${category.title} | Neurovidya`, description: category.shortDescription }
    : { title: "Course category | Neurovidya" }
}

export default function NeurovidyaCourseCategoryPage({ params }: CoursePageProps) {
  const category = neurovidyaCourseCategories.find((item) => item.slug === params.slug)
  if (!category) notFound()

  return (
    <div className="editorial-page">
      <section className="site-shell editorial-hero neurovidya-detail-hero">
        <div>
          <Link href="/neurovidya/courses" className="editorial-link"><ArrowLeft size={17} aria-hidden="true" /> All course categories</Link>
          <p className="editorial-eyebrow mt-8">Neurovidya / Courses</p>
          <h1>{category.title}</h1>
          <p className="editorial-lead">{category.shortDescription}</p>
          <p className="editorial-copy">{category.description}</p>
          <div className="editorial-actions">
            <a href={NEUROVIDYA_PLATFORM_URL} target="_blank" rel="noopener noreferrer" className="editorial-button">See courses on Neurovidya <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="editorial-hero-visual">
          <Image src={category.image} alt={category.alt} fill priority sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
        </div>
      </section>

      <section className="editorial-soft-section">
        <div className="site-shell editorial-section">
          <div className="editorial-section-intro">
            <p className="editorial-eyebrow">Related courses</p>
            <h2>Learn in this area</h2>
            <p>These courses are associated with this category. Check Neurovidya for the latest format, availability and course details.</p>
          </div>
          <div className="neurovidya-related-courses">
            {category.courses.map((course, index) => (
              <article className="editorial-feature" key={course}>
                <span className="editorial-feature-number">0{index + 1}</span>
                <h3>{course}</h3>
                <p>Course format and current enrolment details are listed on the Neurovidya platform.</p>
                <a href={NEUROVIDYA_PLATFORM_URL} target="_blank" rel="noopener noreferrer" className="editorial-link mt-5">View on Neurovidya <ArrowUpRight size={17} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
