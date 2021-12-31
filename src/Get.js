import React, { useContext, useEffect, useState } from 'react'
import { Context } from './context/provider';
import axios from "axios";
import Navi from './navofabout';
import GetReviews from './getReviews';
import GetServices from './getServices';
import GetGallery from './getGallery';
import GetContact from './getContact';


function Get() {
    const [data] = useContext(Context)
    const [allHotelDetails, setAllHotelDetails] = useState([])
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}`;
                //for test const url=`/jammu-and-kashmir/srinagar/hotels/t2k001`
                console.log("URL " + url)
                const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
                console.log(response.data)

                setAllHotelDetails(response.data)
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
              
                <div >
            {

                <div className="row1 black_border_new2">
                    <table className="table table-bordered" >
                      
                       <thead> <th className="thead">Property Details</th></thead>
                        <tr>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                        </tr>
                        <tr>
                        <td><label className="tdr">Property name</label></td>
                        <td>{allHotelDetails?.property_name}</td>
                        </tr>

                        <tr>
                        <td><label className="tdr">Property brand</label></td>
                        <td>{allHotelDetails?.property_brand}</td>
                        </tr>
                        
                        <tr>
                        <td><label className="tdr">Property category</label></td>
                        <td>{allHotelDetails?.property_category}</td>
                        </tr>

                        <tr>
                        <td><label className="tdr">Rating</label></td>
                        <td>{allHotelDetails?.star_rating}</td></tr>
                         
                         <tr>
                        <td ><label className="tdr">{allHotelDetails?.description_title}</label></td>
                        <td >{allHotelDetails?.description_body}</td>
                        </tr>
                    </table>
   
                    <table className="table table-bordered" >
                    <thead> <th className="thead">Address Details</th></thead>
                    <tr>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                        </tr>
                        {allHotelDetails?.address?.map((item)=>{
                            return(
                       <div>

                        <tr>
                        <td><label className="tdr">Street address</label></td>
                          <td className="tda"> {item.address_street_address}</td> 
                            </tr>
                        <tr>
                        <td><label className="tdr">Landmark</label></td>
                        <td className="tda">  {item.address_landmark}</td>
                        </tr>
                        <tr>
                        <td><label className="tdr">City</label></td>
                        <td className="tda">    {item.address_city}</td>
                        </tr>
                        <tr>
                        <td><label className="tdr">Province</label></td>
                          <td className="tda"> {item.address_province}</td>
                            </tr>
                        <tr>
                        <td><label className="tdr">Country</label></td>
                        <td className="tda">{item.address_country}</td>
                            </tr>
                        <tr>
                        <td><label className="tdr">Precision</label></td>
                        <td className="tda"> {item.address_precision}mtrs</td>
                        </tr>
                        
                        <tr>
                        <td><label className="tdr">Postal code</label></td>
                        <td className="tda">{item.address_zipcode}</td>
                        </tr>
                        
                        <tr>
                        <td><label className="tdr">Latitude</label></td>
                        <td className="tda">
                         {item.address_latitude}</td>  
                        </tr> 
                        
                        <tr>
                        <td><label className="tdr">Longitute</label></td>
                        <td className="tda">{item.address_longitude}</td></tr>

                        </div>
                            )
                        })

                        }
                      
                    </table>
                    <GetReviews allHotelDetails={allHotelDetails} id="#GR"/>
                    <GetServices allHotelDetails={allHotelDetails} id="#GS"/>
                    <GetGallery allHotelDetails={allHotelDetails} id="#GG"/>
                    <GetContact allHotelDetails={allHotelDetails} id="#GC"/>
             
          
                   
                    
                </div>
            }

</div>
</div>
    )
}

export default Get
