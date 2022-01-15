import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios' // package installed using npm instal axios,used to perform the http request
import { Context } from "../../context/provider"


// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
   const [data] = useContext(Context)  //local initialisation of context data take argument of context whose values are to be used 
  const [dash, setDash] = useState(null)//declaration of state and state method initialized with empty array
  // console.log("property_id in Dashboard is " + data.property_id)
  //useEffect is a react hook which perform operation on some particular event.
  // Here we used empty array as an initiator i.e. this useEffect will start as soon as this component loads

  useEffect(() => {
    axios({
      method: 'get',
       url:`http://103.136.36.27:5555/dashboard/${data.property_id}`,
      //url: `http://103.136.36.27:5555/dashboard/t2k001`,
      headers: { 'accept': 'application/json' }
    })
      .then(response => {
        console.log(response?.data)
        setDash(response?.data)
      })
      .catch(error => {
        console.log('error')
      })
  }
    , [])

  const checkData = dash ?? false
  if (checkData) {
    return (<div className=" bg-lightBlue-600 md:pt-30 pb-32 pt-10">
      <a style={{ paddingLeft: "30px", paddingBottom: "50px", paddingTop: "40px" }} class="text-white text-sm uppercase hidden lg:inline-block font-semibold" href="#pablo">Dashboard</a>
      <div className="px-4 md:px-10 mx-auto w-full">

        {dash !== null && dash !== undefined
          && <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Review Rating"
                  statTitle={dash?.reviews?.[0]?.review_rating}

                  statArrow="up"
                  statPercent="2"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Services"
                  statTitle={dash?.total_services[0]?.no_of_services}
                  statArrow=""
                  statPercent="0"
                  statPercentColor="text-red-500"
                  statDescripiron=""
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Rooms"
                  statTitle={dash?.room_count[0]?.room_count}
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-orange-500"
                  statDescripiron=""
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Star Rating"
                  statTitle={dash?.star_rating[0]?.star_rating}
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron=""
                  statIconName="fas fa-star"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>}
      </div>
    </div>);
  }
  else {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

}