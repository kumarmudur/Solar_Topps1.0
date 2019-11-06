import {  call, put } from 'redux-saga/effects';

import API from '../../api/PurchasePlan';
import {  apiGetCall, apiPutCall, apiPostCall } from '../../util/http';
import * as action from '../../actions/PurchasePlan';

// GET METHODS

const getPurchasePlanListRequest = payload => {
    const { authToken, pageNumber, pageSize } = payload && payload.data;
    //const url = `${API.GET_PURCHASE_PLAN_LIST}?page=${pageNumber}&size=${pageSize}`;
    const url = `${API.GET_PURCHASE_PLAN_LIST}`;

    let response = apiGetCall(url, authToken);
    return response;
}

export function* getPurchasePlanListSaga(payload) {
    const actionType = action.GET_PURCHASE_PLAN_LIST;
    try {
        const result = yield call(getPurchasePlanListRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getStaticDataPurchasePlanRequest = payload => {
    const { authToken } = payload && payload.data;
    const url = API.GET_STATIC_DATA_PURCHASE_PLAN;
    let response = apiGetCall(url, authToken);
    return response;
}

export function* getStaticDataPurchasePlanSaga(payload) {
    const actionType = action.GET_STATIC_DATA_PURCHASE_PLAN;
    try {
        const result = yield call(getStaticDataPurchasePlanRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getPurchasePlanDataRequest = payload => {
    const { authToken, id } = payload && payload.data;
    const url = `${API.GET_PURCHASE_PLAN_LIST}/${id}`;
    let response = apiGetCall(url, authToken);
    return response;
}

export function* getPurchasePlanDataSaga(payload) {
    const actionType = action.GET_PURCHASE_PLAN_DATA;
    try {
        const result = yield call(getPurchasePlanDataRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

// POST METHODS

const postSavePurchasePlanRequest = payload => {
    const { authToken, data } = payload && payload.data;
    const { purchasePlanId } = data;
    let result = null;
    if(purchasePlanId) {
        const url = `${API.GET_PURCHASE_PLAN_LIST}/${purchasePlanId}`;
        result = apiPutCall(url, authToken, { ...data });
        return result;
    } else {
        const url = API.GET_PURCHASE_PLAN_LIST;
        result = apiPostCall(url, authToken, { ...data });
        return result;
    }
}
   
export function* postSavePurchasePlanSaga(payload) {
    const actionType = action.POST_SAVE_PURCHASE_PLAN;
    if(payload) {
        try {
            const result = yield call(postSavePurchasePlanRequest, payload);
            yield put({ type: `${actionType}_SUCCESS`, result });
        } catch (error) {
            yield put({ type: `${actionType}_FAILURE`, error });
        }
    }
}

const postDeletePurchasePlanRequest = payload => {
    const { authToken, ids } = payload && payload.data;
    let result = null;
    const url = API.POST_DELETE_PURCHASE_PLAN;
    result = apiPostCall(url, authToken, ids);
    return result;
}
   
export function* postDeletePurchasePlanSaga(payload) {
    const actionType = action.POST_DELETE_PURCHASE_PLAN;
    try {
        const result = yield call(postDeletePurchasePlanRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });

    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}