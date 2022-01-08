import React from 'react'

function GetGallery({all}) {
    return (
        <div>
            <div  className="row black_border_new1" >
                      
                        
                      <h4 style={{ marginLeft: "20px", marginBottom: "-15px" }}>Gallery</h4>
                          <hr style={{ borderTop: "1px solid black" }}></hr>
                        
                        {all?.map((item)=>{
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
                    </div>
        </div>
    )
}

export default GetGallery
