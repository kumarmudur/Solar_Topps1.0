import { API_HOST_BASE } from '../../constants/constants';

const API_HOST = `${API_HOST_BASE}/api/purchase/v1`;

const API = {
    // GET METHODS
    GET_PURCHASE_PLAN_LIST: `${API_HOST}/purchasePlans`,
    GET_STATIC_DATA_PURCHASE_PLAN : `${API_HOST}/staticData/general`,


    // POST METHODS
    POST_DELETE_PURCHASE_PLAN: `${API_HOST}/purchasePlans/all`
}

export default API;
