import React from 'react'
import Sidebar from '../../components/sidebar'
import Navbar from '../../components/navbar'
import CardPackageMiles from '../../components/Cards/Packages/CardPackageMiles'
import Footer from '../../components/footer'
import { useLocation } from 'react-router-dom'

function Packagedescription() {
  const location=useLocation()
  const package_miles=location.state
  console.log(JSON.stringify(location.state))
  return (
    <div>
        <Navbar/>
        <Sidebar/> 
        <div id="main-content" className="  bg-gray-50 pt-24 relative overflow-y-auto lg:ml-64">
        <CardPackageMiles package_miles={package_miles.id.package_miles}/>    
  </div> 
  <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64"> 
  <Footer/>
  </div>
    </div>
  )
}

export default Packagedescription