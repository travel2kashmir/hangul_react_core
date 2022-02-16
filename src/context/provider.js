import React, { useState } from "react";
<<<<<<< Updated upstream
const initial = {
  property_id: "t2k001",
  property_name: "taj vivanta",
  property_type: "hotel",
=======
let initial = {
  property_id: "",
  property_name: "",
  property_type: "",
>>>>>>> Stashed changes
  property_address_country:"",
  property_address_province:"jammu-and-kashmir",
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
