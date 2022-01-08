import React from 'react'

function GetServices({all}) {
    return(    <div>
           
                    <div  className="row black_border_new1" >
                      
                        
                        <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Services</h4>
                            <hr style={{ borderTop: "1px solid black" }}></hr>
                       
                    <tr><th><label className="tdr">Service name and type</label></th>
                       </tr>
                       
                        {all?.map((item) => {
                            return (
                                <div>
                                 
                                   
                                    <tr>
                                      <td ><label className="tdr">{item.service_value}:</label></td>
                                        <td> {item.service_type}
                                         </td> 
                                    </tr>
                                     
                                </div>
                            )
                        })

                        }

                    </div>
        </div>
    )
    
}

export default GetServices
