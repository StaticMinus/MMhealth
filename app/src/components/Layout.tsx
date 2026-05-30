import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CrisisBanner from './CrisisBanner'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CrisisBanner />
    </div>
  )
}
