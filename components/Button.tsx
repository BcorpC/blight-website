'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick 
}: ButtonProps) {
  const isPrimary = variant === 'primary'

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative px-8 py-4 rounded-lg font-medium
        overflow-hidden group
        ${isPrimary 
          ? 'bg-gradient-to-r from-orange-glow to-orange-amber text-white' 
          : 'border border-text-secondary text-text-primary hover:border-orange-glow'
        }
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      {isPrimary && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-glow to-orange-amber opacity-0 group-hover:opacity-100 blur-xl"
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Shimmer reflection */}
      <motion.div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />

      {/* Micro particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            whileHover={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              transition: {
                duration: 0.8,
                delay: i * 0.1,
              },
            }}
          />
        ))}
      </div>

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

