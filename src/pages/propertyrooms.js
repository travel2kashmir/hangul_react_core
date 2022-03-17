import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
//import { Context } from "../context/provider"
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardRooms from '../components/Cards/CardRooms'
import Footer from '../components/footer'

function Propertyrooms() {
    //const [data] = useContext(Context)
    const [allrooms, setAllRooms] = useState([])

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                //const url=`/rooms/${data.property_id}`
                const url = '/rooms/t2k001'
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
        <div>
             {/* Navbar */}
            <Navbar />
             {/* Sidebar */}
            <Sidebar />
            {/* Body */}
            <div id="main-content" className="pt-24 relative overflow-y-auto lg:ml-64">
                <CardRooms  item={allrooms}/>
                </div>
            {/* Footer */}
            <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64">
                <Footer />
            </div>
        </div>
    )
}

export default Propertyrooms