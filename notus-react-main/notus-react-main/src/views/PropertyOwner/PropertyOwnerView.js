import Store from 'context/provider';
import Dashboard from '../../components/Dashboard';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import XML from '../../components/XML';
import RoomXML from '../../components/RoomXML';
import PropertySummary from '../../components/PropertySummary';
import AdditionalPropertySummary from '../../components/AdditionalPropertySummary';
import Auth from 'layouts/Auth';
import RoomSummary from '../../components/RoomSummary'
import AllRooms from '../../components/AllRooms'
import AllRoomsXML from '../../components/AllRoomsXML'


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
                    <Route path="/room-summary" exact component={RoomSummary}/>
                    <Route path="/room-xml" exact component={RoomXML}/>
                    <Route path="/rooms" exact component={AllRooms}/>
                    <Route path="/all-rooms-xml" exact component={AllRoomsXML}/>
                </Switch>
                </BrowserRouter>    
        </Store>
        </>
        </div>
    );
}

export default PropertyOwnerView;
