"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  BrainCircuit,
  Cpu,
  TestTube,
  Microscope,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  TrendingUp,
  Award,
  Target,
  Quote,
  History,
  Book,
  Landmark
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import Link from "next/link";

const timeline = [
  {
    year: "Feb 2025",
    title: "Neurogati Founded",
    description:
      "Company established by neuroscientists and AI researchers with a vision to transform neurological care.",
    color: "blue",
  },
  {
    year: "Aug 2025",
    title: "First Product Launch",
    description: "Quadis-PD™ diagnostic platform to diagnose, monitor and provide rehabilitation to Parkinson's Patients",
    color: "violet",
  },
]

const quotes = [
  {
    text: "Our mission is to ensure that cutting-edge neuroscience research doesn't remain confined to academic papers, but transforms into tools that directly improve patients' lives.",
    author: "Prof. Srinivasa Chakravarthy",
    role: "Co-founder & Chief Scientist",
    color: "blue",
  },
  {
    text: "Having worked in clinical settings for over two decades, I've seen firsthand the gap between what patients need and what technology provides. Neurogati exists to bridge that gap.",
    author: "Dr. Indira Chaturvedi",
    role: "Co-founder & Chief Medical Officer",
    color: "violet",
  },
]

export default function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const services = [
    {
      icon: <BrainCircuit className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Neuro Diagnostics",
      description:
        "Standardized, data-driven motor and cognitive assessments create a clear baseline for every user",
      position: "left",
    },
    // {
    //   icon: <Cpu className="w-6 h-6" />,
    //   secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-violet-400" />,
    //   title: "Brain-Computer Interface",
    //   description:
    //     "Cutting-edge BCI technology, enabling direct neural control and opening new possibilities for assistive technologies.",
    //   position: "left",
    // },
    {
      icon: <TestTube className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
      title: "Neuro-Tech Education",
      description:
        "Merging neuroscience and cutting-edge technology to revolutionize how we learn, diagnose, and perform.",
      position: "left",
    },
    // {
    //   icon: <Microscope className="w-6 h-6" />,
    //   secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-amber-400" />,
    //   title: "Computational Modeling",
    //   description:
    //     "Advanced computational models for neurological conditions, providing personalized treatment strategies and deeper understanding of brain function.",
    //   position: "right",
    // },
    {
      icon: <Users className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-red-400" />,
      title: "Gaming",
      description:
        "Gamified therapy platforms that increase patient engagement and accelerate recovery through motivational, evidence-based rehabilitation programs.",
      position: "right",
    },
    {
      icon: <Target className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-purple-400" />,
      title: "Assistive Technology",
      description:
        "Innovative assistive tools including SparshBharati™, MudhraBharati™, and NodText™ that help patients maintain independence and quality of life.",
      position: "right",
    },
  ]

  const stats = [
    { icon: <Award />, value: 500, label: "Patients Served", suffix: "+" },
    { icon: <Users />, value: 10, label: "Hospital Partners", suffix: "+" },
    { icon: <Calendar />, value: 1, label: "Years Innovation", suffix: "" },
    { icon: <TrendingUp />, value: 25, label: "Years of Research", suffix: "+" },
  ]

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-24 px-4 text-foreground overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-violet-500/5 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-blue-500/30"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-violet-500/30"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-blue-700/30 via-blue-300/30 to-blue-500/30 rounded-2xl p-8 border border-border">
            <div className="flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-amber-400 mr-3" />
              <h2 className="text-2xl font-bold text-black dark:text-white">Our Mission</h2>
            </div>
            <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-medium text-center">
              "To transform neurological healthcare through AI-driven, personalized technologies rooted in computational
              neuroscience."
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="flex items-center justify-center mb-6">
              <Landmark className="h-8 w-8 text-amber-400 mr-3" />
              <h2 className="text-2xl font-bold text-black dark:text-white">Our Story</h2>
            </div>
            <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-medium text-justify">
              Incubated at IIT Madras, Neurogati was born from a shared vision to integrate multiple dimensions of neurotechnology into a single, comprehensive system. Our founders believed that a more precise understanding of the brain—rooted in the powerful combination of AI, Computational Neuroscience, and Technology—could unlock earlier diagnoses, smarter therapies, and more intuitive support for those facing neurological disorders, neurodiversity, and the challenges of aging.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap -8 relative">
          {/* Left Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                  className="rounded-md overflow-hidden shadow-xl bg-background"
                  initial={{scale: 0.9, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                  transition={{duration: 0.8, delay: 0.3}}
                  whileHover={{scale: 1.03, transition: {duration: 0.3}}}
              >
                <Image
                    src="/images/NeurogatiLogo.svg"
                    alt="Neurogati Research Lab"
                    width={320} 
                    height={320}
                    className="w-full h-full object-cover"
                />
                {/* <div className="absolute inset-0 bg-background opacity-30 hover:opacity-10" /> */}

                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-center p-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.8, delay: 0.9}}
                >
                  <Link href={"/research"}>
                    <motion.button
                        className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                      Our Research <ArrowRight className="w-4 h-4"/>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                  className="absolute inset-0 border-4 border-violet-500/50 rounded-md -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>

              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-blue-500/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-violet-500/15"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              ></motion.div>

              {/* Additional decorative elements */}
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet-500"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Timeline Section */}
        <motion.section
          className="mb-20 mt-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-medium text-black dark:text-white mb-6">Our Journey</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Key milestones in our mission to transform neurological healthcare.
            </p>
          </motion.div>
          <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-amber-500"></div>

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative flex items-start gap-6"
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`w-16 h-16 bg-${item.color}-500 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-background shadow-lg`}
                    >
                      <Calendar className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <Card className="flex-1 bg-card border border-border shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              item.color === "blue"
                                ? "bg-blue-900/50 text-blue-300 border-blue-500/50"
                                : item.color === "violet"
                                  ? "bg-violet-900/50 text-violet-300 border-violet-500/50"
                                  : item.color === "green"
                                    ? "bg-green-900/50 text-green-300 border-green-500/50"
                                    : item.color === "amber"
                                      ? "bg-amber-900/50 text-amber-300 border-amber-500/50"
                                      : "bg-gray-900/50 text-gray-300 border-gray-500/50"
                            }
                          >
                            {item.year}
                          </Badge>
                          <CardTitle className="text-xl font-bold text-black dark:text-white">{item.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Quotes Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Insights from Our Visionaries</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Words from the founders behind Neurogati's mission.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {quotes.map((quote, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br from-${quote.color}-900/20 to-${quote.color}-800/20 border-l-4 border-${quote.color}-500 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <Quote className={`h-8 w-8 text-${quote.color}-400 flex-shrink-0`} />
                    <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed italic">"{quote.text}"</p>
                  </div>
                  <div className="border-t border-border/50 pt-4">
                    <p className="text-foreground font-semibold">{quote.author}</p>
                    <p className={`text-${quote.color}-400 text-sm`}>{quote.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.div
          className="mt-20 bg-card border border-border text-card-foreground p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="text-2xl font-medium mb-2">Ready to transform neurological care?</h3>
            <p className="text-muted-foreground">Let's create innovative solutions together.</p>
          </div>
          <Link href="/contact">
            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

interface ServiceItemProps {
  icon: React.ReactNode
  secondaryIcon?: React.ReactNode
  title: string
  description: string
  variants: {
    hidden: { opacity: number; y?: number }
    visible: { opacity: number; y?: number; transition: { duration: number; ease: string } }
  }
  delay: number
  direction: "left" | "right"
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
  return (
    <motion.div
      className="flex flex-col group bg-card rounded-lg p-8 border border-border shadow-lg hover:shadow-xl transition-shadow"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-blue-500 bg-blue-500/10 p-3 rounded-lg transition-colors duration-300 group-hover:bg-blue-500/20 relative"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-medium text-foreground group-hover:text-blue-500 transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="text-sm text-muted-foreground leading-relaxed pl-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 pl-12 flex items-center text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </motion.div>
    </motion.div>
  )
}

interface StatCounterProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix: string
  delay: number
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: false })
  const [hasAnimated, setHasAnimated] = useState(false)
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value)
      setHasAnimated(true)
    } else if (!isInView && hasAnimated) {
      springValue.set(0)
      setHasAnimated(false)
    }
  }, [isInView, value, springValue, hasAnimated])

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  return (
    <motion.div
      className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-xl flex flex-col items-center text-center group hover:bg-card transition-colors duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500 group-hover:bg-blue-500/20 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-foreground flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-muted-foreground text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-blue-500 mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  )
}
