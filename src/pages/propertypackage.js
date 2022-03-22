import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
//import { Context } from "../context/provider"
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardPackage from '../components/Cards/CardPackage'
import Footer from '../components/footer'

function Propertypackage() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
             {/* Sidebar */}
            <Sidebar />
            {/* Body */}
            <div>
                <CardPackage/>
                </div>
            {/* Footer */}
            <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64">
                <Footer />
            </div>
    </div>
  )
}

export default Propertypackage