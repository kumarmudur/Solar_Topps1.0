import * as actionTypes from '../../actions/InventoryManagement';

// initial state
const INIT_STATE = {
    suppliers: null,
    supplierData: null,
    saveSupplier: null,
    deleteSupplier: null,
    loading: false,
}

export default (state = INIT_STATE, action) => {
    const { type, result, error } = action;
    switch(type) {

        // GET METHODS
        case actionTypes.GET_SUPPLIER_LIST: 
          return { ...state, suppliers: null }

        case actionTypes.GET_SUPPLIER_LIST_SUCCESS:
          return { ...state, suppliers: result && result.data }

        case actionTypes.GET_SUPPLIER_LIST_FAILURE:
          return { ...state, suppliers: error }
  
        case actionTypes.GET_SUPPLIER_DATA:
            return { ...state, supplierData: null }
   
        case actionTypes.GET_SUPPLIER_DATA_SUCCESS:
            return { ...state, supplierData: result && result.data }
   
        case actionTypes.GET_SUPPLIER_DATA_FAILURE:
            return { ...state, supplierData: error}

        // POST METHODS
       
        case actionTypes.POST_SAVE_SUPPLIER: 
           return { ...state, saveSupplier: null }

        case actionTypes.POST_SAVE_SUPPLIER_SUCCESS: 
           return { ...state, saveSupplier: result && result.data }

        case actionTypes.POST_SAVE_SUPPLIER_FAILURE: 
           return { ...state, saveSupplier: error }

        case actionTypes.POST_DELETE_SUPPLIER: 
           return { ...state, deleteSupplier: null }
  
        case actionTypes.POST_DELETE_SUPPLIER_SUCCESS: 
           return { ...state, deleteSupplier: result && result.data }
  
        case actionTypes.POST_DELETE_SUPPLIER_FAILURE: 
           return { ...state, deleteSupplier: error }

        default: return { ...state }
    }
}