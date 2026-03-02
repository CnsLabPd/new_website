// // "use client"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent } from "@/components/ui/card"
// // import { Badge } from "@/components/ui/badge"
// // import Link from "next/link"
// // import {
// //   Brain,
// //   BookOpen,
// //   Users,
// //   Code,
// //   Calendar,
// //   DollarSign,
// //   Mail,
// //   CheckCircle2,
// //   ArrowRight,
// //   Clock,
// //   Award,
// //   Laptop,
// // } from "lucide-react"

// // export default function WorkshopPage() {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">
// //       {/* Header/Nav - Logo & Title Fixed */}
// //       <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
// //         <div className="container mx-auto flex items-center justify-between px-6 py-4">
          
// //           <Link 
// //             href="/" 
// //             className="flex items-center gap-3 hover:opacity-90 transition group"
// //           >
// //             <img 
// //               src="/bg_just_logo.png" 
// //               alt="Neurogati Logo" 
// //               className="h-14 w-14 object-contain group-hover:scale-105 transition-transform" 
// //             />
// //             <span className="text-2xl font-black tracking-tighter text-[#1c82c2] dark:text-[#38bdf8]">
// //               NEUROGATI
// //             </span>
// //           </Link>

// //           <nav className="hidden gap-8 md:flex items-center">
// //             <a href="#overview" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Overview</a>
// //             <a href="#schedule" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Schedule</a>
// //             <a href="#fees" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Fees</a>
// //             <a href="#instructor" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Instructor</a>
// //             <Link href="/workshops" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">
// //               View all Workshops
// //             </Link>
// //           </nav>

// //           <div className="flex items-center gap-3">
// //             <Button
// //               className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black uppercase tracking-tight hover:from-cyan-500 hover:to-blue-600 rounded-full px-6"
// //               asChild
// //             >
// //               <a href="https://forms.gle/btcfr8wDBMN3PWCeA" target="_blank" rel="noopener noreferrer">
// //                 Apply Now
// //               </a>
// //             </Button>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Hero Section - FIXED CLIPPING AND HEIGHT */}
// //       <section className="relative overflow-hidden border-b border-white/10">
// //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]" />
// //         <div className="container mx-auto px-6 py-24 md:py-32 relative"> {/* Increased py-32 */}
// //           <div className="mx-auto max-w-5xl text-center">
// //             <Badge className="mb-6 bg-white/10 text-white border-white/20 font-bold px-4 py-1" variant="secondary">
// //               <Calendar className="mr-2 h-4 w-4 inline text-cyan-400" /> 27 - 31 March 2026
// //             </Badge>
            
// //             {/* Added leading-[1.1] and py-2 to prevent clipping */}
// //             <h1 className="mb-8 text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
// //               Workshop on <br className="hidden md:block" /> Brain Modeling
// //             </h1>
            
// //             <p className="mb-10 text-pretty text-lg text-slate-300 md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
// //               A 5-day intensive online workshop on Computational Neuroscience, covering single neuron models, neural
// //               networks, oscillations, and systems neuroscience.
// //             </p>

// //             <div className="flex flex-wrap items-center justify-center gap-6">
// //               <Button
// //                 size="lg"
// //                 className="h-14 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black rounded-full px-10 text-lg hover:from-cyan-500 hover:to-blue-600 shadow-lg shadow-cyan-500/20"
// //                 asChild
// //               >
// //                 <a href="https://forms.gle/btcfr8wDBMN3PWCeA" target="_blank" rel="noopener noreferrer">
// //                   Apply Now <ArrowRight className="ml-2 h-5 w-5" />
// //                 </a>
// //               </Button>
// //               <Button
// //                 size="lg"
// //                 variant="outline"
// //                 className="h-14 border-white/20 text-white hover:bg-white/10 bg-transparent rounded-full px-10 font-bold text-lg"
// //                 asChild
// //               >
// //                 <a href="#schedule">View Schedule</a>
// //               </Button>
// //             </div>

