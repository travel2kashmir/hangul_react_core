import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardRoomXML from '../components/Cards/CardRoomXML'
import Footer from '../components/footer'
import { useLocation } from 'react-router-dom'

function Propertyroomxml() {
    const location=useLocation()
    const room_id=location.state
  return (
        <div>
            <Navbar />
            <Sidebar />
            <div id="main-content" className=" bg-gray-50 pt-24 relative overflow-y-auto lg:ml-64">
             <CardRoomXML room_id={room_id}/>
            </div>
            <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64">
                <Footer />
            </div>
            </div>
    )
}

 

export default Propertyroomxml