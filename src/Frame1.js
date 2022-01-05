import React from 'react'

function Frame1({ services }) {
    return (
        <div style={{color:"red" ,border:"2px solid black",float:"left"}}>
            {services?.map((item) => {
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
    )
}

export default Frame1
