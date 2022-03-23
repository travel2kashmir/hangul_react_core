import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
//import { Context } from "../context/provider"
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardPackage from '../components/Cards/CardPackage'
import Footer from '../components/footer'
import { useLocation } from 'react-router-dom'

function Propertypackage() {
  const location=useLocation()
    const package_id=location.state
  return (
    <div>
      {/* Navbar */}
      <Navbar />
             {/* Sidebar */}
            <Sidebar />
            {/* Body */}
            <div>
                <CardPackage package_id={package_id}/>
                </div>
            {/* Footer */}
            <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64">
                <Footer />
            </div>
    </div>
  )
}

export default Propertypackage