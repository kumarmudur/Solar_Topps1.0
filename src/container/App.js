/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';

//Horizontal Layout
import HorizontalLayout from './HorizontalLayout';

//Agency Layout
import AgencyLayout from './AgencyLayout';

//Main App
import RctDefaultLayout from './DefaultLayout';

// boxed layout
import RctBoxedLayout from './RctBoxedLayout';
// CRM layout
import CRMLayout from './CRMLayout';
//Login Page
import Signin from './Signin';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ActivateUser from './ActivateUser';
import Verification from './Verification';

//Associate General Info
import AssociateGeneralInfo from './Associate/GeneralInfo';
/**
 * 
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, ...rest }) =>
   <Route
      {...rest}
      render={props => <Component {...props} />}
   />;

class App extends Component {
   render() {
      const { location, match, user } = this.props;
      if (location.pathname === '/') {
         //return <Redirect to={'/app/home/landing-page'} />;
         return <Redirect to={'/signin'} />;
      }
      return (
         <RctThemeProvider>
            <NotificationContainer />
            <InitialPath
               path={`${match.url}app`}
               authUser={user}
               component={RctDefaultLayout}
            />
            <Route path="/horizontal" component={HorizontalLayout} />
            <Route path="/agency" component={AgencyLayout} />
            <Route path="/boxed" component={RctBoxedLayout} />
            <Route path="/dashboard" component={CRMLayout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword" component={ResetPassword} />
            <Route path="/activate" component={ActivateUser} />
            <Route path="/verification" component={Verification} />
            <Route path="/associate/generalInfo" component={AssociateGeneralInfo} />
         </RctThemeProvider>
      );
   }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { user } = authUser;
   return { user };
};

export default connect(mapStateToProps)(App);