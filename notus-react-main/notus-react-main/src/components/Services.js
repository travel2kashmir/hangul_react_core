import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats'

function Services() {
    return (
        <div>
           <Sidebar/>
           <div style={{paddingLeft:"250px"}}>   
           <HeaderStats/>
           <h1>{'________'}Hi!!! this is services page{'________'}</h1>
           </div>

        </div>
    )
}

export default Services
