import { timeAgo } from '@/lib/format-date'
import { Eye, Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ShareButtons from './ShareButtons'
interface  BlogTypes{
  title: string
  description: string
  cover: string
  date: Date,
  to: string,
  totalComments: number
  totalLikes: number
  totalViews: number

}

export const Blog = ({title, description,cover, date, to, totalComments, totalLikes, totalViews}: BlogTypes) => {
  return (
    <Link href={to} className='border p-4 rounded-2xl block'>
      <div className='flex md:flex-row flex-col justify-between'>
        <div className='order-2 md:order-1 mt-2 md:mt-0 md:pr-6'>
          <div className='text-gray-500 mb-1'>
            {timeAgo(date)}
          </div>
          <h2 className='text-xl mb-2 font-medium font-heading'>{title}</h2>
          <p className='text-gray-600'>
            {description}
          </p>
          <div className='flex justify-between mt-4 text-gray-500'>
            <div className='flex gap-4 '>
              <div className='flex gap-1'>
                <Eye />
                {totalViews}
              </div>
              <div className='flex gap-1'>
              <Heart />
              {totalLikes}
              </div>
              <div className='flex gap-1'>
              <MessageCircle />
              {totalComments}
              </div>
            </div>
            <div
              onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              }}
            >
              <ShareButtons url={`https://vishaldewani.vercel.app${to}`} title={title} />
            </div>
          </div>
        </div>
        <Image
          src={cover || '/images/placeholder.png'}
          className='object-cover rounded-2xl w-full md:w-50 order-1 md:order-2'
          width={150}
          height={150}
          alt='blog cover image'
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.png'
          }}
        />
      </div>
    </Link>
  )
}
