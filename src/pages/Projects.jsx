import React from 'react'
import Project from '../components/Project'
import Transition from "../utils/Transition";
import {motion} from 'framer-motion'
import {projects} from "../utils/projects.js"



const Projects = () => {
  const parent = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
	  delayChildren:0.5
    },
  },
};

const child = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
  return (
    <div className='text-center'>
        <motion.h1 
        initial= {{ opacity: 0, y: 20 }}
        animate= {{ opacity: 1, y: 0 }}
        className='text-center text-5xl font-medium font-heading text-primary mb-5'>My Projects</motion.h1>

        <motion.div 
        variants={parent}
        initial="initial"
        animate="animate"
        className='grid grid-cols-2 md:grid-cols-3 w-full gap-4 items-start'>
        
        {projects.map((e,i)=>(
          <motion.div
          variants={child}
           key={i}>
            <Project title={e.name} description={e.description} image={e.image} link={e.link} />
          </motion.div>
        ))}



        </motion.div>
    </div>
  )
}
const WrappedProject = Transition(Projects)

export default WrappedProject