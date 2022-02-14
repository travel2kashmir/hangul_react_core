import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import HeaderStats from './Headers/HeaderStats'
import CardSettings from './Cards/CardSettings'
import Footer from './Footers/FooterAdmin'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router';
function BasicDetails() {
    const isLogged = useSelector(state => state.session)
    return (
        <>
            {isLogged?.id === '' ? <Redirect to='/' /> : <> <Sidebar />
                <div className="relative md:ml-64 bg-blueGray-100">
                    <HeaderStats />
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">
                        <CardSettings />
                        <Footer />
                    </div>
                </div>
            </>}


        </>
    );
}

export default BasicDetails
