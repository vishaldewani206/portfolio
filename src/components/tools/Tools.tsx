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
        <div className="md:w-[70%] mx-auto">
          <div className=' text-xl space-y-4 md:hidden block text-gray-700'>
            <p>
              Backend-focused software engineer building full-stack products with
              TypeScript, Next.js, and Node.js. Experienced in delivering client
              projects with 12+ completed on Fiverr.
            </p>
            <p>
              Currently deepening expertise in backend systems, PostgreSQL, and AI
              integration while pursuing a Software Engineering degree at Mehran
              University.
            </p>
          </div>


          <h2 className="text-3xl mb-4 mt-8 md:mt-0 font-heading">Tools</h2>

          <ToolsMarquee TOOLS_ONE={TOOLS_ONE} TOOLS_TWO={TOOLS_TWO} />
        </div>
      </div>
  )
}
