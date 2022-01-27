import React from 'react';
import { useSelector,useDispatch } from 'react-redux';

import { bindActionCreators } from 'redux';
import  actionCreators  from '../states/index.js';
//import App from '../components/App'
import AdminView from './Admin/AdminView';
import PropertyOwnerView from './PropertyOwner/PropertyOwnerView'




function Login() {
    const dispatch = useDispatch();
    const {signin} = bindActionCreators(actionCreators,dispatch)
    
    const loggedIn=useSelector(state=>state.session)
   
    return <div className='mx-4 my-4 px-4 py-4'>
           
       {loggedIn===''?
       <><button 
        onClick={()=>{signin("Admin")}}
        className="text-lightBlue-500 background-transparent font-bold uppercase px-8 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
            <i className="fas fa-heart"></i> Login as Admin
        </button>
        <br />
        <button 
        onClick={()=>{signin('Guest')}}
        className="text-lightBlue-500 background-transparent font-bold uppercase px-8 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
            <i className="fas fa-heart"></i> Login as Property Owner
        </button></>:
        <>{loggedIn==='Admin'?<><AdminView/></>:
        <>{loggedIn==='Guest'?<><PropertyOwnerView/></>:<h1>login to access</h1>}</>}</>} 
       
      
    </div>;
}

export default Login;
