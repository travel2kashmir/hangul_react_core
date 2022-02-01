import SidebarPropertyOwner from './Sidebar/SidebarPropertyOwner';
import HeaderStats from './Headers/HeaderStats'
import CardSocialTraffic from './Cards/CardSocialTraffic'
import CardPageVisits from './Cards/CardPageVisits';
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios' // package installed using npm instal axios,used to perform the http request
import { Context } from "../context/provider"
import Footer from './Footers/FooterAdmin'


export default function Dashboard() {
  const [data] = useContext(Context)  //local initialisation of context data take argument of context whose values are to be used 
  const [dash, setDash] = useState([])//declaration of state and state method initialized with empty array
  console.log("property_id in Dashboard is " + data.property_id)

  //useEffect is a react hook which perform operation on some particular event.
  // Here we used empty array as an initiator i.e. this useEffect will start as soon as this component loads
    useEffect(() => {
      const fetchDash = async () => {
          try {
             //const url=`http://103.136.36.27:5555/dashboard/${data.property_id}`
              const url='http://103.136.36.27:5555/dashboard/t2k001'
              const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
              //axios library is used to hit the url which is in 1st argument and headers in 2nd argument,
              //the response from the request is stored in the response variable and response is of the type object
              console.log("response of dash"+JSON.stringify(response.data))
              setDash(response.data) //setDash set's value in the state dash
          }//try blocks try to hit using the axios id it fails error block catches the error 
          catch (error) {
            alert(JSON.stringify(error))
              if (error.response) {
                  console.log("data" + error.response);
                  console.log("status" + error.response.status);
                  console.log("header" + error.response.headers);
              } //this block catches the errors from the server with in range of 400's 
              else {
                  console.log("error" + error.message);
              }//this block catches the errors other than those in range of 400's
          }

      }
      fetchDash();
  }
      , [])

      
     
      return (
          <div>
            
          <SidebarPropertyOwner/>
    
    <div className="relative md:ml-64 bg-blueGray-100">  
     
     <HeaderStats />    

      <div className="flex flex-wrap mt-4" >
    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardPageVisits item={dash?.reviews}/>
      </div>
      <div className="w-full xl:w-4/12 px-4">
        <CardSocialTraffic item={dash?.services}/>
      
      </div>
     
    </div>
    <Footer/>
    </div>
    </div>
      );
      
}




