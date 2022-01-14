import React, { useState } from "react";
let initial = {
  property_id: "",
  property_name: "",
  property_type: "",
  property_address_country:"",
  property_address_province:"",
  property_address_city:""
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
