import React, { useContext, useState} from 'react'
import { Context } from '../context/provider';
import { RoomContext } from '../context/roomprovider';
import axios from "axios";
import Nav from './Nav';
import XMLViewer from 'react-xml-viewer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const GetRoomXml = () => {
    const [data] = useContext(Context);
  //  const [roomData]=useContext(RoomContext);
    const [roomXML, setRoomXML] = useState();

    const call = () => {  toast.success("Data Sent To Google SucessFully",{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }); }

    const fetchXML = async () => {
        try {
           // const url = `http://34.125.133.100:7860/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}/${roomData.room_id}/xml`;
           const url = `http://34.125.133.100:7860/jammu-and-kashmir/srinagar/hotels/t2k001/r001/xml`
            console.log("URL " + url)
            const response = await axios.get(url, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
            console.log(response.data)
            setRoomXML(response.data)
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

    return (
        <div className="container-fluid">
            <div className='row black_border_new1'>
                <button onClick={fetchXML} >Fetch Xml of Room</button>

              {roomXML !== undefined &&   <div>

                    <XMLViewer xml={roomXML} />
                    <button onClick={call}>Send To Google</button>
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
                }

            </div>
        </div>
    )
}

export default GetRoomXml
