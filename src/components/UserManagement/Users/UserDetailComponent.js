import React, { Component } from 'react';
import compose from "recompose/compose";
import TextField from '@material-ui/core/TextField';
import Footer from 'Components/Footer/Footer';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';
import DocumentTableComponent from '../../../components/UserManagement/Users/DocumentTableComponent';
import { loadData } from '../../../util/storage';
class UserDetailComponent extends Component {

    _openEditUserPage = () => {
        this.props.openEditUserPage();
    }

    _requestAdditionalDocs = data => {
        this.props.requestAdditionalDocs(data);
    }
    
    _rejectUser = data => {
        this.props.rejectUser(data);
    }

render () {
    const { classes, userData } = this.props;
    let loggedInUserType = this.props && this.props.loggedInUserType ? this.props.loggedInUserType : '';
    if(!loggedInUserType) {
        loggedInUserType = loadData('registerId');
    }
    const userType = userData && userData.userType;
    const printAgreementUrl = "";
    return (
        <div className="ecom-dashboard-wrapper">
            <h1>User Details</h1>
            <div className="add-button"> 
                <button type="button" className="btn btn-primary" onClick={ this._openEditUserPage }>Edit</button>
            </div>

            { userData && loggedInUserType === 'Admin' && userType === 'Associate' &&
                <DocumentTableComponent
                    userData = { userData }
                    requestAdditionalDocs={ this._requestAdditionalDocs } 
                    rejectUser={ this._rejectUser } 
                    sendAgreementRegisterId = { this._sendAgreementRegisterId } 
                    printAgreement= { this._printAgreement }
                    agreementPath={ printAgreementUrl }
                />
            }
            
            
            {/* Personal Information */}
            <div className="rct-block page-readonly-view">
                <div className="rct-block-title ">
                    <h4>Personal Information</h4>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
                        <TextField 
                            name="firstName" 
                            label="First Name" 
                            className={classes.textField} 
                            margin="normal"
                            value= { userData ? userData.firstName : '' } 
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
                            value= { userData ? userData.lastName : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="phone" 
                            label="Phone" 
                            className={classes.textField} 
                            margin="normal"
                            value= { userData ? userData.phone : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="alternativePhone" 
                            label="Alternate Phone Number" 
                            className={classes.textField} 
                            margin="normal"
                            value= { userData ? userData.alternativePhone : '' }
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
                            value= { userData ? userData.email : ''} 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="userType" 
                            label="User Type" 
                            className={classes.textField} 
                            margin="normal"
                            value= { userData ? userData.userType : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField 
                            name="role" 
                            label="Role" 
                            className={classes.textField} 
                            margin="normal"
                            value= { userData ? userData.role : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                </div>
            </div>
            
            {/* Address */}

            <div className="rct-block page-readonly-view">
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
                            value= { userData ? userData.houseBuilding : '' } 
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
                            value= { userData ? userData.street : '' } 
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
                            value= { userData ? userData.zipCode : '' } 
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
                            value= { userData ? userData.city : '' } 
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
                            value= { userData ? userData.county : '' } 
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
                            value= { userData ? userData.country : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Office & Dept */}
            <div className="rct-block page-readonly-view">
                <div className="rct-block-title ">
                <h4>Office & Department</h4>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
                        <TextField 
                            name="office" 
                            label="Office" 
                            className={classes.textField} 
                            margin="normal"
                            value= { userData ? userData.office : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField 
                            name="department" 
                            label="Department" 
                            className={classes.textField} 
                            margin="normal"
                            value= { userData ? userData.department : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
    }
}

export default compose(
    withStyles(styles, { name: "UserDetailComponent" }),
)(UserDetailComponent);