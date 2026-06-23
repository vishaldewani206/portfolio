import { Landing } from "@/components/landing/Landing";
import { Projects } from "@/components/projects/Projects";
import { Tools } from "@/components/tools/Tools";

export default function Home() {
  return (
    <main className="overflow-x-hidden ">
      <Landing />
      <Tools />
      <Projects />
    </main>
  );
}
