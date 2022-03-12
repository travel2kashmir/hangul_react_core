import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardContact from '../components/Cards/CardContact'
import Footer from '../components/footer'
function Propertycontact() {
  return (
    <div>
    <Navbar/>
    <Sidebar/> 
    <div id="main-content" class="pt-24 relative overflow-y-auto lg:ml-64">
    <CardContact/>    
</div>
<div id="main-content" class="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64"> 
<Footer/>
</div>
</div>
  )
}

export default Propertycontact