// //             <div className="mt-16 flex flex-wrap items-center justify-center gap-10 text-xs font-black uppercase tracking-[0.2em] text-cyan-400/80">
// //               <div className="flex items-center gap-3">
// //                 <Clock className="h-5 w-5" />
// //                 <span>5 Days Intensive</span>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <Laptop className="h-5 w-5" />
// //                 <span>Online Format</span>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <Award className="h-5 w-5" />
// //                 <span>E-Certificate</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Rest of the page components (Overview, Schedule, etc.) remain below */}
// //       {/* ... I have kept your sub-components logic from the previous turn ... */}

// //       <section id="overview" className="border-b border-white/10 py-24">
// //         <div className="container mx-auto px-4">
// //             <h2 className="mb-16 text-center text-4xl md:text-6xl font-black tracking-tighter">What You Will Learn</h2>
// //             <div className="grid gap-8 md:grid-cols-3">
// //               <LearningCard 
// //                 icon={<Brain className="h-12 w-12 text-cyan-400" />}
// //                 title="Single Neuron Models"
// //                 description="Master Hodgkin-Huxley, Morris Lecar, FitzHugh-Nagumo, and Izhikevich models with hands-on PyTorch implementation."
// //               />
// //               <LearningCard 
// //                 icon={<Code className="h-12 w-12 text-cyan-400" />}
// //                 title="Neural Networks & Deep Learning"
// //                 description="Explore CNNs in motor function, visual/auditory neuroscience, and deep network perspectives on nervous systems."
// //               />
// //               <LearningCard 
// //                 icon={<BookOpen className="h-12 w-12 text-cyan-400" />}
// //                 title="Brain Oscillations & Systems"
// //                 description="Study phase plane analysis, neural rhythms, Deep Oscillatory Neural Networks, and specialized project topics."
// //               />
// //             </div>
// //         </div>
// //       </section>

// //       {/* ... Schedule, Dates, Fees sections remain identical to previous ... */}
      
// //       <footer className="bg-black/40 border-t border-white/5 py-12">
// //         <div className="container mx-auto px-4 text-center">
// //             <h3 className="mb-2 text-xl font-black text-white tracking-tight uppercase">Laboratory for Computational Neuroscience</h3>
// //             <p className="text-sm text-slate-500 font-bold">IIT Madras, Chennai 600036</p>
// //             <p className="mt-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">© 2026 NEUROGATI. All rights reserved.</p>
// //         </div>
// //       </footer>
// //     </div>
// //   )
// // }

// // /* Helper Components */
// // function LearningCard({ icon, title, description }: any) {
// //   return (
// //     <Card className="bg-white/[0.03] backdrop-blur border border-white/10 hover:border-cyan-400/40 transition-all hover:-translate-y-2">
// //       <CardContent className="pt-10 pb-8 px-8">
// //         <div className="mb-6">{icon}</div>
// //         <h3 className="mb-4 text-2xl font-black text-white leading-tight tracking-tight">{title}</h3>
// //         <p className="text-slate-400 font-medium leading-relaxed">{description}</p>
// //       </CardContent>
// //     </Card>
// //   )
// // }

// "use client"

// import React from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   Calendar,
//   Award,
//   Laptop,
//   Brain,
//   Network,
//   Activity,
//   Layers,
//   ArrowRight,
// } from "lucide-react"

// export default function BrainModelingWorkshopPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">
//        {/* Header/Nav - Logo & Title Fixed */}
//        <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
//          <div className="container mx-auto flex items-center justify-between px-6 py-4">
          
//            <Link 
//              href="/" 
//              className="flex items-center gap-3 hover:opacity-90 transition group"
//            >
//              <img 
//                src="/bg_just_logo.png" 
//                alt="Neurogati Logo" 
//                className="h-14 w-14 object-contain group-hover:scale-105 transition-transform" 
//              />
//              <span className="text-2xl font-black tracking-tighter text-[#1c82c2] dark:text-[#38bdf8]">
//                NEUROGATI
//              </span>
//            </Link>

