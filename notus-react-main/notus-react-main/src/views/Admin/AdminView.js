import Store from '../../context/provider';
//import Dashboard from './Dashboard';
import BasicDetails from '../../components/BasicDetails';
import Contact from '../../components/Contact';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Gallery from '../../components/Gallery';
import Reviews from '../../components/Reviews';
import Services from '../../components/Services';
//import XML from './XML';
//import PropertySummary from './PropertySummary';
import Room from '../../components/Room.js'
//import AdditionalPropertySummary from './AdditionalPropertySummary';

function AdminView() {
  return (
    <div> 
        <Store>
        <BrowserRouter>
        <Switch>
          <Route path="/" exact component={BasicDetails} />
          <Route path="/basic-details" exact component={BasicDetails} />
          <Route path="/contact" component={Contact}/>
          <Route path="/gallery" component={Gallery}/>
          <Route path="/reviews" component={Reviews}/>
          <Route path="/services" component={Services}/>
          <Route path="/room" component={Room}/> 
        </Switch>
      </BrowserRouter>
      </Store> 
              
      </div>
  );
}

export default AdminView;
