import React, { useState, useContext } from "react";
import Axios from "axios";
import { Context } from '../../context/provider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// components
function CardSettings() {
  
  const [data, setData] = useContext(Context)
  console.log("context"+JSON.stringify(data))
  const [allPropertyDetails, setAllPropertyDetails] =
    useState({
      property_name: '',
      property_brand: '',
      property_category: '',
      established_year: '',
      star_rating: '',
      description_title: '',
      description_body: '',
      description_date: ''
    });
  const [propertyAddress, setPropertyAddress] = useState({
    address_street_address: '',
    address_longitude: '',
    address_latitude: '',
    address_landmark: '',
    address_city: '',
    address_precision: '',
    address_zipcode: '',
    address_province: '',
    address_country: ''
  })

  const setContext = (id) => {
    console.log("into set context")
    const obj = {
      property_id: id,
      property_name: allPropertyDetails.property_name,
      property_category: allPropertyDetails.property_category,
      property_address_country: propertyAddress.address_country,
      property_address_province: propertyAddress.address_province,
      property_address_city: propertyAddress.address_city
    }
    console.log("data to be set " + JSON.stringify(obj))
    setData(obj)
    console.log("the data in context " + JSON.stringify(data))

  }
function validateData({allPropertyDetails})
{ console.log("inside fun"+JSON.stringify(allPropertyDetails));
  if ((allPropertyDetails.star_rating<=7) && (allPropertyDetails.star_rating>=0))
  { console.log("inside if");
    return true
  }
  else
  {
    console.log("inside else");
    return false
  }
}

  function finalHandleSubmit(e) {
    e.preventDefault()
    const result=validateData({allPropertyDetails})
    if(result===true)
    {
      const propertydata = { address: [propertyAddress] }
    const finalData = { ...allPropertyDetails, ...propertydata }
    console.log(JSON.stringify(finalData), 'finaldata')
    Axios.post('/basic', JSON.stringify(finalData),
      {
        headers: { 'content-type': 'application/json' }
      }).then(response => {
        console.log(response.data)
        toast.success("Property created with id " + response.data.property_id, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setContext(response.data.property_id)
      })
      .catch(error => {
        console.log(error.response)
        toast.error("Some thing went wrong \n " + JSON.stringify(error.response.data), {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      });
    }
    else
    {
      toast.error("Value of Star rating must be between 0 to 7", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
  }





  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Basic Details</h6>

          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Property Credentials
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Property Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setAllPropertyDetails({ ...allPropertyDetails, property_name: e.target.value })}
                    placeholder="Enter Property Name"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Property Category
                  </label>
                  <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setAllPropertyDetails({ ...allPropertyDetails, property_category: e.target.value })}>
                    <option selected>Select property type</option>
                    <option value="Hotel" >Hotel</option>
                    <option value="Resort">Resort</option>
                    <option value="Motel">Motel</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Property Brand
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setAllPropertyDetails({ ...allPropertyDetails, property_brand: e.target.value })}
                    placeholder="Brand"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Established Date
                  </label>
                  <input
                    type="Date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setAllPropertyDetails({ ...allPropertyDetails, established_year: e.target.value })}
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Star Rating
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e =>  setAllPropertyDetails({ ...allPropertyDetails, star_rating: e.target.value })}
                    placeholder="Enter Star Rating"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description title
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setAllPropertyDetails({ ...allPropertyDetails, description_title: e.target.value })}
                    placeholder="About us"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea rows="5" columns="50"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setAllPropertyDetails({ ...allPropertyDetails, description_body: e.target.value })}
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description Date
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setAllPropertyDetails({ ...allPropertyDetails, description_date: e.target.value })}
                    defaultValue=""
                  />
                </div>
              </div>



            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Address Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setPropertyAddress({ ...propertyAddress, address_street_address: e.target.value })}
                    placeholder="Street name"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Landmark
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setPropertyAddress({ ...propertyAddress, address_landmark: e.target.value })}
                    placeholder="Near by Landmark"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    City
                  </label>
                  <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setPropertyAddress({ ...propertyAddress, address_city: e.target.value })}>
                    <option selected>Select City</option>
                    <option value="srinagar" >Srinagar</option>
                    <option value="baramulla">Baramulla</option>
                    <option value="budgam">Budgam</option>
                    <option value="pahalgam">Pahalgam</option>
                    <option value="gulmarg">Gulmarg</option>
                  </select>

                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Province/State
                  </label>
                  <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setPropertyAddress({ ...propertyAddress, address_province: e.target.value })}  >
                    <option selected>Select Province/State</option>
                    <option value="jammu and kashmir" >Jammu and Kashmir</option>
                    <option value="kargil">Kargil</option>
                    <option value="delhi">Delhi</option>
                    <option value="maharastra">Maharastra</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Latitude
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setPropertyAddress({ ...propertyAddress, address_latitude: e.target.value })}
                    placeholder="Latitude value" />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Longitude
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => e.target.value <= 180 && e.target.value >= -180 ?
                      setPropertyAddress({
                        ...propertyAddress,
                        address_longitude: e.target.value
                      }) : <p>enter proper value</p>}
                    placeholder="Longitude value"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setPropertyAddress({ ...propertyAddress, address_zipcode: e.target.value })}
                    placeholder="Postal code"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precision
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setPropertyAddress({ ...propertyAddress, address_precision: e.target.value })}
                    placeholder="Precision from location"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Country
                  </label>
                  <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setPropertyAddress({ ...propertyAddress, address_country: e.target.value })}>
                    <option selected>Select Country</option>
                    <option value="IN" >India</option>
                    <option value="PK">Pakistan</option>
                    <option value="UN">United States of America</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>


            <div className="text-center flex justify-between">
             
              <button
                onClick={finalHandleSubmit}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Submit
              </button>
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


          </form>
        </div>
      </div>
    </>
  );
}
export default CardSettings