//           <nav className="hidden gap-8 md:flex items-center">
//              <a href="#overview" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Overview</a>
//              <a href="#schedule" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Schedule</a>
//              <a href="#fees" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Fees</a>
//              <a href="#instructor" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Instructor</a>
//              <Link href="/workshops" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">
//                View all Workshops
//              </Link>
//            </nav>

//            <div className="flex items-center gap-3">
//              <Button
//                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black uppercase tracking-tight hover:from-cyan-500 hover:to-blue-600 rounded-full px-6"
//                asChild
//              >
//                <a href="https://forms.gle/btcfr8wDBMN3PWCeA" target="_blank" rel="noopener noreferrer">
//                  Apply Now
//                </a>
//              </Button>
//            </div>
//          </div>
//        </header>
      
//       {/* --- HERO SECTION --- */}
//       <section className="relative pt-40 pb-24 overflow-hidden border-b border-border">
//         <div
//           className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
//           style={{
//             backgroundImage:
//               "radial-gradient(#1c82c2 1px, transparent 1px)",
//             backgroundSize: "40px 40px",
//           }}
//         />

//         <div className="container mx-auto px-6 relative z-10 text-center">
//           <Badge className="mb-8 bg-cyan-500/10 text-cyan-500 border-cyan-500/20 font-black uppercase tracking-[0.2em] px-5 py-1.5 text-xs">
//             5-Day Online Workshop
//           </Badge>

//           <h1 className="mb-8 text-4xl md:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
//             Workshop on Brain Modeling
//           </h1>

//           <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium mb-10">
//             A deep dive into Computational Neuroscience — from single neuron
//             dynamics to oscillatory networks and large-scale brain systems.
//           </p>

//           <div className="flex flex-wrap items-center justify-center gap-4">
//             <Button
//               size="lg"
//               className="bg-blue-800 hover:bg-blue-900 text-white px-8 h-14 rounded-xl font-bold"
//               asChild
//             >
//               <a href="https://forms.gle/btcfr8wDBMN3PWCeA">
//                 Apply Now <ArrowRight className="h-4 w-4 ml-2" />
//               </a>
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="rounded-xl h-14 px-8 font-bold"
//               asChild
//             >
//               <a href="#schedule">View Schedule</a>
//             </Button>
//           </div>

//           <div className="mt-16 flex flex-wrap items-center justify-center gap-10 text-sm font-bold uppercase tracking-widest text-muted-foreground">
//             <div className="flex items-center gap-2">
//               <Calendar className="h-5 w-5 text-blue-500" />
//               <span>27–31 March 2026</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Laptop className="h-5 w-5 text-blue-500" />
//               <span>Online Format</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Award className="h-5 w-5 text-blue-500" />
//               <span>E-Certificate Provided</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- CONTENT --- */}
//       <div className="container mx-auto px-6 py-24 space-y-32">

//         {/* Overview */}
//         <section className="grid gap-8 md:grid-cols-4">
//           {[
//             {
//               icon: <Brain />,
//               title: "Single Neuron Models",
//               desc: "HH, Morris-Lecar, FitzHugh–Nagumo, Izhikevich models",
//             },
//             {
//               icon: <Network />,
//               title: "Neural Networks",
//               desc: "Deep learning & CNN applications in neuroscience",
//             },
//             {
//               icon: <Activity />,
//               title: "Oscillations",
//               desc: "Phase plane analysis, rhythms & DONNs",
//             },
//             {
//               icon: <Layers />,
//               title: "Systems Modeling",
//               desc: "Basal ganglia, hippocampus, fMRI network models",
//             },
//           ].map((item, idx) => (
//             <Card
//               key={idx}
//               className="bg-card border border-border p-8 rounded-[2rem] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
//             >
//               <div className="text-blue-500 mb-6">
//                 {React.cloneElement(item.icon as React.ReactElement, {
//                   className: "h-10 w-10",
//                 })}
//               </div>
//               <h3 className="text-xl font-black mb-3">
//                 {item.title}
//               </h3>
//               <p className="text-muted-foreground text-sm leading-relaxed">
//                 {item.desc}
//               </p>
//             </Card>
//           ))}
//         </section>

