'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useBlogStore } from '@/store/useBlogs'
import { getBlogById, viewBlog } from '@/lib/use-fetch-blogs'
import { BlogDisplay } from '@/components/blog/BlogDisplay'
import { useLoading } from '@/lib/loading'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useViewStore } from '@/store/viewStore'

export default function BlogPostPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const { show, hide } = useLoading()
  const [notFound, setNotFound] = useState(false)
  const [readingTime, setReadingTime] = useState(0)

  // select directly from store — stable selector, no function call in render
  const blog = useBlogStore((state) => state.blogsMap[id] ?? null)
  const upsertBlog = useBlogStore((state) => state.upsertBlog)


  const {hasViewed, markViewed} = useViewStore()

  useEffect(()=>{
    if(!hasViewed(blog._id)){
      viewBlog(blog._id).then(()=>{
        markViewed(blog._id)
      })
    }

  },[blog._id])
  

  useEffect(()=>{
    if (blog){
      calculateReadingTime(setReadingTime, blog.content)
    }
  },[blog])

  useEffect(() => {
    
    if (!id) return
    if (blog) return // already in store, skip fetch

    const fetch = async () => {
      show()
      try {
        const data = await getBlogById(id)
        if (!data) {
          setNotFound(true)
          return
        }
        upsertBlog(data)
      } catch {
        setNotFound(true)
      } finally {
        hide()
      }
    }

    fetch()
  }, [id]) // only re-run if id changes

  if (notFound) {
    return (
      <p className="text-center py-20 text-zinc-400">Blog not found.</p>
    )
  }

  if (!blog) return null

  return (
    <>
    <Button onClick={()=> router.back()} variant={"outline"} className='mt-4 -mb-5'>
      <ArrowLeft />
      Go Back
    </Button>
    <BlogDisplay
      html={blog.content}
      title={blog.title}
      cover={blog.cover}
      date={blog.createdAt}
      readingTime={readingTime}
    />
    </>
  )
}


function calculateReadingTime(setReadingTime: Dispatch<SetStateAction<number>>,html: string) {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, "");

  // Count words
  const words = text.trim().split(/\s+/).length;

  // Average reading speed
  const wpm = 200;

  setReadingTime(Math.max(1, Math.ceil(words / wpm)))
}