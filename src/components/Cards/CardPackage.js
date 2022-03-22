import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function CardPackage() {
    //const [packageDetails, setPackageDetails] = useState([])
    return (
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
                            <Link to="" className="text-gray-700 text-sm   font-medium hover:text-gray-900 ml-1 md:ml-2">Property Packages</Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Honeymoon Package</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <h6 className="text-xl pb-4 flex mr-4 leading-none  pt-2 font-bold text-gray-800 ">
                Property Summary
            </h6>
            {/* Body */}
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-3">
                {/* Package Description */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-shrink-0">
                            <span className="text-xl sm:text-xl leading-none font-bold text-gray-800">Honeymoon Package</span>
                           </div>
                        <div className="flex items-center justify-end flex-1">
                            <Link to="/package-description" className="text-sm font-sans underline decoration-cyan-600
             font-semibold text-cyan-600
              rounded-lg p-2">See More..</Link>
                        </div>
                    </div>
                    <p className="text-base font-semibold text-gray-500 truncate">
                       Honeymoon Package In India
                    </p>
                    <p className="text-sm font-medium text-gray-90  line-clamp-10 ">
                     If you are planning your first romantic vacation then, we have a loads of 
                     honeymoon packages on offer. No country gives you options often more places and ways to spend
                     your first few days together, than India.
                    </p>
                    <p className="text-sm font-semibold text-gray-500 pt-1 truncate">
                      Payment Holder- Web
                    </p>
                    <p className="text-sm font-semibold text-gray-500 my-1 truncate">
                     Refundable till, 3 days 01:00:00
                    </p>
                    <div className="flex my-1">
                   <p className="text-sm font-semibold text-gray-500 truncate">
                     5 Occupants
                    </p>
                    <p className="text-sm font-semibold ml-20 text-gray-500 truncate">
                    4 Adults
                    </p>  
                    </div>
                    <p className="text-sm font-semibold  text-gray-500 truncate">
                   Maximum age of children- 5
                    </p>
                </div>

                {/* Package Rates */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-shrink-0">
                            <h3 className="text-base font-bold text-gray-900 mb-4"> Package Rates</h3>
                        </div>
                        <div className="flex items-center justify-end flex-1">
                            <Link to="/package-rates" className="text-sm font-sans underline decoration-cyan-600
             font-semibold text-cyan-600
              rounded-lg p-2">See More..</Link>
                        </div>
                    </div>
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                            <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500"> Base Rate</td>
                                        </td>
                                        <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">300USD</td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                            <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500"> Tax Rate</td>
                                        </td>
                                        <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">30USD</td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                            <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500"> Other Charges</td>
                                        </td>
                                        <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">10USD</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Package Services */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-shrink-0">
                            <h3 className="text-base font-bold text-gray-900 mb-4">Package Services</h3>
                        </div>
                        <div className="flex items-center justify-end flex-1">
                            <Link to="/package-services" className="text-sm font-sans underline decoration-cyan-600
             font-semibold text-cyan-600
              rounded-lg p-2">See More..</Link>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <tr>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2 ">Internet Available</button>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Free Breakfast </button>
                        </tr><br />
                        <tr>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Parking </button>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Airport Transportation</button>
                        </tr><br />
                        <tr>
                            <button className="text-sm  font-semibold  text-cyan-700 
                            bg-gray-200 rounded-lg p-2 mx-1  mb-2">Car Rental</button>
                           
                        </tr><br />
                 </div>    
                </div>   
            </div>
            
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-3">
                {/* Elite Membership Benefits */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center justify-between mb-4">
                    <div className="flex-shrink-0">
                            <h3 className="text-base font-bold text-gray-900 mb-4">Elite Membership Rewards</h3>
                        </div>
                        <div className="flex items-center justify-end flex-1">
                            <Link to="/elite-rewards" className="text-sm font-sans underline decoration-cyan-600
             font-semibold text-cyan-600
              rounded-lg p-2">See More..</Link>
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-70 truncate">
                      Special Rewards
                    </p>
                    <p className="text-sm font-semibold text-gray-500 my-2">
                     Platinium
                    </p>
                </div>

                {/* Package Miles */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-shrink-0">
                            <h3 className="text-base font-bold text-gray-900 mb-4"> Package Miles</h3>
                        </div>
                        <div className="flex items-center justify-end flex-1">
                            <Link to="/package-miles" className="text-sm font-sans underline decoration-cyan-600
             font-semibold text-cyan-600
              rounded-lg p-2">See More..</Link>
                        </div>
                    </div>
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                            <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500">Number of miles</td>
                                        </td>
                                        <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">1000</td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                            <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500">Miles Provider</td>
                                        </td>
                                        <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">United Airlines</td>
                                    </tr>
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Property Credit */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-shrink-0">
                            <h3 className="text-base font-bold text-gray-900 mb-4">Property Credit</h3>
                        </div>
                        <div className="flex items-center justify-end flex-1">
                            <Link to="/property-credit" className="text-sm font-sans underline decoration-cyan-600
             font-semibold text-cyan-600
              rounded-lg p-2">See More..</Link>
                        </div>
                    </div>
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                            <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500">Credit Amount</td>
                                        </td>
                                        <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">1000 USD</td>
                                    </tr>
                                    </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
                
            </div>
        </div>
    )
}

export default CardPackage