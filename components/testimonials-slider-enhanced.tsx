"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  quote: string
  name: string
  position: string
  company: string
}

export function TestimonialsSliderEnhanced() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "Neurogati's diagnostic platform has revolutionized how we detect early signs of Parkinson's. The accuracy and ease of use have made it an essential tool in our practice.",
      name: "Dr. Rajesh Kumar",
      position: "Chief Neurologist",
      company: "Ramachandra Hospital",
    },
    {
      quote:
        "The rehabilitation gaming system has shown remarkable results in our stroke patients. We've seen significant improvements in motor function recovery compared to traditional methods.",
      name: "Dr. Priya Sharma",
      position: "Head of Rehabilitation",
      company: "SCTIMST",
    },
    {
      quote:
        "MudhraBharati has transformed how our students communicate. It's intuitive, easy to learn, and has bridged communication gaps we've struggled with for years.",
      name: "Anita Reddy",
      position: "Principal",
      company: "Sweekar School for the Deaf",
    },
    {
      quote:
        "The computational modeling tools have given us unprecedented insights into medication effects. We can now personalize treatment protocols with much greater precision.",
      name: "Dr. Vikram Patel",
      position: "Research Director",
      company: "JIPMER",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState("left")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Function to start the automatic sliding
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setSlideDirection("left")
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
  }

  // Initialize auto-sliding on component mount
  useEffect(() => {
    startAutoSlide()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Handle manual navigation
  const handlePrev = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    setSlideDirection("right")
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

    startAutoSlide()
  }

  const handleNext = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    setSlideDirection("left")
    setActiveIndex((prev) => (prev + 1) % testimonials.length)

    startAutoSlide()
  }

  return (
    <div className="relative mx-auto max-w-5xl px-4">
      <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2 md:left-4">
        <button
          onClick={handlePrev}
          className="rounded-full bg-navy-800 p-2 text-cyan-400 hover:bg-navy-700 hover:text-cyan-300 focus:outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2 md:right-4">
        <button
          onClick={handleNext}
          className="rounded-full bg-navy-800 p-2 text-cyan-400 hover:bg-navy-700 hover:text-cyan-300 focus:outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="relative mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            width: `${testimonials.length * 100}%`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full px-4" style={{ flex: `0 0 ${100 / testimonials.length}%` }}>
              <div className="rounded-lg bg-navy-800 p-8 shadow-lg mx-4">
                <div className="mb-4 text-cyan-400">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="mb-6 text-lg text-gray-300">{testimonial.quote}</p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">
                    {testimonial.position}
                    {testimonial.company && `, ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (intervalRef.current) clearInterval(intervalRef.current)
              setSlideDirection(index > activeIndex ? "left" : "right")
              setActiveIndex(index)
              startAutoSlide()
            }}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-cyan-400 w-8" : "bg-gray-600 w-2"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
