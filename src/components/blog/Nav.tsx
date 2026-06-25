import { User } from 'lucide-react'
import Link from 'next/link'

export const Nav = () => {
  return (
    <div className='flex justify-between items-center w-full'>
      <Link href={"/blog"} className='text-3xl font-heading'>Blog</Link>
      <div className='space-x-4'>
        <div className='rounded-full border p-4'>
          <User />
        </div>
      </div>
    </div>
  )
}
