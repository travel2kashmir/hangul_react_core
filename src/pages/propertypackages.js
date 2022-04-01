import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
//import { Context } from "../context/provider"
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardPackages from '../components/Cards/CardPackages'
import Footer from '../components/footer'

function Propertypackages() {
  const [allpackages, setAllPackages] = useState([])

  useEffect(() => {
    const fetchRooms = async () => {
        try {
            //const url=`/api/package/${data.property_id}`
            const url = 'http://103.136.36.27:7860/package/t2k001'
            const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
            //axios library is used to hit the url which is in 1st argument and headers in 2nd argument,
            //the response from the request is stored in the response variable and response is of the type object
            console.log("response of all rooms" + JSON.stringify(response.data))
            setAllPackages(response.data) //setDash set's value in the state dash
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
                <CardPackages item={allpackages}/>
                </div>
            {/* Footer */}
            <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64">
                <Footer />
            </div>
    </div>
  )
}

export default Propertypackages