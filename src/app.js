import React        from "react";
import ReactDOM     from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import "normalize.css/normalize.css"
import  "./styles/styles.scss";
import { Router, Route,Switch, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import AppRouter from './routers/AppRouter';
import reducers from './reducers';
import {AUTH_USER} from "./actions/types";
import signin from './components/auth/signin'
import history from '../src/components/history'
import ReactGA from 'react-ga';
import config from "../../config";
ReactGA.initialize(config.gAnalytics, {
    // debug: true,
    // titleCase: false,
    gaOptions: {
        clientId: localStorage.getItem('password') ? localStorage.getItem('password') : 'undefined device'
    }
});
if(process.env && process.env.NODE_ENV ==='production'){
    if ('serviceWorker' in navigator ) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then(registration => {
            // console.log('SW registered: ', registration);
            }).catch(registrationError => {
            //  console.log('SW registration failed: ', registrationError);
            });
        });
    }
}
const middleware = [
    reduxThunk,
];

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(...middleware),
// other store enhancers if any
));



const token = localStorage.getItem('token');
if(token){
    store.dispatch({type:AUTH_USER});
}
function fireTracking() {
    ReactGA.pageview(location.pathname);
}
ReactDOM.render(
    <Provider store={store}>
    <Router  history = { history}
        onUpdate = {fireTracking}>
        <Switch>
            <Route exact path="/" component={AppRouter}/>
            <Route path="/about" component={signin}/>
        </Switch>
    </Router>
        
        {/* <AppRouter /> */}
    </Provider>
    , document.getElementById('app'));

