'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Editor } from '@tiptap/react'
import { Plus, ImageIcon, Minus, Code2, List } from 'lucide-react'
import { handleImageUpload } from '@/lib/handleImageUpload'

interface Props {
  editor: Editor
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function FloatingToolbar({ editor, containerRef }: Props) {
  const [top, setTop] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    const update = () => {
      const { $from, from, to } = editor.state.selection
      if (from !== to) { setTop(null); return }
      if ($from.parent.textContent !== '') { setTop(null); return }

      const coords = editor.view.coordsAtPos(from)
      const container = containerRef.current

      if (!container) return

      const containerRect = container.getBoundingClientRect()

      // coords.top is relative to viewport, containerRect.top is also viewport-relative
      // subtract to get position relative to the container
      setTop(coords.top - containerRect.top + container.scrollTop)
      setOpen(false)
    }

    editor.on('selectionUpdate', update)
    editor.on('transaction', update)
    return () => {
      editor.off('selectionUpdate', update)
      editor.off('transaction', update)
    }
  }, [editor])

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    await handleImageUpload(file, editor)
    setOpen(false)
    e.target.value = '' // reset so same file can be picked again
  }

  if (top === null) return null

  return (
    <div style={{ top }} className="absolute left-0 z-40 flex items-center gap-2 -translate-x-10">
      <button
        onMouseDown={(e) => { e.preventDefault(); setOpen((o) => !o) }}
        className="w-7 h-7 rounded-full border border-zinc-300 bg-white flex items-center justify-center text-zinc-400 hover:border-zinc-600 hover:text-zinc-600 transition-colors"
      >
        <Plus size={15} className={`transition-transform duration-150 ${open ? 'rotate-45' : ''}`} />
      </button>

      {open && (
        <div className="flex items-center gap-1 bg-white border border-zinc-200 rounded-lg px-2 py-1 shadow-md">
          <MenuBtn title="Image" onClick={() => fileRef.current?.click()}>
            <ImageIcon size={15} />
          </MenuBtn>
          <MenuBtn title="Code block" onClick={() => { editor.chain().focus().toggleCodeBlock().run(); setOpen(false) }}>
            <Code2 size={15} />
          </MenuBtn>
          <MenuBtn title="Divider" onClick={() => { editor.chain().focus().setHorizontalRule().run(); setOpen(false) }}>
            <Minus size={15} />
          </MenuBtn>
          <MenuBtn title="Bullet list" onClick={() => { editor.chain().focus().toggleBulletList().run(); setOpen(false) }}>
            <List size={15} />
          </MenuBtn>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  )
}

function MenuBtn({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode
  onClick: () => void
  title: string
}) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={title}
      className="p-1.5 rounded hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors"
    >
      {children}
    </button>
  )
}