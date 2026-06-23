import { toolsTypes } from '@/lib/types'
import ToolsMarquee from './ToolsMarque'

export const Tools = () => {

  const TOOLS_ONE: toolsTypes[]  = [
    {
      name: "HTML",
      image: "/icons/html.png"
    },
    {
      name: "CSS",
      image: "/icons/css.png"
    },
    {
      name: "JavaScript",
      image: "/icons/js.png"
    },
    {
      name: "React",
      image: "/icons/react.png"
    },
    {
      name: "Redux",
      image: "/icons/redux.png"
    },
    {
      name: "Git",
      image: "/icons/git.png"
    },
    {
      name: "Github",
      image: "/icons/github.png"
    },
  ]

  const TOOLS_TWO: toolsTypes[]  = [
    {
      name: "GSAP",
      image: "/icons/gsap.png"
    },
    {
      name: "TypeScript",
      image: "/icons/typescript.png"
    },
    {
      name: "Next.JS",
      image: "/icons/nextjs.png"
    },
    {
      name: "Node.JS",
      image: "/icons/nodejs.png"
    },
    {
      name: "MongoDB",
      image: "/icons/mongodb.png"
    },
    {
      name: "PostgreSQL",
      image: "/icons/postgresql.png"
    }
  ]

  return (
    <div className="w-full bg-white min-h-[40vh] relative rounded-t-2xl p-8">
        <div className="w-[70%] mx-auto">
        <h2 className="text-2xl mb-4">Tools</h2>

        <ToolsMarquee TOOLS_ONE={TOOLS_ONE} TOOLS_TWO={TOOLS_TWO} />
        </div>
      </div>
  )
}
