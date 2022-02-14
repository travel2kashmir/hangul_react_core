import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import IndexNavbar from "components/Navbars/IndexNavbar.js";

import FooterSmall from "../../components/Footers/FooterSmall";
export default function Profile() {
  const logged = useSelector(state => state.session);
  const [ownerdata, setOwnerdata] = useState([])
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const url = '/properties/user003';
        const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
        console.log("response" + JSON.stringify(response.data))

        setOwnerdata(response.data)
        // setRoomfacilities(response.data)
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





  return (
    <div>
      {logged?.id === '' ? <Redirect to='/' /> : <div><IndexNavbar />
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
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
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      welcome! {logged?.name}
                    </h3>


                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      
                        <Link to='/admin'>
                        <button
                          className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Add New Property
                        </button>
                        </Link>
                        
                      
                    </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <h2 className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          list of your properties
                        </h2>
            
                        <table className="items-center w-full bg-transparent border-collapse">
                          <thead>
                            <tr>
                              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Property name</th>
                              
                              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              
                              </th>

                            </tr>
                          </thead>
                          {ownerdata.map(i => (
                            <div>
                              <tr>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <h1>{i.property_name}</h1></td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                               <Link to='/owner-view'>click here</Link></td>
                              </tr>
                            </div>



                          ))}
                        </table>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <FooterSmall />
        {/*
    <>
      
              
       
         
        
        
          </section>
      </main>
      <FooterSmall />
    </>*/}
      </div>
      }
    </div>

  );
}
