'use client'

import { useEffect, useRef, useState } from 'react'
import { BlogEditor } from '@/components/blog/BlogEditor'
import { BlogDisplay } from '@/components/blog/BlogDisplay'
import { CoverUpload } from '@/components/blog/CoverUpload'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { getBlogById, updateBlog } from '@/lib/use-fetch-blogs'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { useLoading } from '@/lib/loading'
import { useBlogStore } from '@/store/useBlogs'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function EditBlog() {
  const { id } = useParams<{ id: string }>()
  const { show, hide } = useLoading()
  const router = useRouter()

  const [preview, setPreview] = useState<boolean>(false)
  const [notFound, setNotFound] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const blog = useBlogStore((state) => state.blogsMap[id] ?? null)
  const upsertBlog = useBlogStore((state) => state.upsertBlog)
  const [form, setForm] = useState({
    title: '',
    description: '',
    html: '',
    cover: '',
    ready: false,
  })
  const initRef = useRef(false)


  useEffect(() => {
    if (!id || blog) return

    const fetch = async () => {
      show()
      try {
        const data = await getBlogById(id)
        if (!data) { setNotFound(true); return }
        upsertBlog(data.blog)
      } catch {
        setNotFound(true)
      } finally {
        hide()
      }
    }

    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (!blog || initRef.current) return
    initRef.current = true
  
    setForm({
      title: blog.title,
      description: blog.description,
      html: blog.content,
      cover: blog.cover,
      ready: true,
    })
  }, [blog])
  const handleUpdate = async () => {
    if (!id) return
    if (!form.title || !form.html || !form.description || !form.cover) {
      toast.error('All fields are required', { position: 'top-right', richColors: true })
      return
    }

    setPublishing(true)
    show('Saving...')
    try {
      const updated = await updateBlog(id, form.title, form.description, form.html, form.cover)
      upsertBlog(updated.blog) 
      toast.success('Blog updated', { position: 'top-right', richColors: true })
    } catch(err) {
      console.log(err);
      toast.error('Failed to update blog', { position: 'top-right', richColors: true })
    } finally {
      setPublishing(false)
      hide()
    }
  }

  if (notFound) {
    return <p className="text-center py-20 text-zinc-400">Blog not found.</p>
  }

  if (!blog || !form.ready) return null

  return (
    <div className="min-h-screen bg-white">
      <header className="mt-4 border-b border-zinc-100 bg-white/90 backdrop-blur pb-6">
        <Button onClick={()=> router.push("/dashboard")} variant={"outline"} className='mt-4 mb-8'>
          <ArrowLeft />
          Go Back
        </Button>
        <div className="w-full mx-auto px-4 flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="w-full max-w-2xl order-2 md:order-1">
            <Input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Untitled"
              className="font-serif font-bold text-zinc-800 bg-transparent outline-none placeholder:text-zinc-400 w-full text-base border-none shadow-none focus-visible:ring-0 px-0"
            />
            <Textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Blog description"
              className="w-full mt-2 resize-none border-none shadow-none focus-visible:ring-0 px-0 text-sm text-zinc-500 placeholder:text-zinc-300"
              rows={2}
            />
            <CoverUpload value={form.cover} onChange={(url) => setForm((f) => ({ ...f, cover: url }))} />
          </div>

          <div className="flex gap-3 shrink-0 items-center pt-1 order-1 md:order-2 ml-auto md:ml-0">
            <Button variant="outline" onClick={() => setPreview((p) => !p)}>
              {preview ? 'Edit' : 'Preview'}
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={publishing}
              className="px-5 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
            >
              {publishing ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </div>
      </header>

      <main className="w-full mx-auto px-4 py-16">
        {preview ? (
          <BlogDisplay
            html={form.html}
            title={form.title || 'Untitled'}
            cover={form.cover}
            date={blog.createdAt}
            likeCount={0}
            liked={false}
            blogId='123'
          />
        ) : (
          <BlogEditor initialContent={form.html} onChange={(val) => setForm((f) => ({ ...f, html: val }))} />
        )}
      </main>
    </div>
  )
}