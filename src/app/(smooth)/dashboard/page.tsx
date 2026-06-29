import { ViewAllBlogs } from "@/components/dashboard/ViewAllBlogs"
import { ViewAllComments } from "@/components/dashboard/ViewComments"

const Dashboard = () => {
  return (
    <section className="max-w-258 mx-auto w-full p-8">
      <h1 className="text-center text-4xl mb-8 font-bold">Dashboard</h1>
      <div className="space-y-8">
        <ViewAllBlogs />
        <ViewAllComments />
      </div>
    </section>
  )
}

export default Dashboard