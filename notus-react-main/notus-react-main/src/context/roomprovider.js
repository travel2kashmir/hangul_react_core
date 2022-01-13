import React, { useState } from "react";
const initial = {
  room_id: "",
  room_name: ""
  }
export const RoomContext= React.createContext();

const RoomStore = ({children}) => {
  
  const [roomData, setRoomData] = useState(initial);
  return (
    <RoomContext.Provider
      value= {[roomData,setRoomData] }>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomStore;