//         {/* Schedule */}
//         <section id="schedule" className="space-y-12">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-black tracking-tight mb-4">
//               Workshop Schedule
//             </h2>
//             <p className="text-muted-foreground text-lg">
//               Five days of theory, simulations, and hands-on PyTorch labs.
//             </p>
//           </div>

//           <div className="space-y-8 max-w-5xl mx-auto">

//             {/* Day 1 */}
//             <Card className="p-8 rounded-[2rem]">
//               <h3 className="text-2xl font-black mb-6">
//                 Day 1 – Single Neuron Dynamics
//               </h3>
//               <ul className="space-y-2 text-muted-foreground">
//                 <li>• Introduction to Computational Neuroscience</li>
//                 <li>• Single neuron signaling</li>
//                 <li>• HH, Morris-Lecar, FN & Izhikevich models</li>
//                 <li>• Practical sessions (PyTorch implementation)</li>
//               </ul>
//             </Card>

//             {/* Day 2 */}
//             <Card className="p-8 rounded-[2rem]">
//               <h3 className="text-2xl font-black mb-6">
//                 Day 2 – Neural Networks
//               </h3>
//               <ul className="space-y-2 text-muted-foreground">
//                 <li>• CNNs in motor, visual & auditory neuroscience</li>
//                 <li>• Deep neural networks & system organization</li>
//                 <li>• Practical sessions & mini project</li>
//               </ul>
//             </Card>

//             {/* Day 3 */}
//             <Card className="p-8 rounded-[2rem]">
//               <h3 className="text-2xl font-black mb-6">
//                 Day 3 – Oscillations
//               </h3>
//               <ul className="space-y-2 text-muted-foreground">
//                 <li>• Neural rhythms & measurement techniques</li>
//                 <li>• Phase plane analysis & limit cycles</li>
//                 <li>• Deep Oscillatory Neural Networks (DONNs)</li>
//                 <li>• Practical: xppaut & DONNs applications</li>
//               </ul>
//             </Card>

//             {/* Day 4 & 5 */}
//             <Card className="p-8 rounded-[2rem]">
//               <h3 className="text-2xl font-black mb-6">
//                 Day 4 & 5 – Systems & Projects
//               </h3>
//               <ul className="space-y-2 text-muted-foreground">
//                 <li>• Bilateral reaching networks (normal & stroke)</li>
//                 <li>• Basal ganglia model for DBS</li>
//                 <li>• Deep network model of hippocampal spatial cells</li>
//                 <li>• Oscillator network model of fMRI</li>
//               </ul>
//             </Card>
//           </div>
//         </section>


//         {/* --- Important Dates & Fees (Enhanced) --- */}
// <section className="relative py-28">
//   {/* Background Glow */}
//   <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-cyan-900/20 blur-3xl opacity-40 pointer-events-none" />

//   <div className="relative container mx-auto px-6 grid lg:grid-cols-2 gap-16">

//     {/* IMPORTANT DATES */}
//     <div className="space-y-10">
//       <div>
//         <h2 className="text-4xl font-black tracking-tight mb-3">
//           Important Dates
//         </h2>
//         <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
//       </div>

//       <div className="space-y-6">
//         {[
//           { title: "SOP Submission", date: "10 March 2026" },
//           { title: "Selection Results", date: "11 March 2026" },
//           { title: "Registration Deadline", date: "20 March 2026" },
//         ].map((item, idx) => (
//           <div
//             key={idx}
//             className="flex items-center justify-between p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//           >
//             <span className="font-semibold text-lg">
//               {item.title}
//             </span>
//             <span className="text-blue-400 font-black text-lg">
//               {item.date}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* FEE STRUCTURE */}
//     <div className="space-y-10">
//       <div>
//         <h2 className="text-4xl font-black tracking-tight mb-3">
//           Fee Structure
//         </h2>
//         <div className="h-1 w-20 bg-gradient-to-r from-violet-400 to-blue-500 rounded-full" />
//       </div>

