"use client"
import { LayoutGrid, Camera, Hammer, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function GalleryPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10"> */}
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* <Link href="/" className="flex items-center gap-3 group">
            <Image src="/bg_just_logo.png" alt="Logo" width={56} height={56} className="object-contain" />
            <span className="text-2xl font-black tracking-tighter text-[#1c82c2] dark:text-[#38bdf8]">NEUROGATI</span>
          </Link> */}
        </div>
      {/* </header> */}

      <main className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
        
        <div className="relative z-10 text-center space-y-8 max-w-2xl">
          <div className="inline-flex p-6 rounded-full bg-slate-900 border border-white/5 mb-4">
            <Camera className="h-12 w-12 text-slate-500" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Visual Archive</h1>
            <div className="flex items-center justify-center gap-2 text-amber-500 font-black uppercase tracking-widest text-sm bg-amber-500/10 px-4 py-2 rounded-full w-fit mx-auto border border-amber-500/20">
              <Hammer className="h-4 w-4" /> Under Construction
            </div>
          </div>
{/*           
          <p className="text-muted-foreground text-lg font-medium leading-relaxed">
            We are currently curating our laboratory and field-test visual archives. Check back soon for snapshots of our BCI hardware and therapeutic sessions.
          </p> */}

          <Button asChild size="lg" className="bg-[#1c82c2] hover:bg-blue-700 text-white font-black rounded-full px-10 h-14">
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" /> Return to Home
            </Link>
          </Button>
        </div>
      </main>

      <footer className="py-8 border-t border-white/5 text-center">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">© 2026 NEUROGATI LABS</p>
      </footer>
    </div>
  )
}