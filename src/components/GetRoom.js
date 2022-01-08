import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/provider';
import axios from "axios";
import Navi from './navofabout';
import GetRoomGallery from './GetRoomGallery';
import GetRoomServices from './GetRoomServices';

function GetRoom() {
    const [data] = useContext(Context)
    const [allRoomDetails, setAllRoomDetails] = useState([])
    useEffect(() => {
        const fetchServices = async () => {
            try {
               // const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}/${allRoomDetails.room_id}`;
               const url=`/jammu-and-kashmir/srinagar/hotels/t2k001/r001`
                console.log("URL " + url)
                const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
                console.log(response.data)

                setAllRoomDetails(response.data)
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

    return (
        <div >
           
              <Navi/>
              
                <div className="container-fluid">
            {

                <div >
                    <div  className="row black_border_new1" >
                      
                        
                        <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Room Details</h4>
                            <hr style={{ borderTop: "1px solid black" }}></hr>
                        <tr>
                        <td><label className="tdr">Room name</label></td>
                        <td>{allRoomDetails?.room_name}</td>
                        </tr>


                        <tr>
                        <td><label className="tdr">Room Type</label></td>
                        <td>{allRoomDetails?.room_type}</td>
                        </tr>

                        <tr>
                        <td><label className="tdr">Room description</label></td>
                        <td>{allRoomDetails?.room_description}</td>
                        </tr>
                        
                        <tr>
                        <td><label className="tdr">Room capacity</label></td>
                        <td>{allRoomDetails?.room_capacity}</td>
                        </tr>

                        <tr>
                        <td><label className="tdr">Maximum number of occupants</label></td>
                        <td>{allRoomDetails?.maximum_number_of_occupants}</td></tr>
                         
                         <tr>
                        <td ><label className="tdr">Minimum number of occupants</label></td>
                        <td >{allRoomDetails?.minimum_number_of_occupants}</td>
                        </tr>

                        <tr>
                        <td ><label className="tdr">Maximum age of occupants</label></td>
                        <td >{allRoomDetails?.minimum_age_of_occupants}</td>
                        </tr>

                        <tr>
                        <td ><label className="tdr">Length</label></td>
                        <td >{allRoomDetails?.room_length}feet</td>
                        </tr>
                        <tr>
                        <td ><label className="tdr">Breadth</label></td>
                        <td >{allRoomDetails?.room_width}feet</td>
                        </tr>
                        <tr>
                        <td ><label className="tdr">Height</label></td>
                        <td >{allRoomDetails?.room_height}feet</td>
                        </tr>

                        <tr>
                        <td ><label className="tdr">Carpet Area </label></td>
                        <td >{allRoomDetails?.carpet_area}sq. feet</td>
                        </tr>

                        <tr>
                        <td ><label className="tdr">Volume</label></td>
                        <td >{allRoomDetails?.room_volume}cubic feet</td>
                        </tr>
                    </div>
   
                       

					 
                  
                   
    {allRoomDetails?.room_facilities? <GetRoomServices all={allRoomDetails?.room_facilities} />:<div></div>}
    {allRoomDetails?.room_images?<GetRoomGallery all={allRoomDetails?.room_images} />:<div></div>}   
     
                </div>

    
}

</div>
</div>
    )
}

export default GetRoom;
