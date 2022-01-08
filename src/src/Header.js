import React from "react";
import './index.css';
import menu from './menu.png';

const Header = () => (

  <div>

    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fcontainernav nav_new1">
        <div className="container-fluid">
          
          <span style={{fontFamily:"cursive",fontSize:"40px",fontWeight:"bolder",color:"orange",marginBottom:"20px"}}>
            han</span>
            <span style={{fontFamily:"cursive",fontSize:"40px",fontWeight:"bolder",
           color:" #220A41",marginBottom:"20px" }}>
            gul</span>
          <img src={menu} alt="menu" className="imgdim fmenu menu_3lines"></img>
        </div>
      </nav>
    </div>



  </div>

)
export default Header