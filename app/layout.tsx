import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Roobo Multivendor Marketplace',
  description: 'Transform your Shopify store into a multivendor marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}