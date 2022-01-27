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
import Signin from 'views/auth/Signin';
import Register from 'views/auth/Register';
import Auth from 'layouts/Auth';




ReactDOM.render(
<Provider store={store}>
<BrowserRouter>
<Switch>
<Route path="/auth/register" component={Register}/>
<Route path="/signin" component={Signin}/>
<Route path="/" component={Auth}/>
</Switch>
</BrowserRouter>
</Provider>
,document.getElementById("root"))
//ReactDOM.render(<App/>,document.getElementById("root"))
