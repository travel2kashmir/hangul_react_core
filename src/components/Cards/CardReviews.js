import React,  { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { Context } from '../../context/provider';

function CardReviews() {
    const [data] = useContext(Context)
    const [allHotelDetails, setAllHotelDetails] = useState({})
   
     /* Function call to fetch Property Reviews when page loads */
    useEffect(() => {
        const fetchPropertyDetails = async () => {
       
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
              console.log("data" + error.response);
              console.log("status" + error.response.status);
              console.log("header" + error.response.headers);
            } else {
              console.log("error" + error.message);
            }
          }
        }
        fetchPropertyDetails();
      }, [])
    
   
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
                            <span class="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Reviews</span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* Header */}
            <div class="mx-4">
                <h1 class="text-xl sm:text-2xl font-semibold mb-2 text-gray-900">Reviews</h1>
            </div>

            {/* Form */}
            <div class="bg-white shadow rounded-lg mx-6 px-8 sm:p-6 xl:p-8  2xl:col-span-2">
                <div class="pt-2">
                    <div className=" md:px-4 mx-auto w-full ">
                        {allHotelDetails?.Reviews?.map((item) => (
                            <div  class="border-b-2 py-8 border-cyan-600">
                              
                                <div class="flex items-center justify-between mb-2">
                                    <div>
                                        <span class="text-xl sm:text-xl leading-none font-bold text-gray-900">{item?.review_author}</span>
                                        <h3 class="text-base font-normal text-gray-500">{item?.review_date}</h3>
                                    </div>
                                    <div class="flex-shrink-0">
                                    <div class="flex items-center justify-end flex-1 mr-10 text-cyan-600 text-lg font-bold">
                                        {item?.review_rating}
                                    </div>
                                </div>
                                </div>
                                <p class="text-sm text-gray-500 ">
                                   {item?.review_content}
                                </p>
                          
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardReviews