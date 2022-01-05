import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Context } from "./context/provider"
import Nav from './Nav'
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
            <div className="container-fluid row black_border_new1">
                <p>Welcome to {data.property_name.toUpperCase()}</p>
                <div>{dash?.services?<Frame1 services={dash.services} />:<div></div>}</div>
                <div>{dash?.reviews?<Frame2 reviews={dash.reviews} />:<div></div>}</div>
                <div>{dash?.review_stats?<Frame3 review_stats={dash.review_stats} />:<div></div>}</div>
                <div>{dash?.room_count?<Frame4 room_count={dash.room_count} />:<div></div>}</div>
                
            </div>
        </div>
    )
}

export default Dash
