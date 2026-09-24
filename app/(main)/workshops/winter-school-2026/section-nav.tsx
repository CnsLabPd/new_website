"use client"

import { useEffect, useState } from "react"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "abstracts", label: "Abstract Submission" },
  { id: "programme", label: "Programme Overview" },
  { id: "committee", label: "Scientific Committee" },
  { id: "speakers", label: "Speakers" },
  { id: "more-information", label: "More Information" },
]

export function WinterSchoolSectionNav() {
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 180

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id)
        const sectionTop = element ? element.getBoundingClientRect().top + window.scrollY : 0
        if (element && scrollPosition >= sectionTop) {
          setActiveSection(section.id)
          return
        }
      }
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    return () => window.removeEventListener("scroll", updateActiveSection)
  }, [])

  const jumpTo = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 120,
      behavior: "smooth",
    })
  }

  return (
    <nav className="fixed left-6 top-32 z-30 hidden w-56 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-2xl border border-border bg-background/90 p-3 shadow-xl backdrop-blur-xl lg:block">
      <p className="px-3 pb-3 pt-1 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
        On This Page
      </p>
      <div className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => jumpTo(section.id)}
            className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-all ${
              activeSection === section.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
