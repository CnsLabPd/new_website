import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"
import { WavyBackground } from "@/components/ui/wavy-background"
import { ExpandableCard } from "@/components/ui/expandable-card"

const products = [
  {
    name: "Diagnostics",
    title: "Diagnostics",
    description: "Advanced AI-powered diagnostic tools for early detection and monitoring of neurological disorders. Our Quadis-PD™ platform provides comprehensive analysis with 94% accuracy.",
    tech: "Quadis-PD™ – 94% accuracy",
    image: "/quadis-pd-thumb.png",
    color: "blue",
    content: {
      overview:
        "Our flagship diagnostic platform that uses advanced AI to analyze behavioral data and provide early detection of disorders like PD, AD, and more. Quadis-PD™ integrates with existing clinical workflows and provides comprehensive reports for healthcare providers.",
      features: [
         "Multi-modal data analysis (movement, speech, cognitive)","Early detection algorithms with 94% accuracy", "Comprehensive clinical reports", "Integration with EHR systems"
      ],
      applications: [
        "Early-stage Parkinson's detection",
        "Disease progression monitoring",
        "Treatment response evaluation",
        "Clinical research support",
      ],
    },
  },
  {
    name: "Gaming & Rehab",
    // title: "cRGS™ Gaming Platform",
    title: "Gaming & Rehab",
    description: "Personalized AI-driven gaming solutions for rehabilitation that adapt to each patient's unique needs. Our cRGS™ platform transforms therapy into engaging games for better motivation and improved outcomes.",
    tech: "Completed clinical trials at Sree Chitra Tirunal Institute for Medical Sciences and Technology, National Institute of Mental Health and Neurosciences",
    image: "/games-rehab-thumb-v2.png",
    color: "violet",
    content: {
      overview:
        "A personalized rehabilitation platform that adapts to each patient's unique needs and progress, while gamifying therapy. Using AI-driven feedback, cRGS™ provides targeted exercises and activities to maximize recovery and improve motor function.",
      features: [
        "Adaptive exercise programs","Real-time progress tracking","Remote monitoring for clinicians","Gamified therapy modules"
      ],
      applications: [
        "Post-stroke motor recovery",
        "Cognitive rehabilitation",
        "Balance and coordination training",
        "Telerehabilitation programs",
      ],
    },
  },
  {
    name: "Assistive Tech",
    title: "Assistive Technologies Suite",
    description: "Innovative solutions to help patients with neurological disorders maintain independence and improve quality of life.",
    tech: "SparshBharati™, MudhraBharati™, NodText™",
    image: "/assistive-thumb.png",
    color: "green",
    content: {
      overview:
        "Comprehensive suite of assistive technologies designed to enhance independence and quality of life for patients with various neurological conditions.",
      features: [
        "SparshBharati™ - Bringing Braille to Indian languages, SparshBharati™ helps the visually-challenged patients to read any Indian language - written in Bharati script. Unlike other Braille scripts, SparshBharati™ does not use special characters, and hence helps in integrating sighted and non-sighted people more seamlessly.",
        "MudhraBharati™ - Similar to ASL which helps the hearing and speech impaired communicate in English with sign language, MudhraBharati™ was developed to help them communicate in any Indian language using the Bharati™ script. Watch the live demonstration showing real-time translation to Hindi text.",
        "NodText™ - For quadraplegic people with severe Cerebral Palsy, controlling a keyboard and mouse is very difficult. Hence we have developed a computer-vision based keyboard that can be operated with Head/Eye movements as possible by the patients.",
        "Customizable accessibility options",
      ],
      applications: [
        "Braille for all Indian languages",
        "Seamless integration with existing text",
        "Learned in under 30 minutes",
        "Unified sign language for Indian languages",
        "Fingerspelling-to-text conversion",
        "Computer vision for gesture recognition",
        "Keyboard control via head/eye movement",
        "Customizable, high-accuracy real-time tracking",
        "Multi-level training system",
        "Enhances digital accessibility",
      ],
    },
  },
  {
    name: "Brain-Computer Interface",
    title: "NeuroScope™ BCI System",
    description: "Cutting-edge BCI technology to restore function and communication for patients with severe neurological disorders. Our NeuroScope™ system offers 95% accuracy in neural decoding.",
    tech: "NeuroScope™ - High-fidelity neural decoding",
    image: "/bci-thumb.png",
    color: "amber",
    content: {
      overview:
        "A revolutionary BCI system that translates neural signals into images, allowing users with communicate effectively through thought alone.",
      features: [
        "95% neural signal decoding accuracy",
        "Real-time brain signal processing",
        "Multi-channel electrode support",
        "Machine learning optimization",
        "Real-time neural decoding",
        "Adaptive learning for improved accuracy",
        "Multi-platform integration",
      ],
      applications: [
        "Prosthetic device control",
        "Computer cursor control",
        "Communication assistance",
        "Neurofeedback therapy",
      ],
    },
  },
  {
    name: "Computational Modeling",
    title: "Neural Modeling Platform",
    description: "Advanced ML and AI algorithms to model and understand neurological disorders. Specialized in Parkinson's Disease modeling for treatment protocol planning.",
    tech: "Guiding personalized treatment strategies",
    image: "/neural-modeling-thumb.png",
    color: "red",
    content: {
      overview:
        "Our platform for understanding the effect of PD medication - Levodopa - on behaviour, helping with planning treatment protocol for a patient with a given set of symptoms.",
      features: [
        "Multi-modal data analysis (movement, speech, cognitive)",
        "Symptom tracking algorithms with 94% accuracy",
        "Customized Treatment Protocol",
        "Longitudinal Prediction of Patient performance."
      ],
      applications: [
        "Treatment protocol optimization",
        "Drug development support",
        "Clinical trial design",
        "Personalized medicine",
      ],
    },
  },
]

