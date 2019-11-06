import { API_HOST_BASE } from '../../constants/constants';
const API_LOCATION_HOST = 'https://geodata.solutions/restapi'; 

const API_HOST = `${API_HOST_BASE}/api/auth/v1`;


const API = {

    // GET METHODS
    LOCATION: API_LOCATION_HOST,
    COUNTRY: `${API_LOCATION_HOST}?country`,
    USER_TYPE_LIST: `${API_HOST}/mini/userTypes`,
    ROLE_LIST: `${API_HOST}/mini/roles`,
    OFFICE_LIST: `${API_HOST}/mini/offices`,
    DEPARTMENT_LIST: `${API_HOST}/mini/departments`
}

export default API;
