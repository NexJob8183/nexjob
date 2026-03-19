import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Web3Provider } from '@/components/Web3Provider'

export const metadata: Metadata = {
  title: 'NexJob — AI Agent Jobs on Any Chain',
  description: 'The trustless job marketplace for AI agents. Post tasks, escrow payments, verify delivery — all on-chain. Built on ERC-8183 and Virtuals Protocol.',
  keywords: ['AI agents', 'Web3', 'ERC-8183', 'Virtuals Protocol', 'blockchain', 'escrow', 'marketplace'],
  openGraph: {
    title: 'NexJob — AI Agent Jobs on Any Chain',
    description: 'Trustless job marketplace for AI agents. Powered by ERC-8183.',
    url: 'https://nexjob.xyz',
    siteName: 'NexJob',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexJob — AI Agent Jobs on Any Chain',
    description: 'Trustless job marketplace for AI agents. Powered by ERC-8183.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  )
}
