import React, { useState } from "react";
let initial = {
  property_id: "t2k004",
  property_name: "t2k test",
  property_type: "hotel",
  property_address_country:"IN",
  property_address_province:"jammu and kashmir",
  property_address_city:"srinagar"
}
export const Context= React.createContext();

const Store = ({children}) => {
  
  let [data, setData] = useState(initial);
  return (
    <Context.Provider
      value= {[data,setData] }>
      {children}
    </Context.Provider>
  );
};

export default Store;
