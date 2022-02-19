import Store from 'context/provider';
import Dashboard from './Dashboard';
import BasicDetails from './BasicDetails';
import Contact from './Contact';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Gallery from './Gallery';
import Reviews from './Reviews';
import Services from './Services';
import XML from './XML';
import PropertySummary from './PropertySummary';
import Room from './Room.js'
import AdditionalPropertySummary from './AdditionalPropertySummary';

function App() {
  return (
    <div> <Store>
        <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/basic-details" exact component={BasicDetails} />
          <Route path="/contact" component={Contact}/>
          <Route path="/gallery" component={Gallery}/>
          <Route path="/reviews" component={Reviews}/>
          <Route path="/services" component={Services}/>
          <Route path="/xml" component={XML}/>
          <Route path="/property-summary" component={PropertySummary}/>
          <Route path="/additional-credentials" component={AdditionalPropertySummary}/>
          <Route path="/room" component={Room}/> 
        </Switch>
      </BrowserRouter>
      </Store> 
      </div>
  );
}

export default App;
