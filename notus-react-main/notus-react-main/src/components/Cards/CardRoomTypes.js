import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/provider";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CardRoomTypes(props) {
  const [roomdes, setRoomdes] = useContext(Context);
  const data = { "property_id": "t2k0092" }
  console.log("property_id in room_types is " + data.property_id)
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
    props.setRoomDescription(datas)


  }

  return (

    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Room Types</h6>

          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Property Room Types
            </h6>
            <div className="flex" style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
            {roomtypes?.map(i => {
              return (
                <div className="block   text-blueGray-600 text-xs font-bold mb-2" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                  <input type="checkbox"

                    onClick={() => {
                      setRoomtypes(roomtypes.map((item) => {
                        if (item.room_type_id === i.room_type_id) {
                          item.check = !item.check
                        }
                        return item
                      }))


                    }

                    }
                  />


                  {i.room_type_name}
                
                </div>)

            })}
            </div>

            
            <div className="text-center flex justify-end">
            <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1  mb-1 ease-linear transition-all duration-150"
                type="button"  onClick={sendToDb}> Submit </button>
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

    </>
  );
}
