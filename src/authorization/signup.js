import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

    const [adminFlag, setAdminFlag] = useState("Admin")
    const [user, setUser] = useState({
        "user_name": "",
        "user_email": "",
        "user_password": ""
    })
    const [admin, setAdmin] = useState({
        "admin_type": "",
        "admin_name": "",
        "admin_email": "",
        "admin_password": ""
      })
      const validateAdminData = (props) => {

        const pswdValid = CheckPassword(props.admin.admin_password)
        return pswdValid
      }
    
    const validateUserData = (props) => {

        const pswdValid = CheckPassword(props.user.user_password)
        return pswdValid
    }

    function CheckPassword(inputtxt) {
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        console.log("pswd" + inputtxt)
        if (inputtxt.match(passw)) {
            return true;
        }
        else {
            return false;
        }
    }

    const registerUser = (e) => {
        console.log("user details" + JSON.stringify(user))
        const result = validateUserData({ user })
        if (result === true) {
            Axios.post('/signup/user', JSON.stringify(user),
                {
                    headers: { 'content-type': 'application/json' }
                }).then(response => {
                    console.log(response.data)
                    toast.success("user created with id " + response.data.user_id, {
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
        else {
            toast.error("Password should be as per instructions", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    }

    const registerAdmin = (e) => {
        e.preventDefault()
        console.log("Admin details" + JSON.stringify(admin))
    
        const result = validateAdminData({ admin })
    
        if (result === true) {
          Axios.post('/signup/admin', JSON.stringify(admin),
            {
              headers: { 'content-type': 'application/json' }
            }).then(response => {
              console.log(response.data)
              toast.success("Admin Account created with id " + response.data.admin_id, {
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
        else {
          toast.error("password should be as per instructions", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    
        }
      }
    

    return (
        <div className='bg-gray-50 p-4'>
            <div className="mx-auto  flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
                <span className="self-center text-2xl font-bold whitespace-nowrap">Hangul</span>
                <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
                    <div className="p-4 sm:p-8 lg:p-16 space-y-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                            Sign up
                        </h2>
                        <form className="mt-6 space-y-6" action="#">
                            <div>
                                <div>
                                    <label
                                        className="text-base font-semibold text-gray-700 block mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Register as
                                    </label>
                                    <select onChange={(e) => setAdminFlag(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
                                        <option value="">Select</option>
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </select>
                                </div>
                                {adminFlag === "User" ?
                                    <div>
                                        <label
                                            className="text-base font-semibold text-gray-700 block mb-2"
                                            htmlFor="grid-password"
                                        >
                                            User name
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            onChange={(e) => { setUser({ ...user, user_name: e.target.value }) }}
                                        />
                                        <label for="email" className="text-base font-semibold text-gray-700 block mb-2">User email</label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            placeholder="" required>
                                        </input>
                                        <div>
                                            <label for="password" className="text-base font-semibold text-gray-700 block mb-2">User password</label>
                                            <input type="password" name="password" id="password" placeholder=""
                                                className="bg-gray-50 border border-gray-300 text-gray-900 
                                             sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600
                                              block w-full p-2.5"  onChange={(e) => { setUser({ ...user, user_email: e.target.value }) }} required>
                                            </input>
                                        </div>
                                        {user?.user_password === '' ? <></> : user?.user_password.length < 6 ? <p>Password must be 6 to 20 character long with atleast 1 upper case character , 1 lower case character and 1 number</p> : <></>}
                                        <button type="submit" className="text-white bg-cyan-600 
                            hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium 
                            rounded-lg text-base px-5 py-2 mt-6 w-full sm:w-auto
                             text-center" onClick={registerUser}>Sign up</button>
                                    </div>
                                    :
                                    <div>
                                        <div>
                                        <label className="text-base font-semibold text-gray-700 block mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Admin type
                                        </label>
                                        <select
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            placeholder="Admin-name"
                                            onChange={(e) => { setAdmin({ ...admin, admin_type: e.target.value }) }}
                                        >
                                            <option value="">Select admin type</option>
                                            <option value="Super-admin">Super Admin</option>
                                            <option value="admin">Admin</option>
                                            <option value="editor">Editor</option>
                                        </select>
                                        </div>
                                        <div>
                                        <label
                                            className="text-base font-semibold text-gray-700 block mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Admin name
                                        </label>
                                        <input type="text"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            onChange={(e) => { setAdmin({ ...admin, admin_name: e.target.value }) }}
                                        />
                                        </div>
                                         <div>
                                        <label for="email" className="text-base font-semibold text-gray-700 block mb-2">Admin email</label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                           onChange={(e) => { setAdmin({ ...admin, admin_email: e.target.value }) }}
                                          placeholder="" required>
                                        </input>
                                        {admin?.admin_password === '' ? <></> : admin?.admin_password.length < 6 ? <p>Password must be 6 to 20 character long with atleast 1 upper case character , 1 lower case character and 1 number</p> : <></>}
                      
                                        </div>
                                        <div>
                                            <label for="password" className="text-base font-semibold text-gray-700 block mb-2">Admin password</label>
                                            <input type="password" name="password" id="password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            onChange={(e) => { setAdmin({ ...admin, admin_password: e.target.value })}} required>
                                            </input>
                                        </div>
                                        <button type="submit" className="text-white bg-cyan-600 
                            hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium 
                            rounded-lg text-base px-5 py-2 w-full sm:w-auto mt-4
                             text-center" onClick={registerAdmin}>Sign up</button>
                                    </div>}
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" required>
                                    </input>
                                </div>
                                <div className="text-sm ml-3">
                                    <label for="remember" className="font-medium text-gray-900">I accept the <a href="#" className="text-teal-500 hover:underline">Terms and Conditions</a></label>
                                </div>
                            </div>

                            <div className="text-sm font-semibold text-gray-500">
                                Already have an account? <Link to="/" className="text-teal-500 hover:underline">Login here</Link>
                            </div>
                        </form>
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
        </div>
    )
}

export default Signup