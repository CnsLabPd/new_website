"use client"

import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  connections: number[]
}

export function NetworkAnimation() {
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

    // Create nodes
    const nodes: Node[] = []
    const nodeCount = 20

    // Create a gradient of colors from teal to blue
    const colors = [
      "#5035A5", // royal-500
      "#442C90", // royal-600
      "#FF00FF", // neon-500
      "#FF33FF", // neon-400
      "#FF66FF", // neon-300
    ]

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
      })
    }

    // Create connections between nodes (not all nodes will be connected)
    for (let i = 0; i < nodes.length; i++) {
      const connectionCount = Math.floor(Math.random() * 2) // 0-1 connections per node
      for (let j = 0; j < connectionCount; j++) {
        const target = Math.floor(Math.random() * nodes.length)
        if (target !== i && !nodes[i].connections.includes(target)) {
          nodes[i].connections.push(target)
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Draw connections
        for (const connectionIndex of node.connections) {
          // Ensure the connection index is valid
          if (connectionIndex >= 0 && connectionIndex < nodes.length) {
            const connectedNode = nodes[connectionIndex]
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connectedNode.x, connectedNode.y)
            ctx.strokeStyle = "rgba(255, 51, 255, 0.3)" // neon-400 with opacity
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}
