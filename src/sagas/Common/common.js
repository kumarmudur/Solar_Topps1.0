import {  call, put } from 'redux-saga/effects';
import axios from 'axios';


import API from '../../api/Common';
import { apiGetCall } from '../../util/http';
import * as action from '../../actions/Common'

// import * as action from '../../actions/Common';
import { getCountryListSuccess, getCountryListFailure, getUserTypeListSuccess, getUserTypeListFailure,
    getRoleListSuccess, getRoleListFailure, getOfficeListSuccess, getOfficeListFailure, getDepartmentListSuccess, getDepartmentListFailure } from '../../actions/Common';

// GET METHODS

// To get Country list
const getCountryListRequest = async () => {
   const url = API.COUNTRY;
  const headerObj = {
    'Content-Type': 'application/json',
    'Accept' : 'text/plain, text/html',
    responseType:'application/jsonp',
    'Access-Control-Allow-Credentials' : true,
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET',
    'Access-Control-Allow-Headers':'application/json'
 }
  return await axios.get(url, { headerObj })
    .then(response => {
        if(response.status && response.status === 200) {
           return response.text;
        }
    })
    .catch(error => error);
}

export function* getCountryListSaga() {
    const actionType = action.GET_COUNTRY_LIST;
    try {
        const result = yield call(getCountryListRequest);
        yield put({ type: `${actionType}_SUCCESS`, result });
       // yield put(getCountryListSuccess(response));
    } catch (error) {
       // yield put(getCountryListFailure(error));
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

// To get userType list
const getUserTypeListRequest = async payload => {
    const { authToken } = payload;
    const url = API.USER_TYPE_LIST;
    let result = apiGetCall(url, authToken);
    return result;
}

export function* getUserTypeListSaga({ payload }) {
     try {
         const response = yield call(getUserTypeListRequest, payload);
         yield put(getUserTypeListSuccess(response));
     } catch (error) {
         yield put(getUserTypeListFailure(error));
     }
}

// To get Role list
const getRoleListRequest = async payload => {
    const { authToken } = payload;
    const url = API.ROLE_LIST;
    let result = apiGetCall(url, authToken);
    return result;
 }

 export function* getRoleListSaga({ payload }) {
     try {
         const response = yield call(getRoleListRequest, payload);
         yield put(getRoleListSuccess(response));
     } catch (error) {
         yield put(getRoleListFailure(error));
     }
}

// To get Office list
const getOfficeListRequest = async payload => {
    const { authToken } = payload;
    const url = API.OFFICE_LIST;
    let result = apiGetCall(url, authToken);
    return result;
}

export function* getOfficeListSaga({ payload }) {
     try {
         const response = yield call(getOfficeListRequest, payload);
         yield put(getOfficeListSuccess(response));
     } catch (error) {
         yield put(getOfficeListFailure(error));
     }
}

// To get Department list
const getDepartmentListRequest = async payload => {
    const { authToken, id } = payload;
    const url = `${API.DEPARTMENT_LIST}?officeId=${id}`;
    let result = apiGetCall(url, authToken);
    return result;
}

export function* getDepartmentListSaga({ payload }) {
     try {
         const response = yield call(getDepartmentListRequest, payload);
         yield put(getDepartmentListSuccess(response));
     } catch (error) {
         yield put(getDepartmentListFailure(error));
     }
}