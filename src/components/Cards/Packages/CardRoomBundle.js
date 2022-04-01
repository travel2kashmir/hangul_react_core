import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardRoomBundle(props) {
  const [roomDetails, setRoomDetails] = useState([])
  const [roomRateDetails, setRoomRateDetails] = useState([])
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        // const url = `/api/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}/${allRoomDetails.room_id}`;
        const url = `http://103.136.36.27:7860/package/${props.package_room.item.room_bundle_id}`
        console.log("URL " + url)
        const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
        console.log(response.data)
        setRoomDetails(response.data)
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
    fetchRoom();
  }, [])

  /* Edit Package Rate Function */
  const submitRoomRateEdit = () => {
    const final_data = {

      "rate_master_id": roomDetails.rate_master_id,
      "base_rate_currency": roomRateDetails.base_rate_currency,
      "base_rate_amount": roomRateDetails.base_rate_amount,
      "tax_currency": roomRateDetails.tax_currency,
      "tax_amount": roomRateDetails.tax_amount,
      "other_fees_currency": roomRateDetails.other_fees_currency,
      "other_fees_amount": roomRateDetails.other_fees_amount
    }
    console.log("the new information " + JSON.stringify(final_data))
    const url = `/api/package/rate_master`
    axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        console.log(response.data);
        toast.success(("Room Rates updated Successfully!"), {
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
        toast.error("Some thing went wrong in Room Rates\n " + JSON.stringify(error.response.data), {
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

  return (
    <div>
      {/* Header */}
      <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link to="/userlanding" className="text-gray-700 text-base font-medium hover:text-gray-900 inline-flex items-center">
              <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <Link to="/property-summary" className="text-gray-700 text-sm   font-medium hover:text-gray-900 ml-1 md:ml-2">Taj Vivanta</Link>
            </div>
          </li>

          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <Link to="/property-rooms" className="text-gray-700 ml-1 md:ml-2 font-medium
               text-sm  " aria-current="page">Property Packages</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <Link to={{
                pathname: '/property-package',
                state: {
                  id: props?.package_room?.data?.package_id
                }
              }} className="text-gray-700 text-sm   font-medium hover:text-gray-900 ml-1 md:ml-2">
                {props?.package_room?.data?.package_name}
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <Link to={{
               // pathname: '/package-services',
                state: {
                   //id: props?.package_room?.id,
                  
                }
              }}
                className="text-gray-700 ml-1 md:ml-2 font-medium
               text-sm  " aria-current="page">Package Rooms</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <span className="text-gray-400 capitalize ml-1 md:ml-2 font-medium
               text-sm  " aria-current="page">{props?.package_room?.item?.room_name}</span>
            </div>
          </li>

        </ol>
      </nav>
      {/* Title */}
      <div className=" pt-2 px-4">
        <h6 className="text-xl pb-4 flex mr-4 capitalize leading-none  pt-2 font-bold text-gray-800 ">
          {roomDetails.room_name}  
          <svg className="ml-2 h-6 mb-2 w-6 font-semibold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
        </h6>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <h6 className="text-base capitalize flex leading-none  pt-2 font-semibold text-gray-800 ">
            {roomDetails.room_type_name}
          </h6>
          <h5 class="text-base capitalize font-normal text-gray-500">
            {roomDetails.room_description} </h5>
          <div className="pt-6 ">
            <h6 className="text-base capitalize flex leading-none pb-4  pt-4 font-semibold text-gray-800 ">
              Occupancy Details
            </h6>
            <div className=" md:px-4 mx-auto w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium capitalize text-gray-900 block mb-2"
                      htmlFor="grid-password">
                      Maximum number of occupants
                    </label>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      defaultValue={roomDetails.occupancy} readOnly="readonly" />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium text-gray-900 block mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Adult Guests
                    </label>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      defaultValue={roomDetails.number_of_adult_guest} readOnly="readonly" />
                  </div>
                </div>
              </div>
            </div>
            <h6 className="text-base capitalize flex leading-none pb-4  pt-4 font-semibold text-gray-800 ">
              {roomDetails.room_type_name} Rates
            </h6>
            <div className=" md:px-4 mx-auto w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium capitalize text-gray-900 block mb-2"
                      htmlFor="grid-password">
                      Base Rate Currency
                    </label>
                    <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      defaultValue={roomDetails.base_rate_currency}
                      onChange={
                        (e) => (
                          setRoomRateDetails({ ...roomRateDetails, base_rate_currency: e.target.value })
                        )
                      }  >
                      <option value="USD" >USD</option>
                      <option value="INR">INR</option>
                      <option value="Euro">Euro</option>
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium text-gray-900 block mb-2"
                      htmlFor="grid-password"
                    >
                      Base Rate Amount
                    </label>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      defaultValue={roomDetails.base_rate_amount}
                      onChange={
                        (e) => (
                          setRoomRateDetails({ ...roomRateDetails, base_rate_amount: e.target.value })
                        )
                      } />
                  </div>
                </div>
              </div>
            </div>
            <div className=" md:px-4 mx-auto w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium capitalize text-gray-900 block mb-2"
                      htmlFor="grid-password">
                      Tax Rate Currency
                    </label>
                    <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      defaultValue={roomDetails.tax_currency}
                      onChange={
                        (e) => (
                          setRoomRateDetails({ ...roomRateDetails, tax_currency: e.target.value })
                        )
                      }  >
                      <option value="USD" >USD</option>
                      <option value="INR">INR</option>
                      <option value="Euro">Euro</option>
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium text-gray-900 block mb-2"
                      htmlFor="grid-password"
                    >
                      Tax Rate Amount
                    </label>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      defaultValue={roomDetails.tax_amount}
                      onChange={
                        (e) => (
                          setRoomRateDetails({ ...roomRateDetails, tax_amount: e.target.value })
                        )
                      } />
                  </div>
                </div>
              </div>
            </div>
            <div className=" md:px-4 mx-auto w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium capitalize text-gray-900 block mb-2"
                      htmlFor="grid-password">
                      Other Charges Currency
                    </label>
                    <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      defaultValue={roomDetails.other_fees_currency}
                      onChange={
                        (e) => (
                          setRoomRateDetails({ ...roomRateDetails, other_fees_currency: e.target.value })
                        )
                      }   >
                      <option value="USD" >USD</option>
                      <option value="INR">INR</option>
                      <option value="Euro">Euro</option>
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium text-gray-900 block mb-2"
                      htmlFor="grid-password"
                    >
                      Other Charges Amount
                    </label>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      defaultValue={roomDetails.other_fees_amount}
                      onChange={
                        (e) => (
                          setRoomRateDetails({ ...roomRateDetails, other_fees_amount: e.target.value })
                        )
                      } />
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto ">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  <button className="sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 
                    focus:ring-4 focus:ring-cyan-200 font-semibold
                     rounded-lg text-sm px-5 py-2 text-center 
                     mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={submitRoomRateEdit} type="button" >
                    Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Package Room Services*/}
        <div className="bg-white shadow mt-3 rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="mx-0 my-6">
            <h4 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Package Room Services</h4>
          </div>

          {/* Room Services Table */}
          <div className="flex flex-col my-4">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden">
                  <table className="table-fixed min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                        </th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Service Name
                        </th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Active Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {
                        roomDetails?.services?.map((item) => {
                          return (
                            <tr className="hover:bg-gray-100">
                              <td className="p-4 flex items-center whitespace-nowrap space-x-6
                                                     mr-12 lg:mr-0">
                                <td className="p-4 capitalize whitespace-nowrap text-base font-medium
                                                         text-gray-900">{item.local_service_name} </td>
                              </td>
                              <td className="p-4 whitespace-nowrap text-base font-normal 
                                                    text-gray-900">
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 
                                                            mr-2"></div>
                                  Active
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap space-x-2">
                                <button type="button" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font- font-semibold rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                  Edit service
                                </button>
                                <button type="button"

                                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font- font-semibold rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                  Delete service
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default CardRoomBundle