import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BCORP - Craft Visual Stories',
  description: 'Creative Suite 2.0 - Cinematic Landing Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

