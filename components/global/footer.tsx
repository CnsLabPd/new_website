import Link from "next/link"
import { BrainCircuit, Linkedin, Github, Twitter } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/research", label: "Research" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/bg_just_logo.png" alt="Neurogati" width={50} height={50} className="h-8 w-8 mb-1"/>
              <span className="text-2xl font-bold text-[#1c82c2]">Neurogati</span>
            </Link>
            <p className="text-muted-foreground">Empowering Brains</p>
            <div className="flex space-x-4">
              <Link href="https://www.linkedin.com/company/neurogati/" className="text-muted-foreground hover:text-blue-400">
                <Linkedin />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-blue-400">
                <Twitter />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="flex flex-col flex-wrap max-h-36 gap-y-2 gap-x-12">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-blue-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-blue-400">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-muted-foreground hover:text-blue-400">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact</h3>
            <p className="text-muted-foreground">
              Email:{" "}
              <a href="mailto:contactus@neurogati.com" className="text-[#008AD8] hover:underline">
                contactus@neurogati.com
              </a>
            </p>
            <p className="text-muted-foreground">
              Lab Website:{" "}
              <a href="https://sites.google.com/view/cnslabiitmadras/home" className="text-[#008AD8] hover:underline">
                cnslabiitm.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Neurogati. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 