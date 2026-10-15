"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { href: "/", label: "Home" },
  { href: "/neurovidya", label: "Neurovidya" },
  { href: "/neuroshiksha", label: "Neuroshiksha" },
  { href: "/neuroleela", label: "Neuroleela" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="site-header">
      <div className="site-shell flex h-[76px] items-center justify-between gap-8">
        <Link href="/" className="site-wordmark" onClick={() => setMenuOpen(false)} aria-label="Neurogati home">
          <Image src="/bg_just_logo.png" alt="" width={42} height={42} priority className="site-header-logo" />
          <span className="site-wordmark-copy">
            <span>Neurogati</span>
            <small>Empowering Brains</small>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} className={cn("site-nav-link", active && "site-nav-link-active")}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--site-line)] text-[var(--site-ink)]"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="site-mobile-menu" aria-label="Mobile navigation" className="site-mobile-nav lg:hidden">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
