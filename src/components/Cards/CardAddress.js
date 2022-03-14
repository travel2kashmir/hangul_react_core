import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/provider';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


function CardAddress() {
  const [data] = useContext(Context)
  const [allHotelDetails, setAllHotelDetails] = useState([])

  //Edit Function
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

  useEffect(() => {
    const fetchBasicDetails = async () => {
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


    fetchBasicDetails();


  }, [])

  return (
    <div >

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

      {/* Address Form */}
      <div class="bg-white shadow rounded-lg mx-10 px-12 sm:p-6 xl:p-8  2xl:col-span-2">
        <h6 className="text-xl  flex leading-none pl-6 pt-2 font-bold text-gray-900 ">
          Address
          <svg class="ml-2 h-6 mb-2 w-6 font-semibold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
        </h6>
        {allHotelDetails?.address?.map((item) => {
          return (
            <div class="pt-6 ">
              <div className=" md:px-4 mx-auto w-full">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password">
                        Street Address
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
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
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Landmark
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
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
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        City
                      </label>
                      <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        onChange={
                          (e) => (
                            setAllHotelDetails({ ...allHotelDetails, address_city: e.target.value })
                          )
                        }>
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
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Province/State
                      </label>
                      <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        onChange={
                          (e) => (
                            setAllHotelDetails({ ...allHotelDetails, address_province: e.target.value })
                          )
                        }  >
                        <option value="jammu and kashmir" >Jammu and Kashmir</option>
                        <option value="kargil">Kargil</option>
                        <option value="delhi">Delhi</option>
                        <option value="maharastra">Maharastra</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Latitude
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                     sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600
                      block w-full p-2.5"
                      defaultValue={item.address_latitude} 
                      onChange={
                          (e) => (
                            setAllHotelDetails({ ...allHotelDetails, address_latitude: e.target.value })
                          )
                        } />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Longitude
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        defaultValue={item.address_longitude}
                        onChange={
                          (e) => (
                            setAllHotelDetails({ ...allHotelDetails, address_longitude: e.target.value })
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
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
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Precision
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
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
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Country
                      </label>
                      <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
                        <option value="IN" >India</option>
                        <option value="PK">Pakistan</option>
                        <option value="UN">United States of America</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full ml-4 mb-3"></div></div>
                  <div className="w-full lg:w-2/12 px-4">
                    <div className="relative w-full ml-4 mb-4">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                      <button
                        onClick={submitAddressEdit}
                        className="sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 
                    focus:ring-4 focus:ring-cyan-200 font-semibold
                     rounded-lg text-sm px-5 py-2 text-center 
                     items-center  mr-1 mb-1 ease-linear transition-all duration-150" type="button" >
                        Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
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

export default CardAddress