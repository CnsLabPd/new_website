import { WavyBackground } from "@/components/ui/wavy-background"
import AboutUsSection from "@/components/ui/about-us-section"

export default function AboutPage() {
  return (
    <>
      <WavyBackground
        colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]}
        waveWidth={60}
        blur={10}
        speed="fast"
        waveOpacity={0.3}
        containerClassName="h-[60vh] relative"
        className="max-w-4xl mx-auto"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black dark:text-white mb-6">About Neurogati</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
            Transforming neurological healthcare through AI-driven innovation and computational neuroscience.
          </p>
        </div>
      </WavyBackground>

      <div className="bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AboutUsSection />
        </div>
      </div>
    </>
  )
}
