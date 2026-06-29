import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  XShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
} from 'react-share';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Share2 } from 'lucide-react';

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size={"lg"}>
          <Share2 />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
          <h2 className='text-center text-2xl font-heading'>Share with the world</h2>
        <div className='flex gap-3 justify-center'>
          <FacebookShareButton className='hover:scale-105' url={url}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <XShareButton className='hover:scale-105' url={url} title={title}>
            <XIcon size={40} round />
          </XShareButton>

          <LinkedinShareButton className='hover:scale-105' url={url}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>

          <WhatsappShareButton className='hover:scale-105' url={url} title={title}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}
