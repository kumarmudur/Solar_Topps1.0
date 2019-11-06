import {  call, put } from 'redux-saga/effects';

import API from '../../api/InventoryManagement';
import { apiGetCall, apiPostCall, apiPutCall, apiPostCallFileUpload } from '../../util/http';
import * as action from '../../actions/InventoryManagement';

// GET METHODS

const getProductListRequest = payload => {
    const { authToken, pageNumber, pageSize } = payload && payload.data;
    //const url = `${API.GET_PRODUCT_LIST}?page=${pageNumber}&size=${pageSize}`;
    const url = `${API.GET_PRODUCT_LIST}`;

    let response = apiGetCall(url, authToken);
    return response;
}

export function* getProductListSaga(payload) {
    const actionType = action.GET_PRODUCT_LIST;
    try {
        const result = yield call(getProductListRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getStaticDataProductRequest = payload => {
    const { authToken } = payload && payload.data;
    const url = `${API.GET_STATIC_DATA_PRODUCT}`;
    let response = apiGetCall(url, authToken);
    return response;
}

export function* getStaticDataProductSaga(payload) {
    const actionType = action.GET_STATIC_DATA_PRODUCT;
    try {
        const result = yield call(getStaticDataProductRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getProductDataRequest = payload => {
    const { authToken, id } = payload && payload.data;
    const url = `${API.GET_PRODUCT_LIST}/${id}`;
    let response = apiGetCall(url, authToken);
    return response;
}

export function* getProductDataSaga(payload) {
    const actionType = action.GET_PRODUCT_DATA;
    try {
        const result = yield call(getProductDataRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
        const { data } = result;
        if(data  && data.product  && data.product.productAssemblyModule && data.product.productAssemblyModule.productId) {
            yield call(getModuleMappingDataSaga, { data: 
                { id:  data.product.productAssemblyModule.productId,
                authToken:  payload.data && payload.data.authToken } 
            });
        }

    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getConfigListRequest = payload => {
    const { authToken } = payload && payload.data;
    const url = `${API.CONFIG_FIELD_LIST}`;
    let response = apiGetCall(url, authToken);
    return response;
}

export function* getConfigListSaga(payload) {
    const actionType = action.GET_CONFIG_FIELDS_LIST;
    try {
        const result = yield call(getConfigListRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
       yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getModuleListRequest = payload => {
    const { authToken } = payload && payload.data;
    const url = `${API.GET_MODULE_LIST}`;
    let response = apiGetCall(url, authToken);
    return response;
}

export function* getModuleListSaga(payload) {
    const actionType = action.GET_MODULE_LIST;
    try {
        const result = yield call(getModuleListRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getModuleMappingDataRequest = payload => {
    const { authToken, id } = payload && payload.data;
    const url = `${API.GET_MODULE_MAPPING_DATA}/${id}`;
    let response = apiGetCall(url, authToken);
    return response;
}

export function* getModuleMappingDataSaga(payload) {
    const actionType = action.GET_MODULE_MAPPING_DATA;
    try {
        const result = yield call(getModuleMappingDataRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getProductModuleMappingRequest = payload => {
    const { authToken, id } = payload && payload.data;
    const url = `${API.GET_MODULE_MAPPING}/${id}`;
    let response = apiGetCall(url, authToken);
    return response;
}

export function* getProductModuleMappingSaga(payload) {
    const actionType = action.GET_PRODUCT_MODULE_MAPPING;
    try {
        const result = yield call(getProductModuleMappingRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getInverterListRequest = payload => {
    const { authToken } = payload && payload.data;
    const url = `${API.GET_INVERTER_LIST}`;
    let response = apiGetCall(url, authToken);
    return response;
}

export function* getInverterListSaga(payload) {
    const actionType = action.GET_INVERTER_LIST;
    try {
        const result = yield call(getInverterListRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getOptimizerRequest = payload => {
    const { authToken } = payload && payload.data;
    const url = `${API.GET_OPTIMIZER_LIST}`;
    let response = apiGetCall(url, authToken);
    return response;
}

export function* getOptimizerListSaga(payload) {
    const actionType = action.GET_OPTIMIZER_LIST;
    try {
        const result = yield call(getOptimizerRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const getProductPartListRequest = payload => {
    const { authToken } = payload && payload.data;
    const url = `${API.GET_PRODUCT_PART_LIST}`;
    let response = apiGetCall(url, authToken);
    return response;
}

export function* getProductPartListSaga(payload) {
    const actionType = action.GET_PRODUCT_PART_LIST;
    try {
        const result = yield call(getProductPartListRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

// POST METHODS

const postImageUploadRequest = async payload => {
    const { authToken, file } = payload && payload.data;;
    let formData = new FormData();
    formData.append('file', file);
    const url = `${API.POST_PRODUCT_IMAGE_UPLOAD}`;
    let result = apiPostCallFileUpload(url, authToken, formData);
    return result;
}

export function* postImageUploadSaga(payload) {
    const actionType = action.POST_PRODUCT_IMAGE_UPLOAD;

    try {
        const result = yield call(postImageUploadRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const postSaveProductRequest = payload => {
    const { authToken, data } = payload && payload.data;
    const { productId } = data;
    let response = null;
    if(productId) {
        const url = `${API.POST_SAVE_PRODUCT}/${productId}`;
        response = apiPutCall(url, authToken, { ...data });
        return response;
    } else {
        const url = API.POST_SAVE_PRODUCT;
        response = apiPostCall(url, authToken, { ...data });
        return response;
    }
}
   
export function* postSaveProductSaga(payload) {
    const actionType = action.POST_SAVE_PRODUCT;
    if(payload) {
        try {
            const result = yield call(postSaveProductRequest, payload);
            yield put({ type: `${actionType}_SUCCESS`, result });
        } catch (error) {
            yield put({ type: `${actionType}_FAILURE`, error });
        }
    } 
}

const postDeleteProductRequest = payload => {
    const { authToken, ids } = payload && payload.data;
    let response = null;
    const url = API.POST_DELETE_PRODUCT;
    response = apiPostCall(url, authToken, ids);
    return response;
}
   
export function* postDeleteProductSaga(payload) {
    const actionType = action.POST_DELETE_PRODUCT;
    try {
        const result = yield call(postDeleteProductRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });

    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

const postSaveMappingRequest = payload => {
    const { authToken, data } = payload && payload.data;
    let response = null;
    const url = API.POST_SAVE_MAPPING;
    response = apiPostCall(url, authToken, { ...data });
    return response;
}
   
export function* postSaveMappingSaga(payload) {
    const actionType = action.POST_SAVE_MAPPING;
    try {
        const result = yield call(postSaveMappingRequest, payload);
        yield put({ type: `${actionType}_SUCCESS`, result });

    } catch (error) {
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}

