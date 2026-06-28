import { ViewAllBlogs } from "@/components/dashboard/ViewAllBlogs"

const Dashboard = () => {
  return (
    <section className="max-w-258 mx-auto w-full p-8">
      <h1 className="text-center text-4xl mb-8 font-bold">Dashboard</h1>
      <ViewAllBlogs />
    </section>
  )
}

export default Dashboard