'use client'

import { motion } from 'framer-motion'

export default function TestimonialCard() {
  const avatars = [
    { name: 'Alex', color: 'from-purple-500 to-pink-500' },
    { name: 'Sam', color: 'from-blue-500 to-cyan-500' },
    { name: 'Jordan', color: 'from-green-500 to-emerald-500' },
    { name: 'Taylor', color: 'from-yellow-500 to-orange-500' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <motion.div
        className="bg-gradient-to-br from-orange-glow/30 to-orange-amber/20 rounded-2xl p-8 backdrop-blur-sm border border-orange-glow/20"
        whileHover={{ scale: 1.02, rotate: 1 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        {/* Quote Icon */}
        <motion.svg
          className="w-12 h-12 text-orange-glow mb-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </motion.svg>

        {/* Quote Text */}
        <motion.p
          className="text-xl text-text-primary mb-6 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          "BCORP has completely transformed how we create visual content. 
          The cinematic quality is unmatched, and the workflow is seamless."
        </motion.p>

        {/* Avatar Stack */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {avatars.map((avatar, index) => (
              <motion.div
                key={index}
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatar.color} border-2 border-background-darker flex items-center justify-center text-white font-semibold text-sm`}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
              >
                {avatar.name[0]}
              </motion.div>
            ))}
          </div>
          <div>
            <p className="text-text-primary font-semibold">Creative Team</p>
            <p className="text-text-secondary text-sm">Studio Alpha</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

