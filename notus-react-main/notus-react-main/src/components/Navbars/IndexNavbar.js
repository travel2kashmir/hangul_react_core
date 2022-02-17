/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { bindActionCreators } from 'redux';
import actionCreators from '../../states/index';


// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

export default function Navbar(props) {
  const dispatch = useDispatch();
  const { signout } = bindActionCreators(actionCreators, dispatch)
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
      
        <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
            <Link
              className="text-white text-md font-bold leading-relaxed inline-block  py-3 mx-4 whitespace-nowrap "
              to="/"
            >
              <span className="bg-blueGray-600">Travel2Kashmir</span>
            </Link></div></div>
            
            <div className="text-center justify-end">
            <Link to='/'><button 
            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-2  rounded outline-none focus:outline-none  mb-1 mx-32 ease-linear transition-all duration-150"
            onClick={()=>signout('')}>Logout</button></Link>


            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button></div>
        

        
      </nav>
    </>
  );
}
