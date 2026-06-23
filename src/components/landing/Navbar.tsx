import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fixed w-1/2  left-1/2 -translate-x-1/2 top-0 px-8 py-6 backdrop-blur-md mt-2 bg-black/20 text-white shadow-sm z-20 rounded-full ">
      <div>
        <Image src="/images/logo.png" width={40} height={40} alt="logo"
          className="border rounded-full p-2 w-12 h-12 bg-white"
         />
      </div>

      <ul className="flex gap-4">
        <li>
          <Link href="#home">Home</Link>
        </li>
        <li>
          <Link href="#projects">Projects</Link>
        </li>
        <li>
          <Link href="#about">About Me</Link>
        </li>
        <li>
          <Link href="#certificates">Certificates</Link>
        </li>
        <li>
          <Link className="border-b-2 border-primary" href="#blog">
            Blog
          </Link>
        </li>
      </ul>

      <div>
        <Button  className="rounded-full  py-5 px-5 group" size="lg">
          Download Resume{" "}
          <SquareArrowOutUpRight className="group-hover:scale-110" />
        </Button>
      </div>
    </nav>
  );
};