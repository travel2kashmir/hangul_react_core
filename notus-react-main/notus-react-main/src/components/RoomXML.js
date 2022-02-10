import React from 'react'
import SidebarPropertyOwner from './Sidebar/SidebarPropertyOwner';
import HeaderStats from './Headers/HeaderStats';
import Footer from './Footers/FooterAdmin';
import RoomCardModal from './Cards/CardModalRoom'
import {
    useLocation, Link
  } from "react-router-dom";

function RoomXML() {
    const location = useLocation()
    const { id } = location.state
    console.log("id in state" + id)
    return (
        <>
       
        <SidebarPropertyOwner/>
        <div className="relative md:ml-64 bg-blueGray-100">
              <HeaderStats/>
              <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <Link to='/all-rooms-xml'>
          <div className="text-center flex justify-start mb-2" >
         
         <button
             className="bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> Back</button>

           </div>
            </Link>
              <RoomCardModal id={id} />
         <Footer/>
             </div>
         </div>
         </>
    )
}

export default RoomXML
