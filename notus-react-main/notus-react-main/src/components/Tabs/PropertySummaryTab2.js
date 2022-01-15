import axios from "axios";
import React, { useEffect, useState } from 'react';


const PropertySummaryTab2 = () => {
  //const [data] = useContext(Context)
  const [allHotelDetails, setAllHotelDetails] = useState({})
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    const fetchServices = async () => {
      setLoader(true)
      try {
        // const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}`;
        const url = `/jammu-and-kashmir/srinagar/hotels/t2k001`
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
                  ? "text-white bg-lightBlue-600"
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
                  ? "text-white bg-lightBlue-600"
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
                  ? "text-white bg-lightBlue-600"
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

                {allHotelDetails?.Reviews?.map?.((item) => {
                  return (
                    <div>
                      <span><tr>{item?.review_title}</tr></span>
                      <span ><tr style={{ fontWeight: "bold" }}>By {item.review_author}</tr>
                      </span>
                      <tr>
                        <td><label>Review type</label></td>
                        <td>{item?.review_type}</td>
                      </tr>
                      <tr>
                        <td><label>Review rating</label></td>
                        <td> {item?.review_rating}</td>
                      </tr>

                      <tr>
                        <td><label>Review content</label></td>
                        <td>{item?.review_content}</td>
                      </tr>
                      <tr>
                        <td><label>Review date</label></td>
                        <td>
                          {item?.review_date}</td>
                      </tr>
                      <tr>
                        <td><label>Service date</label></td>
                        <td>
                          {item?.service_date}</td>
                      </tr>
                      <tr>
                        <td><label>Review link</label></td>
                        <td>
                          {item?.review_link}</td>
                      </tr>
                    </div>)
                })}
              </div>

              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                {allHotelDetails?.images?.map((item) => {
                  return (
                    <div>

                      <tr>
                        <td><label className="tdr">Image title</label></td>
                        <td>
                          {item.image_title}</td>
                      </tr>

                      <tr>
                        <img src={item.image_link} style={{ width: 200, height: 200 }} alt='pic' />
                      </tr>

                      <tr>
                        <td><label className="tdr">About Image</label></td>
                        <td >
                          {item.image_description}</td></tr>

                      <br /><br />
                    </div>
                  )
                })

                }

              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">

                {allHotelDetails?.services?.map((item) => {
                  return (
                    <div>


                      <tr>
                        <td ><label className="tdr">{item.service_value.replace(/_+/g, ' ')}:</label></td>
                        <td> {item.service_type}
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


      }





    </div>
  )
}

export default PropertySummaryTab2;