//import {  GET_USER_LIST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAILURE } from './types';
import * as action from '../Types/UserManagement';

// get User list actions
export const getUserList = payload => ({
    type: action.GET_USER_LIST,
    payload
});

export const getUserListSuccess = response => ({
    type: action.GET_USER_LIST_SUCCESS,
    result: response.data
});

export const getUserListFailure = error => ({
    type: action.GET_USER_LIST_FAILURE,
    error
});

// get User data actions
export const getUserData = payload => ({
    type: action.GET_USER_DATA,
    payload
});

export const getUserDataSuccess = response => ({
    type: action.GET_USER_DATA_SUCCESS,
    result: response.data
});

export const getUserDataFailure = error => ({
    type: action.GET_USER_DATA_FAILURE,
    error
});

// get Customer list actions
export const getCustomerList = payload => ({
    type: action.GET_CUSTOMER_LIST,
    payload
});

export const getCustomerListSuccess = response => ({
    type: action.GET_CUSTOMER_LIST_SUCCESS,
    payload: response.data
});

export const getCustomerListFailure = error => ({
    type: action.GET_CUSTOMER_LIST_FAILURE,
    payload: error
});

export const getBulkImportList = payload => ({
    type: action.GET_BULKIMPORT_LIST,
    payload
});

export const getBulkImportListSuccess = response => ({
    type: action.GET_BULKIMPORT_LIST_SUCCESS,
    payload: response.data
});

export const getBulkImportListFailure = error => ({
    type: action.GET_BULKIMPORT_LIST_FAILURE,
    payload: error
});


// POST METHODS

// Login actions
export const postLogin = payload => ({
    type: action.POST_LOGIN_DATA,
    payload
});

export const postLoginSuccess = response => ({
    type: action.POST_LOGIN_DATA_SUCCESS,
    result: response.data
});

export const postLoginFailure = error => ({
    type: action.POST_LOGIN_DATA_FAILURE,
    error 
});

// Register actions
export const postRegister = payload => ({
    type: action.POST_REGISTER_USER,
    payload
});

export const postRegisterSuccess = response => ({
    type: action.POST_REGISTER_USER_SUCCESS,
    result: response.data
});

export const postRegisterFailure = error => ({
    type: action.POST_REGISTER_USER_FAILURE,
    error 
});

// Re-send Activation email actions
export const postResendActivationEmail = payload => ({
    type: action.POST_RESEND_ACTIVATION_EMAIL,
    payload
});

export const postResendActivationEmailSuccess = response => ({
    type: action.POST_RESEND_ACTIVATION_EMAIL_SUCCESS,
    result: response.data
});

export const postResendActivationEmailFailure = error => ({
    type: action.POST_RESEND_ACTIVATION_EMAIL_FAILURE,
    error 
});

// Change Password
export const postChangePassword = payload => ({
    type: action.POST_CHANGE_PASSWORD,
    payload
});

export const postChangePasswordSuccess = response => ({
    type: action.POST_CHANGE_PASSWORD_SUCCESS,
    result: response.data
});

export const postChangePasswordFailure = error => ({
    type: action.POST_CHANGE_PASSWORD_FAILURE,
    error 
});

// Forgot Password
export const postForgotPassword = payload => ({
    type: action.POST_FORGOT_PASSWORD,
    payload
});

export const postForgotPasswordSuccess = response => ({
    type: action.POST_FORGOT_PASSWORD_SUCCESS,
    result: response.data
});

export const postForgotPasswordFailure = error => ({
    type: action.POST_FORGOT_PASSWORD_FAILURE,
    error 
});


// Reset Password
export const postResetPassword = payload => ({
    type: action.POST_RESET_PASSWORD,
    payload
});

export const postResetPasswordSuccess = response => ({
    type: action.POST_RESET_PASSWORD_SUCCESS,
    result: response.data
});

export const postResetPasswordFailure = error => ({
    type: action.POST_RESET_PASSWORD_FAILURE,
    error 
});

// User edit profile
export const postEditProfile = payload => ({
    type: action.POST_EDIT_PROFILE,
    payload
});

export const postEditProfileSuccess = response => ({
    type: action.POST_EDIT_PROFILE_SUCCESS,
    result: response.data
});

export const postEditProfileFailure = error => ({
    type: action.POST_EDIT_PROFILE_FAILURE,
    error 
});


// Associate General Info
export const postAssociateGeneralInfo = payload => ({
    type: action.POST_ASSOCIATE_GENERAL_INFO,
    payload
});

export const postAssociateGeneralInfoSuccess = response => ({
    type: action.POST_ASSOCIATE_GENERAL_INFO_SUCCESS,
    result: response.data
});

export const postAssociateGeneralInfoFailure = error => ({
    type: action.POST_ASSOCIATE_GENERAL_INFO_FAILURE,
    error 
});

// Add user actions
export const postAddUser = payload => ({
    type: action.POST_ADD_USER,
    payload
});

export const postAddUserSuccess = response => ({
    type: action.POST_ADD_USER_SUCCESS,
    result: response.data
});

export const postAddUserFailure = error => ({
    type: action.POST_ADD_USER_FAILURE,
    error 
});

export const postDeleteUser = payload => ({
    type: action.POST_DELETE_USER,
    payload
});

export const postDeleteUserSuccess = response => ({
    type: action.POST_DELETE_USER_SUCCESS,
    result: response.data
});

export const postDeleteUserFailure = error => ({
    type: action.POST_DELETE_USER_FAILURE,
    error 
});

// Bulk import actions
export const postBulkImport = payload => ({
    type: action.POST_ADD_BULK_IMPORT,
    payload
});

export const postBulkImportSuccess = response => ({
    type: action.POST_ADD_BULK_IMPORT_SUCCESS,
    result: response.data
});

export const postBulkImportFailure = error => ({
    type: action.POST_ADD_BULK_IMPORT_FAILURE,
    error 
});

// Associate Document upload
export const postAssociateDocumentUpload = payload => ({
    type: action.POST_ASSOCIATE_DOCUMENT_UPLOAD,
    payload
});

export const postAssociateDocumentUploadSuccess = response => ({
    type: action.POST_ASSOCIATE_DOCUMENT_UPLOAD_SUCCESS,
    result: response.data
});

export const postAssociateDocumentUploadFailure = error => ({
    type: action.POST_ASSOCIATE_DOCUMENT_UPLOAD_FAILURE,
    error 
});


// Associate Admin Additional Document Request
export const postAdminAdditionalInfo = payload => ({
    type: action.POST_ADMIN_ADDITIONAL_INFO,
    payload
});

export const postAdminAdditionalInfoSuccess = response => ({
    type: action.POST_ADMIN_ADDITIONAL_INFO_SUCCESS,
    result: response.data
});

export const postAdminAdditionalInfoFailure = error => ({
    type: action.POST_ADMIN_ADDITIONAL_INFO_FAILURE,
    error 
});

// Associate Admin Reject Request
export const postAdminRejectAssociate = payload => ({
    type: action.POST_ADMIN_REJECT_ASSOCIATE,
    payload
});

export const postAdminRejectAssociateSuccess = response => ({
    type: action.POST_ADMIN_REJECT_ASSOCIATE_SUCCESS,
    result: response.data
});

export const postAdminRejectAssociateFailure = error => ({
    type: action.POST_ADMIN_REJECT_ASSOCIATE_FAILURE,
    error 
});


