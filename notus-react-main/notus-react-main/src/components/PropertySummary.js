import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats';
import PropertySummaryTab from './Tabs/PropertySummaryTab';

function PropertySummary() {
    return (

            <>

                <Sidebar />
                <div style={{ paddingLeft: "250px" }}>
                    <HeaderStats />
                    <div style={{ padding: "60px", marginTop: "-130px", }}>
                      <PropertySummaryTab/>  </div>
                </div>


            </>
           )
}

export default PropertySummary
