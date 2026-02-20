"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase" // Ensure this path is correct

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // 1. FORM STATES
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [gender, setGender] = useState("male")

  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log("Starting Auth flow...") // Debug log

    try {
      if (isSignUp) {
        // SIGN UP LOGIC
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              gender: gender,
            },
          },
        })
        if (error) throw error
        alert("Success! Check your email for a confirmation link.")
      } else {
        // SIGN IN LOGIC
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      }
      
      onClose() // Close modal on success
    } catch (error: any) {
      console.error("Auth Error:", error.message)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-background border border-border p-8 rounded-3xl shadow-2xl">
        <button onClick={onClose} className="absolute right-6 top-6 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
          <p className="text-muted-foreground mt-2">Enter your details to continue with Neurogati</p>
        </div>

        {/* 2. ATTACH THE HANDLER */}
        <form className="space-y-4" onSubmit={handleAuth}>
          {isSignUp && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  className="rounded-xl"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <select 
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              className="rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              className="rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1c82c2] hover:bg-[#16699d] text-white py-6 rounded-xl text-lg font-bold mt-4"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (isSignUp ? "Sign Up" : "Sign In")}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm">
          {isSignUp ? "Already have an account?" : "New to Neurogati?"}{" "}
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#1c82c2] font-bold hover:underline"
          >
            {isSignUp ? "Log In" : "Register Now"}
          </button>
        </p>
      </div>
    </div>
  )
}