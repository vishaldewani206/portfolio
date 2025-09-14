import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const RootLayout = () => {
  return (
    <div className=''>
        <Navbar />
        <div className="container p-3 md:p-5">
            <Outlet />
        </div>
    </div>
  )
}

export default RootLayout