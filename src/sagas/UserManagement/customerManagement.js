import { call, put } from 'redux-saga/effects';

import API from '../../api/UserManagement';
import { apiGetCall } from '../../util/http';

import { getCustomerListSuccess, getCustomerListFailure } from '../../actions/UserManagement/userManagement';

const getCustomerListRequest = async (payload) => {
    const { authToken } = payload;
    const url = `${API.GET_CUSTOMER_LIST}`;
    let result = apiGetCall(url, authToken);
    return result;
}

export function* getCustomerListSaga({ payload }) {
    try {
        const response = yield call(getCustomerListRequest, payload);
        yield put(getCustomerListSuccess(response));
    } catch (error) {
        yield put(getCustomerListFailure(error));
    }
}

