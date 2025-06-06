import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LoadingWrapper } from "./loading-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "NeuroAI - AI-Powered Neurodisorder Diagnosis & Rehabilitation",
  description: "Advanced AI solutions for diagnosing and rehabilitating neurological disorders",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-royal-950 text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LoadingWrapper>{children}</LoadingWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
