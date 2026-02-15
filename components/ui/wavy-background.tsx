"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { createNoise3D } from "simplex-noise"
import { useTheme } from "@/components/theme-provider"

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "slow",
  waveOpacity = 0.5,
  waveCount = 5 ,
  ...props
}: {
  children?: any
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: "slow" | "fast"
  waveOpacity?: number
  [key: string]: any
}) => {
  const { theme } = useTheme()
  const noise = createNoise3D()
  let w: number, h: number, nt: number, i: number, x: number, ctx: any, canvas: any
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Determine background fill based on theme
  const getBackgroundFill = () => {
    if (backgroundFill) return backgroundFill

    if (theme === "light") {
      return "#fdf8f2"
    } else if (theme === "dark") {
      return "#0f172aff" // Dark slate
    } else {
      // System theme - check actual applied theme
      const isDark = document.documentElement.classList.contains("dark")
      return isDark ? "rgb(15, 23, 42)" : "white"
    }
  }

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001
      case "fast":
        return 0.003
      default:
        return 0.001
    }
  }

  const init = () => {
    if (!canvasRef.current) return

    canvas = canvasRef.current
    ctx = canvas.getContext("2d")
    if (!ctx) return

    w = ctx.canvas.width = window.innerWidth
    h = ctx.canvas.height = canvasRef.current.offsetHeight || window.innerHeight * 0.6
    ctx.filter = `blur(${blur}px)`
    nt = 0

    const handleResize = () => {
      if (!canvas || !ctx) return
      w = ctx.canvas.width = window.innerWidth
      h = ctx.canvas.height = canvasRef.current?.offsetHeight || window.innerHeight * 0.6
      ctx.filter = `blur(${blur}px)`
    }

    window.addEventListener("resize", handleResize)
    render()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }

  const waveColors = colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]

  const drawWave = (n: number) => {
    nt += getSpeed()
    for (i = 0; i < n; i++) {
      ctx.beginPath()
      ctx.lineWidth = waveWidth || 50
      ctx.strokeStyle = waveColors[i % waveColors.length]
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100
        ctx.lineTo(x, y + h * 0.5)
      }
      ctx.stroke()
      ctx.closePath()
    }
  }

  let animationId: number
  const render = () => {
    if (!ctx || !canvas) return

    try {
      ctx.fillStyle = getBackgroundFill()
      ctx.globalAlpha = waveOpacity || 0.5
      ctx.fillRect(0, 0, w, h)
      drawWave(waveCount)
      animationId = requestAnimationFrame(render)
    } catch (error) {
      console.warn("Canvas rendering error:", error)
    }
  }

  useEffect(() => {
    const cleanup = init()
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (cleanup) cleanup()
    }
  }, [theme])

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    // I'm sorry but i have got to support it on safari.
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    )
  }, [])

  return (
    <div className={cn("relative flex flex-col items-center justify-center", containerClassName)}>
      <canvas
        className="absolute inset-0 z-0 h-full w-full"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  )
}
