import React from "react";
import { Link } from "react-router-dom";

import '../../assets/index.css';


const LeftNavbaeRoom = () =>
{ 
  return(
  <div className="margin_top_new1_nav">

    <ul>
    <li style={{ marginLeft: "-3px",fontFamily:"fantasy",fontSize:"20px",
    marginTop: "30px" }}><Link to='/'>Dashboard</Link></li>
      <h4 style={{ marginLeft: "10px",fontFamily:"fantasy", marginBottom: "12px" }} >Rooms Registration</h4>
      <li><Link to="/about">About Property</Link></li>
      <li><Link to="/XML">Google Integration</Link></li>
     <li><Link to='/rooms'>Insert Room Details</Link></li>

    </ul>


  </div>

)
  }
export default  LeftNavbaeRoom 




