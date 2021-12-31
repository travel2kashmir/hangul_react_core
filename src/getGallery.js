import React from 'react'

function GetGallery({allHotelDetails}) {
    return (
        <div>
             <table className="table table-bordered">
            <thead> <th className="thead">Gallery</th></thead>
                    <tr>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                        <td><hr  style={{borderTop:"2px solid black"}}></hr></td>
                    </tr>
                        
                        {allHotelDetails?.images?.map((item)=>{
                            return (
                                <div>
                                    
                                <tr>
                                <td><label className="tdr">Image title</label></td>
                                     <td>
                                    {item.image_title}</td>
                                    </tr>

                                <tr>
                                    <img src={item.image_link} style={{width:200,height:200}}alt='pic'/>
                                    </tr>

                                <tr>
                                <td><label className="tdr">About Image</label></td>
                                     <td >
                                    {item.image_description}</td></tr>

                                <br/><br/>
                                </div>
                            )
                        })

                        }
                    </table>
        </div>
    )
}

export default GetGallery
