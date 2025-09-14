import React from "react";
import {motion} from 'framer-motion'


import SkillsCapsule from "../components/SkillsCapsule";
import Transition from "../utils/Transition";
import {skillsBackend, skillsFrontend, skillsOther} from "../utils/skills.js"

const Skills = () => {
	const v = {
  initial: { opacity: 0, y: 10 },   // ✅ correct spelling
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 }
};

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
		<div className="text-center flex flex-col justify-center">
			<motion.h1 
			variants={v}
              initial="initial"
              animate="animate"
              exit="exit"
			className="text-center text-5xl font-medium font-heading text-primary">
				My Skills
			</motion.h1>

			<motion.h2 
			variants={v}
              initial="initial"
              animate="animate"
              exit="exit"
			  transition={{delay:0.2}}
			className="mt-5 text-3xl">FullStack Development</motion.h2>

			<div className="flex md:flex-row flex-col mt-4 gap-4">
				<div className="flex-1 border border-primary rounded-xl p-3">
					<h3 className="dark:text-white text-2xl font-medium mb-3">
						Frontend Development
					</h3>
					<motion.div 
					variants={parent}
					initial="initial"
					animate="animate"
					className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
						{skillsFrontend.map((e,i)=>(
							<motion.div 
							variants={child}
							 key={i}>
								<SkillsCapsule
								text={e.text}
								Icon={e.icon}
								color={e.color}
							/>
							</motion.div>
						))}
					</motion.div>
				</div>
				<div className="flex-1 border border-primary rounded-xl p-3">
					<h3 className="dark:text-white text-2xl font-medium mb-3">
						Backend Development
					</h3>
					<motion.div 
					variants={parent}
					initial="initial"
					animate="animate"
					className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
						{skillsBackend.map((e,i)=>(
							<motion.div 
							variants={child}
							key={i}>
								<SkillsCapsule
								text={e.text}
								Icon={e.icon}
								color={e.color}
							/>
							</motion.div>
						))}
					</motion.div>
				</div>

			</div>


      <div className="mt-4">
					<h3 className="dark:text-white text-2xl font-medium mb-3">
						Other Skills
					</h3>
        <div className="flex-1 border border-primary rounded-xl p-3">
					<motion.div 
					variants={parent}
					initial="initial"
					animate="animate"
					className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
						{skillsOther.map((e,i)=>(
							<motion.div
							variants={child}
							key={i}>
								<SkillsCapsule
								text={e.text}
								Icon={e.icon}
								color={e.color}
							/>
							</motion.div>
						))}
					</motion.div>
          </div>
      </div>
		</div>
	);
};
const WrappedSkills = Transition(Skills)

export default WrappedSkills
