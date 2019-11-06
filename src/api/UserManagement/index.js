import { API_HOST_BASE } from '../../constants/constants';

const API_HOST = `${API_HOST_BASE}/api/auth/v1`;

const API = {
    // GET METHODS
    GET_USER_LIST: `${API_HOST}/users`,
    GET_USER_DATA: `${API_HOST}/users`,
    GET_BULKIMPORT_LIST: `${API_HOST}/import/users`,
    GET_CUSTOMER_LIST: `${API_HOST}/customers`,

    // POST METHODS
    LOGIN: `${API_HOST}/login`,
    REGISTER: `${API_HOST}/register`,
    POST_ADD_USER: `${API_HOST}/register`,
    EDIT_USER: `${API_HOST}/users`,
    BULK_IMPORT: `${API_HOST}/import/users`,
    RESEND_ACTIVATION_EMAIL: `${API_HOST}/send/email`,
    DELETE_USER: `${API_HOST}/delete/users`,
    CHANGE_PASSWORD: `${API_HOST}/password/change`,
    FORGOT_RESET_PASSWORD_ACTIONS: `${API_HOST}/password/forgot`,
    ASSOCIATE_GENERAL_INFO: `${API_HOST}/register/associate`,
    ASSOCIATE_DOCUMENT_UPLOAD: `${API_HOST}/register/upload`,
    ASSOCIATE_DOCUMENT_UPLOAD_DATA: `${API_HOST}/register/documents`,
    ADMIN_ASSOCIATE_REGISTRATION_ACTIONS: `${API_HOST}/register/userDetails`
};

export default API;