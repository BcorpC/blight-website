import type { Metadata } from 'next'
import BlightStyles from './BlightStyles'

export const metadata: Metadata = {
  title: 'BLIGHT - Advanced Technology Platform',
  description: 'Premium technology solution for modern businesses',
}

export default function BlightLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BlightStyles />
      <div className="bg-white min-h-screen">
        {children}
      </div>
    </>
  )
}

