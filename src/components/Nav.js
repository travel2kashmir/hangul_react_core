import React from "react";
import { Link } from "react-router-dom";

import '../assets/index.css';


const Nav = () =>
{ 
  return(
  <div className="margin_top_new1_nav">

    <ul>
    <li style={{ marginLeft: "-3px",fontFamily:"fantasy",fontSize:"20px",
    marginTop: "30px" }}><Link to='/'>Dashboard</Link></li>
      <h4 style={{ marginLeft: "10px",fontFamily:"fantasy", marginBottom: "12px" }} >Property Registration</h4>
      <li><Link to='/detail'>Property Details</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/gallery">Gallery</Link></li>
      <li><Link to="/review">Review</Link></li>
      <li><Link to="/services">Services</Link></li>
      <li><Link to="/about">About Property</Link></li>
      <li><Link to="/XML">Google Integration</Link></li>

      <li><Link to='/rooms'>Room Details</Link></li>

    </ul>


  </div>

)
  }
export default Nav




