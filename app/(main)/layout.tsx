import NavbarWrapper from "@/components/global/NavbarWrapper"
import Footer from "@/components/global/footer"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <NavbarWrapper />
      {/* Standard padding: 80px header */}
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}
