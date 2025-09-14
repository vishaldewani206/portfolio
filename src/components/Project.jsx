import React from 'react'
import { HiExternalLink } from "react-icons/hi";

const Project = ({title,description, image, link}) => {
  return (
    <a href={link} target='_blank' className='flex flex-col rounded-xl overflow-hidden text-white group transition-all relative'>
        <img src={image} alt="image"  className='w-full  object-cover'/>
        <div className='absolute z-10 -bottom-60 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all bg-sky-800 p-2 rounded-t-2xl w-full'>
            <h2 className='text-3xl font-medium font-heading'>{title}</h2>
        <p className='p-3 text-left'>{description}</p>
        </div>
        <div className='absolute  bottom-0 opacity-0 group-hover:opacity-100 transition-all bg-gray-800/40 p-2  w-full h-full' />
        <HiExternalLink className='absolute right-5 top-4 text-5xl group-hover:scale-110 group-hover:text-white transition-transform md:text-gray-400 bg-primary p-2 rounded-full' />

    </a>
  )
}

export default Project