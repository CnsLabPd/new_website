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
  Lightbulb,
  Target,
  Coffee,
} from "lucide-react"
import Link from "next/link"

const openRoles = [
  {
    title: "Android Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    icon: <MonitorSmartphone className="h-8 w-8 text-blue-400" />,
    description: "Help translate our cutting-edge algorithms into user-friendly, high-impact mobile applications for patients and clinicians.",
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
    description: "Coordinate our clinical studies and trials, ensuring data integrity and patient safety as we validate our technologies.",
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
    description: "Develop engaging and effective rehabilitation games in collaboration with our clinical and neuroscience teams.",
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
    gradient: "from-amber-400/20 to-amber-800/20",
  },
]

const benefits = [
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

    formData.append("access_key", "d3737d9f-43b4-4b03-9d22-c71dbb8fba45");
    formData.append("subject", "New Job Application Submitted");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Application Submitted Successfully!");
        (event.target as HTMLFormElement).reset();
        setFileName("");
      } else {
        setResult(data.message);
      }
    } catch (error) {
      setResult("Something went wrong!");
    }

    setTimeout(() => setResult(""), 5000);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      
      {/* --- HERO SECTION (Removed WavyBackground) --- */}
      <section className="relative pt-40 pb-20 border-b border-border text-center overflow-hidden">
        {/* Subtle dot grid for tech aesthetic */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#1c82c2 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        <div className="container mx-auto px-6 relative z-10">
          
          <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Careers at Neurogati
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed font-medium">
            Be part of a mission-driven team that's revolutionizing neurological healthcare through cutting-edge AI, 
            brain-computer interfaces, and computational neuroscience.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Why Work With Us */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight text-foreground mb-4">Why Work With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join a team where your work directly impacts patients' lives and advances the field of neurotechnology.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="bg-card border border-border text-center p-8 hover:shadow-lg transition-all rounded-2xl">
                <div className="flex justify-center mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Open Positions - Restored original vibrant colors */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight text-foreground mb-4">Open Positions</h2>
          </div>
          <div className="space-y-8">
            {openRoles.map((role) => (
              <Card
                key={role.title}
                className={`bg-gradient-to-r ${role.gradient} border-l-4 border-${role.color}-500 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-background rounded-lg">{role.icon}</div>
                      <div>
                        <CardTitle className="text-2xl font-black text-foreground mb-2">{role.title}</CardTitle>
                        <div className="flex flex-wrap gap-3">
                          <Badge variant="secondary" className="font-bold uppercase tracking-wider text-[10px]">
                            <Briefcase className="h-3 w-3 mr-1" /> {role.type}
                          </Badge>
                          <Badge variant="outline" className="border-border text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                            <MapPin className="h-3 w-3 mr-1" /> {role.location}
                          </Badge>
                          <Badge variant="outline" className="border-border text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                            <Users className="h-3 w-3 mr-1" /> {role.department}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button asChild className={`bg-${role.color}-500 hover:bg-${role.color}-600 text-white font-bold px-8 rounded-full`}>
                      <Link href="#apply-form">Apply Now</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-foreground/80 text-lg leading-relaxed">{role.description}</p>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-foreground font-bold mb-4 flex items-center uppercase tracking-widest text-xs">
                        <Target className="h-4 w-4 mr-2 text-blue-500" /> Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {role.responsibilities.map((res, idx) => (
                          <li key={idx} className="text-muted-foreground text-sm flex items-start">
                            <div className={`w-1.5 h-1.5 bg-${role.color}-500 rounded-full mt-1.5 mr-3 flex-shrink-0`} />
                            {res}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-foreground font-bold mb-4 flex items-center uppercase tracking-widest text-xs">
                        <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" /> Requirements
                      </h4>
                      <ul className="space-y-2">
                        {role.requirements.map((req, idx) => (
                          <li key={idx} className="text-muted-foreground text-sm flex items-start">
                            <div className={`w-1.5 h-1.5 bg-${role.color}-500 rounded-full mt-1.5 mr-3 flex-shrink-0`} />
                            {req}
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
        <section id="apply-form" className="mb-24 scroll-mt-32">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border border-border shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="text-center pt-12">
                <CardTitle className="text-3xl font-black text-foreground mb-4">Apply Now</CardTitle>
                <p className="text-muted-foreground">Submit your application and let's start a conversation.</p>
              </CardHeader>
              <form onSubmit={onSubmit}>
                <CardContent className="p-8 md:p-12 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" name="first_name" placeholder="John" className="bg-background rounded-xl h-11" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" name="last_name" placeholder="Doe" className="bg-background rounded-xl h-11" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" className="bg-background rounded-xl h-11" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position of Interest *</Label>
                    <select id="position" name="position" className="w-full h-11 px-4 bg-background border border-border rounded-xl text-foreground" required>
                      <option value="">Select a position</option>
                      {openRoles.map((role) => <option key={role.title} value={role.title}>{role.title}</option>)}
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Why Neurogati? *</Label>
                    <Textarea id="coverLetter" name="cover_letter" placeholder="Tell us why you're interested..." rows={5} className="bg-background rounded-xl" required />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black font-regular text-md transition-all">
                    <Mail className="h-5 w-5 mr-3" /> Submit Application
                  </Button>
                  {result && <p className="text-center font-bold text-blue-500 mt-4">{result}</p>}
                </CardContent>
              </form>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}