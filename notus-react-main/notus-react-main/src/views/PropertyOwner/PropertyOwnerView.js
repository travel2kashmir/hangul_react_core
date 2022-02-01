import Store from 'context/provider';
import Dashboard from '../../components/Dashboard';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import XML from '../../components/XML';
import PropertySummary from '../../components/PropertySummary';
import AdditionalPropertySummary from '../../components/AdditionalPropertySummary';
import Auth from 'layouts/Auth';


function PropertyOwnerView() {
    
    return (
        <div>


        <>
        <Store>
           <BrowserRouter>
                <Switch>
                <Route path="/auth" exact component={Auth} />
                    <Route path="/owner" exact component={Dashboard} />
                    <Route path="/xml" exact component={XML} />
                    <Route path="/property-summary" exact component={PropertySummary} />
                    <Route path="/additional-credentials" exact component={AdditionalPropertySummary} />
                </Switch>
                </BrowserRouter>    
        </Store>
        </>
        </div>
    );
}

export default PropertyOwnerView;
