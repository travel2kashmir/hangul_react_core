import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { RoomContext } from '../../context/roomprovider';
import { Context } from '../../context/provider'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardAddRoom() {
  //const [actionImage, setActionImage] = useState({})
  const [roomtypes, setRoomtypes] = useState({})
  const [image, setImage] = useState({})
  const [actionImage, setActionImage] = useState({})

  /**To fetch room types **/
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
    fetchRoomtypes();
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

/** Function to submit room images**/
const submitRoomImages = () => {
  console.log("before sort" + JSON.stringify(actionImage))
  const imagedata = [{
      property_id: 't2k001',//to be fetched from context
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
	  const image_data={"image_id": response.data.image_id,"room_id":"r001"}
		const final = { "room_images": [image_data] }
    console.log("the room image"+JSON.stringify(final))
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

                <div className="w-full lg:w-10/12 px-4">
                  <div className="relative w-full mb-3"></div></div>

                <div className="w-full lg:w-2/12 pr-4 pt-4">
                  <div className="relative w-full mb-4">
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
        </div>
        {/* Room Gallery */}
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

                    <div className="w-full lg:w-10/12 px-4"></div>

                    <div className="w-full lg:w-2/12  px-2">
                      <div className="relative w-full mb-4">
                        <button className="sm:inline-flex  text-gray-800 bg-gray-200 hover:bg-gray-400 
                    focus:ring-4 focus:ring-white-200 font-semibold
                     rounded-lg text-sm px-3 py-2 -mt-16  border border-gray-300 text-center 
                     items-center mb-1 ml-16 ease-linear transition-all duration-150"
                          onClick={() => removeImage(imageData?.index)} type="button" >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                          Cancel</button>
                      </div></div>
                  </div>))}

                <div className="flex flex-wrap">
                  <div className="w-full lg:w-10/12 px-4"></div>

                  <div className="w-full lg:w-2/12  px-2">
                    <div className="relative w-full mb-4">
                      <button className="sm:inline-flex  text-white bg-cyan-600 hover:bg-cyan-700 
                    focus:ring-4 focus:ring-cyan-200 font-semibold
                     rounded-lg text-sm px-5 py-2 text-center ml-16
                     items-center mb-1 ease-linear transition-all duration-150"
                     onClick={submitRoomImages} type="button" >
                        Submit</button>
                    </div></div>
                </div>
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

export default CardAddRoom