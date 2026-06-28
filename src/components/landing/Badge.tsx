import { SquareArrowOutUpRight } from 'lucide-react'
import Image from 'next/image'

export const Badge = ({link, image}: {link: string, image: string}) => {
  return (
    <a target='_blank' rel='noreferrer noopener' href={link} className='group relative cursor-pointer'>

      <SquareArrowOutUpRight className='absolute md:top-1/2 right-0 md:left-1/2 md:opacity-0 group-hover:opacity-100  md:-translate-x-1/2 md:-translate-y-1/2 z-10 text-gray-800 md:text-white' />

      <Image src={image} className="object-contain w-30 h-30" alt="google ai badge" width={150} height={150} />
      <div className='absolute inset-0 group-hover:bg-black/40' />
    </a>
  )
}
