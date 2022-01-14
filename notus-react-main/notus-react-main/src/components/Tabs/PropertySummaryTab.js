import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/provider';
import axios from "axios";


const PropertySummaryTab = () => {
    const [data] = useContext(Context)
    const [allHotelDetails, setAllHotelDetails] = useState([])
    useEffect(() => {
        const fetchServices = async () => {
            try {
                // const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}`;
                const url = `/jammu-and-kashmir/srinagar/hotels/t2k001`
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
    const [openTab, setOpenTab] = React.useState(1);
    return (

        <div className="flex flex-wrap">
            <div className="w-full">
                <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                    role="tablist"
                >
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 1
                                    ? "text-white bg-lightBlue-600"
                                    : "text-lightBlue-600 bg-white")
                            }
                            onClick={e => {
                                e.preventDefault();
                                setOpenTab(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                        >
                        Basic Details
                        </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 2
                                    ? "text-white bg-lightBlue-600"
                                    : "text-lightBlue-600 bg-white")
                            }
                            onClick={e => {
                                e.preventDefault();
                                setOpenTab(2);
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                        >
                            Address
                        </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 3
                                    ? "text-white bg-lightBlue-600"
                                    : "text-lightBlue-600 bg-white")
                            }
                            onClick={e => {
                                e.preventDefault();
                                setOpenTab(3);
                            }}
                            data-toggle="tab"
                            href="#link3"
                            role="tablist"
                        >
                            Contact
                        </a>
                    </li>





                </ul>
            </div>


            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="px-4 py-5 flex-auto">
                    <div className="tab-content tab-space">

                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">

                            <tr>
                                <td><label className="tdr">Property Name</label></td>
                                <td>{allHotelDetails?.property_name}</td>
                            </tr>

                            <tr>
                                <td><label className="tdr">Property Brand</label></td>
                                <td>{allHotelDetails?.property_brand}</td>
                            </tr>

                            <tr>
                                <td><label className="tdr">Property Category</label></td>
                                <td>{allHotelDetails?.property_category}</td>
                            </tr>

                            <tr>
                                <td><label className="tdr">Star Rating</label></td>
                                <td>{allHotelDetails?.star_rating}</td></tr>

                            <tr>
                                <td ><label className="tdr">{allHotelDetails?.description_title}</label></td>
                                <td >{allHotelDetails?.description_body}</td>
                            </tr>

                           

                        </div>

                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                        <h2>Address:</h2>
                            {allHotelDetails?.address?.map((item) => {
                                return (
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
                                            <td className="tda">{item.address_longitude}</td>
                                        </tr>

                                    </div>
                                )
                            })}
                          

                        </div>




                        <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                        <h2>Contact's</h2>
                            {
                                allHotelDetails?.contacts?.map((item) => {
                                    return (
                                        <div>
                                            <tr><td> <label className="tdr">{item.contact_type} </label>
                                            </td>
                                                <td>{item.contact_data}</td></tr>
                                            <br />
                                        </div>
                                    )
                                })

                            }
                        </div>



                      






                    </div>
                </div>
            </div>





        </div>)
}

export default PropertySummaryTab;