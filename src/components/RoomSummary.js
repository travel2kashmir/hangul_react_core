import React from 'react'
import SidebarPropertyOwner from './Sidebar/SidebarPropertyOwner';
import HeaderStats from './Headers/HeaderStats';
import RoomSummaryTab from './Tabs/RoomSummaryTab';
import Footer from './Footers/FooterAdmin';
import {
  useLocation
} from "react-router-dom";

function RoomSummary() {
  const location = useLocation()
  const { id } = location.state
  console.log("id in state" + id)
  return (

    <>

      <SidebarPropertyOwner />
      <div className="relative md:ml-64 bg-blueGray-100">
        <HeaderStats />
         
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
        
          <RoomSummaryTab id={id} />
         
          <Footer />
        </div>
      </div>


    </>
  )
}

export default RoomSummary
