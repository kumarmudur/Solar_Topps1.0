/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import settings from './settings';
import chatAppReducer from './ChatAppReducer';
import emailAppReducer from './EmailAppReducer';
import sidebarReducer from './SidebarReducer';
import todoAppReducer from './TodoAppReducer';
import authUserReducer from './AuthUserReducer';
import feedbacksReducer from './FeedbacksReducer';
import ecommerceReducer from './EcommerceReducer';

// USER MANAGEMENT
import userManagementReducer from './UserManagement/userManagement';
import customerManagementReducer from './UserManagement/customerManagement';

// INVENTORY MANAGEMENT
import productReducer from './InventoryManagement/product';
import warehouseReducer from './InventoryManagement/warehouse';
import supplierReducer from './InventoryManagement/supplier';
import configurations from './InventoryManagement/configurations';

// PURCHASE PLAN
import purchasePlanReducer from './PurchasePlan/purchasePlan';

// CUSTOMER PROPOSAL
import proposalReducer from './CustomerProposal/proposal';

// COMMON REDUCERS
import commonReducer from './Common';

const reducers = combineReducers({
   settings,
   chatAppReducer,
   emailApp: emailAppReducer,
   sidebar: sidebarReducer,
   todoApp: todoAppReducer,
   authUser: authUserReducer,
   feedback: feedbacksReducer,
   ecommerce: ecommerceReducer,
   UserManagement: userManagementReducer,
   CustomerManagement: customerManagementReducer,

   Product: productReducer,
   Warehouse: warehouseReducer,
   Supplier: supplierReducer,
   Configurations: configurations,

   PurchasePlan: purchasePlanReducer,

   Proposal: proposalReducer,

   Common: commonReducer
   
});

export default reducers;
