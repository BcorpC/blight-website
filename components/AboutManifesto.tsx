'use client'

import { useEffect, useRef } from 'react'

const manifestoText = [
  { text: 'We believe in', highlight: false },
  { text: 'visual storytelling', highlight: true },
  { text: 'that transcends boundaries.', highlight: false },
  { text: 'Every frame, every transition,', highlight: false },
  { text: 'crafted with', highlight: false },
  { text: 'precision and passion.', highlight: true },
  { text: 'We empower creators', highlight: false },
  { text: 'to bring their visions to life', highlight: true },
  { text: 'with tools that inspire and innovate.', highlight: false },
]

export default function AboutManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const { gsap } = require('gsap')
    const { ScrollTrigger } = require('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    const elements = sectionRef.current?.querySelectorAll('.manifesto-line')
    if (!elements) return

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center container mx-auto px-6 py-32">
      <div className="max-w-4xl w-full">
        <div className="text-5xl md:text-6xl lg:text-7xl font-light leading-relaxed">
          {manifestoText.map((item, index) => (
            <span
              key={index}
              className={`manifesto-line inline-block mr-4 mb-4 ${
                item.highlight ? 'text-text-primary font-bold' : 'text-text-secondary'
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

