import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const {pathname} = useLocation()
    
  return (
    <div className='px-5 py-3  '>
        <div className='flex justify-between items-center'>
            <Link to={"/"} className='p-3 cursor-pointer border rounded-full'>
                <h1>Vishal</h1>
            </Link>
            <div className='py-3 px-8 rounded-4xl border space-x-4 flex justify-center'>
                <Link className={`${pathname === "/" ? "text-primary  font-medium" : ""} hover:text-primary text-pretty`} to={"/"}>Home</Link>
                <Link className={`${pathname === "/skills" ? "text-primary  font-medium" : ""} hover:text-primary text-pretty`} to={"/skills"}>Skills</Link>
                <Link className={`${pathname === "/projects" ? "text-primary  font-medium" : ""} hover:text-primary text-pretty`} to={"/projects"}>Projects</Link>
                <Link className={`${pathname === "/contact" ? "text-primary  font-medium" : ""} hover:text-primary text-pretty`} to={"/contact"}>Contact Me</Link>
            </div>
            <div>
                <ThemeToggle />
            </div>
        </div>
    </div>
  )
}

export default Navbar