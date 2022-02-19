import React,{useState} from 'react'
import { Redirect,Link } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components components

export default function CardPageVisits({item}) {
  const [showModal, setShowModal] = React.useState(false);
  const [deleteId, setDeleteId] = useState()

 const deleteRoom = () =>{
   const url=`/${deleteId}`
   console.log("url is "+url)
   axios.delete(url).then((response)=>{
     console.log("reply is "+JSON.stringify(response))
    toast.success(JSON.stringify(response.data), {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
     console.log(JSON.stringify(response.data))})
     .catch((error)=>{ 
      toast.error(JSON.stringify(error.response.data), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
     })
    }
  
  
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
                  
         <div>{showModal ? (
           <>
             <div
               className="justify-center items-center flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none"
               onClick={() => setShowModal(false)}
             >
               <div className="relative w-auto my-6 mx-auto max-w-sm">
                 {/*content*/}
                 <div className="border-2 px-2 rounded-lg shadow-lg relative
                  flex flex-col w-full bg-blueGray-600 outline-none focus:outline-none">
                   {/*header*/}
                   {/*body*/}
                   <div className=" p-6  flex-auto">
                     <p className="my-2 text-white text-xs leading-relaxed">
                     Are you sure, you want to Delete<br/>
                      All Room related information?
                     </p>
                   </div>
                   {/*footer*/}
                   <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                     <button
                       className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                       type="button"
                       onClick={() => setShowModal(false)}
                     >
                       Close
                     </button>
                     <button
                       className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                       type="button"
                      onClick={deleteRoom}
                     >
                       Delete
                     </button>
                   </div>
                 </div>
               </div>
             </div>

           </>
         ) : <></>}</div>
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
              <button className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
               onClick={() => {
                setDeleteId(item.room_id);
                setShowModal(true)}} type="button"   >Delete</button>
              
             
                </div>
                <td>
                


                </td>
              </tr>
              ))}
            </tbody>

          </table>
        </div>
        
 <ToastContainer position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
      </div>
    </>
  );
}
