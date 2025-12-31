"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {StickyBanner} from "@/components/ui/sticky-banner";

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    product: "",
    comments: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
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
        designation: "",
        product: "",
        comments: "",
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex w-full flex-col overflow-y-auto">
        <StickyBanner className="bg-gradient-to-b from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            Announcing Workshop on Brain Modeling [Online] from January 09th to 13th, 2026.{" "}
            <a href="/modelingworkshop">
              Visit Website
            </a>
          </p>
        </StickyBanner>
      </div>
      <header className="container z-10 flex h-20 items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/images/bg_just_logo.png" alt="Neurogati Logo" className="h-16 w-16 object-contain" />
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
          <Link href="/workshops" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Workshops
          </Link>
          <Link href="/research" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Research
          </Link>
          <Link href="/team" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Team
          </Link>
          <Link href="/careers" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Careers
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/contact">
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">Interested?</h1>
              <p className="mb-10 text-xl text-gray-300">
                Begin your journey with Neurogati's advanced neurological solutions.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy-900 py-20">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-12 md:grid-cols-3">
                <div className="md:col-span-1">
                  <h2 className="mb-6 text-2xl font-bold text-white">Get in Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                        <Mail className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-white">Email</h3>
                        <p className="text-gray-300">contactus@neurogati.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                        <Phone className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-white">Phone</h3>
                        <p className="text-gray-300">(+91)-9003632758</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3">
                        <MapPin className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-white">Address</h3>
                        <p className="text-gray-300">
                          IIT Madras Incubation Cell
                          <br />
                          IITM Research Park
                          <br />
                          Tharamani, Chennai - 600113
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="rounded-lg bg-navy-800 p-8">
                    <h2 className="mb-6 text-2xl font-bold text-white">Send Us a Message</h2>

                    {isSubmitted ? (
                      <div className="rounded-md bg-green-500/20 p-6 text-center">
                        <h3 className="mb-2 text-xl font-bold text-white">Thank You!</h3>
                        <p className="text-gray-300">
                          Your message has been sent successfully. We'll get back to you as soon as possible.
                        </p>
                        <Button
                          className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-white">
                              Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your name"
                              required
                              className="bg-navy-700 border-navy-600 text-white placeholder:text-gray-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">
                              Contact Email
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
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="designation" className="text-white">
                              Designation
                            </Label>
                            <Select
                              value={formData.designation}
                              onValueChange={(value) => handleSelectChange("designation", value)}
                              required
                            >
                              <SelectTrigger className="bg-navy-700 border-navy-600 text-white">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                              <SelectContent className="bg-navy-700 border-navy-600">
                                <SelectItem value="patient">Patient</SelectItem>
                                <SelectItem value="caretaker">Caretaker</SelectItem>
                                <SelectItem value="clinician">Clinician</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="product" className="text-white">
                              Product
                            </Label>
                            <Select
                              value={formData.product}
                              onValueChange={(value) => handleSelectChange("product", value)}
                              required
                            >
                              <SelectTrigger className="bg-navy-700 border-navy-600 text-white">
                                <SelectValue placeholder="Select product" />
                              </SelectTrigger>
                              <SelectContent className="bg-navy-700 border-navy-600">
                                <SelectItem value="quadis-pd">Quadis-PD</SelectItem>
                                <SelectItem value="neurorehab">NeuroRehab</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
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
                            placeholder="How can we help you?"
                            rows={5}
                            className="bg-navy-700 border-navy-600 text-white placeholder:text-gray-500"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    )}
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
                <Image
                  src="/images/neurogati-logo.jpg"
                  alt="Neurogati Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
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
                    Diagnostics
                  </Link>
                </li>
                <li>
                  <Link href="/products/therapy" className="text-gray-300 hover:text-white transition-colors">
                    Therapy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/assistive-technology"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Assistive Technology
                  </Link>
                </li>
                <li>
                  <Link href="/products/bci" className="text-gray-300 hover:text-white transition-colors">
                    BCI
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
