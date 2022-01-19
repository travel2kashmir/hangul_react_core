import React, { useState, useEffect, useContext } from "react";
import { RoomContext } from "../context/roomprovider";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../context/provider";


const Roomfacilities = () => {
    const [roomdes] = useContext(RoomContext)
    const [data] = useContext(Context)
    console.log("room_id in room facilities is " + roomdes.room_id)
    const [roomfacilities, setRoomfacilities] = useState([])
    useEffect(() => {
        const fetchRoomfacilities = async () => {
            try {
               const url=`http://34.125.133.100:5555/services/${data.property_id}`;
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


        fetchRoomfacilities();


    }, []) // eslint-disable-line react-hooks/exhaustive-deps



    const sendToDb = (e) => {
        e.preventDefault()
        console.log("the facilities sent for submission" + JSON.stringify(roomfacilities))
        const datas = roomfacilities.filter(i => i.check === true)
        const post = datas.map(i => i.service_id)
        console.log(JSON.stringify(post), 'post')

        const roomfacilitiesData = post.map((i) => {
            return { "room_id": roomdes.room_id, service_id: i }
        })

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




    return (
        <div>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Select Room Services
            </h6><br />
              
                            <div style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>

                                {roomfacilities?.map(i => {
                                    return (<div  className="block   text-blueGray-600 text-xs font-bold mb-2" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                                        <input type="checkbox"

                                            onClick={() => {
                                                setRoomfacilities(roomfacilities.map((item) => {
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
                       
               
                <button type="submit" style={{ marginBottom: "50px" }} className="btn btn-dark btn_add" name="submit" onClick={sendToDb}>Submit </button>
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
export default Roomfacilities;