import React from 'react'
import { Capsule } from '../components/Capsule'
import { PersonalDetails } from '../components/PersonalDetails'
import Transition from "../utils/Transition";
import {motion} from 'framer-motion'
const Home = () => {
  const v = {
  initial: { opacity: 0, y: 10 },   // ✅ correct spelling
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 }
};

const parent = {
  initial: { opacity: 1 }, // keep parent visible
  animate: {
    opacity: 1,
    transition: {
      delayChildren:1,
      staggerChildren: 0.2, // delay between children
    },
  },
};

const child = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
  return (
    <section className=''>
        {/* <p className='text-2xl'>Hello.</p> */}
        <div className='space-y-2 '>
            <motion.p
              variants={v}
              initial="initial"
              animate="animate"
              exit="exit"
             className='md:text-2xl text-xl '>Hello, I am</motion.p>
            <motion.h1 
            variants={v}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{delay:0.2}}
            className='md:text-6xl text-pretty text-4xl font-medium font-heading text-primary'>Vishal</motion.h1>
            <motion.h1
            variants={v}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{delay:0.4}}
             className='md:text-3xl text-xl '>FullStack Web Developer</motion.h1>
        </div>
        <motion.p 
        variants={v}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{delay:0.6}}
        className='mt-2 md:text-xl dark:text-zinc-400 text-zinc-600'>
            I am passionate about crafting modern, responsive, and user-friendly websites.
        </motion.p>
        <motion.p 
        variants={v}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{delay:0.8}}
        className='md:text-xl dark:text-zinc-400 text-zinc-600 mb-2'>
            I turn ideas into seamless digital experiences with clean code and creative design.
        </motion.p>
         
        <motion.div
  className="flex space-x-3 flex-wrap mt-4"
  variants={parent}
  initial="initial"
  animate="animate"
  transition={{delay:1}}
>
  <motion.div variants={child} >
    <Capsule text="Problem Solving" />
  </motion.div>
  <motion.div variants={child}>
    <Capsule text="Adaptability" />
  </motion.div>
  <motion.div variants={child}>
    <Capsule text="Attention to Detail" />
  </motion.div>
  <motion.div variants={child}>
    <Capsule text="Creativity" />
  </motion.div>
</motion.div>
        <motion.div
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:1.2}}
        >
          <PersonalDetails />
        </motion.div>
    </section>
  )
}
const WrappedHome = Transition(Home)

export default WrappedHome