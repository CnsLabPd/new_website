"use client"
import Header from "./header"
import WorkshopBanner from "../ui/workshopbanner"

export default function NavbarWrapper() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex flex-col shadow-2xl">
      {/* Background with heavy blur to give that 'FastCode' frosted glass look */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl -z-10" />
      
      <WorkshopBanner />
      <Header />
    </nav>
  )
}