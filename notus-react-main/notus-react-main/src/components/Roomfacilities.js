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
               // const url = `/services/${data.property_id}`;
                const url = `/services/t2k004`;
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

if(roomdes?.room_id==='none')
{
    return(<h3>Submit Room Description First Then Facilities Can Be Added </h3>) 
}
else
{return (
    <div>
        <h6 className="text-blueGray-400 text-sm mt-3  font-bold uppercase">
            Select Room Services
        </h6><br />

        <div class="flex flex-wrap ">

            {roomfacilities?.map(i => {
                return (<div className="block   text-blueGray-600 text-xs font-bold mb-2" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                    <input type="checkbox" class="mr-1"

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


        
                <div className="relative w-full mb-3">
                <div className="text-center flex justify-end">
        <button onClick={sendToDb}
            className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        >Submit Room Facilities</button> 
          </div>
            </div>
           

        <ToastContainer limit={1}
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
    </div>
)}


    
}
export default Roomfacilities;