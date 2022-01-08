import React, {useState, useContext} from 'react'
import { Context } from './context/provider';
import Axios from "axios";
import Navb from "./Navb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roomdes = (props) => {
  
  const [roomdes, setRoomdes] = React.useContext(Context)
  const [allRoomDes, setAllRoomDes] =
    useState({
      room_name:'',
      room_type_id:'',
      room_description: '',
      room_capacity: '',
      maximum_number_of_occupants: '',
      minimum_number_of_occupants: '',
      minimum_age_of_occupants: '',
      room_length: '',
      room_width: '',
      room_height: ''
    });

    const setContext = (room_id) => {
      console.log("into set context")
      const obj = {
        room_id:  room_id,
        room_name: allRoomDes.room_name
      }
      console.log("data to be set " + JSON.stringify(obj))
      setRoomdes(obj)
      console.log("the data in context " + JSON.stringify(roomdes))
  
    }

    /** Final Submit Function **/ 
    function finalHandleSubmit(e) {
      e.preventDefault()
      const finalData = { ...allRoomDes}
      console.log(JSON.stringify(finalData), 'finaldata')
      Axios.post('/room', JSON.stringify(finalData),
        {
          headers: { 'content-type': 'application/json' }
        }).then(response => {
          console.log(response.roomdes)
      toast.success("Room created with id " + response.roomdes.room_id ,{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          
          setContext(response.roomdes.room_id)
        })
        .catch(error => {
          console.log(error.response)
          toast.error("Some thing went wrong \n " + JSON.stringify(error.response.roomdes),{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          
        }  
  
          )  }


      
  return (
           <div>
         <Navb/>
         
        <div className="row"> 
      
       <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
     <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
     <h4 style={{marginLeft:"10px",marginBottom:"20px",marginTop:"30px"}}>In Property "Property name" for 
      <select className="custom-select mr-sm-2 form-control" id="inlineFormCustomSelect"
                onChange={(e)=>{ 
                  setAllRoomDes({...allRoomDes,
                  room_type_id:props.roomDescription.find(i=> i.room_type_name === e.target.value)?.room_type_id,
                  room_type_name:e.target.value
                  })
                }} >{allRoomDes?.room_type_id===''&&<option value="select">Select</option>}
                  {props.roomDescription.map((item,id)=>{
     return (<option value={item.room_type_name}>{item.room_type_name}</option>)
   })}
               
                </select>
     
     
     </h4><br/>
     </div>
     <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
    <h4 style={{marginLeft:"100px",marginBottom:"20px",marginTop:"30px"}}>Room Dimensions(in feets):</h4><br/>
    </div>
</div>       
    <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
      <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6">
      <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
      <label for="rl">Room name</label></div>      
      <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
      <input type="text" id="rl" className=" form-control"
       placeholder="enter room name"
      onChange={e =>  setAllRoomDes({ ...allRoomDes, room_name: e.target.value})}/>
      <br/>
    </div>

    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
      <label for="rl">Room Description</label></div>      
      <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
      <textarea id="rl" className=" form-control"
       onChange={e =>  setAllRoomDes({ ...allRoomDes, room_description: e.target.value})}
      placeholder="enter room description"  rows="3" cols="25" />
      <br/>
    </div>
    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
       <label for="rl">Room Capacity</label></div>      
        <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
        <input type="text" id="rl" className=" form-control"
         onChange={e => setAllRoomDes({ ...allRoomDes, room_capacity: e.target.value})}
        placeholder="enter room capacity" />
        <br/>
    </div>
    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
        <label for="rl">Maximum number of occupants</label></div>      
        <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
        <input type="text" id="rl" className=" form-control"
         onChange={e => setAllRoomDes({ ...allRoomDes, maximum_number_of_occupants: e.target.value})}
        placeholder="enter max no. of occupants" />
        <br/>
    </div>
    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
         <label for="rl">Minimum number of occupants</label></div>      
         <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
         <input type="text" id="rl" className=" form-control"
          onChange={e => setAllRoomDes({ ...allRoomDes, minimum_number_of_occupants: e.target.value})}
         placeholder="enter min no. of occupants" />
         <br/>
    </div>
    <div className="col-md-5 col-sm-5 col-xs-12 col-lg-5">
         <label for="rl">Minimum age of occupants</label></div>      
        <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
        <input type="text" id="rl" className=" form-control"
         onChange={e =>  setAllRoomDes({ ...allRoomDes, minimum_age_of_occupants: e.target.value})}
        placeholder="enter min. age of occupants" />
        <br/>
        </div>
    </div>
    <div className="col-md-1 col-sm-1 col-xs-1 col-lg-1"></div>
    <div className="col-md-5 col-sm-5 col-xs-5 col-lg-5">
        <div className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
        <label for="rt">Length</label></div>  
        <div className="col-md-8 col-sm-8 col-xs-8 col-lg-8">
        <input type="text" id="rt" className=" form-control" 
         onChange={e => setAllRoomDes({ ...allRoomDes, room_length: e.target.value})}
        placeholder="enter room length" />
        <br/>
    </div>
        <div className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
             <label for="rt">Breadth</label></div>  
             <div className="col-md-8 col-sm-8 col-xs-8 col-lg-8">
             <input type="text" id="rt" className=" form-control"
              onChange={e => setAllRoomDes({ ...allRoomDes, room_breadth: e.target.value})}
             placeholder="enter room breadth" />
             <br/>
        </div>
        <div className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
             <label for="rt">Height</label></div>  
             <div className="col-md-8 col-sm-8 col-xs-8 col-lg-8">
             <input type="text" id="rt" className=" form-control"
              onChange={e => setAllRoomDes({ ...allRoomDes, room_height: e.target.value})}
             placeholder="enter room height" />
             <br/><br/>
        </div>
        <div className="col-md-5 col-sm-5 col-xs-5 col-lg-5"></div>
        <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7">
        <button type="button" onClick={finalHandleSubmit} className="btn btn-dark btn_room">
          Submit</button>
          <ToastContainer position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
          <br/><br/></div>
     </div>
   
</div>        
</div>           
</div>
        
    )
}

export default Roomdes;
