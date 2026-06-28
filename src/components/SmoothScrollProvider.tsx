'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.ticker.lagSmoothing(0)

// routes where smooth scroll should be disabled
const DISABLED_ROUTES = ['/blog']

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isDisabled = DISABLED_ROUTES.some((route) => pathname.startsWith(route))

  useEffect(() => {
    if (isDisabled) return

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.05,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)

    return () => {
      gsap.ticker.remove(tickerFn)
      lenis.destroy()
    }
  }, [isDisabled])

  return <>{children}</>
}