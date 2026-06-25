"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SquareArrowOutUpRight } from 'lucide-react'
import Image from 'next/image'

export const Certificates = () => {
  // https://badgr.com/public/assertions/Nu5zVqT7RYmDvfkiPLIYCw
  const CERTS = [
    {
      image:"/images/cs50.png",
      link: "https://certificates.cs50.io/67833a32-e96c-4acf-85cc-136f005d7431.pdf?size=letter", 
    },
    {
      image:"/images/google-ai.png",
      link: "https://www.coursera.org/account/accomplishments/specialization/610T684VV3I8", 
    },
    {
      image:"/images/github-foundations.jpg",
      link: "https://learn.microsoft.com/api/achievements/share/en-us/VishalDewani-1565/WMFJ3SSN?sharingId=7D98122167881725", 
    },
    {
      image:"/images/react-basics.png",
      link: "https://coursera.org/share/2e073150b3eb51d41a10dd4b7b60b8e5", 
    },
    {
      image:"/images/version-control.png",
      link: "https://coursera.org/share/e30faad3fc8ba61e96096ab854d2bd3c", 
    },
    {
      image:"/images/javascript.png",
      link: "https://coursera.org/share/a1bd84528b293648494b89577ad26d51", 
    },
    {
      image:"/images/responsive-design.png",
      link: "https://coursera.org/share/5fda2dc3599f7de3f1587fc9065591cd", 
    },
    {
      image: "/images/html-depth.png",
      link: "https://coursera.org/share/a0f2e71ce684e1ad6a75ca6cae4b0437", 
    }
    ]


  

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".cert").forEach((cert) => {
      gsap.from(cert, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: cert,
          start: "top 85%",
        },
      });
    });
}, []);

  return (
    <div id='certificates' className='relative bg-white py-20'>
      <div className='md:w-[70%] w-[90%] mx-auto'>
        <h2 className='md:text-4xl text-3xl font-heading'>Certificates And Other Achievements</h2>

      <div className='flex gap-8 flex-wrap justify-between mt-8'>
        {CERTS.map((e)=>(
          <a href={e.link} target='_blank' rel='noopener noreferrer' key={e.link} className='cert relative group cursor-pointer'>
            <SquareArrowOutUpRight className='absolute md:top-1/2 md:left-1/2 right-2 top-2 md:-translate-x-1/2 md:-translate-y-1/2 group-hover:opacity-100 md:opacity-0 opacity-100 transition-opacity duration-500 delay-100' />
            <Image src={e.image} className='' loading='lazy' alt='certificate' width={600} height={600} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-500" />
          </a>
        ))}
      </div>
      </div>
    </div>
  )
}
