import * as actionTypes from '../../actions/Types/UserManagement';

// initial state
const INIT_STATE = {
    login: null,
    register: null,
    users: null,
    userData: null,
    imports: null,
    loading: false,
    submitUser: null,
    bulkImport: null,
    userActivation: null,
    error: null,
    deleteUser: null,
    changePassword: null,
    forgotPassword: null,
    resetPassword: null,
    editProfile: null,
    associateGeneralInfo: null,
    associateDocumentUpload: null,
    adminAdditionalInfo: null,
    adminRejectUser: null
}

export default (state = INIT_STATE, action) => {
    const { type, result, error } = action;
    switch(type) {

        //GET METHODS
        case actionTypes.GET_USER_LIST: 
          return { ...state, users: null }

        case actionTypes.GET_USER_LIST_SUCCESS:
          return { ...state, users: result }

        case actionTypes.GET_USER_LIST_FAILURE:
          return { ...state, error }

          case actionTypes.GET_USER_DATA: 
          return { ...state, userData: null }

        case actionTypes.GET_USER_DATA_SUCCESS:
          return { ...state, userData: result }

        case actionTypes.GET_USER_DATA_FAILURE:
          return { ...state, error }


        case actionTypes.GET_BULKIMPORT_LIST: 
          return { ...state, imports: null }

        case actionTypes.GET_BULKIMPORT_LIST_SUCCESS:
          return { ...state, imports: action.payload }

        case actionTypes.GET_BULKIMPORT_LIST_FAILURE:
          return { }


        // POST METHODS

        // Post Login
        case actionTypes.POST_LOGIN_DATA: 
          return { ...state, login: null }

        case actionTypes.POST_LOGIN_DATA_SUCCESS: 
          return { ...state, login: result }

        case actionTypes.POST_LOGIN_DATA_FAILURE: 
          return { ...state, login: error }

        // Post Register
        case actionTypes.POST_REGISTER_USER: 
          return { ...state, register: null }

        case actionTypes.POST_REGISTER_USER_SUCCESS: 
          return { ...state, register: result }

        case actionTypes.POST_REGISTER_USER_FAILURE: 
          return { ...state, register: error }
          
        // Post Re-Send User Activation email
        case actionTypes.POST_RESEND_ACTIVATION_EMAIL: 
          return { ...state, userActivation: null }

        case actionTypes.POST_RESEND_ACTIVATION_EMAIL_SUCCESS: 
          return { ...state, userActivation: result }

        case actionTypes.POST_RESEND_ACTIVATION_EMAIL_FAILURE: 
          return { ...state, userActivation: error }  

        // Post Change Password
        case actionTypes.POST_CHANGE_PASSWORD: 
          return { ...state, changePassword: null }

        case actionTypes.POST_CHANGE_PASSWORD_SUCCESS: 
          return { ...state, changePassword: result }

        case actionTypes.POST_CHANGE_PASSWORD_FAILURE: 
          return { ...state, changePassword: error }
          
        // Post Forgot Password
        case actionTypes.POST_FORGOT_PASSWORD: 
          return { ...state, forgotPassword: null }

        case actionTypes.POST_FORGOT_PASSWORD_SUCCESS: 
          return { ...state, forgotPassword: result }

        case actionTypes.POST_FORGOT_PASSWORD_FAILURE: 
          return { ...state, forgotPassword: error }
          
        // Post Reset Password
        case actionTypes.POST_RESET_PASSWORD: 
          return { ...state, resetPassword: null }

        case actionTypes.POST_RESET_PASSWORD_SUCCESS: 
          return { ...state, resetPassword: result }

        case actionTypes.POST_RESET_PASSWORD_FAILURE: 
          return { ...state, resetPassword: error }
          
        // Post Edit Profile
        case actionTypes.POST_EDIT_PROFILE: 
          return { ...state, editProfile: null }

        case actionTypes.POST_EDIT_PROFILE_SUCCESS: 
          return { ...state, editProfile: result }

        case actionTypes.POST_EDIT_PROFILE_FAILURE: 
          return { ...state, editProfile: error } 
          
        // Post Associate General Info
        case actionTypes.POST_ASSOCIATE_GENERAL_INFO: 
          return { ...state, associateGeneralInfo: null }

        case actionTypes.POST_ASSOCIATE_GENERAL_INFO_SUCCESS: 
          return { ...state, associateGeneralInfo: result }

        case actionTypes.POST_ASSOCIATE_GENERAL_INFO_FAILURE: 
          return { ...state, associateGeneralInfo: error }  

        // Post Add User
        case actionTypes.POST_ADD_USER: 
          return { ...state, submitUser: null }

        case actionTypes.POST_ADD_USER_SUCCESS: 
          return { ...state, submitUser: result }

        case actionTypes.POST_ADD_USER_FAILURE: 
          return { ...state, submitUser: error }

        // POST DELETE 
        case actionTypes.POST_DELETE_USER: 
          return { ...state, deleteUser: null }

        case actionTypes.POST_DELETE_USER_SUCCESS: 
          return { ...state, deleteUser: result }

        case actionTypes.POST_DELETE_USER_FAILURE: 
          return { ...state, deleteUser: error }


        // Post Bulk Import
        case actionTypes.POST_ADD_BULK_IMPORT: 
          return { ...state, bulkImport: null }

        case actionTypes.POST_ADD_BULK_IMPORT_SUCCESS: 
          return { ...state, bulkImport: result }

        case actionTypes.POST_ADD_BULK_IMPORT_FAILURE: 
          return { ...state, bulkImport: error }

        // Post Associate Document Upload
        case actionTypes.POST_ASSOCIATE_DOCUMENT_UPLOAD: 
          return { ...state, associateDocumentUpload: null }

        case actionTypes.POST_ASSOCIATE_DOCUMENT_UPLOAD_SUCCESS: 
          return { ...state, associateDocumentUpload: result }

        case actionTypes.POST_ASSOCIATE_DOCUMENT_UPLOAD_FAILURE: 
          return { ...state, associateDocumentUpload: error } 
          
        // Associate Admin Additional Document Request
        case actionTypes.POST_ADMIN_ADDITIONAL_INFO: 
          return { ...state, adminAdditionalInfo: null }

        case actionTypes.POST_ADMIN_ADDITIONAL_INFO_SUCCESS: 
          return { ...state, adminAdditionalInfo: result }

        case actionTypes.POST_ADMIN_ADDITIONAL_INFO_FAILURE: 
          return { ...state, adminAdditionalInfo: error }   

        // Associate Admin Reject Request 
        case actionTypes.POST_ADMIN_REJECT_ASSOCIATE: 
          return { ...state, adminRejectUser: null }

        case actionTypes.POST_ADMIN_REJECT_ASSOCIATE_SUCCESS: 
          return { ...state, adminRejectUser: result }

        case actionTypes.POST_ADMIN_REJECT_ASSOCIATE_FAILURE: 
          return { ...state, adminRejectUser: error } 
        
        default: return { ...state }
    }
}