import { timeAgo } from "@/lib/format-date";
import Image from "next/image";

type Props = {
  name: string;
  image: string;
  date: Date;
  comment: string
}

export const Comment = ({name, image, date= new Date(), comment}: Props) => {
  return (
    <div className='p-4 border rounded-2xl'>
      <div className='flex items-center gap-2 font-medium mb-2'>
        <Image src={image} alt="profile image" width={100} height={100} className='w-8 h-8 bg-red-400 rounded-full' />
        <div>
          <p>{name}</p>
          <p className='text-gray-500 text-sm font-light'>{timeAgo(date)}</p>
        </div>
      </div>

      <p>{comment}</p>
    </div>
  )
}
