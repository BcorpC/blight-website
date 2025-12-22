'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'

// Helper component for logo with fallback
function Logo() {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div className="text-2xl font-bold bg-gradient-to-r from-orange-glow to-orange-amber bg-clip-text text-transparent">
        BCORP
      </div>
    )
  }

  return (
    <div className="relative h-14 w-[185px]">
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Features', 'Pricing', 'About', 'Contact']

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background-darker/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/blight">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Logo />
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <motion.ul 
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {navItems.map((item, index) => (
            <motion.li
              key={item}
              whileHover={{ y: -2 }}
              className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="primary">Get Started</Button>
        </motion.div>
      </nav>
    </motion.header>
  )
}

