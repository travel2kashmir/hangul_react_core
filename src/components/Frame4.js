import React from 'react'

function Frame4({room_count}) {
    return (
        <div style={{clear:"right"}}>
          <h3>Total Rooms:</h3>
          <h2 style={{marginLeft:"80px"}}> {room_count[0].room_count}</h2>
        </div>
    )
}

export default Frame4
