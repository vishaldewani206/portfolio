import { Nav } from "@/components/blog/Nav"

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className="md:w-[60%] max-w-258 mx-auto p-8">
      <Nav />
      {children}
    </section>
  )
}

export default layout