import React, { useState, useContext } from "react";
import { Context } from "../../context/provider";
import Axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
function CardContact() {
  const [data] = useContext(Context)
  console.log("property id in contact is" + data.property_id + "property_name " + data.property_name);

  const conTemp = {
    contact_type: '',
    contact_data: '',
    property_id: data.property_id
  }

  const [contact, setContact] = useState
    ([conTemp]?.map((i, id) => { return { ...i, index: id } }))

  const addContact = () => {
    setContact([...contact, conTemp]?.map((i, id) => { return { ...i, index: id } }))
  }
  const dataValidation = ({ contactdata }) => {
    console.log("Checking Data")
    const phoneTypePresent = contactdata.find(i => i.contact_type === 'phone') ? true : false
    let rep = 0
    let repeat = false
    for (let key in contactdata) {
      let item = contactdata[key]

      rep = 0
      for (let innerItem in contactdata) {

        if (contact[innerItem].contact_type === item.contact_type) {
          rep = rep + 1;

        }
      }
      if (rep > 1) {
        repeat = true
        console.log(repeat)
      }

    }
    console.log("repeat  " + repeat + " phoneTypePresent  " + phoneTypePresent)
    if ((repeat === false) && (phoneTypePresent === true))
      return (true)
    else if ((repeat === true) && (phoneTypePresent === false))
      return ("phone number absent and some Contact type being repeated")
    else if (repeat === true)
      return ("Some contact type being repeated")
    else if (phoneTypePresent === false)
      return ("phone number missing")


  }





  function handleSubmit(e) {
    e.preventDefault()
    console.log({ contact })
    const contactdata = contact?.map((i => {
      return {
        property_id: i.property_id,
        contact_type: i.contact_type,
        contact_data: i.contact_data
      }
    }))
    let report = dataValidation({ contactdata })
    if (report === true) {
      const finalContact = { contacts: contactdata }
      console.log(JSON.stringify(finalContact) + "sent details")
      Axios.post(`/contact`, JSON.stringify(contact),
        {
          headers: { 'content-type': 'application/json' }
        }).then(response => {
          console.log(response.data)
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
    else {
      toast.error(report, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }



  const onChange = (e, index, i) => {
    console.log(index, 'index')
    setContact(contact?.map((item, id) => {
      if (item.index === index) {
        item[i] = e.target.value
      }
      return item
    }))
  }


  const removeContact = (index) => {
    console.log("index is" + index)
    const filteredContact = contact.filter((i, id) => i.index !== index)
    console.log("data sent to state " + JSON.stringify(filteredContact))
    setContact(filteredContact)
  }






  return (
    <> 
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Contact Details</h6>
            

          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form>
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase ">
              Property Contacts
            </h6>
        {contact?.map((contact, index) =>(<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
         
           
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Contact type
                  </label>
                  <select
                    onChange={e => onChange(e, contact?.index, 'contact_type')}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option selected>Select contact type</option>
                    <option value="phone" >Phone</option>
                    <option value="email">Email</option>
                    <option value="website" >Website</option>
                    <option value="toll free number">Toll Free number</option>
                    <option value="tdd number">TDD number</option>
                  </select>

                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Contact Value
                  </label>
                  <input
                    type="text"
                    onChange={e => onChange(e, contact?.index, 'contact_data')}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="text-center flex justify-end">

            
              <button 
                className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                onClick={() => removeContact(contact?.index)}>
                -Remove Contact
              </button>
            </div>
           
           

      
         
        </div>))}
        </form>
        </div>
        <div className="text-center flex justify-end" style={{paddingBottom:"10px",marginTop:"-70px"}}>
         
            <button
                className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                onClick={addContact}
              >
                +Add Contact
              </button>

              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={handleSubmit}
                type="button"
              >
                Submit
              </button>
              
                             
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
    </>
  );
}
export default CardContact