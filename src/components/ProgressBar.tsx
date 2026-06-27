'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

// minimal nprogress styles — add to globals.css instead if preferred
const styles = `
  #nprogress .bar {
    background: #18181b;
    height: 2px;
  }
  #nprogress .peg {
    box-shadow: 0 0 10px #18181b, 0 0 5px #18181b;
  }
`

export function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({ showSpinner: false, speed: 300 })
  }, [])

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  return <style>{styles}</style>
}