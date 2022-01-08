import React from 'react'

function Frame3({review_stats}) {
    return (
        <div style={{clear:"left"}}>
            <h4>Average Review Rating:</h4>
            <h3 style={{marginLeft:"30px"}}> {review_stats[0].aggregate_review} </h3>
        </div>
    )
}

export default Frame3
