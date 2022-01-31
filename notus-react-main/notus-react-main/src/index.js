import React from 'react'
import ReactDOM from 'react-dom'
//import App from './components/App'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
//import Login from './views/Login'
import { Provider } from 'react-redux';
import { store } from 'states/Store';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Switch } from 'react-router';
import Auth from 'layouts/Auth';
import AdminView from "views/Admin/AdminView";
import PropertyOwnerView from "views/PropertyOwner/PropertyOwnerView";




 ReactDOM.render(
 <Provider store={store}>
 <BrowserRouter>
 <Switch>
 <Route exact path="/" component={Auth}/>
 <Route exact path="/owner" component={PropertyOwnerView}/>
 <Route excat path="/admin" component={AdminView}/>
 
 </Switch>
 </BrowserRouter>
 </Provider>
,document.getElementById("root"))
//ReactDOM.render(<App/>,document.getElementById("root"))
