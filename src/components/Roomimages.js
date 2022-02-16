<<<<<<< Updated upstream
import React, { useState, useEffect, useContext  } from "react";
import { RoomContext } from "../context/roomprovider";
import { Context } from "../context/provider";
import axios from "axios";

=======
import React, { useState, useEffect, useContext } from "react";
import { RoomContext } from "../context/roomprovider";
import { Context } from "../context/provider";
import axios from "axios";
>>>>>>> Stashed changes
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roomimages = () => {
    const [roomdes] = useContext(RoomContext)
<<<<<<< Updated upstream
    const [data]=useContext(Context)
=======
    const [data] = useContext(Context)
>>>>>>> Stashed changes
    console.log("room_id in images is " + roomdes.room_id)
    const [images, setImages] = useState([])
    useEffect(() => {
        const fetchImages = async () => {
            try {
<<<<<<< Updated upstream
                const url = `http://34.125.133.100:5555/images/${data.property_id}`;
                const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
                console.log("Response from API"+response.data)

                setImages(response.data)
                console.log("image state"+images)
=======
                //const url = `/images/${data.property_id}`;
                const url = `/images/t2k001`;
                const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
                console.log("Response from API" + response.data)

                setImages(response.data)
                console.log("image state" + images)
>>>>>>> Stashed changes
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


<<<<<<< Updated upstream
    }, [])   

   
=======
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

>>>>>>> Stashed changes

    const sendToDb = (e) => {
        e.preventDefault()
        console.log(JSON.stringify(images))
        const datas = images.filter(i => i.check === true)
        const post = datas.map(i => i.image_id)
        console.log(JSON.stringify(post), 'post-images')
<<<<<<< Updated upstream
        
        const imageData = post.map((i) => {
            return { "room_id": roomdes.room_id, image_id: i }
        })
        console.log("image data is "+JSON.stringify(imageData))
=======

        const imageData = post.map((i) => {
            return { "room_id": roomdes.room_id, image_id: i }
        })
        console.log("image data is " + JSON.stringify(imageData))
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream



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
=======
    if(roomdes?.room_id==='none')
    {
        return(<h3>Submit Room Description First Then Images Can Be Added </h3>) 
    }
    else{
        return (
            <div>
                <h6 className="text-blueGray-400 text-sm mt-3  font-bold uppercase">
                    Select Room Images
                </h6><br />
    
                <div className="flex" >
                    {images?.map(i => {
                        return (
    
                            <div className="block text-blueGray-600 text-xs font-bold mb-2" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                                <div class="container grid grid-cols-4 gap-2 mx-auto">
                                    <div class="w-full rounded" >
                                        <img src={i.image_link} alt='pic_room' style={{ height: "160px", width: "260px" }} />
                                    </div>
                                </div>
                                <table>
                                    <tr>
                                        <td>
                                            <input type="checkbox"
    
>>>>>>> Stashed changes
                                                onClick={() => {
                                                    setImages(images.map((item) => {
                                                        if (item.image_id === i.image_id) {
                                                            item.check = !item.check
                                                        }
                                                        return item
                                                    }))
<<<<<<< Updated upstream

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
=======
    
                                                }}
                                            />
    
                                        </td>
                                        <td>
    
    
                                            <h4 class="pl-2 pt-1">{i.image_title}</h4>
                                        </td>
    
                                    </tr>
    
                                </table>
    
    
    
    
                            </div>)
    
                    })}
                </div>
    
    
    
>>>>>>> Stashed changes
                <ToastContainer position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
<<<<<<< Updated upstream


            </div>
        </div>
    )
=======
    
                
  
                <div className="relative w-full mb-3">
                <div className="text-center flex justify-end">
    <button onClick={sendToDb}
                    className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                >Submit Room Images</button>
            </div>
            </div>
            </div>
            
        )
    }

    
>>>>>>> Stashed changes
}
export default Roomimages;