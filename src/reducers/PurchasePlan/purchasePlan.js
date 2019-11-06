import * as actionTypes from '../../actions/PurchasePlan';

// initial state
const INIT_STATE = {
    purchasePlans: null,
    staticData: null,
    purchasePlanData: null,
    savePurchasePlan: null,
    deletePurchasePlan: null,
    loading: false,
}

export default (state = INIT_STATE, action) => {
    const { type, result, error } = action;
    switch(type) {

        // GET METHODS
        case actionTypes.GET_PURCHASE_PLAN_LIST: 
          return { ...state, purchasePlans: null }

        case actionTypes.GET_PURCHASE_PLAN_LIST_SUCCESS:
          return { ...state, purchasePlans: result && result.data }

        case actionTypes.GET_PURCHASE_PLAN_LIST_FAILURE:
          return { ...state, purchasePlans: error }

        case actionTypes.GET_STATIC_DATA_PURCHASE_PLAN: 
          return { ...state, staticData: null }

        case actionTypes.GET_STATIC_DATA_PURCHASE_PLAN_SUCCESS:
          return { ...state, staticData: result && result.data }

        case actionTypes.GET_STATIC_DATA_PURCHASE_PLAN_FAILURE:
          return { ...state, staticData: error }

        case actionTypes.GET_PURCHASE_PLAN_DATA: 
          return { ...state, purchasePlanData: null }

        case actionTypes.GET_PURCHASE_PLAN_DATA_SUCCESS:
          return { ...state, purchasePlanData: result && result.data }

        case actionTypes.GET_PURCHASE_PLAN_DATA_FAILURE:
          return { ...state, purchasePlanData: error }


        // POST METHODS
       
        case actionTypes.POST_SAVE_PURCHASE_PLAN: 
          return { ...state, savePurchasePlan: null }

        case actionTypes.POST_SAVE_PURCHASE_PLAN_SUCCESS: 
          return { ...state, savePurchasePlan: result && result.data }

        case actionTypes.POST_SAVE_PURCHASE_PLAN_FAILURE: 
          return { ...state, savePurchasePlan: error }

        case actionTypes.POST_DELETE_PURCHASE_PLAN: 
          return { ...state, deletePurchasePlan: null }
 
        case actionTypes.POST_DELETE_PURCHASE_PLAN_SUCCESS: 
          return { ...state, deletePurchasePlan: result && result.data }
 
        case actionTypes.POST_DELETE_PURCHASE_PLAN_FAILURE: 
          return { ...state, deletePurchasePlan: error }
        
        default: return { ...state }
    }
}