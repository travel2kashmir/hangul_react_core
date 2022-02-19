import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/provider';
import axios from "axios";
import CardGallery from '../Cards/CardGallery'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RoomSummaryTab(props) {
  const [data] = useContext(Context)
  const [showModal, setShowModal] = React.useState(false);
  const [id, setId] = useState()
  const [roomfacilities, setRoomfacilities] = useState({})
  const [roomimages, setRoomimages] = useState({})
  const [allRoomDetails, setAllRoomDetails] = useState([])
  const [updateroom, setUpdateroom] = useState(false)
  const [image, setImage] = useState({})
  const [updateimage, setUpdateimage] = useState(false)
  const [editimage, setEditimage] = useState(false)
   const [addimage, setAddimage] = useState(false)
   const [modifyimage, setModifyimage] = useState(false)
  const [updatefacilities, setUpdatefacilities] = useState(false)
  const [openTab, setOpenTab] = React.useState(1);
  const [filteredservices, setFilteredservices] = useState([])
  const [filteredimages, setFilteredimages] = useState([])
  const [deleteimage, setDeleteimage] = React.useState(false);
  const [deletefacilities, setDeletefacilities] = React.useState(false);
  var room_id=props.id
  let count = 0;
  
  //For Rooms
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}/${allRoomDetails.room_id}`;
        console.log("room id is " + JSON.stringify(props.id))
        const url = `http://103.136.36.27:7860/jammu-and-kashmir/srinagar/hotels/t2k001/${props.id}`
        console.log("URL " + url)
        const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
        console.log(response.data)
        setAllRoomDetails(response.data)
        console.log("allRoomDetails" + JSON.stringify(allRoomDetails))
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
        console.log("Response from API" + response.data)
        setRoomimages(response.data)
        console.log("image state" + roomimages)
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
    fetchImages();
    fetchServices();
    fetchRoomfacilities();


  }, [])// eslint-disable-next-line

  const filteringimages = () => {
    const data2 = allRoomDetails?.room_images;
    const Uimages = data2.map(i => i.image_link)
    const data1 = roomimages;
    const finaldata = data1.map((i) => {
      const newOne = Uimages?.includes(i.image_link) ?? false
      if (!newOne) {
        return i
      }
    }).filter(i => i !== undefined)
    setFilteredimages(finaldata)
    console.warn("images not selected so far " + JSON.stringify(filteredimages))

  }

  const updateImageDetails = () => {
    const final_data = {
      "property_id": data.property_id,
      "image_title": allRoomDetails.image_title,
      "image_description": allRoomDetails.image_description,
      "image_type": allRoomDetails.image_type
      }
      console.log("the new information " + JSON.stringify(final_data))
      const url = '/images'
      
      axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
        ((response) => {
          console.log(response.data);
          alert('Put successful')
        })
        .catch((response) => {
          console.log(response);
          alert('Put failed')
        })
      
  
   }
  
  const submitDelete = (props) => {
    console.log(JSON.stringify(data))
    alert("id is " + JSON.stringify(props))
    const url = `/${room_id}/${props}`
    alert("url to be hit" + url)
    axios.delete(url).then
      ((response) => {
        console.log(response.data);
        alert('Delete  Successful')
      })
      .catch((response) => {
        console.log(response);
        alert('Delete  Failed')
      })
  }
  const imagessendToDb = (e) => {
    e.preventDefault()
    console.log(JSON.stringify(filteredimages))
    const datas = filteredimages.filter(i => i.check === true)
    const post = datas.map(i => i.image_id)
    console.log(JSON.stringify(post), 'post-images')

    const imageData = post.map((i) => {
        return { "room_id":room_id, image_id: i }
    })
    console.log("image data is " + JSON.stringify(imageData))
    const final = { "room_images": imageData }
    console.log("data sent is " + JSON.stringify(final))
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

}

