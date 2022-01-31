import React, { useState, useEffect, useContext } from 'react'
// package installed using npm instal axios,used to perform the http request
import axios from 'axios'
import { Context } from "../../context/provider"
import { useSelector } from 'react-redux';

// components
import CardStats from "components/Cards/CardStats.js";
import { Link } from 'react-router-dom';

//session
import { useDispatch } from 'react-redux';

import { bindActionCreators } from 'redux';
import  actionCreators  from '../../states/index.js';
import { Redirect } from 'react-router-dom';




export default function HeaderStats() {
  const loggedIn = useSelector(state => state.session)
    //local initialisation of context data take argument of context whose values are to be used 
  const [data] = useContext(Context)
  //declaration of state and state method initialized with empty array 
  const [dash, setDash] = useState(null)
  // console.log("property_id in Dashboard is " + data.property_id)
  //useEffect is a react hook which perform operation on some particular event.
  // Here we used empty array as an initiator i.e. this useEffect will start as soon as this component loads
  const dispatch = useDispatch();
  const {signout} = bindActionCreators(actionCreators,dispatch)
  useEffect(() => {
    axios({
      method: 'get',
     // url: `http://103.136.36.27:5555/dashboard/${data.property_id}`,
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
    , [])// eslint-disable-line react-hooks/exhaustive-deps
    let st=window.location.href;
    let lo=st.split('/');
    console.log('url to be hit'+lo[2])
 const checkData = dash ?? false
  if (checkData) {
    return (
      <div className=" bg-lightBlue-600 md:pt-30 pb-32 pt-10">
        <div className="text-white text-sm uppercase  lg:inline-block font-semibold"
          style={{ padding: "30px", fontSize: "16px" }}> Dashboard  -- {loggedIn?.name} is active{JSON.stringify(loggedIn)}
         <a href={lo[0]+'//'+lo[2]}><button onClick={()=>{signout('')}} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " type="button">
            Signout</button>  </a> </div>
        <div className="px-4 md:px-10 mx-auto w-full">
          <Link className="text-white text-sm uppercase  lg:inline-block font-semibold" to={"#pablo"}></Link>
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

                    statPercent=""
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
      <div className=" bg-lightBlue-600 md:pt-30 pb-32 pt-10">
        <div className="text-white text-sm uppercase  lg:inline-block font-semibold"
          style={{ padding: "30px", fontSize: "16px" }}> Dashboard--  {loggedIn?.name} is active 
          
          <a href={lo[0]+'//'+lo[2]}><button 
          onClick={()=>{signout('')}}
          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " type="button">
            Signout
          </button>
          </a>


        </div>
        <div className="px-4 md:px-10 mx-auto w-full">
          <Link className="text-white text-sm uppercase  lg:inline-block font-semibold" to={"#pablo"}></Link>
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">

                <CardStats
                  statSubtitle="Review Rating"
                  statTitle="N/A"

                  statArrow=""
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron=""
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Services"
                  statTitle="N/A"

                  statPercent=""
                  statPercentColor="text-red-500"
                  statDescripiron=""
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Rooms"
                  statTitle="N/A"

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
                  statTitle="N/A"

                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron=""
                  statIconName="fas fa-star"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
       
      </div>);
  }

}