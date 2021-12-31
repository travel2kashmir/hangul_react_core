import React, { useState, useContext } from "react";
import { Context } from "./context/provider";
import Axios from "axios";
import Nav from "./Nav";
const Galleryform = ({ propertyId }) => {
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
  const [imageData, setImageData] = useState([imageTemplate]?.map((i, id) => { return { ...i, index: id } }))



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
      alert(JSON.stringify(response.data))
    }).catch(error => {
      console.log("there is error" + error)
      alert(JSON.stringify(error.response.data))
    });

  }

  const addPhotos = () => {
    setImageData([...imageData, imageTemplate]?.map((i, id) => { return { ...i, index: id } }))
  }

  const removeImage = (index) => {
    console.log("index is" + index)
    const filteredImages = imageData.filter((i, id) => i.index !== index)
    console.log("data sent to state " + JSON.stringify(filteredImages))
    setImageData(filteredImages)
  }

  const onChange = (e, index, i) => {

    setImageData(imageData?.map((item, id) => {
      if (item.index === index) {
        item[i] = e.target.value
      }
      return item
    }))
  }

  const uploadImage = (index) => {
    const imageDetails = imageData?.find(i => i.index === index)?.imageFile
    const formData = new FormData();
    console.log(imageDetails, 'imageDetails')
    formData.append("file", imageDetails);
    formData.append("upload_preset", "Travel2Kashmir")

    Axios.post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
      .then(response => {
        console.log(response?.data?.secure_url, 'res')
        const newData = imageData?.map((i) => {
          if (i.index === index) {
            i.image_link = response?.data?.secure_url
          }
          return i
        })
        setImageData(newData)
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

  }



  const onChangePhoto = (e, index, i) => {
    console.log(e.target.files, 'index')
    setImageData(imageData?.map((item, id) => {
      if (item.index === index) {
        item[i] = e.target.files[0]
      }
      return item
    }))
  }



  return (
    <div><Nav />

      <div className="container-fluid" id="gt" >
        {imageData?.map((imageData, index) =>
        (
          <div>
            <div className="row black_border_new1">

              <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Gallery Details</h4>
              <hr style={{ borderTop: "1px solid black" }}></hr>
              <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                  <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                    <label for="im">Image</label>
                  </div>
                  <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                    <input type="file" className=" form-control" id="im" placeholder="Select Image"
                      onChange={e => onChangePhoto(e, imageData?.index, 'imageFile')} /><br />
                  </div>
                </div>


                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                  <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                    <label for="it">Image title</label>

                  </div>
                  <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                    <input type="tel" className=" form-control" id="it" placeholder="enter image title"
                      onChange={e => onChange(e, imageData?.index, 'image_title')} /><br />
                  </div>
                </div>
              </div>


              <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                  <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                    <label for="id">Image description</label>
                  </div>
                  <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                    <textarea id="id" className=" form-control" placeholder="Description" rows="4" cols="10"
                      onChange={e => onChange(e, imageData?.index, 'image_description')}
                    ></textarea>
                    <br />
                  </div>
                </div>


                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                  <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                    <label for="ic">Image category</label>

                  </div>
                  <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                    <select className=" form-control" id="pcat inlineFormCustomSelect"
                      onChange={e => onChange(e, imageData?.index, 'image_category')}
                    >
                      <option selected>Select image category</option>
                      <option value="Room">Room</option>
                      <option value="Outside">Outside</option>
                    </select><br />
                  </div>
                </div>
              </div>
             
              <button type="button" className="btn btn-dark btn_img_upl" onClick={() => uploadImage(imageData?.index)}>Upload </button> 
           
            </div>

            <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
              <div className="col-md-8 col-sm-8 col-xs-8 col-lg-8"></div>
              <div className="col-md-2 col-sm-2 col-xs-2 col-lg-2">
                <button type="button" className="btn btn-dark btn_con_add" onClick={addPhotos}>+Add more images</button>

              </div>
              
              <div className="col-md-2 col-sm-2 col-xs-2 col-lg-2">
                <button type="button" className="btn btn-dark btn_con_add" onClick={() => removeImage(imageData?.index)}>Remove Image </button>
              

              </div>
            </div>

          </div>


        ))
        }


        <button type="button" className="btn btn-dark btn_basic" onClick={handleSubmit}>Submit</button>



      </div>
    </div>
  )
}
export default Galleryform;