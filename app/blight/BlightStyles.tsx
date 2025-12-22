'use client'

import { useEffect } from 'react'

export default function BlightStyles() {
  useEffect(() => {
    const styleId = 'blight-styles'
    if (document.getElementById(styleId)) return

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      body {
        background: #FFFFFF !important;
        color: #111827 !important;
      }
      body::before {
        display: none !important;
      }
      ::-webkit-scrollbar-track {
        background: #F9FAFB !important;
      }
      ::-webkit-scrollbar-thumb {
        background: #9CA3AF !important;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #6B7280 !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  return null
}

