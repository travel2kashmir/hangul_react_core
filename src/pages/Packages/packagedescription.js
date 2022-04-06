import React from 'react'
import Sidebar from '../../components/sidebar'
import Navbar from '../../components/navbar'
import CardPackageDescription from '../../components/Cards/Packages/CardPackageDescription'
import Footer from '../../components/footer'
import { useLocation } from 'react-router-dom'

function Packagedescription() {
  const location=useLocation()
  const package_description=location.state
  return (
    <div>
        <Navbar/>
        <Sidebar/> 
        <div id="main-content" className="bg-gray-50 pt-24 relative overflow-y-auto lg:ml-64">
        <CardPackageDescription package_description={package_description}/>    
  </div> 
  <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64"> 
  <Footer/>
  </div>
    </div>
  )
}

export default Packagedescription