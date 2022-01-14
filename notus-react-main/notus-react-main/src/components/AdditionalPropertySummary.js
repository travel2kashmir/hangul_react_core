import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats';
import PropertySummaryTab2 from './Tabs/PropertySummaryTab2';

function AdditionalPropertySummary() {
    return (

            <>

                <Sidebar />
                <div style={{ paddingLeft: "250px" }}>
                    <HeaderStats />
                    <div style={{ padding: "60px", marginTop: "-130px", }}>
                    <PropertySummaryTab2/>  </div>
                </div>


            </>
           )
}

export default AdditionalPropertySummary
