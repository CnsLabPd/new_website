"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, ExternalLink, Activity, BarChart3, Microscope } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// --- PRODUCT DATA ---
const diagnosticProducts = [
  {
    name: "Quamon-PD™",
    tagline: "Precision AI Behavioral Biomarkers",
    overview: "Our flagship clinical monitoring application uses advanced AI to analyze behavioral data for early detection and progression monitoring of Parkinson’s Disease and related disorders. By replacing subjective clinical observation with quantitative multi-modal data, Quamon-PD™ provides comprehensive, evidence-based reports for healthcare providers.",
    tech: "Quamon-PD™ : Multi-modal quantitative system",
    images: ["/Quamon-Pd.png"],
    features: [
      "Multi-modal data analysis (gait, speech, decision making, tremor)",
      "Early detection algorithms using ML biomarkers",
      "Comprehensive clinical reports with percentile scoring",
      "Seamless integration with EHR and clinical workflows"
    ],
    applications: [
      "Early-stage Parkinson's (PD) detection",
      "Disease progression monitoring & staging",
      "Evaluation of treatment/medication response",
      "Clinical research and data-driven drug trials"
    ],
    color: "blue",
  }
];

export default function NeuroDiagnosticsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#1c82c2 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-blue-500/10 text-[#1c82c2] border-blue-500/20 font-black uppercase tracking-widest px-4 py-1">
              Diagnostic Assistance and Monitoring
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-8">
              Diagnostics & <br /> Monitoring
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              Transforming neurological care through AI-powered behavioral biomarkers. We provide the tools for earlier detection and precise monitoring of Parkinson's Disease.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="space-y-32">
          {diagnosticProducts.map((product) => (
            /* CHANGED: Switched to grid-cols-2 (6/6 split) to give image more room */
            <div key={product.name} className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* LEFT COLUMN: Media & Tech Highlight */}
              <div className="space-y-8">
                {/* CHANGED: 
                  1. aspect-square gives significantly more height.
                  2. bg-muted/20 provides a subtle backdrop for the 'fit'.
                  3. object-contain ensures the whole image is visible.
                */}
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-border shadow-2xl bg-muted/10">
                  <Image 
                    src={product.images[0]} 
                    alt={product.name} 
                    fill 
                    className="object-contain p-4 md:p-8" 
                    priority
                  />
                </div>

                <div className="p-8 rounded-3xl bg-blue-500/[0.03] border border-blue-500/10 backdrop-blur-sm">
                  <h4 className="text-[#1c82c2] font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                    <Microscope className="h-4 w-4" /> Technology Highlight
                  </h4>
                  <p className="text-[17px] font-black text-foreground mb-2">{product.tech}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Powered by proprietary computer vision and deep learning algorithms trained on verified clinical datasets.
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN: Content */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">{product.name}</h2>
                  <p className="text-[19px] text-foreground/80 leading-relaxed font-medium">
                    {product.overview}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#1c82c2] mb-6">
                      <Activity className="h-4 w-4" /> Key Features
                    </h4>
                    <ul className="space-y-4">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="text-[17px] font-medium text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#1c82c2] mb-6">
                      <BarChart3 className="h-4 w-4" /> Clinical Applications
                    </h4>
                    <ul className="space-y-4">
                      {product.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="text-[17px] font-medium text-muted-foreground">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-12 border-t border-border/50">
                   <Button size="lg" className="bg-[#104581] hover:bg-blue-900 text-white font-black rounded-full px-10 h-14 text-lg" asChild>
                     <Link href="/contact">
                       Request Product Demo <ArrowRight className="ml-2 h-5 w-5" />
                     </Link>
                   </Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* FOOTER CTA */}
      <section className="container mx-auto px-6 mt-20">
        <div className="bg-card border border-border rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
            Advance Your Clinical Precision
          </h2>
          <p className="max-w-2xl mx-auto text-[19px] text-muted-foreground font-medium leading-relaxed mb-9">
            Neurogati's clinical monitoring tools are designed to work within existing medical infrastructures to provide objective data for complex decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-[#104581] text-white font-black rounded-full px-12 h-14">
              Contact Clinical Team
            </Button>
            <Button variant="outline" size="lg" className="border-border font-black rounded-full px-12 h-14" asChild>
              <Link href="/research">View Research Data</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
