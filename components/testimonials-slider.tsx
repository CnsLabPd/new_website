"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  quote: string
  name: string
  position: string
  company: string
}

export function TestimonialsSlider() {
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

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500) // Match this with the CSS transition duration
  }, [isAnimating, testimonials.length])

  const prevTestimonial = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500) // Match this with the CSS transition duration
  }, [isAnimating, testimonials.length])

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000) // Change testimonial every 5 seconds

    return () => clearInterval(interval)
  }, [nextTestimonial])

  // Calculate indices for visible testimonials
  const getVisibleIndices = () => {
    const indices = []
    for (let i = 0; i < 3; i++) {
      indices.push((currentIndex + i) % testimonials.length)
    }
    return indices
  }

  const visibleIndices = getVisibleIndices()

  return (
    <div className="relative overflow-hidden py-10">
      <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2">
        <button
          onClick={prevTestimonial}
          className="rounded-full bg-navy-800 p-2 text-cyan-400 hover:bg-navy-700 hover:text-cyan-300 focus:outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2">
        <button
          onClick={nextTestimonial}
          className="rounded-full bg-navy-800 p-2 text-cyan-400 hover:bg-navy-700 hover:text-cyan-300 focus:outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mx-auto flex max-w-6xl items-stretch gap-6 px-12">
        {visibleIndices.map((index, i) => (
          <div
            key={index}
            className={`w-full transform rounded-lg bg-navy-800 p-6 shadow-lg transition-all duration-500 ease-in-out ${
              i === 0
                ? "translate-x-0 opacity-100"
                : i === 1
                  ? "translate-x-0 opacity-100"
                  : "translate-x-0 opacity-100"
            }`}
          >
            <div className="mb-4 text-cyan-400">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="mb-6 text-lg text-gray-300">{testimonials[index].quote}</p>
            <div>
              <p className="font-bold text-white">{testimonials[index].name}</p>
              <p className="text-sm text-gray-400">
                {testimonials[index].position}, {testimonials[index].company}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentIndex(index)
                setTimeout(() => setIsAnimating(false), 500)
              }
            }}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-cyan-400" : "bg-gray-600"}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
