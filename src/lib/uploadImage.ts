import axios from 'axios'

export type UploadResult = {
  secure_url: string
  public_id: string
}

export async function uploadToCloudinary(
  file: File,
  onProgress?: (pct: number) => void
): Promise<UploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !preset) {
    throw new Error('Cloudinary env vars are not set')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', preset)
  formData.append('folder', 'blog')

  const { data } = await axios.post<UploadResult>(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData,
    {
      onUploadProgress: (e) => {
        if (e.total) {
          onProgress?.(Math.round((e.loaded / e.total) * 100))
        }
      },
    }
  )

  return {
    secure_url: data.secure_url,
    public_id: data.public_id,
  }
}