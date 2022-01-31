import Store from '../../context/provider';
//import Dashboard from './Dashboard';
import BasicDetails from '../../components/BasicDetails';
import Contact from '../../components/Contact';
import { Route, Switch} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Gallery from '../../components/Gallery';
import Reviews from '../../components/Reviews';
import Services from '../../components/Services';
//import XML from './XML';
//import PropertySummary from './PropertySummary';
import Room from '../../components/Room.js'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
//import AdditionalPropertySummary from './AdditionalPropertySummary';

function AdminView() {
  return (
    <div> 
        <Store>
        <BrowserRouter>
        <Switch>
          <Route path="/admin" exact component={BasicDetails} />
          
          <Route path="/contact" exact component={Contact}/>
          <Route path="/gallery" exact component={Gallery}/>
          <Route path="/reviews" exact component={Reviews}/>
          <Route path="/services" exact component={Services}/>
          <Route path="/room" exact component={Room}/> 
        </Switch>
        </BrowserRouter>
      </Store> 
              
      </div>
  );
}

export default AdminView;
