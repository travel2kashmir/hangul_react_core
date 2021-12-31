import React, { useState, useContext, useEffect } from "react";
import { Context } from "./context/provider";
import axios from "axios";
import Nav from "./Nav";

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
            alert(JSON.stringify(response.data))
        })
            .catch(error => {
                console.log(error.response)
                alert(JSON.stringify(error.response.data))
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

                        <tr><td> {services?.map(i => {
                            return <p>


                                <div className="checkbox-inline" style={{ margin: "10px", marginLeft: "15px", fontFamily: "fantasy", fontSize: "15px" }}>
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
                                </div></p>

                        })}
                        </td>
                        </tr>

                    </table>
                </div>
                <button type="submit" style={{ marginBottom: "50px" }} className="btn btn-dark btn_add" name="submit" onClick={sendToDb}>Submit </button>



            </div>
        </div>
    )
}
export default Services;