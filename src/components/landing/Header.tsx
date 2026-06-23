import { ArrowRight } from "lucide-react"

export const Header = () => {

  const SKILLS = ["TypeScript & Next.js", "Node.JS", "MongoDB & PostgreSQL", "AI Integration"]

  return (
    <div className='bg-primary text-white p-8 relative z-10 rounded-b-2xl'>
      <h1 className='text-[clamp(3rem,14vw,17rem)] whitespace-nowrap font-heading text-center font-medium'>
        Vishal Dewani
      </h1>
      <div className='flex justify-between px-8 text-gray-200'>
        <div className='w-1/3'>
          <h2 className='text-2xl font-medium'>Software Engineer</h2>
        </div>

        <div className='w-1/3'>
          <ul className='text-xl space-y-3'>
            {SKILLS.map((e: string) => (
              <li key={e} className='flex'>
                <ArrowRight /> <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='w-1/3 text-xl space-y-4'>
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
        <div></div>
      </div>
    </div>
  );
};
