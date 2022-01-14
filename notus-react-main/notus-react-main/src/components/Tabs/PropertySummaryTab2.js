import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/provider';
import axios from "axios";


const PropertySummaryTab2 = () => {
    const [data] = useContext(Context)
    const [allHotelDetails, setAllHotelDetails] = useState([])
    const [loader,setLoader]=useState(false)
    useEffect(() => {
        const fetchServices = async () => { setLoader(true)
            try {
                 const url = `/${data.property_address_province.replace(/\s+/g, '-')}/${data.property_address_city}/${data.property_category}s/${data.property_id}`;
                //const url = `/jammu-and-kashmir/srinagar/hotels/t2k001`
                console.log("URL " + url)
                const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
                console.log(response.data)
                setLoader(false)

                setAllHotelDetails(response.data)
            }
            catch (error) {
              //  setLoader(false)
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
        loader ? <div>loader</div>: <div className="flex flex-wrap">
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


        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">

                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                     
                     {allHotelDetails!==null && allHotelDetails!==undefined && allHotelDetails.Reviews.map((item) => {
                            return (
                                <div>
                                    <span><tr>{item.review_title}</tr></span>
                                    <span ><tr style={{ fontWeight: "bold" }}>By {item.review_author}</tr>
                                    </span>
                                    <tr>
                                        <td><label>Review type</label></td>
                                        <td>{item.review_type}</td>
                                    </tr>
                                    <tr>
                                        <td><label>Review rating</label></td>
                                        <td> {item.review_rating}</td>
                                    </tr>

                                    <tr>
                                        <td><label>Review content</label></td>
                                        <td>{item.review_content}</td>
                                    </tr>
                                    <tr>
                                        <td><label>Review date</label></td>
                                        <td>
                                            {item.review_date}</td>
                                    </tr>
                                    <tr>
                                        <td><label>Service date</label></td>
                                        <td>
                                            {item.service_date}</td>
                                    </tr>
                                    <tr>
                                        <td><label>Review link</label></td>
                                        <td>
                                            {item.review_link}</td>
                                    </tr>



                                </div>

                            )
                        })}
                        


                       {JSON.stringify(allHotelDetails?.Reviews)}
                    </div>

                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                        {JSON.stringify(allHotelDetails.images)}

                    </div>




                    <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                        {JSON.stringify(allHotelDetails.services)}
                    </div>










                </div>
            </div>
        </div>





    </div>
       )
}

export default PropertySummaryTab2;