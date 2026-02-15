import NavbarWrapper from "@/components/global/NavbarWrapper"
import Footer from "@/components/global/footer"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <NavbarWrapper />
      {/* Standard padding: 
          48px (Banner) + 80px (Header) = 128px 
      */}
      <main className="flex-1 pt-[128px]">
        {children}
      </main>
      <Footer />
    </div>
  )
}