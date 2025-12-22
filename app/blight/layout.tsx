import type { Metadata } from 'next'
import BlightStyles from './BlightStyles'

export const metadata: Metadata = {
  title: 'BLIGHT - Solutions d\'enseignes LED sur mesure',
  description: 'BLIGHT crée des enseignes LED personnalisées de haute qualité. De la conception à l\'installation, nous transformons votre vision en réalité lumineuse.',
  keywords: ['enseigne LED', 'enseigne lumineuse', 'signalétique', 'BLIGHT', 'enseigne personnalisée', 'fabrication enseigne'],
  authors: [{ name: 'BLIGHT' }],
  openGraph: {
    title: 'BLIGHT - Solutions d\'enseignes LED sur mesure',
    description: 'BLIGHT crée des enseignes LED personnalisées de haute qualité. De la conception à l\'installation, nous transformons votre vision en réalité lumineuse.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
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

