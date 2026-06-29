'use client'

import { useEffect, useCallback } from 'react'
import { useBlogStore } from '@/store/useBlogs'
import { getBlogs } from '@/lib/use-fetch-blogs'
import { Blog } from '@/components/blog/Blog'
import { PaginationSystem } from '@/components/Pagination'
import { useLoading } from '@/lib/loading'

const LIMIT = 10

export default function BlogPage() {
  const blogsMap = useBlogStore((state) => state.blogsMap)
  const ids = useBlogStore((state) => state.ids)
  const page = useBlogStore((state) => state.page)
  const totalPages = useBlogStore((state) => state.totalPages)
  const setPage = useBlogStore((state) => state.setPage)
  const setLoading = useBlogStore((state) => state.setLoading)
  const { show, hide } = useLoading()

  const fetchBlogs = useCallback(async (p: number) => {
    show()
    setLoading(true)
    try {
      const data = await getBlogs(p, LIMIT)
      setPage(data.blogs, data.page, data.totalPages)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setLoading(false)
      hide()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  useEffect(() => {
    if (ids.length === 0) {
      fetchBlogs(1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  return (
    <section className="py-8">
      <div className="space-y-6">
        {ids.map((id) => {
          const blog = blogsMap[id]
          if (!blog) return null
          return (
            <Blog
              key={id}
              to={`/blog/${id}`}
              title={blog.title}
              description={blog.description}
              cover={blog.cover}
              date={blog.createdAt}
              totalComments={blog.comments}
              totalLikes={blog.likes}
              totalViews={blog.views}
            />
          )
        })}

        {ids.length === 0 && (
          <p className="text-center text-zinc-400 py-20">No blogs yet.</p>
        )}
      </div>

      <PaginationSystem
        page={page}
        totalPages={totalPages}
        onPageChange={fetchBlogs}
      />
    </section>
  )
}