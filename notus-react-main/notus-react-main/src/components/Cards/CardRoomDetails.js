import React from 'react'
import RoomTabs from '../Tabs/RoomTabs'

export default function CardRoomDetails() {
    return (
       
            <>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Room Details</h6>
                    
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                     Property Room Details
                    </h6>
                    <div><RoomTabs/></div>
                    
                    <div className="text-center flex justify-end">
                    
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Submit
                    </button>
                  </div>
                 
                   
                  </form>
                </div>
              </div>
            </>
          );
        }
  