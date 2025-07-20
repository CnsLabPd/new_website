"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, BrainCircuit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/research", label: "Research" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            {/*<BrainCircuit className="h-8 w-8 text-blue-500" />*/}
            <Image src="/bg_just_logo.png" alt="Neurogati" width={50} height={50} className="h-10 w-10 mb-1"/>
            <span className="text-2xl font-bold text-[#1c82c2]">Neurogati</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-blue-400 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-foreground hover:bg-accent"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background shadow-lg border-t border-border">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-blue-400 transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
