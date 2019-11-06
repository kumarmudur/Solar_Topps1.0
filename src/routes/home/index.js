/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
   AsyncCrmComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Home = ({ match }) => (
   <div className="Crm-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/landing-page`} />
         <Route path={`${match.url}/landing-page`} component={AsyncCrmComponent} />
      </Switch>
   </div>
);

export default Home;