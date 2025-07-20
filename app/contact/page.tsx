import { Contact2 } from "@/components/ui/contact-2"
import { WavyBackground } from "@/components/ui/wavy-background"

export default function ContactPage() {
  return (
    <>
      <WavyBackground
        colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]}
        waveWidth={60}
        blur={10}
        speed="fast"
        waveOpacity={0.3}
        containerClassName="h-[60vh] relative"
        className="max-w-4xl mx-auto"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black dark:text-white mb-6">Contact Neurogati</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
            Ready to revolutionize neurological care? Let's collaborate to bring cutting-edge neurotechnology solutions
            to your practice or research.
          </p>
        </div>
      </WavyBackground>

      <div className="bg-background text-foreground">
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
    </>
  )
}
