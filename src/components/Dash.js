import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Context } from "../context/provider"
import Nav from './Navbars/LeftNavbar'
import Frame1 from './Frame1'
import Frame2 from './Frame2'
import Frame3 from './Frame3'
import Frame4 from './Frame4'

function Dash() {
    const [data] = useContext(Context)
    const [dash, setDash] = useState([])
    console.log("property_id in Dashboard is " + data.property_id)
    
    useEffect(() => {
        const fetchDash = async () => {
            try {
                const response = await axios.get(`http://34.125.133.100:5555/dashboard/${data.property_id}`, { headers: { 'accept': 'application/json' } });
                console.log(response.data)

                setDash(response.data)
            }
            catch (error) {
                if (error.response) {
                    console.log("data" + error.response);
                    console.log("status" + error.response.status);
                    console.log("header" + error.response.headers);
                } else {
                    console.log("error" + error.message);
                }
            }

        }


        fetchDash();


    }



        , [])


    return (
        <div>
            <Nav />
            <h3 style={{marginLeft:"360px",marginTop:"120px",fontFamily:"cursive",marginBottom:"30px"}}>Welcome to {data.property_name}</h3>
            <div style={{marginLeft:"380px"}} className="row">
               <div style={{border:"2px solid orange",borderRadius:"8px",fontFamily:"cursive",
               backgroundColor:"rgb(122, 143, 242)",height:"230px",width:"300px"}} className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                   <h4>Services</h4>{dash?.services?<Frame1 services={dash.services} />:<div></div>}</div>
                   <div className="col-md-2 col-sm-2 col-xs-2 col-lg-2"></div>
                <div style={{border:"2px solid #5968ad",borderRadius:"8px",fontFamily:"cursive",backgroundColor:"#f2b544",height:"230px",marginBottom:"50px",width:"300px"}}  className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                <h4>Reviews</h4> {dash?.reviews?<Frame2 reviews={dash.reviews} />:<div></div>}</div>
                    
                <div style={{border:"2px solid #5968ad",borderRadius:"8px",fontFamily:"cursive",backgroundColor:"#f2b544",height:"130px",width:"300px"}}   className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                {dash?.review_stats?<Frame3 review_stats={dash.review_stats} />:<div></div>}</div>

                    <div className="col-md-2 col-sm-2 col-xs-2 col-lg-2"></div>
                <div style={{border:"2px solid orange",borderRadius:"8px",fontFamily:"cursive",backgroundColor:"rgb(122, 143, 242)",height:"130px",width:"300px"}}   className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                    {dash?.room_count?<Frame4 room_count={dash.room_count} />:<div></div>}</div>
                
            </div>
        </div>
    )
}

export default Dash
