import React, { useState } from "react";
const initial = [{
  room_id: "",
  room_name: "",
  room_type_id: "",
  room_type_name:""
  
}]
export const Context= React.createContext();

const Store = ({children}) => {
  
  const [roomdes, setRoomdes] = useState(initial);
  return (
    <Context.Provider
      value= {[roomdes, setRoomdes] }>
      {children}
    </Context.Provider>
  );
};

export default Store;
