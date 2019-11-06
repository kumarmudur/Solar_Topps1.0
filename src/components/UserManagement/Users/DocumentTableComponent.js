import React, { Component } from  'react';
import { withStyles } from "@material-ui/core/";
import TextField from '@material-ui/core/TextField';
import { styles } from '../../../util/styles';
import compose from "recompose/compose";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { NavLink } from 'react-router-dom';
import AdminCommentsComponent from '../../../components/Associate/AdminCommentsComponent';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import Calendar from '../../Calendar';
import { getDateTime } from '../../../util/utility';
import { ASSOCIATE, ADOBE_ESIGN } from '../../../constants/constants'
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog'
import axios from 'axios';

class DocumentTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowConfirmModal: false,
            checkedBoxes: [],
            comments: '',
            documentError: '',
            roleError: '',
            rejectError: '',
            documentList: this.getInitialstate(props, 'documents'),
            roleListOptions: this.getInitialstate(props, 'roles'),
            selectedRole: '',
            commentsList: this.getInitialstate(props, 'comments')
        };  
    }

    getInitialstate = (props, type) => {
        let obj = {};
        if(type === 'documents') {
            obj = {
                registrationDocs: props.userData && props.userData.registrationDocs || {}
            };
        }
        else if(type === 'comments') {
            obj =  props.userData && props.userData.comments || [];
        }
        else if(type === 'roles') {
            obj =  props && props.roleList || [];
        }
        return obj;
    }

    componentWillReceiveProps(nextProps) {
        let obj = {};
        if(nextProps && nextProps.userData) {
            obj = {
                registrationDocs: nextProps.userData && nextProps.userData.registrationDocs || {},
                comments: nextProps.userData && nextProps.userData.comments || [],
                roleList : nextProps && nextProps.roleList || []
            };
            this.setState({
                documentList: {
                    registrationDocs: obj.registrationDocs
                },
                commentsList: obj.comments,
                roleListOptions: obj.roleList
            });
        }      
    }

    _checkboxChange = e => {
        const { name, checked } = e.currentTarget;
        let { checkedBoxes, documentList, documentError } = this.state;
        if(checked === true) { 
            // eslint-disable-next-line no-unused-expressions
            checkedBoxes.indexOf(name) === -1 ? checkedBoxes.push(name) : ''; 
            documentError = '';
        }
        else if(checked === false) { 
            // eslint-disable-next-line no-unused-expressions
            checkedBoxes.indexOf(name) !== -1 ? checkedBoxes.splice(name, 1) : '';
        }
        this.setState({
            checkedBoxes,
            documentList,
            documentError
        });
    }

    _onFieldChange = e => {
        let { value, name } = e.currentTarget;
        if(name === 'comments' && value) {
            value = value.replace(/(?:\r\n|\r|\n)/g, ' ');
        }
        this.setState({
            [name]: value,
            rejectError: '',
            roleError: ''
        });
    }

    _requestAdditionalDocs = () => {
        const { registerId } = this.props.userData;
        const { documentList, checkedBoxes, commentsList, comments } = this.state;
        let documentError = '';
        let rejectError = '';
        let commentsListFields = [];
        documentList['registerId'] = registerId;
        commentsListFields = commentsList.concat([ { commentText: comments }]);
        documentList['comments'] = commentsListFields;
        checkedBoxes.map( documentKey => {
            if(documentList.registrationDocs[documentKey]) {
                documentList.registrationDocs[documentKey].status = ASSOCIATE.DOCUMENT_REREQUEST;
            }
            else {
                documentList.registrationDocs[documentKey] = {};
                documentList.registrationDocs[documentKey].status = ASSOCIATE.DOCUMENT_REQUEST;
            }
        });
        if(checkedBoxes.length > 0 && comments) {
            this.props.requestAdditionalDocs(documentList);
        }
        else {
            if(checkedBoxes.length === 0) {
                documentError = ASSOCIATE.ADDITIONAL_INFO_MSG;
            }
            if(!comments) {
                rejectError = ASSOCIATE.ADDITIONAL_INFO_COMMENTS;
            }
            this.setState({
                documentError,
                rejectError
            });
        }
    }

    _confirmRejectUser = () => {
        const { comments } = this.state;
        let isShowConfirmModal = false;
        let rejectError = '';
        if(comments) {
            isShowConfirmModal = true; 
        }
        else {
            rejectError = ASSOCIATE.REJECT_COMMENTS;
        }
        this.setState({
            isShowConfirmModal,
            rejectError
        });
    }

    _toggleModal = () => {
        this.setState({
          isShowConfirmModal: !this.state.isShowConfirmModal
        });
    }

    _rejectUser = () => {
        const { registerId, email, phone } = this.props.userData;
        const { comments, commentsList} = this.state;
        let commentsListFields = [];
        commentsListFields = commentsList.concat([ { commentText: comments }]);
        if(comments) {
            const payload = {
                registerId,
                email,
                phone,
                comments: commentsListFields,
                status: ASSOCIATE.REJECT_USER
            };
            this.props.rejectUser(payload);
            this._toggleModal();
        }
    }

    _onDateFieldChange = (name, date) => {
        let { documentList } = this.state;
        let indexValue = name && name.split('-');
        let keyName = indexValue && indexValue[0];
        let fieldName = indexValue && indexValue[1];
        let dateFormat = '';
        if(date) {
            let currentDate = new Date(date);
            let mm = currentDate.getMonth() + 1;
            let dd = currentDate.getDate();
            let yyyy = currentDate.getFullYear();
            dateFormat = mm + '-' + dd + '-' + yyyy;
        }
        if(documentList.registrationDocs) {
            documentList.registrationDocs[keyName][fieldName] = dateFormat;
            this.setState({
                documentList
            });
        }
    }

    _sendAgreement = () => {
            window.open(`${ADOBE_ESIGN.OAUTH_URL}?redirect_uri=${ADOBE_ESIGN.CALLBACK_URL}&response_type=code&client_id=${ADOBE_ESIGN.CLIENT_ID}&scope=user_login:self+agreement_send:account+agreement_read:account+agreement_write:account`);
            window.onloadeddata = function() {
                console.log('after data loaded : ',window.location.search);
            }
            
            axios.get('https://solartopps.us/internal-api/adobeTokenGeneration', function() {
                console.log('method here : ');
            })
            .then(function(res) {
                let token = '';
                console.log('res here : ', res); 
                window.onloadeddata();
                const urlParams = new URLSearchParams(window.location.search);
                if(urlParams) {
                    token = urlParams.get('code');
                }
                console.log('token2 : ', token); 
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    _printAgreement = () => {
        const { registerId } = this.props.userData;
        const { selectedRole } = this.state;
        if(selectedRole) {
            const payload = {
                registerId,
                selectedRole
            };
            this.props.printAgreement(payload);
        }
        else {
            this.setState({
                roleError: ASSOCIATE.ROLE_ERROR_MSG,
                documentError:'',
                rejectError: ''
            });
        }
    }
    
    render () {
        const { classes } = this.props;
        const { isShowConfirmModal, selectedRole } = this.state;
        const userData = this.props && this.props.userData ? this.props.userData : null;
        const userStatus = userData && userData.status;
        let disableRejectButton = false;
        if(userStatus === 'REJECTED') {
            disableRejectButton = true;
        }

        const agreementPath = this.props && this.props.agreementPath ? this.props.agreementPath : '';
        if(agreementPath) {
            const link = document.createElement('a');
            link.href = agreementPath;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        let updatedDateTime = '';
        let registeredDate = '';
        const { registrationDocs } = this.state.documentList;
        if(userData && userData.updatedDateTime) {
            updatedDateTime = getDateTime('date', userData.updatedDateTime);
        }
        if(userData && userData.createdDateTime) {
            registeredDate = getDateTime('date', userData.createdDateTime);
        }
        const insuranceDocument = registrationDocs && registrationDocs['insurance'];
        const drivingLicenseDocument = registrationDocs && registrationDocs['drivingLicense'];
        const sh4Document = registrationDocs && registrationDocs['SH4'];
        const ssnDocument = registrationDocs && registrationDocs['SSN'];
        const userComments = userData && userData.comments;

        const formattedInsuranceStartDate = insuranceDocument && insuranceDocument.startDate && getDateTime('date', insuranceDocument.startDate);
        const formattedInsuranceExpiryDate = insuranceDocument && insuranceDocument.expiryDate && getDateTime('date', insuranceDocument.expiryDate);

        const formattedDrivingLicenseStartDate = drivingLicenseDocument && drivingLicenseDocument.startDate && getDateTime('date', drivingLicenseDocument.startDate);
        const formattedDrivingLicenseExpiryDate = drivingLicenseDocument && drivingLicenseDocument.expiryDate && getDateTime('date', drivingLicenseDocument.expiryDate);

        const formattedSH4StartDate = sh4Document && sh4Document.startDate && getDateTime('date', sh4Document.startDate);
        const formattedSH4ExpiryDate = sh4Document && sh4Document.expiryDate && getDateTime('date', sh4Document.expiryDate);

        const formattedSSNStartDate = ssnDocument && ssnDocument.startDate && getDateTime('date', ssnDocument.startDate);
        const formattedSSNExpiryDate = ssnDocument && ssnDocument.expiryDate && getDateTime('date', ssnDocument.expiryDate);

        return (
            <div className="rct-block admin-approve-document">
                <div className="rct-block-title ">
                    <h4>Document Request</h4>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
                    <Paper className={classes.root}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Document Type</TableCell>
                                    <TableCell >Document Name</TableCell>
                                    <TableCell >Start Date</TableCell>
                                    <TableCell >Expiry Date</TableCell>
                                    <TableCell >Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <FormControlLabel
                                            control={
                                            <Checkbox 
                                                color="primary" 
                                                name="insurance"
                                                onChange={ this._checkboxChange }  
                                            />
                                            }
                                            label="INSURANCE"
                                            labelPlacement="end"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        { insuranceDocument && insuranceDocument.documentName &&
                                            <div className="uploaded-grid-documents">
                                                <AttachmentOutlinedIcon className="attachment" /><span className="form-label-text">
                                                    <NavLink download={ insuranceDocument.originalname } to={ insuranceDocument.path } target="_blank">{ insuranceDocument.originalname }</NavLink>
                                                </span>
                                            </div>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        { insuranceDocument && insuranceDocument.documentName &&
                                            <Calendar
                                                name="insurance-startDate"
                                                onDateChange={ this._onDateFieldChange.bind(this, 'insurance-startDate') } // eslint-disable-line
                                                date={ formattedInsuranceStartDate }
                                                placeholder="Start Date (MM/DD/YYYY)"
                                            />
                                        }
                                    </TableCell>
                                    <TableCell>
                                        { insuranceDocument && insuranceDocument.documentName &&
                                            <Calendar
                                                onDateChange={ this._onDateFieldChange.bind(this, 'insurance-expiryDate') } // eslint-disable-line
                                                name="insurance-expiryDate"
                                                date={ formattedInsuranceExpiryDate }
                                                placeholder="Expiry Date (MM/DD/YYYY)"
                                            />
                                        }
                                    </TableCell>
                                    <TableCell>
                                        { insuranceDocument && insuranceDocument.status }
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <FormControlLabel
                                            control={
                                                <Checkbox 
                                                color="primary" 
                                                name="drivingLicense" 
                                                onChange={ this._checkboxChange }
                                                />
                                            }
                                            label="DRIVER LICENSE"
                                            labelPlacement="end"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        { drivingLicenseDocument && drivingLicenseDocument.documentName &&
                                            <div className="uploaded-grid-documents">
                                                <AttachmentOutlinedIcon className="attachment" /><span className="form-label-text">
                                                    <NavLink download={ drivingLicenseDocument.originalname } to={ drivingLicenseDocument.path } target="_blank">{ drivingLicenseDocument.originalname }</NavLink>
                                                </span>
                                            </div>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        { drivingLicenseDocument && drivingLicenseDocument.documentName &&
                                            <Calendar
                                                onDateChange={ this._onDateFieldChange.bind(this, 'drivingLicense-startDate') } // eslint-disable-line
                                                name="drivingLicense-startDate"
                                                date={ formattedDrivingLicenseStartDate }
                                                placeholder="Start Date (MM/DD/YYYY)"
                                            />
                                        }
                                    </TableCell>
                                    <TableCell>
                                        { drivingLicenseDocument && drivingLicenseDocument.documentName &&
                                            <Calendar
                                                onDateChange={ this._onDateFieldChange.bind(this, 'drivingLicense-expiryDate') } // eslint-disable-line
                                                name="drivingLicense-expiryDate"
                                                date={ formattedDrivingLicenseExpiryDate }
                                                placeholder="Expiry Date (MM/DD/YYYY)"
                                            />
                                        }
                                    </TableCell>
                                    <TableCell>
                                        { drivingLicenseDocument && drivingLicenseDocument.status }
                                    </TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell>
                                        <FormControlLabel
                                            control={
                                                <Checkbox 
                                                color="primary" 
                                                name="SH4" 
                                                onChange={ this._checkboxChange }  
                                                />
                                            }
                                            label="FORM W-9"
                                            labelPlacement="end"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        { sh4Document && sh4Document.documentName &&
                                            <div className="uploaded-grid-documents">
                                                <AttachmentOutlinedIcon className="attachment" /><span className="form-label-text">
                                                    <NavLink download={ sh4Document.originalname } to={ sh4Document.path } target="_blank">{ sh4Document.originalname }</NavLink>
                                                </span>
                                            </div>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        { sh4Document && sh4Document.documentName &&
                                            <Calendar
                                                onDateChange={ this._onDateFieldChange.bind(this, 'SH4-startDate') } // eslint-disable-line
                                                name="SH4-startDate"
                                                date={ formattedSH4StartDate }
                                                placeholder="Start Date (MM/DD/YYYY)"
                                            />
                                        }                                            
                                    </TableCell>
                                    <TableCell>
                                        { sh4Document && sh4Document.documentName &&
                                            <Calendar
                                                onDateChange={ this._onDateFieldChange.bind(this, 'SH4-expiryDate') } // eslint-disable-line
                                                name="SH4-expiryDate"
                                                date={ formattedSH4ExpiryDate }
                                                placeholder="Expiry Date (MM/DD/YYYY)"
                                            />
                                        }    
                                    </TableCell>
                                    <TableCell>
                                        { sh4Document && sh4Document.status }
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell>
                                        <FormControlLabel
                                            control={
                                                <Checkbox 
                                                color="primary" 
                                                name="SSN" 
                                                onChange={ this._checkboxChange }  
                                                />
                                            }
                                            label="FEIN / SSN"
                                            labelPlacement="end"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        { ssnDocument && ssnDocument.documentName &&
                                            <div className="uploaded-grid-documents">
                                                <AttachmentOutlinedIcon className="attachment" /><span className="form-label-text">
                                                    <NavLink download={ ssnDocument.originalname } to={ ssnDocument.path } target="_blank">{ ssnDocument.originalname }</NavLink>
                                                </span>
                                            </div>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        { ssnDocument && ssnDocument.documentName &&
                                            <Calendar
                                                onDateChange={ this._onDateFieldChange.bind(this, 'SSN-startDate') } // eslint-disable-line
                                                name="SSN-startDate"
                                                date={ formattedSSNStartDate }
                                                placeholder="Start Date (MM/DD/YYYY)"
                                            />
                                        }
                                    </TableCell>
                                    <TableCell>
                                        { ssnDocument && ssnDocument.documentName &&
                                            <Calendar
                                                onDateChange={ this._onDateFieldChange.bind(this, 'SSN-expiryDate') } // eslint-disable-line
                                                name="SSN-expiryDate"
                                                date={ formattedSSNExpiryDate }
                                                placeholder="Expiry Date (MM/DD/YYYY)"
                                            />
                                        }
                                    </TableCell>
                                    <TableCell>
                                        { ssnDocument && ssnDocument.status }
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                    <div>
                        <span className="error"> {this.state.documentError ? this.state.documentError : ''} </span>
                    </div>
                    { userComments && userComments.length > 0 &&
                        <div className="row admin-comments">
                            <AdminCommentsComponent userComments={ userComments } />
                        </div> 
                    } 
                    <div>
                        <TextField
                            select                   
                            required
                            name="selectRole" 
                            label="Select Role" 
                            margin="normal" 
                            className={classes.textField}  
                            onChange={this._onFieldChange}
                                SelectProps={{ native: true,
                                    MenuProps: {
                                        className: classes.menu
                                    },
                                }}
                        >
                            <option key="" value=""></option>
                            <option key="energyConsultant" value="Energy Consultant">Energy Consultant</option>
                            <option key="Dealer" value="Dealer">Dealer</option>
                        </TextField> 
                        <div>
                            <span className="error"> { this.state.roleError ? this.state.roleError : '' } </span>
                        </div>
                    </div>
                    <div>
                        <TextField 
                            required 
                            name="comments" 
                            label="Comments" 
                            multiline
                            className={classes.textField} 
                            margin="normal"
                            onChange={this._onFieldChange}
                        />
                        <div>
                            <span className="error"> {this.state.rejectError ? this.state.rejectError : ''} </span>
                        </div>
                        <div className="additional-info">
                            <button type="button" disabled={ disableRejectButton } className="btn btn-secondary" onClick={ this._confirmRejectUser } >Reject</button>
                            <button type="button" className="btn btn-primary" onClick={ this._requestAdditionalDocs }>Additional Info</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick= { this._printAgreement }>Print Agreement</button>
                            <button type="button" className="btn btn-primary" onClick={ this._sendAgreement }>Send Agreement</button>
                        </div>
                    </div>
                </div>       
            </div>

            <ConfirmationDialog 
                isShowModal= { isShowConfirmModal }
                closeModal={ this._toggleModal }
                confirmModal={ this._rejectUser }
                title= { ASSOCIATE.REJECT_MODAL_TITLE }
                message = { ASSOCIATE.REJECT_CONFIRM_MSG }
            />
        </div>
        );
    }
}

export default compose(withStyles(styles, 
    { name: "DocumentTableComponent" }),)(DocumentTableComponent);