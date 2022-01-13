import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats'
import CardReviews from './Cards/CardReviews'



function Reviews() {
    return (
        <> 
        <Sidebar/>
        <div style={{paddingLeft:"250px"}}>     
         <HeaderStats/>
         <div style={{padding:"60px",marginTop:"-130px",}}> 
         <CardReviews/> 
             </div>
         </div>

      
</>
    )
}

export default Reviews