//       <div className="grid gap-6">
//         {[
//           { label: "UG Students", price: "₹3,000" },
//           { label: "PG / PhD Students", price: "₹3,500" },
//           { label: "Professionals", price: "₹4,000" },
//         ].map((item, idx) => (
//           <div
//             key={idx}
//             className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
//           >
//             <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
//               {item.label}
//             </p>
//             <p className="text-4xl font-black text-blue-400">
//               {item.price}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>

//   </div>
// </section>

//         {/* CTA */}
//         <section id="apply" className="text-center py-20 border-t border-border">
//           <h2 className="text-4xl font-black mb-6">
//             Ready to Model the Brain?
//           </h2>
//           <Button
//             size="lg"
//             className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-4 rounded-xl font-bold"
//           >
//           <a href="https://forms.gle/btcfr8wDBMN3PWCeA" target="_blank" rel="noopener noreferrer">
//             Apply Now 
//                     </a>
//           </Button>

//           <p className="mt-8 text-muted-foreground">
//             Contact: workshops@neurogati.com
//           </p>
//         </section>

//       </div>
//     </div>
//   )
// }

"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Brain,
  Network,
  Activity,
  Layers,
  Calendar,
  Award,
  Laptop,
  ArrowRight,
  Mail,
} from "lucide-react"

