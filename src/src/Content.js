import React from "react";
import Store from "./context/provider";
import Roomimages from "./Roomimages";
import Roomtypes from "./Roomtypes";
import Roomdes from "./Roomdes";
import Roomfacilities from "./Roomfacilities";

import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom"




const Content = () => {

  return (
    <div className='containerclass'>
      <Store>
        <Roomtypes/>
      </Store>
  
          </div>
  )
}

export default Content