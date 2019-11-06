/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// ecommerce dashboard
const AsyncEcommerceDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/ecommerce"),
   loading: () => <RctPageLoader />,
});

// agency dashboard
const AsyncSaasDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/saas"),
   loading: () => <RctPageLoader />,
});

// agency dashboard
const AsyncAgencyDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/agency"),
   loading: () => <RctPageLoader />,
});

// boxed dashboard
const AsyncNewsDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/news"),
   loading: () => <RctPageLoader />,
});
// crm dashboard
const AsyncCrmComponent = Loadable({
   loader: () => import("Routes/home/landing-page"),
   loading: () => <RctPageLoader />,
});


//User Profile
const AsyncUserProfileComponent = Loadable({
   loader: () => import("Routes/Profile/UserProfile"),
   loading: () => <RctPageLoader />,
});

const AsyncUserProfileDetailsComponent = Loadable({
   loader: () => import("Routes/Profile/UserProfileDetails"),
   loading: () => <RctPageLoader />,
});

const AsyncChangePasswordComponent = Loadable({
   loader: () => import("Routes/Profile/ChangePassword"),
   loading: () => <RctPageLoader />,
});



//Home
const AsyncLandingPageComponent = Loadable({
   loader: () => import("Routes/home/landing-page"),
   loading: () => <RctPageLoader />,
});

// User Management 
const AsyncManageUsersComponent = Loadable({
   loader: () => import("Routes/UserManagement/ManageUsers"),
   loading: () => <RctPageLoader />,
});

const AsyncAddUserComponent = Loadable({
   loader: () => import("Routes/UserManagement/Users"),
   loading: () => <RctPageLoader />,
});

const AsyncViewUserDetailsComponent = Loadable({
   loader: () => import("Routes/UserManagement/UserDetails"),
   loading: () => <RctPageLoader />,
});

//Customer Management
const AsyncManageCustomersComponent = Loadable({
   loader: () => import("Routes/UserManagement/ManageCustomer"),
   loading: () => <RctPageLoader />,
});

const AsyncViewCustomerDetailsComponent = Loadable({
   loader: () => import("Routes/UserManagement/CustomerDetails"),
   loading: () => <RctPageLoader />,
});

const AsyncAddCustomerComponent = Loadable({
   loader: () => import("Routes/UserManagement/Customers"),
   loading: () => <RctPageLoader />,
});

//Manage Bulk Import
const AsyncManageBulkImportComponent = Loadable({
   loader: () => import("Routes/UserManagement/BulkImport"),
   loading: () => <RctPageLoader />,
});

// Inventory 
const AsyncManageProductsComponent = Loadable({
   loader: () => import("Routes/Inventory/Products/ManageProduct"),
   loading: () => <RctPageLoader />,
});

const AsyncAddEditProductComponent = Loadable({
   loader: () => import("Routes/Inventory/Products/Product"),
   loading: () => <RctPageLoader />,
});

const AsyncViewProductDetailsComponent = Loadable({
   loader: () => import("Routes/Inventory/Products/ProductDetails"),
   loading: () => <RctPageLoader />,
})


const AsyncManageWarehouseComponent = Loadable({
   loader: () => import("Routes/Inventory/Warehouse/ManageWarehouse"),
   loading: () => <RctPageLoader />,
});

const AsyncAddEditWarehouseComponent = Loadable({
   loader: () => import("Routes/Inventory/Warehouse/Warehouse"),
   loading: () => <RctPageLoader />,
});

const AsyncViewWarehouseDetailsComponent = Loadable({
   loader: () => import("Routes/Inventory/Warehouse/WarehouseDetails"),
   loading: () => <RctPageLoader />,
})

const AsyncManageSupplierComponent = Loadable({
   loader: () => import("Routes/Inventory/Supplier/ManageSupplier"),
   loading: () => <RctPageLoader />,
});

const AsyncAddEditSupplierComponent = Loadable({
   loader: () => import("Routes/Inventory/Supplier/Supplier"),
   loading: () => <RctPageLoader />,
});

const AsyncViewSupplierDetailsComponent = Loadable({
   loader: () => import("Routes/Inventory/Supplier/SupplierDetails"),
   loading: () => <RctPageLoader />,
})

const AsyncManageConfigurationComponent = Loadable({
   loader: () => import("Routes/Inventory/Configuration/ManageConfiguration"),
   loading: () => <RctPageLoader />,
});

const AsyncAddOtherPriceComponent = Loadable({
   loader: () => import("Routes/Inventory/Configuration/AddOtherPrice"),
   loading: () => <RctPageLoader />,
});

// Purchase Plan 
const AsyncPurchasePlanComponent = Loadable({
   loader: () => import("Routes/PurchasePlan/ManagePurchase"),
   loading: () => <RctPageLoader />,
})

const AsyncAddEditPurchasePlanComponent = Loadable({
   loader: () => import("Routes/PurchasePlan/Purchase"),
   loading: () => <RctPageLoader />,
})

const AsyncViewPurchasePlanDetailsComponent = Loadable({
   loader: () => import("Routes/PurchasePlan/PurchaseDetails"),
   loading: () => <RctPageLoader />,
})

// Manage Customer Proposal 
const AsyncManageProposalComponent = Loadable({
   loader: () => import("Routes/CustomerProposal/ManageProposal"),
   loading: () => <RctPageLoader />,
})


export {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
   AsyncCrmComponent,
   
   AsyncUserProfileComponent, AsyncUserProfileDetailsComponent, AsyncChangePasswordComponent,
   AsyncLandingPageComponent,
   AsyncManageUsersComponent, AsyncAddUserComponent, AsyncViewUserDetailsComponent,
   AsyncManageCustomersComponent, AsyncAddCustomerComponent, AsyncViewCustomerDetailsComponent,
   AsyncManageBulkImportComponent,
   AsyncManageProductsComponent, AsyncAddEditProductComponent, AsyncViewProductDetailsComponent,
   AsyncManageWarehouseComponent, AsyncAddEditWarehouseComponent, AsyncViewWarehouseDetailsComponent,
   AsyncManageSupplierComponent, AsyncAddEditSupplierComponent, AsyncViewSupplierDetailsComponent,
   AsyncManageConfigurationComponent, AsyncAddOtherPriceComponent,
   AsyncPurchasePlanComponent, AsyncAddEditPurchasePlanComponent, AsyncViewPurchasePlanDetailsComponent,
   AsyncManageProposalComponent,
};
