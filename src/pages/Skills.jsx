import React from "react";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { TbBrandReactNative } from "react-icons/tb";


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


import SkillsCapsule from "../components/SkillsCapsule";

const Skills = () => {
	return (
		<div className="text-center flex flex-col justify-center">
			<h1 className="text-center text-5xl font-medium font-heading text-primary">
				My Skills
			</h1>

			<h2 className="mt-5 text-3xl">FullStack Development</h2>

			<div className="flex md:flex-row flex-col mt-4 gap-4">
				<div className="flex-1 border border-primary rounded-xl p-3">
					<h3 className="text-white text-2xl font-medium mb-3">
						Frontend Development
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
						<SkillsCapsule
							text={"HTML"}
							Icon={FaHtml5}
							color={"text-orange-400"}
						/>
						<SkillsCapsule
							text={"CSS"}
							Icon={FaCss3Alt}
							color={"text-blue-600"}
						/>
						<SkillsCapsule
							text={"JavaScript"}
							Icon={IoLogoJavascript}
							color={"text-yellow-300"}
						/>
						<SkillsCapsule
							text={"Tailwind"}
							Icon={SiTailwindcss}
							color={"text-blue-300"}
						/>
						<SkillsCapsule
							text={"ReactJs"}
							Icon={FaReact}
							color={"text-blue-400"}
						/>
						<SkillsCapsule
							text={"TypeScript"}
							Icon={BiLogoTypescript}
							color={"text-blue-500"}
						/>
						<SkillsCapsule
							text={"GSAP"}
							Icon={SiGreensock}
							color={"text-green-400 "}
						/>
						<SkillsCapsule text={"Framer Motion"} Icon={SiFramer} />
					</div>
				</div>
				<div className="flex-1 border border-primary rounded-xl p-3">
					<h3 className="text-white text-2xl font-medium mb-3">
						Backend Development
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
						<SkillsCapsule
							text={"MongoDB"}
							Icon={BiLogoMongodb}
							color={"text-green-400"}
						/>
						<SkillsCapsule text={"Express"} Icon={SiExpress} />
						<SkillsCapsule
							text={"NodeJs"}
							Icon={FaNodeJs}
							color={"text-green-500"}
						/>
						<SkillsCapsule
							text={"PostgresSQL"}
							Icon={BiLogoPostgresql}
							color={"text-blue-400"}
						/>
						<SkillsCapsule
							text={"AppWrite"}
							Icon={SiAppwrite}
							color={"text-red-500"}
						/>
					</div>
				</div>

			</div>


      <div className="mt-4">
					<h3 className="text-white text-2xl font-medium mb-3">
						Other Skills
					</h3>
        <div className="flex-1 border border-primary rounded-xl p-3">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
						<SkillsCapsule
							text={"Git"}
							Icon={FaGitAlt}
							color={"text-orange-400"}
						/>
						<SkillsCapsule text={"Github"} Icon={FaGithub} />
						<SkillsCapsule
							text={"Figma"}
							Icon={FaFigma}
							color={"text-orange-500"}
						/>
						<SkillsCapsule
							text={"React Native"}
							Icon={TbBrandReactNative}
							color={"text-sky-500"}
						/>
						<SkillsCapsule
							text={"Adobe Illustrator"}
							Icon={SiAdobeillustrator}
							color={"text-orange-400"}
						/>
					</div>
          </div>
      </div>
		</div>
	);
};

export default Skills;
