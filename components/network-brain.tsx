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
  pulsePhase: number
  pulseSpeed: number
}

export function NetworkBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 500
    canvas.height = 500

    // Brain shape parameters
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const brainWidth = canvas.width * 0.7
    const brainHeight = canvas.height * 0.6

    // Colors from the theme
    const colors = [
      "#5035A5", // royal-500
      "#442C90", // royal-600
      "#FF00FF", // neon-500
      "#FF33FF", // neon-400
      "#FF66FF", // neon-300
    ]

    // Create nodes in a brain shape
    const nodes: Node[] = []
    const nodeCount = 80

    // Create brain hemispheres
    for (let i = 0; i < nodeCount; i++) {
      // Position nodes to form a brain shape
      const hemisphere = i % 2 === 0 ? -1 : 1
      const angle = Math.random() * Math.PI - Math.PI / 2
      const radiusX = ((0.3 + Math.random() * 0.7) * brainWidth) / 2
      const radiusY = ((0.3 + Math.random() * 0.7) * brainHeight) / 2

      // Create brain hemisphere shapes
      const x = centerX + hemisphere * (Math.cos(angle) * radiusX * 0.5)
      const y = centerY + Math.sin(angle) * radiusY

      // Add some variation to make it look organic
      const jitterX = Math.random() * 20 - 10
      const jitterY = Math.random() * 20 - 10

      nodes.push({
        x: x + jitterX,
        y: y + jitterY,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2, // Random starting phase for pulsing
        pulseSpeed: 0.05 + Math.random() * 0.05, // Random pulse speed
      })
    }

    // Add brain stem nodes
    for (let i = 0; i < 15; i++) {
      const y = centerY + brainHeight * 0.3 + i * brainHeight * 0.02
      const x = centerX + (Math.random() * 10 - 5)

      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.03,
      })
    }

    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      // Each node connects to 2-4 other nodes
      const connectionCount = Math.floor(Math.random() * 3) + 2

      // Calculate distances to other nodes
      const distances = []
      for (let j = 0; j < nodes.length; j++) {
        if (i !== j) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          distances.push({ index: j, distance })
        }
      }

      // Sort by distance
      distances.sort((a, b) => a.distance - b.distance)

      // Connect to closest nodes
      for (let j = 0; j < Math.min(connectionCount, distances.length); j++) {
        nodes[i].connections.push(distances[j].index)
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw brain outline glow
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, brainWidth / 2, brainHeight / 2, 0, 0, Math.PI * 2)
      const gradientOutline = ctx.createRadialGradient(
        centerX,
        centerY,
        brainWidth / 2 - 20,
        centerX,
        centerY,
        brainWidth / 2 + 20,
      )
      gradientOutline.addColorStop(0, "rgba(255, 0, 255, 0)")
      gradientOutline.addColorStop(0.5, "rgba(255, 0, 255, 0.05)")
      gradientOutline.addColorStop(1, "rgba(255, 0, 255, 0)")
      ctx.fillStyle = gradientOutline
      ctx.fill()

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Update pulse phase
        node.pulsePhase += node.pulseSpeed
        if (node.pulsePhase > Math.PI * 2) node.pulsePhase -= Math.PI * 2

        // Calculate pulse factor (0 to 1)
        const pulseFactor = (Math.sin(node.pulsePhase) + 1) / 2

        // Draw connections with pulse effect
        for (const connectionIndex of node.connections) {
          if (connectionIndex >= 0 && connectionIndex < nodes.length) {
            const connectedNode = nodes[connectionIndex]

            // Create gradient for connection with pulse effect
            const gradient = ctx.createLinearGradient(node.x, node.y, connectedNode.x, connectedNode.y)

            // Make connections more visible during pulse
            const alpha = 0.3 + pulseFactor * 0.4

            gradient.addColorStop(0, node.color.replace(")", `, ${alpha})`).replace("rgb", "rgba"))
            gradient.addColorStop(1, connectedNode.color.replace(")", `, ${alpha})`).replace("rgb", "rgba"))

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connectedNode.x, connectedNode.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5 + pulseFactor
            ctx.stroke()
          }
        }
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Update position with slight movement
        node.x += node.vx
        node.y += node.vy

        // Keep nodes within brain shape
        const dx = node.x - centerX
        const dy = node.y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > brainWidth / 2) {
          node.vx *= -1
          node.vy *= -1
          node.x = centerX + (dx / distance) * (brainWidth / 2) * 0.9
          node.y = centerY + (dy / distance) * (brainHeight / 2) * 0.9
        }

        // Calculate pulse factor (0 to 1)
        const pulseFactor = (Math.sin(node.pulsePhase) + 1) / 2

        // Draw node with glow effect
        ctx.beginPath()
        const glowRadius = node.radius * (1.5 + pulseFactor)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius * 2)
        gradient.addColorStop(0, node.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Draw the actual node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * (0.8 + pulseFactor * 0.4), 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      }

      // Occasionally trigger neural "firing" for random nodes
      if (Math.random() < 0.05) {
        const randomNodeIndex = Math.floor(Math.random() * nodes.length)
        nodes[randomNodeIndex].pulsePhase = 0 // Reset phase to start a new pulse
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup function
    return () => {
      // No need to clean up requestAnimationFrame as the component unmount will stop it
    }
  }, [])

  return (
    <div className="relative w-full h-full max-w-[500px] max-h-[500px]">
      <img
        src="/brain-animation.gif"
        alt="Animated brain visualization"
        className="absolute inset-0 w-full h-full object-contain z-10"
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-20 opacity-70 mix-blend-screen" />
    </div>
  )
}
