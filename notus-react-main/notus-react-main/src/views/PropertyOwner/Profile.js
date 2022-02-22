import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import FooterSmall from "../../components/Footers/FooterSmall";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Profile() {
  const [showModal, setShowModal] = React.useState(false);
  const [id,setId]= useState()
  const logged = useSelector(state => state.session);
  const [ownerdata, setOwnerdata] = useState([])
  let count = 0;
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const url = '/properties/user003';
        const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
        console.log("response" + JSON.stringify(response.data))
        setOwnerdata(response.data)
        
      }
      catch (error) {
        if (error.response) {
          console.log("user description" + JSON.stringify(error.response));
          console.log("status" + JSON.stringify(error.response.status));
          console.log("header" + JSON.stringify(error.response.headers));
        } else {
          console.log("error " + error.message);
        }
      }

    }
    fetchProperty();
  }, [])

  const submitDelete = (props) => {  
    const url = `/${props}`
    axios.delete(url).then
        ((response) => {
            console.log(response.data);
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
        .catch((error) => {
            console.log(error);
            console.log(error);
            toast.error("Some thing went wrong\n " + JSON.stringify(error.response.data), {
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
    <div>
      {logged?.id === '' ? <Redirect to='/' /> : <div><IndexNavbar />
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                "url(" + require("assets/img/profile-bg.avif").default + ")",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    {/*Place for Something in center*/}
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl uppercase font-semibold leading-normal text-blueGray-700 mb-2">
                      Welcome {logged?.name}
                    </h3>
                  </div>
                  <div className="w-full text-lg font-semibold font-mono px-4 lg:order-3 text-center ">
                    
                    <p>Welcome to Travel2Kashmir, we are happy that you choose us.</p>
                    <Link to='/admin'>
                      <button
                        className="bg-lightBlue-500 my-4 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Add New Property
                      </button>
                    </Link>
                  </div>


                  {ownerdata.length === undefined && ownerdata.property_id === undefined ? <></> :
                    <div className="mt-2 py-4 border-t border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 sm:9:12 px-4">
                          <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-400 text-xl mt-3 mb-6 font-bold "> List of your Registered Properties</h6>
                          </div>
                          <div className="block w-full overflow-x-auto">
                          <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                              <tr>
                                <th className="border-t-0 bg-blueGray-200 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                                  Sno.</th>

                                <th className="border-t-0 bg-blueGray-200 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                                  Property Name</th>

                                <th className="px-6 bg-blueGray-200 text-base text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                <div>{showModal ? (
                                                                    <>
                                                                        <div
                                                                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none"
                                                                            onClick={() => setShowModal(false)}
                                                                        >
                                                                            <div className="relative w-auto my-6 mx-auto max-w-sm">
                                                                                {/*content*/}
                                                                                <div className="border-2 px-2 rounded-lg shadow-lg relative flex flex-col w-full bg-blueGray-600 outline-none focus:outline-none">
                                                                                    {/*header*/}
                                                                                    {/*body*/}
                                                                                    <div className=" p-6  flex-auto">
                                                                                        <p className="my-2 text-white text-sm leading-relaxed">
                                                                                            Are you sure, you want to delete?
                                                                                        </p>
                                                                                    </div>
                                                                                    {/*footer*/}
                                                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                                                        <button
                                                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                            type="button"
                                                                                            onClick={() => setShowModal(false)}
                                                                                        >
                                                                                            Close
                                                                                        </button>
                                                                                        <button
                                                                                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                            type="button"
                                                                                            onClick={() => submitDelete(id)}
                                                                                        >
                                                                                            Delete
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </>
                                                                ) : <></>}</div>
                                </th>
                                <th className="px-6 bg-blueGray-200 text-base text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                             </th>
                              </tr>
                            </thead>
                            {ownerdata.property_id !== undefined ?
                              <tbody>
                                <tr>

                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                    {count = count + 1} </td>
                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                    {ownerdata.property_name}</td>
                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                    <Link to='/owner-view'>
                                    <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >
                                               Click Here... </button> </Link></td>
                                               <td className="border-t-0 px-6  align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                                    <button className=
                                                                 "bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" 
                                                                 onClick={() => {setId(ownerdata.property_id);
                                                                    setShowModal(true)}}
                                                                 type="button">Delete</button>
                                      </td>
                                </tr>
                              </tbody> :
                              <tbody>
                                {ownerdata.map(i => (

                                  <tr>

                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                                      {count = count + 1} </td>
                                    <td className="border-t-0 px-6  align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                                     <p className="uppercase"> {i.property_name}</p></td>
                                    <td className="border-t-0  px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                    <Link to='/owner-view'>
                                       <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >
                                               Click Here... </button> 
                                    </Link></td>
                                    <td className="border-t-0 px-6  align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                                    <button
                                                                 className=
                                                                 "bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" 
                                                                 onClick={() => {setId(i.property_id);
                                                                    setShowModal(true)}}
                                                                 type="button">Delete</button>
                                      </td>
                                  </tr>

                                ))}
                              </tbody>
                            }

                          </table>
                          </div>
                        </div>
                      </div>
                    </div>}
                </div>
              </div>
            </div>
          </section>
        </main>
        <FooterSmall />
        
      </div>
      }
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

  );
}
