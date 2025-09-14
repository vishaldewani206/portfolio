import { Outlet, useLocation } from 'react-router'
import Navbar from '../components/Navbar'
import { AnimatePresence } from "framer-motion"
import GrowingCircleCanvas from "../components/GrowingCircleCanvas"
import { useState } from 'react'
import {getInitialTheme} from "../utils/Storage.js"

const RootLayout = () => {
    const location = useLocation();
    const [isDark, setIsDark] = useState(getInitialTheme());
        const [isLoad, setIsLoad] = useState(false)

  return (
    <div className={`w-full flex flex-col  ${isLoad && "transition-colors duration-500 delay-300"}`}>
      <GrowingCircleCanvas isLoad={isLoad} isDark={isDark} />

        <Navbar isDark={isDark} setIsDark={setIsDark} isLoad={isLoad} setIsLoad={setIsLoad} />
        <div className="lg:container p-3 md:p-5 m-auto ">
          <AnimatePresence mode='wait'>
            <Outlet key={location} />
          </AnimatePresence>
        </div>
    </div>
  )
}

export default RootLayout