'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image'
import { ImageExtension } from '@/lib/ImageExtension'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import CharacterCount from '@tiptap/extension-character-count'
import { MermaidCodeBlock } from './MermaidCodeBlock'
import { BubbleToolbar } from './BubbleToolbar'
import { FloatingToolbar } from './FloatingToolbar'
import { useRef } from 'react'

interface Props {
  initialContent?: string
  onChange?: (html: string) => void
}

export function BlogEditor({ initialContent, onChange }: Props) {
  const editor = useEditor({
    
    extensions: [
      StarterKit.configure({
        codeBlock: false, // replaced by MermaidCodeBlock
      }),
      MermaidCodeBlock,
      ImageExtension.configure({
        HTMLAttributes: {
          class: 'rounded-md max-w-100 my-8 mx-auto block',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'underline underline-offset-2 text-zinc-800 hover:text-black',
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') return 'Title'
          return "Tell your story…"
        },
      }),
      Typography,
      CharacterCount,
    ],
    content: initialContent || '',
    editorProps: {
      attributes: {
        class: 'outline-none min-h-screen mb-12',
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
  })

  const containerRef = useRef<HTMLDivElement>(null)


  if (!editor) return null

  const words = editor.storage.characterCount.words()

  return (
    <div ref={containerRef} className="relative">
      <BubbleToolbar editor={editor} />
      <FloatingToolbar editor={editor} containerRef={containerRef} />

      <EditorContent
        editor={editor}
        className="
          prose prose-zinc
          max-w-none
          font-serif
          [&_.ProseMirror>h1]:text-4xl
          [&_.ProseMirror>h1]:font-bold
          [&_.ProseMirror>h1]:tracking-tight
          [&_.ProseMirror>h1]:mb-2
          [&_.ProseMirror>h1]:mt-0
          [&_.ProseMirror>p]:text-xl
          [&_.ProseMirror>p]:leading-[1.85]
          [&_.ProseMirror>p]:text-zinc-800
          [&_.ProseMirror_.is-empty::before]:text-zinc-400
          [&_.ProseMirror_.is-empty::before]:content-[attr(data-placeholder)]
          [&_.ProseMirror_.is-empty::before]:pointer-events-none
          [&_.ProseMirror_.is-empty::before]:float-left
          [&_.ProseMirror_.is-empty::before]:h-0
        "
      />

      <p className="mt-6 text-xs text-zinc-400">{words} words</p>
    </div>
  )
}