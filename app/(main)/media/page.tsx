"use client"
import { Button } from "@/components/ui/button"
import { ExternalLink, LayoutGrid, Newspaper, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const newsArticles = [
  {
    title: "Inside Blindsight: Elon Musk's ambitious project to cure blindness in 2026",
    source: "India Today",
    date: "Jan 03, 2026",
    description: "A deep dive into the FDA-approved project targeting the visual cortex to restore vision using brain-computer interfaces.",
    link: "https://www.indiatoday.in/science/story/neuralink-blindsight-elon-musk-brain-chip-brain-computer-interface-blind-visually-impaired-retina-optic-nerve-restore-vision-visual-cortex-fda-2842936-2026-01-03",
    category: "BCI & Neuroscience"
  }
];

export default function MediaPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/bg_just_logo.png" alt="Logo" width={56} height={56} className="object-contain" />
            <span className="text-2xl font-black tracking-tighter text-[#1c82c2] dark:text-[#38bdf8]">NEUROGATI</span>
          </Link>
          <nav>
            <Link href="/gamingcategories" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              <LayoutGrid className="h-4 w-4 text-[#1c82c2]" /> Browse Games
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative pt-32 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-6 bg-blue-500/10 text-blue-500 border-blue-500/20 font-black uppercase tracking-widest px-4 py-1">Press & Insights</Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Neurogati <br /> in the Media</h1>
          <p className="max-w-2xl text-lg text-muted-foreground font-medium">Tracking the frontier of brain-computer interfaces and the future of sensory restoration.</p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="grid gap-12 max-w-5xl">
          {newsArticles.map((article, i) => (
            <div key={i} className="group relative p-8 rounded-[32px] bg-card border border-border hover:border-blue-500/50 transition-all">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-grow space-y-4">
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-blue-500">
                    <span className="bg-blue-500/10 px-3 py-1 rounded-full">{article.category}</span>
                    <span className="flex items-center gap-1 text-slate-500"><Clock className="h-3 w-3" /> {article.date}</span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-[17px] leading-relaxed max-w-3xl">
                    {article.description}
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto text-blue-500 font-black text-lg hover:no-underline flex items-center gap-2">
                    <Link href={article.link} target="_blank">
                      Read Full Article on {article.source} <ExternalLink className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}