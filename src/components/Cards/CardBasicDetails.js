import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../context/provider';

function CardBasicDetails() {
  const [data] = useContext(Context)
  const [allHotelDetails, setAllHotelDetails] = useState([])

  /* Edit Basic Details Function */
  const submitBasicEdit = () => {
    console.log(JSON.stringify(data))
    const final_data = {
        "property_id": data.property_id,
        "property_name": allHotelDetails.property_name,
        "property_category": allHotelDetails.property_category.toLowerCase(),
        "property_brand": allHotelDetails.property_brand,
        "established_year": allHotelDetails.established_year,
        "star_rating": allHotelDetails.star_rating,
        "description_title": allHotelDetails.description_title,
        "description_body": allHotelDetails.description_body,
        "description_date": allHotelDetails.description_date
    }
    console.log("the new information " + JSON.stringify(final_data))
    const url = '/basic'
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
            toast.error("Some thing went wrong in Basic Details\n " + JSON.stringify(error.response.data), {
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

/* Function to fetch basic basic details when page loads*/
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
              <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Basic Details</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Basic Details Form */}
      <div className="bg-white shadow rounded-lg mx-10 px-12 sm:p-6 xl:p-8  2xl:col-span-2">
        <h6 className="text-xl flex leading-none pl-6 pt-2 font-bold text-gray-900 mb-2">
          Basic Details
          <svg className="ml-2 h-6 mb-2 w-6 font-semibold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
        </h6>
        <div className="pt-6">
          <div className=" md:px-4 mx-auto w-full">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="text-sm font-medium text-gray-900 block mb-2"
                    htmlFor="grid-password"
                  >
                    Property Name
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    defaultValue={allHotelDetails?.property_name}
                    onChange={
                        (e) => (
                            setAllHotelDetails({ ...allHotelDetails, property_name: e.target.value })
                        )
                    }
                 />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2"
                    htmlFor="grid-password">
                    Property Category
                  </label>
                  <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                   defaultValue={allHotelDetails?.property_category}
                  onChange={
                    (e) => (
                        setAllHotelDetails({ ...allHotelDetails, property_category: e.target.value })
                    )
                }
                  >
                    <option value="hotel" >Hotel</option>
                    <option value="resort">Resort</option>
                    <option value="motel">Motel</option>
                  </select>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="text-sm font-medium text-gray-900 block mb-2"
                    htmlFor="grid-password"
                  >
                    Property Brand
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    defaultValue={allHotelDetails?.property_brand}
                    onChange={
                        (e) => (
                            setAllHotelDetails({ ...allHotelDetails, property_brand: e.target.value })
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
                    Established Date
                  </label>
                  <input
                    type="Date"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    defaultValue={allHotelDetails?.established_year}
                    onChange={
                        (e) => (
                            setAllHotelDetails({ ...allHotelDetails, established_year: e.target.value })
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
                    Star Rating
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    Value={allHotelDetails?.star_rating}
                    onChange={
                        (e) => (
                            setAllHotelDetails({ ...allHotelDetails, star_rating: e.target.value })
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
                    Description title
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    Value={allHotelDetails?.description_title}
                    onChange={
                        (e) => (
                            setAllHotelDetails({ ...allHotelDetails, description_title: e.target.value })
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
                    Description
                  </label>
                  <textarea rows="5" columns="50"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    onChange={
                      (e) => (
                          setAllHotelDetails({ ...allHotelDetails, description_body: e.target.value })
                      )
                  }
                  defaultValue={allHotelDetails?.description_body} 
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="text-sm font-medium text-gray-900 block mb-2"
                    htmlFor="grid-password"
                  >
                    Description Date
                  </label>

                  <input id="today"
                    type="date"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    onChange={
                      (e) => (
                          setAllHotelDetails({ ...allHotelDetails, description_date: e.target.value })
                      )
                  } 
                   defaultValue={allHotelDetails?.description_date}
                 />
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
                  <button
                    onClick={submitBasicEdit}
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

export default CardBasicDetails