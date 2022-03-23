import React, { useEffect, useContext, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardGallery() {
    const [allHotelDetails, setAllHotelDetails] = useState({})
    const [image, setImage] = useState({})
    const [editImage, setEditImage] = useState(0)
    const [deleteImage, setdeleteImage] = useState(0)
    const [actionImage, setActionImage] = useState({})
    const [addImage, setAddImage] = useState(0)
    const [enlargeImage, setEnlargeImage] = useState(0)
    const [actionEnlargeImage, setActionEnlargeImage] = useState({})

    /* Function to fetch Gallery images when page loads*/
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                // const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}`;
                const url = `http://103.136.36.27:7860/jammu-and-kashmir/srinagar/hotels/t2k001`
                console.log("URL " + url)
                const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
                console.log(response.data)
                setAllHotelDetails(response.data)
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
        fetchPropertyDetails();
    }, [])

    const onChangePhoto = (e, i) => {
        setImage({ ...image, imageFile: e.target.files[0] })
    }

    /* Function to upload image*/
    const uploadImage = () => {
        const imageDetails = image.imageFile
        const formData = new FormData();
        formData.append("file", imageDetails);
        formData.append("upload_preset", "Travel2Kashmir")

        axios.post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
            .then(response => {
                console.log(response?.data?.secure_url, 'res')
                setImage({ ...image, image_link: response?.data?.secure_url })
            })
            .catch(error => {
                toast.error("Some thing went wrong in uploading photo\n " + JSON.stringify(error.response.data), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.error('There was an error!', error);

            });

    }

    /* Function to add images*/
    const submitAddImage = () => {
        console.log("before sort" + JSON.stringify(actionImage))
        const imagedata = [{
            property_id: 't2k001',//to be fetched from context
            image_link: image.image_link,
            image_title: actionImage.image_title,
            image_descripiton: actionImage.image_description,
            image_category: actionImage.image_category
        }]

        const finalImage = { "images": imagedata }
        console.log(JSON.stringify(finalImage))
        axios.post(`/gallery`, finalImage).then(response => {
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
    
    /* Function to edit images*/
    const updateImageDetails = () => {
        const final_data = {
            "image_id": actionImage?.image_id,
            "image_title": allHotelDetails.image_title,
            "image_description": allHotelDetails.image_description,
            "image_type": allHotelDetails.image_type
        }
        console.log("the new information " + JSON.stringify(final_data))
        const url = '/images'

        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
            ((response) => {

                setEditImage(0);
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
                toast.error("Some thing went wrong in Edit\n " + JSON.stringify(error.response.data), {
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
    
    /* Function to delete images*/
    const submitDelete = () => {

        const url = `/${actionImage.image_id}`
        axios.delete(url).then
            ((response) => {
                console.log(response.data);
                setdeleteImage(0)
                toast.success("Image deleted successfully", {
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
                            <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Gallery</span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* Header */}
            <div className="mx-4 mb-4">
                <h6 className="text-xl mb-2 flex leading-none pl-4 pt-2 font-bold text-gray-900 ">
                    Gallery
                </h6>
                <div className="sm:flex">
                    <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 ml-5 sm:mb-0">
                        <form className="lg:pr-3" action="#" method="GET">
                            <label for="users-search" className="sr-only">Search</label>
                            <div className="mt-1 relative lg:w-64 xl:w-96">
                                <input type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search for images">
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
                        <button type="button"
                            onClick={() => setAddImage(1)}
                            data-modal-toggle="add-user-modal" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200  font-semibold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                            <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Add image
                        </button>
                        <a href="#" className="w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 font-semibold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                            <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg>
                            Export
                        </a>
                    </div>
                </div>
            </div>

            {/* Gallery Form */}
            <div className="flex-wrap container grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {allHotelDetails?.images?.map((item) => {
                    return (
                        <div className="block text-blueGray-600 text-xs font-bold " style={{ margin: "10px", marginLeft: "46px" }}>
                            <button onClick={()=>{setEnlargeImage(1); setActionEnlargeImage(item)}}> <img src={item.image_link} alt='pic_room' style={{ height: "170px", width: "300px" }} />
                            </button>
                            <table>
                                <tr className="pt-1">
                                    <td >
                                     <span className="pl-1  text-sm">{item.image_title}</span>
                                      
                                    </td>
                                    <td className="flex justify-end">
                                        <button
                                            onClick={() => { setEditImage(1); setActionImage(item) }}
                                            className="text-gray-500   hover:text-gray-900 
                                         cursor-pointer hover:bg-gray-100 rounded ">
                                            <svg className=" h-5  w-5 font-semibold "
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                        </button>
                                        <button
                                            onClick={() => { setdeleteImage(1); setActionImage(item) }} className="text-gray-500  hover:text-gray-900
                                         cursor-pointer  hover:bg-gray-100 rounded">
                                            <svg className="  w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    )
                }
                )
                }

            </div>

             {/* Modal Image Enlarge */}
             <div className={enlargeImage === 1 ? 'block' : 'hidden'}>
             <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl sm:inset-0 bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                    <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                        <div className="bg-gray-100 rounded-lg shadow relative">
                            <div className="flex justify-between p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold">
                            {actionEnlargeImage.image_title}     
                                </h3>
                              <button type="button"
                                    onClick={() => setEnlargeImage(0)}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="user-modal">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button> </div>
                                <div> <img src={actionEnlargeImage.image_link} alt='pic_room' style={{ height: "350px", width: "650px" }} />
                               </div>   
                          </div>
                    </div>
                </div> 
            </div>

            {/* Modal edit */}
            <div className={editImage === 1 ? 'block' : 'hidden'}>
                <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                    <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                        <div className="bg-white rounded-lg shadow relative">
                            <div className="flex items-start justify-between p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold">
                                    Edit image
                                </h3>
                                <button type="button"
                                    onClick={() => setEditImage(0)}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="user-modal">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <img src={actionImage?.image_link} alt='pic_room' style={{ height: "200px", width: "400px" }} />
                                    </div> <div className="col-span-6 sm:col-span-3">
                                        <label
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Image description
                                        </label>
                                        <textarea rows="6" columns="60"

                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            onChange={
                                                (e) => (
                                                    setAllHotelDetails({
                                                        ...allHotelDetails,
                                                        image_description: e.target.value
                                                    })
                                                )
                                            }
                                            defaultValue={actionImage?.image_description}
                                        />
                                    </div> <div className="col-span-6 sm:col-span-3">
                                        <label
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Image title
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={actionImage?.image_title}
                                            onChange={
                                                (e) => (
                                                    setAllHotelDetails({
                                                        ...allHotelDetails,
                                                        image_title: e.target.value
                                                    })
                                                )
                                            }
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            placeholder="Image Title" />
                                    </div>

                                </div>
                            </div>
                            <div className="items-center p-6 border-t border-gray-200 rounded-b">
                                <button
                                    onClick={() => updateImageDetails()}
                                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    type="submit">Edit image</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Add */}
            <div className={addImage === 1 ? 'block' : 'hidden'}>
                <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                    <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                        <div className="bg-white rounded-lg shadow relative">
                            <div className="flex items-start justify-between p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold">
                                    Add new image
                                </h3>
                                <button type="button"
                                    onClick={() => setAddImage(0)}
                                    className="text-gray-400 bg-transparent
                                 hover:bg-gray-200 
                                 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Image Upload
                                        </label>
                                        <div className="flex">
                                        <input
                                            type="file"
                                            onChange={e => {
                                                onChangePhoto(e, 'imageFile');
                                              
                                            }}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full px-2.5"
                                            defaultValue="" />
                                           
                                    </div> 
                                    <div className="col-span-6 sm:col-span-3">
                                    <button className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-200  font-medium rounded-lg text-sm px-5 py-2 mt-2 text-center"
                                               onClick={uploadImage}>Upload</button></div>
                                    </div>
                                    <img className="py-2" src={image.image_link} alt='Image_Preview' style={{ height: "80px", width: "600px" }} />
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Image Title
                                        </label>
                                        <input
                                            type="text"
                                            onChange={(e) => (setActionImage({ ...actionImage, image_title: e.target.value }))}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full px-2.5"
                                            placeholder="Image Title" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Image Description
                                        </label>
                                        <textarea rows="2" columns="60"
                                            onChange={(e) => (setActionImage({ ...actionImage, image_description: e.target.value }))}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            defaultValue="" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Image Category
                                        </label>
                                        <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            onChange={(e) => (setActionImage({ ...actionImage, image_category: e.target.value }))}>
                                            <option selected>Select image Category</option>
                                            <option value='room'>Room</option>
                                            <option value='outside'>Outside</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
<div className="items-center p-6 border-t border-gray-200 rounded-b">
 <button
                                    onClick={()=>{submitAddImage(); setAddImage(0)}}
                                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    type="submit">Add image</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Delete */}
            <div className={deleteImage === 1 ? 'block' : 'hidden'}>
                <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                    <div className="relative w-full max-w-md px-4 h-full md:h-auto">
                        <div className="bg-white rounded-lg shadow relative">
                            <div className="flex justify-end p-2">
                                <button
                                    onClick={() => setdeleteImage(0)}
                                    type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="delete-user-modal">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>

                            <div className="p-6 pt-0 text-center">
                                <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <h3 className="text-base font-normal text-gray-500 mt-5 mb-6">
                                    Are you sure you want to delete <span className="font-semibold">{actionImage?.image_title}</span> image?
                                </h3>
                                <button onClick={() => submitDelete()} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                    Yes, I'm sure
                                </button>
                                <button
                                    onClick={() => setdeleteImage(0)}
                                    className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" data-modal-toggle="delete-user-modal">
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

export default CardGallery