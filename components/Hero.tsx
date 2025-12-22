'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'

// Helper component for logo with fallback
function LogoHero() {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
        <span className="block">BCORP</span>
      </h1>
    )
  }

  return (
    <div className="relative h-24 w-[231px] md:h-28 md:w-[277px] mb-4">
      <Image
        src="/bcorp/logo.png"
        alt="BCORP Logo"
        fill
        className="object-contain object-left"
        priority
        onError={() => setImgError(true)}
      />
    </div>
  )
}

export default function Hero() {
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!videoRef.current) return
      
      const rect = videoRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      videoRef.current.style.transform = `perspective(1000px) rotateY(${(x - rect.width / 2) / 20}deg) rotateX(${(y - rect.height / 2) / -20}deg)`
    }

    const card = videoRef.current
    if (card) {
      card.addEventListener('mousemove', handleMouseMove)
      return () => card.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="min-h-screen flex items-center container mx-auto px-6 pt-32 pb-20">
      <div className="grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-orange-glow/20 to-orange-amber/20 border border-orange-glow/30 mb-6"
          >
            <span className="text-sm font-medium text-orange-glow">CREATIVE SUITE 2.0</span>
          </motion.div>

          {/* Title with Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Link href="/blight">
              <div className="cursor-pointer">
                <LogoHero />
              </div>
            </Link>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-orange-glow to-orange-amber bg-clip-text text-transparent">
                Lead blight.
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-text-secondary mb-8 max-w-xl"
          >
            Transform your creative vision into stunning visual narratives. 
            Powerful tools, intuitive design, cinematic results.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="primary" className="text-lg px-10 py-5">
              Start Creating
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column - Video Card */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-glow/20 to-orange-amber/10 p-1">
            {/* Glow shadow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-glow to-orange-amber opacity-30 blur-3xl -z-10" />
            
            <div className="relative bg-background-darker rounded-2xl aspect-video flex items-center justify-center overflow-hidden">
              {/* Placeholder for video */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-glow/10 to-orange-amber/5" />
              
              {/* Play Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-glow to-orange-amber opacity-0 group-hover:opacity-100 blur-xl"
                  transition={{ duration: 0.3 }}
                />
                <svg
                  className="w-8 h-8 text-white ml-1 relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

