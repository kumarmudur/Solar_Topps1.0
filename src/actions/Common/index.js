import * as action from '../Types/Common';

// GET METHODS
export const getCountryList = payload => ({
    type: action.GET_COUNTRY_LIST,
    payload
});

export const getCountryListSuccess = response => ({
    type: action.GET_COUNTRY_LIST_SUCCESS,
    result: response.data
});

export const getCountryListFailure = error => ({
    type: action.GET_COUNTRY_LIST_FAILURE,
    error
});

export const getStateList = payload => ({
    type: action.GET_STATE_LIST,
    payload
});

export const getStateListSuccess = response => ({
    type: action.GET_STATE_LIST_SUCCESS,
    result: response.data
});

export const getStateListFailure = error => ({
    type: action.GET_STATE_LIST_FAILURE,
    error
});

export const getCityList = payload => ({
    type: action.GET_CITY_LIST,
    payload
});

export const getCityListSuccess = response => ({
    type: action.GET_CITY_LIST_SUCCESS,
    result: response.data
});

export const getCityListFailure = error => ({
    type: action.GET_CITY_LIST_FAILURE,
    error
});

// To Get UserType List
export const getUserTypeList = payload => ({
    type: action.GET_USER_TYPE_LIST,
    payload
});

export const getUserTypeListSuccess = response => ({
    type: action.GET_USER_TYPE_LIST_SUCCESS,
    result: response.data
});

export const getUserTypeListFailure = error => ({
    type: action.GET_USER_TYPE_LIST_FAILURE,
    error
});

// To Get Role List
export const getRoleList = payload => ({
    type: action.GET_ROLE_LIST,
    payload
});

export const getRoleListSuccess = response => ({
    type: action.GET_ROLE_LIST_SUCCESS,
    result: response.data
});

export const getRoleListFailure = error => ({
    type: action.GET_ROLE_LIST_FAILURE,
    error
});

// To Get Office List
export const getOfficeList = payload => ({
    type: action.GET_OFFICE_LIST,
    payload
});

export const getOfficeListSuccess = response => ({
    type: action.GET_OFFICE_LIST_SUCCESS,
    result: response.data
});

export const getOfficeListFailure = error => ({
    type: action.GET_OFFICE_LIST_FAILURE,
    error
});

// To Get Department List
export const getDepartmentList = payload => ({
    type: action.GET_DEPARTMENT_LIST,
    payload
});

export const getDepartmentListSuccess = response => ({
    type: action.GET_DEPARTMENT_LIST_SUCCESS,
    result: response.data
});

export const getDepartmentListFailure = error => ({
    type: action.GET_DEPARTMENT_LIST_FAILURE,
    error
});

export const GET_COUNTRY_LIST = 'GET_COUNTRY_LIST';
export const GET_COUNTRY_LIST_SUCCESS = 'GET_COUNTRY_LIST_SUCCESS';
export const GET_COUNTRY_LIST_FAILURE = 'GET_COUNTRY_LIST_FAILURE';

export const GET_STATE_LIST = 'GET_STATE_LIST';
export const GET_STATE_LIST_SUCCESS = 'GET_STATE_LIST_SUCCESS';
export const GET_STATE_LIST_FAILURE = 'GET_STATE_LIST_FAILURE';

export const GET_CITY_LIST = 'GET_CITY_LIST';
export const GET_CITY_LIST_SUCCESS = 'GET_CITY_LIST_SUCCESS';
export const GET_CITY_LIST_FAILURE = 'GET_CITY_LIST_FAILURE';

export const GET_USER_TYPE_LIST = 'GET_USER_TYPE_LIST';
export const GET_USER_TYPE_LIST_SUCCESS = 'GET_USER_TYPE_LIST_SUCCESS';
export const GET_USER_TYPE_LIST_FAILURE = 'GET_USER_TYPE_LIST_FAILURE';

export const GET_ROLE_LIST = 'GET_ROLE_LIST';
export const GET_ROLE_LIST_SUCCESS = 'GET_ROLE_LIST_SUCCESS';
export const GET_ROLE_LIST_FAILURE = 'GET_ROLE_LIST_FAILURE';

export const GET_OFFICE_LIST = 'GET_OFFICE_LIST';
export const GET_OFFICE_LIST_SUCCESS = 'GET_OFFICE_LIST_SUCCESS';
export const GET_OFFICE_LIST_FAILURE = 'GET_OFFICE_LIST_FAILURE';

export const GET_DEPARTMENT_LIST = 'GET_DEPARTMENT_LIST';
export const GET_DEPARTMENT_LIST_SUCCESS = 'GET_DEPARTMENT_LIST_SUCCESS';
export const GET_DEPARTMENT_LIST_FAILURE = 'GET_DEPARTMENT_LIST_FAILURE';