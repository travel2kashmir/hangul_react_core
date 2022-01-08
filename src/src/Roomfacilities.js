import React, { useState, useEffect, useContext } from "react";
import { Context } from "./context/provider";
import axios from "axios";
import Nav from "./Nav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Roomfacilities = () => {
    const [roomdes] = useContext(Context)
    console.log("room_id in room facilities is " + roomdes.room_id)
    const [roomfacilities, setRoomfacilities] = useState([])
    useEffect(() => {
        const fetchRoomfacilities = async () => {
            try {
                const response = await axios.get('http://34.125.133.100:5555/services/t2k001', { headers: { 'accept': 'application/json' } });
                console.log("room facilities "+JSON.stringify(response.data))

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


    }, [])   

    console.log(JSON.stringify(roomfacilities))
    const datas = roomfacilities.filter(i => i.check === true)
    const post = datas.map(i => i.facility_id)
    console.log(JSON.stringify(post), 'post')

    const sendToDb = (e) => {
        e.preventDefault()
        console.log("data is " + JSON.stringify(post))
        const roomfacilitiesData = post.map((i) => {
            return { "room_id": roomdes.room_id, facility_id: i }
        })

        const final = { "room_facilities": roomfacilitiesData }
        console.log("data sent is " + JSON.stringify(final))
        axios.post('/room_services', final, {
            headers: { 'content-type': 'application/json' }
        }).then(response => {
            console.log(response)
            toast.success(JSON.stringify(response.roomdes.message), {
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
        <div><Nav />
            <div className="container-fluid"  >
                <div className="row black_border_new1">
                    <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Room types</h4>
                    <hr style={{ borderTop: "1px solid black" }}></hr>
                    <h4 style={{ marginLeft: "20px" }}>
                        Select room facilities of your room:</h4>
                    <table id="st">

                        <tr><td>
                            <div style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
{roomfacilities?.map(i => {return (<div className="checkbox-inline" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                                            <input type="checkbox"
                                                style={{ backgroundColor: i.check === true ? "grey" : "white", color: i.check === true ? 'white' : 'black' }}
                                                onClick={() => {
                                                    setRoomfacilities(roomfacilities.map((item) => {
                                                        if (item.facility_id === i.facility_id) {
                                                            item.check = !item.check
                                                        }
                                                        return item
                                                    }))

                                                }}
                                            />


                                            {i.service_value.replace(/_+/g,' ')}
                                        </div>)

                                })}
                            </div>
                        </td>
                        </tr>
						
                    </table>
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
        </div>
    )
}
export default Roomfacilities;