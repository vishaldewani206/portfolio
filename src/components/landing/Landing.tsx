import { Navbar } from "./Navbar"
import VideoBackground from "./VideoBackground"
import { Banner } from "./Banner"
import { Header } from "./Header"

export const Landing = () => {
  const TOOLS_ONE = [
    {
      name: "HTML",
      image: "/images/"
    }
  ]

  return (
    <div>
      <Navbar />

      <Header />


        <VideoBackground
        poster="/poster.jpg"
        source={"https://www.pexels.com/download/video/33230270/"}
      />

        <Banner />
      <div className="min-h-[80vh] w-full">
      </div>

      <div className="w-full bg-white min-h-[40vh] relative rounded-t-2xl p-8">
        <h2 className="text-2xl ">Tools</h2>
        <div>
          <div>

          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}
