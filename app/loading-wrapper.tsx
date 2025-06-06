"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BrainLoading } from "@/components/brain-loading"

interface LoadingWrapperProps {
  children: React.ReactNode
}

export function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem("hasVisited")

    if (hasVisited) {
      setIsLoading(false)
    } else {
      sessionStorage.setItem("hasVisited", "true")
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <BrainLoading onComplete={handleLoadingComplete} duration={4000} />
  }

  return <>{children}</>
}
