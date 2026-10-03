import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dinari — Le commerce de confiance',
  description: 'Dinari facilite les transactions entre acheteurs et vendeurs et propose une infrastructure d’orchestration financière avec Dinari Engine.',
  generator: 'v0.app',
  openGraph: {
    title: 'Dinari — Le commerce de confiance',
    description: 'Une expérience simple et transparente pour le commerce digital.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/images/dinari-logo.png',
      },
      {
        url: '/favicon.png',
      },
    ],
    apple: '/images/dinari-logo.png',
    shortcut: '/images/dinari-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
