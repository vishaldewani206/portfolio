import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fixed w-full left-0 top-0 px-4 py-4 backdrop-blur-lg bg-primary/40 text-white shadow-sm z-20">
      <div>Vishal Dewani</div>

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
        <Button variant={"outline"} className="rounded-full text-black py-5 px-5 group" size="lg">
          Download Resume{" "}
          <SquareArrowOutUpRight className="group-hover:scale-110" />
        </Button>
      </div>
    </nav>
  );
};