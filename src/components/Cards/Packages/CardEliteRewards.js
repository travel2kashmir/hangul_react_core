import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardEliteRewards(props) {
  const [view, setView] = useState(0)
  const [updateProgram, setUpdateProgram] = useState(0)
  const [deleteProgram, setDeleteProgram] = useState(0)
  const [editProgram, setEditProgram] = useState({});
  const [program, setProgram] = useState({});
  const [modified, setModified] = useState({})

  /* Function Edit Program*/
  const submitProgramEdit = (props) => {
   // console.log("props to edit program is " + props)
    // setProgram({...program,program_id:props})
    const final_data = {
      "program_id":props,
      "program_name": program.program_name,
      "program_level": program.program_level
  }
    console.log(JSON.stringify(final_data));
    setTimeout(()=>console.log(JSON.stringify(final_data)) ,3000) 
     console.log("the new information " + JSON.stringify(final_data))
    const url = '/package/package_membership_master'
     axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
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
         toast.error("Some thing went wrong in elite rewards\n " + JSON.stringify(error.response.data), {
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
   /* Function for Delete Room Images*/
  const submitDelete = () => {
    const url = `package/${props?.elite_rewards?.package_id}/${editProgram.program_id}`
    axios.delete(url).then
      ((response) => {
        console.log(response.data);
        setDeleteProgram(0)
        toast.success("Program deleted successfully", {
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
        toast.error("Some thing went wrong in Delete\n " + JSON.stringify(error.response.data), {
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
  /** Function to submit program add **/
  const submitProgramAdd = () => {
    const programdata = [{
      /* To be fetched from context */
      program_name: modified.program_name,
      program_level: modified.program_level
    }]
    const finalProgram = { "package_membership_master": programdata }
    console.log(JSON.stringify(finalProgram))
    axios.post(`/package/package_membership_master`, finalProgram).then(response => {
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
      console.log("Test Response" +JSON.stringify(response.data.program_id))
      const program_data = { "program_id": response.data.program_id, "package_id":props?.elite_rewards?.package_id }
      const final = { "package_membership_link": [program_data] }
      console.log("the package program" + JSON.stringify(final))
      axios.post('/package/package_membership_link', final, {
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
          toast.error("Some thing went wrong in Elite Program Rewards", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }).catch(error => {
      console.log("there is error" + error)
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
    <div>
      {/* Navbar */}
      <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link to="/userlanding" className="text-gray-700 text-base font-medium hover:text-gray-900 inline-flex items-center">
              <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <Link to="/property-summary" className="text-gray-700 text-sm   font-medium hover:text-gray-900 ml-1 md:ml-2">Taj Vivanta</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <Link to="/property-packages" className="text-gray-700 text-sm   font-medium hover:text-gray-900 ml-1 md:ml-2">Packages</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <Link to={{
                                pathname: '/property-package',
                                state: {
                                    id:props?.elite_rewards?.package_id 
                                }
                            }} className="text-gray-700 text-sm capitalize   font-medium hover:text-gray-900 ml-1 md:ml-2">{props?.elite_rewards?.package_name}</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Elite Rewards</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mx-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Elite Rewards
       </h1>
        <div className="sm:flex">
          <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
            <form className="lg:pr-3" action="#" method="GET">
              <label for="users-search" className="sr-only">Search</label>
              <div className="mt-1 relative lg:w-64 xl:w-96">
                <input type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search for Programs">
                </input>
              </div>
            </form>
            <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            <button type="button" onClick={() => setView(1)}
              className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200  font-semibold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
              <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
              Add program
            </button>
            <a href="#" className="w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 font-semibold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
              <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg>
              Export
            </a>
          </div>
        </div>
      </div>
      {/* Elite Rewards Form */}
      <div className="flex flex-col my-4">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                      Program Name
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                      Program Level
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                      Status
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    props?.elite_rewards?.membership?.map((item) => {
                      return (

                        <tr className="hover:bg-gray-100">
                          <td className="p-4 flex items-center whitespace-nowrap space-x-6
                                                     mr-12 lg:mr-0">
                            <td className="p-4 whitespace-nowrap capitalize text-base font-medium
                                                         text-gray-900">{item.program_name} </td>
                          </td>
                          <td className="p-4 whitespace-nowrap capitalize text-base font-medium
                                                     text-gray-900">{item.program_level} </td>
                          <td className="p-4 whitespace-nowrap text-base font-normal 
                                                    text-gray-900">
                            <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-400 
                                                            mr-2"></div>
                              Active
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap space-x-2">
                            <button type="button" onClick={() => {
                              setUpdateProgram(1);
                              setEditProgram(item);
                            }}
                              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font- font-semibold rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                              Edit program
                            </button>
                            <button type="button" onClick={() => {
                              setDeleteProgram(1);
                              setEditProgram(item);
                            }}
                              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font- font-semibold rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                              Delete program
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals Popups for Edit, Add and Delete Program */}
      {/* Modal Edit */}
      <div className={updateProgram === 1 ? 'block' : 'hidden'}>
        <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
          <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
            <div className="bg-white rounded-lg shadow relative">
              <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">
                  Edit Program
                </h3>
                <button type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                            rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  onClick={() => setUpdateProgram(0)} >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label for="first-name" className="text-sm font-medium text-gray-900 block mb-2">Program Name</label>
                    <input type="text" id="last-name"
                      defaultValue={editProgram?.program_name}
                      onChange={(e) => (setProgram({ ...program, program_name: e.target.value }))}
                      className="shadow-sm capitalize bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label for="last-name" className="text-sm font-medium text-gray-900 block mb-2">Program Level</label>
                    <select onChange={(e) => (setProgram({ ...program, program_level: e.target.value }))}
                      className="shadow-sm capitalizew bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
                      <option selected >{editProgram?.program_level}</option>
                      <option value="gold" >Gold</option>
                      <option value="silver">Silver</option>
                      <option value="platinium" >Platinium</option>
                      <option value="diamond">Diamond</option>
                      <option value="titanium">Titanium</option>
                      <option value="ambassador">Ambassador</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="items-center p-6 border-t border-gray-200 rounded-b">
                <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => { setUpdateProgram(0);submitProgramEdit(editProgram?.program_id)}} type="submit">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Add */}
      <div className={view === 1 ? "block" : "hidden"}>
        <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
        <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
          <div className="bg-white rounded-lg shadow relative">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">
                Add new Program
              </h3>
              <button type="button" onClick={() => setView(0)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label for="first-name" className="text-sm font-medium text-gray-900 block mb-2">Program Name</label>
                  <input type="text" name="last-name" id="last-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                     sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block
                      w-full p-2.5"  onChange={(e)=>{setModified({...modified,program_name:e.target.value})}}required />   
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label for="last-name" className="text-sm font-medium text-gray-900 block mb-2">Program Level</label>
                  <select  
                    className="shadow-sm bg-gray-50 border capitalize border-gray-300
                     text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600
                      focus:border-cyan-600 block w-full p-2.5"
                      onChange={(e)=>{setModified({...modified,program_level:e.target.value})}}>
                    <option selected >Select program</option>
                    <option value="gold" >Gold</option>
                    <option value="silver">Silver</option>
                    <option value="platinium" >Platinium</option>
                    <option value="diamond">Diamond</option>
                    <option value="titanium">Titanium</option>
                    <option value="ambassador">Ambassador</option>
                  </select>
                </div>
              </div>
            </div>
              
            <div className="items-center p-6 border-t border-gray-200 rounded-b">
              <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit" onClick={ submitProgramAdd }>Add program</button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Modal Delete */}
      <div className={deleteProgram === 1 ? "block" : "hidden"}>
        <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full" >
          <div className="relative w-full max-w-md px-4 h-full md:h-auto">
            <div className="bg-white rounded-lg shadow relative">
              <div className="flex justify-end p-2">
                <button type="button" onClick={() => setDeleteProgram(0)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
              <div className="p-6 pt-0 text-center">
                <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
                  Are you sure you want to delete {editProgram?.program_name} {editProgram?.program_level}?</h3>
                <button onClick={() => submitDelete()} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setDeleteProgram(0)} className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" data-modal-toggle="delete-user-modal">
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* Toast Container */}
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

export default CardEliteRewards