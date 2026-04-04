"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Gamepad2, User, Mail, ArrowRight } from "lucide-react"

export default function GameLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gameId = searchParams.get('game') || ''

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({ username: "", email: "" })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Store credentials in sessionStorage (temporary for this session only)
    const gameCredentials = {
      username: username.trim(),
      email: email.trim(),
      timestamp: Date.now()
    }

    sessionStorage.setItem('neurogati_game_user', JSON.stringify(gameCredentials))

    // Redirect to game
    if (gameId) {
      router.push(`/gaming/play/${gameId}`)
    } else {
      router.push('/gamingcategories')
    }
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
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-black text-lg uppercase tracking-wider py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            Start Playing
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider">
            Your details are used only for saving game progress
          </p>
        </div>
      </div>
    </div>
  )
}
