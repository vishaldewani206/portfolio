'use client'

import { useEffect, useRef, useState } from 'react'
import type { Editor } from '@tiptap/react'
import { Bold, Italic, Link as LinkIcon, Quote, Code, Heading1, Heading2 } from 'lucide-react'

interface Props {
  editor: Editor
}

interface Pos {
  top: number
  left: number
}

export function BubbleToolbar({ editor }: Props) {
  const [pos, setPos] = useState<Pos | null>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const { from, to } = editor.state.selection
      if (from === to) {
        setPos(null)
        return
      }

      const domSelection = window.getSelection()
      if (!domSelection || domSelection.rangeCount === 0) {
        setPos(null)
        return
      }

      const range = domSelection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      const toolbar = toolbarRef.current
      const toolbarWidth = toolbar?.offsetWidth ?? 280

      setPos({
        top: rect.top + window.scrollY - 48,
        left: rect.left + window.scrollX + rect.width / 2 - toolbarWidth / 2,
      })
    }

    editor.on('selectionUpdate', update)
    editor.on('blur', () => setPos(null))
    return () => {
      editor.off('selectionUpdate', update)
    }
  }, [editor])

  const setLink = () => {
    const url = window.prompt('URL')
    if (url) editor.chain().focus().setLink({ href: url }).run()
    else editor.chain().focus().unsetLink().run()
  }

  if (!pos) return null

  return (
    <div
      ref={toolbarRef}
      style={{ top: pos.top, left: pos.left }}
      className="fixed z-50 flex items-center gap-1 bg-zinc-900 text-white rounded-lg px-2 py-1.5 shadow-xl pointer-events-auto"
    >
      <Btn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
        <Bold size={14} />
      </Btn>
      <Btn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
        <Italic size={14} />
      </Btn>
      <Btn active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} title="Code">
        <Code size={14} />
      </Btn>

      <div className="w-px h-4 bg-zinc-600 mx-1" />

      <Btn active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="H1">
        <Heading1 size={14} />
      </Btn>
      <Btn active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="H2">
        <Heading2 size={14} />
      </Btn>
      <Btn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">
        <Quote size={14} />
      </Btn>

      <div className="w-px h-4 bg-zinc-600 mx-1" />

      <Btn active={editor.isActive('link')} onClick={setLink} title="Link">
        <LinkIcon size={14} />
      </Btn>
    </div>
  )
}

function Btn({ children, onClick, active, title }: {
  children: React.ReactNode
  onClick: () => void
  active: boolean
  title: string
}) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={title}
      className={`p-1.5 rounded transition-colors ${active ? 'bg-white text-zinc-900' : 'hover:bg-zinc-700 text-zinc-300'}`}
    >
      {children}
    </button>
  )
}