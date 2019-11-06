import * as actionTypes from '../../actions/Types/UserManagement';

// initial state
const INIT_STATE = {
    users: null,
    loading: false,
}

export default (state = INIT_STATE, action) => {
    const { type } = action;
    switch(type) {

        case actionTypes.GET_CUSTOMER_LIST: 
          return { ...state, users: null }

        case actionTypes.GET_CUSTOMER_LIST_SUCCESS:
          return { ...state, users: action.payload }

        case actionTypes.GET_CUSTOMER_LIST_FAILURE:
          return { }

        default: return { ...state }
    }
}