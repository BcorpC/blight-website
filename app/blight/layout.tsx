'use client'

import BlightStyles from './BlightStyles'
import { LanguageProvider } from '@/lib/LanguageContext'

export default function BlightLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BlightStyles />
      <LanguageProvider>
        <div className="bg-white min-h-screen">
          {children}
        </div>
      </LanguageProvider>
    </>
  )
}

