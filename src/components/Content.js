import React from "react";
import Store from "../context/provider"; //import of context to declare the children of provider
import Formtable from "./Formtable";
import Galleryform from "./Galleryform";
import Contactform from "./Contactform";
import ReviewForm from "./ReviewForm";
import Services from "./services";
import Get from "./Get";
import Dash from "./Dash";
import GetXml from "./GetXml";
import Rooms from "./rooms"
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom" //package should be installed using 'npm instal react-router-dom'
// import required components and methods to be used



const Content = () => {
 

  return (
    <div className='containerclass'>

      <Router> {/*used to route the application to diffrent routes*/}

        <Store>{/*context component to declare children of context */}
          <Routes> {/* the group of routes */}
            <Route path='/' element={<Dash />} />
            <Route path='/detail' element={<Formtable />} />
            <Route path='/contact' element={<Contactform />} />
            <Route path='/gallery' element={<Galleryform />} />
            <Route path='/review' element={<ReviewForm />} />
            <Route path='/services' element={<Services />} />
            <Route path='/XML' element={<GetXml />} />
            <Route path='/about' element={<Get />} />
            <Route path='/rooms' element={<Rooms/>}/>
         {/* individual routed on diffrent paths*/}
          </Routes>
        </Store> {/* the components between the store can access the Context and are called as children of components */}
      </Router>

    </div>
  )
}

export default Content 
/*exporting the Content function from this component to be used at the the time of import in other components */