import React, { useState } from 'react'
import Roomdes from './Roomdes'
import Roomfacilities from './Roomfacilities'
import Roomtypes from './Roomtypes'
import Roomimages from './Roomimages'
import RoomStore from '../context/roomprovider'
import GetRoom from './GetRoom'
import LeftNavbarRoom from "./Navbars/LeftNavbarRoom";

function Rooms() {
    const [roomDescription, setRoomdescription] = useState([])
    return (
        <div>
            <RoomStore>
            <LeftNavbarRoom/>
                <Roomtypes setRoomDescription={(a) => setRoomdescription(a)} />
                {roomDescription?.length > 0 && <><Roomdes roomDescription={roomDescription} />
                    <Roomimages />
                    <Roomfacilities /></>}
                    <GetRoom/> 
            </RoomStore>
        </div>
    )
}

export default Rooms
