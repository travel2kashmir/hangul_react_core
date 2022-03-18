import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardRoom from '../components/Cards/CardRoom'
import Footer from '../components/footer'
import { useLocation } from 'react-router-dom'


function Propertyroom() {
    const location=useLocation()
    const room_id=location.state
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div id="main-content" className="pt-24 bg-gray-50 relative overflow-y-auto lg:ml-64">
            <CardRoom room_id={room_id}/></div>
            <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64">
                <Footer />
            </div>
        </div>
    )
}

export default Propertyroom