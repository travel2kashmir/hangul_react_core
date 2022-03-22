import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
//import { Context } from "../context/provider"
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardPackages from '../components/Cards/CardPackages'
import Footer from '../components/footer'

function Propertypackages() {
  return (
    <div>
        {/* Navbar */}
        <Navbar />
             {/* Sidebar */}
            <Sidebar />
            {/* Body */}
            <div id="main-content" className="pt-24 relative overflow-y-auto lg:ml-64">
                <CardPackages/>
                </div>
            {/* Footer */}
            <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64">
                <Footer />
            </div>
    </div>
  )
}

export default Propertypackages