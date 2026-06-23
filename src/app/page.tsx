import { Certificates } from "@/components/certs/Certificates";
import { Landing } from "@/components/landing/Landing";
import { Projects } from "@/components/projects/Projects";
import { Tools } from "@/components/tools/Tools";

export default function Home() {
  return (
    <main className="overflow-x-hidden ">
      <Landing />
      <Tools />
      <Projects />
      <Certificates />
    </main>
  );
}
