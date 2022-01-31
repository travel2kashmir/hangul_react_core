import React, { useState, useEffect, useContext } from "react";
import { RoomContext } from "../context/roomprovider";
import { Context } from "../context/provider";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roomimages = () => {
    const [roomdes] = useContext(RoomContext)
    const [data] = useContext(Context)
    console.log("room_id in images is " + roomdes.room_id)
    const [images, setImages] = useState([])
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const url = `http://34.125.133.100:5555/images/${data.property_id}`;
                const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
                console.log("Response from API" + response.data)

                setImages(response.data)
                console.log("image state" + images)
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


    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const sendToDb = (e) => {
        e.preventDefault()
        console.log(JSON.stringify(images))
        const datas = images.filter(i => i.check === true)
        const post = datas.map(i => i.image_id)
        console.log(JSON.stringify(post), 'post-images')

        const imageData = post.map((i) => {
            return { "room_id": roomdes.room_id, image_id: i }
        })
        console.log("image data is " + JSON.stringify(imageData))
        const final = { "room_images": imageData }
        console.log("data sent is " + JSON.stringify(final))
        axios.post('/room-images', final, {
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
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Select Room Images
            </h6><br />

            <div style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
                {images?.map(i => {
                    return (
                        <div className="block   text-blueGray-600 text-xs font-bold mb-2" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
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


                            <img src={i.image_link} style={{ width: 100, height: 100 }} alt='pic_room' />

                        </div>)

                })}
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
    )
}
export default Roomimages;