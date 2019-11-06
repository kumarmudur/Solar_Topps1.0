import { call, put } from 'redux-saga/effects';

import API from '../../api/UserManagement';
import { apiGetCall, apiPostCall, apiPutCall, apiPostCallFileUpload, apiPostWithMultipleFiles } from '../../util/http';
import * as action from '../../actions/UserManagement/userManagement';

// GET METHODS

const getUserListRequest = async (payload) => {
    const { authToken } = payload;
    const url = `${API.GET_USER_LIST}`;
    let result = apiGetCall(url, authToken);
    return result;
}

const getBulkImportListRequest = async (payload) => {
    const { authToken, pageNumber, pageSize } = payload;
    const url = `${API.GET_BULKIMPORT_LIST}?page=${pageNumber}&size=${pageSize}`;
    let result = apiGetCall(url, authToken);
    return result;
}

const getUserDataRequest = async (payload) => {
    let { id, authToken } = payload;
    const url = `${API.GET_USER_DATA}/${id}`;
    let result = apiGetCall(url, authToken);
    return result;
}

export function* getUserListSaga({ payload }) {
    try {
        const response = yield call(getUserListRequest, payload);
        yield put(action.getUserListSuccess(response));
    } catch (error) {
        yield put(action.getUserListFailure(error));
    }
}

export function* getUserDataSaga({ payload }) {
    try {
        const response = yield call(getUserDataRequest, payload);
        yield put(action.getUserDataSuccess(response));
    } catch (error) {
        yield put(action.getUserDataFailure(error));
    }
}

export function* getBulkImportListSaga({ payload }) {
    try {
        const response = yield call(getBulkImportListRequest, payload);
        yield put(action.getBulkImportListSuccess(response));
    } catch (error) {
        yield put(action.getBulkImportListFailure(error));
    }
}

// POST METHODS

// Login
const postLoginRequest = async payload => {
    let result = null;
    const url = API.LOGIN;
    result = apiPostCall(url, '', { ...payload });
    return result;
   
}
   
export function* postLoginSaga({ payload }) {
    try {
        const response = yield call(postLoginRequest, payload);
        yield put(action.postLoginSuccess(response));
    } catch (error) {
        yield put(action.postLoginFailure(error));
    }
}

// Register
const postRegisterUserRequest = async payload => {
    let result = null;
    const url = API.REGISTER;
    result = apiPostCall(url, '', { ...payload });
    return result;
}
   
export function* postRegisterUserSaga({ payload }) {
    try {
        const response = yield call(postRegisterUserRequest, payload);
        yield put(action.postRegisterSuccess(response));
    } catch (error) {
        yield put(action.postRegisterFailure(error));
    }
}

// Resend User activation email
const postResendActivationRequest = async payload => {
    const { authToken, data } = payload;
    let result = null;
    const url = API.RESEND_ACTIVATION_EMAIL;
    result = apiPostCall(url, authToken, { ...data });
    return result;
}
   
export function* postResendActivationSaga({ payload }) {
    try {
        const response = yield call(postResendActivationRequest, payload);
        yield put(action.postResendActivationEmailSuccess(response));
    } catch (error) {
        yield put(action.postResendActivationEmailFailure(error));
    }
}

// Change Password
const postChangePasswordRequest = async payload => {
    const { authToken, data } = payload;
    let result = null;
    const url = API.CHANGE_PASSWORD;
    result = apiPostCall(url, authToken, { ...data });
    return result;
}
   
export function* postChangePasswordSaga({ payload }) {
    try {
        const response = yield call(postChangePasswordRequest, payload);
        yield put(action.postChangePasswordSuccess(response));
    } catch (error) {
        yield put(action.postChangePasswordFailure(error));
    }
}

// Forgot Password
const postForgotPasswordRequest = async payload => {
    let result = null;
    const url = API.FORGOT_RESET_PASSWORD_ACTIONS;
    result = apiPostCall(url, '', { ...payload });
    return result;
}
   
export function* postForgotPasswordSaga({ payload }) {
    try {
        const response = yield call(postForgotPasswordRequest, payload);
        yield put(action.postForgotPasswordSuccess(response));
    } catch (error) {
        yield put(action.postForgotPasswordFailure(error));
    }
}

// Reset Password
const postResetPasswordRequest = async payload => {
    let result = null;
    const url = API.FORGOT_RESET_PASSWORD_ACTIONS;
    result = apiPostCall(url, '', { ...payload });
    return result;
}
   
export function* postResetPasswordSaga({ payload }) {
    try {
        const response = yield call(postResetPasswordRequest, payload);
        yield put(action.postResetPasswordSuccess(response));
    } catch (error) {
        yield put(action.postResetPasswordFailure(error));
    }
}

