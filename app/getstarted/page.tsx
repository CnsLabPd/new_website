import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Mail, Phone, MapPin, Clock } from "lucide-react"
import {StickyBanner} from "@/components/ui/sticky-banner";

export default function GetStarted() {
  return (
    <div className="min-h-screen">
      <div className="relative flex w-full flex-col overflow-y-auto">
        <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            Announcing Workshop on AI applications in EEG from September 12th to 14th, 2025.{" "}
            <a href="https://sites.google.com/smail.iitm.ac.in/eegaiworkshop/home?authuser=0" className="transition duration-200 hover:underline">
              Visit Website
            </a>
          </p>
        </StickyBanner>
      </div>
      {/* Header */}
      <header className="backdrop-blur-md border-b sticky top-0 z-50 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/images/bg_just_logo.png"
                alt="Neurogati Logo"
                className="h-8 w-8 object-cover"
              />
              <span className="text-2xl font-bold bg-white bg-clip-text text-transparent">
                Neurogati
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="/about" className="hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="/products" className="hover:text-blue-600 transition-colors">
                Products
              </a>
              <a href="/research" className="hover:text-blue-600 transition-colors">
                Research
              </a>
              {/*<a href="/contact" className="hover:text-blue-600 transition-colors">*/}
              {/*  Contact*/}
              {/*</a>*/}
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get Started with Neurogati
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to transform your neurological research or clinical practice? Let's discuss how our AI-powered
              solutions can help you achieve breakthrough results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl border-0 bg-royal-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Start Your Journey</CardTitle>
                <CardDescription className="">
                  Fill out the form below and our team will get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className={"bg-background/50"}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className={"bg-background/50"} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className={"bg-background/50"} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" placeholder="Your Hospital/University/Company" className={"bg-background/50"} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input id="role" placeholder="e.g., Neurologist, Researcher, CTO" className={"bg-background/50"} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest">Area of Interest</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-md bg-background/50">
                    <option value="">Select an area</option>
                    <option value="diagnostics">AI Diagnostics</option>
                    <option value="therapy">Rehabilitation Therapy</option>
                    <option value="bci">Brain-Computer Interface</option>
                    <option value="modeling">Computational Modeling</option>
                    <option value="assistive">Assistive Technology</option>
                    <option value="research">Research Collaboration</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your project</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your current challenges, goals, or how you'd like to use our technology..."
                    className="min-h-[100px] bg-background/50"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-xl border-0 bg-royal-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold ">Email</h3>
                      <p className="">contactus@neurogati.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="">+91 9500069322</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="">
                        IIT Madras Research Park,
                        <br />
                        Chennai, Tamil Nadu,
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Business Hours</h3>
                      <p className="">
                        Monday - Friday: 9:00 AM - 6:00 PM PST
                        <br />
                        Saturday: 10:00 AM - 2:00 PM PST
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Ready for a Demo?</h3>
                  <p className="mb-4 text-blue-100">
                    See our technology in action with a personalized demonstration tailored to your specific needs.
                  </p>
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Schedule a Demo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg border-0 bg-royal-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
                <p className="">We respond to all inquiries within 24 hours during business days.</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 bg-royal-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Consultation</h3>
                <p className="">Get personalized advice from our team of neuroscience and AI experts.</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 bg-royal-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ongoing Support</h3>
                <p className="">Comprehensive support throughout your journey with our technology.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
