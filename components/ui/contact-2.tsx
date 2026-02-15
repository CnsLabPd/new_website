"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Globe, MapPin, Clock, Users } from "lucide-react"
import { useState, FormEvent } from "react";

interface Contact2Props {
  title?: string
  description?: string
  phone?: string
  email?: string
  web?: { label: string; url: string }
  address?: string
  hours?: string
}

export const Contact2 = ({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "(123) 34567890",
  email = "email@example.com",
  web = { label: "neurogati.com", url: "https://neurogati.com" },
  address = "IIT Madras Research Park, Chennai, India",
  hours = "Mon-Fri: 9:00 AM - 6:00 PM IST",
}: Contact2Props) => {
  // 2. Add state for form submission result
  const [result, setResult] = useState<string>("");

  // 3. Create the submission handler function
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    // --- IMPORTANT: REPLACE WITH YOUR ACTUAL ACCESS KEY ---
    // formData.append("access_key", "3737d9f-43b4-4b03-9d22-c71dbb8fba45");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        (event.target as HTMLFormElement).reset(); // Reset form fields
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Something went wrong!");
    }

    // Hide the result message after 5 seconds
    setTimeout(() => {
      setResult("");
    }, 5000);
  };
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-16 lg:flex-row lg:gap-20">
          {/* Left Column - Contact Info */}
          <div className="mx-auto flex max-w-lg flex-col justify-between gap-12">
            <div className="text-center lg:text-left">
              <h1 className="mb-6 text-4xl md:text-5xl font-bold text-black dark:text-white lg:text-6xl">{title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
            </div>

            <div className="space-y-8">
              <h3 className="text-center text-2xl font-bold text-black dark:text-white lg:text-left">Get in Touch</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800">
                  <div className="p-2 bg-violet-500 rounded-lg">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">Phone</p>
                    <a
                      href={`tel:${phone}`}
                      className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <div className="p-2 bg-amber-500 rounded-lg">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">Website</p>
                    <a
                      href={web.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                    >
                      {web.label}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">Address</p>
                    <p className="text-green-600 dark:text-green-400">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                  <div className="p-2 bg-gray-500 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">Business Hours</p>
                    <p className="text-gray-600 dark:text-gray-400">{hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="mx-auto flex max-w-2xl flex-col">
            <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 shadow-2xl">
              <div className="mb-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-[#104581] mr-3" />
                  <h2 className="text-2xl font-bold text-black dark:text-white">Send us a Message</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Ready to transform neurological care? Let's start the conversation.
                </p>
              </div>

              {/*<form className="space-y-6">*/}
              {/*  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">*/}
              {/*    <div className="space-y-2">*/}
              {/*      <Label htmlFor="firstname" className="text-foreground font-medium">*/}
              {/*        First Name **/}
              {/*      </Label>*/}
              {/*      <Input*/}
              {/*        type="text"*/}
              {/*        id="firstname"*/}
              {/*        placeholder="Enter your first name"*/}
              {/*        className="bg-background border-border text-foreground focus:border-blue-500 focus:ring-blue-500/20"*/}
              {/*        required*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*    <div className="space-y-2">*/}
              {/*      <Label htmlFor="lastname" className="text-foreground font-medium">*/}
              {/*        Last Name **/}
              {/*      </Label>*/}
              {/*      <Input*/}
              {/*        type="text"*/}
              {/*        id="lastname"*/}
              {/*        placeholder="Enter your last name"*/}
              {/*        className="bg-background border-border text-foreground focus:border-blue-500 focus:ring-blue-500/20"*/}
              {/*        required*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*  </div>*/}

              {/*  <div className="space-y-2">*/}
              {/*    <Label htmlFor="email" className="text-foreground font-medium">*/}
              {/*      Email Address **/}
              {/*    </Label>*/}
              {/*    <Input*/}
              {/*      type="email"*/}
              {/*      id="email"*/}
              {/*      placeholder="your.email@example.com"*/}
              {/*      className="bg-background border-border text-foreground focus:border-blue-500 focus:ring-blue-500/20"*/}
              {/*      required*/}
              {/*    />*/}
              {/*  </div>*/}

              {/*  <div className="space-y-2">*/}
              {/*    <Label htmlFor="organization" className="text-foreground font-medium">*/}
              {/*      Organization*/}
              {/*    </Label>*/}
              {/*    <Input*/}
              {/*      type="text"*/}
              {/*      id="organization"*/}
              {/*      placeholder="Your hospital, university, or company"*/}
              {/*      className="bg-background border-border text-foreground focus:border-blue-500 focus:ring-blue-500/20"*/}
              {/*    />*/}
              {/*  </div>*/}

              {/*  <div className="space-y-2">*/}
              {/*    <Label htmlFor="subject" className="text-foreground font-medium">*/}
              {/*      Subject **/}
              {/*    </Label>*/}
              {/*    <select*/}
              {/*      id="subject"*/}
              {/*      className="w-full h-10 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-blue-500 focus:ring-blue-500/20 focus:outline-none"*/}
              {/*      required*/}
              {/*    >*/}
              {/*      <option value="">Select a topic</option>*/}
              {/*      <option value="partnership">Partnership Opportunities</option>*/}
              {/*      <option value="research">Research Collaboration</option>*/}
              {/*      <option value="products">Product Information</option>*/}
              {/*      <option value="clinical">Clinical Trials</option>*/}
              {/*      <option value="careers">Career Opportunities</option>*/}
              {/*      <option value="media">Media Inquiries</option>*/}
              {/*      <option value="other">Other</option>*/}
              {/*    </select>*/}
              {/*  </div>*/}

              {/*  <div className="space-y-2">*/}
              {/*    <Label htmlFor="message" className="text-foreground font-medium">*/}
              {/*      Message **/}
              {/*    </Label>*/}
              {/*    <Textarea*/}
              {/*      placeholder="Tell us about your interest in Neurogati's neurotechnology solutions, research collaboration opportunities, or any questions you may have..."*/}
              {/*      id="message"*/}
              {/*      rows={6}*/}
              {/*      className="bg-background border-border text-foreground focus:border-blue-500 focus:ring-blue-500/20 resize-none"*/}
              {/*      required*/}
              {/*    />*/}
              {/*  </div>*/}

              {/*  <div className="flex items-start space-x-2">*/}
              {/*    <input*/}
              {/*      type="checkbox"*/}
              {/*      id="consent"*/}
              {/*      className="mt-1 h-4 w-4 text-blue-600 border-border rounded focus:ring-blue-500"*/}
              {/*      required*/}
              {/*    />*/}
              {/*    <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">*/}
              {/*      I agree to be contacted by Neurogati regarding my inquiry and understand that my information will be*/}
              {/*      handled according to the privacy policy.*/}
              {/*    </Label>*/}
              {/*  </div>*/}

              {/*  <Button*/}
              {/*    type="submit"*/}
              {/*    className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"*/}
              {/*  >*/}
              {/*    <Mail className="h-5 w-5 mr-2" />*/}
              {/*    Send Message*/}
              {/*  </Button>*/}
              {/*</form>*/}
              {/* 4. Add the onSubmit handler to the form */}
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Add a hidden input for the recipient email if you want to override the default */}
                <input type="hidden" name="to_email" value="contactus@neurogati.com"/>
                <input type="hidden" name="access_key" value="d3737d9f-43b4-4b03-9d22-c71dbb8fba45"/>
                {/*<input type="hidden" name="apikey" value="3737d9f-43b4-4b03-9d22-c71dbb8fba45"/>*/}
                {/* Add a hidden input for the subject line */}
                <input type="hidden" name="subject" value="New Contact Form Submission from your Website"/>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstname" className="text-foreground font-medium">
                      First Name *
                    </Label>
                    <Input
                        type="text"
                        id="firstname"
                        name="firstname" // 5. Add name attribute
                        placeholder="Enter your first name"
                        className="bg-background border-border text-foreground focus:border-blue-500 focus:ring-blue-500/20"
                        required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname" className="text-foreground font-medium">
                      Last Name *
                    </Label>
                    <Input
                        type="text"
                        id="lastname"
                        name="lastname" // 5. Add name attribute
                        placeholder="Enter your last name"
                        className="bg-background border-border text-foreground focus:border-blue-500 focus:ring-blue-500/20"
                        required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address *
                  </Label>
                  <Input
                      type="email"
                      id="email"
                      name="email" // 5. Add name attribute
                      placeholder="your.email@example.com"
                      className="bg-background border-border text-foreground focus:border-blue-500 focus:ring-blue-500/20"
                      required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-foreground font-medium">
                    Organization
                  </Label>
                  <Input
                      type="text"
                      id="organization"
                      name="organization" // 5. Add name attribute
                      placeholder="Your hospital, university, or company"
                      className="bg-background border-border text-foreground focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-foreground font-medium">
                    Subject *
                  </Label>
                  <select
                      id="topic"
                      name="topic" // 5. Add name attribute (changed from 'subject' to avoid conflict)
                      className="w-full h-10 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-blue-500 focus:ring-blue-500/20 focus:outline-none"
                      required
                  >
                    <option value="">Select a topic</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="research">Research Collaboration</option>
                    <option value="products">Product Information</option>
                    <option value="clinical">Clinical Trials</option>
                    <option value="careers">Career Opportunities</option>
                    <option value="media">Media Inquiries</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-medium">
                    Message *
                  </Label>
                  <Textarea
                      placeholder="Tell us about your interest..."
                      id="message"
                      name="message" // 5. Add name attribute
                      rows={6}
                      className="bg-background border-border text-foreground focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                      required
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input
                      type="checkbox"
                      id="consent"
                      name="consent" // 5. Add name attribute
                      className="mt-1 h-4 w-4 text-blue-600 border-border rounded focus:ring-blue-500"
                      required
                  />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                    I agree to be contacted by Neurogati...
                  </Label>
                </div>

                <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2"/>
                  Send Message
                </Button>

                {/* 6. Display the result message */}
                {result && <p className="text-center text-green-500 mt-4">{result}</p>}

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
