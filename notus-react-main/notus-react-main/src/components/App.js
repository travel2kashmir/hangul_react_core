import Store from 'context/provider';
import Dashboard from './Dashboard';
import BasicDetails from './BasicDetails';
import Contact from './Contact';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Gallery from './Gallery';
import Reviews from './Reviews';

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
        </Switch>
      </BrowserRouter>
      </Store> 
      </div>
  );
}

export default App;
