import React from 'react'

function Frame2({reviews}) {
    return (
        <div style={{color:"red" ,border:"2px solid black",float:"right"}}>
            {reviews?.map((item) => {
                return (
                    <div>
                        <tr>
                            <td ><label className="tdr">{item.review_title}:</label></td>
                            <td> {item.review_rating}
                            </td></tr>
                            <tr>By {item.review_author}</tr>
                        

                    </div>
                )
            })

            }


        </div>
    )
}

export default Frame2
