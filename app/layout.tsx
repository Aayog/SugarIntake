import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sugar Intake Tracker',
  description: 'Track your daily sugar intake with 3D visualization',
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
