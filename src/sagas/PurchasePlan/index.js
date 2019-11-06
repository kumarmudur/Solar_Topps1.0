import { all, fork, takeLatest } from 'redux-saga/effects';

import * as action from '../../actions/PurchasePlan';

import { getPurchasePlanListSaga, getStaticDataPurchasePlanSaga, getPurchasePlanDataSaga, postSavePurchasePlanSaga, postDeletePurchasePlanSaga } from './purchasePlan';



function* watcherSaga() {

    // GET METHODS
    yield takeLatest(action.GET_PURCHASE_PLAN_LIST, getPurchasePlanListSaga); 
    yield takeLatest(action.GET_STATIC_DATA_PURCHASE_PLAN, getStaticDataPurchasePlanSaga);
    yield takeLatest(action.GET_PURCHASE_PLAN_DATA, getPurchasePlanDataSaga);


    // POST METHODS
    yield takeLatest(action.POST_SAVE_PURCHASE_PLAN, postSavePurchasePlanSaga);
    yield takeLatest(action.POST_DELETE_PURCHASE_PLAN, postDeletePurchasePlanSaga);
}

export default function* rootSaga() {
    yield all([
        fork(watcherSaga)
    ]);
}