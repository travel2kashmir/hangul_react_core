import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats'
import CardModal from './Cards/CardModal'

function Services() {
    return (
        <>
       
        <Sidebar/>
        <div style={{paddingLeft:"250px"}}>     
         <HeaderStats/>
         <div style={{padding:"60px",marginTop:"-130px"}}> 
         <CardModal/> 
             </div>
         </div>

      
</>
    )
}

export default Services
