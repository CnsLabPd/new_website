"use client"

import { useEffect, useRef } from "react"
import { GradientButton } from "@/components/ui/gradient-button"
import { WavyBackground } from "@/components/ui/wavy-background"

interface HeroContentProps {
  title?: string
  tagline?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
}

function HeroContent({
  title = "Neurogati",
  tagline = "Empowering Brains",
  description = "Revolutionizing neurological care through AI, BCI, and computational neuroscience.",
  primaryButtonText = "Explore Our Products",
  primaryButtonHref = "/products",
  secondaryButtonText = "Watch Demo",
  secondaryButtonHref = "#demo",
}: HeroContentProps) {
  return (
    <div className="text-left text-white pt-16 sm:pt-24 md:pt-32 px-6 sm:px-12 md:px-24 max-w-4xl">
      <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold mb-4 leading-tight tracking-wide animate-fade-in">
        {title}
      </h1>
      <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-violet-200 mb-6 animate-fade-in-delay-1">
        {tagline}
      </p>
      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80 max-w-2xl text-gray-200 animate-fade-in-delay-2">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3 animate-fade-in-delay-3">
        <GradientButton variant={"variant"} asChild>
          <a href={primaryButtonHref}>{primaryButtonText}</a>
        </GradientButton>
      </div>
    </div>
  )
}

export interface GalaxyHeroSectionProps {
  title?: string
  tagline?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
}

export const GalaxyHeroSection = ({
  title,
  tagline,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}: GalaxyHeroSectionProps) => {
  const heroContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset
          const maxScroll = 400
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1)
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString()
          }
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen">
      <WavyBackground
        colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]}
        waveWidth={80}
        blur={5}
        speed="fast"
        waveOpacity={0.4}
        backgroundFill="rgb(15, 23, 42)"
        containerClassName="h-screen relative"
        className="w-full h-full flex items-center"
      >
        <div ref={heroContentRef} className="container mx-auto h-full flex items-center relative z-10">
          {/*<HeroContent*/}
          {/*  title={title}*/}
          {/*  tagline={tagline}*/}
          {/*  description={description}*/}
          {/*  primaryButtonText={primaryButtonText}*/}
          {/*  primaryButtonHref={primaryButtonHref}*/}
          {/*  secondaryButtonText={secondaryButtonText}*/}
          {/*  secondaryButtonHref={secondaryButtonHref}*/}
          {/*/>*/}
          <div className="text-left text-white pt-16 sm:pt-24 md:pt-32 px-6 sm:px-12 md:px-24 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold mb-4 leading-tight tracking-wide animate-fade-in">
              Neurogati
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-violet-200 mb-6 animate-fade-in-delay-1">
              Empowering Brains
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80 max-w-2xl text-gray-200 animate-fade-in-delay-2">
              Revolutionizing neurological care through AI, BCI, and computational neuroscience.
            </p>
            <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3 animate-fade-in-delay-3">
              <GradientButton variant={"variant"} asChild>
                <a href="/products">Explore Our Products</a>
              </GradientButton>
            </div>
          </div>
        </div>
      </WavyBackground>
    </div>
  )
}
