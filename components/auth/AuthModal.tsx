"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState("")
  const [resendingEmail, setResendingEmail] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const { toast } = useToast()

  // 1. FORM STATES
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [gender, setGender] = useState("male")

  const supabase = createClient()

  // Reset states when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setEmailSent(false)
      setVerificationEmail("")
      setIsSignUp(false)
      setEmail("")
      setPassword("")
      setFullName("")
      setGender("male")
      setErrorMessage("")
    }
  }, [isOpen])

  // Reset form when switching between sign in/up
  const toggleAuthMode = () => {
    console.log("🔄 Toggling auth mode from", isSignUp ? "Sign Up" : "Sign In", "to", !isSignUp ? "Sign Up" : "Sign In")
    setIsSignUp(!isSignUp)
    setEmail("")
    setPassword("")
    setFullName("")
    setGender("male")
    setErrorMessage("")
  }

  // Resend verification email
  const handleResendVerification = async () => {
    setResendingEmail(true)
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: verificationEmail,
      })

      if (error) throw error

      toast({
        title: "Verification email resent!",
        description: `We've sent a new verification link to ${verificationEmail}`,
      })
    } catch (error: any) {
      console.error("Resend error:", error.message)
      toast({
        title: "Failed to resend email",
        description: error.message || "Please try again later",
        variant: "destructive",
      })
    } finally {
      setResendingEmail(false)
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("") // Clear any previous errors
    console.log("🚀 Starting Auth flow...", { isSignUp, email, hasPassword: !!password })

    try {
      if (isSignUp) {
        // SIGN UP LOGIC
        console.log("📝 Attempting to sign up user:", email)
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

        console.log("📧 Sign up response:", {
          user: data?.user?.email,
          session: !!data?.session,
          error: error?.message
        })

        if (error) throw error

        // Check if email confirmation is required
        if (data.user && !data.session) {
          console.log("✉️ Email confirmation required")
          setEmailSent(true)
          setVerificationEmail(email)
          toast({
            title: "Verification email sent!",
            description: "Please check your email and click the confirmation link to activate your account.",
          })
        } else {
          console.log("✅ Account created and signed in immediately")
          toast({
            title: "Account created successfully!",
            description: "You're now signed in and ready to play.",
          })
          onClose() // Auto-close if no confirmation needed
        }
      } else {
        // SIGN IN LOGIC
        console.log("🔑 Attempting to sign in user:", email)
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        console.log("🔓 Sign in response:", {
          user: data?.user?.email,
          session: !!data?.session,
          error: error?.message,
          emailConfirmed: data?.user?.email_confirmed_at
        })

        if (error) throw error

        // Check if user exists but email is not verified
        if (data.user && !data.user.email_confirmed_at) {
          console.log("⚠️ Email not verified yet")
          throw new Error("Email not verified. Please check your email and click the verification link before signing in.")
        }

        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        })
        onClose() // Close modal on successful sign in
      }
    } catch (error: any) {
      console.error("Auth Error:", error.message)

      // Provide more helpful error messages
      let errorTitle = "Authentication failed"
      let errorDescription = error.message

      if (error.message === "Invalid login credentials") {
        errorTitle = "Sign in failed"
        errorDescription = isSignUp
          ? "Unable to create account. Please try again."
          : "Email or password is incorrect. Don't have an account yet? Click 'Register Now' below."
      } else if (error.message.includes("Email not verified") || error.message.includes("Email not confirmed")) {
        errorTitle = "Email Not Verified"
        errorDescription = "Please check your inbox and click the verification link we sent you before signing in."
      } else if (error.message.includes("Email link is invalid or has expired")) {
        errorTitle = "Verification Link Expired"
        errorDescription = "Your verification link has expired. Please sign up again to receive a new link."
      }

      console.log("🚨 Showing error toast:", errorTitle, errorDescription)

      // Set inline error message
      setErrorMessage(errorDescription)

      // Also show toast
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
        duration: 6000, // Show for 6 seconds so user can read it
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  console.log("🎨 Rendering AuthModal - isSignUp:", isSignUp)

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-background border border-border p-8 rounded-3xl shadow-2xl">
        <button onClick={onClose} className="absolute right-6 top-6 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        {/* Email Verification Success Screen */}
        {emailSent ? (
          <div className="text-center py-8">
            <div className="mb-6 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-3">Check Your Email</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We've sent a verification link to<br />
              <span className="font-semibold text-foreground">{verificationEmail}</span>
            </p>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
              <p className="text-sm text-foreground leading-relaxed">
                Click the link in the email to activate your account, then come back here to sign in.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  setEmailSent(false)
                  setIsSignUp(false)
                  setEmail("")
                  setPassword("")
                }}
                className="w-full bg-[#1c82c2] hover:bg-[#16699d] text-white py-6 rounded-xl text-lg font-bold"
              >
                Got it, back to Sign In
              </Button>

              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendingEmail}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                {resendingEmail ? "Sending..." : "Didn't receive the email? Resend verification link"}
              </button>
            </div>
          </div>
        ) : (
          <>
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
              placeholder={isSignUp ? "Min. 6 characters" : "Enter your password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
            {isSignUp && (
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
              <p className="text-sm text-red-500 font-medium leading-relaxed">
                {errorMessage}
              </p>
            </div>
          )}

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
            onClick={toggleAuthMode}
            className="text-[#1c82c2] font-bold hover:underline"
          >
            {isSignUp ? "Log In" : "Register Now"}
          </button>
        </p>
          </>
        )}
      </div>
    </div>
  )
}