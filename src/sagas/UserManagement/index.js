import { all, fork, takeLatest } from 'redux-saga/effects';

import * as action from '../../actions/Types/UserManagement';

import { getUserListSaga, getBulkImportListSaga, postAddUserSaga, getUserDataSaga, postBulkImportSaga, postLoginSaga, 
    postRegisterUserSaga, postResendActivationSaga, postDeleteUSerSaga, postChangePasswordSaga, postForgotPasswordSaga, postResetPasswordSaga,
    postEditProfileSaga, postAssociateGeneralInfoSaga, postAssociateDocumentUploadSaga, postAdminAdditionalInfoSaga, postAdminRejectAssociateSaga } from './userManagement';
import { getCustomerListSaga } from './customerManagement';

function* watcherSaga() {

    // GET METHODS
    yield takeLatest(action.GET_USER_LIST, getUserListSaga);
    yield takeLatest(action.GET_USER_DATA, getUserDataSaga);

    yield takeLatest(action.GET_BULKIMPORT_LIST, getBulkImportListSaga);
    yield takeLatest(action.GET_CUSTOMER_LIST, getCustomerListSaga);

    // POST METHODS
    yield takeLatest(action.POST_ADD_USER, postAddUserSaga);
    yield takeLatest(action.POST_ADD_BULK_IMPORT, postBulkImportSaga);
    yield takeLatest(action.POST_LOGIN_DATA, postLoginSaga);
    yield takeLatest(action.POST_REGISTER_USER, postRegisterUserSaga);
    yield takeLatest(action.POST_RESEND_ACTIVATION_EMAIL, postResendActivationSaga);

    yield takeLatest(action.POST_DELETE_USER, postDeleteUSerSaga);
    yield takeLatest(action.POST_CHANGE_PASSWORD, postChangePasswordSaga);
    yield takeLatest(action.POST_FORGOT_PASSWORD, postForgotPasswordSaga);
    yield takeLatest(action.POST_RESET_PASSWORD, postResetPasswordSaga);
    yield takeLatest(action.POST_EDIT_PROFILE, postEditProfileSaga);
    yield takeLatest(action.POST_ASSOCIATE_GENERAL_INFO, postAssociateGeneralInfoSaga);
    yield takeLatest(action.POST_ASSOCIATE_DOCUMENT_UPLOAD, postAssociateDocumentUploadSaga);
    yield takeLatest(action.POST_ADMIN_ADDITIONAL_INFO, postAdminAdditionalInfoSaga);
    yield takeLatest(action.POST_ADMIN_REJECT_ASSOCIATE, postAdminRejectAssociateSaga);
}

export default function* rootSaga() {
    yield all([
        fork(watcherSaga),
    ]);
}