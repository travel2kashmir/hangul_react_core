<<<<<<< Updated upstream
import React from "react";
import ReactDOM from 'react-dom';
import APP from './components/App';

ReactDOM.render(<APP />, document.getElementById("root"));
=======
import React from 'react'
import ReactDOM from 'react-dom'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import { Provider } from 'react-redux';
import { store } from 'states/Store';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Switch,Redirect } from 'react-router';
import Auth from 'layouts/Auth';
import AdminView from "views/Admin/AdminView";
import PropertyOwnerView from "views/PropertyOwner/PropertyOwnerView";
import Profile from './views/PropertyOwner/Profile'
ReactDOM.render(
 <Provider store={store}>
 <BrowserRouter>
 <Switch>
 <Route exact path="/" component={Auth}/>
 <Route exact path="/owner" component={Profile}/>
 <Route exact path="/owner-view" component={PropertyOwnerView}/>
 <Route exact path="/admin" component={AdminView}/>
 <Redirect from="*" to="/" />
 </Switch>
 </BrowserRouter>
 </Provider>
,document.getElementById("root"))
//ReactDOM.render(<App/>,document.getElementById("root"))
>>>>>>> Stashed changes
