"use client"
import { Navbar } from "./Navbar"
import VideoBackground from "./VideoBackground"
import { Banner } from "./Banner"
import { Header } from "./Header"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export const Landing = () => {
  
  useGSAP(()=>{
    const tl = gsap.timeline()
    tl.from(".header", {
      y: -500,
      ease: "power1.out"
    })
    .from(".heading", {
      y: 300,
      opacity:0,
      delay:0.4,
      ease: "power1.out"
    })
    .from(".bio", {
      y: -300,
      opacity:0,
      delay:0.2,
      ease: "power1.out"
    })
    .from(".nav", {
      y: -300,
      opacity:0,
      delay:0.2,
      ease: "power1.out"
    })
    .from(".banner", {
      y: 300,
      opacity:0,
      ease: "power1.out"
    })
  },[])

  return (
    <section id="home">
      <Navbar />

      <Header />

      <VideoBackground
      poster="/poster.jpg"
      source={"https://www.pexels.com/download/video/33230270/"}
      />

      <Banner />

      <div className="min-h-[80vh] w-full" />

    </section>
  )
}
