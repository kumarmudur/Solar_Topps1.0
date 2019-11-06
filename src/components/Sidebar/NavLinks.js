// sidebar nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.userManagement",
         "menu_icon": "zmdi zmdi-account",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/UserManagement/ManageUsers",
               "new_item": false,
               "menu_title": "sidebar.manageuser"
            },
            {
               "path": "/app/UserManagement/ManageCustomer",
               "new_item": false,
               "menu_title": "sidebar.manageCustomers"
            },
            {
               "path": "/app/UserManagement/BulkImport",
               "new_item": false,
               "menu_title": "sidebar.manageBulkImport"
            },
            
         ]
      }
   ],
   category2: [
      {
         "menu_title": "sidebar.inventory",
         "menu_icon": "zmdi zmdi-store",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.manageProducts",
               "new_item": false,
               "path": "/app/Inventory/Products/ManageProduct",
            },
            {
               "menu_title": "sidebar.manageWarehouse",
               "new_item": false,
               "path": "/app/Inventory/Warehouse/ManageWarehouse",
            },
            {
               "menu_title": "sidebar.manageSupplier",
               "new_item": false,
               "path": "/app/Inventory/Supplier/ManageSupplier",
            },
            // {
            //    "menu_title": "sidebar.manageConfiguration",
            //    "new_item": false,
            //    "path": "/app/Inventory/Configuration/ManageConfiguration",
            // },
         ]
      }
   ],

   category3: [
      {
         "menu_title": "sidebar.purchasePlan",
         "menu_icon": "zmdi zmdi-assignment",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.managePurchasePlan",
               "new_item": false,
               "path": "/app/PurchasePlan",
            }
         ]
      }
   ],

   category4: [
      {
         "menu_title": "sidebar.customerProposal",
         "menu_icon": "zmdi zmdi-file-text",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.manageProposal",
               "new_item": false,
               "path": "/app/CustomerProposal/ManageProposal",
            }
         ]
      }
   ]
}


