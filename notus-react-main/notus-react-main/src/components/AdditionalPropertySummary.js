import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats';
import PropertySummaryTab2 from './Tabs/PropertySummaryTab2';
import Footer from './Footers/FooterAdmin'
function AdditionalPropertySummary() {
    return (

            <>

                <Sidebar />
                <div className="relative md:ml-64 bg-blueGray-100">
              <HeaderStats/>
              <div className="px-4 md:px-10 mx-auto w-full -m-24"> 
                    <PropertySummaryTab2/>
                  <Footer/>
                      </div>
                </div>


            </>
           )
}

export default AdditionalPropertySummary
