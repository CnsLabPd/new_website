"use client"

import { useEffect, useRef } from "react"

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Wave parameters
    const waves = [
      { amplitude: 50, frequency: 0.005, speed: 0.0005, color: "rgba(255, 51, 255, 0.05)" }, // neon-400
      { amplitude: 30, frequency: 0.01, speed: 0.001, color: "rgba(80, 53, 165, 0.05)" }, // royal-500
      { amplitude: 20, frequency: 0.02, speed: 0.002, color: "rgba(255, 0, 255, 0.05)" }, // neon-500
    ]

    let time = 0

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      waves.forEach((wave) => {
        ctx.beginPath()

        // Draw each wave
        for (let x = 0; x < canvas.width; x += 5) {
          const y = wave.amplitude * Math.sin(x * wave.frequency + time * wave.speed) + canvas.height / 2

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        // Complete the wave by drawing to the bottom and back
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        ctx.fillStyle = wave.color
        ctx.fill()
      })

      time += 1
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}
