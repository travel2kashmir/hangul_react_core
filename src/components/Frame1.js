import React from 'react'

function Frame1({ services }) {
    return (
        <div style={{float:"left"}}>
            {services?.map((item) => {
                return (
                    
                    <div>
                        
                        <tr>
                       
                            <td><label className="tdr">{item.service_value}</label></td>
                           
                        </tr>

                    </div>
                )
            })

            }

        </div>
    )
}

export default Frame1
