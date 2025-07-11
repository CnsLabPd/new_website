"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  tx: number
  ty: number
  vx: number
  vy: number
}

class ParticleSystem {
  private particles: Particle[] = []
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private animationId: number | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")!
    this.resizeCanvas()
    this.initParticles()
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  private createParticle(x: number, y: number): Particle {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      tx: x,
      ty: y,
      vx: 0,
      vy: 0,
    }
  }

  private updateParticle(particle: Particle) {
    const dx = particle.tx - particle.x
    const dy = particle.ty - particle.y
    particle.vx += dx * 0.01
    particle.vy += dy * 0.01
    particle.vx *= 0.9
    particle.vy *= 0.9
    particle.x += particle.vx
    particle.y += particle.vy
  }

  private drawParticle(particle: Particle) {
    this.ctx.beginPath()
    this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
    this.ctx.fillStyle = "#FF33FF" // neon-400
    this.ctx.fill()
  }

  private sampleSVGPath(): { x: number; y: number }[] {
    // Brain path data from the SVG
    const pathData =
      "M507.961,230.123c0-21-12.7-39.3-31-47.4c2.5-14.9-1.6-30.6-11.8-42.4c-10.3-11.9-25.7-18.3-41.4-17.6 c-3.3-11.8-10.8-22.3-21.4-29.3c-13.1-8.6-30-10.7-44.6-5.9c-8.7-16.4-25.9-27.4-45.7-27.4c-10.1,0-19.8,2.9-28.1,8.3 c-9.3-8-21.3-12.6-33.8-12.6c-14.7,0-28.5,6.3-38.1,16.8c-7-3.5-14.8-5.3-22.9-5.3c-16.5,0-31.7,7.9-41.2,20.6c-5.4-2-11.1-3-17-3 c-20,0-37.7,11.4-46.2,28.5c-14.6-1.3-29.2,3.9-39.9,14.1c-9.3,8.9-14.9,20.9-15.8,33.5c-19.1,9.3-31,29.7-28.8,51.6 c2.1,21.7,17.3,39.1,37.4,44.7c-0.1,4.8,0.4,9.5,1.7,14.2c4.3,16.6,16.7,29.8,32.4,35.5c2.6,34.5,27,63.7,61.6,71.9 c23.3,5.5,47.9,0,66.4-13.9c9.6,12,33.2,25.8,52.6,25.3c20.4-0.5,39.2-9.1,51.7-24.3l73.1,73.8c16.8,14.2,40.6,16.1,56.8,5.8 c15.1-9.5,22.5-27.6,19.5-45.2l-11.5-66c1.7-0.1,3.3-0.2,5-0.5c22-3.1,40-20.6,43.7-42.5c1.2-7.4,0.9-14.8-1-21.8 C501.061,259.923,507.961,245.523,507.961,230.123z M466.161,251.323c-3.6,1.7-6.3,4.8-7.5,8.5c-1.2,3.8-0.4,7.7,1.2,11.2 c9.7,21.3-7.2,33.5-17,34.8c-4.5,0.6-25.2,1.2-32.2-15.3c-2.8-6.6-1.2-13.8,3.3-19.3c5-6,4.1-14.9-1.9-19.9 c-6-5-14.9-4.1-19.9,1.9c-10.9,13.2-13.9,30.7-8.1,46.8c4.8,13.4,15,23.5,28,28.4l13.4,76.6c1.2,6.6-1.7,13.2-7.2,16.8 c-6.5,4.3-15.7,3.4-21.1-2.2l-85.8-86.6c-2.7-2.7-7.1-4.5-12.8-3.9c-4.7,0.5-8.5,4.1-10.3,8.5c-7,17-26,27.2-44.1,23.3 c-11.7-2.5-21.4-10.2-26.7-20.8c0,0-2.1-22.3,17.1-33.2c8.8-5,19-7.1,28.7-4.4c7.5,2.1,15.3-2.3,17.4-9.8 c2.1-7.5-2.3-15.3-9.8-17.4c-17.5-4.9-36.5-2.2-51.7,7.8c-30,19.9-29.6,52.5-29.6,52.5c-12.6,13.5-31.6,19.6-49.8,15.4 c-25.1-5.9-41.9-28.8-39.9-54.5c0.6-7.7-5.1-14.4-12.8-15.1c-9.8-0.9-18.1-7.9-20.5-17.4c-0.8-3.1-0.9-6.2-0.4-9.3 c0,0,19.9-3.4,38.8-25.5c0,0,16-6.1,25.9,9.4c2.8,4.4,3,9.8,1,14.6c-3,7.2,0.4,15.5,7.6,18.5c6.8,2.7,15.6-0.9,18.5-7.6 c5.5-13.1,4.4-27.6-2.8-39.8c-7.2-12.2-19.5-20.1-33.6-21.6l-6.8-0.7c0.8-11.9-2.3-23.8-9.2-33.8c-4.4-6.4-13.2-8.1-19.6-3.7 c-6.4,4.4-8,13.1-3.7,19.6c10.8,16.2-1.7,34-10.3,37l-20.8,9.8c-11.9-0.2-21.7-9.1-22.9-21c-1.2-11.8,6.7-22.6,18.3-25.2 c7.3-1.6,12.1-8.6,10.9-16c-1.2-7.7,1.4-15.4,6.9-20.7c6.4-6.2,16.2-8.1,24.6-4.9c3.9,1.5,8.3,1.2,12-0.9c3.7-2.1,6.2-5.6,7-9.8 c2-11.2,11.7-19.3,23.1-19.3c5.2,0,10.1,1.7,14.2,4.8c3.6,2.8,8.3,3.6,12.7,2.3c4.3-1.3,7.8-4.6,9.3-8.9 c3.3-9.5,12.2-15.9,22.2-15.9c4,0,7.8,1.1,11.2,3c0.2,17.5-11.8,32.9-29.3,36.3c-7.6,1.5-12.9,9-11.1,16.6 c2.1,9,9.3,12.5,16.6,11.1c31-6.1,52.7-33.4,52.2-64.5c3.8-8.5,12.2-13.9,21.4-13.9c8.4,0,16,4.4,20.3,11.7 c2.4,4,6.5,6.6,11.2,6.9c4.6,0.4,9.1-1.7,12-5.3c4.5-5.7,11.2-8.9,18.4-8.9c10.1,0,18.6,6.3,21.9,15.3l-4.5,4.5 c-13.1,13.1-18.9,31-15.9,49.3c3,18.3,14.1,33.5,30.6,41.8c5.6,2.8,15.1,1.1,18.9-6.3c3.7-6.9,0.7-15.4-6.3-18.9 c-8.3-4.2-13.9-11.9-15.4-21.1c-3.6-22.4,17.5-34.3,17.5-34.3c7.7-6.5,19.5-7.3,28-1.7c7.2,4.7,11.2,13,10.5,21.6 c-0.4,4.9,1.8,9.7,5.8,12.6c4,2.9,9.2,3.5,13.8,1.6c9.2-3.9,20.4-1.4,26.9,6.1c6.4,7.4,7.5,18.2,2.6,26.9 c-2.4,4.2-2.4,9.4-0.1,13.7s6.7,7.1,11.5,7.4c12.3,0.8,22,11.1,22,23.4C479.761,239.223,474.461,247.523,466.161,251.323z"

    // Create a temporary SVG element to sample the path
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", pathData)
    svg.appendChild(path)
    document.body.appendChild(svg)

    const length = path.getTotalLength()
    const samples = 700
    const points: { x: number; y: number }[] = []

    for (let i = 0; i < samples; i++) {
      const pt = path.getPointAtLength((i / samples) * length)
      // Scale and center the SVG path to fit the canvas
      const scale = 1.2
      const x = pt.x * scale + this.canvas.width / 2 - 255
      const y = pt.y * scale + this.canvas.height / 2 - 255
      points.push({ x, y })
    }

    // Clean up
    document.body.removeChild(svg)
    return points
  }

  private initParticles() {
    const points = this.sampleSVGPath()
    this.particles = points.map((pt) => this.createParticle(pt.x, pt.y))
  }

  private animate = () => {
    this.ctx.fillStyle = "rgba(19, 11, 42, 0.2)" // royal-950 with opacity
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    for (const particle of this.particles) {
      this.updateParticle(particle)
      this.drawParticle(particle)
    }

    this.animationId = requestAnimationFrame(this.animate)
  }

  public start() {
    this.animate()
  }

  public stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  public resize() {
    this.resizeCanvas()
    this.initParticles()
  }
}

interface BrainLoadingProps {
  onComplete?: () => void
  duration?: number
}

export function BrainLoading({ onComplete, duration = 3000 }: BrainLoadingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particleSystemRef = useRef<ParticleSystem | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const particleSystem = new ParticleSystem(canvasRef.current)
    particleSystemRef.current = particleSystem
    particleSystem.start()

    const handleResize = () => {
      particleSystem.resize()
    }

    window.addEventListener("resize", handleResize)

    // Auto-complete after duration
    const timer = setTimeout(() => {
      onComplete?.()
    }, duration)

    return () => {
      particleSystem.stop()
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [onComplete, duration])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-royal-950">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ background: "#130B2A" }} />
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">NEUROGATI</h1>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-neon-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-neon-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-neon-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  )
}
