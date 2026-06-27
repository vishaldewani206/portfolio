import Image from '@tiptap/extension-image'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ImageNodeView } from '@/components/blog/ImageNodeView'

export const ImageExtension = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-uploading': { default: null },
      'data-progress': { default: null },
      'data-public-id': { default: null },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView)
  },
})