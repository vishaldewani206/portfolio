import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Home from "./pages/Home"
import Skills from "./pages/Skills"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/skills" element={<Skills />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />    
  )
}

export default App
