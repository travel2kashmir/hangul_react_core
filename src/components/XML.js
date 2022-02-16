import React from 'react'
import SidebarPropertyOwner from './Sidebar/SidebarPropertyOwner';
import HeaderStats from './Headers/HeaderStats'
import CardModal from './Cards/CardModal'
import Footer from './Footers/FooterAdmin'

function Services() {
    return (
        <>
       
        <SidebarPropertyOwner/>
        <div className="relative md:ml-64 bg-blueGray-100">
              <HeaderStats/>
              <div className="px-4 md:px-10 mx-auto w-full -m-24"> 
         <CardModal/> 
         <Footer/>
             </div>
         </div>

      
</>
    )
}

export default Services
