'use client'

import { useState } from 'react'
import { SquareArrowOutUpRight, Menu, X } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Blog', href: '/blog' },
]

export const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="fixed left-1/2 -translate-x-1/2 top-2 z-50 w-[90%] md:w-180 px-6 py-3 flex justify-between items-center backdrop-blur-md bg-black/20 text-white shadow-sm rounded-full border border-white/20">
        
        <Image
          src="/images/logo.png"
          width={40}
          height={40}
          alt="logo"
          className="border rounded-full p-2 w-12 h-12 bg-white shrink-0"
        />

        <ul className="hidden md:flex gap-6 text-base">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`hover:text-secondary transition-colors ${
                  l.href === '/blog' ? 'border-b-2 border-secondary' : ''
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="/resume/Vishal_Dewani.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
          >
            <Button variant="secondary" className="rounded-full py-6 px-5 group" size="lg">
              View Resume
              <SquareArrowOutUpRight className="group-hover:scale-110 transition-transform" />
            </Button>
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute top-22 left-1/2 -translate-x-1/2 w-[85%] bg-primary/80 border border-white/20 rounded-2xl p-6 text-white flex flex-col gap-6 transition-all duration-500">
            <ul className="flex flex-col gap-4 text-lg">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block hover:text-secondary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="/resume/Vishal_Dewani.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <Button variant="secondary" className="rounded-full w-full py-6 group">
                View Resume
                <SquareArrowOutUpRight className="group-hover:scale-110 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      )}
    </>
  )
}