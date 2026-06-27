"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"

export const Contact = () => {
  const SOCIALS = [
    {
      name: "Github",
      link: "https://github.com/vishaldewani206",
      image: "/icons/github.png"
    },
    {
      name: "Linkedin",
      link: "https://linkedin.com/in/vishal-dewani",
      image: "/icons/linkedin.png"
    },
    {
      name: "X (Twitter)",
      link: "https://x.com/Vishal139",
      image: "/icons/x.png"
    }
  ]


  return (
    <section className="relative bg-white py-20">
      <div className="contact md:w-[70%] w-[90%] min-h-100  mx-auto  flex flex-col md:flex-row items-center gap-4">
        <div className="flex flex-col justify-center bg-primary p-8 rounded-2xl w-full flex-1">
          <h2 className="text-3xl text-white font-heading">Let&apos;s Connect</h2>
          <div className="flex mt-12 gap-8">
            {SOCIALS.map((e)=>(
              <Image src={e.image} key={e.link} alt={e.name} width={50} height={50} />
            ))}
          </div>
          <Button variant={"outline"} className="rounded-full mt-10 py-7 px-5 group" size="lg">
            Download Resume{" "}
            <SquareArrowOutUpRight className="group-hover:scale-110" />
          </Button>
        </div>

        <div className="bg-secondary p-8 rounded-2xl w-full flex-2 ">
          <h2 className="text-3xl font-heading mb-4 font-medium">Checkout My Blogs</h2>
          <p className="text-zinc-800">
            I also write blog posts focused on case studies of the projects I build. In these blogs, I explain how each project was developed, including the tech stack, challenges I faced, and the solutions I implemented. It’s a way to document my development process and help others understand how real-world web applications are built.
          </p>
          <Link href={"/blog"} className="mt-10 block">
            <Button size={"lg"} className="rounded-full px-8 py-6 text-lg">
              View Blogs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
