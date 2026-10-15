import { Contact2 } from "@/components/ui/contact-2"

export default function ContactPage() {
  return (
    <div className="editorial-page min-h-screen">
      <section className="editorial-soft-section">
        <div className="site-shell py-20 md:py-28">
          <p className="editorial-eyebrow">Connect with Neurogati</p>
          <h1 className="mt-3 text-6xl md:text-8xl">Let’s talk.</h1>
          <p className="editorial-lead">For educators, schools, clinicians and research partners.</p>
          <p className="editorial-copy">Tell us what you’re working on and how we can help. We would love to explore a collaboration.</p>
        </div>
      </section>
      <div className="py-12">
        <Contact2
          title="Let's Connect"
          description="Whether you're a clinician interested in our diagnostic tools, a researcher exploring collaboration opportunities, or a healthcare institution looking to implement our solutions, we're here to help transform neurological care together."
          phone="+91 44 2257 5125"
          email="contactus@neurogati.com"
          web={{ label: "neurogati.com", url: "https://neurogati.com" }}
          address="IIT Madras Research Park, Chennai, Tamil Nadu, India"
          hours="Mon-Fri: 9:00 AM - 6:00 PM IST"
        />
      </div>
    </div>
  )
}
