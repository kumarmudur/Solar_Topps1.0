import * as actionTypes from '../../actions/InventoryManagement';
// initial state
const INIT_STATE = {
   saveConfigFields: null,
   loading: false,
}

export default (state = INIT_STATE, action) => {
    const { type, result, error } = action;
    switch(type) {
        // GET METHODS

 
        // POST METHODS
        
        case actionTypes.POST_SAVE_CONFIG_FIELDS: 
          return { ...state, saveConfigFields: null }
 
        case actionTypes.POST_SAVE_CONFIG_FIELDS_SUCCESS: 
          return { ...state, saveConfigFields: result && result.data }
 
        case actionTypes.POST_SAVE_CONFIG_FIELDS_FAILURE: 
          return { ...state, saveConfigFields: error }
          
        default: return { ...state }
    }
 }