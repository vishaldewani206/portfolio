import { Navbar } from "./Navbar"
import VideoBackground from "./VideoBackground"
import { Banner } from "./Banner"
import { Header } from "./Header"

export const Landing = () => {
  

  return (
    <section>
      <Navbar />

      <Header />

      <VideoBackground
      poster="/poster.jpg"
      source={"https://www.pexels.com/download/video/33230270/"}
      />

      <Banner />

      <div className="min-h-[80vh] w-full" />

    </section>
  )
}
