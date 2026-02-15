// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import Header from "@/components/global/header"
// import Footer from "@/components/global/footer"
// import { ThemeProvider } from "@/components/theme-provider"
// import WorkshopBanner from '@/components/ui/workshopbanner';

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Neurogati - Empowering Brains",
//   description: "Revolutionizing neurological care through AI, BCI, and computational neuroscience.",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <WorkshopBanner />
//         <ThemeProvider defaultTheme="dark" storageKey="neurogati-ui-theme">
//           <div className="sticky top-12 z-40 bg-background/80 backdrop-blur-sm">
//             <Header />
//           </div>
//           <main>{children}</main>
//           <Footer />
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
// app/layout.tsx

import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Neurogati - Empowering Brains",
  description: "Revolutionizing neurological care through AI, BCI, and computational neuroscience.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark" storageKey="neurogati-ui-theme">
          {children} 
        </ThemeProvider>
      </body>
    </html>
  )
}