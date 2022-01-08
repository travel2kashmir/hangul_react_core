import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/provider";
import axios from "axios";
import Nav from "./Nav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roomtypes = (props) => {
    const [roomdes, setRoomdes] = useContext(Context);
    const data = { "property:id": "t2k0092" }
    console.log("property_id in room_types is " + data.property_id)
    const [roomtypes, setRoomtypes] = useState([])
    useEffect(() => {
        const fetchRoomtypes = async () => {
            try {
                const response = await axios.get('http://34.125.133.100:5555/room-types', { headers: { 'accept': 'application/json' } });
                console.log("room types " + JSON.stringify(response.data))

                setRoomtypes(response.data)
                //  setRoomdes(response.data)
            }
            catch (error) {
                if (error.response) {
                    console.log("data" + JSON.stringify(error.response));
                    console.log("status" + JSON.stringify(error.response.status));
                    console.log("header" + JSON.stringify(error.response.headers));
                } else {
                    console.log("error" + error.message);
                }
            }

        }


        fetchRoomtypes();


    }, [])

    const sendToDb = (e) => {
        e.preventDefault()

        console.log(JSON.stringify(roomtypes))
        const datas = roomtypes.filter(i => i.check === true)
       
        console.log("room id s selected "+datas.map(i => i.room_type_id))
        console.log("Datas is " + JSON.stringify(datas))
        props.setRoomDescription(datas)

        
    }




    return (
        <div><Nav />
            <div className="container-fluid"  >
                <div className="row black_border_new1">{/*JSON.stringify(props)*/}
                    <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Room types</h4>
                    <hr style={{ borderTop: "1px solid black" }}></hr>
                    <h4 style={{ marginLeft: "20px" }}>
                        Select room types of your property:</h4>
                    <table id="st">

                        <tr><td>
                            <div style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
                                {roomtypes?.map(i => {
                                    return (<div className="checkbox-inline" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                                        <input type="checkbox"
                                            style={{ backgroundColor: i.check === true ? "grey" : "white", color: i.check === true ? 'white' : 'black' }}
                                            onClick={() => {
                                                setRoomtypes(roomtypes.map((item) => {
                                                    if (item.room_type_id === i.room_type_id) {
                                                        item.check = !item.check
                                                    }
                                                    return item
                                                }))

                                            }}
                                        />


                                        {i.room_type_name}
                                    </div>)

                                })}
                            </div>
                        </td>
                        </tr>

                    </table>
                </div>

                <button type="submit" style={{ marginBottom: "50px" }} className="btn btn-dark btn_add" name="submit" onClick={sendToDb}>Next </button>
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
export default Roomtypes;