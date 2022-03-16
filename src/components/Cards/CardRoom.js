import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function CardRoom(props) {
  const [allRoomDetails, setAllRoomDetails] = useState([])
  const [roomfacilities, setRoomfacilities] = useState({})
  const [roomimages, setRoomimages] = useState({})
  const [roomtypes, setRoomtypes] = useState([])
  const [actionImage, setActionImage] = useState({})
  const [deleteImage, setdeleteImage] = useState(0)
  const [editImage, setEditImage] = useState(0)

  const updateImageDetails = () => {
    const final_data = {
        "image_id": actionImage?.image_id,
        "image_title": allRoomDetails.image_title,
        "image_description": allRoomDetails.image_description,
        "image_type": allRoomDetails.image_type
    }
    console.log("the new information " + JSON.stringify(final_data))
    const url = '/images'

    axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
        ((response) => {

            setEditImage(0);
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
            toast.error("Some thing went wrong in Edit\n " + JSON.stringify(error.response.data), {
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
 
const submitDelete = () => {

  const url = `/${actionImage.image_id}`
  axios.delete(url).then
      ((response) => {
          console.log(response.data);
          setdeleteImage(0)
          toast.success("Image deleted successfully", {
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
          toast.error("Some thing went wrong in Delete\n " + JSON.stringify(error.response.data), {
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
    const fetchDetails = async () => {
      try {
        // const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}/${allRoomDetails.room_id}`;
        const url = `http://103.136.36.27:7860/jammu-and-kashmir/srinagar/hotels/t2k001/r001`
        console.log("URL " + url)
        const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
        console.log(response.data)
        setAllRoomDetails(response.data)
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

   
  

    const fetchRoomfacilities = async () => {
      try {
        // const url = `/room-services/${data.property_id}`;
        const url = `/room-services/t2k001`; //fetches all room type services of hotel
        const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
        console.log("room facilities " + JSON.stringify(response.data))
        setRoomfacilities(response.data)
      }
      catch (error) {
        if (error.response) {
          console.log("roomdes" + JSON.stringify(error.response));
          console.log("status" + JSON.stringify(error.response.status));
          console.log("header" + JSON.stringify(error.response.headers));
        } else {
          console.log("error" + error.message);
        }
      }

    }
    const fetchImages = async () => {
      try {
        //const url = `/images/${data.property_id}`;
        const url = `/images/t2k001`;
        const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
        console.log("Response from API" + JSON.stringify(response.data))
        setRoomimages(response.data)
        console.log("image state" + JSON.stringify(roomimages))
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

    const fetchRoomtypes = async () => {
      try {
        const response = await axios.get('/room-types', { headers: { 'accept': 'application/json' } });
        console.log("room types " + JSON.stringify(response.data))

        setRoomtypes(response.data)

      }
      catch (error) {
        if (error.response) {
          toast.error("Some thing went wrong \n " + JSON.stringify(error.response), {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log("data" + JSON.stringify(error.response));
          console.log("status" + JSON.stringify(error.response.status));
          console.log("header" + JSON.stringify(error.response.headers));
        } else {
          console.log("error" + error.message);
          toast.error("Some thing went wrong \n " + JSON.stringify(error.message), {
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

    }


    fetchRoomtypes();
    fetchImages();
    fetchDetails();
    fetchRoomfacilities();
  }, [])

  const submitRoomDescriptionEdit = () => {
    const final_data = {
      "room_id": 'r001',
      "room_name": allRoomDetails.room_name,
      "room_type_id": allRoomDetails.room_type_id,
      "room_description": allRoomDetails.room_description,
      "room_capacity": allRoomDetails.room_capacity,
      "maximum_number_of_occupants": allRoomDetails.maximum_number_of_occupants,
      "minimum_number_of_occupants": allRoomDetails.minimum_number_of_occupants,
      "minimum_age_of_occupants": allRoomDetails.minimum_age_of_occupants,
      "room_length": allRoomDetails.room_length,
      "room_width": allRoomDetails.room_width,
      "room_height": allRoomDetails.room_height

    }

    console.log("the new information " + JSON.stringify(final_data))
    const url = '/room'
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
        toast.error("Some thing went wrong\n " + JSON.stringify(error.response.data), {
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
              <span class="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Property Rooms</span>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <span class="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Delux Delight Room</span>
            </div>
          </li>
        </ol>
      </nav>
      <div class=" pt-2 px-4">
        <h6 className="text-xl pb-4 flex mr-4 leading-none  pt-2 font-bold text-gray-800 ">
          Room
          <svg class="ml-2 h-6 mb-2 w-6 font-semibold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
        </h6>
        {/* Room Forms */}
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {/* Room Description */}
          <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <h6 className="text-base  flex leading-none  pt-2 font-semibold text-gray-800 ">
              Room Description
            </h6>
            <div class="pt-6">
              <div className=" md:px-2 mx-auto w-full">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Room Name
                      </label>
                      <input
                        type="text"
                        defaultValue={allRoomDetails?.room_name}
                        onChange={
                          (e) => (
                            setAllRoomDetails({ ...allRoomDetails, room_name: e.target.value })
                          )
                        }
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password">
                        Room Type
                      </label>
                      <select
                        defaultValue={allRoomDetails?.room_type_name}
                        onClick={(e) => setAllRoomDetails({ ...allRoomDetails, room_type_id: e.target.value })}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" >
                        <option value={allRoomDetails?.room_type_id}>{allRoomDetails?.room_type}</option>
                        {roomtypes?.map(i => {
                          return (
                            <option value={i.room_type_id}>{i.room_type_name}</option>)
                        }
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Room Description
                      </label>
                      <textarea rows="2" columns="50"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        onChange={
                          (e) => (
                            setAllRoomDetails({ ...allRoomDetails, room_description: e.target.value })
                          )
                        }
                        defaultValue={allRoomDetails?.room_description}
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Room Capacity
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        defaultValue={allRoomDetails?.room_capacity}
                        onChange={
                          (e) => (
                            setAllRoomDetails({ ...allRoomDetails, room_capacity: e.target.value })
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Maximum Number of Occupants
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        defaultValue={allRoomDetails?.maximum_number_of_occupants}
                        onChange={
                          (e) => (
                            setAllRoomDetails({ ...allRoomDetails, maximum_number_of_occupants: e.target.value })
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Minimum Number of Occupants
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        defaultValue={allRoomDetails?.minimum_number_of_occupants}
                        onChange={
                          (e) => (
                            setAllRoomDetails({ ...allRoomDetails, minimum_number_of_occupants: e.target.value })
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Maximum age of Occupants
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        defaultValue={allRoomDetails?.minimum_age_of_occupants}
                        onChange={
                          (e) => (
                            setAllRoomDetails({ ...allRoomDetails, minimum_age_of_occupants: e.target.value })
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Room Length
                      </label>
                      <input
                        type="text" defaultValue={allRoomDetails?.room_length}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        onChange={
                          (e) => (
                            setAllRoomDetails({ ...allRoomDetails, room_length: e.target.value })
                          )
                        }
                      /></div>
                  </div>

                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Room Breadth
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        defaultValue={allRoomDetails?.room_width}
                        onChange={
                          (e) => (
                            setAllRoomDetails({ ...allRoomDetails, room_width: e.target.value })
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Room Height
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        onChange={
                          (e) => (
                            setAllRoomDetails({ ...allRoomDetails, room_height: e.target.value })
                          )
                        }
                        defaultValue={allRoomDetails?.room_height} />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Room Area
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        defaultValue={allRoomDetails?.carpet_area} readOnly="readonly"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="grid-password"
                      >
                        Room Volume
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        defaultValue={allRoomDetails?.room_volume} readOnly="readonly" />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-3"></div></div>
                  <div className="w-full lg:w-4/12 px-2">
                    <div className="relative w-full ml-4 mb-1"></div></div>
                  <div className="w-full lg:w-2/12 pr-4 pt-2">
                    <div className="relative w-full mb-4">
                      <button className="sm:inline-flex  text-white bg-cyan-600 hover:bg-cyan-700 
                    focus:ring-4 focus:ring-cyan-200 font-semibold
                     rounded-lg text-sm px-5 py-2 text-center 
                     items-center mb-1 ease-linear transition-all duration-150"
                        onClick={submitRoomDescriptionEdit} type="button" >
                        Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Room Gallery */}
          <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <h6 className="text-base  flex leading-none  pt-2 font-semibold text-gray-800 ">
              Room Gallery
            </h6>
            <div className="flex flex-wrap" >
              {allRoomDetails?.room_images?.map((item) => {
                return (
                  <div className="block text-blueGray-600 text-xs pt-2 px-2 ">
                    <img src={item.image_link} alt='pic_room' style={{ height: "170px", width: "210px" }} />
                    <table>
                      <tr>
                        <td className="flex justify-end">
                          <button onClick={()=>{setEditImage(1); setActionImage(item)}} className="text-gray-500  mt-1 hover:text-gray-900 
                                           cursor-pointer p-1 hover:bg-gray-100 rounded ">
                            <svg className=" h-5 mb-2 w-5 font-semibold "
                              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                          </button>
                          <button onClick={()=>{setdeleteImage(1); setActionImage(item)}} className="text-gray-500 mt-1 hover:text-gray-900
                                           cursor-pointer p-1 hover:bg-gray-100 rounded">
                            <svg className="  w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

               {/* Modal edit */}
            <div className={editImage === 1 ? 'block' : 'hidden'}>
                <div class="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                    <div class="relative w-full max-w-2xl px-4 h-full md:h-auto">
                        <div class="bg-white rounded-lg shadow relative">
                            <div class="flex items-start justify-between p-5 border-b rounded-t">
                                <h3 class="text-xl font-semibold">
                                    Edit image
                                </h3>
                                <button type="button"
                                    onClick={() => setEditImage(0)}
                                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="user-modal">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                            <div class="p-6 space-y-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <img src={actionImage?.image_link} alt='pic_room' style={{ height: "200px", width: "400px" }} />
                                    </div> <div class="col-span-6 sm:col-span-3">
                                        <label
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Image description
                                        </label>
                                        <textarea rows="6" columns="60"

                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            onChange={
                                                (e) => (
                                                    setAllRoomDetails({
                                                        ...allRoomDetails,
                                                        image_description: e.target.value
                                                    })
                                                )
                                            }
                                            defaultValue={actionImage?.image_description}
                                        />
                                    </div> <div class="col-span-6 sm:col-span-3">
                                        <label
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Image title
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={actionImage?.image_title}
                                            onChange={
                                                (e) => (
                                                    setAllRoomDetails({
                                                        ...allRoomDetails,
                                                        image_title: e.target.value
                                                    })
                                                )
                                            }
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            placeholder="Image Title" />
                                    </div>

                                </div>
                            </div>
                            <div class="items-center p-6 border-t border-gray-200 rounded-b">
                                <button
                                    onClick={updateImageDetails}
                                    class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    type="submit">Edit image</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        {/* Modal Delete */}
        <div className={deleteImage === 1 ? 'block' : 'hidden'}>
                <div class="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                    <div class="relative w-full max-w-md px-4 h-full md:h-auto">
                        <div class="bg-white rounded-lg shadow relative">
                            <div class="flex justify-end p-2">
                                <button
                                    onClick={() => setdeleteImage(0)}
                                    type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="delete-user-modal">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>

                            <div class="p-6 pt-0 text-center">
                                <svg class="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">
                                    Are you sure you want to delete {actionImage?.image_title} image?
                                </h3>
                                <button onClick={() => submitDelete()} class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                    Yes, I'm sure
                                </button>
                                <button
                                    onClick={() => setdeleteImage(0)}
                                    class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" data-modal-toggle="delete-user-modal">
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default CardRoom