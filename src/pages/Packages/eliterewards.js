import React from 'react'
import Sidebar from '../../components/sidebar'
import Navbar from '../../components/navbar'
import CardEliteRewards from '../../components/Cards/Packages/CardEliteRewards'
import Footer from '../../components/footer'
import { useLocation } from 'react-router-dom'

function Eliterewards() {
  const location=useLocation()
  const elite_rewards=location.state
  console.log(JSON.stringify(location.state))
  return (
    <div>
      <Navbar/>
        <Sidebar/> 
        <div id="main-content" className="  bg-gray-50 pt-24 relative overflow-y-auto lg:ml-64">
        <CardEliteRewards elite_rewards={elite_rewards.id.membership}/>    
  </div> 
  <div id="main-content" className="px-8  bg-gray-50 relative overflow-y-auto lg:ml-64"> 
  <Footer/>
  </div>
    </div>
  )
}

export default Eliterewards