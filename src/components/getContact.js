import React from 'react'

function GetContact({all}) {
    
    
        return(
            <div>
                 <div  className="row black_border_new1" >
                      
                        
                      <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Contact Details</h4>
                          <hr style={{ borderTop: "1px solid black" }}></hr>
                            
                            {all?.map((item)=>{
                                return(
                                    <div>
                                        <tr><td> <label className="tdr">{item.contact_type} </label>
                                         </td>
                                         <td>{item.contact_data}</td></tr>
                                        <br/>
                                    </div>
                                )
                            })
    
                            }
    
    
    
                        </div>
            </div>
        )
            
}

export default GetContact
