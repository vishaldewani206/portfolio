import React from 'react'
import Project from '../components/Project'
import moviemaina from "../assets/images/moviemaina.png"
import skytracker from "../assets/images/skytracker.png"
import sunnyside from "../assets/images/sunnyside.png"
import empire from "../assets/images/empire.png"
import age from "../assets/images/age-calculator.png"





const Projects = () => {
  return (
    <div className='text-center'>
        <h1 className='text-center text-5xl font-medium font-heading text-primary mb-5'>My Projects</h1>

        <div className='grid grid-cols-2 md:grid-cols-3 w-full gap-4 items-start'>
                    <Project title={"MovieMaina"} description={"MovieMaina is an interactive movie website where users can explore the latest movies, check my watchlist and see which movies are trending. It combines entertainment discovery with social interaction, making movie watching more fun and engaging."} image={moviemaina} />
        <Project title={"SunnySide Agency"} description={"SunnySide Agency is a frontend challenge project built to showcase responsive design and modern UI techniques. It highlights clean layouts, engaging visuals, and interactive components to deliver a professional agency-style landing page."} image={sunnyside} />
        <Project title={"Empire Online Store"} description={"Empire Online Store is a modern e-commerce platform where users can browse products, manage their cart, and shop seamlessly. It offers a smooth shopping experience with a user-friendly design and secure checkout."} image={empire} />
        <Project title={"SkyTracker"} description={"SkyTracker is a weather app that provides real-time forecasts, temperature updates, and location-based weather details. It helps users stay prepared with accurate and up-to-date weather information anytime, anywhere."} image={skytracker} />
        <Project title={"Age Calculator"} description={"Age Calculator is a simple tool that quickly calculates a person’s age from their date of birth."} image={age} />



        </div>
    </div>
  )
}

export default Projects