// Edit Profile
const postEditProfileRequest = async payload => {
    let result = null;
    const { authToken, data } = payload;
    const url = API.EDIT_USER;
    result = apiPutCall(url, authToken, { ...data });
    return result;
}

export function* postEditProfileSaga({ payload }) {
    try {
        const response = yield call(postEditProfileRequest, payload);
        yield put(action.postEditProfileSuccess(response));
    } catch (error) {
        yield put(action.postEditProfileFailure(error));
    }
}

// Associate General info
const postAssociateGeneralInfoRequest = async payload => {
    let result = null;
    const { authToken, data } = payload;
    const url = API.ASSOCIATE_GENERAL_INFO;
    result = apiPostCall(url, authToken, { ...data });
    return result;
}

export function* postAssociateGeneralInfoSaga({ payload }) {
    try {
        const response = yield call(postAssociateGeneralInfoRequest, payload);
        yield put(action.postAssociateGeneralInfoSuccess(response));
    } catch (error) {
        yield put(action.postAssociateGeneralInfoFailure(error));
    }
}

// Add/Edit User
const postAddUserRequest = async payload => {
    const { authToken, data } = payload;
    const { registerId } = data;
    let result = null;
    if(registerId) {
        const url = API.EDIT_USER;
        result = apiPutCall(url, authToken, { ...data });
        return result;
    } else {
        const url = API.POST_ADD_USER;
        result = apiPostCall(url, authToken, { ...data });
        return result;
    }  
}

const postDeleteUSerRequest = payload => {
    const { authToken, ids } = payload;
    let result = null;
    const url = API.DELETE_USER;
    result = apiPostCall(url, authToken, { ids } );
    return result;
   
}
   
export function* postDeleteUSerSaga({ payload }) {
    try {
        const response = yield call(postDeleteUSerRequest, payload);
        yield put(action.postDeleteUserSuccess(response));
    } catch (error) {
        yield put(action.postDeleteUserFailure(error));
    }
}
   
export function* postAddUserSaga({ payload }) {
    try {
        const response = yield call(postAddUserRequest, payload);
        yield put(action.postAddUserSuccess(response));
    } catch (error) {
        yield put(action.postAddUserFailure(error));
    }
}

// Bulk Import
const postBulkImportRequest = async payload => {
    let result = null;
    const { importMode, data } = payload;
    let formData = new FormData();
    formData.append('file', data);
    formData.append('importMode', importMode);
    const url = `${API.BULK_IMPORT}`;
    result = apiPostCallFileUpload(url, '', formData);
    return result;
}
   
export function* postBulkImportSaga({ payload }) {
    try {
        const response = yield call(postBulkImportRequest, payload);
        yield put(action.postBulkImportSuccess(response));
    } catch (error) {
        yield put(action.postBulkImportFailure(error));
    }
}

// Associate Document Upload
const postAssociateDocumentUploadRequest = async payload => {
    let result = null;
    const { files, authToken, registerId } = payload;
    const urlDataObj = {
        registerDocPostUrl: `${API.ASSOCIATE_DOCUMENT_UPLOAD_DATA}`,
        filePostUrl: `${API.ASSOCIATE_DOCUMENT_UPLOAD}`,
        registerId,
        authToken
    }
    result = apiPostWithMultipleFiles(urlDataObj, '', files);
    return result;
}
   
export function* postAssociateDocumentUploadSaga({ payload }) {
    try {
        const response = yield call(postAssociateDocumentUploadRequest, payload);
        yield put(action.postAssociateDocumentUploadSuccess(response));
    } catch (error) {
        yield put(action.postAssociateDocumentUploadFailure(error));
    }
}

// Admin Additional info
const postAdminAdditionalInfoRequest = async payload => {
    let result = null;
    const { authToken, data } = payload;
    const url = API.ADMIN_ASSOCIATE_REGISTRATION_ACTIONS;
    result = apiPutCall(url, authToken, { ...data });
    return result;
}

export function* postAdminAdditionalInfoSaga({ payload }) {
    try {
        const response = yield call(postAdminAdditionalInfoRequest, payload);
        yield put(action.postAdminAdditionalInfoSuccess(response));
    } catch (error) {
        yield put(action.postAdminAdditionalInfoFailure(error));
    }
}

// Admin Reject User
const postAdminRejectAssociateRequest = async payload => {
    let result = null;
    const { authToken, data } = payload;
    const url = API.ADMIN_ASSOCIATE_REGISTRATION_ACTIONS;
    result = apiPutCall(url, authToken, { ...data });
    return result;
}

export function* postAdminRejectAssociateSaga({ payload }) {
    try {
        const response = yield call(postAdminRejectAssociateRequest, payload);
        yield put(action.postAdminRejectAssociateSuccess(response));
    } catch (error) {
        yield put(action.postAdminRejectAssociateFailure(error));
    }
}

