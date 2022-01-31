import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../states/index.js';
import { Redirect } from 'react-router-dom';


function Signin(props) {
  const dispatch = useDispatch();//used to send action to reducer
  const { signin } = bindActionCreators(actionCreators, dispatch) //will creator fuction to send action to reducer
  const loggedIn = useSelector(state => state.session)//will downlink data from store.session in const






















  const [signinDetails, setSigninDetails] = useState({
    "email": '',
    "password": ''
  })

  const submitAsAdmin = () => {
    console.log("submit as admin")
    var item = {
      "admin_email": signinDetails.email,
      "admin_password": signinDetails.password
    }
    console.log(JSON.stringify(item))
    Axios.post('/signin/admin', item, { headers: { 'content-type': 'application/json' } })
      .then(
        response => {
          console.log(response.data)
          toast.success("logged in with Admin_id " + response.data.admin_id + " as " + response.data.admin_type, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          const whoIsLogged = {
            "id": response.data?.admin_id,
            "name": response.data?.admin_name,
            "email": signinDetails?.email,
            "password": signinDetails?.password
          }
          signin(whoIsLogged)

        }

      )
      .catch(
        error => {
          console.log(error.response)
          toast.error("Some thing went wrong \n " + JSON.stringify(error.response.data),
            {
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

  const submitAsUser = () => {
    console.log("submit as user")
    var item = {
      "user_email": signinDetails.email,
      "user_password": signinDetails.password
    }
    console.log(JSON.stringify(item))
    Axios.post('/signin/user', item, { headers: { 'content-type': 'application/json' } })
      .then(
        response => {
          console.log(response?.data)
          toast.success(response?.data?.user_name + "  logged in ", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          const whoIsLogged =
          {
            "id": response.data.user_id,
            "name": response.data.user_name,
            "email": signinDetails?.email,
            "password": signinDetails?.password
          }
          console.log("who is logged" + JSON.stringify(whoIsLogged))
          signin(whoIsLogged)

        }

      )
      .catch(
        error => {
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

  const [adminFlag, setAdminFlag] = useState('Admin');
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Log-in As "{adminFlag}"
                    </label>
                    <select
                      onChange={(e) => { setAdminFlag(e.target.value) }}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                      <option value="">Select</option>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>



                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="email"
                      onChange={(e) => setSigninDetails({ ...signinDetails, email: e.target.value })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(e) => setSigninDetails({ ...signinDetails, password: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => { adminFlag === "Admin" ? submitAsAdmin() : submitAsUser() }}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Sign In

                    </button>
                  </div>
                  <div className="flex flex-wrap mt-1 relative text-blueGray-900">
                    <div className="w-1/2">
                      <a
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}

                        disabled
                      >
                        <small>Forgot password?</small>
                      </a>
                    </div>
                    <div className="w-1/2 text-right" >

                      <button onClick={(e) => { e.preventDefault(); props.setOpenTab(2) }}><small>Create new account</small></button>

                    </div>
                  </div>
                </form>
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

          </div>
        </div>
      </div>

      <div style={{color:"white",background:'red'}}>
       
        {loggedIn?.id?.match(/user.[0-9]*/) ?
         <><Redirect to='/owner'/></>
         : <>{loggedIn?.id?.match(/admin.[0-9]*/)?<Redirect to='/admin'/>:<></>}</>}
      </div>
    </>
  );
}
export default Signin;