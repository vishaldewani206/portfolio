import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type IBlog = {
  title: string;
  description: string;
  cover: string;
  date: string;
  to: string;
}

export const Blog = ({title, description,cover, date,to}: IBlog) => {
  return (
    <Link href={to} className='border p-4 rounded-2xl flex md:flex-row flex-col justify-between'>
      <div className='order-2 md:order-1 mt-2 md:mt-0 md:pr-6'>
        <h2 className='text-xl mb-2 font-medium font-heading'>{title}</h2>
        <p>
          {description}
        </p>
      </div>
      {cover && (
        <Image src={cover} className='object-cover rounded-2xl w-full md:w-50 order-1 md:order-2' width={150} height={150} alt='blog cover image' />
      )}
    </Link>
  )
}
