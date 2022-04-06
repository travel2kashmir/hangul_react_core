import React from 'react'
import Sidebar from '../../components/sidebar'
import Navbar from '../../components/navbar'
import CardPackageServices from '../../components/Cards/Packages/CardPackageServices'
import Footer from '../../components/footer'
import { useLocation } from 'react-router-dom'

function Packageservices() {
  const location=useLocation()
    const package_room_bundle=location.state

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div id="main-content" className="  bg-gray-50 pt-24 relative overflow-y-auto lg:ml-64">
        <CardPackageServices package_room_bundle={package_room_bundle} />
      </div>
      <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64">
        <Footer/>
      </div>
    </div>
  )
}

export default Packageservices