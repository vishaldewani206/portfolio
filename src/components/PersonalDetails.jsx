import React from 'react'
import photo from "../assets/images/photo-2.png"
import { Link } from 'react-router'

export const PersonalDetails = () => {
    // bg-gradient-to-r from-blue-50 to-blue-200
  return (
    <div className='border mt-4 rounded-2xl p-4 flex md:flex-row flex-col justify-between '>
        <div className='flex-2 md:order-1 order-2'>
            <h1 className='text-5xl font-heading'>About Me</h1>
        <p className='mt-2 md:text-lg md:w-[90%] text-zinc-600'>
            I am a Full-Stack Developer with a strong foundation in both frontend and backend technologies. 
            I specialize in building responsive, user-friendly interfaces with HTML, CSS, JavaScript, React, and Tailwind, while also working with Node.js and databases to develop robust backend systems.
            My goal is to create seamless digital experiences by combining clean design, efficient code, and scalable solutions. 
            I am always eager to learn new tools, adapt to challenges, 
            and deliver high-quality work that meets both technical and business needs.
        </p>
        <Link to={"/contact"} className="inline-block ml-auto bg-primary px-12 py-2 rounded-xl mt-4 cursor-pointer text-white " type="submit">Contact Me</Link>

        </div>
        <div className='flex-1  md:order-2 order-1 mb-4 md:mb-0 flex justify-end'>
            <img className=' md:object-cover  max-h-90 -md:m-4' src={photo} alt="" />
        </div>
    </div>
  )
}
