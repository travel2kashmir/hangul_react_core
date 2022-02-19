import React, { useState, useContext } from "react";
import { Context } from "../../context/provider";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardGallery() {
  const [data] = useContext(Context)
  console.log("property_id in gallery is" + data.property_id)
  const imageTemplate = {
    property_id: data.property_id,
    image_link: '',
    image_title: '',
    image_description: '',
    image_category: '',
    imageFile: ''
  }
  const [imageData, setImageData] = useState()



  const handleSubmit = () => {
    console.log("vefore sort" + JSON.stringify(imageData))
    const imagedata = imageData?.map((i => {
      return {
        property_id: i.property_id,
        image_link: i.image_link,
        image_title: i.image_title,
        image_descripiton: i.image_description,
        image_category: i.image_category
      }
    }))
    const finalImage = { "images": imagedata }
    console.log(JSON.stringify(finalImage))
    Axios.post(`/gallery`, finalImage).then(response => {
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
 return (

    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Gallery Details</h6>

          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Image Gallery  
            </h6>
            {imageData?.map((imageData, index) => (
              <div>                        <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Image Upload
                    </label>
                    <input
                      type="file"
                      onChange={e => onChangePhoto(e, imageData?.index, 'imageFile')}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue=""
                    />

                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Image title
                    </label>
                    <input
                      type="text"
                      onChange={e => onChange(e, imageData?.index, 'image_title')}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Image Title"                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Image description
                    </label>
                    <textarea rows="2" columns="60"
                      onChange={e => onChange(e, imageData?.index, 'image_description')}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Image Description"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Image category
                    </label>
                    <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => onChange(e, imageData?.index, 'image_category')}>
                      <option selected>Select Image Category</option>
                      <option value="room">Room</option>
                      <option value="hotel">Hotel</option>

                    </select>
                  </div>
                </div>
              </div>
                <div className="text-center flex justify-end">
                <button
                    className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                    onClick={() => uploadImage(imageData?.index)}
                  >
                    Upload Image
                  </button>
                 
                  <button
                    className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                    onClick={() => removeImage(imageData?.index)}
                  >
                    -Remove Image
                  </button>
                </div>
               

              </div>
             ))}
             <div className="text-center flex justify-end" style={{marginTop:"10px"}}>
                <button
                    className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                    onClick={addPhotos}
                  >
                    +Add Image
                  </button>
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1  mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}>
                    Submit
                  </button>
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
          </form>
        </div>
      </div>
    </>
  );
}
export default CardGallery