"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, UserCircle, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AuthModal } from "@/components/auth/AuthModal"
import { createClient } from "@/lib/supabase"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Apps" },
    { href: "/gamingcategories", label: "Games" }, 
  { href: "/workshops", label: "Workshops" },
  { href: "/research", label: "Research" },
  { href: "/team", label: "Team" },
  // { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
  { href: "/media", label: "Media" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const supabase = createClient()

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <div className="w-full bg-transparent">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.02]">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg">
              <Image src="/bg_just_logo.png" alt="Logo" fill className="object-contain" priority />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-[#1c82c2] dark:text-[#38bdf8]">
              Neurogati
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm lg:text-base font-bold transition-colors",
                    isActive ? "text-[#1c82c2] dark:text-[#38bdf8]" : "text-foreground/80 hover:text-[#1c82c2]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <div className="flex items-center gap-4 pl-4 border-l border-border/50">
              <ThemeToggle />
              {/* LOGIN/SIGNUP CTA or USER INFO */}
              {loading ? (
                <div className="h-10 w-24 bg-muted/50 animate-pulse rounded-full" />
              ) : user ? (
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-foreground">
                    {user.user_metadata?.full_name || user.email}
                  </p>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-[#1c82c2] hover:bg-[#16699d] text-white rounded-full px-6 font-bold transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>

          <div className="md:hidden flex items-center gap-4">
            {!loading && (
              user ? (
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                  <UserCircle className="h-6 w-6" />
                </Button>
              )
            )}
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Auth Modal Component */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* MOBILE NAV */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border animate-in slide-in-from-top-5 duration-300">
          <nav className="flex flex-col items-center gap-6 py-10">
            {user && (
              <div className="text-center pb-4 border-b border-border/50 w-full">
                <p className="text-lg font-bold text-foreground">
                  {user.user_metadata?.full_name || user.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            )}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xl font-bold",
                    isActive ? "text-[#1c82c2] dark:text-[#38bdf8]" : "text-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  )
}