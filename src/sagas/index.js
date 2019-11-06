/**
 * Root Sagas
 */
import { all } from 'redux-saga/effects';

// sagas
import authSagas from './Auth';
import emailSagas from './Email';
import todoSagas from './Todo';
import feedbacksSagas from './Feedbacks';
import userManagementSagas from './UserManagement';
import inventorySagas from './InventoryManagement';
import purchasePlanSagas from './PurchasePlan';
import proposalSagas from './CustomerProposal';
import commonSagas from './Common';

export default function* rootSaga() {
    yield all([
        authSagas(),
        emailSagas(),
        todoSagas(),
        feedbacksSagas(),
        userManagementSagas(),
        inventorySagas(),
        purchasePlanSagas(),
        proposalSagas(),
        commonSagas()
    ]);
}