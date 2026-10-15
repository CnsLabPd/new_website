"use client"

import AboutUsSection from "@/components/ui/about-us-section"

export default function AboutPage() {
  return (
    <div className="editorial-page min-h-screen">
      <section className="editorial-soft-section">
        <div className="site-shell py-20 md:py-28">
          <p className="editorial-eyebrow">Our story</p>
          <h1 className="mt-3 text-6xl md:text-8xl">About Neurogati</h1>
          <p className="editorial-lead">Brain science for learning, development and recovery.</p>
          <p className="editorial-copy">We connect computational neuroscience with practical tools for education, movement and rehabilitation.</p>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className="site-shell">
          <AboutUsSection />
        </div>
      </section>
    </div>
  )
}
