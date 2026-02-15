import { Contact2 } from "@/components/ui/contact-2"

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      
      {/* 1. HERO SECTION - Replaces WavyBackground */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        {/* Technical Radial Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(#1c82c2 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} 
        />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Contact Neurogati
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            Ready to revolutionize neurological care? Let's collaborate to bring cutting-edge 
            neurotechnology solutions to your practice or research institution.
          </p>
        </div>
      </section>

      {/* 2. CONTACT FORM SECTION */}
      <div className="bg-background text-foreground py-12">
        <Contact2
          title="Let's Connect"
          description="Whether you're a clinician interested in our diagnostic tools, a researcher exploring collaboration opportunities, or a healthcare institution looking to implement our solutions, we're here to help transform neurological care together."
          phone="+91 44 2257 4000"
          email="contactus@neurogati.com"
          web={{ label: "neurogati.com", url: "https://neurogati.com" }}
          address="IIT Madras Research Park, Chennai, Tamil Nadu, India"
          hours="Mon-Fri: 9:00 AM - 6:00 PM IST"
        />
      </div>
    </div>
  )
}