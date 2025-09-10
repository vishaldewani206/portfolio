import React from 'react'

export const Capsule = ({text}) => {
  return (
    <div className='md:text-lg md:py-2 md:px-3 py-1 px-2 mb-3 rounded-full border cursor-pointer hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black '>{text}</div>
  )
}
