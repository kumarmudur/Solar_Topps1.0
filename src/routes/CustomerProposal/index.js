/**
 * Dasboard Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
   AsyncManageProposalComponent
} from 'Components/AsyncComponent/AsyncComponent';

const ManageProposal = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/ManageProposal`} />
         <Route path={`${match.url}/ManageProposal`} component={AsyncManageProposalComponent} />
      </Switch>
   </div>
);

export default ManageProposal;
