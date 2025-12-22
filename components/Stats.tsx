'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 10, suffix: 'K+', label: 'Active Creators' },
  { value: 500, suffix: 'K+', label: 'Projects Created' },
  { value: 99, suffix: '%', label: 'Satisfaction Rate' },
  { value: 50, suffix: '+', label: 'Countries' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-glow to-orange-amber bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-32 container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <motion.div
              className="mb-4"
              whileInView={{
                filter: [
                  'drop-shadow(0 0 0px rgba(255,107,53,0))',
                  'drop-shadow(0 0 20px rgba(255,107,53,0.5))',
                  'drop-shadow(0 0 0px rgba(255,107,53,0))',
                ],
              }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
            </motion.div>
            <p className="text-text-secondary text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

