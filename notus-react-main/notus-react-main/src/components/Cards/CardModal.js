import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/provider';
import axios from "axios";
import XMLViewer from 'react-xml-viewer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Modal()
 {
  const [openTab, setOpenTab] = React.useState(0);
  const [data] = useContext(Context)
  const [hotelXML, setHotelXML] = useState()

  const call = () => {
    toast.success("Data Sent To Google SucessFully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  useEffect(() => {
    const fetchXML = async () => {
      try {
        //const url = `http://103.136.36.27:7860/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_type}s/${data.property_id}/xml`;
         const url = `http://103.136.36.27:7860/jammu-and-kashmir/srinagar/hotels/t2k001/xml`
        console.log("URL " + url)
        const response = await axios.get(url, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
        console.log(response.data)

        setHotelXML(response.data)

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

    fetchXML();
  }, [])

 return (
    <>
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
                    : "text-white bg-orange-500")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Property XML
              </a>
            </li>
            
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                 


               {hotelXML?<><div className="text-center flex justify-end">
                 <button  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
               onClick={call}>Send to Google</button></div>
               <XMLViewer xml={hotelXML}/> </>:<h3>XML being fetched.Please wait.</h3> }
         

                </div>
                
               
              </div>
            </div>
          </div>
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
};
