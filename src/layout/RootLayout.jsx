import { Outlet, useLocation } from 'react-router'
import Navbar from '../components/Navbar'
import { AnimatePresence } from "framer-motion"

const RootLayout = () => {
    const location = useLocation();

  return (
    <div className=''>
        <Navbar />
        <div className="container p-3 md:p-5">
          <AnimatePresence mode='wait'>
            <Outlet key={location} />
          </AnimatePresence>
        </div>
    </div>
  )
}

export default RootLayout