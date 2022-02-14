import React from 'react'
import { Redirect,Link } from 'react-router-dom';

// components

export default function CardPageVisits({item}) {

  
  
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Property Rooms
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                 Room Type
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Room Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
               
                </th>
              </tr>
            </thead>
            <tbody>
              {item?.map((item)=>(<tr>
                
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                 {item?.room_type_name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                 {item?.room_name}
                </td>
                <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <Link to={{
                  pathname:'/room-summary',
                  state:{
                    id:item.room_id
                  }
                  }}> <button 
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                type="button" 
              >
                View Details
              </button></Link>
              <button className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" type="button" >Delete</button>
              
             
                </div>
                <td>
                


                </td>
              </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
}
