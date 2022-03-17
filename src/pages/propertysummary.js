import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/provider'
import axios from "axios"
import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

function Propertysummary() {
    const [data] = useContext(Context)
    const [allHotelDetails, setAllHotelDetails] = useState([])

    /* Function call to fetch All Property Details when page loads */
    useEffect(() => {
        const fetchHotelDetails = async () => {
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


        fetchHotelDetails();


    }, [])

    return (
        <div>
            {/* Navbar */}
            <Navbar/>
            {/* Sidebar */}
            <Sidebar/>
            <div id="main-content" className="  bg-gray-50 px-4 pt-24 relative overflow-y-auto lg:ml-64">
                {/* Header */}
                <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <Link to="" className="text-gray-700 text-base font-medium hover:text-gray-900 inline-flex items-center">
                                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <Link to="" className="text-gray-700 text-sm   font-medium hover:text-gray-900 ml-1 md:ml-2">Taj Vivanta</Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Property Summary</span>
                            </div>
                        </li>
                    </ol>
                </nav> 
                <h6 className="text-xl pb-4 flex mr-4 leading-none  pt-2 font-bold text-gray-800 ">
                 Property Summary
                </h6>
                {/* Body */}
                <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-3">
                    {/* Basic Details */}
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0">
                                <span className="text-xl sm:text-xl leading-none font-bold text-gray-800">{allHotelDetails?.property_name}</span>
                                <h3 className="text-base font-normal text-gray-500">{allHotelDetails?.star_rating}-Star {allHotelDetails?.property_category}</h3>
                            </div>
                            <div className="flex items-center justify-end flex-1">
                                <Link to="/basicdetails" className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2">See More..</Link>
                            </div>
                        </div>
                        <p className="text-base font-semibold text-gray-500 truncate">
                            {allHotelDetails?.description_title}
                        </p>
                        <p className="text-sm font-medium text-gray-90  line-clamp-10 ">
                            {allHotelDetails?.description_body}
                        </p>
                    </div>

                    {/* Address */}
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0">
                                <h3 className="text-base font-bold text-gray-900 mb-4">Address</h3>
                            </div>
                            <div className="flex items-center justify-end flex-1">
                                <Link to="/address" className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2">See More..</Link>
                            </div>
                        </div>
                        {allHotelDetails?.address?.map((item) => {
                            return (
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 sm:w-6/12 sm:px-4 lg:px-2">
                                        <div className="relative w-full mb-2">
                                            <label
                                                className="text-xs font-semibold text-gray-500 block mb-1"
                                                htmlFor="grid-password">
                                                Street Address
                                            </label>
                                            <label
                                                className="text-xs font-medium  text-gray-900 block mb-1"
                                                htmlFor="grid-password">
                                                {item.address_street_address}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 sm:w-6/12 sm:px-4 px-2">
                                        <div className="relative w-full mb-2">
                                            <label
                                                className="text-xs font-semibold text-gray-500 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                Landmark
                                            </label>
                                            <label
                                                className="text-xs  font-medium  text-gray-900 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                {item.address_landmark}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 sm:w-6/12 sm:px-4 px-2">
                                        <div className="relative w-full mb-2">
                                            <label
                                                className="text-xs font-semibold text-gray-500 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                City
                                            </label>
                                            <label
                                                className="text-xs  font-medium  text-gray-900 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                {item.address_landmark}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 sm:w-6/12 sm:px-4 px-2">
                                        <div className="relative w-full mb-2">
                                            <label
                                                className="text-xs font-semibold text-gray-500 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                Province
                                            </label>
                                            <label
                                                className="text-xs  font-medium text-gray-900 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                {item.address_province}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 sm:w-6/12 sm:px-4 px-2">
                                        <div className="relative w-full mb-2">
                                            <label
                                                className="text-xs font-semibold text-gray-500 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                Latitude
                                            </label>
                                            <label
                                                className="text-xs  font-medium text-gray-900 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                {item.address_latitude}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 sm:w-6/12 sm:px-4 px-2">
                                        <div className="relative w-full mb-2">
                                            <label
                                                className="text-xs font-semibold text-gray-500 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                Longitude
                                            </label>
                                            <label
                                                className="text-xs  font-medium text-gray-900 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                {item.address_longitude}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 sm:w-6/12 sm:px-4 px-2">
                                        <div className="relative w-full mb-2">
                                            <label
                                                className="text-xs font-semibold text-gray-500 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                Postal Code
                                            </label>
                                            <label
                                                className="text-xs font-medium text-gray-900 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                {item.address_zipcode}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 sm:w-6/12 sm:px-4 px-2">
                                        <div className="relative w-full mb-2">
                                            <label
                                                className="text-xs font-semibold text-gray-500 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                Precision
                                            </label>
                                            <label
                                                className="text-xs font-semibold  text-gray-900 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                {item.address_precision}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 sm:w-6/12 sm:px-4 px-2">
                                        <div className="relative w-full mb-2">
                                            <label
                                                className="text-xs font-semibold text-gray-500 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                Country Code
                                            </label>
                                            <label
                                                className="text-xs  font-medium text-gray-900 block mb-1"
                                                htmlFor="grid-password"
                                            >
                                                {item.address_country}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/*Contact */}
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0">
                                <h3 className="text-base font-bold text-gray-900 mb-4">Contact</h3>
                            </div>
                            <div className="flex items-center justify-end flex-1">
                                <Link to="/contact" className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2">See More..</Link>
                            </div>
                        </div>
                        <div className="align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden">
                                <table className="table-fixed min-w-full divide-y divide-gray-200">
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allHotelDetails?.contacts?.map((item) => {
                                            return (
                                                <tr className="hover:bg-gray-100">
                                                    <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                                        <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500">{item.contact_type} </td>
                                                    </td>
                                                    <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">{item.contact_data} </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="mt-4 grid grid-flow-row-dense lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-3">
                    {/* Services */}
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0">
                                <h3 className="text-base font-bold text-gray-900 mb-4">Services</h3>
                            </div>
                            <div className="flex items-center justify-end">
                                <Link to="/services" className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2">See More..</Link>
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                        <tr>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2 ">Air Conditioned</button>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Swimming Pool</button>
                        </tr><br />
                        <tr>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Child Friendly</button>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Pets Allowed</button>
                        </tr><br />
                        <tr>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Laundary Service</button>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Wifi</button>
                        </tr><br />
                        <tr>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Smoke Free Property</button>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Spa</button>
                        </tr><br/>
                        <tr>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Bussiness Center</button>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Kitchen Available</button>
                        </tr>
                        </div>         
                    </div>
                    {/* Gallery */}
                    <div className="col-span-2 bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                        <div className="flex items-center justify-between ">
                            <div className="flex-shrink-0">
                                <h3 className="text-base font-bold text-gray-900 mb-4">Gallery</h3>
                            </div>
                            <div className="flex items-center justify-end flex-1">
                                <Link to="/gallery" className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2">See More..</Link>
                            </div>
                        </div>
                        <div className=" flex-wrap container grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {allHotelDetails?.images?.map((item) => {
                                return (
                                    <div className="block text-blueGray-600 text-xs font-bold ">
                                        <img src={item.image_link} alt='pic_room' style={{ height: "120px", width: "200px" }} />
                                    </div>
                                )
                            }
                            )
                            }
                        </div>
                    </div>
                </div>
                {/* Reviews */}
                <div className="mt-4 grid grid-flow-row-dense md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" >
                        <div className="flex items-center justify-between ">
                            <div className="flex-shrink-0">
                                <h3 className="text-base font-bold text-gray-900 mb-4">Reviews</h3>
                            </div>
                            <div className="flex items-center justify-end flex-1">
                                <Link to="/reviews" className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2">See More..</Link>
                            </div>
                        </div>
                        {allHotelDetails?.Reviews?.map((item) => (
                            <div>
                            <div className="flex items-center justify-between mb-2">
                            <div>
                                <span className="text-sm leading-none font-semibold text-gray-800">{item?.review_author}</span>   
                            </div>
                            <div className="flex-shrink-0">
                            <div className="flex items-center flex-1 justify-end px-2 text-yellow-400 text-sm font-bold">
                                {item?.review_rating}
                            </div>
                        </div>
                        </div>
                            <p className="text-sm my-2 text-gray-600 line-clamp-2"> {item?.review_content} </p>
                       </div> ))}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div id="main-content" className="px-1  bg-gray-50 relative overflow-y-auto lg:ml-64">
                <Footer />
            </div>
        </div>
    )
}

export default Propertysummary