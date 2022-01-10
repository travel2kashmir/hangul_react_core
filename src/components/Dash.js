import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios' // package installed using npm instal axios,used to perform the http request
import { Context } from "../context/provider" //imports context to be used 
import Nav from './Navbars/LeftNavbar'
import Frame1 from './Frame1'
import Frame2 from './Frame2'
import Frame3 from './Frame3'
import Frame4 from './Frame4'

function Dash() {  //function to be returned 
    const [data] = useContext(Context)  //local initialisation of context data take argument of context whose values are to be used 
    const [dash, setDash] = useState([])//declaration of state and state method initialized with empty array
    console.log("property_id in Dashboard is " + data.property_id)
    //useEffect is a react hook which perform operation on some particular event.
    // Here we used empty array as an initiator i.e. this useEffect will start as soon as this component loads

    useEffect(() => {
        const fetchDash = async () => {
            try {
                const response = await axios.get(`http://34.125.133.100:5555/dashboard/${data.property_id}`, { headers: { 'accept': 'application/json' } });
                //axios library is used to hit the url which is in 1st argument and headers in 2nd argument,
                //the response from the request is stored in the response variable and response is of the type object
                console.log(response.data)
                setDash(response.data) //setDash set's value in the state dash
            }//try blocks try to hit using the axios id it fails error block catches the error 
            catch (error) {
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
         //the condition is set to [] such that useEffect executes as soon as component is called 

    // return statement return the jsx code which will be dispplayed by the browser
    //the return statement can return only 1 element thus everything needed to be encapsulatd within 1 element only in our case it is <div>
    return (
        <div>
            <Nav />
            <h3 style={{ marginLeft: "360px", marginTop: "120px", fontFamily: "cursive", marginBottom: "30px" }}>Welcome to {data.property_name}</h3>
            <div style={{ marginLeft: "380px" }} className="row">
                <div style={{
                    border: "2px solid orange", borderRadius: "8px", fontFamily: "cursive",
                    backgroundColor: "rgb(122, 143, 242)", height: "230px", width: "300px"
                }} className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                    <h4>Services</h4>{dash?.services ? <Frame1 services={dash.services} /> : <div></div>}</div>
                <div className="col-md-2 col-sm-2 col-xs-2 col-lg-2"></div>
                <div style={{ border: "2px solid #5968ad", borderRadius: "8px", fontFamily: "cursive", backgroundColor: "#f2b544", height: "230px", marginBottom: "50px", width: "300px" }} className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                    <h4>Reviews</h4> {dash?.reviews ? <Frame2 reviews={dash.reviews} /> : <div></div>}</div>

                <div style={{ border: "2px solid #5968ad", borderRadius: "8px", fontFamily: "cursive", backgroundColor: "#f2b544", height: "130px", width: "300px" }} className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                    {dash?.review_stats ? <Frame3 review_stats={dash.review_stats} /> : <div></div>}</div>

                <div className="col-md-2 col-sm-2 col-xs-2 col-lg-2"></div>
                <div style={{ border: "2px solid orange", borderRadius: "8px", fontFamily: "cursive", backgroundColor: "rgb(122, 143, 242)", height: "130px", width: "300px" }} className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                    {dash?.room_count ? <Frame4 room_count={dash.room_count} /> : <div></div>}</div>
                {/*in line no 63,59.56 & 53 the components are called and provided props to be used in execution */}
            </div>
        </div>
    )
}

export default Dash
