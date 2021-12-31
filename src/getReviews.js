import React from 'react'


const GetReviews = ({allHotelDetails}) => {
    return (
        <div>
            
              <table className="table table-bordered">
              <thead> 
                  <th className="thead">Review Details</th>
                  </thead>
                    <tr>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                        </tr>
                        {allHotelDetails?.reviews?.map((item) => {
                            return (
                                <div>
                                    <span className="tdr"><tr className="rvt">{item.review_title}</tr></span>
                                    <span className="tdr"><tr  style={{fontWeight:"bold"}}>By {item.review_author}</tr>
                                    </span>
                                    <tr>
                                    <td><label className="tdr">Review type</label></td>
                                     <td className="tdr">{item.review_type}</td>
                                    </tr>
                                    <tr>
                                    <td><label className="tdr">Review rating</label></td>
                                     <td className="tdr"> {item.review_rating}</td>
                                     </tr>

                                    <tr>
                                    <td><label className="tdr">Review content</label></td>
                                     <td>{item.review_content}</td>
                                        </tr>
                                    <tr>
                                    <td><label className="tdr">Review date</label></td>
                                     <td className="tdr">   
                                       {item.review_date}</td>
                                        </tr>
                                    <tr>
                                    <td><label className="tdr">Service date</label></td>
                                     <td className="tdr">
                                       {item.service_date}</td>
                                        </tr>
                                    <tr>
                                    <td><label className="tdr">Review link</label></td>
                                     <td className="tdr"> 
                                        {item.review_link}</td>
                                        </tr>
                                    
                                    <br/>
                            
                                </div>
                               
                            )
                        })}

                    </table>

        </div>
    )
}

export default GetReviews