import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../states/index';
function Userlanding() {
    const logged = useSelector(state => state.session);
    const [ownerdata, setOwnerdata] = useState([])
    const dispatch = useDispatch();
    const { signout } = bindActionCreators(actionCreators, dispatch)
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const url = '/api/properties/user003';
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
        <div className='bg-gray-50  pt-8 lg:px-32 sm:px-1 pb-72'>
            <div className="mx-auto  flex flex-col justify-center items-center 
    px-4 pt-8   pt:mt-0">
                <span className="self-center text-3xl  mb-4 mt-2 tracking-normal font-bold
         text-gray-700 whitespace-nowrap">Hangul</span>
                <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
                    <div className="p-4 sm:p-8 lg:p-space-y-2">
                        <div >
                            <Link to="/" className=" float-right ml-5 text-white bg-cyan-600 
              hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold 
              rounded-lg text-sm px-4 py-2 text-center  mr-2">
                                <button onClick={() => { signout('') }}
                                    type="button">
                                    Signout</button>


                            </Link>
                        </div>
                        <div className="text-center mt-16">
                            <p className="capitalize font-semibold text-3xl font-sans sm:mt-12 mx-12 mt-24 mb-6 text-cyan-500">Welcome {logged?.name}</p>
                        </div>
                        <p className="font-semibold text-lg text-gray-500">List of properties</p>
                        <form className=" space-y-1" action="#">
                            <div className="flex flex-col">
                                <div className="overflow-x-auto">
                                    <div className="align-middle inline-block min-w-full">
                                        <div className="shadow overflow-hidden">
                                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>

                                                        <th scope="col" className="p-1 text-left text-sm font-semibold text-gray-500 uppercase">
                                                            Property Name
                                                        </th>
                                                        <th scope="col" className="p-1 text-left text-sm font-semibold text-gray-500 uppercase">
                                                            Property Type
                                                        </th>
                                                        <th scope="col" className="p-1 text-left text-sm font-semibold text-gray-500 uppercase">
                                                            Status
                                                        </th>
                                                        <th scope="col" className="p-1 text-left text-sm font-semibold text-gray-500 uppercase">
                                                            Action
                                                        </th>

                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr className="hover:bg-gray-100">
                                                        <td className="p-1 whitespace-nowrap text-base font-medium text-gray-900 capitalize">{ownerdata.property_name}</td>
                                                        <td className="p-1 whitespace-nowrap text-base font-medium text-gray-900 capitalize">{ownerdata.property_category}</td>
                                                        <td className="p-1 whitespace-nowrap text-base font-normal text-gray-900">
                                                            <div className="flex items-center">
                                                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>Active
                                                            </div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap space-x-1">
                                                            <Link to="/property-summary">
                                                                <button type="button" className="text-white bg-cyan-600
                                             hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg
                                            text-sm inline-flex items-center px-2 py-1.5 text-center">
                                                                    View
                                                                </button></Link>
                                                        </td>

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