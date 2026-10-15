"use client"
import Header from "./header"
import WorkshopBanner from "../ui/workshopbanner"

export default function NavbarWrapper() {
  return (
    <div className="fixed inset-x-0 top-0 z-[100]">
      <WorkshopBanner />
      <Header />
    </div>
  )
}
