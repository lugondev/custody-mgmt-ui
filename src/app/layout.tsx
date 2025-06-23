import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Custody Management System',
    template: '%s | Custody Management System',
  },
  description: 'A comprehensive custody management application built with Next.js 15+',
  keywords: ['custody', 'management', 'crypto', 'wallet', 'transactions', 'blockchain'],
  authors: [{ name: 'Custody Management Team' }],
  creator: 'Custody Management Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://custody-mgmt.vercel.app',
    title: 'Custody Management System',
    description: 'A comprehensive custody management application',
    siteName: 'Custody Management System',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custody Management System',
    description: 'A comprehensive custody management application',
    creator: '@custody-mgmt',
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
}

/**
 * Root layout component for the application
 * Provides global styling and metadata configuration
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}