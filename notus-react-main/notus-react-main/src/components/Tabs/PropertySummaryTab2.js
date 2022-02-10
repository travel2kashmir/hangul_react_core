import axios from "axios";
import React, { useEffect, useState } from 'react';


const PropertySummaryTab2 = () => {
  //const [data] = useContext(Context)
  const [allHotelDetails, setAllHotelDetails] = useState({})
  const [updatereview, setUpdatereview] = useState(false)
  const [review, setReview] = useState({})
  const [viewreview, setViewreview] = useState(false)
  const [loader, setLoader] = useState(false)
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
    fetchServices();
  }, [])


  const [openTab, setOpenTab] = React.useState(1);

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
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">
                          Property Reviews
                        </h3>
                      </div>

                    </div>
                  </div>


                  {viewreview === false ?
                    <div className="block w-full overflow-x-auto">
                      {/* Projects table */}
                      <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                          <tr>

                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Reviewe Author
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
                                {item?.review_type}
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
                          </div>
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
                                    defaultValue={review?.review_type}


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
                                    defaultValue={review?.service_date}
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

                                    defaultValue={review?.review_content}

                                  />
                                </div>
                              </div>
                            </div>
                          </form>

                          <div className="text-center flex justify-end mt-8"  >
                            <button className=" bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150" onClick={() => setUpdatereview(!updatereview)}>Cancel</button>
                            <button className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" type="button" >Delete</button>
                            <button className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >Submit</button>
                          </div>
                        </div>

                      }
                    </div>
                  }

                </>
              </div>

              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <h6 className="text-blueGray-700 text-xl font-bold">Property Gallery</h6><br />
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
                      </div>
                    )
                  }
                  )
                  }
                </div>
              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <h6 className="text-blueGray-700 text-xl font-bold">Property Services</h6><br />
                <div class="flex flex-wrap" style={{ width: "100%" }}>
                  {allHotelDetails?.services?.map((item) => {
                    return (
                      <div className="block text-blueGray-600 text-sm font-bold mb-2 " style={{ margin: "10px", marginLeft: "46px" }}>
                        <tr style={{ width: "400px" }}>

                          <td >
                            <input type="checkbox" checked></input> </td>
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
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default PropertySummaryTab2;