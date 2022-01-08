import React, { useState } from 'react'
import Roomdes from './Roomdes'
import Roomfacilities from './Roomfacilities'
import Roomtypes from './Roomtypes'
import Roomimages from './Roomimages'
import RoomStore from '../context/roomprovider'

function Rooms() {
    const [roomDescription, setRoomdescription] = useState([])
    return (
        <div>
            <RoomStore>
                <Roomtypes setRoomDescription={(a) => setRoomdescription(a)} />
                {roomDescription?.length > 0 && <><Roomdes roomDescription={roomDescription} />
                    <Roomimages />
                    <Roomfacilities /></>}
            </RoomStore>
        </div>
    )
}

export default Rooms
