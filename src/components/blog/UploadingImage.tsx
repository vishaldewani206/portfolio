import { NodeViewWrapper } from '@tiptap/react'
import Image from 'next/image'

interface Props {
  node: {
    attrs: {
      src: string
      'data-uploading'?: string
      'data-progress'?: string
      alt?: string
    }
  }
}

export function UploadingImage({ node }: Props) {
  const { src, 'data-uploading': uploading, 'data-progress': progress } = node.attrs
  const isUploading = uploading === 'true'
  const pct = Number(progress ?? 0)

  return (
    <NodeViewWrapper className="relative my-8 block">
      <Image
        width={300}
        src={src}
        alt={node.attrs.alt ?? ''}
        className={`rounded-md max-w-full mx-auto block transition-opacity ${isUploading ? 'opacity-50' : 'opacity-100'}`}
      />
      {isUploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-48 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-800 rounded-full transition-all duration-200"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-zinc-600 font-mono">{pct}%</span>
        </div>
      )}
    </NodeViewWrapper>
  )
}