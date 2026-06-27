'use client'

import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react'

export function ImageNodeView({ node }: NodeViewProps) {
  const src = node.attrs.src as string
  const alt = node.attrs.alt as string
  const uploading = node.attrs['data-uploading'] as string
  const progress = node.attrs['data-progress'] as string

  const isUploading = uploading === 'true'
  const pct = Number(progress ?? 0)

  return (
    <NodeViewWrapper className="relative my-8 block">
      <img
        src={src}
        alt={alt ?? ''}
        className={`rounded-md max-w-full mx-auto block transition-opacity duration-300 ${
          isUploading ? 'opacity-40' : 'opacity-100'
        }`}
      />
      {isUploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-48 h-1 bg-zinc-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-800 rounded-full transition-all duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-zinc-500 font-mono">{pct}%</span>
        </div>
      )}
    </NodeViewWrapper>
  )
}