/**
 * Dasboard Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
   AsyncManageProductsComponent, 
   AsyncManageWarehouseComponent, 
   AsyncManageSupplierComponent, 
   AsyncManageConfigurationComponent,
   AsyncAddEditProductComponent,
   AsyncViewProductDetailsComponent,
   AsyncAddEditSupplierComponent,
   AsyncViewSupplierDetailsComponent,
   AsyncAddEditWarehouseComponent,
   AsyncViewWarehouseDetailsComponent,
   AsyncAddOtherPriceComponent,
} from 'Components/AsyncComponent/AsyncComponent';


const UserManagement = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/Products/ManageProduct`} />
         <Route path={`${match.url}/Products/ManageProduct`} component={AsyncManageProductsComponent} />
         <Route path={`${match.url}/Products/Product`} component={AsyncAddEditProductComponent} />
         <Route path={`${match.url}/Products/ProductDetails`} component={AsyncViewProductDetailsComponent} />
         <Route path={`${match.url}/Warehouse/ManageWarehouse`} component={AsyncManageWarehouseComponent} />
         <Route path={`${match.url}/Warehouse/Warehouse`} component={AsyncAddEditWarehouseComponent} />
         <Route path={`${match.url}/Warehouse/WarehouseDetails`} component={AsyncViewWarehouseDetailsComponent} />
         <Route path={`${match.url}/Supplier/ManageSupplier`} component={AsyncManageSupplierComponent} />
         <Route path={`${match.url}/Supplier/Supplier`} component={AsyncAddEditSupplierComponent} />
         <Route path={`${match.url}/Supplier/SupplierDetails`} component={AsyncViewSupplierDetailsComponent} />
         <Route path={`${match.url}/Configuration/ManageConfiguration`} component={AsyncManageConfigurationComponent} />
         <Route path={`${match.url}/Configuration/AddOtherPrice`} component={AsyncAddOtherPriceComponent} />
      </Switch>
   </div>
);

export default UserManagement;
