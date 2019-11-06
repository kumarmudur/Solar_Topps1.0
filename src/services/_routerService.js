// routes
import Dashboard from 'Routes/dashboard';
import Inventory from 'Routes/Inventory';
import UserManagement from 'Routes/UserManagement';
import PurchasePlan from 'Routes/PurchasePlan';
import CustomerProposal from 'Routes/CustomerProposal';
import Home from 'Routes/home';
import Profile from 'Routes/Profile';

export default [
   {
      path: 'dashboard',
      component: Dashboard
   },
   {
      path: 'home',
      component: Home
   },
   {
      path: 'Profile',
      component: Profile
   },
   {
      path: "UserManagement",
      component: UserManagement
   },
   {
      path: 'Inventory',
      component: Inventory
   },
   {
      path: "PurchasePlan",
      component: PurchasePlan
   },
   {
      path: "CustomerProposal",
      component: CustomerProposal
   },
]