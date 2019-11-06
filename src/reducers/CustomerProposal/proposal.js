import * as actionTypes from '../../actions/Types/CustomerProposal';

// initial state
const INIT_STATE = {
    proposals: null,
    loading: false,
}

export default (state = INIT_STATE, action) => {
    const { type } = action;
    switch(type) {

        case actionTypes.GET_PROPOSAL_LIST: 
          return { ...state, proposals: null }

        case actionTypes.GET_PROPOSAL_LIST_SUCCESS:
          return { ...state, proposals: action.payload }

        case actionTypes.GET_PROPOSAL_LIST_FAILURE:
          return { }

        
        default: return { ...state }
    }
}