export default function ProductsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
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
          <h1 className="text-4xl md:text-6xl font-extrabold text-black dark:text-white mb-6">Our Products</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
            A comprehensive suite of clinically-validated neurotechnology solutions transforming patient care through
            AI-driven innovation and computational neuroscience.
          </p>
        </div>
      </WavyBackground>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Products Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
          {products.map((product, index) => (
            <ExpandableCard
              key={product.name}
              title={product.title}
              src={product.image}
              description={product.description}
              className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-muted"
              classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-semibold [&_h4]:text-lg [&_h4]:mb-3"
            >
              <div className="space-y-6">
                <div>
                  <h4>Overview</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{product.content.overview}</p>
                </div>

                <div>
                  <h4>Key Features</h4>
                  <ul className="space-y-2">
                    {product.content.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-zinc-600 dark:text-zinc-300">
                        <div
                          className={`w-2 h-2 ${
                            product.color === "blue"
                              ? "bg-blue-400"
                              : product.color === "violet"
                                ? "bg-violet-400"
                                : product.color === "green"
                                  ? "bg-green-400"
                                  : product.color === "amber"
                                    ? "bg-amber-400"
                                    : "bg-red-400"
                          } rounded-full mt-2 mr-3 flex-shrink-0`}
                        ></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Clinical Applications</h4>
                  <ul className="space-y-2">
                    {product.content.applications.map((application, idx) => (
                      <li key={idx} className="flex items-start text-zinc-600 dark:text-zinc-300">
                        <div
                          className={`w-2 h-2 ${
                            product.color === "blue"
                              ? "bg-blue-400"
                              : product.color === "violet"
                                ? "bg-violet-400"
                                : product.color === "green"
                                  ? "bg-green-400"
                                  : product.color === "amber"
                                    ? "bg-amber-400"
                                    : "bg-red-400"
                          } rounded-full mt-2 mr-3 flex-shrink-0`}
                        ></div>
                        {application}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`p-4 rounded-lg ${
                    product.color === "blue"
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      : product.color === "violet"
                        ? "bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800"
                        : product.color === "green"
                          ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                          : product.color === "amber"
                            ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                            : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  }`}
                >
                  <h4
                    className={`${
                      product.color === "blue"
                        ? "text-blue-700 dark:text-blue-300"
                        : product.color === "violet"
                          ? "text-violet-700 dark:text-violet-300"
                          : product.color === "green"
                            ? "text-green-700 dark:text-green-300"
                            : product.color === "amber"
                              ? "text-amber-700 dark:text-amber-300"
                              : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    Technology Highlight
                  </h4>
                  <p
                    className={`${
                      product.color === "blue"
                        ? "text-blue-600 dark:text-blue-400"
                        : product.color === "violet"
                          ? "text-violet-600 dark:text-violet-400"
                          : product.color === "green"
                            ? "text-green-600 dark:text-green-400"
                            : product.color === "amber"
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-red-600 dark:text-red-400"
                    } font-medium`}
                  >
                    {product.tech}
                  </p>
                </div>
              </div>
            </ExpandableCard>
          ))}
        </div>

        {/* Featured Product Highlights */}
        <div className="bg-muted rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Product Highlights</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Quadis-PD™ Accuracy</h3>
                  <p className="text-muted-foreground">
                    Diagnose, Monitor, and Rehab Parkinson's patients through advanced AI algorithms.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-violet-400 mb-2">cRGS™ Engagement</h3>
                  <p className="text-muted-foreground">
                    Gamified rehabilitation platform that increases patient engagement and therapy adherence.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">NeuroScope™ Precision</h3>
                  <p className="text-muted-foreground">
                    95% decoding accuracy for brain-computer interface applications and neural signal processing.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Assistive Innovation</h3>
                  <p className="text-muted-foreground">
                    Multiple assistive technologies helping patients maintain independence and quality of life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-900/20 via-violet-900/20 to-amber-900/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Deploy These Solutions?</h2>
          <p className="max-w-2xl mx-auto text-lg text-card-foreground mb-8 leading-relaxed">
            Transform your clinical practice with our cutting-edge neurotechnology solutions. Contact us to learn how
            our products can enhance patient outcomes in your facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <Link href="/contact">
                Contact Us to Deploy <Mail className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-violet-400 text-violet-400 hover:bg-violet-900/20 hover:text-violet-300 bg-transparent"
            >
              <Link href="/research">View Research Data</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
