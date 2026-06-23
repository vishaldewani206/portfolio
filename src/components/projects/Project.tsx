import { SquareArrowOutUpRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ProjectTypes } from '@/lib/types'
import { Badge } from '../ui/badge'



export const Project = ({name, subheading,description, tech, link}: ProjectTypes) => {
  return (
    <div className='flex gap-4'>

      <div className='grow  border py-8 px-6 rounded-xl w-full relative overflow-hidden group flex flex-col'>
        <div className='space-y-3'>
          <p className='flex text-gray-700 mb-5'>{subheading}</p>
          <h2 className='text-heading font-bold text-3xl font-heading'>{name}</h2>
          <p className='text-gray-700 text-xl'>
            {description}
          </p>
          <Button variant={"default"} className='rounded-full px-6 py-5 text-lg mb-6 hover:scale-105' size={"lg"} >Visit <SquareArrowOutUpRight /></Button>
        </div>

        <div className='mt-auto flex gap-4 flex-wrap'>
          {tech.map((e)=>(
            // <p key={e} className='flex'><ArrowRight /> {e}</p>
            <Badge className='border-secondary px-4 py-4  cursor-pointer hover:bg-secondary hover:text-white' variant={"outline"} key={e}>{e}</Badge>
          ))}

        </div>

      </div>

      <div className='grow w-full min-h-120 overflow-hidden rounded-xl group cursor-pointer custom-scrollbar'>
        {/* <Image className='object-cover w-full group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500' src={"/images/nextgendevs.png"} alt='project' width={400} height={400} /> */}

        {/* <iframe
            src={link}
            className="w-full h-full rounded-xl border shadow-lg"
            title="NextGen Devs"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          /> */}
      </div>
    </div>
  )
}
