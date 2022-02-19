import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../context/provider";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CardServices() {
  const [data] = useContext(Context)
  console.log("property_id in services is " + data.property_id)
  const [services, setServices] = useState([])
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://103.136.36.27:7860/services', { headers: { 'accept': 'application/json' } });
        console.log(response.data)

        setServices(response.data)
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


    fetchServices();


  }, [])

  console.log(JSON.stringify(services))
  const datas = services.filter(i => i.check === true)
  const post = datas.map(i => i.service_id)
  console.log(JSON.stringify(post), 'post')

  const sendToDb = (e) => {
    e.preventDefault()
    console.log("data is " + JSON.stringify(post))
    const serviceData = post.map((i) => {
      return { "property_id": data.property_id, service_id: i }
    })

    const final = { "services": serviceData }
    console.log("data sent is " + JSON.stringify(final))
    axios.post('/services', final, {
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

      });

  }

  return (

    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Service Details</h6>

          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Property Services
            </h6>


            <div className="flex" style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
              {services?.map(i => {
                return (


                  <div className="block   text-blueGray-600 text-xs font-bold mb-2" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                    <input type="checkbox"

                      onClick={() => {
                        setServices(services.map((item) => {
                          if (item.service_id === i.service_id) {
                            item.check = !item.check
                          }
                          return item
                        }))

                      }}
                    />
                    {"  " + i.service_value.replace(/_+/g, ' ')}

                  </div>)

              })}
            </div>










            <div className="text-center flex justify-end">

              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1  mb-1 ease-linear transition-all duration-150"
                onClick={sendToDb}
                type="button"
              >
                Submit
              </button>
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
