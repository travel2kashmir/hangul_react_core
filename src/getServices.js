import React from 'react'

function GetServices({allHotelDetails}) {
    return (
        <div>
            <table className="table table-bordered">
            <thead> <th className="thead">Services</th></thead>
                    <tr>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                    </tr>
                       
                    <tr><th><label className="tdr">Service name and type</label></th>
                       </tr>
                       
                        {allHotelDetails?.services?.map((item) => {
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

                    </table>
        </div>
    )
}

export default GetServices
