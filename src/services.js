import React, { useState, useContext, useEffect } from "react";
import { Context } from "./context/provider";
import axios from "axios";
import Nav from "./Nav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Services = () => {
    const [data] = useContext(Context)
    console.log("property_id in services is " + data.property_id)
    const [services, setServices] = useState([])
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://34.125.133.100:7860/services', { headers: { 'accept': 'application/json' } });
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
        <div><Nav />
            <div className="container-fluid"  >
                <div className="row black_border_new1">
                    <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Services Details</h4>
                    <hr style={{ borderTop: "1px solid black" }}></hr>
                    <h4 style={{ marginLeft: "20px" }}>
                        Select service you offers to guests:</h4>
                    <table id="st">

                        <tr><td>
                            <div style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
                                {services?.map(i => {
                                    return (


                                        <div className="checkbox-inline" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                                            <input type="checkbox"
                                                style={{ backgroundColor: i.check === true ? "grey" : "white", color: i.check === true ? 'white' : 'black' }}
                                                onClick={() => {
                                                    setServices(services.map((item) => {
                                                        if (item.service_id === i.service_id) {
                                                            item.check = !item.check
                                                        }
                                                        return item
                                                    }))

                                                }}
                                            />


                                            {i.service_value}
                                        </div>)

                                })}
                            </div>
                        </td>
                        </tr>

                    </table>
                </div>
                <button type="submit" style={{ marginBottom: "50px" }} className="btn btn-dark btn_add" name="submit" onClick={sendToDb}>Submit </button>
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
    )
}
export default Services;