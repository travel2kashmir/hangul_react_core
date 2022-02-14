import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/provider';
import axios from "axios";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";


function RoomSummaryTab(props) {  
  const [data] = useContext(Context)
  const [popoverShow, setPopoverShow] = React.useState(false);
  const btnRef = React.createRef();
  const popoverRef = React.createRef();
  const [roomfacilities, setRoomfacilities] = useState({})
  const [roomimages, setRoomimages] = useState({})
  const [allRoomDetails, setAllRoomDetails] = useState([])
  const [updateroom, setUpdateroom] = useState(false)
  const [updateimage, setUpdateimage] = useState(false)
  const [updatefacilities, setUpdatefacilities] = useState(false)
  const [openTab, setOpenTab] = React.useState(1);
  const [filteredservices,setFilteredservices]=useState([])
  const[filteredimages,setFilteredimages]=useState([])
  const [deleteimage,setDeleteimage]=React.useState(false);
  const [deletefacilities,setDeletefacilities]=React.useState(false);
  
 

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
  const openTooltip = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: "left"
    });
    setPopoverShow(true);
  };
  const closeTooltip = () => {
    setPopoverShow(false);
  };
  const filteringimages = () =>{
    const data2= allRoomDetails?.room_images;
    const Uimages  = data2.map(i=> i.image_link)
    const data1=roomimages;
    const finaldata= data1.map((i)=>{
      const newOne= Uimages?.includes(i.image_link) ?? false
     if(!newOne){
     return i
     }
      }).filter(i=> i !== undefined)   
      setFilteredimages(finaldata)
      console.warn("images not selected so far "+JSON.stringify(filteredimages))
      
    } 

    const filtering = () =>{
      const data2= allRoomDetails?.room_facilities;
      const Uservices  = data2.map(i=> i.service_name)
      const data1=roomfacilities;
      const finaldata= data1.map((i)=>{
        const newOne= Uservices?.includes(i.service_value) ?? false
       if(!newOne){
       return i
       }
        }).filter(i=> i !== undefined)   
        setFilteredservices(finaldata)

        
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
                          />
                        </div>
                      </div>


                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password">Room description</label>
                          <textarea rows="2" columns="60"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_description} />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >Room capacity</label>
                          <input
                            type="text"

                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_capacity}
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Maximum number of occupants</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.maximum_number_of_occupants} />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Minimum number of occupants</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.minimum_number_of_occupants} />
                        </div>
                      </div>



                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Maximum age of occupants</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.minimum_age_of_occupants} />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Length(in feets)</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_length} />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Breadth(in feets)</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_width} />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Height(in feets)</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_height} />
                        </div>
                      </div>


                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Carpet Area(square feet) </label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.carpet_area} />

                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Volume(cubic feet)</label>
                          <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={allRoomDetails?.room_volume} />

                        </div>
                      </div>
                    </div>
                    <div className="text-center flex justify-end mt-8"  >
                      <button className="bg-blueGray-600  text-white active:bg-blueGray-600  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150" onClick={() => setUpdateroom(!updateroom)}>Cancel</button>
                     
                      <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >Submit</button>
                    </div>
                  </div>
                }
              </div>

              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                {updateimage === false ?
                  <div>
                    <h6 className="text-blueGray-700 text-xl font-bold">Room Gallery</h6><br />
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
                             {deleteimage===true?
                               <div className="text-center  flex justify-end"> 
                               <i className="fas fa-trash  mr-2  text-base"></i>
                                </div>
                              :<></>}
                           
                          </div>
                        )
                      }

                      )
                      }
                    </div>

                    {deleteimage===false?
                    <div className="text-center flex justify-end mt-8" >
                    <Link to='/rooms'>
                        <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> Back</button>
                      </Link>
                      <button className=" bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                        onClick={() => setUpdateimage(!updateimage)}>
                        Edit</button>
                      <button className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" type="button"  onClick={() => setDeleteimage(!deleteimage)} >Delete</button>
                    </div>
:
<div className="text-center flex justify-end mt-8" >

    <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => setDeleteimage(!deleteimage)} type="button"> Back</button>
 
  
</div>


}

                  </div>
                  :
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
                  <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"  onClick={() => setUpdateimage(!updateimage)} type="button"> Cancel</button>
                        <button
                          className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        >Submit </button>
              </div>
              </div>
              </div>     
                 }
              </div>

              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                {updatefacilities === false ?
                  <div>
                    <h6 className="text-blueGray-700 text-xl font-bold">Room Services</h6><br />

                    <div class="flex flex-wrap" style={{ width: "100%" }}>
                      {allRoomDetails?.room_facilities?.map((item) => {
                        return (
                          <div className="block text-blueGray-600 text-sm font-bold mb-2 " style={{ margin: "10px", marginLeft: "46px" }}>


                            <tr style={{ width: "400px" }}>
                              <td >
                              {deletefacilities === false ?
                                <>

                                </>:
                              <input type="checkbox">

                              </input> }
                              </td>
                              <td >
                                <label
                                  htmlFor="grid-password">{item.service_name.replace(/_+/g, ' ')}</label>

                              </td>

                            </tr>
                           
                          </div>
                        )
                      })

                      }
                    </div>
                    {deletefacilities === true?
                <div className="text-center flex justify-end mt-8" >
                        <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => setDeletefacilities(!deletefacilities)} type="button"> Back</button>  
                        <button className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                       type="button" >Delete </button>
                      </div> :
                    <div className="text-center flex justify-end mt-8"  >
                    <Link to='/rooms'>
                        <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> Back</button>
                      </Link>
                     
                 <button className=" bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                        onClick={() =>{ 
                          
                        setUpdatefacilities(!updatefacilities);
                        }}>
                        Edit</button>
                      <button className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                       onClick={() =>{  
                        setDeletefacilities(!deletefacilities);
                        }} type="button" >Delete Facilities</button>
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
                  <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"  onClick={() => setUpdatefacilities(!updatefacilities)} type="button"> Cancel</button>
                  <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >Submit</button>
                 </div>
                  </div>
                 
                 }

              </div>

            </div></div></div>

      </div>
    </div>
  </>)
}

export default RoomSummaryTab;
