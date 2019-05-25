import React from 'react';
import {BrowserRouter,Switch,Route,Redirect,Router} from 'react-router-dom';

// import Main from '../components/Main';
// import history from '../components/history'
// import SignIn from  '../components/auth/signin';
// import SignOut from '../components/auth/signout';
// import SignUp from '../components/auth/signup';
// import Header from '../components/Header';
import {
    connect
} from "react-redux";
// import {splash,Steps,Reset}  from "../actions"


import ReactGA from 'react-ga';
import config from "../../../config";
ReactGA.initialize(config.gAnalytics, {
    // debug: true,
    // titleCase: false,
    gaOptions: {
        clientId: localStorage.getItem('password') ? localStorage.getItem('password') : 'undefined device'
    }
});

const AppRouter = (props) => {
    document.breakPoint=992;

    function fireTracking() {
        ReactGA.pageview(location.pathname);
    }
    const resetHandler = () => {
        props.Reset();
    }
    return(
            <div>
                {/*resetSplash={resetHander}*/}
                <Header resetSplash={resetHandler}/>
                {/*<Nav/>*/}
                <Switch>
                    <Route path='/' component={Main} />
                    {/* <Route path='/contactus' component={ContactUs}/>
                    <Route path='/signin' component={SignIn}/>
                    <Route path='/signout' component={SignOut}/>
                    <Route path='/signup' component={SignUp}/> */}
                </Switch>
                {/*<Footer/>*/}

            </div>
        
    )
}
const mapStateToProps = (state) => {
    return {splashState:state.Main.splash}
}
export default connect(mapStateToProps,{splash,Steps,Reset})(AppRouter);
// export default AppRouter;