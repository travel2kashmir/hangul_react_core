import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CardRoomsXML from '../components/Cards/CardRoomsXML'
import Footer from '../components/footer'

function Propertyrooms() {
   
    const [allrooms, setAllRooms] = useState([])

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                //const url=`/api/rooms/${data.property_id}`
                const url = '/api/rooms/t2k001'
                const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
                //axios library is used to hit the url which is in 1st argument and headers in 2nd argument,
                //the response from the request is stored in the response variable and response is of the type object
                console.log("response of all rooms" + JSON.stringify(response.data))
                setAllRooms(response.data) //setDash set's value in the state dash
            }//try blocks try to hit using the axios id it fails error block catches the error 
            catch (error) {

                if (error.response) {
                    console.log("data" + JSON.stringify(error.response));
                    console.log("status" + JSON.stringify(error.response.status));
                    console.log("header" + JSON.stringify(error.response.headers));
                } //this block catches the errors from the server with in range of 400's 
                else {
                    console.log("error" + JSON.stringify(error.message));
                }//this block catches the errors other than those in range of 400's
            }

        }
        fetchRooms();
    }
        , [])

    return (
        <div>
             {/* Navbar */}
            <Navbar />
             {/* Sidebar */}
            <Sidebar />
            {/* Body */}
            <div id="main-content" className="pt-24 relative overflow-y-auto lg:ml-64">
                <CardRoomsXML  item={allrooms}/>
            </div>
            {/* Footer */}
            <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64">
                <Footer />
            </div>
             {/* Modal edit */}
             <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0
             md:inset-0 z-50 justify-center items-center h-modal sm:h-full"
                id="edit-user-modal">
                <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                    <div className="bg-white rounded-lg shadow relative">
                        <div className="flex items-start justify-between p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold">
                                Edit image
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="user-modal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <img src="" alt='pic_room' style={{ height: "200px", width: "400px" }} />
                                </div> <div className="col-span-6 sm:col-span-3">
                                    <label
                                        className="text-sm font-medium text-gray-900 block mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Image description
                                    </label>
                                    <textarea rows="2" columns="60" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    />
                                </div> <div className="col-span-6 sm:col-span-3">
                                    <label
                                        className="text-sm font-medium text-gray-900 block mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Image title
                                    </label>
                                    <input type="text" 
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Image Title" />
                                </div><div className="col-span-6 sm:col-span-3">
                                    <label
                                        className="text-sm font-medium text-gray-900 block mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Image category
                                    </label>
                                    <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
                                        <option selected>Select Image Category</option>
                                        <option value="room">Room</option>
                                        <option value="hotel">Hotel</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Add */}
            <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" id="add-user-modal">
                <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                    <div className="bg-white rounded-lg shadow relative">
                        <div className="flex items-start justify-between p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold">
                                Add new image
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="add-user-modal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        className="text-sm font-medium text-gray-900 block mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Image Upload
                                    </label>
                                    <input
                                        type="file"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        defaultValue="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Image title
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Image Title" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        className="text-sm font-medium text-gray-900 block mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Image Description
                                    </label>
                                    <textarea rows="2" columns="60"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        defaultValue="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        className="text-sm font-medium text-gray-900 block mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Image Category
                                    </label>
                                    <input
                                        type="file"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        defaultValue="" />
                                </div>
                            </div>
                        </div>

                        <div className="items-center p-6 border-t border-gray-200 rounded-b">
                            <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="submit">Add image</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Delete */}
            <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" id="delete-user-modal">
                <div className="relative w-full max-w-md px-4 h-full md:h-auto">
                    <div className="bg-white rounded-lg shadow relative">
                        <div className="flex justify-end p-2">
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="delete-user-modal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>

                        <div className="p-6 pt-0 text-center">
                            <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this image?</h3>
                            <a href="#" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                Yes, I'm sure
                            </a>
                            <a href="#" className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" data-modal-toggle="delete-user-modal">
                                No, cancel
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Propertyrooms