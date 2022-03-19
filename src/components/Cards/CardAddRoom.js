import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
//import { RoomContext } from '../../context/roomprovider';
//import { Context } from '../../context/provider'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardAddRoom() {
  //const [actionImage, setActionImage] = useState({})
  const [roomtypes, setRoomtypes] = useState({})
  const [image, setImage] = useState({})
  const [actionImage, setActionImage] = useState({})
  const [services, setServices] = useState([])
  const [roomId, setRoomId] = useState([])
  const [add, setAdd] = useState(0)
  const [modified, setModified] = useState({})
  console.log("empty roomin is"+roomId.length)

  /** To fetch room types **/
  useEffect(() => {
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
    
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://103.136.36.27:7860/additional_services/t2k001', { headers: { 'accept': 'application/json' } });
        console.log(response.data)
        setServices(response.data)
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
    fetchRoomtypes();
    fetchServices();
  }, [])

  /*For Room Description*/
  //const [roomdes, setRoomdes] = React.useContext(RoomContext)
  //const [property] = useContext(Context)
  const [allRoomDes, setAllRoomDes] =
    useState({
      room_name: '',
      room_type_id: '',
      property_id: 't2k001',
      room_description: '',
      room_capacity: '',
      maximum_number_of_occupants: '',
      minimum_number_of_occupants: '',
      minimum_age_of_occupants: '',
      room_length: '',
      room_width: '',
      room_height: ''
    });

  /*const setContext = (room_id) => {
      console.log("into set context")
      const obj = {
          room_id: room_id,
          room_name: allRoomDes.room_name
      }
      console.log("data to be set " + JSON.stringify(obj))
      setRoomdes(obj)
      console.log("the data in context " + JSON.stringify(roomdes))

  }*/

  /**  Submit Function for Room Description **/
  function submitRoomDescription(e) {
    e.preventDefault()
    const finalData = { ...allRoomDes }
    console.log(JSON.stringify(finalData), 'finaldata')
    axios.post('/room', JSON.stringify(finalData),
      {
        headers: { 'content-type': 'application/json' }
      }).then(response => {
        console.log(response.data)
        toast.success("Room created successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRoomId(response.data.room_id)
        //setContext(response.data.room_id)
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
      }
      )
  }

  /** For Images**/
  const imageTemplate = {
    property_id: 't2k001',
    image_link: '',
    image_title: '',
    image_description: '',
    image_category: '',
    imageFile: ''
  }

  /* Mapping Index of each image*/
  const [imageData, setImageData] = useState([imageTemplate]?.map((i, id) => { return { ...i, index: id } }))

  /** Function to add room images**/
  const addPhotos = () => {
    setImageData([...imageData, imageTemplate]?.map((i, id) => { return { ...i, index: id } }))
  }
  /** Function to cancel room images**/
  const removeImage = (index) => {
    console.log("index is" + index)
    const filteredImages = imageData.filter((i, id) => i.index !== index)
    console.log("data sent to state " + JSON.stringify(filteredImages))
    setImageData(filteredImages)
  }
  const onChangePhoto = (e, i) => {
    setImage({ ...image, imageFile: e.target.files[0] })
  }

  /** Function to upload room images**/
  const uploadImage = () => {
    const imageDetails = image.imageFile
    const formData = new FormData();
    formData.append("file", imageDetails);
    formData.append("upload_preset", "Travel2Kashmir")
    axios.post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
      .then(response => {
        console.log(response?.data?.secure_url, 'res')
        setImage({ ...image, image_link: response?.data?.secure_url })
      })
      .catch(error => {
        toast.error("Some thing went wrong in uploading photo\n " + JSON.stringify(error.response.data), {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error('There was an error!', error);
      });

  }

  /** Function to submit room images **/
  const submitRoomImages = () => {
    console.log("before sort" + JSON.stringify(actionImage))
    const imagedata = [{
      /* To be fetched from context */
      property_id: 't2k001',
      image_link: image.image_link,
      image_title: actionImage.image_title,
      image_descripiton: actionImage.image_description,
      image_category: actionImage.image_category
    }]

    const finalImage = { "images": imagedata }
    console.log(JSON.stringify(finalImage))
    axios.post(`/gallery`, finalImage).then(response => {
      console.log(response)
      toast.success(JSON.stringify(response.data.message), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const image_data = { "image_id": response.data.image_id, "room_id": roomId }
      const final = { "room_images": [image_data] }
      console.log("the room image" + JSON.stringify(final))
      axios.post('/room-images', final, {
        headers: { 'content-type': 'application/json' }
      }).then(response => {
        console.log(response)
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
        .catch(error => {
          console.log(error.response)
          toast.error("Some thing went wrong \n " + JSON.stringify(error.response.roomdes), {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }).catch(error => {
      console.log("there is error" + error)
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

 /* Add Existing Services*/
  const submitServices = (e) => {
  e.preventDefault()
   console.log(JSON.stringify(services))
  const datas = services.filter(i => i.check === true)
  const post = datas.map(i => i.add_service_id)
  console.log(JSON.stringify(post), 'post')
    console.log("data is " + JSON.stringify(post))
    const serviceData = post.map((i) => {
      return { "room_id": roomId, add_service_id: i }
    })
    console.log(roomId+"for this time")
    const final = { "additional_services_link": serviceData }
    console.log("data sent is " + JSON.stringify(final))
    axios.post('/additional_services_link', final, {
      headers: { 'content-type': 'application/json' }
    }).then(response => {
      console.log(response)
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

   /*Function to add new additional room service*/
   const newAdditionalService = ()=>
   {
       const final_data ={
           "additional_service": [ {         
           "property_id": 't2k001',
           "add_service_name": modified.add_service_name,
           "add_service_comment": modified.add_service_comment,
           "status": true
       }]}
       console.log("final data is" + JSON.stringify(final_data))
       const url = '/additional_services'
       axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
           ((response) => {
               console.log(response.data);
               toast.success("Room Services Updated Successfully!", {
                   position: "top-center",
                   autoClose: 5000,
                   hideProgressBar: false,
                   closeOnClick: true,
                   pauseOnHover: true,
                   draggable: true,
                   progress: undefined,
               });
             const url2 = '/additional_services_link'
             const final_data2 = {
               "additional_service_link": [{
                 "room_id": roomId,
                 "add_service_id": response.data.add_service_id
               }]
             }
             axios.post(url2, final_data2, { header: { "content-type": "application/json" } }).then
               ((response) => {
                 console.log(response.data);
                 toast.success("Link Updated Successfully!", {
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
                toast.error("Some thing went wrong in Services\n " + JSON.stringify(error.response.data), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
           })
           .catch((error) => {
               console.log(error);
               toast.error("Some thing went wrong in Contacts\n " + JSON.stringify(error.response.data), {
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
              <Link to="/property-rooms" className="text-gray-400 ml-1 md:ml-2 font-medium
               text-sm  " aria-current="page">Property Rooms</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Add new room</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Title */}
      <div className=" pt-2 px-4">
        <h6 className="text-xl pb-4 flex mr-4 leading-none  pt-2 font-bold text-gray-800 ">
          Add Room
        </h6>

        {/* Room Forms */}
        {/* Room Description */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <h6 className="text-base  flex leading-none  pt-2 font-semibold text-gray-800 ">
            Room Description
          </h6>
          <div className="pt-6">
            <div className=" md:px-2 mx-auto w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium text-gray-900 block mb-2"
                      htmlFor="grid-password"
                    >
                      Room Name
                    </label>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      onChange={e => setAllRoomDes({ ...allRoomDes, room_name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="text-sm font-medium text-gray-900 block mb-2"
                      htmlFor="grid-password">
                      Room Type
                    </label>
                    <select
                      onClick={(e) => setAllRoomDes({ ...allRoomDes, room_type_id: e.target.value })}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" >
                      {roomtypes.length === undefined ? <p>loading vallues</p> : <>{roomtypes?.map(i => {
                        return (
                          <option value={i.room_type_id}>{i.room_type_name}</option>)
                      }
                      )}</>}
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium text-gray-900 block mb-2"
                      htmlFor="grid-password"
                    >
                      Room Description
                    </label>
                    <textarea rows="2" columns="50"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      onChange={e => setAllRoomDes({ ...allRoomDes, room_description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium text-gray-900 block mb-2"
                      htmlFor="grid-password"
                    >
                      Room Capacity
                    </label>
                    <input
                      type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      onChange={e => setAllRoomDes({ ...allRoomDes, room_capacity: e.target.value })}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
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
                      onChange={e => setAllRoomDes({ ...allRoomDes, maximum_number_of_occupants: e.target.value })}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
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
                      onChange={e => setAllRoomDes({ ...allRoomDes, minimum_number_of_occupants: e.target.value })}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
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
                      onChange={e => setAllRoomDes({ ...allRoomDes, minimum_age_of_occupants: e.target.value })}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-sm font-medium text-gray-900 block mb-2"
                      htmlFor="grid-password"
                    >
                      Room Length
                    </label>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      onChange={e => setAllRoomDes({ ...allRoomDes, room_length: e.target.value })}
                    /></div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
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
                      onChange={e => setAllRoomDes({ ...allRoomDes, room_width: e.target.value })}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
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
                      onChange={e => setAllRoomDes({ ...allRoomDes, room_height: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                    <button className="sm:inline-flex justify-end  text-white bg-cyan-600 hover:bg-cyan-700 
                    focus:ring-4 focus:ring-cyan-200 font-semibold
                     rounded-lg text-sm px-5 py-2 text-center ml-16
                     items-center mb-1 ease-linear transition-all duration-150"
                      onClick={submitRoomDescription} type="button" >
                      Submit</button>  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Room Gallery*/}
        {roomId.length === 0 ? <></> :
          <>
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mt-4">
              <div className="mx-4">
                <div className="sm:flex">
                  <h6 className="text-base  flex leading-none  pt-2 font-semibold text-gray-800 ">
                    Room Gallery
                  </h6> <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <button type="button" onClick={addPhotos}
                      className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200  font-semibold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                      <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                      Add image
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <div className=" md:px-2 mx-auto w-full">
                  <div>
                    {imageData?.map((imageData, index) => (
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="text-sm font-medium text-gray-900 block mb-2"
                              htmlFor="grid-password"
                            >
                              Image Upload
                            </label>
                            <input
                              type="file"
                              onChange={e => {
                                onChangePhoto(e, 'imageFile');
                                setTimeout(() => { uploadImage(); }, 3000);

                              }}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full px-2.5"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label className="text-sm font-medium text-gray-900 block mb-2"
                              htmlFor="grid-password">
                              Image Title
                            </label>
                            <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                              onChange={(e) => (setActionImage({ ...actionImage, image_title: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4 pb-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="text-sm font-medium text-gray-900 block mb-2"
                              htmlFor="grid-password"
                            >
                              Image Description
                            </label>
                            <textarea rows="2" columns="50"
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                              onChange={(e) => (setActionImage({ ...actionImage, image_description: e.target.value }))}
                            />
                          </div>
                        </div>

                        <div className="w-full lg:w-6/12 px-4 pb-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="text-sm font-medium text-gray-900 block mb-2"
                              htmlFor="grid-password"
                            >
                              Image Category
                            </label>
                            <input
                              type="text" className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                              defaultValue="room" readOnly="readonly"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                          <button className="sm:inline-flex  text-gray-800 bg-gray-200 hover:bg-gray-400 
                    focus:ring-4 focus:ring-white-200 font-semibold
                     rounded-lg text-sm px-3 py-2 -mt-16  border border-gray-300 text-center 
                     items-center mb-1 ml-16 ease-linear transition-all duration-150"
                            onClick={() => removeImage(imageData?.index)} type="button" >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            Cancel</button>
                        </div>
                      </div>))}
                    <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                      <button className="sm:inline-flex  text-white bg-cyan-600 hover:bg-cyan-700 
                    focus:ring-4 focus:ring-cyan-200 font-semibold
                     rounded-lg text-sm px-5 py-2 text-center ml-16
                     items-center mb-1 ease-linear transition-all duration-150"
                        onClick={submitRoomImages} type="button" >
                        Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Services */}
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mt-4">
              <div className="mx-0 my-6">
                <h4 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Room Services</h4>
                <div className="sm:flex">
                  <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                    <form className="lg:pr-3" action="#" method="GET">
                      <label for="users-search" className="sr-only">Search</label>
                      <div className="mt-1 relative lg:w-64 xl:w-96">
                        <input type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search for services">
                        </input>
                      </div>
                    </form>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <button type="button" onClick={() => setAdd(1)} className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200  font-semibold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                      <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                      Add service
                    </button>
                  </div>
                </div>
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
                              Service Description
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {services?.map(i => {
                            return (
                              <tr className="hover:bg-gray-100">
                                <td class="p-4 w-4">
                                  <div class="flex items-center">
                                    <input id="checkbox-1"
                                      onClick={() => {
                                        setServices(services.map((item) => {
                                          if (item.add_service_id === i.add_service_id) {
                                            item.check = !item.check
                                          }
                                          return item
                                        }))
                                      }}
                                      aria-describedby="checkbox-1" type="checkbox" class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                    <label for="checkbox-1" class="sr-only">checkbox</label>
                                  </div>
                                </td>
                                <td className="p-4 flex items-center whitespace-nowrap space-x-6
                                                     mr-12 lg:mr-0">
                                  <td className="p-4 whitespace-nowrap text-base font-medium
                          text-gray-900">{i?.add_service_name}</td>
                                </td>
                                <td className="p-4 capitalize whitespace-wrap text-xs font-medium text-gray-900">
                                  {i?.add_service_comment}
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
              <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                <button className="sm:inline-flex  text-white bg-cyan-600 hover:bg-cyan-700 
                    focus:ring-4 focus:ring-cyan-200 font-semibold
                     rounded-lg text-sm px-5 py-2 text-center
                     items-center mb-1 ease-linear transition-all duration-150"
                  onClick={submitServices} type="button" >
                  Submit</button>
              </div>
            </div>
          </>}
      </div>

      {/* Modal Edit Room Service */}
      <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" id="add-user-modal">
        <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
          <div className="bg-white rounded-lg shadow relative">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">
                Edit Service
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="add-user-modal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label for="first-name" className="text-sm font-medium text-gray-900 block mb-2">Service Name</label>
                  <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label for="last-name" className="text-sm font-medium text-gray-900 block mb-2">Service Description</label>
                  <textarea rows="2" columns="50" name="last-name" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label for="name" className="text-base pr-2 font-semibold text-gray-900 block mb-2">Status</label>
                  <div className="flex">
                    <div className="form-check form-check-inline">
                      <input type="radio"
                        className="form-check-input form-check-input 
                                                         appearance-none rounded-full h-4 w-4 border 
                                                         border-gray-300 
                                                         bg-white checked:bg-blue-600 
                                                         checked:border-blue-600 focus:outline-none
                                                          transition duration-200 mt-2  align-top
                                                           bg-no-repeat bg-center bg-contain float-left
                                                            mr-2 cursor-pointer"
                        value="Active"
                        name="status" id='st' />
                      <label
                        className="form-check-label inline-block 
                                                         text-gray-700 text-base pr-2 "
                        htmlFor="st">
                        Active
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="radio" id='st2' value="Inactive"
                        className="form-check-input form-check-input appearance-none 
                                                   rounded-full h-4 w-4 border border-gray-300
                                                    bg-white checked:bg-blue-600 checked:border-blue-600
                                                     focus:outline-none transition duration-200 mt-2 
                                                      align-top bg-no-repeat bg-center bg-contain float-left mb-2
                                                       mr-1 ml-2 cursor-pointer" name="status" />
                      <label
                        className="form-check-label inline-block text-gray-700 text-base  "
                        htmlFor="st2"
                      >
                        Inactive</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="items-center p-6 border-t border-gray-200 rounded-b">
              <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Update</button>
            </div>

          </div>
        </div>
      </div>

      {/* Modal Add Room Service*/}
      <div className={add === 1 ? 'block' : 'hidden'}>
            <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                    <div className="bg-white rounded-lg shadow relative">
                        <div className="flex items-start justify-between p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold">
                                Add new service
                            </h3>
                            <button type="button" onClick={()=>setAdd(0)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="add-user-modal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label for="first-name" className="text-sm font-medium text-gray-900 block mb-2">Service Name</label>
                                    <input type="text" name="first-name" 
                                    onChange={(e)=>{setModified({...modified,add_service_name:e.target.value})}}
                                    id="first-name" 
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label for="last-name" className="text-sm font-medium text-gray-900 block mb-2">Service Description</label>
                                    <textarea rows="2" columns="50" name="last-name" 
                                    onChange={(e)=>{setModified({...modified,add_service_comment:e.target.value})}}
                                    id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required />
                                </div>
                            </div>
                        </div>

                        <div className="items-center p-6 border-t border-gray-200 rounded-b">
                            <button 
                            onClick={()=>{newAdditionalService(); setAdd(0);}}
                            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg text-sm px-5 py-2.5 text-center" type="submit">
                                Add service</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      {/* Modal Delete Room Service */}
      <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" id="delete-user-modal">
        <div className="relative w-full max-w-md px-4 h-full md:h-auto">
          <div className="bg-white rounded-lg shadow relative">
            <div className="flex justify-end p-2">
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="delete-user-modal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>

            <div className="p-6 pt-0 text-center">
              <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this service?</h3>
              <a href="#" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                Yes, I'm sure
              </a>
              <a href="#" className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" data-modal-toggle="delete-user-modal">
                No, cancel
              </a>
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

export default CardAddRoom