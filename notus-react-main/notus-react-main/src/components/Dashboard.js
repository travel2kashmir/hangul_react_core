import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats'
import CardSocialTraffic from './Cards/CardSocialTraffic'
import CardPageVisits from './Cards/CardPageVisits';



export default function Dashboard() {
  return (
    <>
    
      <Sidebar/>

      <div style={{paddingLeft:"250px"}}>     
      <HeaderStats/>

      <div className="flex flex-wrap mt-4" style={{marginTop:"-50px"}}>
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
      
      </div>
    </>
  );
}




