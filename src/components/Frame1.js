import React from 'react'

function Frame1({ services }) //the data sent as props recieved in services variable 
{
    return (
        <div style={{float:"left"}}>
            {
                //the each element of service is mapped to item and approriate jsx is returned to be displayed by browser
            services?.map((item) => {
                return ( <div>
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
//returns the context to be displayed in frame 1 of dashboard