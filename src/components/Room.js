import React, { useState } from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats'
import Footer from './Footers/FooterAdmin'
import RoomTypes from './RoomTypes'
import RoomStore from '../context/roomprovider'
import CardRoomDetails from './Cards/CardRoomDetails'


function Room() {
    const [roomDescription, setRoomdescription] = useState([])
    return (
        <div>
            <RoomStore>
                <Sidebar />
                <div className="relative md:ml-64 bg-blueGray-100">
                    <HeaderStats />

                    <RoomTypes setRoomDescription={(a) => setRoomdescription(a)} />
                    {roomDescription?.length > 0 && <>
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <CardRoomDetails roomDescription={roomDescription}/> 
                   </div>
                    </>}
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Footer />
                    </div>
                </div>
            </RoomStore>
        </div>
    )
}

export default Room
