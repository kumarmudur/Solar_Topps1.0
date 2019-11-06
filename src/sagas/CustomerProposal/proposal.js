import {  call, put } from 'redux-saga/effects';

import API from '../../api/CustomerProposal';
import {  apiGetCall } from '../../util/http';

import { getProposalListSuccess, getProposalListFailure } from '../../actions/CustomerProposal/proposal';

// GET METHODS

const getProposalListRequest = async (payload) => {
    const { authToken, pageNumber, pageSize } = payload;
    const url = `${API.GET_PROPOSAL_LIST}`;
    let result = apiGetCall(url, authToken);
    return result;
}

export function* getProposalListSaga({ payload }) {
    try {
        const response = yield call(getProposalListRequest, payload);
        yield put(getProposalListSuccess(response));
    } catch (error) {
        yield put(getProposalListFailure(error));
    }
}