import React from "react";
import { Link } from "react-router-dom";
import '../assets/index.css';

const Navi = () =>
(
    <div className="margin_top_new1_nav">

        <ul>
        
    <li style={{ marginLeft: "-3px",fontSize:"20px",
    marginTop: "30px" }}><Link to='/'>Dashboard</Link></li>
      <h4 style={{ marginLeft: "10px", marginBottom: "12px" }}>Property Registration</h4>
      <li><Link to='/detail'>Property Details</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/gallery">Gallery</Link></li>
      <li><Link to="/review">Review</Link></li>
      <li><Link to="/services">Services</Link></li>
      <li style={{fontSize:"17px",marginBottom:"-2px"}}><Link to="/about">About Property</Link></li>


            
            <li style={{ marginLeft: "20px",padding:"2px"}}>Property Images</li>
            <li style={{ marginLeft: "20px",padding:"2px"}}>Services</li>
            <li style={{ marginLeft: "20px",padding:"2px"}}>Reviews</li>
            <li style={{ marginLeft: "20px",padding:"2px"}}>Contacts</li>
        </ul>


    </div>

)

export default Navi