export default function BrainModelingWorkshopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0a0f2c] to-[#0b163f] text-white">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">

          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/bg_just_logo.png"
              alt="Neurogati Logo"
              className="h-14 w-14 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-2xl font-black tracking-tighter text-[#38bdf8]">
              NEUROGATI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#overview" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Overview</a>
            <a href="#schedule" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Schedule</a>
            <a href="#fees" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Fees</a>
            <a href="#instructor" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">Instructor</a>
            <Link href="/workshops" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition">
              View all Workshops
            </Link>
          </nav>

          <Button
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black uppercase tracking-tight hover:from-cyan-500 hover:to-blue-600 rounded-full px-6"
            asChild
          >
            <a
              href="https://forms.gle/btcfr8wDBMN3PWCeA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
            </a>
          </Button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-40 pb-24 border-b border-white/10 text-center">
        <div className="container mx-auto px-6">
          <Badge className="mb-8 bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-black uppercase tracking-[0.2em] px-5 py-1.5 text-xs">
            5-Day Online Workshop
          </Badge>

          <h1 className="mb-8 text-4xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Workshop on Brain Modeling
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-slate-300 mb-10">
            From single neuron dynamics to oscillatory networks and
            large-scale brain system modeling.
          </p>

          <div className="flex justify-center gap-10 text-sm font-bold uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              27–31 March 2026
            </div>
            <div className="flex items-center gap-2">
              <Laptop className="h-5 w-5 text-blue-400" />
              Online
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-400" />
              E-Certificate
            </div>
          </div>
        </div>
      </section>

    {/* --- CONTENT --- */}
{       <div className="container mx-auto px-6 py-24 space-y-32">

         {/* Overview */}
         <section className="grid gap-8 md:grid-cols-4">
          {[
            {
              icon: <Brain />,
              title: "Single Neuron Models",
              desc: "HH, Morris-Lecar, FitzHugh–Nagumo, Izhikevich models",
            },
            {
              icon: <Network />,
              title: "Neural Networks",
              desc: "Deep learning & CNN applications in neuroscience",
            },
            {
              icon: <Activity />,
              title: "Oscillations",
              desc: "Phase plane analysis, rhythms & DONNs",
            },
            {
              icon: <Layers />,
              title: "Systems Modeling",
              desc: "Basal ganglia, hippocampus, fMRI network models",
            },
          ].map((item, idx) => (
            <Card
              key={idx}
              className="bg-card border border-border p-8 rounded-[2rem] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="text-blue-500 mb-6">
                {React.cloneElement(item.icon as React.ReactElement, {
                  className: "h-10 w-10",
                })}
              </div>
              <h3 className="text-xl font-black mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </Card>
          ))}
        </section>

        {/* Schedule */}
        <section id="schedule" className="space-y-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">
              Workshop Schedule
            </h2>
            <p className="text-muted-foreground text-lg">
              Five days of theory, simulations, and hands-on PyTorch labs.
            </p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">

            {/* Day 1 */}
            <Card className="p-8 rounded-[2rem]">
              <h3 className="text-2xl font-black mb-6">
                Day 1 – Single Neuron Dynamics
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Introduction to Computational Neuroscience</li>
                <li>• Single neuron signaling</li>
                <li>• HH, Morris-Lecar, FN & Izhikevich models</li>
                <li>• Practical sessions (PyTorch implementation)</li>
              </ul>
            </Card>

            {/* Day 2 */}
            <Card className="p-8 rounded-[2rem]">
              <h3 className="text-2xl font-black mb-6">
                Day 2 – Neural Networks
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• CNNs in motor, visual & auditory neuroscience</li>
                <li>• Deep neural networks & system organization</li>
                <li>• Practical sessions & mini project</li>
              </ul>
            </Card>

            {/* Day 3 */}
            <Card className="p-8 rounded-[2rem]">
              <h3 className="text-2xl font-black mb-6">
                Day 3 – Oscillations
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Neural rhythms & measurement techniques</li>
                <li>• Phase plane analysis & limit cycles</li>
                <li>• Deep Oscillatory Neural Networks (DONNs)</li>
                <li>• Practical: xppaut & DONNs applications</li>
              </ul>
            </Card>

            {/* Day 4 & 5 */}
            <Card className="p-8 rounded-[2rem]">
              <h3 className="text-2xl font-black mb-6">
                Day 4 & 5 – Systems & Projects
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Bilateral reaching networks (normal & stroke)</li>
                <li>• Basal ganglia model for DBS</li>
                <li>• Deep network model of hippocampal spatial cells</li>
                <li>• Oscillator network model of fMRI</li>
              </ul>
            </Card>
          </div>
        </section> }

      {/* ================= IMPORTANT DATES & FEES ================= */}
      <section id="fees" className="container mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20">

        {/* IMPORTANT DATES */}
        <div>
          <h2 className="text-4xl font-black mb-4">Important Dates</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-12" />

          <div className="space-y-8">
            {[
              { title: "SOP Submission", date: "10 March 2026" },
              { title: "Selection Results", date: "11 March 2026" },
              { title: "Registration Deadline", date: "20 March 2026" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md hover:border-blue-500/40 transition"
              >
                <span className="text-lg font-semibold text-slate-200">
                  {item.title}
                </span>
                <span className="text-xl font-black text-blue-400">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FEE STRUCTURE */}
        <div>
          <h2 className="text-4xl font-black mb-4">Fee Structure</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-violet-400 to-blue-500 rounded-full mb-12" />

          <div className="space-y-10">
            {[
              { label: "UG Students", price: "₹3,000" },
              { label: "PG / PhD Students", price: "₹3,500" },
              { label: "Professionals", price: "₹4,000" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-indigo-900/40 border border-blue-500/20 hover:scale-[1.02] transition"
              >
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-4">
                  {item.label}
                </p>
                <p className="text-5xl font-black text-blue-300">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="text-center py-24 border-t border-white/10">
        <h2 className="text-4xl font-black mb-8">Ready to Model the Brain?</h2>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-xl font-bold"
          asChild
        >
          <a
            href="https://forms.gle/btcfr8wDBMN3PWCeA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now <ArrowRight className="h-5 w-5 ml-2" />
          </a>
        </Button>

        <p className="mt-8 text-slate-400 flex justify-center items-center gap-2">
          <Mail className="h-4 w-4" />
          workshops@neurogati.com
        </p>
      </section>

    </div>
  )
}


