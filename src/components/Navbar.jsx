import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const {pathname} = useLocation()
    const [open, setOpen] = useState(false)
    

  return (
    <div className='px-5 py-3  z-10'>
        <div className='flex justify-between  items-center'>
            <Link to={"/"} className='p-3 cursor-pointer border rounded-full'>
                <h1>
                    <img src={"/logo.png"} alt="" className='w-6 h-6' />
                </h1>
            </Link>
            <div
  className={`absolute z-10 md:static top-20 left-5 w-[90%] md:w-auto py-3 px-8 rounded-4xl border bg-white dark:bg-zinc-950 
  flex md:flex-row flex-col justify-center transition-all duration-300 space-y-3 md:space-y-0 md:space-x-3
  ${open ? "flex" : "hidden"} md:flex`}
>
                <Link onClick={()=> setOpen(!open)} className={`${pathname === "/" ? "text-primary  font-medium" : ""} hover:text-primary text-pretty`} to={"/"}>Home</Link>
                <Link onClick={()=> setOpen(!open)} className={`${pathname === "/skills" ? "text-primary  font-medium" : ""} hover:text-primary text-pretty`} to={"/skills"}>Skills</Link>
                <Link onClick={()=> setOpen(!open)} className={`${pathname === "/projects" ? "text-primary  font-medium" : ""} hover:text-primary text-pretty`} to={"/projects"}>Projects</Link>
                <Link onClick={()=> setOpen(!open)} className={`${pathname === "/contact" ? "text-primary  font-medium" : ""} hover:text-primary text-pretty`} to={"/contact"}>Contact Me</Link>
            </div>
            <div className='flex items-center space-x-2'>
                <ThemeToggle />
        {/* HAMBURGER  */}
           <div
      onClick={() => setOpen(!open)}
      className="cursor-pointer w-8 h-6 flex flex-col justify-between items-center md:hidden"
    >
      <span
        className={`h-1 w-8 rounded-full bg-black dark:bg-white transform transition duration-300 ease-in-out ${
          open ? "rotate-45 translate-y-2.5" : ""
        }`}
      />
      <span
        className={`h-1 w-8 rounded-full bg-black dark:bg-white transition duration-300 ease-in-out ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-1 w-8 rounded-full bg-black dark:bg-white transform transition duration-300 ease-in-out ${
          open ? "-rotate-45 -translate-y-2.5" : ""
        }`}
      />
    </div>
            </div>
        
        </div>

    </div>
  )
}

export default Navbar