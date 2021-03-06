/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import NotificationDropdown from "../Dropdowns/IndexDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import t2k from "../../assets/img/t2k.png"

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
   <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-3 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block  md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
              <img src={t2k} style={{width:'80%',height:'60%',paddingLeft:'20px'}}/>
          </Link>
          
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
           
          
            {/* Heading */}
            <ul className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/owner"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/owner") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Profile
                </Link>
              </ul>




            <ul className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/owner-view") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/owner-view"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Dashboard
                </Link>
              </ul>
            
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
             About Registered Property
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                 
                 className={
                  "text-xs uppercase py-3 font-bold block " +
                  (window.location.href.indexOf("/property-summary") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                  to="/property-summary"
                >
                  <i className="fas fa-hotel text-blueGray-400 mr-2 text-sm"></i>{" "}
               Basic Details
                </Link>
              </li>

              <li className="items-center">
                <Link
                 className={
                  "text-xs uppercase py-3 font-bold block " +
                  (window.location.href.indexOf("/additional-credentials") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                  to="/additional-credentials"
                >
                  <i className="fas fa-hotel text-blueGray-400 mr-2 text-sm"></i>{" "}
                 Additional  Credentials
                </Link>
              </li>

             
            </ul>


             {/* Divider */}
             <hr className="my-4 md:min-w-full" />
              {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
             About Rooms
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li className="items-center">
                <Link
                 className={
                  "text-xs uppercase py-3 font-bold block " +
                  (window.location.href.indexOf("/rooms") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                  to="/rooms"
                >
                  <i className="fas fa-bed text-blueGray-400 mr-2 text-sm"></i>{" "}
             All Rooms Details
                </Link>
              </li> 
             
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Google Listing
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                 className={
                  "text-xs uppercase py-3 font-bold block " +
                  (window.location.href.indexOf("/xml") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                  to="/xml"
                >
                  <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                 Property XML File
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/room-xml") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/all-rooms-xml"
                >
                  <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                 Rooms XML File
                </Link>
              </li>
             
              
              
            </ul>

           
          </div>
        </div>
      </nav>
    </>
  );
}
