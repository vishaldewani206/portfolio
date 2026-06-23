"use client"
import { ArrowRight } from "lucide-react"

export const Header = () => {

  const SKILLS = ["TypeScript & Next.js", "Node.JS", "PostgreSQL & MongoDB", "AI Integration"]

  

  return (
    <div className='bg-primary header text-white md:p-8 px-4 pb-12 relative z-10 rounded-b-2xl pt-28! md:pt-17!'>
      <div className="overflow-hidden ">
        <h1 className="text-[clamp(2.5rem,13vw,17rem)] whitespace-nowrap font-heading text-center font-medium heading">
          Vishal Dewani
        </h1>
      </div>
      <div className="overflow-hidden">
        <div className='flex flex-wrap justify-between  text-gray-300 bio'>
          <div className='grow max-w-120 mb-6 lg:mb-0'>
            <h2 className='text-3xl font-bold text-secondary font-heading'>Software Engineer</h2>
          </div>

          <div className="flex justify-between gap-6 flex-wrap grow">
            <div className='grow max-w-120'>
              <ul className='text-xl space-y-3'>
                {SKILLS.map((e: string) => (
                  <li key={e} className='flex'>
                    <ArrowRight /> <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='grow max-w-120 text-xl space-y-4 hidden md:block'>
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
          </div>
        </div>

      </div>
    </div>
  );
};
