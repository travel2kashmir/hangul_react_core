import Store from 'context/provider';
import Dashboard from '../../components/Dashboard';
//import BasicDetails from './BasicDetails';
//import Contact from './Contact';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
//import Gallery from './Gallery';
//import Reviews from './Reviews';
//import Services from './Services';
import XML from '../../components/XML';
import PropertySummary from '../../components/PropertySummary';
//import Room from './Room.js'
import AdditionalPropertySummary from '../../components/AdditionalPropertySummary';

function PropertyOwnerView() {
    return (
        <div> <Store>
           <BrowserRouter>
                <Switch>
                    <Route path="/owner" exact component={Dashboard} />
                    <Route path="/xml" exact component={XML} />
                    <Route path="/property-summary" exact component={PropertySummary} />
                    <Route path="/additional-credentials" exact component={AdditionalPropertySummary} />
                </Switch>
                </BrowserRouter>    
        </Store>
        </div>
    );
}

export default PropertyOwnerView;
