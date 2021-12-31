import React, { useContext, useState, useEffect } from 'react'
import { Context } from './context/provider';
import axios from "axios";
import Nav from './Nav';
import XMLViewer from 'react-xml-viewer'
const GetXml = () => {
    const [data] = useContext(Context)
    const [hotelXML, setHotelXML] = useState()
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const url = `http://34.125.133.100:7860/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}/xml`;
                console.log("URL " + url)
                const response = await axios.get(url, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
                console.log(response.data)

                setHotelXML(response.data)
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


        fetchServices();
    }, [])

    const call = () => { alert("Data Sent To Google SucessFully") }



    return (
        <div>
            <Nav />
            <div className='row black_border_new1'>
                <XMLViewer xml={hotelXML} />
                <button onClick={call}>Send To Google</button>
            </div>
        </div>
    )
}

export default GetXml
