import {  call, put } from 'redux-saga/effects';

import API from '../../api/InventoryManagement';
import {  apiGetCall, apiPutCall, apiPostCall } from '../../util/http';
import * as action from '../../actions/InventoryManagement';

// GET METHODS

const getSupplierListRequest = payload => {
    const { authToken, pageNumber, pageSize } = payload && payload.data;
    //const url = `${API.GET_SUPPLIER_LIST}?page=${pageNumber}&size=${pageSize}`;
    const url = `${API.GET_SUPPLIER_LIST}`;

    let response = apiGetCall(url, authToken);
    return response;
}

export function* getSupplierListSaga(payload) {
    const actionType = action.GET_SUPPLIER_LIST;
    try {
        const result = yield call(getSupplierListRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getSupplierDataRequest = payload => {
    let { id, authToken } = payload && payload.data;
    const url = `${API.GET_SUPPLIER_LIST}/${id}`;
    let result = apiGetCall(url, authToken);
    return result;
 }
 
 export function* getSupplierDataSaga(payload) {
    const actionType = action.GET_SUPPLIER_DATA;
    if(payload) {
        try {
            const result = yield call(getSupplierDataRequest, payload);
            yield put({ type: `${actionType}_SUCCESS`, result });
        } catch (error) {
            yield put({ type: `${actionType}_FAILURE`, error });
        }
    }
 }

 // POST METHODS

const postSaveSupplierRequest = payload => {
    const { authToken, data } = payload && payload.data;
    const { supplierId } = data;
    let result = null;
    if(supplierId) {
        const url = `${API.POST_SAVE_SUPPLIER}/${supplierId}`;
        result = apiPutCall(url, authToken, { ...data });
        return result;
    } else {
        const url = API.POST_SAVE_SUPPLIER;
        result = apiPostCall(url, authToken, { ...data });
        return result;
    }
}
   
export function* postSaveSupplierSaga(payload) {
    const actionType = action.POST_SAVE_SUPPLIER;
    if(payload) {
        try {
            const result = yield call(postSaveSupplierRequest, payload);
            yield put({ type: `${actionType}_SUCCESS`, result });
        } catch (error) {
            yield put({ type: `${actionType}_FAILURE`, error });
        }
    }
}

const postDeleteSupplierRequest = payload => {
    const { authToken, ids } = payload && payload.data;
    let result = null;
    const url = API.POST_DELETE_SUPPLIER;
    result = apiPostCall(url, authToken, ids);
    return result;
}
   
export function* postDeleteSupplierSaga(payload) {
    const actionType = action.POST_DELETE_SUPPLIER;
    try {
        const result = yield call(postDeleteSupplierRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });

    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}