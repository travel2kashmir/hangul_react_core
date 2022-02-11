import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/provider';
import axios from "axios";


const PropertySummaryTab = () => {
    const [data] = useContext(Context)
    const [allHotelDetails, setAllHotelDetails] = useState([])
    const [updatebasic, setUpdatebasic] = useState(false)
    const [updateaddress, setUpdateaddress] = useState(false)
    const [updatecontact, setUpdatecontact] = useState(false)
    const [editcontact, setEditcontact] = useState({})


    useEffect(() => {
        const fetchServices = async () => {
            try {
                // const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}`;
                const url = `http://103.136.36.27:7860/jammu-and-kashmir/srinagar/hotels/t2k001`
                console.log("URL " + url)
                const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
                console.log(response.data)

                setAllHotelDetails(response.data)
            }
            catch (error) {
                if (error.response) {

                    console.log("data" + JSON.stringify(error.response));
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
                                    ? "text-white bg-orange-500"
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
                                    ? "text-white bg-orange-500"
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
                                    ? "text-white bg-orange-500"
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


            {allHotelDetails !== null && allHotelDetails !== undefined
                ? <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">

                                {updatebasic === false ?
                                    <div>
                                        <div className="text-center flex justify-between">
                                            <h6 className="text-blueGray-700 text-xl font-bold mb-5">Basic Details</h6></div>
                                        <div className="flex flex-wrap">

                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Property Name</label>
                                                    <input
                                                        type="text"
                                                        rows="2" columns="60"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.property_name}
                                                        readOnly="readonly"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Property Category</label>
                                                    <input type="text"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.property_category}
                                                        readOnly="readonly"
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Property Brand</label>
                                                    <input type="text"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.property_brand}
                                                        readOnly="readonly"
                                                    /></div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Established Date</label>
                                                    <input type="date"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.established_year}
                                                        readOnly="readonly"
                                                    /></div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Star Rating</label>
                                                    <input
                                                        type="text"

                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        Value={allHotelDetails?.star_rating}
                                                        readOnly="readonly"
                                                    />

                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Description Title</label>
                                                    <input
                                                        type="text"

                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        Value={allHotelDetails?.description_title}
                                                        readOnly="readonly"
                                                    />

                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Description</label>
                                                    <textarea rows="2" columns="60"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.description_body} readOnly="readonly" />

                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Description Date</label>
                                                    <input type="date"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.description_date}
                                                        readOnly="readonly"
                                                    /></div>
                                            </div>
                                        </div>

                                        <div className="text-center flex justify-end" style={{ paddingBottom: "10px" }}>


                                            <button className="bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setUpdatebasic(!updatebasic)}>Edit</button>

                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="text-center flex justify-between">
                                            <h6 className="text-blueGray-700 text-xl font-bold mb-5">Basic Details</h6></div>
                                        <div className="flex flex-wrap">

                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Property Name</label>
                                                    <input
                                                        type="text"
                                                        rows="2" columns="60"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.property_name}

                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Property Category</label>
                                                    <input type="text"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.property_category}

                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Property Brand</label>
                                                    <input type="text"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.property_brand}

                                                    /></div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Established Date</label>
                                                    <input type="date"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.established_year}

                                                    /></div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Star Rating</label>
                                                    <input
                                                        type="text"

                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        Value={allHotelDetails?.star_rating}

                                                    />

                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Description Title</label>
                                                    <input
                                                        type="text"

                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        Value={allHotelDetails?.description_title}

                                                    />

                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Description</label>
                                                    <textarea rows="2" columns="60"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.description_body} readOnly="readonly" />

                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Description Date</label>
                                                    <input type="date"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.description_date}

                                                    /></div>
                                            </div>
                                        </div>
                                        <div className="text-center flex justify-end" style={{ paddingBottom: "10px" }}>


                                            <button className="bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setUpdatebasic(!updatebasic)}>Cancel</button>
                                            <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >Submit</button>
                                        </div>
                                    </div>}

                            </div>

                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">


                                {updateaddress === false ?
                                    <div>
                                        <h6 className="text-blueGray-700 text-xl font-bold">Address</h6><br />
                                        {allHotelDetails?.address?.map((item) => {
                                            return (
                                                <div>
                                                    <div className="flex flex-wrap">
                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">

                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Street address</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_street_address} readOnly="readonly"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Landmark</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_landmark} readOnly="readonly"
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">City</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_city} readOnly="readonly"
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Province</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_province} readOnly="readonly"
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Country</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_country} readOnly="readonly"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Precision(in meters)</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_precision} readOnly="readonly"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">

                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Postal code</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_zipcode} readOnly="readonly"
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">

                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Latitude</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_latitude} readOnly="readonly"
                                                                />


                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">

                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Longitute</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_longitude} readOnly="readonly"
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })}
                                        <div className="text-center flex justify-end" style={{ paddingBottom: "10px" }}>


                                            <button className="bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setUpdateaddress(!updateaddress)}>Edit</button>

                                        </div>

                                    </div>


                                    :
                                    <div>
                                        <h6 className="text-blueGray-700 text-xl font-bold">Address</h6><br />
                                        {allHotelDetails?.address?.map((item) => {
                                            return (
                                                <div>
                                                    <div className="flex flex-wrap">
                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">

                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Street address</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_street_address}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Landmark</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_landmark}
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">City</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_city}
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Province</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_province}
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Country</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_country}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Precision(in meters)</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_precision}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">

                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Postal code</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_zipcode}
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">

                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Latitude</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_latitude}
                                                                />


                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">

                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Longitute</label>
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.address_longitude}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                            )

                                        })





                                        }
                                        <div className="text-center flex justify-end" style={{ paddingBottom: "10px" }}>


                                            <button className="bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setUpdateaddress(!updateaddress)}>Cancel</button>
                                            <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >Submit</button>
                                        </div>


                                    </div>}


                            </div>

                            <div className={openTab === 3 ? "block" : "hidden"} id="link3">

                                {updatecontact === false ?

                                    <div>

                                        <h6 className="text-blueGray-700 text-xl font-bold">Contact</h6><br />
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-3/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Contact Type</label>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Contact Value</label>
                                                </div>
                                            </div></div>
                                        {
                                            allHotelDetails?.contacts?.map((item) => {
                                                return (

                                                    <div className="flex flex-wrap">
                                                        <div className="w-full lg:w-3/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.contact_type} readOnly="readonly"


                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-4/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={item.contact_data} readOnly="readonly"

                                                                />
                                                            </div>
                                                        </div>
                                                       
                                                        <div className="w-full lg:w-4/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <button className=" bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" onClick={() => { setUpdatecontact(!updatecontact); setEditcontact(item) }}>Edit</button>
                                                                <button className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" type="button" >Delete</button>
                                                               
                                                            </div>
                                                        </div>

                                                    </div>




                                                )
                                                
                                            }
                                            
                                            
                                            )





                                            
                                        }
                                       

                                    </div>
                                    :
                                    <div>

                                        <h6 className="text-blueGray-700 text-xl font-bold">Contact</h6><br />
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-3/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Contact Type</label>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-3/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Contact Value</label>
                                                </div>
                                            </div></div>
                                        

                                                    <div className="flex flex-wrap">
                                                        <div className="w-full lg:w-3/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <select

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                >
                                                                    <option >Select contact type</option>
                                                                    <option selected>{editcontact.contact_type}</option>
                                                                    <option value="phone" >Phone</option>
                                                                    <option value="email">Email</option>
                                                                    <option value="website" >Website</option>
                                                                    <option value="toll free number">Toll Free number</option>
                                                                    <option value="tdd number">TDD number</option>
                                                                </select>

                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-4/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <input
                                                                    type="text"

                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    defaultValue={editcontact.contact_data}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-4/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <button className=" bg-blueGray-600  text-white active:bg-blueGray-600  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" onClick={() =>setUpdatecontact(!updatecontact)}>Cancel</button>
                                                                <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >Submit</button>
                                                               
                                                            </div>
                                                        </div>
                                                        
                                                    </div>

                                                   

                                              
                                           

                                    </div>}




                            </div>
                        </div>
                    </div>
                </div>
                : <div>Loading Data. Please wait......</div>}
        </div>)
}

export default PropertySummaryTab;