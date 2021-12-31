import React from "react";
import './index.css';
import Home from './Home.png';
import menu from './menu.png';
import hangul from './hangul.png';
const Header = () => (

  <div>

    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fcontainernav nav_new1">
        <div className="container-fluid">
          <img src={Home} alt="Home" className="fhome imgdim" ></img>
          <img src={hangul} alt="logo" className="imgdim flogo"></img>
          <img src={menu} alt="menu" className="imgdim fmenu menu_3lines"></img>
        </div>
      </nav>
    </div>



  </div>

)
export default Header