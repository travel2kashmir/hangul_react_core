import React, { useState } from "react";
const initial = {
  property_id: "t2k001",
  property_name: "taj vivanta",
  property_type: "hotel",
  property_address_country:"",
  property_address_province:"jammu-and-kashmir",
  property_address_city:"srinagar"
}
export const Context= React.createContext();

const Store = ({children}) => {
  
  const [data, setData] = useState(initial);
  return (
    <Context.Provider
      value= {[data,setData] }>
      {children}
    </Context.Provider>
  );
};

export default Store;
