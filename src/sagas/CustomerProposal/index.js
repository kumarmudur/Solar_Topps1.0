import { all, fork, takeLatest } from 'redux-saga/effects';

import * as action from '../../actions/Types/CustomerProposal';

import { getProposalListSaga } from './proposal';



function* watcherSaga() {

    // GET METHODS
    yield takeLatest(action.GET_PROPOSAL_LIST, getProposalListSaga); 


    // POST METHODS

}

export default function* rootSaga() {
    yield all([
        fork(watcherSaga)
    ]);
}