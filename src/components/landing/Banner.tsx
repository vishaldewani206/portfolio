import Image from "next/image"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export const Banner = () => {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md flex p-4 rounded-sm min-w-110 justify-between">
      <div className="flex">
        <div className="overflow-hidden rounded-sm">
          <Image
            className="object-cover object-center w-20 h-20 transition-transform duration-500 ease-out scale-110 hover:scale-100"
            src="/images/profile-pic.jpeg"
            alt="profile photo"
            width={100}
            height={100}
          />
        </div>
        <div className="ml-4 flex flex-col justify-between text-white">
          <p className="text-slate-300 text-sm">Let&apos;s Talk</p>
          <p>
            Vishal Dewani <br/>
            <span className="text-slate-300 text-sm">Software Engineer</span>
          </p>
        </div>
      </div>
      <Button className="h-20 px-4 group"><ArrowRight className="group-hover:-rotate-z-45 transition-transform"/></Button>
    </div>
  )
}
