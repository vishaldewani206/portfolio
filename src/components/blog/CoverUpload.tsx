'use client'

import { useRef, useState } from 'react'
import { ImagePlus, X, Loader2 } from 'lucide-react'
import { uploadToCloudinary } from '@/lib/uploadImage'

interface Props {
  value: string
  onChange: (url: string) => void
}

export function CoverUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']
    const MAX_MB = 10

    if (!ALLOWED.includes(file.type)) {
      setError('Only JPG, PNG and WEBP allowed.')
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`Max file size is ${MAX_MB}MB.`)
      return
    }

    setError('')
    setUploading(true)
    setProgress(0)

    // show blob preview instantly
    const blob = URL.createObjectURL(file)
    onChange(blob)

    try {
      const { secure_url } = await uploadToCloudinary(file, (pct) => {
        setProgress(pct)
      })
      URL.revokeObjectURL(blob)
      onChange(secure_url)
    } catch (e) {
      setError('Upload failed. Please try again.')
      onChange('')
      URL.revokeObjectURL(blob)
    } finally {
      setUploading(false)
      setProgress(0)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const remove = (e: React.MouseEvent) => {
    e.preventDefault()
    onChange('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="w-full mt-4">
      {value ? (
        // preview state
        <div className="relative w-full h-64 rounded-xl overflow-hidden group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Cover"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              uploading ? 'opacity-50' : 'opacity-100'
            }`}
          />

          {/* progress overlay */}
          {uploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/20">
              <Loader2 size={20} className="text-white animate-spin" />
              <div className="w-48 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-white text-xs font-mono">{progress}%</span>
            </div>
          )}

          {/* remove button */}
          {!uploading && (
            <button
              onClick={remove}
              className="absolute top-3 right-3 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          )}

          {/* change label */}
          {!uploading && (
            <label
              htmlFor="cover-input"
              className="absolute bottom-3 right-3 text-xs bg-black/60 hover:bg-black/80 text-white px-3 py-1.5 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Change cover
            </label>
          )}
        </div>
      ) : (
        // empty drop zone
        <label
          htmlFor="cover-input"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-zinc-200 rounded-xl cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all group"
        >
          <ImagePlus size={22} className="text-zinc-300 group-hover:text-zinc-500 transition-colors mb-2" />
          <p className="text-sm text-zinc-400 group-hover:text-zinc-600 transition-colors">
            Click or drag to upload cover
          </p>
          <p className="text-xs text-zinc-300 mt-1">JPG, PNG, WEBP · max 10MB</p>
        </label>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-2">{error}</p>
      )}

      <input
        ref={inputRef}
        id="cover-input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}