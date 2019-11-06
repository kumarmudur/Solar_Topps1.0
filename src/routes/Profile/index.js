/**
 * Dasboard Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncUserProfileComponent, 
    AsyncUserProfileDetailsComponent,
    AsyncChangePasswordComponent,

} from 'Components/AsyncComponent/AsyncComponent';

const UserProfile = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/UserProfileDetails`} />
         <Route path={`${match.url}/UserProfileDetails`} component={AsyncUserProfileDetailsComponent} />
         <Route path={`${match.url}/UserProfile`} component={AsyncUserProfileComponent} />
         <Route path={`${match.url}/ChangePassword`} component={AsyncChangePasswordComponent} />
      </Switch>
   </div>
);

export default UserProfile;
