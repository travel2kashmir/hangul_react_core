import axios from "axios";
import React, { useEffect, useContext, useState } from 'react';
import CardGallery from '../Cards/CardGallery'
import { Context } from '../../context/provider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PropertySummaryTab2 = () => {
  const [data] = useContext(Context)
  const [allHotelDetails, setAllHotelDetails] = useState({})
  const [allservices, setAllservices] = useState({})
  const [filteredservices, setFilteredservices] = useState({})
  const [updatereview, setUpdatereview] = useState(false)
  const [updateservices, setUpdateservices] = useState(false)
  const [review, setReview] = useState({})
  const [viewreview, setViewreview] = useState(false)
  const [addimage, setAddimage] = useState(false)
  const [openTab, setOpenTab] = React.useState(1);
  const [deleteimage, setDeleteimage] = React.useState(false);
  const [deleteservices, setDeleteservices] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showModal, setShowModal] = React.useState(false);
  const [id, setId] = useState()
  let count = 0;
  useEffect(() => {
    const fetchServices = async () => {
      setLoader(true)
      try {
        // const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}`;
        const url = `http://103.136.36.27:7860/jammu-and-kashmir/srinagar/hotels/t2k001`
        console.log("URL " + url)
        const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
        console.log(response.data)
        setLoader(false)
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

    const fetchAllservices = async () => {
      try {
        const response = await axios.get('http://103.136.36.27:7860/services', { headers: { 'accept': 'application/json' } });
        console.log(response.data)
        setAllservices(response.data)
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
    fetchAllservices();
    fetchServices();
  }, [])

  const filtering = () => {
    const data2 = allHotelDetails?.services;
    const Uservices = data2.map(i => i.service_value)
    const data1 = allservices;
    const finaldata = data1.map((i) => {
      const newOne = Uservices?.includes(i.service_value) ?? false
      if (!newOne) {
        return i
      }
    }).filter(i => i !== undefined)
    setFilteredservices(finaldata)
    console.warn("services not selected so far " + JSON.stringify(filteredservices))

  }
  const submitDelete = (props) => {
    console.log(JSON.stringify(data))
    alert("id is " + JSON.stringify(props))
    const url = `/${props}`
    alert("url to be hit" + url)
    axios.delete(url).then
      ((response) => {
        console.log(response.data);
        alert('Delete  Successful')
      })
      .catch((response) => {
        console.log(response);
        alert('Delete  Failed')
      })
  }

  const submitServiceDelete = (props) => {
    console.log("submit service delete " + JSON.stringify(data))
    alert("id is " + JSON.stringify(props))
    const url = `/${data.property_id}/${props}`
    alert("url to be hit" + url)
    axios.delete(url).then
      ((response) => {
        console.log(response.data);
        alert('Delete  Successful')
      })
      .catch((response) => {
        console.log(response);
        alert('Delete  Failed')
      })
  }


  const sendToDb = (e) => {
    e.preventDefault()
    const datas = filteredservices.filter(i => i.check === true)
    const post = datas.map(i => i.service_id)
    console.log(JSON.stringify(post), 'post')


    const serviceData = post.map((i) => {
      return { "property_id": data.property_id, service_id: i }
    })

    const final = { "services": serviceData }
    console.log("data sent is " + JSON.stringify(final))
    axios.post('/services', final, {
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




  const submitReviewEdit = () => {
    console.log(JSON.stringify(data))
    const final_data = {
      "property_id": data.property_id,
      "review_link": allHotelDetails.review_link,
      "review_title": allHotelDetails.review_title,
      "review_author": allHotelDetails.review_author,
      "review_rating": allHotelDetails.review_rating,
      "review_type": allHotelDetails.review_type,
      "service_date": allHotelDetails.service_date,
      "review_date": allHotelDetails.review_date,
      "review_content": allHotelDetails.review_content
    }
    console.log("the new information " + JSON.stringify(final_data))
    const url = '/review'
    axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        console.log(response.data);
        alert('Put successful')
      })
      .catch((response) => {
        console.log(response);
        alert('Put failed')
      })
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
          role="tablist"
        >
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 1
                  ? "text-white bg-orange-500"
                  : "text-lightBlue-600 bg-white")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Reviews
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 2
                  ? "text-white bg-orange-500"
                  : "text-lightBlue-600 bg-white")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              Images
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 3
                  ? "text-white bg-orange-500"
                  : "text-lightBlue-600 bg-white")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(3);
                filtering();
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              Services
            </a>
          </li>
        </ul>
      </div>
      {allHotelDetails !== null && allHotelDetails !== undefined
        &&
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">

              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <>
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">

                      <h6 className="text-blueGray-700 text-xl font-bold">Property Reviews</h6><br />
                    </div>
                  </div>
                  {viewreview === false ?
                    <div className="block w-full overflow-x-auto">
                      {/* Projects table */}
                      <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                          <tr>

                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Review Author
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Review title
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Review type
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">

                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {allHotelDetails?.Reviews?.map((item) => (
                            <tr>

                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {item?.review_author}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {item?.review_title}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {capitalizeFirstLetter(item?.review_type)}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                <button
                                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                  onClick={() => { setViewreview(!viewreview); setReview(item) }} type="button"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    :
                    <div>
                      {updatereview === false ?
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                          <form>

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
                                    readOnly="readonly" defaultValue={review?.review_link}

                                  />
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
                                    readOnly="readonly" defaultValue={review?.review_title}
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
                                    readOnly="readonly" defaultValue={review?.review_author}


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
                                    readOnly="readonly"
                                    defaultValue={review?.review_rating}

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
                                  <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    defaultValue={review?.review_type} readOnly="readonly"


                                  />
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
                                    defaultValue={review?.service_date} readOnly="readonly"
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
                                    defaultValue={review?.review_date} readOnly="readonly"

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
                                  <textarea rows="5" columns="50"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                                    defaultValue={review?.review_content} readOnly="readonly"

                                  />
                                </div>
                              </div>
                            </div>
                          </form>

                          <div className="text-center flex justify-end mt-8"  >

                            <button
                              className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                              onClick={() => { setViewreview(!viewreview) }}
                            >

                              Back
                            </button>
                            <button className=" bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                              onClick={() => setUpdatereview(!updatereview)}>
                              Edit</button>
                            <button className="bg-red-600 text-white active:bg-red-600 
                            font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md
                             outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                              onClick={() => {
                                setId(review?.review_id);
                                setShowModal(true)
                              }}
                              type="button" >Delete</button>
                          </div>

                          <div className="text-center flex justify-end" >{showModal ? (
                            <>
                              <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <div className="relative w-auto my-6 mx-auto max-w-sm">
                                  {/*content*/}
                                  <div className="border-2 px-2 rounded-lg shadow-lg relative flex flex-col w-full bg-blueGray-600 outline-none focus:outline-none">
                                    {/*header*/}
                                    {/*body*/}
                                    <div className=" p-6  flex-auto">
                                      <p className="my-2 text-white text-sm leading-relaxed">
                                        Are you sure, you want to delete?
                                      </p>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                      <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                      >
                                        Close
                                      </button>
                                      <button
                                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => submitDelete(id)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </>
                          ) : <></>}</div>

                        </div>
                        :
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                          <form>

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
                                    onChange={
                                      (e) => (
                                        setAllHotelDetails({ ...allHotelDetails, review_link: e.target.value })
                                      )
                                    }
                                    defaultValue={review?.review_link}

                                  />
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
                                    defaultValue={review?.review_title}
                                    onChange={
                                      (e) => (
                                        setAllHotelDetails({ ...allHotelDetails, review_title: e.target.value })
                                      )
                                    }

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
                                    defaultValue={review?.review_author}
                                    onChange={
                                      (e) => (
                                        setAllHotelDetails({ ...allHotelDetails, review_author: e.target.value })
                                      )
                                    }

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
                                    onChange={
                                      (e) => (
                                        setAllHotelDetails({ ...allHotelDetails, review_rating: e.target.value })
                                      )
                                    }
                                    defaultValue={review?.review_rating}

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
                                    onChange={
                                      (e) => (
                                        setAllHotelDetails({ ...allHotelDetails, review_type: e.target.value })
                                      )
                                    }
                                    className="border-0 px-3 py-3 
                                    placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
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
                                    defaultValue={review?.service_date}
                                    onChange={
                                      (e) => (
                                        setAllHotelDetails({ ...allHotelDetails, service_date: e.target.value })
                                      )
                                    }
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
                                    defaultValue={review?.review_date}
                                    onChange={
                                      (e) => (
                                        setAllHotelDetails({ ...allHotelDetails, review_date: e.target.value })
                                      )
                                    }
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
                                  <textarea rows="5" columns="50"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    onChange={
                                      (e) => (
                                        setAllHotelDetails({ ...allHotelDetails, review_content: e.target.value })
                                      )
                                    }
                                    defaultValue={review?.review_content}

                                  />
                                </div>
                              </div>
                            </div>
                          </form>

                          <div className="text-center flex justify-end mt-8"  >
                            <button className=" bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => setUpdatereview(!updatereview)}>Cancel</button>
                            <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600
                             font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none
                              focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              onClick={submitReviewEdit} type="button" >Submit</button>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </>
              </div>

              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                {addimage === false ?
                  <div>
                    <h6 className="text-blueGray-700 text-xl font-bold">Property Gallery</h6><br />
                    <div>{showModal ? (
                      <>
                        <div
                          className="justify-center items-center  flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <div className="relative w-auto my-6 mx-auto max-w-sm">
                            {/*content*/}
                            <div className="border-2 px-2 rounded-lg shadow-lg relative flex flex-col w-full bg-blueGray-600 outline-none focus:outline-none">
                              {/*header*/}
                              {/*body*/}
                              <div className=" p-6  flex-auto">
                                <p className="my-2 text-white text-sm leading-relaxed">
                                  Are you sure, you want to delete?
                                </p>
                              </div>
                              {/*footer*/}
                              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                >
                                  Close
                                </button>
                                <button
                                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => submitDelete(id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                      </>
                    ) : <></>}</div>

                    <div className="flex flex-wrap" style={{ width: "100%" }} >

                      {allHotelDetails?.images?.map((item) => {
                        return (
                          <div className="block text-blueGray-600 text-xs font-bold mb-2 " style={{ margin: "10px", marginLeft: "46px" }}>
                            <div className="container grid grid-cols-3 gap-2">
                              <div class="w-full rounded" >
                                <img src={item.image_link} alt='pic_room' style={{ height: "160px", width: "260px" }} />

                              </div>
                            </div>
                            <table>
                              <tr>
                                <td>
                                  <h4 class="pl-2 pt-1">{item.image_title}</h4>
                                </td>
                              </tr>

                            </table>
                            {deleteimage === true ?
                              <div className="text-center  flex justify-end">
                                <button onClick={() => {
                                  setId(item.image_id);
                                  setShowModal(true)
                                }}>
                                  <i className="fas fa-trash  mr-2  text-base" >

                                  </i>  </button>




                              </div>
                              : <></>}
                          </div>

                        )
                      }
                      )
                      }

                    </div>
                    {deleteimage === false ?
                      <div className="text-center flex justify-end mt-6" style={{ paddingBottom: "10px" }}>
                        <button className="bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setAddimage(!addimage)}>Add More Images</button>
                        <button className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                          onClick={() => setDeleteimage(!deleteimage)} >Delete Images</button>


                      </div>
                      :

                      <div className="text-center flex justify-end mt-6" style={{ paddingBottom: "10px" }}>

                        <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setDeleteimage(!deleteimage)} >Back</button>
                      </div>


                    }



                  </div>

                  :
                  <div>
                    <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setAddimage(!addimage)} >Back</button>
                    <CardGallery />
                  </div>
                }


              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                {updateservices === false ?
                  <div>
                    <h6 className="text-blueGray-700 text-lg font-bold">Property Services</h6><br />
                    {deleteservices === false ?
                      <div class="flex flex-wrap" style={{ width: "100%" }}>
                        {allHotelDetails?.services?.map((item) => {
                          return (
                            <div className="block text-blueGray-600 text-sm font-bold mb-2 " style={{ margin: "10px", marginLeft: "46px" }}>
                              <tr style={{ width: "400px" }}>
                                <td >
                                  <label
                                    htmlFor="grid-password">{item.service_value.replace(/_+/g, ' ')}- </label></td>
                                <td>
                                  <span className="text-lightBlue-800"> {item.service_type}</span>
                                </td>
                              </tr>
                            </div>
                          )
                        })
                        }
                      </div>
                      :
                      <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="items-center w-full bg-transparent border-collapse">
                          <thead>
                            <tr>

                              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Sno.
                              </th>
                              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Service Name
                              </th>
                              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Service Type
                              
                                <div>{showModal ? (
                                  <>
                                    <div
                                      className="justify-center items-center flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none"
                                      onClick={() => setShowModal(false)}
                                    >
                                      <div className="relative w-auto my-6 mx-auto max-w-sm">
                                        {/*content*/}
                                        <div className="border-2 px-2 rounded-lg shadow-lg relative flex flex-col w-full bg-blueGray-600 outline-none focus:outline-none">
                                          {/*header*/}
                                          {/*body*/}
                                          <div className=" p-6  flex-auto">
                                            <p className="my-2 text-white text-sm leading-relaxed">
                                              Are you sure, you want to delete?
                                            </p>
                                          </div>
                                          {/*footer*/}
                                          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                              type="button"
                                              onClick={() => setShowModal(false)}
                                            >
                                              Close
                                            </button>
                                            <button
                                              className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                              type="button"
                                              onClick={() => submitServiceDelete(id)}
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                  </>
                                ) : <></>}</div></th>

                            </tr>
                          </thead>
                          <tbody>
                            {allHotelDetails?.services?.map((item) => (
                              <tr>

                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                  {count = count + 1} </td>
                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                  {item?.service_value}
                                </td>

                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                  {capitalizeFirstLetter(item?.service_type)}
                                </td>
                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">

                                  <button
                                    className="bg-red-500 text-white active:bg-red-600 text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                    onClick={() => {
                                      setId(item.service_id);
                                      setShowModal(true)
                                    }} type="button"
                                  >
                                    Delete
                                  </button>
                                </td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                    }


                    {deleteservices === true ?
                      <div className="text-center flex justify-end mt-8" >
                        <button className="bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => setDeleteservices(!deleteservices)} type="button"> Back</button>

                      </div>
                      :
                      <div className="text-center flex justify-end mt-8" >
                        <button className=" bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                          onClick={() => setUpdateservices(!updateservices)}>
                          Add More Services</button>
                        <button className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setDeleteservices(!deleteservices)} >Delete</button>
                      </div>
                    }
                  </div>
                  :
                  <div>
                    <h6 className="text-blueGray-700 text-lg font-bold">Select Property Services</h6><br />
                    <div class="flex flex-wrap" style={{ width: "100%" }}>
                      {filteredservices?.map(i => {
                        return (<div className="block   text-blueGray-600 text-xs font-bold mb-2" style={{ margin: "10px", marginLeft: "15px", fontSize: "15px" }}>
                          <input type="checkbox" class="mr-1"

                            onClick={() => {

                              (filteredservices.map((item) => {
                                if (item.service_id === i.service_id) {
                                  item.check = !item.check
                                }
                                return item
                              }))

                            }}
                          />

                          {i.service_value.replace(/_+/g, ' ')}

                        </div>)

                      })}
                    </div>



                    <div className="text-center flex justify-end mt-8" >

                      <button className=" bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => setUpdateservices(!updateservices)}>
                        Cancel</button>
                      <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none 
                        focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={sendToDb}
                        type="button" >Submit</button>

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

                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}


export default PropertySummaryTab2;