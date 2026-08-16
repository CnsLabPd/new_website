"use client"
import { useState, useEffect, useRef } from "react"
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

// ─── Nav structure ────────────────────────────────────────────────────────────
type NavItem = { href: string; label: string; external?: boolean }
type NavGroup = { label: string; items: NavItem[] }
type NavEntry = NavItem | NavGroup

const isGroup = (entry: NavEntry): entry is NavGroup => "items" in entry

const navEntries: NavEntry[] = [
  {
    label: "Products",
    items: [
      { href: "/products", label: "Apps" },
      { href: "/gamingcategories", label: "Games" },
    ],
  },
  {
    label: "Education",
    items: [
      { href: "/workshops", label: "Workshops" },
      { href: "/advisory", label: "Advisory" },
      { href: "/modelling", label: "Modelling" },
    ],
  },
  { href: "https://neurokatha.wordpress.com/", label: "Blog", external: true },
  {
    label: "About",
    items: [
      { href: "/about", label: "About" },
      { href: "/team", label: "Team" },
      { href: "/gallery", label: "Gallery" },
      { href: "/contact", label: "Contact" },
    ],
  },
]

// ─── Desktop hover dropdown ────────────────────────────────────────────────────
function NavDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const groupActive = group.items.some((i) => i.href === pathname)

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-1 text-sm lg:text-base font-bold transition-colors",
          groupActive || open ? "text-[#1c82c2] dark:text-[#38bdf8]" : "text-foreground/80 hover:text-[#1c82c2]"
        )}
      >
        {group.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        // pt-3 acts as an invisible bridge so the menu doesn't close in the gap
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[110]">
          <div className="min-w-[190px] rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-xl shadow-black/10 p-2">
            {group.items.map((item) => {
              const active = pathname === item.href
              return item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-muted hover:text-[#1c82c2] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
                    active
                      ? "bg-[#1c82c2]/10 text-[#1c82c2] dark:text-[#38bdf8]"
                      : "text-foreground/80 hover:bg-muted hover:text-[#1c82c2]"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

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
            {navEntries.map((entry) =>
              isGroup(entry) ? (
                <NavDropdown key={entry.label} group={entry} pathname={pathname} />
              ) : entry.external ? (
                <a
                  key={entry.href}
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm lg:text-base font-bold text-foreground/80 hover:text-[#1c82c2] transition-colors"
                >
                  {entry.label}
                </a>
              ) : (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={cn(
                    "text-sm lg:text-base font-bold transition-colors",
                    pathname === entry.href ? "text-[#1c82c2] dark:text-[#38bdf8]" : "text-foreground/80 hover:text-[#1c82c2]"
                  )}
                >
                  {entry.label}
                </Link>
              )
            )}
            
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
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border animate-in slide-in-from-top-5 duration-300 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-6 px-8 py-10">
            {navEntries.map((entry) =>
              isGroup(entry) ? (
                <div key={entry.label} className="flex flex-col gap-3">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    {entry.label}
                  </p>
                  <div className="flex flex-col gap-3 pl-3 border-l-2 border-border">
                    {entry.items.map((item) => {
                      const isActive = pathname === item.href
                      return item.external ? (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-bold text-foreground"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "text-lg font-bold",
                            isActive ? "text-[#1c82c2] dark:text-[#38bdf8]" : "text-foreground"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ) : entry.external ? (
                <a
                  key={entry.href}
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {entry.label}
                </a>
              ) : (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={cn(
                    "text-xl font-bold",
                    pathname === entry.href ? "text-[#1c82c2] dark:text-[#38bdf8]" : "text-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {entry.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </div>
  )
}
