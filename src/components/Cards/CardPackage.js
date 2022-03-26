import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

function CardPackage(props) {
    //const [packageDetails, setPackageDetails] = useState([])
    const [allPackageDetails, setAllPackageDetails] = useState([])

    useEffect(() => {
        const fetchDetails = async () => {
          try {
            // const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}/${allRoomDetails.room_id}`;
            const url = `http://103.136.36.27:7860/package/${props.package_id.id}`
            console.log("URL " + url)
            const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
            console.log(response.data)
            setAllPackageDetails(response.data)
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
        fetchDetails();
    }, [])

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
                Package Summary
            </h6>
            {/* Body */}
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-3">
                {/* Package Description */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-shrink-0">
                            <span className="text-xl sm:text-xl leading-none capitalize font-bold text-gray-800">{allPackageDetails?.package_name}</span>
                        </div>
                        <div className="flex items-center justify-end flex-1">
                        <Link to={{
                                                    pathname: '/package-description',
                                                    state: {
                                                        id: allPackageDetails
                                                    }
                                                }}
                             className="text-sm font-sans underline decoration-cyan-600
             font-semibold text-cyan-600
              rounded-lg p-2">See More..</Link>
                        </div>
                    </div>
                    <p className="text-base font-semibold text-gray-500 capitalize truncate">
                    {allPackageDetails?.package_name} In Taj Vivanta
                    </p>
                    <p className="text-sm font-medium text-gray-90  line-clamp-10 ">
                    {allPackageDetails?.package_description}  
                    </p>
                    <p className="text-sm capitalize font-semibold text-gray-500 pt-1 truncate">
                        Payment Holder- {allPackageDetails?.charge_currency}  
                    </p>
                    <p className="text-sm font-semibold text-gray-500 my-1 truncate">
                        Refundable till, {allPackageDetails?.refundable_until_days} days {allPackageDetails?.refundable_until_time}
                    </p>
                    <div className="flex my-1">
                        <p className="text-sm font-semibold text-gray-500 truncate">
                        {allPackageDetails?.max_number_of_intended_occupants} Occupants
                        </p>
                        <p className="text-sm font-semibold ml-20 text-gray-500 truncate">
                        {allPackageDetails?.max_number_of_adult_guest} Adults
                        </p>
                    </div>
                    <div className="flex">
                     <span  className="text-sm font-semibold mr-1 text-gray-500">Child Age-</span>
                    {allPackageDetails?.max_age_children?.map((item) => {
                        return (
                            <span className="text-sm font-semibold text-gray-500">
                               {item.max_age_of_child_guest}years<span className="ml-1"></span> 
                            </span>
                        )
                    })}
                    </div>
                </div>

                {/* Package Rates */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-shrink-0">
                            <h3 className="text-base font-bold text-gray-900 mb-4"> Package Rates</h3>
                        </div>
                        <div className="flex items-center justify-end flex-1">
                        <Link to={{
                                                    pathname: '/package-rates',
                                                    state: {
                                                        id: allPackageDetails
                                                    }
                                                }}
                             className="text-sm font-sans underline decoration-cyan-600
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
                                        <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">{allPackageDetails?.base_rate_amount}<span className="ml-1 uppercase"> {allPackageDetails?.base_rate_currency}</span></td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                            <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500"> Tax Rate</td>
                                        </td>
                                        <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">{allPackageDetails?.tax_rate_amount}<span className="ml-1 uppercase"> {allPackageDetails?.tax_rate_currency}</span></td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                            <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500"> Other Charges</td>
                                        </td>
                                        <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">{allPackageDetails?.other_charges_amount}<span className="ml-1 uppercase"> {allPackageDetails?.other_charges_currency}</span></td>
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
                            <Link to={{
                                pathname: '/elite-rewards',
                                state: {
                                    id: allPackageDetails
                                }
                            }}
                                className="text-sm font-sans underline decoration-cyan-600
             font-semibold text-cyan-600
              rounded-lg p-2">See More..</Link>
                        </div>
                    </div>
                    {allPackageDetails?.membership?.map((item) => {
                                            return (
                                                <>
                                <p className="text-sm font-semibold capitalize text-gray-70 truncate">
                                   {item?.program_name}
                                </p>
                                <p className="text-sm capitalize font-semibold text-gray-500 my-2">
                                   { item?.program_level}
                                </p>
                                </>
                                 )
                                })}
    </div>

                {/* Package Miles */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-shrink-0">
                            <h3 className="text-base font-bold text-gray-900 mb-4"> Package Miles</h3>
                        </div>
                        <div className="flex items-center justify-end flex-1">
                           <Link to={{
                                pathname: '/package-miles',
                                state: {
                                    id: allPackageDetails
                                }
                            }}className="text-sm font-sans underline decoration-cyan-600
             font-semibold text-cyan-600
              rounded-lg p-2">See More..</Link>
                        </div>
                    </div>
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {allPackageDetails?.package_miles?.map((item) => {
                                        return (
                                            <>
                                                <tr className="hover:bg-gray-100">
                                                    <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                                        <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500">Number of miles</td>
                                                    </td>
                                                    <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">   {item?.number_of_miles}</td>
                                                </tr>
                                                <tr className="hover:bg-gray-100">
                                                    <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                                        <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500">Miles Provider</td>
                                                    </td>
                                                    <td className="p-1 whitespace-wrap text-xs font-medium text-gray-900">  {item?.provider}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
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
                        <Link to={{
                                pathname: '/property-credit',
                                state: {
                                    id: allPackageDetails
                                }
                            }} className="text-sm font-sans underline decoration-cyan-600
             font-semibold text-cyan-600
              rounded-lg p-2">See More..</Link>
                        </div>
                    </div>
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                {allPackageDetails?.package_property_credit?.map((item) => {
                                            return (
                                                <>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-2 flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                            <td className="p-1 whitespace-wrap text-xs font-semibold text-gray-500">Credit Amount</td>
                                        </td>
                                        <td className="p-1 whitespace-wrap text-xs uppercase font-medium text-gray-900">{item.property_credit_amount}
                                        {''} {item.property_credit_currency}</td>
                                    </tr>
                                    </>
                                 )
                                })}
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