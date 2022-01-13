import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats'
import CardContact from './Cards/CardContact'

function Contact() {
    return (
        <>
       
             <Sidebar/>
             <div style={{paddingLeft:"250px"}}>     
              <HeaderStats/>
              <div style={{padding:"60px",marginTop:"-130px",}}>  
              <CardContact/></div>
              </div>

      
        </>
    );
}

export default Contact
