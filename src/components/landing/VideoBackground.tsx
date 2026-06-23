"use client";


type Props = {
  poster: string;
  source: string;
};

export default function VideoBackground({ poster, source }: Props) {
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      
      <video
        autoPlay
        muted
        loop
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover  `}
        src={source}
      >
        <source  media="/images/video-thumbnail.png"></source>
      </video>

      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}