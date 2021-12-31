import React from "react";
import Store from "./context/provider";
import Formtable from "./Formtable";
import Galleryform from "./Galleryform";
import Contactform from "./Contactform";
import ReviewForm from "./ReviewForm";
import Services from "./services";
import Get from "./Get";
import Dash from "./Dash";
import GetXml from "./GetXml";
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom"




const Content = () => {

  return (
    <div className='containerclass'>

      <Router>

        <Store>
          <Routes>
            <Route path='/' element={<Dash />} />
            <Route path='/detail' element={<Formtable />} />
            <Route path='/contact' element={<Contactform />} />
            <Route path='/gallery' element={<Galleryform />} />
            <Route path='/review' element={<ReviewForm />} />
            <Route path='/services' element={<Services />} />
            <Route path='/XML' element={<GetXml />} />
            <Route path='/about' element={<Get />}>
            </Route>

          </Routes>
        </Store>
      </Router>

    </div>
  )
}

export default Content