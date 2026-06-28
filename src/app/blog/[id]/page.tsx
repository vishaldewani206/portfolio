'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useBlogStore } from '@/store/useBlogs'
import { getBlogById, viewBlog } from '@/lib/use-fetch-blogs'
import { BlogDisplay } from '@/components/blog/BlogDisplay'
import { useLoading } from '@/lib/loading'
import { useViewStore } from '@/store/viewStore'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { show, hide } = useLoading()
  const [notFound, setNotFound] = useState(false)

  const blog = useBlogStore((state) => (id ? state.blogsMap[id] ?? null : null))
  const upsertBlog = useBlogStore((state) => state.upsertBlog)

  const { hasViewed, markViewed } = useViewStore()
  const didView = useRef(false)

  // fetch if not in store
  useEffect(() => {
    if (!id || blog) return

    const fetch = async () => {
      show()
      try {
        const data = await getBlogById(id)
        if (!data) { setNotFound(true); return }
        upsertBlog(data)
      } catch {
        setNotFound(true)
      } finally {
        hide()
      }
    }

    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // view tracking — only runs when blog is available
  useEffect(() => {
    if (!blog?._id) return        // guard — blog must exist
    if (didView.current) return   // StrictMode guard
    if (hasViewed(blog._id)) return

    didView.current = true
    viewBlog(blog._id).then(() => {
      markViewed(blog._id)
    })
  }, [blog?._id]) // depends on blog._id, not blog object

  if (notFound) {
    return <p className="text-center py-20 text-zinc-400">Blog not found.</p>
  }

  if (!blog) return null  // loading state — SessionGate/loader handles the spinner

  return (
    <>
      <Button onClick={()=> router.push("/dashboard")} variant={"outline"} className='mt-4'>
        <ArrowLeft />
        Go Back
      </Button>
      <BlogDisplay
        html={blog.content}
        title={blog.title}
        cover={blog.cover}
        date={blog.createdAt}
      />
    </>
  )
}