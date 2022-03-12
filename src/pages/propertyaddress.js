import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardAddress from '../components/Cards/CardAddress'
import Footer from '../components/footer'

function Propertyaddress() {
  return (
    <div>
    <Navbar/>
    <Sidebar/> 
    <div id="main-content" class="  bg-gray-50 pt-24 relative overflow-y-auto lg:ml-64">
    <CardAddress/>    
</div>

<div id="main-content" class="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64"> 
<Footer/>
</div>
</div>
  )
}

export default Propertyaddress