import React from 'react'

const Project = ({title,description, image}) => {
  return (
    <div className=' rounded-xl overflow-hidden text-white group transition-all relative'>
        <img src={image} alt="image"  className='w-full  object-cover'/>
        <div className='absolute -bottom-60 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all bg-sky-800 p-2 rounded-t-2xl w-full'>
            <h2 className='text-3xl font-medium font-heading'>{title}</h2>
        <p className='p-3 text-left'>{description}</p>
        </div>
    </div>
  )
}

export default Project