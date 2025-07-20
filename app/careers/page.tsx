"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState, FormEvent, ChangeEvent } from "react";
import {
  MapPin,
  Users,
  Briefcase,
  MonitorSmartphone,
  FlaskConical,
  Gamepad2,
  Mail,
  UploadCloud,
  Lightbulb,
  Target,
  Coffee,
} from "lucide-react"
import Link from "next/link"
import { WavyBackground } from "@/components/ui/wavy-background"

const openRoles = [
  {
    title: "Android Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    icon: <MonitorSmartphone className="h-8 w-8 text-blue-400" />,
    description:
      "Help translate our cutting-edge algorithms into user-friendly, high-impact mobile applications for patients and clinicians.",
    responsibilities: [
      "Develop native Android applications for our neurotechnology products",
      "Collaborate with AI/ML teams to integrate complex algorithms",
      "Ensure optimal performance and user experience",
      "Work with clinical teams to understand user requirements",
    ],
    requirements: [
      "3+ years Android development experience",
      "Proficiency in Kotlin/Java",
      "Experience with healthcare or medical apps preferred",
      "Understanding of UI/UX principles",
    ],
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    title: "Clinical Research Coordinator",
    type: "Full-time",
    location: "Chennai",
    department: "Research",
    icon: <FlaskConical className="h-8 w-8 text-violet-400" />,
    description:
      "Coordinate our clinical studies and trials, ensuring data integrity and patient safety as we validate our technologies.",
    responsibilities: [
      "Manage clinical trial protocols and documentation",
      "Coordinate with healthcare institutions and research partners",
      "Ensure compliance with regulatory requirements",
      "Monitor patient enrollment and data collection",
    ],
    requirements: [
      "Master's in Life Sciences or related field",
      "2+ years clinical research experience",
      "Knowledge of GCP and regulatory guidelines",
      "Strong organizational and communication skills",
    ],
    color: "violet",
    gradient: "from-violet-500/20 to-violet-600/20",
  },
  {
    title: "Game Developer",
    type: "Full-time",
    location: "Hybrid",
    department: "Product Development",
    icon: <Gamepad2 className="h-8 w-8 text-amber-400" />,
    description:
      "Develop engaging and effective rehabilitation games in collaboration with our clinical and neuroscience teams.",
    responsibilities: [
      "Design and develop therapeutic gaming applications",
      "Collaborate with clinicians to ensure therapeutic efficacy",
      "Implement gamification strategies for patient engagement",
      "Optimize games for various platforms and devices",
    ],
    requirements: [
      "3+ years game development experience",
      "Proficiency in Unity or Unreal Engine",
      "Experience with mobile and web game development",
      "Interest in healthcare applications",
    ],
    color: "amber",
    gradient: "from-amber-500/20 to-amber-600/20",
  },
]

const benefits = [
  // {
  //   icon: <Heart className="h-6 w-6 text-red-400" />,
  //   title: "Health & Wellness",
  //   description: "Comprehensive health insurance and wellness programs",
  // },
  {
    icon: <Lightbulb className="h-6 w-6 text-yellow-400" />,
    title: "Learning & Growth",
    description: "Continuous learning opportunities and conference attendance",
  },
  {
    icon: <Users className="h-6 w-6 text-green-400" />,
    title: "Collaborative Culture",
    description: "Work with world-class researchers and clinicians",
  },
  {
    icon: <Coffee className="h-6 w-6 text-amber-400" />,
    title: "Work-Life Balance",
    description: "Flexible working hours and remote work options",
  },
]

