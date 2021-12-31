import React from 'react'

function GetContact({allHotelDetails}) {
    return (
        <div>
             <table className="table table-bordered">
             <thead> <th className="thead">Contact Details</th></thead>
                    <tr>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                        </tr>
                        
                        {allHotelDetails?.contacts?.map((item)=>{
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



                    </table>
        </div>
    )
}

export default GetContact
