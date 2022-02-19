import Store from '../../context/provider';
import BasicDetails from '../../components/BasicDetails';
import Contact from '../../components/Contact';
import { Route, Switch } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Gallery from '../../components/Gallery';
import Reviews from '../../components/Reviews';
import Services from '../../components/Services';
import Room from '../../components/Room.js'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Auth from 'layouts/Auth';
import { Redirect } from 'react-router';
import Profile from '../PropertyOwner/Profile'


function AdminView() {
  return (
    <div>
      <Store>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Auth} />
            <Route exact path="/owner" component={Profile}/>
            <Route path="/admin" exact component={BasicDetails} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/gallery" exact component={Gallery} />
            <Route path="/reviews" exact component={Reviews} />
            <Route path="/services" exact component={Services} />
            <Route path="/room" exact component={Room} />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      </Store>

    </div>
  );
}

export default AdminView;
