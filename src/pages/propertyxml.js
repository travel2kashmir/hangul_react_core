import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/provider';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { Link } from 'react-router-dom';


function Propertyxml() {
    const [data] = useContext(Context)
    const [hotelXML, setHotelXML] = useState()

    const call = () => {
        toast.success("Data Sent To Google SucessFully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    useEffect(() => {
        const fetchXML = async () => {
            try {
                //const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_type}s/${data.property_id}/xml`;
                const url = `/jammu-and-kashmir/srinagar/hotels/t2k001/xml`
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

        fetchXML();
    }, []) // eslint-disable-next-line

    const breaker = { "overflowBreak": true }

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div id="main-content" class="  bg-gray-50 pt-24 relative overflow-y-auto lg:ml-64">
                {/* Navbar */}
                <nav class="flex mb-5 ml-4" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2">
                        <li class="inline-flex items-center">
                            <Link to="" class="text-gray-700 text-base font-medium hover:text-gray-900 inline-flex items-center">
                                <svg class="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <Link to="" class="text-gray-700 text-sm   font-medium hover:text-gray-900 ml-1 md:ml-2">Taj Vivanta</Link>
                            </div>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <span class="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Address</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h6 className="text-xl  flex leading-none pl-6 pt-2 pb-6 font-bold text-gray-900 ">
                        Property XML
                    </h6>

                {/* Address Form */}
                <div class="bg-white shadow rounded-lg mx-10 py-4 px-12 sm:p-6 xl:p-8  2xl:col-span-2">
                  
                    {hotelXML ? <><div className="text-center flex justify-end">
                        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            onClick={call}>Send to Google</button></div>
                        <div>{hotelXML} </div> </> : <h3>XML being fetched.Please wait.</h3>}


                </div>
            </div>
            <div id="main-content" class="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64">
                <Footer />
            </div>
        </div>
    )
}

export default Propertyxml