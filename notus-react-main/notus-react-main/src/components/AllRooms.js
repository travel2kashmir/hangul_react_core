import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios' // package installed using npm instal axios,used to perform the http request
import { Context } from "../context/provider"
import SidebarPropertyOwner from './Sidebar/SidebarPropertyOwner';
import HeaderStats from './Headers/HeaderStats';
import RoomTable from './Cards/CardAllRooms';
import Footer from './Footers/FooterAdmin'

function AllRooms() {

    const [data] = useContext(Context)  //local initialisation of context data take argument of context whose values are to be used 
    const [allrooms, setAllRooms] = useState([])//declaration of state and state method initialized with empty array
    console.log("property_id in AllRooms is " + data.property_id)

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                //const url=`/rooms/${data.property_id}`
                const url = '/rooms/t2k004'
                const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
                //axios library is used to hit the url which is in 1st argument and headers in 2nd argument,
                //the response from the request is stored in the response variable and response is of the type object
                console.log("response of all rooms" + JSON.stringify(response.data))
                setAllRooms(response.data) //setDash set's value in the state dash
            }//try blocks try to hit using the axios id it fails error block catches the error 
            catch (error) {
                
                if (error.response) {
                    console.log("data" + JSON.stringify(error.response));
                    console.log("status" + JSON.stringify(error.response.status));
                    console.log("header" + JSON.stringify(error.response.headers));
                } //this block catches the errors from the server with in range of 400's 
                else {
                    console.log("error" + JSON.stringify(error.message));
                }//this block catches the errors other than those in range of 400's
            }

        }
        fetchRooms();
    }
        , [])




    return (
        <>
           <SidebarPropertyOwner />
            <div className="relative md:ml-64 bg-blueGray-100">
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <RoomTable item={allrooms} />
                    <Footer />
                </div>
            </div>


        </>
    )
}

export default AllRooms
