import React, { useState } from 'react';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../states/index';



function Signin() {
  //used to send action to reducer
  const dispatch = useDispatch();
  //will creator fuction to send action to reducer
  const { signin } = bindActionCreators(actionCreators, dispatch)
  //will downlink data from store.session in const
  const loggedIn = useSelector(state => state.session)
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
    <div className='bg-gray-50 p-4'>
      <div className="mx-auto  flex flex-col justify-center items-center 
    px-4 pt-8   pt:mt-0">
        <span className="self-center text-3xl  mb-4 mt-2 tracking-normal font-bold
         text-gray-700 whitespace-nowrap">Hangul</span>
        <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
          <div className="p-4 sm:p-8 lg:p-16 space-y-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-700">
              Sign in
            </h2>
            <form className="mt-8 space-y-6" action="#">
              <div>
                <label
                  className="text-base font-semibold
                      text-gray-700 
                     block mb-2" htmlFor="grid-password">
                  Sign in As:
                </label>
                <div className="flex">
                  <div className="form-check form-check-inline">
                    <input type="radio"
                      className="form-check-input form-check-input 
                    appearance-none rounded-full h-4 w-4 border 
                    border-gray-300 
                    bg-white checked:bg-blue-600 
                    checked:border-blue-600 focus:outline-none
                     transition duration-200 mt-2  align-top
                      bg-no-repeat bg-center bg-contain float-left
                       mr-2 cursor-pointer" onChange={(e) => { setAdminFlag(e.target.value) }}
                      value="User"
                      name="who" id='ip1' />
                    <label
                      className="form-check-label inline-block 
                      text-gray-700 text-sm font-semibold"
                      htmlFor="ip1">
                      User
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" id='ip2' value="Admin"
                      className="form-check-input form-check-input appearance-none 
                     rounded-full h-4 w-4 border border-gray-300
                      bg-white checked:bg-blue-600 checked:border-blue-600
                       focus:outline-none transition duration-200 mt-2 
                        align-top bg-no-repeat bg-center bg-contain float-left mb-2
                         mr-1 ml-2 cursor-pointer"
                      name="who" />
                    <label
                      className="form-check-label inline-block 
                      text-gray-700 text-sm font-semibold "
                      htmlFor="ip2" onChange={(e) => { setAdminFlag(e.target.value) }}
                    >
                      Admin</label>
                  </div>
                </div>
                <label for="email" className="text-base font-semibold
                     text-gray-700 
                    block mb-2">Your email</label>
                <input type="email" name="email" id="email"
                  className="bg-gray-50 border border-gray-300 
                    text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600
                     focus:border-cyan-600 block w-full p-2.5"
                  onChange={(e) => setSigninDetails({ ...signinDetails, email: e.target.value })}
                  placeholder="" required>
                </input>
              </div>
              <div>
                <label for="password" className="text-base font-semibold
                     text-gray-700 block mb-2">Your password</label>
                <input type="password" name="password" id="password"
                  onChange={(e) => setSigninDetails({ ...signinDetails, password: e.target.value })}
                  placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required>
                </input>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="remember" aria-describedby="remember"
                    name="remember" type="checkbox" className="bg-gray-50 
                     border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4
                      rounded" required /></div>
                <div className="text-sm ml-3">
                  <label for="remember" className="text-sm font-semibold text-gray-700">Remember me</label>
                </div>
                <Link to="" className="text-sm font-semibold
                     text-teal-500 hover:underline  ml-auto">Lost Password?</Link>
              </div>
              <button type="submit" className="font-semibold text-white bg-cyan-600 
                hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 mt-6
                rounded-lg text-base px-5 py-2 w-full sm:w-auto text-center"
                onClick={() => { adminFlag === "Admin" ? submitAsAdmin() : submitAsUser() }}>
                Sign in
              </button>
              <div className="text-base font-semibold text-gray-500">
                Not registered?
                <Link to="/signup" className="text-teal-500 hover:underline px-2">Create account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div style={{ color: "white", background: 'red' }}>
        {loggedIn?.id?.match(/user.[0-9]*/) ?
          <><Redirect to='/userlanding' /></>
          : <>{loggedIn?.id?.match(/admin.[0-9]*/) ? <Redirect to='/' /> : <></>}</>}
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
    </div>
  )
}

export default Signin