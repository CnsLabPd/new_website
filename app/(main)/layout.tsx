import NavbarWrapper from "@/components/global/NavbarWrapper"
import Footer from "@/components/global/footer"
import NiraChatbot from "@/components/global/nira-chatbot"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-frame relative flex min-h-screen flex-col">
      <NavbarWrapper />
      <main className="flex-1 pt-[76px]">
        {children}
      </main>
      <Footer />
      <NiraChatbot />
    </div>
  )
}
