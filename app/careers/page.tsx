"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase, Upload, CheckCircle } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
  })
  const [fileName, setFileName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
    } else {
      setFileName("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        comments: "",
      })
      setFileName("")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-10 flex h-20 items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/images/Neurogati.jpg" alt="Neurogati Logo" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold text-white">Neurogati</span>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Products
          </Link>
          <Link href="/research" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Research
          </Link>
          <Link href="/team" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Team
          </Link>
          <Link href="/careers" className="text-sm font-medium text-white transition-colors">
            Careers
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/getstarted">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              Contact Us
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-navy-950 py-20">
          <div className="absolute inset-0 z-0">
            <WaveBackground />
          </div>
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">Join Our Team</h1>
              <p className="mb-10 text-xl text-gray-300">
                Help us revolutionize neurological care with cutting-edge AI technology.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy-900 py-20">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-12 md:grid-cols-2">
                <div>
                  <h2 className="mb-8 text-3xl font-bold text-white">Open Positions</h2>

                  <div className="space-y-6">
                    <div className="rounded-lg bg-navy-800 p-6">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                          <Briefcase className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-xl font-bold text-white">Android Developer</h3>
                          <p className="mb-4 text-gray-300">
                            We're looking for an experienced Android developer to help develop our algorithms into apps.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">
                              Full-time
                            </span>
                            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">Remote</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-cyan-400 border-cyan-500/50 bg-transparent"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-navy-800 p-6">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                          <Briefcase className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-xl font-bold text-white">Clinical Research Coordinator</h3>
                          <p className="mb-4 text-gray-300">
                            Join our clinical team to coordinate research studies and clinical trials for our products.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">
                              Full-time
                            </span>
                            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">Chennai</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-cyan-400 border-cyan-500/50 bg-transparent"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-navy-800 p-6">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                          <Briefcase className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-xl font-bold text-white">Game Developer</h3>
                          <p className="mb-4 text-gray-300">
                            Work with our clinical team to build games for therapeutic use.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">
                              Full-time
                            </span>
                            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">Hybrid</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-cyan-400 border-cyan-500/50 bg-transparent"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="rounded-lg bg-navy-800 p-8">
                    <h2 className="mb-6 text-2xl font-bold text-white">Apply Now</h2>

                    {isSubmitted ? (
                      <div className="rounded-md bg-green-500/20 p-6 text-center">
                        <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                        <h3 className="mb-2 text-xl font-bold text-white">Application Received!</h3>
                        <p className="text-gray-300">
                          Thank you for your interest in joining Neurogati. Our team will review your application and
                          get back to you soon.
                        </p>
                        <Button
                          className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Submit Another Application
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            required
                            className="bg-navy-700 border-navy-600 text-white placeholder:text-gray-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">
                            Email ID
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email address"
                            required
                            className="bg-navy-700 border-navy-600 text-white placeholder:text-gray-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cv" className="text-white">
                            Attach CV
                          </Label>
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              id="cv"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              required
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="bg-navy-700 border-navy-600 text-white hover:bg-navy-600"
                            >
                              <Upload className="mr-2 h-4 w-4" /> Upload CV
                            </Button>
                            {fileName && (
                              <span className="text-sm text-gray-300 truncate max-w-[200px]">{fileName}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Accepted formats: PDF, DOC, DOCX</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="comments" className="text-white">
                            Comments
                          </Label>
                          <Textarea
                            id="comments"
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            placeholder="Tell us about yourself and why you're interested in joining Neurogati"
                            rows={5}
                            className="bg-navy-700 border-navy-600 text-white placeholder:text-gray-500"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      </form>
                    )}
                  </div>

                  <div className="mt-8 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-6">
                    <h3 className="mb-4 text-xl font-bold text-white">Why Join Neurogati?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300">
                          Work on cutting-edge AI technology that makes a real difference in patients' lives
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300">
                          Collaborative environment with experts in neurology, AI, and healthcare
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300">
                          Competitive compensation and comprehensive benefits package
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300">Flexible work arrangements and growth opportunities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy-900 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/images/neurogati-logo-new.jpg" alt="Neurogati Logo" className="h-6 w-6 object-contain" />
                <span className="text-lg font-bold text-white">Neurogati</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing neurological care through AI-powered diagnostics and personalized rehabilitation.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products/diagnostics" className="text-gray-300 hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    For Clinicians
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    For Researchers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    For Patients
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/research" className="text-gray-300 hover:text-white transition-colors">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Clinical Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-gray-300 hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Neurogati. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
