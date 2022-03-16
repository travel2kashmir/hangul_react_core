import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardAddImage from '../components/Cards/CardAddImage'
import Footer from '../components/footer'

function Propertyaddroom() {
  return (
    <div>
     <Navbar/>
    <Sidebar/> 
    <div id="main-content" class="  bg-gray-50 pt-24 relative overflow-y-auto lg:ml-64">
    <CardAddImage/>    
</div>

<div id="main-content" class="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64"> 
<Footer/>
</div>
    </div>
  )
}

export default Propertyaddroom