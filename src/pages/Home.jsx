import React from 'react'
import { Capsule } from '../components/Capsule'
import { PersonalDetails } from '../components/PersonalDetails'
import ThemeToggle from '../components/ThemeToggle'

const Home = () => {
  return (
    <section className=''>
        {/* <p className='text-2xl'>Hello.</p> */}
        <div className='space-y-2 '>
            <p className='md:text-2xl text-xl '>Hello, I am</p>
            <h1 className='md:text-6xl text-pretty text-4xl font-medium font-heading text-primary'>Vishal</h1>
            <h1 className='md:text-3xl text-xl '>FullStack Web Developer</h1>
        </div>
        <p className='mt-2 md:text-xl dark:text-zinc-400 text-zinc-600'>
            I am passionate about crafting modern, responsive, and user-friendly websites.
        </p>
        <p className='md:text-xl dark:text-zinc-400 text-zinc-600 mb-2'>
            I turn ideas into seamless digital experiences with clean code and creative design.
        </p>
        <div className='flex space-x-3 flex-wrap  mt-4'>
            
        <Capsule text={"Problem Solving"} />
        <Capsule text={"Adaptability"} />
        <Capsule text={"Attention to Detail"} />
        <Capsule text={"Creativity"} />
        </div>
        <PersonalDetails />
    </section>
  )
}

export default Home