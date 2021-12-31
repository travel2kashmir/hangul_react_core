import React, { useState, useContext } from "react";
import { Context } from "./context/provider";
import Axios from "axios";
import Nav from "./Nav";



const ReviewForm = ({ propertyId }) => {
  const [data] = useContext(Context)
  console.log("property id in review is " + data.property_id)
  const reviewTemplate = {
    property_id: data.property_id,
    review_link: '',
    review_title: '',
    review_author: '',
    review_rating: '',
    review_type: '',
    service_date: '',
    review_date: '',
    review_content: ''
  }
  const [review, setReview] = useState([reviewTemplate]?.map((i, id) => { return { ...i, index: id } }))

  const addReview = () => {
    setReview([...review, reviewTemplate]?.map((i, id) => { return { ...i, index: id } }))
  }
  function handleSubmit(e, index) {
    e.preventDefault()
    const reviewdata = review?.map((i => {
      return {
        property_id: i.property_id,
        review_link: i.review_link,
        review_title: i.review_title,
        review_author: i.review_author,
        review_rating: i.review_rating,
        review_type: i.review_type,
        service_date: i.service_date,
        review_date: i.review_date,
        review_content: i.review_content
      }
    }))
    const finalData = { reviews: reviewdata }
    console.log(JSON.stringify(finalData), 'finaldata')
    Axios.post(`/review`, finalData,
      {
        headers: { 'content-type': 'application/json' }
      }).then(response => {
        console.log(response)
        alert(JSON.stringify(response.data))
      })
      .catch(error => {
        console.log(error.response.data)
        alert(JSON.stringify(error.response.data))
      });

  }
  const onChange = (e, index, i) => {
    console.log(index, 'index')
    setReview(review?.map((item, id) => {
      if (item.index === index) {
        item[i] = e.target.value
      }
      return item
    }))
  }
  const removeReview = (index) => {
    console.log("index is" + index)
    const filteredReviews = review.filter((i, id) => i.index !== index)
    console.log("data sent to state " + JSON.stringify(filteredReviews))
    setReview(filteredReviews)
  }

  return (

    <div> <Nav />
      <div id="rs" className="container-fluid ">

        {
          review?.map((review, index) =>
          (

            <div key={review?.index} >
              <div className="row black_border_new1">
                <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Review Details</h4>
                <hr style={{ borderTop: "1px solid black" }}></hr>
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                  <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                      <label for="rl">Review link</label></div>
                    <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                      <input type="text" className=" form-control" id="rl" value={review?.review_link} placeholder="enter title of review"
                        onChange={e => onChange(e, review?.index, 'review_link')} /><br />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                      <label for="rt">Review title</label></div>
                    <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                      <input type="text" className=" form-control" id="rl" value={review?.review_title} placeholder="enter title of review"
                        onChange={e => onChange(e, review?.index, 'review_title')} /><br />
                    </div>
                  </div>
                </div>


                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                  <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                      <label for="ra">Review author</label></div>
                    <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                      <input type="text" className=" form-control" id="ra" value={review?.review_author} placeholder="enter author of review"
                        onChange={e => onChange(e, review?.index, 'review_author')} /><br />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                      <label for="ra">Rating</label></div>
                    <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                      <input type="text" className=" form-control" id="R" value={review?.review_rating} placeholder="enter rating of review"
                        onChange={e => onChange(e, review?.index, 'review_rating')} /><br />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                  <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                      <label for="ut">Reviewer category</label></div>
                    <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                      <select className="custom-select mr-sm-2 form-control"
                        value={review?.review_type} id="ut inlineFormCustomSelect"
                        onChange={e => onChange(e, review?.index, 'review_type')}><br />
                        <option selected>Select reviewer category</option>
                        <option value="Editorial">Editorial</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                      <label for="sd">Service Date</label></div>
                    <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                      <input type="Date" className=" form-control" value={review?.serviceDate}
                        onChange={e => onChange(e, review?.index, 'service_date')} /><br />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                  <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                      <label for="rd">Review Date</label></div>
                    <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                      <input type="date" className=" form-control" value={review?.review_date} id="rd"
                        onChange={e => onChange(e, review?.index, 'review_date')} /><br />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
                    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
                      <label for="rc">Review Content</label></div>
                    <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
                      <textarea id="rc" className=" form-control" rows="4" cols="10" value={review?.review_content}
                        onChange={e => onChange(e, review?.index, 'review_content')}></textarea><br />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                <div className="col-md-8 col-sm-8 col-xs-8 col-lg-8"></div>

                <div className="col-md-2 col-sm-2 col-xs-2 col-lg-2">
                  <button type="button" className="btn btn-dark btn_con_add" onClick={addReview}>+ Add more reviews</button>
                </div>

                <div className="col-md-2 col-sm-2 col-xs-2 col-lg-2">
                  <button type="button" className="btn btn-dark btn_con_add" onClick={() => removeReview(review?.index)}>-Remove review</button>
                </div>
              </div>






            </div>

          )
          )
        }
        <button type="button" className="btn btn-dark btn_add" onClick={handleSubmit}  >Submit</button>
      </div>


    </div>
  )
}
export default ReviewForm;