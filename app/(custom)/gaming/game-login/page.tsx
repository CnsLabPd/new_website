"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Gamepad2, User, Mail, ArrowRight } from "lucide-react"

const HARDCODED_USERNAME = "manoj"
const HARDCODED_EMAIL = "sakamanojkumar18@gmail.com"

export default function GameLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gameId = searchParams.get('game') || ''
  const isSonicPop = gameId === "sonic-pop"

  const [username, setUsername] = useState(isSonicPop ? HARDCODED_USERNAME : "")
  const [email, setEmail] = useState(isSonicPop ? HARDCODED_EMAIL : "")
  const [errors, setErrors] = useState({ username: "", email: "" })
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = { username: "", email: "" }
    let isValid = true

    if (!username.trim()) {
      newErrors.username = "Username is required"
      isValid = false
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmitError("")
    setIsSubmitting(true)

    let launchToken: string | null = null
    let tokenExpiresAt: number | null = null

    if (isSonicPop) {
      try {
        const tokenResponse = await fetch("/api/sonic-pop/launch-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            email: email.trim(),
          }),
        })

        if (!tokenResponse.ok) {
          throw new Error("Could not initialize AWS launch token")
        }

        const tokenData = await tokenResponse.json()
        launchToken = tokenData.token ?? null
        tokenExpiresAt = tokenData.expiresAt ?? null
      } catch (error) {
        console.error("Failed to initialize Sonic Pop launch token:", error)
        setSubmitError("Could not prepare AWS telemetry upload. Try again.")
        setIsSubmitting(false)
        return
      }
    }

    // Store credentials in sessionStorage (temporary for this session only)
    const gameCredentials = {
      username: username.trim(),
      email: email.trim(),
      launchToken,
      tokenExpiresAt,
      timestamp: Date.now()
    }

    sessionStorage.setItem('neurogati_game_user', JSON.stringify(gameCredentials))

    // Redirect to game
    if (gameId) {
      router.push(`/gaming/play/${gameId}`)
    } else {
      router.push('/gamingcategories')
    }

    setIsSubmitting(false)
  }

  const gameName = gameId ? gameId.replace(/-/g, ' ').toUpperCase() : 'GAME'

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
            {gameName}
          </h1>
          <p className="text-slate-400 font-medium">
            Enter your details to start playing
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                readOnly={isSonicPop}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your username"
              />
            </div>
            {errors.username && (
              <p className="mt-2 text-sm text-red-400">{errors.username}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={isSonicPop}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {submitError && (
            <p className="text-sm text-red-400">{submitError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-black text-lg uppercase tracking-wider py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Preparing Session..." : "Start Playing"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider">
            {isSonicPop ? "Preconfigured test user for AWS telemetry upload" : "Your details are used only for saving game progress"}
          </p>
        </div>
      </div>
    </div>
  )
}
