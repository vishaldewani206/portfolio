'use client'

import { Likes } from './Likes'
import { CommentSystem } from './CommentSystem'
import { BlogContent } from './BlogContent'
import { timeAgo } from '@/lib/format-date'

interface Props {
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
  readingTime, cover, liked, likeCount, blogId, preview
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
            className="w-full h-72 object-contain rounded-xl mb-10"
          />
        )}

        <div className="flex justify-between">
          {(author || date || readingTime) && (
            <div className="flex items-center gap-3 mb-10 text-sm text-zinc-500">
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
          <div className="flex gap-4">
            {!preview && (
              <Likes likeCount={likeCount} liked={liked} blogId={blogId} />
            )}
          </div>
        </div>

        <BlogContent html={html} />
      </article>

      {!preview && (
        <CommentSystem blogId={blogId} />
      )}
    </>
  )
}