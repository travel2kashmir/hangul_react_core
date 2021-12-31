import React, { useState, useContext } from "react";
import Axios from "axios";
import { Context } from './context/provider';
import Nav from "./Nav";
const Formtable = () => {
  const [data, setData] = useContext(Context)
  const [allPropertyDetails, setAllPropertyDetails] =
    useState({
      property_name: '',
      property_brand: '',
      property_category: '',
      established_year: '',
      star_rating: '',
      description_title: '',
      description_body: '',
      description_date: ''
    });
  const [propertyAddress, setPropertyAddress] = useState({
    address_street_address: '',
    address_longitude: '',
    address_latitude: '',
    address_landmark: '',
    address_city: '',
    address_precision: '',
    address_zipCode: '',
    address_province: '',
    address_country: ''
  })

  const setContext = (id) => {
    console.log("into set context")
    const obj = {
      property_id: id,
      property_name: allPropertyDetails.property_name,
      property_category: allPropertyDetails.property_category,
      property_address_country: propertyAddress.address_country,
      property_address_province: propertyAddress.address_province,
      property_address_city: propertyAddress.address_city
    }
    console.log("data to be set " + JSON.stringify(obj))
    setData(obj)
    console.log("the data in context " + JSON.stringify(data))

  }


  function finalHandleSubmit(e) {
    e.preventDefault()

    const propertydata = { address: [propertyAddress] }
    const finalData = { ...allPropertyDetails, ...propertydata }
    console.log(JSON.stringify(finalData), 'finaldata')
    Axios.post('/basic', JSON.stringify(finalData),
      {
        headers: { 'content-type': 'application/json' }
      }).then(response => {
        console.log(response)
        alert("property created with id " + response.data.property_id);
        setContext(response.data.property_id)
      })
      .catch(error => {
        console.log(error.response)
        alert(JSON.stringify(error.response.data))
      });

  }

  return (
    <div><Nav />
      <div className="container-fluid">


        <div className="row black_border_new1">

          <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Property Details</h4>
          <hr style={{ borderTop: "1px solid black" }}></hr>
          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label >Property name</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input type="text" class="form-control" placeholder="enter property name"
                  onChange={e => setAllPropertyDetails({ ...allPropertyDetails, property_name: e.target.value })} />
                <br />
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label>Property Category</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <select className="custom-select mr-sm-2 form-control" id="inlineFormCustomSelect"
                  onChange={e => setAllPropertyDetails({ ...allPropertyDetails, property_category: e.target.value })}>
                  <option selected>Select property type</option>
                  <option value="Hotel" >Hotel</option>
                  <option value="Resort">Resort</option>
                  <option value="Motel">Motel</option>
                </select><br />
              </div>
            </div>
          </div>



          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label>Property Brand</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input type="text" className=" form-control" placeholder="enter property brand "
                  onChange={e => setAllPropertyDetails({ ...allPropertyDetails, property_brand: e.target.value })} />
                <br /> </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label>Established Date</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input type="Date" className=" form-control"
                  onChange={e => setAllPropertyDetails({ ...allPropertyDetails, established_year: e.target.value })} />
                <br /></div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label>Star  Rating</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input type="text" className=" form-control" placeholder="enter property rating"
                  onChange={e => e.target.value <= 7 && e.target.value >= 0 ? setAllPropertyDetails({ ...allPropertyDetails, star_rating: e.target.value }) : setAllPropertyDetails({ ...allPropertyDetails, starRating: '' })} />
                {allPropertyDetails.starRating === '' ? <span></span> : <span></span>}<br />
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label >Description title</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input type="text" className=" form-control" placeholder="enter property description title"
                  onChange={e => setAllPropertyDetails({ ...allPropertyDetails, description_title: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label>Description</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <textarea className=" form-control" placeholder="enter property description" rows="5" cols="25"
                  onChange={e => setAllPropertyDetails({ ...allPropertyDetails, description_body: e.target.value })} />
                <br />
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label>Descripiton date</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input type="Date" className=" form-control"
                  onChange={e => setAllPropertyDetails({ ...allPropertyDetails, description_date: e.target.value })} />
                <br />
              </div>
            </div>
          </div>


        </div>
      <div className="row black_border_new1" >

          <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Address Details</h4>
          <hr style={{ borderTop: "1px solid black" }}></hr>
          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label >Street address</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input type="text" className=" form-control" placeholder="enter street address"
                  onChange={e => setPropertyAddress({ ...propertyAddress, address_street_address: e.target.value })} />
                <br />
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label>Landmark</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input type="text" className=" form-control" placeholder="enter landmark"
                  onChange={e => setPropertyAddress({ ...propertyAddress, address_landmark: e.target.value })} />
                <br />
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label >Longitude</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input type="text" className=" form-control" placeholder="enter longitude value"
                  onChange={e => setPropertyAddress({ ...propertyAddress, address_longitude: e.target.value })} />
                <br />
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label>Latitude</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input type="text" className=" form-control" placeholder="enter latitude value"
                  onChange={e => setPropertyAddress({ ...propertyAddress, address_latitude: e.target.value })} />
                <br />
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label >Postal code</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input id="zip" type="text" className=" form-control" placeholder="enter postal code"
                  onChange={e => setPropertyAddress({ ...propertyAddress, address_zipcode: e.target.value })} />

                <br />
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label>Precision</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">

                <input type="text" className="form-control" id="pr" placeholder="enter precision"
                  onChange={e => setPropertyAddress({ ...propertyAddress, address_precision: e.target.value })} />

                <br />
              </div>
            </div>
          </div>

          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label>City</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <select className="custom-select mr-sm-2 form-control" id="inlineFormCustomSelect"
                  onChange={e => setPropertyAddress({ ...propertyAddress, address_city: e.target.value })} >
                  <option selected>Select city</option>
                  <option value="Srinagar" >Srinagar</option>
                  <option value="Baramulla">Baramulla</option>
                  <option value="Anantnag">Anantnag</option>
                  <option value="Gulmarg">Gulmarg</option>
                  <option value="Pahalgam">Pahalgam</option>
                </select>

                <br />
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label >Province</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <select className="custom-select mr-sm-2 form-control" id="inlineFormCustomSelect"
                  onChange={e => setPropertyAddress({ ...propertyAddress, address_province: e.target.value })} >
                  <option selected>Select province</option>
                  <option value="Jammu and Kashmir" >Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Kargil">Kargil</option>
                </select>

                <br />
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
              <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                <label>Country</label></div>
              <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                <input type="text" className=" form-control" placeholder="enter country"
                  onChange={e => setPropertyAddress({ ...propertyAddress, address_country: e.target.value })} />

                <br />
              </div>
            </div>
          </div>
        </div>
        <button type="button" onClick={finalHandleSubmit} className="btn btn-dark btn_add">
          Submit</button>
      </div></div>
  )
}
export default Formtable;












