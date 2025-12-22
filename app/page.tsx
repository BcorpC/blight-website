'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Background from '@/components/Background'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TestimonialCard from '@/components/TestimonialCard'
import AboutManifesto from '@/components/AboutManifesto'
import Stats from '@/components/Stats'
import MobileMockup from '@/components/MobileMockup'
import Button from '@/components/Button'

// Helper component for footer logo with fallback
function FooterLogo() {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div className="text-2xl font-bold bg-gradient-to-r from-orange-glow to-orange-amber bg-clip-text text-transparent opacity-80">
        BCORP
      </div>
    )
  }

  return (
    <div className="relative h-12 w-[162px]">
      <Image
        src="/bcorp/logo.png"
        alt="BCORP Logo"
        fill
        className="object-contain object-left opacity-80"
        onError={() => setImgError(true)}
      />
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    // Rediriger vers BLIGHT
    if (typeof window !== 'undefined') {
      window.location.href = '/blight'
    }
  }, [])

  return null
}
