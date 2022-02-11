import axios from 'axios';
import React from 'react';
import { useEffect,useState } from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function PropetyOwner() {
    const logged=useSelector(state=>state.session);
    const [ownerdata,setOwnerdata]=useState([])
    useEffect(()=>{
      const fetchProperty = async () => {
        try {
          const url= '/properties/user003';
            const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
            console.log("response"+ JSON.stringify(response.data))
            
            setOwnerdata(response.data)
           // setRoomfacilities(response.data)
        }
        catch (error) {
            if (error.response) {
                console.log("user description" + JSON.stringify(error.response));
                console.log("status" + JSON.stringify(error.response.status));
                console.log("header" + JSON.stringify(error.response.headers));
            } else {
                console.log("error " + error.message);
            }
        }

    }
      fetchProperty();
    },[])
  return <div>
      <p>welcome! {logged?.name}</p><br/>
      {JSON.stringify(logged)}
      <h2>list of your properties</h2>
      {ownerdata.map(i=>(<div><h1>{i.property_id}</h1>
      <Link to='/owner-view'>See properties details</Link>
      </div>
      ))}
      </div>;
}

export default PropetyOwner;
