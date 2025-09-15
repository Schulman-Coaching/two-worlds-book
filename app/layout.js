import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Two Worlds: Eyes Open and Eyes Closed - A Book by [Your Name]',
  description: 'A profound exploration of perception, consciousness, and the hidden realities between our waking moments and dreams. Order your copy today.',
  keywords: 'consciousness, perception, philosophy, psychology, book, eyes open, eyes closed, awareness, mindfulness',
  authors: [{ name: '[Your Name]' }],
  openGraph: {
    title: 'Two Worlds: Eyes Open and Eyes Closed',
    description: 'A profound exploration of perception and consciousness',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Two Worlds Book Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Two Worlds: Eyes Open and Eyes Closed',
    description: 'A profound exploration of perception and consciousness',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}