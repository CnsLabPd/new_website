import type { Metadata } from "next"
import Link from "next/link"
import { Activity, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Movement Platform | Coming Soon | Neurogati",
  description: "Neurogati's Movement Platform is an upcoming system for movement assessment and rehabilitation progress tracking.",
}

export default function MovementPlatformPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border bg-muted/30 pb-24 pt-48">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(#1c82c2 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 border-amber-500/20 bg-amber-500/10 px-4 py-1 font-black uppercase tracking-widest text-amber-500">
              Coming soon
            </Badge>
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-border bg-background shadow-sm">
              <Activity className="h-10 w-10 text-[#1c82c2]" aria-hidden="true" />
            </div>
            <h1 className="mb-8 text-4xl font-black leading-[1.1] tracking-tighter md:text-7xl">Movement Platform</h1>
            <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
              Neurogati is developing a movement-analysis platform for assessment, progress tracking,
              and data-driven rehabilitation support. More details will be added soon.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-blue-600 px-8 font-black text-white hover:bg-blue-700">
                <Link href="/contact">
                  Enquire About Movement Platform
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-border px-8 font-black hover:bg-muted">
                <Link href="/movement-and-games">
                  <Clock className="mr-2 h-5 w-5" aria-hidden="true" />
                  Back to Movement & Games
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
