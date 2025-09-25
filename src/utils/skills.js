import {
	SiTailwindcss,
	SiFramer,
	SiGreensock,
	SiExpress,
	SiAppwrite,
  SiAdobeillustrator
} from "react-icons/si";
import {
	BiLogoTypescript,
	BiLogoMongodb,
	BiLogoPostgresql,
} from "react-icons/bi";

import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { TbBrandReactNative } from "react-icons/tb";
export const skillsFrontend = [
    {
        text:"HTML",
        icon: FaHtml5,
        color: "text-orange-400"
    },
    {
        text:"CSS",
        icon: FaCss3Alt,
        color: "text-blue-600"
    },
    {
        text:"JavaScript",
        icon: IoLogoJavascript,
        color: "text-yellow-300"
    },
    {
        text:"Tailwind",
        icon: SiTailwindcss,
        color: "text-blue-300"
    },
    {
        text:"ReactJs",
        icon: FaReact,
        color: "text-blue-600"
    },
    {
        text:"TypeScript",
        icon: BiLogoTypescript,
        color: "text-blue-500"
    },{
        text:"GSAP",
        icon: SiGreensock,
        color: "text-green-400"
    },{
        text:"Framer Motion",
        icon: SiFramer,
        color: ""
    }
]

export const skillsBackend = [
    {
        text:"MongoDB",
        icon: BiLogoMongodb,
        color: "text-green-400"
    },
    {
        text:"Express",
        icon: SiExpress,
        color: ""
    },
    {
        text:"NodeJs",
        icon: FaNodeJs,
        color: "text-green-500"
    },
    {
        text:"PostgresSQL",
        icon: BiLogoPostgresql,
        color: "text-blue-400"
    },
    {
        text:"AppWrite",
        icon: SiAppwrite,
        color: "text-red-500"
    }
]

export const skillsOther = [
    {
        text:"Git",
        icon: FaGitAlt,
        color: "text-orange-400"
    },
    {
        text:"Figma",
        icon: FaFigma,
        color: "text-orange-500"
    },
    {
        text:"React Native",
        icon: TbBrandReactNative,
        color: "text-sky-500"
    },
    {
        text:"Adobe Illustrator",
        icon: SiAdobeillustrator,
        color: "text-orange-400"
    }
]