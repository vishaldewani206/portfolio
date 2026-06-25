'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16 ">
      <div className="w-full max-w-xl rounded-2xl border p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-sm">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          404 Error
        </p>
        <h1 className="mb-4 text-5xl font-bold sm:text-6xl">Page not found</h1>
        <p className="mb-8 text-lg text-slate-700">
          The page you are looking for might have been moved, deleted, or never existed.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-primary  px-6 py-3 font-medium text-white transition hover:bg-primary"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
