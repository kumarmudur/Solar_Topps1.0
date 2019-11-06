import {  call, put } from 'redux-saga/effects';
import API from '../../api/InventoryManagement';
import { apiGetCall, apiPutCall, apiPostCall } from '../../util/http';
import * as action from '../../actions/InventoryManagement'; 

// GET METHODS
const getWarehouseListReuest = payload => {
   const { authToken } = payload && payload.data;
   const url = `${API.GET_WAREHOUSE_LIST}`;
   let response = apiGetCall(url, authToken);
   return response;
}

export function* getWarehouseListSaga(payload) {
    const actionType = action.GET_WAREHOUSE_LIST;
   try {
       const result = yield call(getWarehouseListReuest, payload);
       yield put({ type: `${actionType}_SUCCESS`, result });
   } catch (error) {
      yield put({ type: `${actionType}_FAILURE`, error });
   }
}

const getWarehouseDataRequest = payload => {
    let { id, authToken } = payload && payload.data;
    const url = `${API.GET_WAREHOUSE_LIST}/${id}`;
    let response = apiGetCall(url, authToken);
    return response;
 }
 
 export function* getWarehouseDataSaga(payload) {
    const actionType = action.GET_WAREHOUSE_DATA;
    if(payload) {
        try {
            const result = yield call(getWarehouseDataRequest, payload);
            yield put({ type: `${actionType}_SUCCESS`, result });
        } catch (error) {
            yield put({ type: `${actionType}_FAILURE`, error });

        }
    }
 }

// POST METHODS

const postSaveWarehouseRequest = payload => {
    const { authToken, data } = payload && payload.data;
    const { warehouseId } = data;
    let response = null;
    if(warehouseId) {
        const url = `${API.POST_SAVE_WAREHOUSE}/${warehouseId}`;
        response = apiPutCall(url, authToken, { ...data });
        return response;
    } else {
        const url = API.POST_SAVE_WAREHOUSE;
        response = apiPostCall(url, authToken, { ...data });
        return response;
    }
}
   
export function* postSaveWarehouseSaga(payload) {
    const actionType = action.POST_SAVE_WAREHOUSE;
    if(payload) {
        try {
            const result = yield call(postSaveWarehouseRequest, payload);
            yield put({ type: `${actionType}_SUCCESS`, result });
        } catch (error) {
            yield put({ type: `${actionType}_FAILURE`, error });
        }
    } 
}

const postDeleteWarehouseRequest = payload => {
    const { authToken, ids } = payload && payload.data;
    let result = null;
    const url = API.POST_DELETE_WAREHOUSE;
    result = apiPostCall(url, authToken, ids);
    return result;
}
   
export function* postDeleteWarehouseSaga(payload) {
    const actionType = action.POST_DELETE_WAREHOUSE;
    try {
        const result = yield call(postDeleteWarehouseRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });

    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}