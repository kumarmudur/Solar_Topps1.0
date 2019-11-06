import * as actionTypes from '../../actions/InventoryManagement';
// initial state
const INIT_STATE = {
   warehouses: null,
   warehouseData: null,
   saveWarehouse: null,
   deleteWarehouse: null,
   loading: false,
}
export default (state = INIT_STATE, action) => {
   const { type, result, error } = action;
   switch(type) {
       // GET METHODS

       case actionTypes.GET_WAREHOUSE_LIST:
         return { ...state, warehouses: null }

       case actionTypes.GET_WAREHOUSE_LIST_SUCCESS:
         return { ...state, warehouses: result && result.data }

       case actionTypes.GET_WAREHOUSE_LIST_FAILURE:
          return { ...state, warehouses: error}

       case actionTypes.GET_WAREHOUSE_DATA:
          return { ...state, warehouseData: null }
 
       case actionTypes.GET_WAREHOUSE_DATA_SUCCESS:
          return { ...state, warehouseData: result && result.data }
 
        case actionTypes.GET_WAREHOUSE_DATA_FAILURE:
          return { ...state, warehouseData: error}

       // POST METHODS
       
       case actionTypes.POST_SAVE_WAREHOUSE: 
         return { ...state, saveWarehouse: null }

       case actionTypes.POST_SAVE_WAREHOUSE_SUCCESS: 
         return { ...state, saveWarehouse: result && result.data }

       case actionTypes.POST_SAVE_WAREHOUSE_FAILURE: 
         return { ...state, saveWarehouse: error }

       case actionTypes.POST_DELETE_WAREHOUSE: 
         return { ...state, deleteWarehouse: null }

       case actionTypes.POST_DELETE_WAREHOUSE_SUCCESS: 
         return { ...state, deleteWarehouse: result && result.data }

       case actionTypes.POST_DELETE_WAREHOUSE_FAILURE: 
         return { ...state, deleteWarehouse: error }
         
       default: return { ...state }
   }
}