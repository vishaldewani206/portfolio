import { ArrowRight, SquareArrowOutUpRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

export const Project = () => {
  return (
    <div className='flex gap-4'>

      <div className='grow  bg-gray-200   py-8 px-6 rounded-xl w-full relative z-20 overflow-hidden group flex flex-col'>
        <div className='space-y-3'>
          <p className='flex text-gray-700 '>Fullstack Project</p>
          <h2 className='text-heading font-bold text-3xl'>UMAT Mock Test Platform</h2>
          <p className='text-gray-700 text-xl'>
            UMAT is a platform for students. Every year thousands of students give 
            entrance exams in different Universities but they don&apos;t have  a platform
            to test their skills before the main event. This platform will help them to 
            check their preparation.
          </p>
          <Button className='rounded-full px-6 py-5 text-xl' size={"lg"} >Visit <SquareArrowOutUpRight /></Button>
        </div>

        <div className='mt-auto space-y-4 grid grid-cols-3'>
          <p className='flex'><ArrowRight /> Nextjs</p>
          <p className='flex'><ArrowRight /> Nodejs</p>
          <p className='flex'><ArrowRight /> Mongodb</p>
          <p className='flex'><ArrowRight /> Mongodb</p>
          <p className='flex'><ArrowRight /> Mongodb</p>

        </div>

      </div>

      <div className='grow w-full h-120 overflow-hidden rounded-xl group cursor-pointer'>
        <Image className='object-cover w-full group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500' src={"/images/nextgendevs.png"} alt='project' width={400} height={400} />
      </div>
    </div>
  )
}