export default function CareersPage() {
  const [result, setResult] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Submitting....");
    const formData = new FormData(event.currentTarget);

    // --- IMPORTANT: REPLACE WITH YOUR ACTUAL ACCESS KEY ---
    formData.append("access_key", "d3737d9f-43b4-4b03-9d22-c71dbb8fba45");
    formData.append("subject", "New Job Application Submitted"); // Set a subject for the email
    formData.append("from_name", "Neurogati Careers"); // Optional: set a sender name

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Application Submitted Successfully!");
        (event.target as HTMLFormElement).reset(); // Reset form
        setFileName(""); // Reset file name display
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
          <h1 className="text-4xl md:text-6xl font-extrabold text-black dark:text-white mb-6">Careers at Neurogati</h1>
          <p className="text-2xl text-violet-200 font-semibold mb-4">
            We're building technologies that transform lives. Join us.
          </p>
          <p className="max-w-3xl mx-auto text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
            Be part of a mission-driven team that's revolutionizing neurological healthcare through cutting-edge AI,
            brain-computer interfaces, and computational neuroscience.
          </p>
        </div>
      </WavyBackground>

      <div className="bg-background text-foreground min-h-screen pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          {/* Company Culture */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Work With Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join a team where your work directly impacts patients' lives and advances the field of neurotechnology.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card
                  key={benefit.title}
                  className="bg-card border border-border text-center p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Open Positions */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Open Positions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our current openings and find the perfect role to advance your career while making a difference.
              </p>
            </div>
            <div className="space-y-8">
              {openRoles.map((role, index) => (
                <Card
                  key={role.title}
                  className={`bg-gradient-to-r ${role.gradient} border-l-4 border-${role.color}-500 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-muted rounded-lg">{role.icon}</div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-foreground mb-2">{role.title}</CardTitle>
                          <div className="flex flex-wrap gap-3 mb-3">
                            <Badge
                              className={
                                role.color === "blue"
                                  ? "bg-blue-900/50 text-blue-300 border-blue-500/50"
                                  : role.color === "violet"
                                    ? "bg-violet-900/50 text-violet-300 border-violet-500/50"
                                    : role.color === "amber"
                                      ? "bg-amber-900/50 text-amber-300 border-amber-500/50"
                                      : "bg-green-900/50 text-green-300 border-green-500/50"
                              }
                            >
                              <Briefcase className="h-3 w-3 mr-1" />
                              {role.type}
                            </Badge>
                            <Badge variant="outline" className="border-border text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {role.location}
                            </Badge>
                            <Badge variant="outline" className="border-border text-muted-foreground">
                              <Users className="h-3 w-3 mr-1" />
                              {role.department}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        asChild
                        className={`bg-${role.color}-600 hover:bg-${role.color}-700 text-white shadow-lg flex-shrink-0`}
                      >
                        <Link href={`#apply-${role.title.toLowerCase().replace(/\s+/g, "-")}`}>Apply Now</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-card-foreground text-lg leading-relaxed">{role.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-foreground font-semibold mb-3 flex items-center">
                          <Target className="h-4 w-4 mr-2 text-amber-400" />
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {role.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="text-muted-foreground text-sm flex items-start">
                              <div
                                className={`w-2 h-2 bg-${role.color}-400 rounded-full mt-2 mr-3 flex-shrink-0`}
                              ></div>
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-foreground font-semibold mb-3 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2 text-amber-400" />
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {role.requirements.map((requirement, idx) => (
                            <li key={idx} className="text-muted-foreground text-sm flex items-start">
                              <div
                                className={`w-2 h-2 bg-${role.color}-400 rounded-full mt-2 mr-3 flex-shrink-0`}
                              ></div>
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Application Form */}
          {/*<section className="mb-20">*/}
          {/*  <div className="max-w-4xl mx-auto">*/}
          {/*    <Card className="bg-card border border-border shadow-2xl">*/}
          {/*      <CardHeader className="text-center">*/}
          {/*        <CardTitle className="text-3xl font-bold text-foreground mb-4">Apply Now</CardTitle>*/}
          {/*        <p className="text-muted-foreground">*/}
          {/*          Ready to join our mission? Submit your application and let's start a conversation.*/}
          {/*        </p>*/}
          {/*      </CardHeader>*/}
          {/*      <CardContent className="space-y-6">*/}
          {/*        <div className="grid md:grid-cols-2 gap-6">*/}
          {/*          <div className="space-y-2">*/}
          {/*            <Label htmlFor="firstName" className="text-foreground">*/}
          {/*              First Name*/}
          {/*            </Label>*/}
          {/*            <Input*/}
          {/*              id="firstName"*/}
          {/*              placeholder="Enter your first name"*/}
          {/*              className="bg-background border-border text-foreground"*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*          <div className="space-y-2">*/}
          {/*            <Label htmlFor="lastName" className="text-foreground">*/}
          {/*              Last Name*/}
          {/*            </Label>*/}
          {/*            <Input*/}
          {/*              id="lastName"*/}
          {/*              placeholder="Enter your last name"*/}
          {/*              className="bg-background border-border text-foreground"*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*        </div>*/}

          {/*        <div className="space-y-2">*/}
          {/*          <Label htmlFor="email" className="text-foreground">*/}
          {/*            Email Address*/}
          {/*          </Label>*/}
          {/*          <Input*/}
          {/*            id="email"*/}
          {/*            type="email"*/}
          {/*            placeholder="your.email@example.com"*/}
          {/*            className="bg-background border-border text-foreground"*/}
          {/*          />*/}
          {/*        </div>*/}

          {/*        <div className="space-y-2">*/}
          {/*          <Label htmlFor="position" className="text-foreground">*/}
          {/*            Position of Interest*/}
          {/*          </Label>*/}
          {/*          <select className="w-full p-3 bg-background border border-border rounded-md text-foreground">*/}
          {/*            <option value="">Select a position</option>*/}
          {/*            {openRoles.map((role) => (*/}
          {/*              <option key={role.title} value={role.title}>*/}
          {/*                {role.title}*/}
          {/*              </option>*/}
          {/*            ))}*/}
          {/*            <option value="other">Other</option>*/}
          {/*          </select>*/}
          {/*        </div>*/}

          {/*        <div className="space-y-2">*/}
          {/*          <Label htmlFor="experience" className="text-foreground">*/}
          {/*            Years of Experience*/}
          {/*          </Label>*/}
          {/*          <Input*/}
          {/*            id="experience"*/}
          {/*            placeholder="e.g., 3-5 years"*/}
          {/*            className="bg-background border-border text-foreground"*/}
          {/*          />*/}
          {/*        </div>*/}

          {/*        <div className="space-y-2">*/}
          {/*          <Label htmlFor="coverLetter" className="text-foreground">*/}
          {/*            Cover Letter*/}
          {/*          </Label>*/}
          {/*          <Textarea*/}
          {/*            id="coverLetter"*/}
          {/*            placeholder="Tell us why you're interested in joining Neurogati and how your skills align with our mission..."*/}
          {/*            rows={6}*/}
          {/*            className="bg-background border-border text-foreground"*/}
          {/*          />*/}
          {/*        </div>*/}

          {/*        <div className="space-y-2">*/}
          {/*          <Label htmlFor="resume" className="text-foreground">*/}
          {/*            Resume/CV*/}
          {/*          </Label>*/}
          {/*          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground transition-colors">*/}
          {/*            <div className="flex flex-col items-center space-y-2">*/}
          {/*              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">*/}
          {/*                <Mail className="h-6 w-6 text-muted-foreground" />*/}
          {/*              </div>*/}
          {/*              <p className="text-muted-foreground mb-2">Upload your resume</p>*/}
          {/*              <p className="text-muted-foreground text-sm">PDF, DOC, DOCX (max 5MB)</p>*/}
          {/*              <Button variant="outline" size="sm" className="mt-2 bg-transparent">*/}
          {/*                Choose File*/}
          {/*              </Button>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}

          {/*        <div className="flex flex-col sm:flex-row gap-4 pt-6">*/}
          {/*          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">*/}
          {/*            <Mail className="h-4 w-4 mr-2" />*/}
          {/*            Submit Application*/}
          {/*          </Button>*/}
          {/*          <Button*/}
          {/*            variant="outline"*/}
          {/*            className="border-border text-muted-foreground hover:bg-muted bg-transparent"*/}
          {/*          >*/}
          {/*            Save as Draft*/}
          {/*          </Button>*/}
          {/*        </div>*/}
          {/*      </CardContent>*/}
          {/*    </Card>*/}
          {/*  </div>*/}
          {/*</section>*/}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card border border-border shadow-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-foreground mb-4">
                    Apply Now
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Ready to join our mission? Submit your application and let's start
                    a conversation.
                  </p>
                </CardHeader>

                {/* 3. Wrap content in a form and add the handler */}
                <form onSubmit={onSubmit}>
                  <CardContent className="space-y-6">
                    {/* --- Personal Information --- */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-foreground">
                          First Name *
                        </Label>
                        <Input
                            id="firstName"
                            name="first_name" // 4. Add name attribute
                            placeholder="Enter your first name"
                            className="bg-background border-border text-foreground"
                            required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-foreground">
                          Last Name *
                        </Label>
                        <Input
                            id="lastName"
                            name="last_name" // 4. Add name attribute
                            placeholder="Enter your last name"
                            className="bg-background border-border text-foreground"
                            required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        Email Address *
                      </Label>
                      <Input
                          id="email"
                          name="email" // 4. Add name attribute
                          type="email"
                          placeholder="your.email@example.com"
                          className="bg-background border-border text-foreground"
                          required
                      />
                    </div>

                    {/* --- Application Details --- */}
                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-foreground">
                        Position of Interest *
                      </Label>
                      <select
                          id="position"
                          name="position" // 4. Add name attribute
                          className="w-full p-3 bg-background border border-border rounded-md text-foreground h-11"
                          required
                      >
                        <option value="">Select a position</option>
                        {openRoles.map((role) => (
                            <option key={role.title} value={role.title}>
                              {role.title}
                            </option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-foreground">
                        Years of Experience
                      </Label>
                      <Input
                          id="experience"
                          name="experience" // 4. Add name attribute
                          placeholder="e.g., 3-5 years"
                          className="bg-background border-border text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverLetter" className="text-foreground">
                        Cover Letter *
                      </Label>
                      <Textarea
                          id="coverLetter"
                          name="cover_letter" // 4. Add name attribute
                          placeholder="Tell us why you're interested..."
                          rows={6}
                          className="bg-background border-border text-foreground"
                          required
                      />
                    </div>

                    {/* 5. Functional File Upload */}
                    {/*<div className="space-y-2">*/}
                    {/*  <Label htmlFor="resume" className="text-foreground">*/}
                    {/*    Resume/CV **/}
                    {/*  </Label>*/}
                    {/*  <Label*/}
                    {/*      htmlFor="resume"*/}
                    {/*      className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer block"*/}
                    {/*  >*/}
                    {/*    <div className="flex flex-col items-center space-y-2">*/}
                    {/*      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">*/}
                    {/*        <UploadCloud className="h-6 w-6 text-muted-foreground" />*/}
                    {/*      </div>*/}
                    {/*      /!* Display file name or prompt *!/*/}
                    {/*      <p className="text-muted-foreground mb-2">*/}
                    {/*        {fileName || "Click to upload your resume"}*/}
                    {/*      </p>*/}
                    {/*      <p className="text-muted-foreground text-sm">*/}
                    {/*        PDF, DOC, DOCX (max 5MB)*/}
                    {/*      </p>*/}
                    {/*    </div>*/}
                    {/*  </Label>*/}
                    {/*  <Input*/}
                    {/*      id="resume"*/}
                    {/*      name="resume" // 4. Add name attribute*/}
                    {/*      type="file"*/}
                    {/*      className="hidden" // Hide the default input*/}
                    {/*      onChange={handleFileChange}*/}
                    {/*      accept=".pdf,.doc,.docx"*/}
                    {/*      required*/}
                    {/*  />*/}
                    {/*</div>*/}

                    {/* --- Submission --- */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button
                          type="submit" // 6. Set button type to submit
                          className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Submit Application
                      </Button>
                      <Button
                          type="button" // Set to button to prevent form submission
                          variant="outline"
                          className="border-border text-muted-foreground hover:bg-muted bg-transparent"
                      >
                        Save as Draft
                      </Button>
                    </div>

                    {/* 7. Display the result message */}
                    {result && <p className="text-center font-semibold text-green-500 mt-4">{result}</p>}
                  </CardContent>
                </form>
              </Card>
            </div>
          </section>

          {/* Alternative Contact */}
          <section className="text-center bg-gradient-to-r from-blue-900/20 via-violet-900/20 to-amber-900/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Don't See the Right Role?</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8 leading-relaxed">
              We're always interested in connecting with talented individuals who share our passion for neurotechnology.
              Send us your resume and let's explore opportunities together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg">
                <a href="mailto:careers@neurogati.com">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Us Directly
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-blue-400 text-blue-400 hover:bg-blue-900/20 hover:text-blue-300 bg-transparent"
              >
                <Link href="/contact">General Inquiries</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
