import {  call, put } from 'redux-saga/effects';

import API from '../../api/InventoryManagement';
import { apiPostCall, apiPutCall } from '../../util/http';
import * as action from '../../actions/InventoryManagement';

// POST METHODS

const postSaveConfigFieldsRequest = payload => {
    const { authToken, data } = payload && payload.data;
    const { configurationId } = data;
    let response = null;
    if(configurationId) {
        const url = `${API.POST_SAVE_CONFIG_FIELDS}/${configurationId}`;
        response = apiPutCall(url, authToken, { ...data });
        return response;
    } else {
        const url = API.POST_SAVE_CONFIG_FIELDS;
        response = apiPostCall(url, authToken, { ...data });
        return response;
    }
}
   
export function* postSaveConfigFieldsSaga(payload) {
    const actionType = action.POST_SAVE_CONFIG_FIELDS;
    if(payload) {
        try {
            const result = yield call(postSaveConfigFieldsRequest, payload);
            yield put({ type: `${actionType}_SUCCESS`, result });
        } catch (error) {
            yield put({ type: `${actionType}_FAILURE`, error });
        }
    } 
}