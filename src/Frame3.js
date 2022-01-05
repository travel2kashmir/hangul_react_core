import React from 'react'

function Frame3({review_stats}) {
    return (
        <div style={{color:"red" ,border:"2px solid black" ,float:"left",clear:"left"}}>
            Avg Review Rating:<b> {review_stats[0].aggregate_review} </b>
        </div>
    )
}

export default Frame3
