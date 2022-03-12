import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Userlanding() {
    const logged = useSelector(state => state.session);
    const [ownerdata, setOwnerdata] = useState([])
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const url = '/properties/user003';
                const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
                console.log("response" + JSON.stringify(response.data))
                setOwnerdata(response.data)
            }
            catch (error) {
                if (error.response) {
                    console.log("user description" + JSON.stringify(error.response));
                    console.log("status" + JSON.stringify(error.response.status));
                    console.log("header" + JSON.stringify(error.response.headers));
                } else {
                    console.log("error " + error.message);
                }
            }
        }
        fetchProperty();
    }, [])
    
    return (
        <div className='bg-gray-50  pt-8 px-32 pb-72'>
            <div className="mx-auto  flex flex-col justify-center items-center 
    px-4 pt-8   pt:mt-0">
                <span className="self-center text-3xl  mb-4 mt-2 tracking-normal font-bold
         text-gray-700 whitespace-nowrap">Hangul</span>
                <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
                    <div className="p-4 sm:p-8 lg:p- space-y-2">
                        <div >
            <Link to="/" class="hidden sm:inline-flex  float-right ml-5 text-white bg-cyan-600 
              hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold 
              rounded-lg text-sm px-4 py-2 text-center  mr-2">Signout</Link>
                        </div>
                        <div className="text-center mt-16">
                            <p className="capitalize font-semibold text-3xl font-sans mx-16 mt-24 mb-6 text-cyan-500">Welcome {logged?.name}</p>
                        </div>

                        <p className="font-semibold text-lg text-gray-500">List of properties</p>
                        <form className=" space-y-1" action="#">
                            <div class="flex flex-col">
                                <div class="overflow-x-auto">
                                    <div class="align-middle inline-block min-w-full">
                                        <div class="shadow overflow-hidden">
                                            <table class="table-fixed min-w-full divide-y divide-gray-200">
                                                <thead class="bg-gray-100">
                                                    <tr>

                                                        <th scope="col" class="p-4 text-left text-sm font-semibold text-gray-500 uppercase">
                                                            Property Name
                                                        </th>
                                                        <th scope="col" class="p-4 text-left text-sm font-semibold text-gray-500 uppercase">
                                                            Property Type
                                                        </th>
                                                        <th scope="col" class="p-4 text-left text-sm font-semibold text-gray-500 uppercase">
                                                            Status
                                                        </th>
                                                        <th scope="col" class="p-4 text-left text-sm font-semibold text-gray-500 uppercase">
                                                            Action
                                                        </th>
                                                        <th scope="col" class="p-4">
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                    <tr class="hover:bg-gray-100">
                                                        <td class="p-4 whitespace-nowrap text-base font-medium text-gray-900 capitalize">{ownerdata.property_name}</td>

                                                        <td class="p-4 whitespace-nowrap text-base font-medium text-gray-900 capitalize">{ownerdata.property_category}</td>
                                                        <td class="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                                                            <div class="flex items-center">
                                                                <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>Active
                                                            </div>
                                                        </td>
                                                        <td class="p-6 whitespace-nowrap space-x-2">
                                                            <Link to="/basicdetails">
                                                                <button type="button" class="text-white bg-cyan-600
                                             hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg
                                            text-sm inline-flex items-center px-2 py-1.5 text-center">
                                                                    View property
                                                                </button></Link>
                                                        </td>
                                                        <td class="p-6 whitespace-nowrap space-x-2"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ color: "white", background: 'red' }}>


            </div>
            <ToastContainer position="top-center"
                autoClose={10000}
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

export default Userlanding