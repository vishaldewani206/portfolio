import type { Editor } from '@tiptap/react'
import { uploadToCloudinary } from './uploadImage'

function getImageNode(editor: Editor, src: string) {
  let found: { pos: number; node: any } | null = null
  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === 'image' && node.attrs.src === src) {
      found = { pos, node }
      return false
    }
  })
  return found
}

function updateImageAttrs(editor: Editor, src: string, attrs: Record<string, string | null>) {
  const found = getImageNode(editor, src)
  if (!found) return
  const { pos, node } = found
  editor.view.dispatch(
    editor.state.tr.setNodeMarkup(pos, undefined, { ...node.attrs, ...attrs })
  )
}

function removeImage(editor: Editor, src: string) {
  const found = getImageNode(editor, src)
  if (!found) return
  const { pos, node } = found
  editor.view.dispatch(
    editor.state.tr.delete(pos, pos + node.nodeSize)
  )
}

export async function handleImageUpload(file: File, editor: Editor) {
  // validate file before doing anything
  const MAX_SIZE_MB = 10
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

  if (!ALLOWED_TYPES.includes(file.type)) {
    alert('Only JPG, PNG, WEBP and GIF images are allowed.')
    return
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    alert(`Image must be under ${MAX_SIZE_MB}MB.`)
    return
  }

  // insert blob URL immediately so editor feels instant
  const blobUrl = URL.createObjectURL(file)

  editor.chain().focus().setImage({
    src: blobUrl,
    'data-uploading': 'true',
    'data-progress': '0',
  } as any).run()

  try {
    const { secure_url, public_id } = await uploadToCloudinary(file, (pct) => {
      updateImageAttrs(editor, blobUrl, { 'data-progress': String(pct) })
    })

    // swap blob URL with real Cloudinary URL
    updateImageAttrs(editor, blobUrl, {
      src: secure_url,
      'data-uploading': null,
      'data-progress': null,
      'data-public-id': public_id,
    })

    URL.revokeObjectURL(blobUrl)
  } catch (err) {
    console.error('Upload failed:', err)
    removeImage(editor, blobUrl)
    URL.revokeObjectURL(blobUrl)
    alert('Image upload failed. Please try again.')
  }
}