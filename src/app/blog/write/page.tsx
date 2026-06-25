'use client'

import { useState } from 'react'
import { BlogEditor } from '@/components/blog/BlogEditor'
import { BlogDisplay } from '@/components/blog/BlogDisplay'
import { Button } from '@/components/ui/button'

export default function WritePage() {
  const [html, setHtml] = useState('')
  const [preview, setPreview] = useState(false)
  const [title, setTitle] = useState('')
  console.log(html);
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur">
        <div className="max-w-170 mx-auto px-4 h-14 flex items-center justify-between">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            className="font-serif font-bold text-zinc-800 bg-transparent outline-none placeholder:text-zinc-400 w-full max-w-sm text-base"
          />
          <div className="flex gap-3 shrink-0 items-center">
            <Button
              variant={"outline"}
              onClick={() => setPreview((p) => !p)}
              className=""
            >
              {preview ? 'Edit' : 'Preview'}
            </Button>
            <Button className="px-5 py-5 rounded-full hover:scale-105 transition-transform">
              Publish
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-170 mx-auto px-4 py-16">
        {preview ? (
          <BlogDisplay html={html} title={title || 'Untitled'} author="You" date="Today" readingTime={2} />
        ) : (
          <BlogEditor initialContent={html} onChange={setHtml} />
        )}
      </main>
    </div>
  )
}