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
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block  py-2 mx-2 whitespace-nowrap "
              to="/"
            >
              <span className="bg-blueGray-600">Travel 2 Kashmir</span>
            </Link>
            
            <div className="text-center justify-end">
            <Link to='/'><button 
            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
            onClick={()=>signout('')}>Logout</button></Link></div>


            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>

        

          </div>
      </nav>
    </>
  );
}
