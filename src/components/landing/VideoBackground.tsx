"use client";

import Image from "next/image";


type Props = {
  poster: string;
  source: string;
};

export default function VideoBackground({ poster, source }: Props) {
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      
      <Image src="/images/main.png" className="object-cover" alt="main" width={1900} height={1080}  />


      <div className="absolute inset-0 bg-blue-800/20" />
    </div>
  );
}