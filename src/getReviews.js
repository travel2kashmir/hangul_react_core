import React from 'react'


const GetReviews = ({all}) => {
    return (
        <div>
            
            <div  className="row black_border_new1" >
                      
                        
                        <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Review Details</h4>
                            <hr style={{ borderTop: "1px solid black" }}></hr>
                        {all?.map((item) => {
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

                    </div>

        </div>
    )
    
}

export default GetReviews