'use client'

import { Likes } from './Likes'
import { CommentSystem } from './CommentSystem'
import { BlogContent } from './BlogContent'
import { timeAgo } from '@/lib/format-date'
import ShareButtons from './ShareButtons'

interface Props {
  id?: string
  html: string
  title?: string
  cover?: string
  author?: string
  date?: Date
  liked: boolean | null
  likeCount: number
  blogId: string
  readingTime?: number
  preview?: boolean
}

export function BlogDisplay({
  html, title, author = 'Vishal Dewani', date,
  readingTime, cover, liked, likeCount, blogId, preview, id
}: Props) {
  return (
    <>
      <article className="w-full mx-auto py-10">
        {title && (
          <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 leading-tight">
            {title}
          </h1>
        )}

        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={title ?? 'Cover'}
            className="w-full h-72 object-contain rounded-xl md:mb-10 mb-0"
          />
        )}

        <div className="flex md:flex-row flex-col md:justify-between">
          {(author || date || readingTime) && (
            <div className="flex items-center gap-3 md:mb-10 mb-4 text-sm text-zinc-500">
              {author && <span className="font-medium text-zinc-700">{author}</span>}
              {author && date && <span>·</span>}
              {date && <span>{timeAgo(date)}</span>}
              {readingTime && (
                <>
                  <span>·</span>
                  <span>{readingTime} min read</span>
                </>
              )}
            </div>
          )}
          {!preview && id && (
            <div className='flex gap-4  items-start justify-between md:justify-stretch'>
              <Likes likeCount={likeCount} liked={liked} blogId={blogId} />
              <ShareButtons title={title ?? "Blog"} url={`https://vishaldewani.vercel.app/blog/${id}`}  />
            </div>
          )}
        </div>

        <BlogContent html={html} />
        {!preview && id && (
            <div className='flex justify-end'>
              <ShareButtons title={title ?? "Blog"} url={`https://vishaldewani.vercel.app/blog/${id}`}  />
            </div>
          )}
      </article>

      {!preview && (
        <CommentSystem blogId={blogId} />
      )}
    </>
  )
}