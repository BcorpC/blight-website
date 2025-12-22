'use client'

import { useEffect, useRef } from 'react'

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Animated gradient background
    let time = 0
    const animate = () => {
      time += 0.005
      
      const gradient = ctx.createLinearGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2 + Math.cos(time) * 500,
        canvas.height / 2 + Math.sin(time) * 500
      )

      gradient.addColorStop(0, '#050505')
      gradient.addColorStop(0.3, '#0B0B0B')
      gradient.addColorStop(0.5, '#1a0a0a')
      gradient.addColorStop(0.7, '#0B0B0B')
      gradient.addColorStop(1, '#050505')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Subtle diagonal light streaks
      ctx.strokeStyle = 'rgba(255, 107, 53, 0.05)'
      ctx.lineWidth = 1
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(-200 + i * 400, 0)
        ctx.lineTo(canvas.width + 200, canvas.height)
        ctx.stroke()
      }

      // Vertical grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)'
      ctx.lineWidth = 1
      const gridSpacing = 100
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: '#050505' }}
    />
  )
}

