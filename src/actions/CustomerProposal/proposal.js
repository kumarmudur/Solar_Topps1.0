import * as action from '../Types/CustomerProposal';

// GET METHODS
export const getProposalList = payload => ({
    type: action.GET_PROPOSAL_LIST,
    payload
});

export const getProposalListSuccess = response => ({
    type: action.GET_PROPOSAL_LIST_SUCCESS,
    payload: response.data
});

export const getProposalListFailure = error => ({
    type: action.GET_PROPOSAL_LIST_FAILURE,
    payload: error
});