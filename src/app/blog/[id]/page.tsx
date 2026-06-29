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
import { BlogPageData } from '@/lib/types'
import NotFound from '@/app/not-found'

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { show, hide } = useLoading()

  const { hasViewed, markViewed } = useViewStore()
  const didView = useRef(false)

  const [blogData, setBlogData] = useState<BlogPageData | null>(null);
    const [fetching, setFetching] = useState(true) // true until first fetch completes


  useEffect(() => {
    if (!id) return
    show()
    
    const load = async () => {
      setFetching(true)
      try {
        const data = await getBlogById(id)
        setBlogData(data)
      } catch {
        setBlogData(null)
      } finally {
        setFetching(false)
        hide()
      }
    }

    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (!blogData?.blog._id) return        
    if (didView.current) return   
    if (hasViewed(blogData?.blog._id)) return

    didView.current = true
    viewBlog(blogData?.blog._id).then(() => {
      markViewed(blogData?.blog._id)
    })
  }, [blogData?.blog?._id]) 


  if (fetching) return null
  if (!blogData?.blog) return <NotFound link='/blog' /> 

  return (
    <div>
      <Button onClick={()=> router.push("/blog")} variant={"outline"} className='mt-4'>
        <ArrowLeft />
        Go Back
      </Button>
      <BlogDisplay
        html={blogData?.blog.content}
        title={blogData?.blog.title}
        cover={blogData?.blog.cover}
        date={blogData?.blog.createdAt}
        liked={blogData?.liked}
        likeCount={blogData?.blog.likes}
        blogId={blogData?.blog._id}
      />
    </div>
  )
}