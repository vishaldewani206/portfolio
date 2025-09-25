import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import RootLayout from "./layout/RootLayout"
import Home from "./pages/Home"
import Skills from "./pages/Skills"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />    
  )
}

export default App
