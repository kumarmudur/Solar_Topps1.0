/**
 * Dasboard Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
   AsyncManageUsersComponent, 
   AsyncManageBulkImportComponent,
   AsyncAddUserComponent,
   AsyncViewUserDetailsComponent,
   AsyncManageCustomersComponent,
   AsyncViewCustomerDetailsComponent,
   AsyncAddCustomerComponent,
} from 'Components/AsyncComponent/AsyncComponent';

const UserManagement = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/ManageUsers`} />
         <Route path={`${match.url}/ManageUsers`} component={AsyncManageUsersComponent} />
         <Route path={`${match.url}/Users`} component={AsyncAddUserComponent} />
         <Route path={`${match.url}/UserDetails`} component={AsyncViewUserDetailsComponent} />
         <Route path={`${match.url}/BulkImport`} component={AsyncManageBulkImportComponent} />
         <Route path={`${match.url}/ManageCustomer`} component={AsyncManageCustomersComponent} />
         <Route path={`${match.url}/CustomerDetails`} component={AsyncViewCustomerDetailsComponent} />
         <Route path={`${match.url}/Customers`} component={AsyncAddCustomerComponent} />
      </Switch>
   </div>
);

export default UserManagement;
