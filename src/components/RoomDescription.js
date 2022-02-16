import React, { useState, useContext } from 'react'
import { RoomContext } from '../context/roomprovider';
import { Context } from '../context/provider'
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Roomdescription = ({id}) => {

    const [roomdes, setRoomdes] = React.useContext(RoomContext)
    const [property] = useContext(Context)
    const [allRoomDes, setAllRoomDes] =
        useState({
            room_name: '',
            room_type_id: id,
            property_id: property.property_id,
            room_description: '',
            room_capacity: '',
            maximum_number_of_occupants: '',
            minimum_number_of_occupants: '',
            minimum_age_of_occupants: '',
            room_length: '',
            room_width: '',
            room_height: ''
        });

    const setContext = (room_id) => {
        console.log("into set context")
        const obj = {
            room_id: room_id,
            room_name: allRoomDes.room_name
        }
        console.log("data to be set " + JSON.stringify(obj))
        setRoomdes(obj)
        console.log("the data in context " + JSON.stringify(roomdes))

    }

    /** Final Submit Function **/
    function finalHandleSubmit(e) {
        e.preventDefault()
        const finalData = { ...allRoomDes }
        console.log(JSON.stringify(finalData), 'finaldata')
        Axios.post('/room', JSON.stringify(finalData),
            {
                headers: { 'content-type': 'application/json' }
            }).then(response => {
                console.log(response.data)

                toast.success("Room created with id " + response.data.room_id, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setContext(response.data.room_id)
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

    

    return (


        <div className="flex flex-wrap">

            


            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase  text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Room Name
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        
                        onChange={e => setAllRoomDes({ ...allRoomDes, room_name: e.target.value })}
                         placeholder="Room Name"
                    />

                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Room Description
                    </label>
                    <textarea rows="2" columns="60"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={e => setAllRoomDes({ ...allRoomDes, room_description: e.target.value })}
                     placeholder="Room Description"/>

                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Room Capacity
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={e => setAllRoomDes({ ...allRoomDes, room_capacity: e.target.value })}
                        placeholder="Room Capacity"/>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Maximum Number Of Occupants
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={e => setAllRoomDes({ ...allRoomDes, maximum_number_of_occupants: e.target.value })}
                        placeholder="Maximum Number Of Occupants"/>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Minimum Number Of Occupants
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={e => setAllRoomDes({ ...allRoomDes, minimum_number_of_occupants: e.target.value })}
                        placeholder="minimum number of occupants"/>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Minimum Age Of Occupants
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={e => setAllRoomDes({ ...allRoomDes, minimum_age_of_occupants: e.target.value })}
                        placeholder="minimum age of occupants"/>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Room Length
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={e => setAllRoomDes({ ...allRoomDes, room_length: e.target.value })}
                        placeholder="Room length"/>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Room Breadth
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={e => setAllRoomDes({ ...allRoomDes, room_width: e.target.value })}
                        placeholder="Room Breadth"
                        />
                </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Room Height
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={e => setAllRoomDes({ ...allRoomDes, room_height: e.target.value })}
                        placeholder="Room Height"
                    />
                </div>
               
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3 ml-52">
                <div className="text-center flex justify-end">
                <button onClick={finalHandleSubmit}
                className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 mt-8  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                >Submit Room Description</button></div></div></div>
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

export default Roomdescription;



