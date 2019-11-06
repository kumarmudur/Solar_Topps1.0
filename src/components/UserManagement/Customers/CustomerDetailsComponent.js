import React, { Component } from 'react';
import compose from "recompose/compose";
import TextField from '@material-ui/core/TextField';
import Footer from 'Components/Footer/Footer';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';

class CustomerDetailComponent extends Component {

    _openEditUserPage = () => {
        this.props.openEditUserPage();
    }

render () {
    const { classes, userData } = this.props;
    return (
        <div className="ecom-dashboard-wrapper">
            <h1>Customer Details</h1>
            <div className="add-button"> 
                <button type="button" className="btn btn-primary" onClick={ this._openEditUserPage }>Edit</button>
            </div>            
            <div className="page-min-ht">
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
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
    }
}

export default compose(
    withStyles(styles, { name: "ViewUserDetails" }),
)(CustomerDetailComponent);