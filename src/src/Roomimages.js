import React, { useState, useEffect, useContext  } from "react";
import { Context } from "./context/provider";
import axios from "axios";
import Nav from "./Nav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roomimages = () => {
    const [roomdes] = useContext(Context)
    console.log("room_id in images is " + roomdes.room_id)
    const [images, setImages] = useState([])
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://34.125.133.100:5555/images/t2k0092', { headers: { 'accept': 'application/json' } });
                console.log("Response from API"+response.data)

                setImages(response.data)
                console.log("image state"+images)
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


        fetchImages();


    }, [])   

    console.log(JSON.stringify(images))
    const datas = images.filter(i => i.check === true)
    const post = datas.map(i => i.image_id)
    console.log(JSON.stringify(post), 'post')

    const sendToDb = (e) => {
        e.preventDefault()
        console.log("data is " + JSON.stringify(post))
        const imageData = post.map((i) => {
            return { "room_id": roomdes.room_id, image_id: i }
        })

        const final = { "room_images": imageData }
        console.log("data sent is " + JSON.stringify(final))
        axios.post('/images', final, {
            headers: { 'content-type': 'application/json' }
        }).then(response => {
            console.log(response)
            toast.success(JSON.stringify(response.roomdes.message), {
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
                toast.error("Some thing went wrong \n " + JSON.stringify(error.response.roomdes), {
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
            <div className="container-fluid"  >
                <div className="row black_border_new1">
                    <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Room Images</h4>
                    <hr style={{ borderTop: "1px solid black" }}></hr>
                    <h4 style={{ marginLeft: "20px" }}>
                        Select Room images:</h4>
                    <table id="st">

                        <tr><td>
                            <div style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
{images?.map(i => {return (<div className="checkbox-inline" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                                            <input type="checkbox"
                                                style={{ backgroundColor: i.check === true ? "grey" : "white", color: i.check === true ? 'white' : 'black' }}
                                                onClick={() => {
                                                    setImages(images.map((item) => {
                                                        if (item.image_id === i.image_id) {
                                                            item.check = !item.check
                                                        }
                                                        return item
                                                    }))

                                                }}
                                            />


                                            <img src= {i.image_link} style={{width:100,height:100}} alt='pic_room'/>
                                           
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
export default Roomimages;