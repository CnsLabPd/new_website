"use client"

import { useEffect, useState } from "react"

export default function AksharaLearningPage() {
  const [loading, setLoading] = useState(true)
  const appUrl = "https://akshara-learning-webapp.vercel.app"

  useEffect(() => {
    // Log for debugging
    console.log("Loading Akshara Learning from:", appUrl)

    // Set a timeout to show fallback after 3 seconds if iframe doesn't load
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-screen relative bg-gray-50">
      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Loading Akshara Learning Platform...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
          </div>
        </div>
      )}

      {/* Main iframe */}
      <iframe
        src={appUrl}
        className="w-full h-full border-0"
        title="Akshara Learning Platform"
        onLoad={() => {
          console.log("Iframe loaded successfully")
          setLoading(false)
        }}
        onError={(e) => {
          console.error("Iframe error:", e)
          setLoading(false)
        }}
      />

      {/* Fallback message (hidden by default, shown if needed) */}
      {!loading && (
        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
          <p className="text-sm text-gray-600 mb-2">Having trouble viewing the app?</p>
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 text-sm font-semibold"
          >
            Open in new tab →
          </a>
        </div>
      )}
    </div>
  )
}