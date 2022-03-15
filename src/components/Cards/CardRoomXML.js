import React, { useContext, useState, useEffect } from 'react'
import axios from "axios";
import XMLViewer from 'react-xml-viewer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


function CardRoomXML() {
    //const [data] = useContext(Context);
    //  const [roomData]=useContext(RoomContext);
    const [roomXML, setRoomXML] = useState();

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
                // const url = `http://103.136.36.27:7860/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}/${roomData.room_id}/xml`;
                const url = `http://103.136.36.27:7860/jammu-and-kashmir/srinagar/hotels/t2k001/r001/xml`
                console.log("URL " + url)
                const response = await axios.get(url, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
                console.log(response.data)
                setRoomXML(response.data)
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
    }, [])
    const breaker = { "overflowBreak": true }
    return (
        <div>
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
                            <span class="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Rooms XML</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <span class="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Room XML</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <h6 className="text-xl  flex leading-none pl-6 pt-2 pb-6 font-bold text-gray-900 ">
                Room XML
            </h6>
            {/* Property XML Form */}
            <div class="bg-white flex  flex-wrap  sm:px-1 shadow rounded-lg mx-10 py-4 px-12  xl:p-8  2xl:col-span-2">
                {roomXML !== undefined &&
                <div>
                 <div className="text-center flex justify-end">
                            <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 
                        focus:ring-cyan-200 font-semibold rounded-lg text-sm px-4 py-2 text-center items-center mr-14"
                                onClick={call}>Send to Google</button></div>
                        <XMLViewer xml={roomXML} theme={breaker} /></div>
                   }
            </div>
            {/* Toast Container */}
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
    )
}

export default CardRoomXML