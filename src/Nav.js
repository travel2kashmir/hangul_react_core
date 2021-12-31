import React from "react";
import { Link } from "react-router-dom";
import './index.css';

const Nav = () =>
(
  <div className="margin_top_new1_nav">

    <ul>
      <h2 style={{ marginLeft: "8px", marginBottom: "12px" }} >Registration Form</h2>
      <li><Link to='/detail'>Property Details</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/gallery">Gallery</Link></li>
      <li><Link to="/review">Review</Link></li>
      <li><Link to="/services">Services</Link></li>
      <li><Link to="/about">About Property</Link></li>
      <li><Link to="/XML">Get XML</Link></li>


    </ul>


  </div>

)

export default Nav




