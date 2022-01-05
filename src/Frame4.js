import React from 'react'

function Frame4({room_count}) {
    return (
        <div style={{color:"red" ,border:"2px solid black",float:"right",clear:"right"}}>
          <h4>Total Rooms:-</h4><b> {room_count[0].room_count}  </b>
        </div>
    )
}

export default Frame4
