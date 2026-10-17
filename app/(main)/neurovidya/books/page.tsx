import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react"
import { NEUROVIDYA_PLATFORM_URL } from "@/lib/neurovidya-courses"

export const metadata: Metadata = {
  title: "Books & Learning Resources | Neurovidya",
  description: "Explore neuroscience books and learning resources through Neurovidya.",
}

export default function NeurovidyaBooksPage() {
  return (
    <div className="editorial-page">
      <section className="site-shell neurovidya-subpage-hero">
        <Link href="/neurovidya" className="editorial-link"><ArrowLeft size={17} aria-hidden="true" /> Back to Neurovidya</Link>
        <p className="editorial-eyebrow mt-8">Neurovidya / Books</p>
        <h1>Books for deeper learning</h1>
        <p className="editorial-lead">Take your curiosity beyond the course and explore ideas in brain science and computational neuroscience.</p>
        <p className="editorial-copy">Neurovidya brings books and learning resources together with its courses and workshops. Visit the platform for the current reading collection and access information.</p>
        <div className="editorial-actions">
          <a href={NEUROVIDYA_PLATFORM_URL} target="_blank" rel="noopener noreferrer" className="editorial-button">Browse Neurovidya books <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="editorial-soft-section">
        <div className="site-shell editorial-section">
          <article className="neurovidya-book-feature">
            <div className="neurovidya-book-icon"><BookOpen size={38} strokeWidth={1.35} aria-hidden="true" /></div>
            <div>
              <p className="editorial-eyebrow">Featured reading</p>
              <h2>Whole and Its Parts</h2>
              <p>Explore a book from the Neurovidya learning collection. Visit the platform for its full description and current availability.</p>
              <a href={NEUROVIDYA_PLATFORM_URL} target="_blank" rel="noopener noreferrer" className="editorial-link mt-5">View learning resources <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
