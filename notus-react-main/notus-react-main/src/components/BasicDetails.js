import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats'
import CardSettings from './Cards/CardSettings'

function BasicDetails() {
    return (
        <>

            <Sidebar />
            <div style={{ paddingLeft: "250px" }}>
                <HeaderStats />
                <div style={{ padding: "60px", marginTop: "-130px", }}>
                    <CardSettings /></div>
            </div>


        </>
    );
}

export default BasicDetails
