'use client'

import { useState } from 'react'
import { BlogEditor } from '@/components/blog/BlogEditor'
import { BlogDisplay } from '@/components/blog/BlogDisplay'
import { CoverUpload } from '@/components/blog/CoverUpload'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

export default function WritePage() {
  const [html, setHtml] = useState<string>('')
  const [preview, setPreview] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [cover, setCover] = useState<string>('')

  return (
    <div className="min-h-screen bg-white">
      <header className="mt-4 border-b border-zinc-100 bg-white/90 backdrop-blur pb-6">
        <div className="w-full mx-auto px-4 flex items-start justify-between gap-6">
          <div className="w-full max-w-2xl">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled"
              className="font-serif font-bold text-zinc-800 bg-transparent outline-none placeholder:text-zinc-400 w-full text-base border-none shadow-none focus-visible:ring-0 px-0"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Blog description"
              className="w-full mt-2 resize-none border-none shadow-none focus-visible:ring-0 px-0 text-sm text-zinc-500 placeholder:text-zinc-300"
              rows={2}
            />
            <CoverUpload value={cover} onChange={setCover} />
          </div>

          <div className="flex gap-3 shrink-0 items-center pt-1">
            <Button
              variant="outline"
              onClick={() => setPreview((p) => !p)}
            >
              {preview ? 'Edit' : 'Preview'}
            </Button>
            <Button className="px-5 rounded-full hover:scale-105 transition-transform">
              Publish
            </Button>
          </div>
        </div>
      </header>

      <main className="w-full mx-auto px-4 py-16">
        {preview ? (
          <BlogDisplay
            html={html}
            title={title || 'Untitled'}
            cover={cover}
            author="You"
            date="Today"
            readingTime={2}
          />
        ) : (
          <BlogEditor initialContent={html} onChange={setHtml} />
        )}
      </main>
    </div>
  )
}