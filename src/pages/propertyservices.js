import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardServices from '../components/Cards/CardServices'
import Footer from '../components/footer'

function propertyservices() {
  return (
    <div>
    <Navbar/>
    <Sidebar/> 
    <div id="main-content" class="pt-24 relative overflow-y-auto lg:ml-64">
    <CardServices/>    
</div>
<div id="main-content" class="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64"> 
<Footer/>
</div>
</div>
  )
}

export default propertyservices