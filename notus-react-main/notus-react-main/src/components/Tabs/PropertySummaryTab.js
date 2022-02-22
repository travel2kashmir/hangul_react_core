import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/provider';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertySummaryTab = () => {
    //For Memory
    const [data] = useContext(Context)
    const [showModal, setShowModal] = React.useState(false);
    const [allHotelDetails, setAllHotelDetails] = useState([])
    
    const [id,setId]= useState()
    // For Display 
    const [updatebasic, setUpdatebasic] = useState(false)
    const [updateaddress, setUpdateaddress] = useState(false)
    const [updatecontact, setUpdatecontact] = useState(false)
    const [editcontact, setEditcontact] = useState({})
    const [openTab, setOpenTab] = React.useState(1);

    const submitBasicEdit = () => {
        console.log(JSON.stringify(data))
        const final_data = {
            "property_id": data.property_id,
            "property_name": allHotelDetails.property_name,
            "property_category": allHotelDetails.property_category,
            "property_brand": allHotelDetails.property_brand,
            "established_year": allHotelDetails.established_year,
            "star_rating": allHotelDetails.star_rating,
            "description_title": allHotelDetails.description_title,
            "description_body": allHotelDetails.description_body,
            "description_date": allHotelDetails.description_date
        }
        console.log("the new information " + JSON.stringify(final_data))
        const url = '/basic'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
            ((response) => {
                console.log(response.data);
                toast.success(JSON.stringify(response.data.message), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            })
            .catch((error) => {
                console.log(error);
                toast.error("Some thing went wrong in Basic Details\n " + JSON.stringify(error.response.data), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                   
            })
    }


    const submitAddressEdit = () => {
        console.log(JSON.stringify(data))
        console.log(JSON.stringify(allHotelDetails.address[0].address_id))
        const final_data = {
            "address_id": allHotelDetails.address[0].address_id,
            "address_street_address": allHotelDetails.address_street_address,
            "address_longitude": allHotelDetails.address_longitude,
            "address_latitude": allHotelDetails.address_latitude,
            "address_landmark": allHotelDetails.address_landmark,
            "address_city": allHotelDetails.address_city,
            "address_precision": allHotelDetails.address_precision,
            "address_zipcode": allHotelDetails.address_zipcode,
            "address_province": allHotelDetails.address_province,
            "address_country": allHotelDetails.address_country
        }
        console.log("the new information " + JSON.stringify(final_data))
        const url = '/address'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
            ((response) => {
                console.log(response.data);
                toast.success(JSON.stringify(response.data.message), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            })
            .catch((error) => {
                console.log(error);
                console.log(error);
                toast.error("Some thing went wrong in Address\n " + JSON.stringify(error.response.data), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            })
    }
    
    const submitContactEdit = (props) => {
        console.log("props to edit contact i s "+props)
        console.log(JSON.stringify(data))
        const final_data = {
            "contact_id":props,
            "contact_type": allHotelDetails.contact_type,
            "contact_data": allHotelDetails.contact_data
        }
        console.log("the new information " + JSON.stringify(final_data))
        const url = '/contact'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
            ((response) => {
                console.log(response.data);
                toast.success(JSON.stringify(response.data.message), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            
            })
            .catch((error) => {
                console.log(error);
                console.log(error);
                toast.error("Some thing went wrong in Contacts\n " + JSON.stringify(error.response.data), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            })
    }

    const submitDelete = (props) => {
        console.log(JSON.stringify(data))
        const url = `/${props}`
        axios.delete(url).then
            ((response) => {
                console.log(response.data);
                toast.success(JSON.stringify(response.data.message), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            })
            .catch((error) => {
                console.log(error);
                console.log(error);
                toast.error("Some thing went wrong in Basic Details\n " + JSON.stringify(error.response.data), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            })
    }

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}`;
                const url = `http://103.136.36.27:7860/jammu-and-kashmir/srinagar/hotels/t2k004`
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
                                                        onChange={
                                                            (e) => (
                                                                setAllHotelDetails({ ...allHotelDetails, property_name: e.target.value })
                                                            )
                                                        }

                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Property Category</label>
                                                    <select
                                                        onChange={
                                                            (e) => (
                                                                setAllHotelDetails({ ...allHotelDetails, property_category: e.target.value })
                                                            )
                                                        }

                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    >
                                                        <option selected>Select property type</option>
                                                        <option value="hotel">Hotel</option>   
                                                        <option value="resort">Resort</option>
                                                        <option value="motel">Motel</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Property Brand</label>
                                                    <input type="text"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.property_brand}
                                                        onChange={
                                                            (e) => (
                                                                setAllHotelDetails({ ...allHotelDetails, property_brand: e.target.value })
                                                            )
                                                        }

                                                    /></div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Established Date</label>
                                                    <input type="date"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={allHotelDetails?.established_year}
                                                        onChange={
                                                            (e) => (
                                                                setAllHotelDetails({ ...allHotelDetails, established_year: e.target.value })
                                                            )
                                                        }

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
                                                        onChange={
                                                            (e) => (
                                                                setAllHotelDetails({ ...allHotelDetails, star_rating: e.target.value })
                                                            )
                                                        }

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
                                                        onChange={
                                                            (e) => (
                                                                setAllHotelDetails({ ...allHotelDetails, description_title: e.target.value })
                                                            )
                                                        }

                                                    />

                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Description</label>
                                                    <textarea rows="2" columns="60"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        onChange={
                                                            (e) => (
                                                                setAllHotelDetails({ ...allHotelDetails, description_body: e.target.value })
                                                            )
                                                        }
                                                        defaultValue={allHotelDetails?.description_body}  />
                                                   

                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Description Date</label>
                                                    <input type="date"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        onChange={
                                                            (e) => (
                                                                setAllHotelDetails({ ...allHotelDetails, description_date: e.target.value })
                                                            )
                                                        } 
                                                         defaultValue={allHotelDetails?.description_date}
                                                        
                                                    /></div>
                                            </div>
                                        </div>
                                        <div className="text-center flex justify-end" style={{ paddingBottom: "10px" }}>


                                            <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setUpdatebasic(!updatebasic)}>Cancel</button>
                                            <button
                                                onClick={submitBasicEdit}
                                                className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >
                                                Submit</button>
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

                                                                    className="border-0 px-3 py-3 uppercase placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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

                                                                    onChange={
                                                                        (e) => (
                                                                            setAllHotelDetails({ ...allHotelDetails, address_street_address: e.target.value })
                                                                        )
                                                                    }
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
                                                                    onChange={
                                                                        (e) => (
                                                                            setAllHotelDetails({ ...allHotelDetails, address_landmark: e.target.value })
                                                                        )
                                                                    }
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">City</label>
                                                                <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    onChange={
                                                                        (e) => (
                                                                            setAllHotelDetails({ ...allHotelDetails, address_city: e.target.value })
                                                                        )
                                                                    } >
                                                                    <option value="selected">Select City</option>
                                                                    <option value="srinagar" >Srinagar</option>
                                                                    <option value="baramulla">Baramulla</option>
                                                                    <option value="budgam">Budgam</option>
                                                                    <option value="pahalgam">Pahalgam</option>
                                                                    <option value="gulmarg">Gulmarg</option>
                                                                </select>

                                                            </div>
                                                        </div>

                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Province</label>
                                                                <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    onChange={
                                                                        (e) => (
                                                                            setAllHotelDetails({ ...allHotelDetails, address_province: e.target.value })
                                                                        )
                                                                    }  >
                                                                    <option value="selected">Select Province/State</option>
                                                                    <option value="jammu and kashmir" >Jammu and Kashmir</option>
                                                                    <option value="kargil">Kargil</option>
                                                                    <option value="delhi">Delhi</option>
                                                                    <option value="maharastra">Maharastra</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password">Country</label>
                                                                <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    onChange={
                                                                        (e) => (
                                                                            setAllHotelDetails({ ...allHotelDetails, address_country: e.target.value })
                                                                        )
                                                                    }>
                                                                <option value="selected">Select Country</option>
                                                                <option value="IN" >India</option>
                                                                <option value="PK">Pakistan</option>
                                                                <option value="UN">United States of America</option>
                                                                <option value="UK">United Kingdom</option>
                                                            </select>
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
                                                                    onChange={
                                                                        (e) => (
                                                                            setAllHotelDetails({ ...allHotelDetails, address_precision: e.target.value })
                                                                        )
                                                                    }
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
                                                                    onChange={
                                                                        (e) => (
                                                                            setAllHotelDetails({ ...allHotelDetails, address_zipcode: e.target.value })
                                                                        )
                                                                    }
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
                                                                    onChange={
                                                                        (e) => (
                                                                            setAllHotelDetails({ ...allHotelDetails, address_latitude: e.target.value })
                                                                        )
                                                                    }
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
                                                                    onChange={
                                                                        (e) => (
                                                                            setAllHotelDetails({ ...allHotelDetails, address_longitude: e.target.value })
                                                                        )
                                                                    }
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                        })

                                        }
                                        <div className="text-center flex justify-end" style={{ paddingBottom: "10px" }}>


                                            <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setUpdateaddress(!updateaddress)}>Cancel</button>
                                            <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                                onClick={submitAddressEdit} >Submit</button>
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
                                            <div className="w-full lg:w-3/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password">Contact Value</label>
                                                </div>
                                            </div>
                                           
                                            <div className="w-full lg:w-3/12 px-4">
                                                <div className="relative w-full mb-3"></div></div>
                                            <div className="w-full lg:w-3/12 px-4">
                                                <div className="relative w-full mb-3">

                                                <div>{showModal ? (
                                                                    <>
                                                                        <div
                                                                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none"
                                                                            onClick={() => setShowModal(false)}
                                                                        >
                                                                            <div className="relative w-auto my-6 mx-auto max-w-sm">
                                                                                {/*content*/}
                                                                                <div className="border-2 px-2 rounded-lg shadow-lg relative flex flex-col w-full bg-blueGray-600 outline-none focus:outline-none">
                                                                                    {/*header*/}
                                                                                    {/*body*/}
                                                                                    <div className=" p-6  flex-auto">
                                                                                        <p className="my-2 text-white text-sm leading-relaxed">
                                                                                            Are you sure, you want to delete?
                                                                                        </p>
                                                                                    </div>
                                                                                    {/*footer*/}
                                                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                                                        <button
                                                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                            type="button"
                                                                                            onClick={() => setShowModal(false)}
                                                                                        >
                                                                                            Close
                                                                                        </button>
                                                                                        <button
                                                                                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                            type="button"
                                                                                            onClick={() => submitDelete(id)}
                                                                                        >
                                                                                            Delete
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </>
                                                                ) : <></>}</div>
                                                    </div></div>
                                            </div>
                                           
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
                                                        <div className="w-full lg:w-3/12 px-4">
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
                                                                <button className=" bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                                 onClick={() => {setUpdatecontact(!updatecontact); setEditcontact(item) }}>Edit</button>
                                                                <button
                                                                 className=
                                                                 "bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" 
                                                                 onClick={() => {setId(item.contact_id);
                                                                    setShowModal(true)}}
                                                                 type="button">Delete</button>

                                                                  

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
                                            </div>
                                            
                                            
                                            </div>

                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-3/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <select

                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        onChange={
                                                            (e) => (
                                                                setAllHotelDetails({ ...allHotelDetails, contact_type: e.target.value })
                                                            )
                                                        }  >
                                                        <option selected >Select contact type</option>
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
                                                        onChange={
                                                            (e) => (
                                                                setAllHotelDetails({ ...allHotelDetails, contact_data: e.target.value })
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <button className=" bg-blueGray-600  text-white active:bg-blueGray-600  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" 
                                                    onClick={() => setUpdatecontact(!updatecontact)}>Cancel</button>
                                                    <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 
                                                    font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md 
                                                    outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                     type="button" onClick={()=>submitContactEdit(editcontact?.contact_id)} >Submit</button>

                                                </div>
                                            </div>

                                        </div>
                                    </div>}
                                    
                            </div>
                        </div>
                    </div>
                    <ToastContainer position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
                </div>
                : <div>Loading Data. Please wait......</div>}
        </div>)

        
}

export default PropertySummaryTab;