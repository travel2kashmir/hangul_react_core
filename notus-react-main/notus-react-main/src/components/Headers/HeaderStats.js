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
import actionCreators from '../../states/index.js';


import { createPopper } from "@popperjs/core";




export default function HeaderStats() {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const loggedIn = useSelector(state => state.session)
  //local initialisation of context data take argument of context whose values are to be used 
  const [data] = useContext(Context)
  //declaration of state and state method initialized with empty array 
  const [dash, setDash] = useState(null)
  // console.log("property_id in Dashboard is " + data.property_id)
  //useEffect is a react hook which perform operation on some particular event.
  // Here we used empty array as an initiator i.e. this useEffect will start as soon as this component loads
  const dispatch = useDispatch();
  const { signout } = bindActionCreators(actionCreators, dispatch)
  useEffect(() => {
    axios({
      method: 'get',
      // url: `http://103.136.36.27:5555/dashboard/${data.property_id}`,
      url: `/dashboard/t2k001`,
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
  let st = window.location.href;
  let lo = st.split('/');

  const checkData = dash ?? false
  if (checkData) {


    return (
      <div className=" bg-lightBlue-600 md:pt-30 pb-32 pt-10">
        <div class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <div className="text-white text-sm uppercase  lg:inline-block font-semibold"
            style={{ padding: "30px", fontSize: "16px" }}> Dashboard
          </div>
          <a
            className="text-white  block px-6"
            href="#pablo"
            ref={btnDropdownRef}
            onClick={(e) => {
              e.preventDefault();
              dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
            }}
          >

            <i className="fas fa-user fa-2x"></i>
          </a>
          <div
            ref={popoverDropdownRef}
            className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
            }
          >
            <a
              href="#pablo"
              className={
                "text-sm py-2 px-6 font-normal uppercase block w-full whitespace-nowrap bg-transparent  text-blueGray-700"
              }
              onClick={(e) => e.preventDefault()}
            >
              <span className="text-lightBlue-600 font-bold">{loggedIn?.name} is active </span>
            </a>
            <div className="h-0 my-2 border border-solid border-blueGray-100" />
            <a href={lo[0] + '//' + lo[2]}><button onClick={() => { signout('') }}
              className=" text-sm py-2  px-4 font-normal uppercase block w-full whitespace-nowrap bg-transparent text-blueGray-700" type="button">
              Signout</button>  </a>



          </div>

        </div>
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
        <div class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <div className="text-white text-sm uppercase  lg:inline-block font-semibold"
            style={{ padding: "30px", fontSize: "16px" }}> Dashboard
          </div>
          <a
            className="text-white  block px-6"
            href="#pablo"
            ref={btnDropdownRef}
            onClick={(e) => {
              e.preventDefault();
              dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
            }}
          >

            <i className="fas fa-user fa-2x"></i>
          </a>
          <div
            ref={popoverDropdownRef}
            className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
            }
          >
            <a
              href="#pablo"
              className={
                "text-sm py-2 px-6 font-normal uppercase block w-full whitespace-nowrap bg-transparent  text-blueGray-700"
              }
              onClick={(e) => e.preventDefault()}
            >
              <span className="text-lightBlue-600 font-bold">{loggedIn?.name} is active</span>
            </a>
            <div className="h-0 my-2 border border-solid border-blueGray-100" />
            <a href={lo[0] + '//' + lo[2]}><button onClick={() => { signout('') }}
              className=" text-sm py-2  px-4 font-normal uppercase block w-full whitespace-nowrap bg-transparent text-blueGray-700" type="button">
              Signout</button>  </a>



          </div>
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