import React from "react";
import { Link } from "react-router-dom";
import './index.css';

const Navi = () =>
(
    <div>

        <ul>
            <h2>Registration Form</h2>
            <li><Link to='/detail'>Property Details</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/review">Review</Link></li>
            <li><Link to="/services">Services</Link></li>


            <h2><Link to="/about">About Property</Link></h2>
            <li>Property Images</li>
            <li>Services</li>
            <li>reviews</li>
            <li>contacts</li>
        </ul>


    </div>

)

export default Navi




