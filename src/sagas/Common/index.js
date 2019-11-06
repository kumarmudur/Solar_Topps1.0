import { all, fork, takeLatest } from 'redux-saga/effects';

import * as action from '../../actions/Types/Common';

import { getCountryListSaga, getUserTypeListSaga, getRoleListSaga, getOfficeListSaga, getDepartmentListSaga } from './common';

function* watcherSaga() {

    // GET METHODS
    yield takeLatest(action.GET_COUNTRY_LIST, getCountryListSaga); 
    yield takeLatest(action.GET_USER_TYPE_LIST, getUserTypeListSaga); 

    yield takeLatest(action.GET_ROLE_LIST, getRoleListSaga);
    yield takeLatest(action.GET_OFFICE_LIST, getOfficeListSaga);
    yield takeLatest(action.GET_DEPARTMENT_LIST, getDepartmentListSaga);

    // POST METHODS

}

export default function* rootSaga() {
    yield all([
        fork(watcherSaga)
    ]);
}