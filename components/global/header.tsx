"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, UserCircle, X, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AuthModal } from "@/components/auth/AuthModal"
import { createClient } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: "/products", label: "Apps" },
  { href: "/gamingcategories", label: "Games" },
  { href: "/workshops", label: "Workshops" },
  { href: "/modelling", label: "Modelling" },
  { href: "/team", label: "Team" },
  // { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "https://neurokatha.wordpress.com/", label:"Blog" },
  { href: "/contact", label: "Contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [username, setUsername] = useState<string>("")
  const pathname = usePathname()
  const supabase = createClient()
  const { toast } = useToast()

  // Check user authentication
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        // Get username from user metadata
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
        setUsername(name)
      }
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const name = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User'
        setUsername(name)
      } else {
        setUsername("")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      })
      setUser(null)
      setUsername("")
    }
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
              {/* LOGIN/SIGNUP CTA or USER MENU */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full px-4 font-bold gap-2">
                      <UserCircle className="h-5 w-5" />
                      {username}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
             <Button variant="ghost" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                <UserCircle className="h-6 w-6" />
             </Button>
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
