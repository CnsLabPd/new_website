import Link from "next/link"
import { ArrowUpRight, Linkedin, Mail } from "lucide-react"

const footerLinks = [
  { href: "/neurovidya", label: "Neurovidya" },
  { href: "/neuroshiksha", label: "Neuroshiksha" },
  { href: "/neuroleela", label: "Neuroleela" },
  { href: "/workshops", label: "Workshops" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell py-12 md:py-16">
        <div className="grid gap-10 border-b border-[var(--site-line)] pb-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="site-wordmark inline-flex" aria-label="Neurogati home">
              <span>Neurogati</span>
              <small>Empowering Brains</small>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-[var(--site-muted)]">
              Brain science for learning, development and recovery.
            </p>
          </div>

          <div>
            <h2 className="site-footer-heading">Explore</h2>
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="site-footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="site-footer-heading">Get in touch</h2>
            <a href="mailto:contactus@neurogati.com" className="site-footer-link mt-5 flex items-center gap-2">
              <Mail size={16} aria-hidden="true" /> contactus@neurogati.com
            </a>
            <a href="https://www.linkedin.com/company/neurogati/" target="_blank" rel="noopener noreferrer" className="site-footer-link mt-3 flex items-center gap-2">
              <Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-[var(--site-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Neurogati. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-[var(--site-teal)]">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--site-teal)]">Terms</Link>
            <Link href="/refund" className="hover:text-[var(--site-teal)]">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
