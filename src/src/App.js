import React,{ useState } from 'react'
import Roomdes from './Roomdes'
import Store from './context/provider'
import Header from './Header'
import Nav from './Nav'
import Roomtypes from './Roomtypes'
import Roomimages from './Roomimages'
import Roomfacilities from './Roomfacilities'
import Navb from './Navb'

function App() {
const [roomDescription,setRoomdescription] = useState([])

  return (
    <div>
      <Store>
      <Header/>
      <Nav/>
      <Navb/>
      <Roomtypes setRoomDescription={(a) => setRoomdescription(a)} />
      {console.log("the latest data in roomDescription"+JSON.stringify(roomDescription))}
      {roomDescription?.length>0 && <><Roomdes roomDescription={roomDescription}/>
      <Roomimages roomDescription={roomDescription}/>
      <Roomfacilities roomDescription={roomDescription}/></>}
   </Store> 
    </div>
  )
}

export default App
