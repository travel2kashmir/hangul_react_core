import React, { useState, useContext } from "react";
import { Context } from "../../context/provider";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function CardReviews() {
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
        console.log(error.response.data)
        toast.error(JSON.stringify(error.response.data), {
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
       
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Review Details</h6>
            
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Property Reviews
            </h6>
              
            {
          review?.map((review, index) =>
          (<div  key={review?.index} >
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                   Review link
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => onChange(e, review?.index, 'review_link')}
                    placeholder="link of review"                  />
                 
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                    Review title
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => onChange(e, review?.index, 'review_title')}
                    placeholder="Review title"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                   Review author
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => onChange(e, review?.index, 'review_author')}
                    placeholder="Review Author"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                   Review Rating
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => onChange(e, review?.index, 'review_rating')}
                    placeholder="Ratings"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                   Reviewer Category
                  </label>
                  <select 
                  onChange={e => onChange(e, review?.index, 'review_type')}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
          <option selected>Select Reviewer Category</option>
          <option value="user" >User</option>
          <option value="editorial">Editorial</option>
          </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                   Service Date
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => onChange(e, review?.index, 'service_date')}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                  Review Date
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => onChange(e, review?.index, 'review_date')}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                   Review Content
                  </label>
                  <textarea rows="3" columns="60"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => onChange(e, review?.index, 'review_content')}
                  />
                </div>
              </div>
            </div>
            <div className="text-center flex justify-end">
           
           
            <button
             className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
             onClick={() => removeReview(review?.index)}
            >
              -Remove Review
            </button>
          </div>
           </div> )
          )}

            <div className="text-center flex justify-end">
           
            <button
             className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
             onClick={addReview}
            >
              +Add Review
            </button>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleSubmit}
            >
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

export default CardReviews