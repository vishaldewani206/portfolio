'use client'
import 'highlight.js/styles/github-dark.css'
import hljs from 'highlight.js'
import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface Props {
  html: string
  title?: string
  cover?: string
  author?: string
  date?: string
  readingTime?: number
}



export function BlogDisplay({ html, title, author="Vishal Dewani", date, readingTime, cover }: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!html) return

    // small delay to let dangerouslySetInnerHTML finish painting
    const timer = setTimeout(async () => {
      if (!contentRef.current) return

      mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose' })

      // broad selector — covers all class variations Tiptap might save
      const allBlocks = contentRef.current.querySelectorAll('pre code')
      const mermaidBlocks = Array.from(allBlocks).filter((block) => {
        const cls = block.getAttribute('class') ?? ''
        return cls.includes('mermaid')
      })

      console.log('found mermaid blocks:', mermaidBlocks.length) // debug — remove later

      for (const block of mermaidBlocks) {
        const pre = block.closest('pre')
        if (!pre) continue

        const code = block.textContent?.trim() || ''
        if (!code) continue

        const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2)}`

        try {
          const { svg } = await mermaid.render(id, code)
          const wrapper = document.createElement('div')
          wrapper.className = 'flex justify-center my-6 p-4 border border-zinc-200 rounded-lg bg-white overflow-auto '
          wrapper.innerHTML = svg
          pre.replaceWith(wrapper)
        } catch (e: any) {
          document.getElementById(id)?.remove()
          document.querySelector('[id^="dmermaid"]')?.remove()

          const errBox = document.createElement('div')
          errBox.className = 'flex items-start gap-2 bg-red-950/40 border border-red-800/50 rounded-lg p-3 my-4'
          errBox.innerHTML = `
            <span class="text-red-400 text-xs font-mono mt-0.5">✕</span>
            <div>
              <p class="text-red-400 text-xs font-semibold mb-1">Mermaid syntax error</p>
              <p class="text-red-300/70 text-xs font-mono leading-relaxed">${
                (e?.message ?? 'Syntax error').split('\n')[0]
              }</p>
            </div>
          `
          pre.replaceWith(errBox)
        }
      }

      // hljs after mermaid blocks are replaced
      const codeBlocks = contentRef.current.querySelectorAll('pre code')
      codeBlocks.forEach((block) => {
        const cls = block.getAttribute('class') ?? ''
        if (cls.includes('mermaid')) return
        hljs.highlightElement(block as HTMLElement)
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [html])

  return (
    <article className="w-full mx-auto  py-10">
      {/* Header */}
      {title && (
        <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 leading-tight">
          {title}
        </h1>
      )}

      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt={title ?? 'Cover'}
          className="w-full h-72 object-cover rounded-xl mb-10"
        />
      )}

      {(author || date || readingTime) && (
        <div className="flex items-center gap-3 mb-10 text-sm text-zinc-500">
          {author && <span className="font-medium text-zinc-700">{author}</span>}
          {(author && date) && <span>·</span>}
          {date && <span>{date}</span>}
          {readingTime && (
            <>
              <span>·</span>
              <span>{readingTime} min read</span>
            </>
          )}
        </div>
      )}

      

      {/* Content */}
      <div
        ref={contentRef}
        className="
          prose prose-zinc prose-lg
          blog-content
          max-w-none
          font-serif
          [font-size:1.2rem]

          prose-headings:font-serif
          prose-headings:tracking-tight
          prose-headings:text-zinc-900
          prose-h1:text-4xl
          prose-h2:text-3xl
          prose-h3:text-2xl

          prose-p:text-zinc-800
          prose-p:text-[1.2rem]
          prose-p:leading-[1.85]

          prose-ul:list-disc
          prose-ul:pl-7
          prose-ol:list-decimal
          prose-ol:pl-7
          prose-li:my-1
          prose-li:text-[1.2rem]

          prose-a:text-zinc-900
          prose-a:underline
          prose-a:underline-offset-2
          hover:prose-a:opacity-70

          prose-blockquote:border-l-2
          prose-blockquote:border-zinc-900
          prose-blockquote:pl-6
          prose-blockquote:text-zinc-600
          prose-blockquote:not-italic

          prose-code:before:content-none
          prose-code:after:content-none
          prose-code:bg-zinc-100
          prose-code:px-1.5
          prose-code:py-0.5
          prose-code:rounded
          prose-code:text-sm
          prose-code:font-mono

          prose-pre:bg-zinc-900
          prose-pre:text-zinc-100
          prose-pre:rounded-xl
          prose-pre:overflow-auto

          prose-img:rounded-md
          prose-img:mx-auto
          prose-img:my-10

          prose-hr:border-zinc-200
        "
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  )
}