import React, { useState, useContext } from "react";
import { Context } from "../context/provider";
import Axios from "axios";
import Nav from './Navbars/LeftNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Contactform = ({ propertyId }) => {
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
        <div> <Nav />
            <div className="container-fluid" id="ct" >
                {contact?.map((contact, index) =>
                (
                    <div key={contact?.index}>
                        <div className="row black_border_new1">

                            <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Contact Details</h4>
                            <hr style={{ borderTop: "1px solid black" }}></hr>
                            <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                                    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                                        <label for="rl">Contact type</label></div>
                                    <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                                        <select className="custom-select mr-sm-2 form-control"
                                            value={contact?.contact_type} id="ut inlineFormCustomSelect"
                                            onChange={e => onChange(e, contact?.index, 'contact_type')}><br />
                                            <option selected>Select contact type</option>
                                            <option value="phone">phone</option>
                                            <option value="email">email</option>
                                            <option value="website">website</option>
                                            <option value="toll free number">toll free number</option>
                                            <option value="tdd number">tdd number</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                                    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                                        <label for="rt">Contact data</label></div>
                                    <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                                        <input type="text" id="rt" className=" form-control" value={contact?.contact_data} placeholder="enter contact data"
                                            onChange={e => onChange(e, contact?.index, 'contact_data')} />

                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="button" className="btn btn-dark btn_add" onClick={() => removeContact(contact?.index)}>- Remove contact</button>


                    </div>


                )
                )
                }
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                    <div className="col-md-8 col-sm-8 col-xs-8 col-lg-8"></div>
                    <div className="col-md-2 col-sm-2 col-xs-3 col-lg-2">
                        <button type="button" className="btn btn-dark btn_con_add " onClick={addContact}>+ Add more contacts</button>
                    </div>
                    <div className="col-md-1 col-sm-3 col-xs-3 col-lg-1">

                        <button type="button" className="btn btn-dark btn_con_add" onClick={handleSubmit}>Submit</button>
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
    )

}
export default Contactform;









