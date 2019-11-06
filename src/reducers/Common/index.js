import * as actionTypes from '../../actions/Common';

// initial state
const INIT_STATE = {
    countries: null,
    userTypeList: null,
    roleList: null,
    officeList: null,
    departmentList: null,
    loading: false,
}

export default (state = INIT_STATE, action) => {
    const { type, result, error } = action;
    switch(type) {

        // To get Country List
        case actionTypes.GET_COUNTRY_LIST: 
          return { ...state, countries: null }

        case actionTypes.GET_COUNTRY_LIST_SUCCESS:
          return { ...state, countries: result }

        case actionTypes.GET_COUNTRY_LIST_FAILURE:
          return { ...state, countries: error }

        // To get userType List
        case actionTypes.GET_USER_TYPE_LIST: 
          return { ...state, userTypeList: null }

        case actionTypes.GET_USER_TYPE_LIST_SUCCESS:
          return { ...state, userTypeList: result }

        case actionTypes.GET_USER_TYPE_LIST_FAILURE:
          return { ...state, userTypeList: error }

        // To get Role List
        case actionTypes.GET_ROLE_LIST: 
          return { ...state, roleList: null }

        case actionTypes.GET_ROLE_LIST_SUCCESS:
          return { ...state, roleList: result }

        case actionTypes.GET_ROLE_LIST_FAILURE:
          return { ...state, roleList: error } 
          
        // To get Office List
        case actionTypes.GET_OFFICE_LIST: 
          return { ...state, officeList: null }

        case actionTypes.GET_OFFICE_LIST_SUCCESS:
          return { ...state, officeList: result }

        case actionTypes.GET_OFFICE_LIST_FAILURE:
          return { ...state, officeList: error } 
          
        // To get Department List
        case actionTypes.GET_DEPARTMENT_LIST: 
          return { ...state, departmentList: null }

        case actionTypes.GET_DEPARTMENT_LIST_SUCCESS:
          return { ...state, departmentList: result }

        case actionTypes.GET_DEPARTMENT_LIST_FAILURE:
          return { ...state, departmentList: error }   


        default: return { ...state }
    }
}