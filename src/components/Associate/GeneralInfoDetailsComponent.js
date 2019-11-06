import React, { Component} from 'react';
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/";
import { styles } from '../../util/styles';
import TextField from '@material-ui/core/TextField';
import { NavLink } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import DocumentComponent from '../../components/Associate/DocumentComponent';
import AdminCommentsComponent from '../../components/Associate/AdminCommentsComponent';
import { ASSOCIATE } from '../../constants/constants'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import { getDateTime } from '../../util/utility';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { radioStyles } from '../../util/styles';
import clsx from 'clsx';


class GeneralInfoDetailsComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            documentList: [],
            fileType: null,
            documentError: '',
            tabStatus: this._getInitalState(props)
        };
    }

    _getInitalState = props => {
        const { status } = props && props.userData;
        const tabsObject = {
            showGeneralTab: true,
            showDocumentTab: false,
            showAgreementTab: false
        };
        if (status === 'Documents Submitted' || status === 'Documents Requested' || status === 'Rejected' || status === 'Genreal Info Submitted') {    
            tabsObject.showDocumentTab = true;
            tabsObject.showGeneralTab = false;
            tabsObject.showAgreementTab = false;
        }
        else if (status === 'Agreement Sent' || status === 'Agreement Esigned') {
            tabsObject.showAgreementTab = true; 
            tabsObject.showDocumentTab = false;
            tabsObject.showGeneralTab = false;
        }
        return tabsObject;
    }

    _toggleTabs = e => {
        let tabsObject = {
            showGeneralTab: true,
            showDocumentTab: false,
            showAgreementTab: false
        };

        switch(e.currentTarget.title){
            case 'General': ({...tabsObject } = { showGeneralTab: true, showDocumentTab: false, showAgreementTab: false });
            break;
            case 'Documents': ({...tabsObject } = { showGeneralTab: false, showDocumentTab: true, showAgreementTab: false });
            break;
            case 'Agreement': ({...tabsObject } = { showGeneralTab: false, showDocumentTab: false, showAgreementTab: true });
            break;
            default: return null;
         }
        this.setState({
            tabStatus: tabsObject
        });
    };

    handleFileUpload = (fileData, fileType) => {
        const { documentList } = this.state;
        let fileArrayList = null;
        let filterFileList = null;
        if(fileData) {
            filterFileList = documentList && documentList.filter(filelist => filelist.fileType === fileType);
            if(filterFileList.length > 0) {
                let index = documentList.findIndex(x => x.fileType === fileType);
                if(!fileData.name) { 
                    documentList.splice(index,1);
                }
                else {
                    documentList[index] = fileData;     
                }
                fileArrayList = documentList;
            }
            else {
                fileArrayList = documentList.concat([ { file: fileData, fileType }]);
            }
            this.setState({
                documentList : fileArrayList,
                documentError: ''
            });
        }
    }

    _submitFiles = () => {
        const { documentList } = this.state;
        if(documentList.length > 0) {
            this.props.submitFiles(documentList);
        }
        else {
            this.setState({
                documentError : ASSOCIATE.DOCUMENT_UPLOAD_ERROR
            });
        }
    }

    render () {
        const { classes, userData } = this.props;
        const userStatus = userData && userData.status;
        const userComments = userData.comments;
        const { documentError } = this.state;
        let { showGeneralTab, showDocumentTab, showAgreementTab } = this.state.tabStatus;
        showGeneralTab = showGeneralTab === true ? 'active' : null;
        showDocumentTab = showDocumentTab === true ? 'active' : null;
        showAgreementTab = showAgreementTab === true ? 'active' : null;

        let generalInfoStep = '';
        let documentStep = '';
        let agreementStep = '';
        if(userStatus === 'Genreal Info Submitted' || userStatus === 'Rejected' || userStatus === 'Documents Requested') {
            generalInfoStep = 'completed'; 
        }
        if(userStatus === 'Documents Submitted') {
            documentStep = 'completed'; 
            generalInfoStep = 'completed';
        }
        if(userStatus === 'Agreement Sent') {
            documentStep = 'completed'; 
            generalInfoStep = 'completed';
        }
        if(userStatus === 'Agreement Esigned') {
            documentStep = 'completed'; 
            generalInfoStep = 'completed';
            agreementStep = 'completed'; 
        }
        let generalTabClass = (!showGeneralTab && 'inactive-tabText' || showGeneralTab && 'activeTab');
        if(generalInfoStep) { 
            generalTabClass = 'processed';
        }

        let documentTabClass = (!showDocumentTab && 'inactive-tabText' || showDocumentTab && 'activeTab');
        if(documentStep) { 
            documentTabClass = 'processed';
        }

        let agreementTabClass = (!showAgreementTab && 'inactive-tabText' || showAgreementTab && 'activeTab');
        if(agreementStep) { 
            agreementTabClass = 'processed';
        }

        const contactPersonFields = userData && userData.contactPersons && userData.contactPersons.map(contact => (
            <div>
                <TextField 
                    name="name" 
                    label="Name" 
                    className={classes.textField} 
                    margin="normal"
                    value= { contact.name } 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true
                    }}
                />
                <TextField 
                    name="Email" 
                    label="Email" 
                    className={classes.textField} 
                    margin="normal"
                    value= { contact.email }  
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true
                    }}
                />
                <TextField 
                    name="phone" 
                    label="Phone" 
                    className={classes.textField} 
                    margin="normal"
                    value= { contact.phone }
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true
                    }}
                />
            </div>
        ));
        const uploadedDocuments = userData.registrationDocs && Object.keys(userData.registrationDocs).map( key => {
            let file = userData.registrationDocs[key];
            if(file && file.documentName) {
                return ( <div className="uploaded-documents">
                    <p> { userData.registrationDocs[key].documentName === 'insurance' ? 'INSURANCE': null }
                        { userData.registrationDocs[key].documentName === 'drivingLicense' ? 'DRIVER LICENSE': null }
                        { userData.registrationDocs[key].documentName === 'SH4' ? 'FORM W-9': null }
                        { userData.registrationDocs[key].documentName === 'SSN' ? 'FEIN / SSN': null }
                    </p>
                    <AttachmentOutlinedIcon className="attachment" /><span className="form-label-text">
                        <NavLink download={ file.originalname } to={ file.path } target="_blank">{ file.originalname }</NavLink>
                    </span>
                </div>
             );
            }
        });

        const insuranceDocument = userData.registrationDocs && userData.registrationDocs['insurance'];
        const drivingLicenseDocument = userData.registrationDocs && userData.registrationDocs['drivingLicense'];
        const sh4Document = userData.registrationDocs && userData.registrationDocs['SH4'];
        const ssnDocument = userData.registrationDocs && userData.registrationDocs['SSN'];
        const showSubmitButton = showDocumentTab && (userStatus === 'Genreal Info Submitted' || userStatus === 'Documents Requested');

        return (
            <div className="ecom-dashboard-wrapper page-readonly-view general-info-page">
                {/* <div className="logo-width">
                    <img src={require('Assets/img/st-logo.png')} alt="Logo" height="30%" width="30%"/>
                </div> */}
                <div className="rct-block bottom-margin">
                    <div className="general-tabs">
                        <div className="heading-generalInfo">
                            <p onClick={ this._toggleTabs } title='General' className={ generalTabClass }><i> { (generalInfoStep && <CheckCircleIcon className="step-completed"/> || <CheckCircleOutlineIcon className="step-inactive"/>) } </i><span className="tab-text">General Info</span></p>
                        </div>
                        <div className="heading-documents">
                            <p onClick={ this._toggleTabs } title='Documents' className={ documentTabClass }><i> { (documentStep && <CheckCircleIcon className="step-completed"/> || <CheckCircleOutlineIcon className="step-inactive"/>) } </i><span className="tab-text">Documents</span></p>
                        </div>
                        <div className="heading-agreement">
                            <p onClick={ this._toggleTabs } title='Agreement' className={ agreementTabClass }><i> { (agreementStep && <CheckCircleIcon className="step-completed"/> || <CheckCircleOutlineIcon className="step-inactive"/>) } </i><span className="tab-text">Agreement</span></p>
                        </div>
                        <div className="user-status-message">
                            <p>
                                { userStatus === 'Genreal Info Submitted' && ASSOCIATE.GENERAL_INFO_SUBMITTED_MSG }
                                { userStatus === 'Documents Submitted' && ASSOCIATE.DOCUMENTS_SUBMITTED_MSG }
                                { userStatus === 'Documents Requested' && ASSOCIATE.DOCUMENTS_REQUESTED_MSG }
                                { userStatus === 'Rejected' && <span className='rejected'>{ `${ ASSOCIATE.ADMIN_REJECT_USER_MSG }` }</span> }
                            </p>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                { showGeneralTab && (
                <div>    
                    <div className="rct-block">
                        <div className="rct-block-title ">
                            <div className="page-heading">
                                <h4 className="inline-block-element">General Information</h4>
                            </div>
                        </div>
                        <div className="collapse show">
                            <div className="rct-block-content">
                                <TextField 
                                    name="Name" 
                                    label="Name" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value= {`${userData ? userData.firstName : ''}  ${userData ? userData.lastName : ''}`}
                                    InputLabelProps={{shrink:true }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField 
                                    name="email" 
                                    label="Email" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value= {userData ? userData.email : ''} 
                                    InputLabelProps={{shrink:true }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField 
                                    name="mobile" 
                                    label="Mobile" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value= {userData ? userData.phone : ''} 
                                    InputLabelProps={{shrink:true }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <FormControl component="fieldset" className={clsx(classes.formControl, 'block-element')}>
                            <RadioGroup
                                disabled
                                aria-label="mode-option"
                                className="MuiFormGroup-row"
                                name="companyRequired"
                                value={ userData ? userData.companyRequired : false }
                              >
                                <FormControlLabel value="Company" control={<Radio />} label="Company" />
                                <FormControlLabel value="Vendor" control={<Radio />} label="Vendor" />
                            </RadioGroup>
                        </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="rct-block ">
                        <div className="rct-block-title ">
                            <h4>Company Representative</h4>
                        </div>
                        <div className="collapse show">
                        <div className="rct-block-content">
                            <TextField 
                                name="firstName" 
                                label="First Name" 
                                className={classes.textField} 
                                margin="normal"
                                onChange={this._handleChange}
                                value={userData ? userData.representativeFirstName : ''} 
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField  
                                name="lastName" 
                                label="Last Name" 
                                className={classes.textField} 
                                margin="normal"
                                onChange={this._handleChange}
                                value= {userData ? userData.representativeLastName : ''}
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField  
                                name="companyName" 
                                label="Company Name" 
                                className={classes.textField} 
                                margin="normal"
                                onChange={this._handleChange}
                                value={userData ? userData.companyName : ''}
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField  
                                name="companyFEIN" 
                                label="Company FEIN" 
                                className={classes.textField} 
                                margin="normal"
                                onChange={this._handleChange}
                                value= {userData ? userData.companyEin : ''}
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField  
                                name="ssn" 
                                label="SSN" 
                                className={classes.textField} 
                                margin="normal"
                                onChange={this._handleChange}
                                value= {userData ? userData.ssn : ''}
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField  
                                name="drivingLicenceno" 
                                label="Driving licence Number" 
                                className={classes.textField} 
                                margin="normal"
                                onChange={this._handleChange}
                                value= {userData ? userData.driverLicenseNumber : ''} 
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField  
                                name="registrationState" 
                                label="Company Registration State" 
                                className={classes.textField} 
                                margin="normal"
                                onChange={this._handleChange}
                                value= {userData ? userData.companyRegistrationState : ''}
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="rct-block ">
                        <div className="rct-block-title ">
                        <h4>Address</h4>
                        </div>
                        <div className="collapse show">
                            <div className="rct-block-content">
                                <TextField 
                                    name="houseBuilding" 
                                    label="Address 1" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value= {userData ? userData.houseBuilding : ''} 
                                    InputLabelProps={{shrink:true }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField 
                                    name="street" 
                                    label="Address 2" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value= {userData ? userData.street : ''} 
                                    InputLabelProps={{shrink:true }} 
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField 
                                    name="zipCode" 
                                    label="Zip Code" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value= {userData ? userData.zipCode : ''} 
                                    InputLabelProps={{shrink:true }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField 
                                    name="city" 
                                    label="City" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value= {userData ? userData.city : ''} 
                                    InputLabelProps={{shrink:true }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField 
                                    name="county" 
                                    label="County" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value= {userData ? userData.county : ''} 
                                    InputLabelProps={{shrink:true }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField 
                                    name="state" 
                                    label="State" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value= {userData ? userData.state : ''}
                                    InputLabelProps={{shrink:true }} 
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField 
                                    name="country" 
                                    label="Country" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value= {userData ? userData.country : ''} 
                                    InputLabelProps={{shrink:true }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    { userData.contactPersons && <div className="rct-block ">
                        <div className="rct-block-title ">
                            <h4>Contact Person</h4>
                        </div>
                        <div className="collapse show">
                            <div className="rct-block-content">
                                { contactPersonFields }
                            </div>
                        </div>
                    </div>
                    }
                </div>                 
            )}
            { showDocumentTab && (
            <div className="grid-space">
                { userStatus === 'Genreal Info Submitted' &&
                    <div className="rct-block ">
                        <DocumentComponent type="ADD" docType="All" fileUpload={ this.handleFileUpload } />
                        <div className="row"><span className="file-error">{ documentError ? documentError : '' }</span></div>
                        <div className="row border-separator">
                            { uploadedDocuments }
                        </div>
                    </div>
                }
            
                { (userStatus === 'Documents Submitted' || userStatus === 'Agreement Sent'|| userStatus === 'Agreement Esigned') && 
                    <div className="rct-block ">
                        <div className="rct-block-title ">
                            <h4>Documents</h4>
                        </div>
                        <div className="collapse show">
                            <div className="rct-block-content">
                                { uploadedDocuments }
                            </div>
                        </div>
                    </div>
                }

                { (userStatus === 'Documents Requested' || userStatus === 'Rejected') &&
                <div className="rct-block ">
                    <div className="rct-block-title ">
                        <h4>Documents</h4>
                    </div>
                    { userComments && userComments.length > 0 &&  
                        <AdminCommentsComponent userComments={ userComments } />
                    }
                    <div className="collapse show">
                        <div className="rct-block-content product-main-wrapper">
                            <div className="product-grid">
                                <div className="table-heading">
                                    <div className="grid-row">
                                        <div className="header">Document Name</div>
                                        <div className="header">Attachments</div>
                                        <div className="header">Last Updated</div>
                                        <div className="header">Status</div>
                                    </div>
                                </div>
                                <div className="table-heading grand-total-assembly">
                                    <div className="grid-row doc-container">
                                        <div className="header">Insurance</div>
                                        <div className="header no-border">
                                            { insuranceDocument && insuranceDocument.documentName &&
                                                <div className="uploaded-grid-documents">
                                                    <AttachmentOutlinedIcon className="attachment" />
                                                    <span className="form-label-text">
                                                        <NavLink className={ insuranceDocument.status==='Re-requested' && 'invalid-upload' || insuranceDocument.status && '' } download={ insuranceDocument && insuranceDocument.originalname } to={ insuranceDocument && insuranceDocument.path } target="_blank">{ insuranceDocument && insuranceDocument.originalname }</NavLink>
                                                    </span>
                                                </div>
                                            }
                                            <div className="document-upload-button">
                                                { (!insuranceDocument || (insuranceDocument && insuranceDocument.status!=='Received')) &&
                                                    <DocumentComponent type="EDIT" docType="insurance" fileUpload={ this.handleFileUpload } />
                                                }
                                            </div>
                                        </div>
                                        <div className="header no-border">{ insuranceDocument && insuranceDocument.lastUpdated && getDateTime('date', insuranceDocument.lastUpdated) }</div>
                                        <div className="header no-border">{ insuranceDocument && insuranceDocument.status }</div>
                                    </div>
                                </div>
                                <div className="table-heading grand-total-assembly background-col-color">
                                    <div className="grid-row doc-container">
                                        <div className="header">Driver License</div>
                                        <div className="header no-border">
                                            { drivingLicenseDocument && drivingLicenseDocument.documentName &&
                                                <div className="uploaded-grid-documents">
                                                    <AttachmentOutlinedIcon className="attachment" />
                                                    <span className="form-label-text">
                                                        <NavLink className={ drivingLicenseDocument.status==='Re-requested' && 'invalid-upload' || drivingLicenseDocument.status && '' } download={ drivingLicenseDocument && drivingLicenseDocument.originalname } to={ drivingLicenseDocument && drivingLicenseDocument.path } target="_blank">{ drivingLicenseDocument && drivingLicenseDocument.originalname }</NavLink>
                                                    </span>
                                                </div>
                                            }
                                            <div className="document-upload-button">
                                                { (!drivingLicenseDocument || (drivingLicenseDocument && drivingLicenseDocument.status!=='Received')) &&
                                                    <DocumentComponent type="EDIT" docType="drivingLicense" fileUpload={ this.handleFileUpload } />
                                                }
                                            </div>
                                        </div>
                                        <div className="header no-border">{ drivingLicenseDocument && drivingLicenseDocument.lastUpdated && getDateTime('date', drivingLicenseDocument.lastUpdated) }</div>
                                        <div className="header no-border">{ drivingLicenseDocument && drivingLicenseDocument.status }</div>
                                    </div>

                                </div>
                                <div className="table-heading grand-total-assembly">
                                    <div className="grid-row doc-container">
                                        <div className="header">Form W-9</div>
                                        <div className="header no-border">
                                            { sh4Document && sh4Document.documentName &&
                                                <div className="uploaded-grid-documents">
                                                    <AttachmentOutlinedIcon className="attachment" />
                                                    <span className="form-label-text">
                                                        <NavLink className={ sh4Document.status==='Re-requested' && 'invalid-upload' || sh4Document.status && '' } download={ sh4Document && sh4Document.originalname } to={ sh4Document && sh4Document.path } target="_blank">{ sh4Document && sh4Document.originalname }</NavLink>
                                                    </span>                                                    
                                                </div>
                                            }
                                            <div className="document-upload-button">
                                                { (!sh4Document || (sh4Document && sh4Document.status!=='Received')) &&
                                                    <DocumentComponent type="EDIT" docType="SH4" fileUpload={ this.handleFileUpload } />
                                                }
                                            </div>
                                        </div>
                                        <div className="header no-border">{ sh4Document && sh4Document.lastUpdated && getDateTime('date', sh4Document.lastUpdated) }</div>
                                        <div className="header no-border">{ sh4Document && sh4Document.status }</div>
                                    </div>

                                </div>
                                <div className="table-heading grand-total-assembly background-col-color">
                                    <div className="grid-row doc-container">
                                        <div className="header">FEIN / SSN</div>
                                        <div className="header no-border">
                                            { ssnDocument && ssnDocument.documentName &&
                                                <div className="uploaded-grid-documents">
                                                    <AttachmentOutlinedIcon className="attachment" />
                                                    <span className="form-label-text">
                                                        <NavLink className={ ssnDocument.status==='Re-requested' && 'invalid-upload' || ssnDocument.status && '' } download={ ssnDocument && ssnDocument.originalname } to={ ssnDocument && ssnDocument.path } target="_blank">{ ssnDocument && ssnDocument.originalname }</NavLink>
                                                    </span>
                                                </div>
                                            }
                                            <div className="document-upload-button">
                                                { (!ssnDocument || (ssnDocument && ssnDocument.status!=='Received')) &&
                                                    <DocumentComponent type="EDIT" docType="SSN" fileUpload={ this.handleFileUpload } />
                                                }
                                            </div>
                                        </div>
                                        <div className="header no-border">{ ssnDocument && ssnDocument.lastUpdated && getDateTime('date', ssnDocument.lastUpdated) }</div>
                                        <div className="header no-border">{ ssnDocument && ssnDocument.status }</div>
                                    </div>


                                </div>
                            </div>
                            <div className="row"><span className="file-error">{ documentError ? documentError : ''}</span></div>                    
                        </div>
                    </div>
                </div>
                }
              </div>
            )}    
         
            { showAgreementTab && (
                <div className="rct-block">
                    <div className="rct-block-title">
                        <h4>Agreement</h4>
                    </div>
                    <div className="collapse show">
                        <div className="rct-block-content">
                            { userStatus === 'Documents Submitted' && ASSOCIATE.AGREEMENT_DOCUMENTS_SUBMITTED }
                            { userStatus === 'Agreement Sent' && ASSOCIATE.AGREEMENT_SENT }
                            { userStatus === 'Agreement Esigned' && ASSOCIATE.AGREEMENT_ESIGNED }
                            { userStatus === 'Active' && ASSOCIATE.AGREEMENT_ACTIVE }
                            { (userStatus === 'Documents Requested' || userStatus === 'Genreal Info Submitted') && ASSOCIATE.AGREEMENT_DEFAULT_CONTENT }
                        </div>
                    </div>
                </div>      
            )}
            { showSubmitButton && <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={ this._submitFiles } >Submit</button>
            </div>
            }
         </div>
        );
    }
}


export default compose(withStyles(styles,radioStyles, 
    { name: "GeneralInfoDetailsComponent" }),)(GeneralInfoDetailsComponent);