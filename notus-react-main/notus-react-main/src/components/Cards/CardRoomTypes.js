import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/provider";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Tabs from '../Tabs/RoomTabs'
import 'react-toastify/dist/ReactToastify.css';


export default function CardRoomTypes() {
  const [roomdes, setRoomdes] = useContext(Context);
  
  const [roomtypes, setRoomtypes] = useState([])
  useEffect(() => {
    const fetchRoomtypes = async () => {
      try {
        const response = await axios.get('http://103.136.36.27:5555/room-types', { headers: { 'accept': 'application/json' } });
        console.log("room types " + JSON.stringify(response.data))

        setRoomtypes(response.data)
        //  setRoomdes(response.data)
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

  const sendToDb = (e) => {
    e.preventDefault()

    console.log(JSON.stringify(roomtypes))
    const datas = roomtypes.filter(i => i.check === true)

    console.log("room id s selected " + datas.map(i => i.room_type_id))
    console.log("Datas is " + JSON.stringify(datas))
    //props.setRoomDescription(datas)


  }
  const roomTypeTemp = {
    room_type_id: '', 
    property_id:''
    
  }
  const [roomTypes, setRoomTypes] = useState([roomTypeTemp]?.map((i, id) => { return { ...i, index: id } }))
  const addRoomType = () => {
    setRoomTypes([...roomTypes, roomTypeTemp]?.map((i, id) => { return { ...i, index: id } }))
  }

  const removeRoom = (index) => {
    console.log("index is" + index)
    const filteredRooms = roomTypes.filter((i, id) => i.index !== index)
    console.log("data sent to state " + JSON.stringify(filteredRooms))
    setRoomTypes(filteredRooms)
  }

  const onChange = (e, index, i) => {
    console.log(index + 'index \n ' + i + e.target.value)
    setRoomTypes(roomTypes?.map((item, id) => {
      if (item.index === index) {
        item[i] = e.target.value
      }
      console.log("set in state" + JSON.stringify(item))
      return item

    }))
  }



  return (

    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Room Details</h6>

          </div>
        </div>

        {roomTypes?.map((roomTypes, index) => (
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Property Room Type
                
              </h6>

              <div className="block text-blueGray-600 text-xs font-bold mb-2" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password" >
                  Room Type
                </label>
                <select
                  onChange={e => onChange(e, roomTypes?.index, 'room_type_id')}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" >
                  <option value="Select Room Type">Select Room Type</option>
                  {roomtypes?.map(i => {
                    return (
                      <option value={i.room_type_id}>{i.room_type_name}</option>)
                  }
                  )}
                </select>

              </div>

              <div>
                {roomTypes?.room_type_id ? <><h6 className="text-blueGray-400 text-sm mt-6 mb-4 font-bold uppercase">
                  Property Room Description</h6>

                  <Tabs id={roomTypes?.room_type_id} setRoomTypes={setRoomTypes} roomTypes={roomTypes}/>
                </> : <></>
                } </div>


              <div className="text-center flex justify-end">
                <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button" onClick={() => removeRoom(roomTypes?.index)}
                > -Remove Room </button>
              </div>


            </form>
          </div>




        ))}













        <div className="text-center flex justify-end" style={{ paddingBottom: "20px", marginTop: "-30px" }}>

          <button
            onClick={addRoomType}
            className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"

          >
            +Add Room
          </button>

          <button
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={sendToDb}
            type="button"
          >
            Submit
          </button>
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

    </>
  );
}
