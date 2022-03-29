import React from 'react'
import Sidebar from '../../components/sidebar'
import Navbar from '../../components/navbar'
import CardPackageRoomBundles from '../../components/Cards/Packages/CardRoomBundle'
import Footer from '../../components/footer'
import { useLocation } from 'react-router-dom'

function Packageroombundle() {
  const location=useLocation()
    const package_room =location.state
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div id="main-content" className="  bg-gray-50 pt-24 relative overflow-y-auto lg:ml-64">
        <CardPackageRoomBundles package_room={package_room}/>
      </div>
      <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64">
        <Footer />
      </div>
    </div>
  )
}

export default Packageroombundle