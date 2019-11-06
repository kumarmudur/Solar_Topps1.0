/**
 * Purchase Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
   AsyncPurchasePlanComponent,
   AsyncAddEditPurchasePlanComponent,
   AsyncViewPurchasePlanDetailsComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Purchase = ({ match }) => (
   <div className="Crm-wrapper">
      <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/ManagePurchase`} />
         <Route path={`${match.url}/ManagePurchase`} component={AsyncPurchasePlanComponent} />
         <Route path={`${match.url}/Purchase`} component={AsyncAddEditPurchasePlanComponent} />
         <Route path={`${match.url}/PurchaseDetails`} component={AsyncViewPurchasePlanDetailsComponent} />
      </Switch>
   </div>
);

export default Purchase;