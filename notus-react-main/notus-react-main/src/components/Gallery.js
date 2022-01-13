import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats'
import CardGallery from './Cards/CardGallery'




function Gallery() {
    return (
        <>
       
        <Sidebar/>
        <div style={{paddingLeft:"250px"}}>     
         <HeaderStats/>
         <div style={{padding:"60px",marginTop:"-130px",}}> 
         <CardGallery/> 
             </div>
         </div>

      
</>
    )
}

export default Gallery
