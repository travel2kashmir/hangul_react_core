import React from 'react';
import Store from './context/provider'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Switch,Redirect } from 'react-router';
import "./styles/tailwind.css"
import './styles/index.css';
import Signin from './authorization/signin';
import Signup from './authorization/signup';
import BasicDetails  from './pages/propertybasicdetails'
import Address from './pages/propertyaddress'
import Contact from './pages/propertycontact'
import Gallery from './pages/propertygallery'
import Reviews from './pages/propertyreviews'
import Services from './pages/propertyservices'
import UserLandingPage from './landingpages/userlanding'
import PropertySummary from './pages/propertysummary'
import PropertyXML from './pages/propertyxml'
import PropertyRooms from './pages/propertyrooms'
import PropertyRoom from './pages/propertyroom'
import NewRoom from './pages/propertyaddroom'
import PropertyRoomXML from './pages/propertyroomxml'
import PropertyRoomsXML from './pages/propertyroomsxml'
import PropertyPackages from './pages/propertypackages'
import PropertyPackage from './pages/propertypackage'
import PackageDescription from './pages/Packages/packagedescription'
import PackageRates from './pages/Packages/packagerates'
import EliteRewards from './pages/Packages/eliterewards'
import PropertyCredit from './pages/Packages/propertycredit'
import PackageMiles from './pages/Packages/packagemiles'
import PackageServices from './pages/Packages/packageservices'
import 'flowbite';
import { Provider } from 'react-redux';
import { store } from './states/Store';


ReactDOM.render(
  <React.StrictMode>
    <Store>
<Provider store={store}>
 <BrowserRouter>
 <Switch>
 <Route exact path="/" component={Signin}/>
 <Route exact path="/signup" component={Signup}/>
 <Route exact path='/userlanding' component={UserLandingPage}/>
 <Route exact path='/basicdetails' component={BasicDetails}/>
 <Route exact path='/address' component={Address}/>
 <Route exact path='/contact' component={Contact}/>
 <Route exact path='/gallery' component={Gallery}/>
 <Route exact path='/reviews' component={Reviews}/>
 <Route exact path='/services' component={Services}/>
 <Route exact path="/property-summary" component={PropertySummary}/>
 <Route exact path="/property-xml" component={PropertyXML}/>
 <Route exact path="/property-rooms" component={PropertyRooms}/>
 <Route exact path="/property-room" component={PropertyRoom}/>
 <Route exact path="/new-room" component={NewRoom}/>
 <Route exact path="/property-roomsxml" component={PropertyRoomsXML}/>
 <Route exact path="/property-roomxml" component={PropertyRoomXML}/>
 <Route exact path="/property-packages" component={PropertyPackages}/>
 <Route exact path="/property-package" component={PropertyPackage}/>
 <Route exact path="/package-description" component={PackageDescription}/>
 <Route exact path="/package-rates" component={PackageRates}/>
 <Route exact path="/elite-rewards" component={EliteRewards}/>
 <Route exact path="/property-credit" component={PropertyCredit}/>
 <Route exact path="/package-miles" component={PackageMiles}/>
 <Route exact path="/package-services" component={PackageServices}/>
 <Redirect from="*" to="/" />
 <Redirect from="/signup" to="/sign-up" />
 </Switch>
 </BrowserRouter>
 </Provider>
 </Store>
  </React.StrictMode>,
  document.getElementById('root')
);