const facilitiessendToDb = (e) => {
  e.preventDefault()
  console.log("the facilities sent for submission" + JSON.stringify(filteredservices))
  const datas = filteredservices.filter(i => i.check === true) //[ser001,ser002,ser003]
  const post = datas.map(i => i.service_id)//[service_id:ser001,service_id:ser003,service_id:ser003]
  console.log(JSON.stringify(post), 'post')

  const roomfacilitiesData = post.map((i) => {
      return { "room_id":room_id, service_id: i }
  }) //[{room_id:r001,service_id:ser001},{room_id:r001,service_id:ser003},{room_id:r001,service_id:ser003}]

  const final = { "room_facilities": roomfacilitiesData }
  console.log("data sent is " + JSON.stringify(final))
  axios.post('/room-facilities', final, {
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

  }).catch((error) => { console.log(error.response) })

}

const submitServiceDelete = (props) => {
  console.log("submit service delete " + JSON.stringify(data))
  alert("id is " + JSON.stringify(props))
  const url = `/${room_id}/${props}`
  alert("url to be hit" + url)
  axios.delete(url).then
    ((response) => {
      console.log(response.data);
      alert('Delete  Successful')
    })
    .catch((response) => {
      console.log(response);
      alert('Delete  Failed')
    })
}

  const filtering = () => {
    const data2 = allRoomDetails?.room_facilities;
    const Uservices = data2.map(i => i.service_name)
    const data1 = roomfacilities;
    const finaldata = data1.map((i) => {
      const newOne = Uservices?.includes(i.service_value) ?? false
      if (!newOne) {
        return i
      }
    }).filter(i => i !== undefined)
    setFilteredservices(finaldata)


  }

  const submitRoomDescriptionEdit = () => {
    console.log(JSON.stringify(data))
    const final_data = {
      "room_id": props.room_id,
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
    const url = '/basic'
    axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        console.log(response.data);
        alert('Put Basic Details successful')
      })
      .catch((response) => {
        console.log(response);
        alert('Put Basic Details failed')
      })
  }

  return (<>

    <div className="flex flex-wrap">
      <div className="w-full">

        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
          role="tablist"
        >
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 1
                  ? "text-white bg-orange-500"
                  : "text-lightBlue-600 bg-white")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Room Description
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 2
                  ? "text-white bg-orange-500"
                  : "text-lightBlue-600 bg-white")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(2);
                filteringimages();
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              Room Images
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 3
                  ? "text-white bg-orange-500"
                  : "text-lightBlue-600 bg-white")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(3);
                filtering();
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              Room Services

            </a>
          </li>
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">

            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                {updateroom === false ?
                  <div>
                    <div className="text-center flex justify-between">
                      <h6 className="text-blueGray-700 text-xl font-bold mb-5">Room Details</h6>
                    </div>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password">Room name</label>
                          <input
                            type="text"

                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_name} readOnly="readonly"
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password">Room Type</label>
                          <input
                            type="text"

                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_type} readOnly="readonly"
                          />
                        </div>
                      </div>


                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password">Room description</label>
                          <textarea rows="2" columns="60"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_description} readOnly="readonly" />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >Room capacity</label>
                          <input
                            type="text"

                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_capacity} readOnly="readonly"
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Maximum number of occupants</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.maximum_number_of_occupants} readOnly="readonly" />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Minimum number of occupants</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.minimum_number_of_occupants} readOnly="readonly" />
                        </div>
                      </div>



                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Maximum age of occupants</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.minimum_age_of_occupants} readOnly="readonly" />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Length(in feets)</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_length} readOnly="readonly" />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Breadth(in feets)</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_width} readOnly="readonly" />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Height(in feets)</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_height} readOnly="readonly" />
                        </div>
                      </div>


                      
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Carpet Area(square feet) </label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.carpet_area} readOnly="readonly" />

                        </div>
                      </div>

                      
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Volume(cubic feet)</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_volume} readOnly="readonly" />

                        </div>
                      </div>
                    </div>
                    <div className="text-center flex justify-end mt-8"  >
                      <Link to='/rooms'>
                        <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> Back</button>
                      </Link>
                      <button className=" bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150" onClick={() => setUpdateroom(!updateroom)}>Edit</button>
                    </div>
                  </div>
                  :
                  <div>
                    <div className="text-center flex justify-between">
                      <h6 className="text-blueGray-700 text-xl font-bold mb-5">Room Details</h6>
                    </div>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password">Room name</label>
                          <input
                            type="text"

                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_name}
                            onChange={
                              (e) => (
                                  setAllRoomDetails({ ...allRoomDetails, room_name: e.target.value })
                              )
                          }
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password">Room Type</label>
                          <input
                            type="text"

                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_type}
                            onChange={
                              (e) => (
                                  setAllRoomDetails({ ...allRoomDetails, room_type: e.target.value })
                              )
                          }
                          />
                        </div>
                      </div>


                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password">Room description</label>
                          <textarea rows="2" columns="60"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_description} 
                            onChange={
                              (e) => (
                                  setAllRoomDetails({ ...allRoomDetails, room_description: e.target.value })
                              )
                          }/>
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >Room capacity</label>
                          <input
                            type="text"

                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_capacity}
                            onChange={
                              (e) => (
                                  setAllRoomDetails({ ...allRoomDetails, room_capacity: e.target.value })
                              )
                          }
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Maximum number of occupants</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.maximum_number_of_occupants} 
                            onChange={
                              (e) => (
                                  setAllRoomDetails({ ...allRoomDetails, maximum_number_of_occupants: e.target.value })
                              )
                          } />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Minimum number of occupants</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.minimum_number_of_occupants}
                            onChange={
                              (e) => (
                                  setAllRoomDetails({ ...allRoomDetails, minimum_number_of_occupants: e.target.value })
                              )
                          } />
                        </div>
                      </div>



                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Maximum age of occupants</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.minimum_age_of_occupants} 
                            onChange={
                              (e) => (
                                  setAllRoomDetails({ ...allRoomDetails, minimum_age_of_occupants: e.target.value })
                              )
                          }/>
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Length(in feets)</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_length} 
                            onChange={
                              (e) => (
                                  setAllRoomDetails({ ...allRoomDetails, room_length: e.target.value })
                              )
                          }/>
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Breadth(in feets)</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_width}
                            onChange={
                              (e) => (
                                  setAllRoomDetails({ ...allRoomDetails, room_width: e.target.value })
                              )
                          } />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Height(in feets)</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_height}
                            onChange={
                              (e) => (
                                  setAllRoomDetails({ ...allRoomDetails, room_height: e.target.value })
                              )
                          } />
                        </div>
                      </div>


                    </div>
                    <div className="text-center flex justify-end mt-8"  >
                      <button className="bg-blueGray-600  text-white active:bg-blueGray-600  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150" onClick={() => setUpdateroom(!updateroom)}>Cancel</button>

                      <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"  onClick={submitRoomDescriptionEdit} type="button" >Submit</button>
                    </div>
                  </div>
                }
              </div>

              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
               {editimage===false?
               <div>
                {updateimage === false ?
                  <div>
                    <h6 className="text-blueGray-700 text-xl font-bold">Room Gallery</h6><br />
                    <div>{showModal ? (
                      <>
                        <div
                          className="justify-center items-center  flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <div className="relative w-auto my-6 mx-auto max-w-sm">
                            {/*content*/}
                            <div className="border-2 px-2 rounded-lg shadow-lg relative flex flex-col w-full bg-blueGray-600 outline-none focus:outline-none">
                              {/*header*/}
                              {/*body*/}
                              <div className=" p-6  flex-auto">
                                <p className="my-2 text-white text-sm leading-relaxed">
                                  Are you sure, you want to delete?
                                </p>
                              </div>
                              {/*footer*/}
                              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                >
                                  Close
                                </button>
                                <button
                                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => submitDelete(id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                      </>
                    ) : <></>}</div>
                    
                    <div className="flex flex-wrap" style={{ width: "100%" }} >
                      {allRoomDetails?.room_images?.map((item) => {
                        return (

                          <div className="block text-blueGray-600 text-xs font-bold mb-2 " style={{ margin: "10px", marginLeft: "46px" }}>
                            <div className="container grid grid-cols-3 gap-2">
                              <div class="w-full rounded" >
                                <img src={item.image_link} alt='pic_room' style={{ height: "160px", width: "260px" }} />
                              </div>
                            </div>

                            <tr>
                              <td>
                                <h4 class="pl-2 pt-1">{item.image_title}</h4>
                              </td>
                            </tr>
                            
                            {deleteimage === true ?
                              <div className="text-center  flex justify-end">
                               <button onClick={() => {
                                  setId(item.image_id);
                                  setShowModal(true)
                                }}><i className="fas fa-trash  mr-2  text-base"></i>
                              </button>
                              </div>
                              : <></>}
                                {modifyimage === true ?
                              <div className="text-center  flex justify-end">
                               <button onClick={() => 
                                  {setEditimage(!editimage);  setImage(item)
                               }}><i className="fas fa-edit  mr-2  text-base"></i>
                              </button>
                              </div>
                              : <></>}
                          </div>
                        )
                      }
                      )
                      }
                    </div>

                    {deleteimage === false ?
                      <div className="text-center flex justify-end mt-8" >
                        <Link to='/rooms'>
                          <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> Back</button>
                        </Link>
                        
                        <button className=" bg-orange-500 text-white
                         active:bg-orange-500 font-bold uppercase text-xs px-4 py-2
                          rounded shadow hover:shadow-md outline-none focus:outline-none
                           mr-2 mb-1 ease-linear transition-all duration-150"
                          onClick={() => setUpdateimage(!updateimage)}>
                         Add Images</button>
                         <button className=" bg-orange-500 text-white
                         active:bg-orange-500 font-bold uppercase text-xs px-4 py-2
                          rounded shadow hover:shadow-md outline-none focus:outline-none
                           mr-2 mb-1 ease-linear transition-all duration-150"
                          onClick={() => setModifyimage(!modifyimage)}>
                        Edit Images</button>
                        <button className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2
                         rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 
                         ease-linear transition-all duration-150" type="button" 
                         onClick={() => {setDeleteimage(!deleteimage);setModifyimage(!modifyimage)}} >Delete</button>
                      </div>
                      :
                      <div className="text-center flex justify-end mt-8" >
                         
                        <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                        onClick={() => setDeleteimage(!deleteimage)} type="button"> Back</button>
                      </div>
                    }

                  </div>
                  :
                  <div>
                  {addimage === false ?
                  <div>
                    <h6 className="text-blueGray-400 text-sm mt-3  font-bold uppercase">
                      Select Room Images
                    </h6><br />

                    <div className="flex" >
                      {filteredimages?.map(i => {
                        return (

                          <div className="block text-blueGray-600 text-xs font-bold mb-2" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                            <div class="container grid grid-cols-4 gap-2 mx-auto">
                              <div class="w-full rounded" >
                                <img src={i.image_link} alt='pic_room' style={{ height: "160px", width: "260px" }} />
                              </div>
                            </div>
                            <table>
                              <tr>
                                <td>
                                  <input type="checkbox"
                                    onClick={() => {
                                      setFilteredimages(filteredimages.map((item) => {
                                        if (item.image_link === i.image_link) {
                                          item.check = !item.check
                                        }
                                        return item
                                      }))
                                    }}
                                  />

                                </td>
                                <td>
                                  <h4 class="pl-2 pt-1">{i.image_title}</h4>
                                </td>

                              </tr>

                            </table>
                          </div>)
                      })}
                    </div>
                    <div className="relative w-full mb-3">
                      <div className="text-center flex justify-end">
                        <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => setUpdateimage(!updateimage)} type="button"> Cancel</button>
                        <button className=" bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                         onClick={() => setAddimage(!addimage)} >
                         Add More Images</button>
                        <button
                          className='bg-lightBlue-500 text-white 
                          active:bg-lightBlue-600 font-bold uppercase text-xs px-4
                           py-2 rounded shadow hover:shadow-md outline-none
                            focus:outline-none mr-1 mb-1 ease-linear transition-all
                            duration-150'
                            onClick={ imagessendToDb}>Submit </button>
                      </div>
                    </div>
                  </div>
                  :
                   <div>
                   <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                    onClick={() => setAddimage(!addimage)} >Back</button>
                   <CardGallery />
                 </div>
                  
                  }
                 </div>
                }

</div>
:
<div>
   <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Gallery Details</h6>

          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Image Gallery  
            </h6>
          
              <div>
                        
                <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                              <div class="w-full rounded" >
                                <img src={image?.image_link} alt='pic_room' style={{ height: "200px", width: "400px" }} />
                                </div>
                              </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3 mt-6">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Image description 
                    </label>
                    <textarea rows="2" columns="60"
                     
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, 
                            image_category: e.target.value })
                        )
                      }
                      defaultValue={image?.image_description}
                    />
                  </div>
                </div>          
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Image title 
                    </label>
                    <input
                      type="text"
                      defaultValue={image?.image_title}
                      onChange={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, 
                            image_title: e.target.value })
                        )
                      }
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                  </div>
                </div>
              
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Image category  
                    </label>
                    <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                   onChange={
                    (e) => (
                      setAllRoomDetails({ ...allRoomDetails, 
                        image_category: e.target.value })
                    )
                  }
                  >
                      <option selected>Select Image Category</option>
                      <option value="room">Room</option>
                      <option value="hotel">Hotel</option>

                    </select>
                  </div>
                </div>
              </div>
              </div>
           
             <div className="text-center flex justify-end" style={{marginTop:"10px"}}>
             <button className="bg-blueGray-600 text-white
                         active:bg-blueGray-600 font-bold uppercase text-xs
                          px-4 py-2 rounded shadow hover:shadow-md outline-none
                           focus:outline-none mr-1 mb-1 ease-linear transition-all
                            duration-150" type="button" 
                            onClick={() => setEditimage(!editimage)} >Back</button>
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1  mb-1 ease-linear transition-all duration-150"
                     onClick={updateImageDetails}
                    type="button"
                  
                   >
                    Submit
                  </button>
                 
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
          </form>
        </div>
  </div>
}
              </div>

              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                {updatefacilities === false ?
                  <div>
                    <h6 className="text-blueGray-700 text-xl font-bold">Room Services</h6><br />
                     {deletefacilities === false?
                    <div class="flex flex-wrap" style={{ width: "100%" }}>
                      {allRoomDetails?.room_facilities?.map((item) => {
                        return (
                          <div className="block text-blueGray-600 text-sm font-bold mb-2 " style={{ margin: "10px", marginLeft: "46px" }}>
                            <tr style={{ width: "400px" }}>
                              
                              <td >
                                <label
                                  htmlFor="grid-password">{item.service_name.replace(/_+/g, ' ')}</label>

                              </td>

                            </tr>

                          </div>
                        )
                      })

                      }
                    </div>:
 <div className="block w-full overflow-x-auto">
 {/* Projects table */}
 <table className="items-center w-full bg-transparent border-collapse">
   <thead>
     <tr>

       <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
         Sno.
       </th>
       <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
         Service Name
       </th>
       <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
         Service Type
       
         <div>{showModal ? (
           <>
             <div
               className="justify-center items-center flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none"
               onClick={() => setShowModal(false)}
             >
               <div className="relative w-auto my-6 mx-auto max-w-sm">
                 {/*content*/}
                 <div className="border-2 px-2 rounded-lg shadow-lg relative flex flex-col w-full bg-blueGray-600 outline-none focus:outline-none">
                   {/*header*/}
                   {/*body*/}
                   <div className=" p-6  flex-auto">
                     <p className="my-2 text-white text-sm leading-relaxed">
                       Are you sure, you want to delete?
                     </p>
                   </div>
                   {/*footer*/}
                   <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                     <button
                       className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                       type="button"
                       onClick={() => setShowModal(false)}
                     >
                       Close
                     </button>
                     <button
                       className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                       type="button"
                       onClick={() => submitServiceDelete(id)}
                     >
                       Delete
                     </button>
                   </div>
                 </div>
               </div>
             </div>

           </>
         ) : <></>}</div></th>

     </tr>
    
   </thead>
   <tbody>
   
     {roomfacilities?.map((item) => (
       <tr>

         <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
           {count = count + 1} </td>
         <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
           {item?.service_value}
         </td>

         <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
           {item?.service_type}
                    </td>
         <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">

           <button
             className="bg-red-500 text-white active:bg-red-600 text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
             onClick={() => {
               setId(item.service_id);
               setShowModal(true)
             }} type="button"
           >
             Delete
           </button>
         </td>

       </tr>
     ))}
   </tbody>
 </table>
 <div className="text-center flex justify-end mt-8"  >
                       
                       <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                       onClick={() => {

                        setDeletefacilities(!deletefacilities);
                      }} type="button"> Back</button>
                    </div>
</div>
                    }
                    {deletefacilities === true ?
                      <div></div>:
                      <div className="text-center flex justify-end mt-8"  >
                        <Link to='/rooms'>
                          <button 
                          className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs 
                          px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 
                          mb-1 ease-linear transition-all duration-150" type="button"> Back</button>
                        </Link>

                        <button className=" bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                          onClick={() => {

                            setUpdatefacilities(!updatefacilities);
                          }}>
                          Edit</button>
                        <button className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                          onClick={() => {
                            setDeletefacilities(!deletefacilities);
                          }} type="button">Delete Facilities</button>
                      </div>}
                  </div>
                  :
                  <div>
                    <h6 className="text-blueGray-700 text-lg font-bold">Select Room Services</h6><br />
                    <div class="flex flex-wrap" style={{ width: "100%" }}>
                      {filteredservices?.map(i => {
                        return (<div className="block   text-blueGray-600 text-xs font-bold mb-2" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                          <input type="checkbox" class="mr-1"

                            onClick={() => {
                              setFilteredservices(filteredservices.map((item) => {
                                if (item.service_id === i.service_id) {
                                  item.check = !item.check
                                }
                                return item
                              }))

                            }}
                          />

                          {i.service_value.replace(/_+/g, ' ')}

                        </div>)

                      })}
                    </div>
                    <div className="text-center flex justify-end mt-6" style={{ paddingBottom: "10px" }}>
                      <button className="bg-blueGray-600 text-white 
                      active:bg-blueGray-600 font-bold uppercase text-xs 
                      px-4 py-2 rounded shadow hover:shadow-md outline-none 
                      focus:outline-none mr-1 mb-1 ease-linear transition-all 
                      duration-150" onClick={() => setUpdatefacilities(!updatefacilities)} type="button"> Cancel</button>
                      <button className="bg-lightBlue-600 text-white
                       active:bg-lightBlue-600 font-bold uppercase text-xs
                        px-4 py-2 rounded shadow hover:shadow-md outline-none
                         focus:outline-none mr-1 mb-1 ease-linear transition-all
                         duration-150" onClick={facilitiessendToDb} 
                         type="button"  >Submit</button>
                    </div>
                  </div>

                }

              </div>

            </div></div></div>

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
  </>)
}

export default RoomSummaryTab;
