export async function uploadImage(file: File): Promise<string> {
  // Replace this with your actual upload logic
  // e.g. Cloudinary, S3, or a Next.js API route
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string) // base64 for demo
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}