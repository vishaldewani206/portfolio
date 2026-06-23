import React from 'react'
import { Project } from './Project'
import { ProjectTypes } from '@/lib/types'

export const Projects = () => {
  const PROJECTS: ProjectTypes[] = [
    {
      name: "MindSpark Coaching Acadmey",
      subheading: "Fullstack Project",
      description: "MindSpark Coaching Academy is an online learning platform built with Next.js that connects students, teachers, and administrators in one system. It includes role-based access where students can attend classes and access study material, teachers can manage content and track progress, and admins can oversee the entire platform. The project focuses on creating a smooth digital learning experience and an easy-to-use interface for online education.",
      link: "https://mindspark-academy.vercel.app/",
      // link: "",
      tech: ["NextJS", "BetterAuth", "Zustand", "MongoDB", "Tailwind", "Shadcn", "NodeMailer"]
    },
    {
      name: "UMAT | Online Mock Test Platform",
      subheading: "Fullstack Project",
      description: "UMAT is a full-stack MERN project designed as a mock exam platform for students preparing for university entrance tests. It allows students to practice real exam-style tests, track their performance, and analyze weak areas. The platform is built to simulate actual exam environments and help thousands of students improve their preparation in a structured way.",
      // link: "https://www.umat.online",
      link: "",
      tech: [
        "React", "Redux", "React Query", "Tailwind", "MongoDB", "Express", "NodeJS", "NodeMailer"
      ]
    },
    {
      name: "NextGenDevs",
      subheading: "Frontend Project",
      description: "NextGenDev is a frontend project built for a software agency. It represents a modern agency website where services, projects, and workflows are showcased professionally. The platform focuses on clean UI, fast performance, and a scalable structure.",
      link: "https://nextgendevs.pages.dev/",
      tech: ["React", "GSAP", "ThreeJS", "Tailwind"]
    }
  ]
  return (
    <section id='projects' className='bg-white relative pt-22'>
      <div className='md:w-[70%] w-[90%] mx-auto py-10 space-y-12'>
        {PROJECTS.map((project)=>(
          <Project 
          key={project.name} 
          name={project.name} 
          description={project.description}
          subheading={project.subheading}
          tech={project.tech}
          link={project.link}
          />
        ))}
      </div>
    </section>
  )
}
