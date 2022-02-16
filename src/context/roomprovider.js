import React, { useState } from "react";
const initial = {
<<<<<<< Updated upstream
  room_id: "",
  room_name: ""
=======
  //room_id: "none",
  //room_name: "none"
  room_id: "r007",
  room_name: "none"
>>>>>>> Stashed changes
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
