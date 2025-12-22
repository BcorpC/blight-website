'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function MobileMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="min-h-screen flex items-center justify-center container mx-auto px-6 py-32">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative perspective-1000"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Glow shadow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-glow to-orange-amber opacity-30 blur-3xl -z-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Phone Mockup */}
        <div className="relative w-72 md:w-80 mx-auto">
          {/* Phone Frame */}
          <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
            
            {/* Screen */}
            <div className="relative bg-background-darker rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
              {/* Inner UI */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="w-16 h-1 bg-text-secondary/30 rounded-full" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center gap-6">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-2 text-text-primary">
                      Create on the Go
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Professional results, anywhere
                    </p>
                  </motion.div>

                  {/* Mock UI Elements */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="h-12 bg-gradient-to-r from-orange-glow/20 to-orange-amber/10 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      />
                    ))}
                  </div>

                  {/* CTA inside phone */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="mt-4"
                  >
                    <div className="bg-gradient-to-r from-orange-glow to-orange-amber rounded-lg px-6 py-3 text-center">
                      <span className="text-white font-semibold text-sm">Get Started</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

