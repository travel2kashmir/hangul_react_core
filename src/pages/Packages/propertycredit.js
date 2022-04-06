import React from 'react'
import Sidebar from '../../components/sidebar'
import Navbar from '../../components/navbar'
import CardPropertyCredit from '../../components/Cards/Packages/CardPropertyCredit'
import Footer from '../../components/footer'
import { useLocation } from 'react-router-dom'

function Propertycredit() {
  const location=useLocation()
  const package_property_credit=location.state
  return (
    <div>
    <Navbar/>
  <Sidebar/> 
  <div id="main-content" className="  bg-gray-50 pt-24 relative overflow-y-auto lg:ml-64">
  <CardPropertyCredit package_property_credit={package_property_credit.id}/>    
</div> 
<div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64"> 
<Footer/>
</div>
</div>
  )
}

export default Propertycredit