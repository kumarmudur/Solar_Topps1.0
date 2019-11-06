export const API_HOST_BASE = 'https://solartopps.us';
export const SUCCESS_MESSAGE = 'Success! Record has been saved successfully.';
export const DEACTIVE = 'Deactive';
export const DELETED = 'Deleted';

export const BULK_IMPORT = {
    FILE_UPLOAD_SIZE: 10971520,
    SAMPLE_FILE_DOWNLOAD_PATH: 'https://solartopps.info/docs/uploads/SampleBulkImport.csv'
}

export const USERS = {
    DECLINE_FORM_MSG: 'You haven\'t saved your changes. Are you sure you want to discard your changes?',
    TITLE: 'Discard',
    FORM_MSG: 'Please fill in all mandatory fields marked with an asterisk (*)',
    RESEND_USER_ACTIVATION_EMAIL_MSG: 'Email for account activation is re-sent successfully',
    REGISTER_SUCCESS_MSG: 'Success! Registration is completed',
    ACTIVATE_USER_EMAIL_MSG1: 'Email verification link is sent to',
    ACTIVATE_USER_EMAIL_MSG2: 'If you have not received,'

}

export const TABLE_OPTIONS = {
    filterType: "dropdown",
    responsive: 'scrollFullHeight',
    textLabels: {
        body: {
            noMatch: "Sorry, no matching records found",
            toolTip: "Sort",
        },
    }
}

export const PRODUCT_SPECIFICATION = {
    CHECKDIMENSION : 'checkDimension',
    CHECKWEIGHT: 'checkWeight',
    CHECKCOLOR: 'checkColor',
    CHECKPOWER: 'checkPower',
    CHECKDOCUMENTUPLOAD:'checkDocumentUpload'
};

export const PROPOSALTYPE = {
    FINANCE: 'Finance',
    PURCHASE: 'Purchase'
};

export const LOGIN_REGISTER_ERROR = {
    FORM_MSG: 'Please enter valid credentials',
    ACCOUNT_NOT_ACTIVATED: 'Account is not activated, please complete email verification process'
}

export const RESET_PASSWORD_ERROR = {
    FORM_MSG: 'Please enter a valid password in both the fields',
    MATCH_CONFIRM_PASSWORD_MSG: 'New password and confirm password does not match'
}

export const EMAIL_ERROR = {
    FORM_MSG: 'Please enter a valid email address'
}

export const CHANGE_PASSWORD_ERROR = {
    FORM_MSG: 'Please enter valid credentials',
    MATCH_CONFIRM_PASSWORD_MSG: 'Password and confirm password does not match'
}

export const ALERT_MESSAGE = {
    SUCCESS: 'Success! Record has been saved successfully.',
    DELETE: 'Success! Record has been deleted successfully.',
    MAPPING: 'Success! Product has been mapped successfully.',
    DUPLICATE_DELETE: 'Error! Already record has been Deleted'
}

export const INFO_PASSWORD = {
    FORM_MSG: 'Password must contain at least 8 character, one lowercase letter, one uppercase letter, one number and one special character',
}

export const VIEW_PRODUCT_TABS = {
    GENERAL: 'general',
    MAPPING: 'mapping'
};

export const ASSOCIATE = {
    DOCUMENT_UPLOAD_ERROR: 'Select the documents to upload',
    REJECT_CONFIRM_MSG: 'Are you sure, you want to reject this user?',
    ADDITIONAL_INFO_MSG: 'Please select the required additional documents',
    ADDITIONAL_INFO_COMMENTS: 'Please enter comments for additional information',
    REJECT_USER_MSG: 'User is rejected successfully',
    REJECT_COMMENTS: 'Please provide reason for rejecting the user',
    DOCUMENT_REQUEST: 'Requested',
    DOCUMENT_REREQUEST: 'Re-requested',
    DOCUMENT_RECEIVED: 'Received',
    REJECT_USER: 'Rejected',
    ASSOCIATE_FILE_UPLOAD_SIZE: 7340032,
    FILE_UPLOAD_SIZE_MSG: 'Please select file less than 7MB size',
    GENERAL_INFO_SUBMITTED_MSG: 'General information submitted successfully',
    DOCUMENTS_SUBMITTED_MSG: 'Documents submitted successfully! Admin approval is in-progress',
    DOCUMENTS_REQUESTED_MSG: 'Admin has requested for additional information',
    ADMIN_REJECT_USER_MSG: 'Admin has denied the registration request',
    ROLE_ERROR_MSG: 'Please select the role before proceeding with Print / Send agreement',
    AGREEMENT_DOCUMENTS_SUBMITTED : 'Thanks for submitting the documents. Admin approval is in-progress',
    AGREEMENT_SENT : 'Agreement sent to the user for e-signature',
    AGREEMENT_ESIGNED : 'E-signed agreement received. Waiting for counter signature from admin to complete the registration process',
    AGREEMENT_ACTIVE : 'Agreement counter-signed by admin. You are welcome to Solar Topps Platform!',
    AGREEMENT_DEFAULT_CONTENT: 'Agreement will be e-mailed once registration request is approved by admin',
    REJECT_MODAL_TITLE: 'Reject'
};

export const ADOBE_ESIGN = {
    OAUTH_URL : 'https://secure.in1.echosign.com/public/oauth',
    CALLBACK_URL : 'https://solartopps.us/internal-api/adobeTokenGeneration',
    CLIENT_ID : 'CBJCHBCAABAAj_9UKUnoh5LtqABL2pW2Xw-XV1PgbPEc',
    CLIENT_SECRET : '62NovleaL6nuR7LhTLbOQ6jWrtolGBEQ'
};



